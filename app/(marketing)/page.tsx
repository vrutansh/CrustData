import { AppLayout } from '@/components/layout/AppLayout';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Workspace } from '@/components/layout/Workspace';
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';
import { PromptBox } from '@/components/chat/PromptBox';
import { Inspector } from '@/components/layout/Inspector';

export default function MarketingPage() {
  return (
    <AppLayout>
      <Sidebar />
      <Workspace>
        <Header />
        <WorkflowCanvas />
        <PromptBox />
      </Workspace>
      <Inspector />
    </AppLayout>
  );
}
