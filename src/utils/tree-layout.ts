import type { TreeNode, FlowNode, FlowEdge } from "@/types/json-tree";

const HORIZONTAL_SPACING = 200;
const VERTICAL_SPACING = 100;

export const convertToFlowElements = (
  tree: TreeNode,
  highlightedPath?: string
): { nodes: FlowNode[]; edges: FlowEdge[] } => {
  const nodes: FlowNode[] = [];
  const edges: FlowEdge[] = [];

  const calculatePositions = (
    node: TreeNode,
    depth: number,
    offset: { x: number }
  ): void => {
    const isHighlighted = highlightedPath === node.path;

    nodes.push({
      id: node.id,
      type: "custom",
      position: { x: offset.x, y: depth * VERTICAL_SPACING },
      data: {
        label: node.label,
        value: node.value,
        nodeType: node.type,
        path: node.path,
        isHighlighted,
      },
    });

    if (node.children && node.children.length > 0) {
      const childrenWidth = node.children.length * HORIZONTAL_SPACING;
      let childX = offset.x - childrenWidth / 2 + HORIZONTAL_SPACING / 2;

      node.children.forEach((child) => {
        edges.push({
          id: `${node.id}-${child.id}`,
          source: node.id,
          target: child.id,
          type: "smoothstep",
        });

        calculatePositions(child, depth + 1, { x: childX });
        childX += HORIZONTAL_SPACING;
      });
    }
  };

  calculatePositions(tree, 0, { x: 400 });

  return { nodes, edges };
};
