export default function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <div className="card">
          <h3>Active workflows</h3>
          <p>3 running</p>
        </div>
        <div className="card">
          <h3>Recent runs</h3>
          <p>12 this week</p>
        </div>
        <div className="card">
          <h3>Templates</h3>
          <p>8 ready to use</p>
        </div>
      </div>
    </main>
  );
}
