import { Activity, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header style={{ height: 68, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(7, 17, 31, 0.82)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(103,232,249,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={16} color="#67e8f9" />
        </div>
        <div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>CrustFlow</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>AI workflow studio</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#94a3b8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', padding: '0.45rem 0.7rem', borderRadius: 999, background: 'rgba(34, 197, 94, 0.12)', color: '#4ade80' }}>
          <Activity size={14} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Ready</span>
        </div>
      </div>
    </header>
  );
}
