"use client";

import { useWorkflowStore } from '@/store/workflowStore';

export function Inspector() {
  const selectedNodeId = useWorkflowStore((state) => state.selectedNodeId);
  const nodes = useWorkflowStore((state) => state.nodes);
  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  return (
    <aside style={{ width: 300, borderLeft: '1px solid rgba(255,255,255,0.08)', background: 'rgba(7, 17, 31, 0.94)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Inspector</div>
      {selectedNode ? (
        <div style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '1rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>{selectedNode.data.title}</div>
          <div style={{ color: '#94a3b8' }}>{selectedNode.data.description}</div>
          <div><strong>Category:</strong> {selectedNode.data.category}</div>
          <div><strong>Configuration</strong></div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.82rem', color: '#67e8f9' }}>{JSON.stringify(selectedNode.data.config, null, 2)}</pre>
        </div>
      ) : (
        <div style={{ border: '1px dashed rgba(255,255,255,0.12)', borderRadius: 16, padding: '1rem', color: '#94a3b8', minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          No node selected
        </div>
      )}
    </aside>
  );
}
