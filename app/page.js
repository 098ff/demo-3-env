export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://pre-api.example.com';

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #d97706, #92400e)',
      color: '#fff',
    }}>
      <main style={{
        textAlign: 'center',
        maxWidth: '520px',
        width: '90%',
        background: 'rgba(255,255,255,0.1)',
        padding: '2.5rem',
        borderRadius: '16px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.15)',
      }}>
        <div style={{
          display: 'inline-block',
          padding: '0.35rem 1rem',
          borderRadius: '999px',
          background: '#f59e0b',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          marginBottom: '1.25rem',
          color: '#fff',
        }}>
          🟡 Pre-Production (PRE)
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 700 }}>
          Vercel 3-Env Demo
        </h1>

        <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          This page proves each environment has its own config.
        </p>

        <div style={{
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'left',
          fontSize: '0.9rem',
          lineHeight: 1.8,
        }}>
          <div><strong>ENVIRONMENT:</strong> Pre-Production</div>
          <div><strong>BRANCH:</strong> preprod</div>
          <div style={{ wordBreak: 'break-all' }}><strong>API_URL:</strong> {apiUrl}</div>
        </div>
      </main>
    </div>
  );
}
