"use client";

import { Plus, LayoutGrid, Play, Trash2 } from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';

export function WorkflowToolbar() {
  const clearGraph = useWorkflowStore((state) => state.clearGraph);
  const setPaletteOpen = useWorkflowStore((state) => state.setPaletteOpen);
  const selectNode = useWorkflowStore((state) => state.selectNode);

  const handleAdd = () => {
    selectNode(null);
    setPaletteOpen(true);
  };

  return (
    <div style={{ display: 'flex', gap: '0.6rem', padding: '0.9rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(2, 6, 23, 0.9)' }}>
      <button onClick={handleAdd} style={{ border: 'none', borderRadius: 999, background: 'linear-gradient(135deg, #67e8f9, #7c3aed)', padding: '0.6rem 0.85rem', color: '#020617', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Plus size={16} /> Add Node
      </button>
      <button style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '0.6rem 0.85rem', background: 'rgba(15, 23, 42, 0.9)', color: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <LayoutGrid size={16} /> Auto Layout
      </button>
      <button style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '0.6rem 0.85rem', background: 'rgba(15, 23, 42, 0.9)', color: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Play size={16} /> Run
      </button>
      <button onClick={clearGraph} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '0.6rem 0.85rem', background: 'rgba(15, 23, 42, 0.9)', color: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Trash2 size={16} /> Clear
      </button>
    </div>
  );
}
