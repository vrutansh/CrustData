import { WatcherNode } from '@/components/nodes/WatcherNode';
import { CompanySearchNode } from '@/components/nodes/CompanySearchNode';
import { CompanyEnrichmentNode } from '@/components/nodes/CompanyEnrichmentNode';
import { LLMNode } from '@/components/nodes/LLMNode';
import { SlackNode } from '@/components/nodes/SlackNode';
import { GmailNode } from '@/components/nodes/GmailNode';
import { ApprovalNode } from '@/components/nodes/ApprovalNode';
import type { WorkflowNodeData } from '@/store/workflowStore';
import type { NodeTypes } from 'reactflow';

export type NodeRegistryEntry = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: WorkflowNodeData['category'];
  color: string;
  inputs: string[];
  outputs: string[];
  component: NonNullable<NodeTypes[string]>;
};

export const nodeRegistry: Record<string, NodeRegistryEntry> = {
  watcher: {
    id: 'watcher',
    title: 'Watcher',
    description: 'Observes an event and starts the workflow.',
    icon: 'watcher',
    category: 'trigger',
    color: '#67e8f9',
    inputs: [],
    outputs: ['event'],
    component: WatcherNode,
  },
  company_search: {
    id: 'company_search',
    title: 'Company Search',
    description: 'Searches CrustData for matching companies.',
    icon: 'company_search',
    category: 'search',
    color: '#38bdf8',
    inputs: ['trigger'],
    outputs: ['companies'],
    component: CompanySearchNode,
  },
  company_enrichment: {
    id: 'company_enrichment',
    title: 'Company Enrichment',
    description: 'Adds firmographic context to the company profile.',
    icon: 'company_enrichment',
    category: 'enrichment',
    color: '#8b5cf6',
    inputs: ['companies'],
    outputs: ['enriched_companies'],
    component: CompanyEnrichmentNode,
  },
  llm_summary: {
    id: 'llm_summary',
    title: 'Summary',
    description: 'Generates a concise summary or explanation.',
    icon: 'llm_summary',
    category: 'llm',
    color: '#a78bfa',
    inputs: ['context'],
    outputs: ['summary'],
    component: LLMNode,
  },
  slack: {
    id: 'slack',
    title: 'Slack',
    description: 'Publishes an update into Slack.',
    icon: 'slack',
    category: 'action',
    color: '#22c55e',
    inputs: ['summary'],
    outputs: ['message_sent'],
    component: SlackNode,
  },
  email: {
    id: 'email',
    title: 'Email',
    description: 'Sends a follow-up email.',
    icon: 'email',
    category: 'action',
    color: '#f59e0b',
    inputs: ['context'],
    outputs: ['email_sent'],
    component: GmailNode,
  },
  approval: {
    id: 'approval',
    title: 'Approval',
    description: 'Routes the workflow for manual approval.',
    icon: 'approval',
    category: 'action',
    color: '#fb7185',
    inputs: ['context'],
    outputs: ['approved'],
    component: ApprovalNode,
  },
};

export function getNodeRegistryEntry(nodeType: string): NodeRegistryEntry | undefined {
  return nodeRegistry[nodeType];
}

export function buildNodeTypes(): NodeTypes {
  return Object.fromEntries(Object.entries(nodeRegistry).map(([key, entry]) => [key, entry.component]));
}
