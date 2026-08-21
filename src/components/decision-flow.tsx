"use client";

import { useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { stripMarkup } from "@/lib/inline";
import type { TopicBlock } from "@/lib/types";

type FlowBlock = Extract<TopicBlock, { type: "flow" }>;

interface PositionedEdge {
  from: string;
  to: string;
  label?: string;
  path: string;
  labelX: number;
  labelY: number;
  measured: boolean;
}

function flowLayers(block: FlowBlock) {
  const nodeIds = new Set(block.nodes.map((node) => node.id));
  const incoming = new Map<string, string[]>();
  for (const edge of block.edges) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) continue;
    incoming.set(edge.to, [...(incoming.get(edge.to) ?? []), edge.from]);
  }

  const depths = new Map<string, number>();
  const resolveDepth = (id: string, visiting: ReadonlySet<string>): number => {
    const known = depths.get(id);
    if (known !== undefined) return known;
    if (visiting.has(id)) return 0;
    const parents = incoming.get(id) ?? [];
    const nextVisiting = new Set(visiting).add(id);
    const depth = parents.length ? Math.max(...parents.map((parent) => resolveDepth(parent, nextVisiting) + 1)) : 0;
    depths.set(id, depth);
    return depth;
  };

  const layers: Array<typeof block.nodes> = [];
  for (const node of block.nodes) (layers[resolveDepth(node.id, new Set())] ??= []).push(node);
  return layers.filter(Boolean);
}

function nodeColumn(index: number, count: number, columns: number) {
  if (count === 1) return "1 / -1";
  return String(1 + Math.round(index * (columns - 1) / (count - 1)));
}

function rounded(value: number) {
  return Math.round(value * 10) / 10;
}

