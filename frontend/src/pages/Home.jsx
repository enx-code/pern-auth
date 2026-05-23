import React from 'react';

const Home = ( { user, error } ) => {
  return (
    <div>
      <div>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {user ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-grey-800">Welcome, {user.name}!</h2>
            <p className="text-grey-600">Email: {user.email}</p>
          </div>
        ) : (
          <h2 className="text-2xl">Please log in or register.</h2>
        )}
      </div>
    </div>
      
  );
};

export default Home;    