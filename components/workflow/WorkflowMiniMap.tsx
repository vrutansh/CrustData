"use client";

import { MiniMap } from 'reactflow';

export function WorkflowMiniMap() {
  return <MiniMap nodeColor={(node) => (node.data?.color as string) || '#67e8f9'} style={{ background: 'rgba(2, 6, 23, 0.95)' }} />;
}
