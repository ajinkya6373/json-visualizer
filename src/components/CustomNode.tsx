import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { toast } from "sonner";
import type { NodeType } from "@/types/json-tree";

interface CustomNodeData {
  label: string;
  value?: any;
  nodeType: NodeType;
  path: string;
  isHighlighted?: boolean;
}

const getNodeColor = (type: NodeType, isHighlighted: boolean) => {
  if (isHighlighted) return "bg-nodeHighlight text-white border-nodeHighlight";

  switch (type) {
    case "object":
      return "bg-nodeObject text-white border-nodeObject";
    case "array":
      return "bg-nodeArray text-white border-nodeArray";
    case "primitive":
      return "bg-nodePrimitive text-white border-nodePrimitive";
    default:
      return "bg-primary text-primary-foreground border-primary";
  }
};

export const CustomNode = memo(({ data }: NodeProps<CustomNodeData>) => {
  const { label, value, nodeType, path, isHighlighted } = data;

  const handleClick = () => {
    navigator.clipboard.writeText(path);
    toast.success("Path copied to clipboard!", {
      description: path,
    });
  };

  const displayValue = value !== undefined ? String(value) : "";
  const shouldShowValue = nodeType === "primitive" && displayValue.length < 30;

  return (
    <div
      onClick={handleClick}
      className={`px-4 py-2 rounded-lg border-2 shadow-md cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${getNodeColor(
        nodeType,
        isHighlighted || false
      )}`}
      title={`${path}\n${value !== undefined ? `Value: ${value}` : ""}`}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="text-sm font-semibold">
        {label}
        {shouldShowValue && (
          <span className="ml-2 font-normal opacity-90">: {displayValue}</span>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
});

CustomNode.displayName = "CustomNode";
