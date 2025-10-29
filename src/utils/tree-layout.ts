import type { TreeNode, FlowNode, FlowEdge } from "@/types/json-tree";

const HORIZONTAL_SPACING = 200;
const VERTICAL_SPACING = 100;

export const convertToFlowElements = (
  tree: TreeNode,
  highlightedPath?: string
): { nodes: FlowNode[]; edges: FlowEdge[] } => {
  const nodes: FlowNode[] = [];
  const edges: FlowEdge[] = [];

  const computeSubtreeWidth = (node: TreeNode): number => {
    if (!node.children || node.children.length === 0) return HORIZONTAL_SPACING;
    let totalWidth = 0;
    node.children.forEach((child) => {
      totalWidth += computeSubtreeWidth(child);
    });
    return Math.max(totalWidth, HORIZONTAL_SPACING);
  };

  const calculatePositions = (
    node: TreeNode,
    depth: number,
    x: number
  ): number => {
    const subtreeWidth = computeSubtreeWidth(node);
    const startX = x - subtreeWidth / 2;

    const isHighlighted = highlightedPath === node.path;

    nodes.push({
      id: node.id,
      type: "custom",
      position: { x, y: depth * VERTICAL_SPACING },
      data: {
        label: node.label,
        value: node.value,
        nodeType: node.type,
        path: node.path,
        isHighlighted,
      },
    });

    if (node.children && node.children.length > 0) {
      let childX = startX;
      node.children.forEach((child) => {
        const childWidth = computeSubtreeWidth(child);
        const childCenter = childX + childWidth / 2;

        edges.push({
          id: `${node.id}-${child.id}`,
          source: node.id,
          target: child.id,
          type: "smoothstep",
        });

        calculatePositions(child, depth + 1, childCenter);
        childX += childWidth;
      });
    }

    return subtreeWidth;
  };

  calculatePositions(tree, 0, 400);
  return { nodes, edges };
};
