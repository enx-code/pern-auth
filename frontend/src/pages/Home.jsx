import { Link } from 'react-router-dom';

const Home = ( { user } ) => {
  return (
    <div className="min-h-[80vh] flex items-center 
    justify-center p-4">
      <div className="bg-white p-8 rounded-lg 
      shadow-md w-full max-w-lg text-center">
        {user ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-grey-800">
              Welcome, {user.name}!
            </h2>
            <p className="text-grey-600">Email: {user.email}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6">Please log in or register.</h2>
            <div className="flex flex-col gap-y-4">
              <Link
                to="/login"
                className="w-full text-white 
              bg-blue-500 p-3 rounded-md hover:bg-blue-600 front-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="w-full text-gray-800 
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
