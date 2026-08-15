import type { Topic, TopicBlock } from "@/lib/types";

function blockText(block: TopicBlock): string {
  if (block.type === "summary" || block.type === "prose" || block.type === "warning") return `${block.heading ?? ""} ${block.text}`;
  if (block.type === "bullets") return `${block.heading ?? ""} ${block.items.join(" ")}`;
  if (block.type === "table") return `${block.heading ?? ""} ${block.columns.join(" ")} ${block.rows.flat().join(" ")}`;
  if (block.type === "flow") return `${block.heading ?? ""} ${block.nodes.map((node) => node.label).join(" ")}`;
  if (block.type === "sequence") return `${block.heading ?? ""} ${block.steps.flatMap((step) => [step.title, step.detail]).join(" ")}`;
  if (block.type === "image") return `${block.heading ?? ""} ${block.alt} ${block.caption ?? ""}`;
  return block.heading ?? "references";
}

function normalize(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Damerau-Levenshtein: a transposed pair costs 1, not 2.
 *
 * Transposition is the dominant typing error, so pricing it correctly lets the
 * tolerance below stay tight. A plain edit distance of 2 is far too loose once
 * the library is large — every five-letter token finds some neighbour.
 */
function editDistance(a: string, b: string): number {
  const matrix = Array.from({ length: b.length + 1 }, (_, row) => Array(a.length + 1).fill(0).map((__, col) => row === 0 ? col : col === 0 ? row : 0));
  for (let row = 1; row <= b.length; row += 1) {
    for (let col = 1; col <= a.length; col += 1) {
      matrix[row][col] = b[row - 1] === a[col - 1]
        ? matrix[row - 1][col - 1]
        : Math.min(matrix[row - 1][col - 1], matrix[row][col - 1], matrix[row - 1][col]) + 1;
      if (row > 1 && col > 1 && b[row - 1] === a[col - 2] && b[row - 2] === a[col - 1]) {
        matrix[row][col] = Math.min(matrix[row][col], matrix[row - 2][col - 2] + 1);
      }
    }
  }
  return matrix[b.length][a.length];
}

export function searchTopics(query: string, topics: Topic[]): Topic[] {
  const needle = normalize(query);
  if (!needle) return topics.filter((topic) => topic.approvedVersion);
  const needleWords = needle.split(" ");
  return topics
    .filter((topic) => topic.approvedVersion)
    .map((topic) => {
      const approved = topic.approvedVersion!;
      // Identity is what a user types from memory; body is everything the topic renders.
      const identity = [topic.title, ...topic.aliases, topic.scoreCategory, ...topic.tags].map(normalize);
      const fields = [...identity, ...approved.blocks.map(blockText).map(normalize)];
      let score = 0;
      for (const field of fields) {
        if (field === needle) score = Math.max(score, 100);
        else if (field.startsWith(needle)) score = Math.max(score, 80);
        else if (field.includes(needle)) score = Math.max(score, 60);
      }
      const tokenScores = needleWords.map((token) => {
        let tokenScore = 0;
        for (const field of fields) for (const word of field.split(" ")) {
          if (word === token) tokenScore = Math.max(tokenScore, 50);
          else if (word.length >= 3 && (word.startsWith(token) || token.startsWith(word))) tokenScore = Math.max(tokenScore, 42);
        }
        // Typo tolerance is deliberately confined to identity fields. Fuzzing every
        // word of every block means any short token finds a neighbour once the library
        // grows — "wound" reached topics through "round" and "found" — and the noise
        // scales with the corpus while the benefit does not.
        for (const field of identity) for (const word of field.split(" ")) {
          const distance = editDistance(token, word);
          const tolerance = token.length > 10 ? 2 : token.length >= 4 ? 1 : 0;
          if (distance <= tolerance) tokenScore = Math.max(tokenScore, 38 - distance * 5);
        }
        return tokenScore;
      });
      if (tokenScores.every((value) => value > 0)) score = Math.max(score, tokenScores.reduce((sum, value) => sum + value, 0) / tokenScores.length);
      return { topic, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.topic.title.localeCompare(b.topic.title))
    .map(({ topic }) => topic);
}
