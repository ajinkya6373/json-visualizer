import { JsonInput } from "@/components/JsonInput";
import type { FlowEdge, FlowNode } from "@/types/json-tree";
import { parseJsonToTree } from "@/utils/json-parser";
import { convertToFlowElements } from "@/utils/tree-layout";
import { useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [flowNodes, setFlowNodes] = useState<FlowNode[]>([]);
  const [flowEdges, setFlowEdges] = useState<FlowEdge[]>([]);
  const [currentTree, setCurrentTree] = useState<any>(null);
  const [highlightedPath, setHighlightedPath] = useState<string>("");
  const handleGenerateTree = (jsonData: any) => {
    try {
      const tree = parseJsonToTree(jsonData);
      setCurrentTree(tree);
      const { nodes, edges } = convertToFlowElements(tree);
      setFlowNodes(nodes);
      setFlowEdges(edges);
      setHighlightedPath("");
    } catch (error) {
      toast.error("Failed to generate tree");
      console.error(error);
    }
  };

  const handleClear = () => {
    setFlowNodes([]);
    setFlowEdges([]);
    setCurrentTree(null);
    setHighlightedPath("");
  };
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto p-6 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">JSON Tree Visualizer</h1>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
          <div className="bg-blue-100 rounded-lg p-6 border border-border">
            <JsonInput onGenerate={handleGenerateTree} onClear={handleClear} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
