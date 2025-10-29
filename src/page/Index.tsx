import { JsonInput } from "@/components/JsonInput";
import { SearchBar } from "@/components/SearchBar";
import { TreeVisualizer } from "@/components/TreeVisualizer";
import type { FlowEdge, FlowNode } from "@/types/json-tree";
import { findNodeByPath, parseJsonToTree } from "@/utils/json-parser";
import { convertToFlowElements } from "@/utils/tree-layout";
import { useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [flowNodes, setFlowNodes] = useState<FlowNode[]>([]);
  const [flowEdges, setFlowEdges] = useState<FlowEdge[]>([]);
  const [currentTree, setCurrentTree] = useState<any>(null);

  const handleGenerateTree = (jsonData: any) => {
    try {
      const tree = parseJsonToTree(jsonData);
      setCurrentTree(tree);
      const { nodes, edges } = convertToFlowElements(tree);
      setFlowNodes(nodes);
      setFlowEdges(edges);
    } catch (error) {
      toast.error("Failed to generate tree");
      console.error(error);
    }
  };

  const handleSearch = (path: string) => {
    if (!currentTree) {
      toast.error("Please generate a tree first");
      return;
    }

    const foundNode = findNodeByPath(currentTree, path);

    if (foundNode) {
      const { nodes, edges } = convertToFlowElements(currentTree, path);
      setFlowNodes(nodes);
      setFlowEdges(edges);
      toast.success("Node found and highlighted!");
    } else {
      toast.error("No match found", {
        description: `Could not find path: ${path}`,
      });
    }
  };

  const handleClear = () => {
    setFlowNodes([]);
    setFlowEdges([]);
    setCurrentTree(null);
  };
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto p-6 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">JSON Tree Visualizer</h1>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-scroll">
          <div className="bg-blue-100 rounded-lg p-6 border border-border">
            <JsonInput onGenerate={handleGenerateTree} onClear={handleClear} />
          </div>

          <div className="rounded-lg border border-border flex flex-col overflow-hidden min-h-[400px]">
            <div className="p-4 border-b border-border">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex-1 relative">
              {flowNodes.length > 0 ? (
                <TreeVisualizer nodes={flowNodes} edges={flowEdges} />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>Generate a tree to visualize JSON structure</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
