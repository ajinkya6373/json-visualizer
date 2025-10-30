import { JsonInput } from "@/components/JsonInput";
import { SearchBar } from "@/components/SearchBar";
import { TreeVisualizer } from "@/components/TreeVisualizer";
import type { FlowEdge, FlowNode } from "@/types/json-tree";
import { findNodeByPath, parseJsonToTree } from "@/utils/json-parser";
import { convertToFlowElements } from "@/utils/tree-layout";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const getInitialDarkMode = () => {
  const stored = localStorage.getItem("theme");
  return stored ? stored === "dark" : true;
};

const Index = () => {
  const [flowNodes, setFlowNodes] = useState<FlowNode[]>([]);
  const [flowEdges, setFlowEdges] = useState<FlowEdge[]>([]);
  const [currentTree, setCurrentTree] = useState<any>(null);

  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    if (darkMode) {
      console.log("Enabling dark mode");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      console.log("Enabling dark mode");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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
    <div className="min-h-screen w-full bg-[rgb(var(--gray-50))] dark:bg-[rgb(var(--gray-900))] transition-colors duration-200">
      <div className="mx-auto p-6 h-screen flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[rgb(var(--gray-900))] dark:text-[rgb(var(--gray-100))]">
            JSON Tree Visualizer
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn-theme btn"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-scroll">
          <div className="card-elevated p-6">
            <JsonInput onGenerate={handleGenerateTree} onClear={handleClear} />
          </div>

          <div className="card flex flex-col overflow-hidden min-h-[400px]">
            <div className="p-4 border-b border-[rgb(var(--gray-200))] dark:border-[rgb(var(--gray-700))]">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex-1 relative">
              {flowNodes.length > 0 ? (
                <TreeVisualizer nodes={flowNodes} edges={flowEdges} />
              ) : (
                <div className="h-full flex items-center justify-center text-[rgb(var(--gray-500))] dark:text-[rgb(var(--gray-400))]">
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
