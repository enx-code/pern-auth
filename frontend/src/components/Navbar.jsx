import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <Link to="/" className="text-xl font-bold"
      >PERN Auth</Link>
      <div>
        (user ? (
          <>
            <span className="mr-4">Welcome, {user.username}</span>)
      </div>
    </nav>
    
  );
};

export default Navbar;