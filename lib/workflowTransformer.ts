import type { WorkflowNodeData } from '@/store/workflowStore';
import type { WorkflowNode, WorkflowEdge } from '@/store/workflowStore';
import { getNodeRegistryEntry } from '@/lib/nodeRegistry';

export type PlannerStep = {
  id: string;
  type: string;
  depends_on?: string[];
  config?: Record<string, unknown>;
};

export type PlannerWorkflow = {
  workflow?: {
    name?: string;
    trigger?: { type?: string; event?: string };
    steps: PlannerStep[];
  };
};

export function convertWorkflowToReactFlow(workflow: PlannerWorkflow): { nodes: WorkflowNode[]; edges: WorkflowEdge[] } {
  const steps = workflow.workflow?.steps ?? [];
  const nodes: WorkflowNode[] = [];

  if (workflow.workflow?.trigger) {
    const triggerEntry = getNodeRegistryEntry(workflow.workflow.trigger.type ?? 'watcher');
    nodes.push({
      id: 'trigger',
      type: workflow.workflow.trigger.type ?? 'watcher',
      position: { x: 220, y: 120 },
      data: {
        title: triggerEntry?.title ?? 'Watcher',
        description: triggerEntry?.description ?? 'Starts the workflow',
        icon: triggerEntry?.icon ?? 'watcher',
        category: triggerEntry?.category ?? 'trigger',
        config: { event: workflow.workflow.trigger.event ?? 'trigger' },
        status: 'idle',
        color: triggerEntry?.color ?? '#67e8f9',
        inputs: triggerEntry?.inputs ?? [],
        outputs: triggerEntry?.outputs ?? [],
      },
    });
  }

  steps.forEach((step, index) => {
    const entry = getNodeRegistryEntry(step.type);
    nodes.push({
      id: step.id,
      type: step.type,
      position: { x: 220 + (index % 3) * 260, y: 260 + Math.floor(index / 3) * 180 },
      data: {
        title: entry?.title ?? step.type,
        description: entry?.description ?? 'Workflow step',
        icon: entry?.icon ?? step.type,
        category: entry?.category ?? 'action',
        config: step.config ?? {},
        status: 'idle',
        color: entry?.color ?? '#67e8f9',
        inputs: entry?.inputs ?? [],
        outputs: entry?.outputs ?? [],
      },
    });
  });

  const edges: WorkflowEdge[] = [];
  const triggerId = workflow.workflow?.trigger ? 'trigger' : null;

  if (triggerId) {
    steps.forEach((step) => {
      if (step.depends_on?.length) {
        step.depends_on.forEach((dependency) => {
          edges.push({ id: `${triggerId}-${step.id}`, source: triggerId, target: step.id, animated: false, style: { stroke: '#67e8f9' } });
        });
      } else {
        edges.push({ id: `${triggerId}-${step.id}`, source: triggerId, target: step.id, animated: false, style: { stroke: '#67e8f9' } });
      }
    });
  }

  steps.forEach((step) => {
    (step.depends_on ?? []).forEach((dependency) => {
      if (dependency === 'trigger' || dependency === 'watcher') return;
      edges.push({ id: `${dependency}-${step.id}`, source: dependency, target: step.id, animated: false, style: { stroke: '#67e8f9' } });
    });
  });

  return { nodes, edges };
}
