import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';

const AdminLogin = () => {
  const { login } = useCMS();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message);
    }
  };

  return (
    <>
      <style>{`
        .login-page {
          min-height: calc(100vh - 136px);
          display: flex; align-items: center; justify-content: center;
          padding: 2rem;
        }
        .login-card {
          background: var(--white); border: 1.5px solid var(--border);
          border-radius: var(--radius-md); padding: 2.5rem;
          width: 100%; max-width: 400px;
        }
        .login-card h1 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.35rem; }
        .login-card .sub { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; }
        .login-error {
          background: #fef2f2; border: 1px solid #fecaca;
          border-radius: var(--radius-sm); padding: 0.75rem 1rem;
          font-size: 0.82rem; color: #b91c1c; margin-bottom: 1rem;
        }
      `}</style>

      <div className="login-page">
        <div className="login-card" id="admin-login-card">
          <h1>Admin Login</h1>
          <p className="sub">Sign in to manage vehicles, pricing, and bookings</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="admin" id="admin-username" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" id="admin-password" />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} id="admin-login-btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
