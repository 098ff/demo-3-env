import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  // Vercel provides VERCEL_ENV = 'development' | 'preview' | 'production'
  const vercelEnv = process.env.VERCEL_ENV || 'development';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '(not set)';

  const envLabel = {
    development: 'Development',
    preview: 'Preview',
    production: 'Production',
  }[vercelEnv] ?? vercelEnv;

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e1e2f, #2a2a3b)',
      color: '#fff',
    }}>
      <main style={{
        textAlign: 'center',
        maxWidth: '500px',
        background: 'rgba(255,255,255,0.08)',
        padding: '2rem',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Vercel Environment Demo
        </h1>
        <div style={{ marginBottom: '1rem' }}>
          <strong>{envLabel} (VERCEL_ENV)</strong>
        </div>
        <div style={{ wordBreak: 'break-all' }}>
          <strong>API URL:</strong> {apiUrl}
        </div>
      </main>
    </div>
  );
}

