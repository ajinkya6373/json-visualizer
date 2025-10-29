import { useCallback, useEffect, useMemo, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import type { FlowNode, FlowEdge } from "@/types/json-tree";
import { CustomNode } from "./CustomNode";

interface TreeVisualizerProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

const nodeTypes = {
  custom: CustomNode,
};

const TreeVisualizerContent = ({ nodes, edges }: TreeVisualizerProps) => {
  const [nodesState, setNodesState, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdgesState, onEdgesChange] = useEdgesState(edges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNodesState(nodes);
  }, [nodes, setNodesState]);

  useEffect(() => {
    setEdgesState(edges);
  }, [edges, setEdgesState]);

  return (
    <div ref={reactFlowWrapper} className="h-full w-full relative">
      <ReactFlow
        nodes={nodesState}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={2}
        defaultEdgeOptions={{
          style: { strokeWidth: 2, stroke: "#94a3b8" },
        }}
      >
        <Background />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(node) => {
            switch (node.data.nodeType) {
              case "object":
                return "hsl(160, 84%, 39%)";
              case "array":
                return "hsl(217, 91%, 60%)";
              case "primitive":
                return "hsl(45, 93%, 47%)";
              default:
                return "#94a3b8";
            }
          }}
          className="border-2 border-border"
        />
      </ReactFlow>
    </div>
  );
};

export const TreeVisualizer = (props: TreeVisualizerProps) => {
  return (
    <ReactFlowProvider>
      <TreeVisualizerContent {...props} />
    </ReactFlowProvider>
  );
};