export function DecisionFlow({ block, renderInline }: { block: FlowBlock; renderInline: (text: string) => ReactNode }) {
  const layers = useMemo(() => flowLayers(block), [block]);
  const columns = Math.max(1, ...layers.map((layer) => layer.length));
  const levelByNode = useMemo(() => new Map(layers.flatMap((layer, level) => layer.map((node) => [node.id, level] as const))), [layers]);
  const outgoingCount = useMemo(() => {
    const counts = new Map<string, number>();
    for (const edge of block.edges) counts.set(edge.from, (counts.get(edge.from) ?? 0) + 1);
    return counts;
  }, [block.edges]);
  const incomingCount = useMemo(() => {
    const counts = new Map<string, number>();
    for (const edge of block.edges) counts.set(edge.to, (counts.get(edge.to) ?? 0) + 1);
    return counts;
  }, [block.edges]);
  const nodeById = useMemo(() => new Map(block.nodes.map((node) => [node.id, node])), [block.nodes]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const [positionedEdges, setPositionedEdges] = useState<PositionedEdge[]>(() => block.edges.map((edge) => ({ ...edge, path: "", labelX: 0, labelY: 0, measured: false })));
  const markerId = `flow-arrow-${useId().replaceAll(":", "")}`;
  // renderInline draws on a link scope the parent block consumes as it goes, so a term only
  // links on its first pass and comes back as plain text on the next. Measurement re-renders
  // this component without rebuilding that scope, so every label is rendered once here and the
  // elements reused; rendering them inline instead makes the measured pass disagree with the
  // server's and React reports a hydration mismatch.
  const labels = useMemo(() => {
    const edges = new Map<string, ReactNode>();
    for (const edge of block.edges) if (edge.label) edges.set(`${edge.from}-${edge.to}`, renderInline(edge.label));
    const nodes = new Map<string, ReactNode>();
    for (const layer of layers) for (const node of layer) nodes.set(node.id, renderInline(node.label));
    return { edges, nodes };
  }, [block.edges, layers, renderInline]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const measure = () => {
      const canvasRect = canvas.getBoundingClientRect();
      const gutterLeft = 5;
      const gutterRight = canvasRect.width - 5;
      const next = block.edges.map((edge): PositionedEdge => {
        const source = nodeRefs.current.get(edge.from);
        const target = nodeRefs.current.get(edge.to);
        if (!source || !target) return { ...edge, path: "", labelX: 0, labelY: 0, measured: false };
        const sourceRect = source.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const fromX = sourceRect.left - canvasRect.left + sourceRect.width / 2;
        const fromY = sourceRect.bottom - canvasRect.top;
        const toX = targetRect.left - canvasRect.left + targetRect.width / 2;
        const toY = targetRect.top - canvasRect.top;
        const levelSpan = (levelByNode.get(edge.to) ?? 0) - (levelByNode.get(edge.from) ?? 0);

        if (levelSpan <= 1) {
          const middleY = fromY + (toY - fromY) / 2;
          return {
            ...edge,
            path: `M ${rounded(fromX)} ${rounded(fromY)} V ${rounded(middleY)} H ${rounded(toX)} V ${rounded(toY)}`,
            labelX: rounded((fromX + toX) / 2),
            labelY: rounded(middleY),
            measured: true,
          };
        }

        // Long edges use an outer routing lane so they cannot cut through intervening cards.
        const canvasCenter = canvasRect.width / 2;
        const routeFromX = Math.abs(fromX - canvasCenter) > 10 ? fromX : toX;
        const gutter = routeFromX <= canvasCenter ? gutterLeft : gutterRight;
        const startTurnY = Math.min(fromY + 24, toY - 24);
        const endTurnY = Math.max(toY - 24, startTurnY);
        return {
          ...edge,
          path: `M ${rounded(fromX)} ${rounded(fromY)} V ${rounded(startTurnY)} H ${rounded(gutter)} V ${rounded(endTurnY)} H ${rounded(toX)} V ${rounded(toY)}`,
          labelX: rounded(Math.min(canvasRect.width - 92, Math.max(92, (fromX + gutter) / 2))),
          labelY: rounded(startTurnY),
          measured: true,
        };
      });
      setPositionedEdges(next);
    };

    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(canvas);
    for (const node of nodeRefs.current.values()) observer.observe(node);
    return () => observer.disconnect();
  }, [block.edges, levelByNode]);

  const minCanvasWidth = columns > 2 ? columns * 164 + (columns - 1) * 10 + 24 : 0;
  const canvasStyle = { "--flow-columns": columns, "--flow-min-width": `${minCanvasWidth}px` } as CSSProperties;

  return (
    <div className="decision-flow" role="group" aria-label={`${block.heading ?? "Clinical decision"} flowchart`}>
      <div ref={canvasRef} className="flow-canvas" style={canvasStyle}>
        <svg className="flow-connectors" aria-hidden="true">
          <defs>
            <marker id={markerId} markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M 0 0 L 7 3 L 0 6 Z" />
            </marker>
          </defs>
          {positionedEdges.map((edge) => (
            <path key={`${edge.from}-${edge.to}`} className="flow-edge" data-from={edge.from} data-to={edge.to} d={edge.path} markerEnd={`url(#${markerId})`} />
          ))}
        </svg>

        {positionedEdges.map((edge) => edge.label ? (
          <span
            key={`label-${edge.from}-${edge.to}`}
            className="flow-edge-label"
            style={{ left: edge.labelX, top: edge.labelY, visibility: edge.measured ? "visible" : "hidden" }}
          >
            {labels.edges.get(`${edge.from}-${edge.to}`)}
          </span>
        ) : null)}

        {layers.map((layer, level) => (
          <div key={`level-${level}`} className="flow-level" data-flow-level={level}>
            {layer.map((node, index) => {
              const isRoot = (incomingCount.get(node.id) ?? 0) === 0;
              const branches = outgoingCount.get(node.id) ?? 0;
              const kind = isRoot ? "Start" : branches > 1 ? "Decision" : (incomingCount.get(node.id) ?? 0) > 1 ? "Merge" : branches === 0 ? "Outcome" : "Step";
              return (
                <div
                  key={node.id}
                  ref={(element) => { if (element) nodeRefs.current.set(node.id, element); else nodeRefs.current.delete(node.id); }}
                  className={`flow-node ${node.tone ?? "default"}${isRoot ? " root" : ""}`}
                  data-node-id={node.id}
                  data-node-kind={kind.toLowerCase()}
                  data-single={layer.length === 1 ? "true" : undefined}
                  style={{ gridColumn: nodeColumn(index, layer.length, columns) }}
                >
                  <small>{kind}</small>
                  <strong>{labels.nodes.get(node.id)}</strong>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <ol className="visually-hidden flow-relationships">
        {block.edges.map((edge) => (
          <li key={`${edge.from}-${edge.to}`} className="flow-relationship">
            {stripMarkup(nodeById.get(edge.from)?.label ?? "Unknown step")}{edge.label ? ` — ${stripMarkup(edge.label)} — ` : " leads to "}{stripMarkup(nodeById.get(edge.to)?.label ?? "Unknown step")}
          </li>
        ))}
      </ol>
    </div>
  );
}
