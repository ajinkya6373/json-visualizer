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
      className={`px-4 py-3 rounded-xl border-2 shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 ${getNodeColor(
        nodeType,
        isHighlighted || false
      )}`}
      title={`${path}\n${value !== undefined ? `Value: ${value}` : ""}`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white/20 border-2 border-white/40" />
      <div className="text-sm font-semibold">
        {label}
        {shouldShowValue && (
          <span className="ml-2 font-normal opacity-90">: {displayValue}</span>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-white/20 border-2 border-white/40" />
    </div>
  );
});

CustomNode.displayName = "CustomNode";
