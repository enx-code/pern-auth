import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  return (
    <Router>

    </Router>
  );
}

export default App