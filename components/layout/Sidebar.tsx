import { Home, Layers, Sparkles, History, Settings } from 'lucide-react';

const items = [
  { icon: Home, label: 'Home' },
  { icon: Layers, label: 'Workflows' },
  { icon: Sparkles, label: 'Templates' },
  { icon: History, label: 'History' },
  { icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside style={{ width: 84, borderRight: '1px solid rgba(255,255,255,0.08)', background: 'rgba(7, 17, 31, 0.94)', padding: '1rem 0.7rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.4rem', marginBottom: '0.5rem' }}>
        <div style={{ width: 34, height: 34, borderRadius: 12, background: 'linear-gradient(135deg, #67e8f9, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#020617' }}>C</div>
      </div>
      {items.map(({ icon: Icon, label }) => (
        <button key={label} style={{ border: 'none', background: 'transparent', color: '#cbd5e1', padding: '0.6rem 0.4rem', borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
          <Icon size={18} />
          <span style={{ fontSize: '0.62rem' }}>{label}</span>
        </button>
      ))}
    </aside>
  );
}
