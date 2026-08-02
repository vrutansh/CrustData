"use client";

import { Handle, Position } from 'reactflow';
import type { WorkflowNodeData } from '@/store/workflowStore';
import { motion } from 'framer-motion';

export function BaseNode({ data, selected }: { data: WorkflowNodeData; selected?: boolean }) {
  const color = data.color || '#67e8f9';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        width: 240,
        borderRadius: 18,
        background: 'rgba(2, 6, 23, 0.95)',
        border: selected ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.12)',
        boxShadow: selected ? `0 0 0 1px ${color}, 0 18px 45px rgba(2,6,23,0.35)` : '0 18px 45px rgba(2,6,23,0.2)',
        color: '#f8fafc',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '0.8rem 0.9rem', borderBottom: '1px solid rgba(255,255,255,0.08)', background: `${color}16`, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <div style={{ width: 30, height: 30, borderRadius: 10, background: color, color: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{data.icon?.slice(0, 1).toUpperCase()}</div>
        <div>
          <div style={{ fontSize: '0.92rem', fontWeight: 700 }}>{data.title}</div>
          <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{data.category}</div>
        </div>
      </div>
      <div style={{ padding: '0.8rem 0.9rem', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
        {data.description}
      </div>
      <div style={{ padding: '0.75rem 0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94a3b8', fontSize: '0.72rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span>Input</span>
        <span>Output</span>
      </div>
      <Handle type="target" position={Position.Left} style={{ background: color }} />
      <Handle type="source" position={Position.Right} style={{ background: color }} />
    </motion.div>
  );
}
