import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Dashboard</h2>
        <p>You are logged in successfully.</p>
        <Link to="/login" style={styles.link}>
          Log out
        </Link>
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
    background: '#f8fafc',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    background: 'white',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  link: {
    color: '#4f46e5',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};

export default Dashboard;
