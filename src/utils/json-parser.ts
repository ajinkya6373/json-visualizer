import type { NodeType, TreeNode } from "@/types/json-tree";

export const parseJsonToTree = (jsonData: any, path = "$"): TreeNode => {
  const getNodeType = (value: any): NodeType => {
    if (value === null || value === undefined) return "primitive";
    if (Array.isArray(value)) return "array";
    if (typeof value === "object") return "object";
    return "primitive";
  };

  const generateId = (path: string) =>
    path.replace(/\$/g, "root").replace(/\[/g, "_").replace(/\]/g, "");

  const buildTree = (data: any, currentPath: string): TreeNode => {
    const nodeType = getNodeType(data);
    const id = generateId(currentPath);

    if (nodeType === "object") {
      const children = Object.keys(data).map((key) =>
        buildTree(data[key], `${currentPath}.${key}`)
      );
      return {
        id,
        type: "object",
        label: currentPath.split(".").pop() || "root",
        path: currentPath,
        children,
      };
    }

    if (nodeType === "array") {
      const children = data.map((item: any, index: number) =>
        buildTree(item, `${currentPath}[${index}]`)
      );
      return {
        id,
        type: "array",
        label:
          currentPath
            .split(".")
            .pop()
            ?.replace(/\[.*\]/, "") || "root",
        path: currentPath,
        children,
      };
    }

    return {
      id,
      type: "primitive",
      label: currentPath.split(".").pop()?.replace(/\[|\]/g, "") || "value",
      value: data,
      path: currentPath,
    };
  };

  return buildTree(jsonData, path);
};

export const validateJson = (
  jsonString: string
): { valid: boolean; error?: string } => {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Invalid JSON",
    };
  }
};

export const findNodeByPath = (
  tree: TreeNode,
  searchPath: string
): TreeNode | null => {
  if (tree.path === searchPath) return tree;

  if (tree.children) {
    for (const child of tree.children) {
      const found = findNodeByPath(child, searchPath);
      if (found) return found;
    }
  }

  return null;
};
