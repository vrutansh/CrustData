export function Inspector() {
  return (
    <aside style={{ width: 300, borderLeft: '1px solid rgba(255,255,255,0.08)', background: 'rgba(7, 17, 31, 0.94)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Inspector</div>
      <div style={{ border: '1px dashed rgba(255,255,255,0.12)', borderRadius: 16, padding: '1rem', color: '#94a3b8', minHeight: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        No node selected
      </div>
    </aside>
  );
}
