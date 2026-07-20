import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Product from './Home/Product';
import AuthPage from './AuthPage';
import Dashboard from './Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }, [isAuthenticated]);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <AuthPage mode="login" onAuthSuccess={handleAuthSuccess} isModal />}
      />
      <Route path="/product/:id" element={isAuthenticated ? <Product /> : <Navigate to="/" replace />} />
      <Route path="/login" element={<AuthPage mode="login" onAuthSuccess={handleAuthSuccess} />} />
      <Route path="/signup" element={<AuthPage mode="signup" onAuthSuccess={handleAuthSuccess} />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;