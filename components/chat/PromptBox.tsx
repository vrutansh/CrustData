export function PromptBox() {
  return (
    <div
      style={{
        padding: '0.95rem 1rem 1rem',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(2, 6, 23, 0.96)',
      }}
    >
      <div
        style={{
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 20,
          padding: '0.9rem 1rem',
          background: 'rgba(15, 23, 42, 0.96)',
          boxShadow: '0 18px 60px rgba(2, 6, 23, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Describe your workflow...</div>
          <div style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>Whenever an AI startup hires a VP Engineering...</div>
        </div>
        <button
          style={{
            border: 'none',
            borderRadius: 999,
            padding: '0.7rem 1rem',
            background: 'linear-gradient(135deg, #67e8f9, #7c3aed)',
            color: '#020617',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
}
