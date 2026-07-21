import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

function AuthPage({ mode = 'login', onAuthSuccess, isModal = false }) {
  const isSignup = mode === 'signup';
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('Please wait...');

    const endpoint = `${API_BASE_URL}/${isSignup ? 'signup' : 'login'}`;
    const payload = isSignup ? { name, email, password } : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setMessage(data.message || 'Done');

      if (response.ok) {
        if (onAuthSuccess) {
          onAuthSuccess();
        }

        if (data.redirectTo) {
          if (data.redirectTo.startsWith('http')) {
            window.location.href = data.redirectTo;
          } else {
            navigate(data.redirectTo);
          }
        }
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={isModal ? styles.modalOverlay : styles.page}>
      <div style={isModal ? styles.modalCard : styles.card}>
        <h2>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
        <p style={styles.subtitle}>
          {isSignup
            ? 'Sign up to start using the app.'
            : 'Log in and continue to your dashboard.'}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {isSignup && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            {isSignup ? 'Sign up' : 'Log in'}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.linkText}>
          {isSignup ? 'Already have an account?' : 'New here?'}{' '}
          <Link to={isSignup ? '/login' : '/signup'} style={styles.link}>
            {isSignup ? 'Log in' : 'Create an account'}
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #dbeafe, #f5f3ff)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(17, 24, 39, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: 1000,
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: 'white',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  modalCard: {
    width: '100%',
    maxWidth: '420px',
    background: 'white',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.25)',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    fontSize: '14px',
  },
  button: {
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    background: '#4f46e5',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '12px',
    color: '#1f2937',
  },
  linkText: {
    marginTop: '16px',
    fontSize: '14px',
    color: '#4b5563',
  },
  link: {
    color: '#4f46e5',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default AuthPage;
