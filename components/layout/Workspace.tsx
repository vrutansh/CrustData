import type { ReactNode } from 'react';

export function Workspace({ children }: { children: ReactNode }) {
  return (
    <section style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: 'linear-gradient(180deg, rgba(2,6,23,0.96), rgba(15,23,42,0.98))' }}>
      {children}
    </section>
  );
}
