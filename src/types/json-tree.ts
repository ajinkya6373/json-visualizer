export type NodeType = "object" | "array" | "primitive" | "root";

export interface TreeNode {
  id: string;
  type: NodeType;
  label: string;
  value?: any;
  path: string;
  children?: TreeNode[];
}

export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    value?: any;
    nodeType: NodeType;
    path: string;
    isHighlighted?: boolean;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}
