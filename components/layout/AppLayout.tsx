import type { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#020617', color: '#f8fafc', overflow: 'hidden' }}>
      {children}
    </div>
  );
}
