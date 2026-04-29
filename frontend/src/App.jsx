import { use, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me');
        setUser(res.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);      
    }
  };
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/register" element={<h1>Register</h1>} />
      </Routes>
    </Router>
  );
}

export default App