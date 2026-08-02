"use client";

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useWorkflowStore, type WorkflowNodeData } from '@/store/workflowStore';

const nodeTemplates: Array<{ key: string; label: string; description: string; type: WorkflowNodeData['category'] }> = [
  { key: 'watcher', label: 'Watcher', description: 'Observes signals and triggers', type: 'trigger' },
  { key: 'search', label: 'Company Search', description: 'Finds companies in CrustData', type: 'search' },
  { key: 'enrichment', label: 'Company Enrichment', description: 'Adds firmographic context', type: 'enrichment' },
  { key: 'llm', label: 'LLM', description: 'Generates analysis or summaries', type: 'llm' },
  { key: 'slack', label: 'Slack', description: 'Publishes updates to Slack', type: 'action' },
  { key: 'email', label: 'Email', description: 'Sends outreach emails', type: 'action' },
  { key: 'approval', label: 'Approval', description: 'Requires manual sign-off', type: 'action' },
];

export function NodePalette() {
  const [open, setOpen] = useState(false);
  const addNode = useWorkflowStore((state) => state.addNode);
  const nodes = useWorkflowStore((state) => state.nodes);
  const hydrate = useWorkflowStore((state) => state.hydrate);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    hydrate();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'a' || event.key === 'A' || event.key === '+') {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [hydrate]);

  const handleAdd = (template: (typeof nodeTemplates)[number]) => {
    const id = `${template.key}-${nodes.length + 1}`;
    addNode({
      id,
      type: template.key,
      position: { x: 220 + nodes.length * 40, y: 120 + nodes.length * 40 },
      data: {
        title: template.label,
        description: template.description,
        icon: template.key,
        category: template.type,
        config: {},
        status: 'idle',
        color: '#67e8f9',
      },
    });
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div style={{ position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)', width: 360, maxHeight: 420, overflow: 'auto', background: 'rgba(2, 6, 23, 0.96)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, boxShadow: '0 20px 70px rgba(2,6,23,0.45)', zIndex: 20, padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div style={{ fontWeight: 700 }}>Search Nodes</div>
            <button onClick={() => setOpen(false)} style={{ border: 'none', background: 'transparent', color: '#cbd5e1', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>
          {nodeTemplates.map((template) => (
            <button key={template.key} onClick={() => handleAdd(template)} style={{ width: '100%', textAlign: 'left', padding: '0.75rem 0.9rem', marginBottom: '0.55rem', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, background: 'rgba(15, 23, 42, 0.9)', color: '#f8fafc', cursor: 'pointer' }}>
              <div style={{ fontWeight: 700 }}>{template.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.2rem' }}>{template.description}</div>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
