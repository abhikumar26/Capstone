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
        element={
          <>
            <Home />
            {!isAuthenticated && <AuthPage mode="login" onAuthSuccess={handleAuthSuccess} isModal />}
          </>
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <>
              <Home />
              <AuthPage mode="login" onAuthSuccess={handleAuthSuccess} isModal />
            </>
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <>
              <Home />
              <AuthPage mode="signup" onAuthSuccess={handleAuthSuccess} isModal />
            </>
          )
        }
      />
      <Route path="/product/:id" element={isAuthenticated ? <Product /> : <Navigate to="/" replace />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;