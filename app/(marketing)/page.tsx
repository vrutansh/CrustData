import dynamic from 'next/dynamic';
import { AppLayout } from '@/components/layout/AppLayout';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Workspace } from '@/components/layout/Workspace';
import { WorkflowToolbar } from '@/components/workflow/WorkflowToolbar';
import { PromptBox } from '@/components/chat/PromptBox';
import { Inspector } from '@/components/layout/Inspector';
import { WorkflowProvider } from '@/components/workflow/WorkflowProvider';

const WorkflowCanvas = dynamic(
  () => import('@/components/workflow/WorkflowCanvas').then((mod) => mod.WorkflowCanvas),
  { ssr: false },
);

export default function MarketingPage() {
  return (
    <WorkflowProvider>
      <AppLayout>
        <Sidebar />
        <Workspace>
          <Header />
          <WorkflowToolbar />
          <WorkflowCanvas />
          <PromptBox />
        </Workspace>
        <Inspector />
      </AppLayout>
    </WorkflowProvider>
  );
}
