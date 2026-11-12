"use client";

import { useId, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CheckCircle, Warning } from "@phosphor-icons/react";
import type { TopicBlock } from "@/lib/types";

type FlowBlock = Extract<TopicBlock, { type: "flow" }>;
type FlowNode = FlowBlock["nodes"][number];
type FlowEdge = FlowBlock["edges"][number];
interface Labels { edges: Map<string, ReactNode>; nodes: Map<string, ReactNode> }
interface PositionedEdge { from: string; to: string; path: string }

const edgeKey = (edge: FlowEdge) => `${edge.from}-${edge.to}`;

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

// Tone is a mark, not a colour of the box, and carries no words: it is decorative to assistive tech.
function ToneGlyph({ tone }: { tone?: FlowNode["tone"] }) {
  if (tone === "good") return <CheckCircle className="flow-glyph good" size={15} weight="fill" aria-hidden="true" />;
  if (tone === "caution") return <Warning className="flow-glyph caution" size={15} weight="fill" aria-hidden="true" />;
  return null;
}

/**
 * The flow as a nested list, `condition → step`. A step reached by more than one branch is written
 * out again, with everything beneath it, under each branch that reaches it. It is the visible form
 * of a flow wider than two columns and the only form assistive tech reads for any flow.
 */
function FlowOutline({ block, labels, className }: { block: FlowBlock; labels: Labels; className: string }) {
  const nodeById = new Map(block.nodes.map((node) => [node.id, node]));
  const exits = new Map<string, FlowEdge[]>();
  for (const edge of block.edges) exits.set(edge.from, [...(exits.get(edge.from) ?? []), edge]);
  const root = block.nodes.find((node) => !block.edges.some((edge) => edge.to === node.id)) ?? block.nodes[0];

  // `ancestors` stops a malformed cycle from recursing forever; the content contract forbids one.
  const item = (node: FlowNode, via: FlowEdge | null, ancestors: readonly string[]): ReactNode => {
    const next = [...ancestors, node.id];
    const children = (exits.get(node.id) ?? []).filter((edge) => nodeById.has(edge.to) && !next.includes(edge.to));
    return (
      <li key={via ? edgeKey(via) : node.id}>
        {via && <span className="flow-exit">{via.label ? <>{labels.edges.get(edgeKey(via))} </> : null}→ </span>}
        <ToneGlyph tone={node.tone} />
        <span className="flow-step">{labels.nodes.get(node.id)}</span>
        {children.length > 0 && <ul>{children.map((edge) => item(nodeById.get(edge.to)!, edge, next))}</ul>}
      </li>
    );
  };

  return root ? <ul className={className}>{item(root, null, [])}</ul> : null;
}

