import React from 'react';
import { Link } from 'react-router-dom';

const Home = ( { user, error } ) => {
  return (
    <div>
      <div>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {user ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-grey-800">
              Welcome, {user.name}!
            </h2>
            <p className="text-grey-600">Email: {user.email}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl">Please log in or register.</h2>
            <div>
              <Link
                to="/login"
                className="w-full text-white 
              bg-blue-500 p-3 rounded-md hover:bg-blue-600 front-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full text-white 
              bg-blue-200 p-3 rounded-md hover:bg-blue-300 front-medium"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;    