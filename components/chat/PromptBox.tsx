"use client";

import { useEffect, useState } from 'react';
import { useWorkflowStore } from '@/store/workflowStore';
import { convertWorkflowToReactFlow } from '@/lib/workflowTransformer';

const planSteps = [
  'Understanding request...',
  'Selecting trigger...',
  'Finding required tools...',
  'Validating workflow...',
  'Generating layout...',
  'Canvas animates in...',
];

export function PromptBox() {
  const [prompt, setPrompt] = useState('Whenever an AI startup raises funding, summarize it and send me a Slack message.');
  const [status, setStatus] = useState('Waiting to generate...');
  const [isGenerating, setIsGenerating] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const setNodes = useWorkflowStore((state) => state.setNodes);
  const setEdges = useWorkflowStore((state) => state.setEdges);
  const clearGraph = useWorkflowStore((state) => state.clearGraph);

  useEffect(() => {
    if (!isGenerating) return;

    const interval = window.setInterval(() => {
      setStepIndex((value) => (value + 1) % planSteps.length);
    }, 450);

    return () => window.clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setStatus(planSteps[0]);
    setStepIndex(0);

    const plannerUrl = process.env.NEXT_PUBLIC_PLANNER_URL ?? 'http://127.0.0.1:8000/api/planner';

    try {
      const response = await fetch(plannerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setStatus(planSteps[Math.min(4, planSteps.length - 1)]);
      const { nodes, edges } = convertWorkflowToReactFlow(data);

      clearGraph();
      const stagedNodes = nodes.slice(0, 1);
      const stagedEdges = edges.filter((edge) => edge.target === stagedNodes[0]?.id || edge.source === 'trigger');
      setNodes(stagedNodes);
      setEdges(stagedEdges);

      for (let index = 1; index < nodes.length; index += 1) {
        await new Promise((resolve) => window.setTimeout(resolve, 280));
        setNodes([...nodes.slice(0, index + 1)]);
        setEdges(edges.filter((edge) => edge.target === nodes[index].id || edge.source === 'trigger' || edge.target === nodes[index - 1]?.id));
      }

      setStatus('Canvas animates in');
    } catch (error) {
      setStatus('Planner unavailable, using fallback workflow');
      const { nodes, edges } = convertWorkflowToReactFlow({ workflow: { name: 'Fallback', trigger: { type: 'watcher', event: 'trigger' }, steps: [{ id: 'company_search', type: 'company_search', depends_on: [] }] } });
      clearGraph();
      setNodes(nodes);
      setEdges(edges);
    } finally {
      setTimeout(() => setIsGenerating(false), 400);
    }
  };

  return (
    <div
      style={{
        padding: '0.95rem 1rem 1rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(2, 6, 23, 0.96)',
      }}
    >
      <div
        style={{
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 20,
          padding: '0.9rem 1rem',
          background: 'rgba(15, 23, 42, 0.96)',
          boxShadow: '0 18px 60px rgba(2, 6, 23, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div style={{ flex: 1 }}>
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', color: '#f8fafc', resize: 'none', outline: 'none' }}
            rows={2}
          />
          <div style={{ marginTop: '0.4rem', color: isGenerating ? '#67e8f9' : '#64748b', fontSize: '0.84rem' }}>{isGenerating ? `${planSteps[stepIndex]} · ${status}` : status}</div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          style={{
            border: 'none',
            borderRadius: 999,
            padding: '0.7rem 1rem',
            background: isGenerating ? 'rgba(103,232,249,0.25)' : 'linear-gradient(135deg, #67e8f9, #7c3aed)',
            color: '#020617',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {isGenerating ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </div>
  );
}
