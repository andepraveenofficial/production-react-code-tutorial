import { CSSProperties, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const formStyles: Record<string, CSSProperties> = {
  container: {
    maxWidth: '300px',
    margin: '0 auto',
    padding: '20px',
  },
  input: {
    width: '100%',
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: '#ff4444',
    marginBottom: '10px',
  }
};

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, user, logout } = useAuth();
  const { styles } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  if (user) {
    return (
      <div style={{ ...formStyles.container, backgroundColor: styles.secondary }}>
        <p>Welcome, {user.name}!</p>
        <button
          onClick={logout}
          style={{ ...formStyles.button, backgroundColor: styles.primary, color: '#fff' }}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ ...formStyles.container, backgroundColor: styles.secondary }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ ...formStyles.input, backgroundColor: styles.background, color: styles.text, border: `1px solid ${styles.border}` }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ ...formStyles.input, backgroundColor: styles.background, color: styles.text, border: `1px solid ${styles.border}` }}
      />
      {error && <div style={formStyles.error}>{error}</div>}
      <button
        type="submit"
        disabled={isLoading}
        style={{ ...formStyles.button, backgroundColor: styles.primary, color: '#fff', opacity: isLoading ? 0.7 : 1 }}
      >
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      <p style={{ fontSize: '0.8em', color: styles.text, opacity: 0.7, textAlign: 'center', marginTop: '10px' }}>
        Try: test@example.com / password
      </p>
    </form>
  );
}
