import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './auth/Register';
import Login  from './Auth/Login';
import { useAuth } from './contexts/AuthContext.js';
import Dashboard from './pages/Dashboard';

const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/"
         element={ !isAuthenticated ? <Register />: < Navigate to = "/dashboard" />

          } />
        <Route path="/login" 
        element={ !isAuthenticated ? <Login />: < Navigate to = "/dashboard" />
          } />
         <Route path="/dashboard" element={!isAuthenticated ? <Dashboard /> : <Login/> 
          } />
    </Routes>
    </Router>
  );
};

export default App;