function FlowDiagram({ block, layers, columns, labels }: { block: FlowBlock; layers: Array<FlowBlock["nodes"]>; columns: number; labels: Labels }) {
  const levelByNode = useMemo(() => new Map(layers.flatMap((layer, level) => layer.map((node) => [node.id, level] as const))), [layers]);
  const conditionsByNode = useMemo(() => {
    const byNode = new Map<string, FlowEdge[]>();
    for (const edge of block.edges) if (edge.label) byNode.set(edge.to, [...(byNode.get(edge.to) ?? []), edge]);
    return byNode;
  }, [block.edges]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const conditionRefs = useRef(new Map<string, HTMLDivElement>());
  const levelRefs = useRef(new Map<number, HTMLDivElement>());
  const [positionedEdges, setPositionedEdges] = useState<PositionedEdge[]>(() => block.edges.map((edge) => ({ from: edge.from, to: edge.to, path: "" })));
  const markerId = `flow-arrow-${useId().replaceAll(":", "")}`;

  // The outline beside this diagram is the focusable copy of every link; the diagram is hidden from
  // assistive tech, so a link left in the tab order here would be focusable twice and unannounced.
  useLayoutEffect(() => { canvasRef.current?.querySelectorAll("a").forEach((link) => link.setAttribute("tabindex", "-1")); });

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const measure = () => {
      const canvasRect = canvas.getBoundingClientRect();
      const rel = (element: Element) => { const rect = element.getBoundingClientRect(); return { left: rect.left - canvasRect.left, right: rect.right - canvasRect.left, top: rect.top - canvasRect.top, bottom: rect.bottom - canvasRect.top }; };
      const gutterLeft = 5;
      const gutterRight = canvasRect.width - 5;
      const canvasCenter = canvasRect.width / 2;
      setPositionedEdges(block.edges.map((edge): PositionedEdge => {
        const source = nodeRefs.current.get(edge.from);
        const target = nodeRefs.current.get(edge.to);
        const fromLevel = levelRefs.current.get(levelByNode.get(edge.from) ?? -1);
        const toLevel = levelRefs.current.get(levelByNode.get(edge.to) ?? -1);
        if (!source || !target || !fromLevel || !toLevel) return { from: edge.from, to: edge.to, path: "" };
        const from = rel(source);
        const to = rel(target);
        const fromX = (from.left + from.right) / 2;
        const toX = (to.left + to.right) / 2;
        // The arrow lands on the condition above the box when there is one, so it never runs through the words.
        const conditions = conditionRefs.current.get(edge.to);
        const toY = conditions ? rel(conditions).top - 3 : to.top;
        const levelBottom = rel(fromLevel).bottom;
        const levelSpan = (levelByNode.get(edge.to) ?? 0) - (levelByNode.get(edge.from) ?? 0);

        // Both bends sit in the 24px band under the source level, at its middle.
        if (levelSpan <= 1) return { from: edge.from, to: edge.to, path: `M ${rounded(fromX)} ${rounded(from.bottom)} V ${rounded(levelBottom + 12)} H ${rounded(toX)} V ${rounded(toY)}` };

        // A long edge drops down the outer gutter so it cannot cut through intervening boxes, turning
        // 6px under its source and 6px above its target level so it never overlays a short edge's bend.
        const routeFromX = Math.abs(fromX - canvasCenter) > 10 ? fromX : toX;
        const gutter = routeFromX <= canvasCenter ? gutterLeft : gutterRight;
        return { from: edge.from, to: edge.to, path: `M ${rounded(fromX)} ${rounded(from.bottom)} V ${rounded(levelBottom + 6)} H ${rounded(gutter)} V ${rounded(rel(toLevel).top - 6)} H ${rounded(toX)} V ${rounded(toY)}` };
      }));
    };

    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(canvas);
    for (const element of [...nodeRefs.current.values(), ...conditionRefs.current.values()]) observer.observe(element);
    return () => observer.disconnect();
  }, [block.edges, levelByNode]);

  return (
    <div ref={canvasRef} className="flow-canvas" aria-hidden="true" style={{ "--flow-columns": columns } as CSSProperties}>
      <svg className="flow-connectors">
        <defs>
          <marker id={markerId} markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
            <path d="M 0 0 L 7 3 L 0 6 Z" />
          </marker>
        </defs>
        {positionedEdges.map((edge) => (
          <path key={`${edge.from}-${edge.to}`} className="flow-edge" data-from={edge.from} data-to={edge.to} d={edge.path} markerEnd={`url(#${markerId})`} />
        ))}
      </svg>

      {layers.map((layer, level) => (
        <div key={`level-${level}`} ref={(element) => { if (element) levelRefs.current.set(level, element); else levelRefs.current.delete(level); }} className="flow-level" data-flow-level={level}>
          {layer.map((node, index) => {
            const gridColumn = nodeColumn(index, layer.length, columns);
            const single = layer.length === 1 ? "true" : undefined;
            const conditions = conditionsByNode.get(node.id);
            return (
              <div key={node.id} className="flow-cell">
                {conditions && (
                  <div ref={(element) => { if (element) conditionRefs.current.set(node.id, element); else conditionRefs.current.delete(node.id); }} className="flow-conditions" data-single={single} style={{ gridColumn }}>
                    {conditions.map((edge) => <span key={edgeKey(edge)} className="flow-condition">{labels.edges.get(edgeKey(edge))}</span>)}
                  </div>
                )}
                <div ref={(element) => { if (element) nodeRefs.current.set(node.id, element); else nodeRefs.current.delete(node.id); }} className="flow-node" data-node-id={node.id} data-single={single} style={{ gridColumn }}>
                  <ToneGlyph tone={node.tone} />{labels.nodes.get(node.id)}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function DecisionFlow({ block, renderInline }: { block: FlowBlock; renderInline: (text: string) => ReactNode }) {
  const layers = useMemo(() => flowLayers(block), [block]);
  const columns = Math.max(1, ...layers.map((layer) => layer.length));
  // renderInline draws on a link scope the parent block consumes as it goes, so a term only
  // links on its first pass and comes back as plain text on the next. Measurement re-renders
  // the diagram without rebuilding that scope, so every label is rendered once here and the
  // elements reused; rendering them inline instead makes the measured pass disagree with the
  // server's and React reports a hydration mismatch. The same elements serve the outline and
  // the diagram, so both copies of a label link the same way.
  const labels = useMemo<Labels>(() => {
    const edges = new Map<string, ReactNode>();
    for (const edge of block.edges) if (edge.label) edges.set(edgeKey(edge), renderInline(edge.label));
    const nodes = new Map<string, ReactNode>();
    for (const layer of layers) for (const node of layer) nodes.set(node.id, renderInline(node.label));
    return { edges, nodes };
  }, [block.edges, layers, renderInline]);

  // Wider than two columns does not fit a phone, so those flows are only the outline, at every width.
  // A diagram is drawn for the eye; the outline beside it, hidden visually, is what assistive tech reads.
  return (
    <div className="decision-flow" role="group" aria-label={`${block.heading ?? "Clinical decision"} flowchart`}>
      {columns > 2
        ? <FlowOutline block={block} labels={labels} className="flow-outline" />
        : <>
            <FlowOutline block={block} labels={labels} className="flow-outline visually-hidden" />
            <FlowDiagram block={block} layers={layers} columns={columns} labels={labels} />
          </>}
    </div>
  );
}
