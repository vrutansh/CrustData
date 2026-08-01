export type WorkflowNode = {
  id: string;
  type: string;
  label: string;
};

export const workflowStore = {
  nodes: [] as WorkflowNode[],
  addNode(node: WorkflowNode) {
    this.nodes.push(node);
  },
};
