"use client";

import { useEffect } from 'react';
import { useWorkflowStore } from '@/store/workflowStore';

export function WorkflowProvider({ children }: { children: React.ReactNode }) {
  const hydrate = useWorkflowStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}
