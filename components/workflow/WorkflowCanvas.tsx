"use client";

import { useCallback, useEffect } from 'react';
import ReactFlow, { applyEdgeChanges, applyNodeChanges, Background, ConnectionLineType, type Connection, type Edge, type EdgeChange, type EdgeTypes, type Node, type NodeChange, type NodeTypes } from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowStore, type WorkflowNode } from '@/store/workflowStore';
import { WorkflowBackground } from './WorkflowBackground';
import { WorkflowMiniMap } from './WorkflowMiniMap';
import { WorkflowControls } from './WorkflowControls';
import { NodePalette } from './NodePalette';
import { WatcherNode } from '@/components/nodes/WatcherNode';
import { CompanySearchNode } from '@/components/nodes/CompanySearchNode';
import { CompanyEnrichmentNode } from '@/components/nodes/CompanyEnrichmentNode';
import { LLMNode } from '@/components/nodes/LLMNode';
import { SlackNode } from '@/components/nodes/SlackNode';
import { GmailNode } from '@/components/nodes/GmailNode';
import { ApprovalNode } from '@/components/nodes/ApprovalNode';

const nodeTypes: NodeTypes = {
  watcher: WatcherNode,
  search: CompanySearchNode,
  enrichment: CompanyEnrichmentNode,
  llm: LLMNode,
  slack: SlackNode,
  email: GmailNode,
  approval: ApprovalNode,
};

const edgeTypes: EdgeTypes = {};

export function WorkflowCanvas() {
  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const selectedNodeId = useWorkflowStore((state) => state.selectedNodeId);
  const setNodes = useWorkflowStore((state) => state.setNodes);
  const setEdges = useWorkflowStore((state) => state.setEdges);
  const onConnect = useWorkflowStore((state) => state.onConnect);
  const selectNode = useWorkflowStore((state) => state.selectNode);
  const deleteNode = useWorkflowStore((state) => state.deleteNode);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes(applyNodeChanges(changes, nodes));
  }, [nodes, setNodes]);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges(applyEdgeChanges(changes, edges));
  }, [edges, setEdges]);

  const handleConnect = useCallback((connection: Connection) => {
    onConnect(connection);
  }, [onConnect]);

  const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    selectNode(node.id);
  }, [selectNode]);

  const handlePaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  const handleDelete = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Delete' && selectedNodeId) {
      deleteNode(selectedNodeId);
    }
  }, [deleteNode, selectedNodeId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', handleDelete);
    return () => window.removeEventListener('keydown', handleDelete);
  }, [handleDelete]);

  return (
    <div style={{ flex: 1, minHeight: 0, position: 'relative', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <WorkflowBackground />
      <ReactFlow
        nodes={nodes as Node[]}
        edges={edges as Edge[]}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        deleteKeyCode={null}
      >
        <Background gap={20} size={1} color="rgba(148, 163, 184, 0.15)" />
        <WorkflowMiniMap />
        <WorkflowControls />
      </ReactFlow>
      <NodePalette />
    </div>
  );
}
