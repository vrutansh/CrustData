import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Edge, Node, XYPosition } from 'reactflow';

export type WorkflowNodeData = {
  title: string;
  description: string;
  icon: string;
  category: 'trigger' | 'search' | 'enrichment' | 'llm' | 'action';
  config: Record<string, unknown>;
  status: 'idle' | 'running' | 'success' | 'failed';
  color: string;
};

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

export type WorkflowStoreState = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  addNode: (node: WorkflowNode) => void;
  deleteNode: (id: string) => void;
  updateNode: (id: string, updates: Partial<WorkflowNode>) => void;
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
  onConnect: (connection: { source: string | null; target: string | null }) => void;
  selectNode: (id: string | null) => void;
  clearGraph: () => void;
  hydrate: () => void;
};

export const useWorkflowStore = create<WorkflowStoreState>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
      deleteNode: (id) => set((state) => ({ nodes: state.nodes.filter((node) => node.id !== id), edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id), selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId })),
      updateNode: (id, updates) => set((state) => ({ nodes: state.nodes.map((node) => (node.id === id ? { ...node, ...updates } : node)) })),
      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),
      onConnect: (connection) => {
        const { source, target } = connection;
        if (!source || !target || source === target) return;
        set((state) => ({ edges: [...state.edges, { id: `${source}-${target}`, source, target, animated: false, style: { stroke: '#67e8f9' } }] }));
      },
      selectNode: (id) => set({ selectedNodeId: id }),
      clearGraph: () => set({ nodes: [], edges: [], selectedNodeId: null }),
      hydrate: () => {
        if (typeof window === 'undefined') return;
        const persisted = window.localStorage.getItem('crustflow-workflow');
        if (!persisted) return;
        try {
          const parsed = JSON.parse(persisted) as { state?: Partial<WorkflowStoreState> };
          if (parsed?.state) {
            set({
              nodes: parsed.state.nodes ?? [],
              edges: parsed.state.edges ?? [],
              selectedNodeId: parsed.state.selectedNodeId ?? null,
            });
          }
        } catch {
          // ignore malformed persisted graph
        }
      },
    }),
    {
      name: 'crustflow-workflow',
      partialize: (state) => ({ nodes: state.nodes, edges: state.edges, selectedNodeId: state.selectedNodeId }),
    },
  ),
);

export const getDefaultNodePosition = (index: number): XYPosition => ({ x: 220 + index * 90, y: 140 + index * 70 });
