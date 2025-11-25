import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useUser, useClerk, UserButton } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user } = useUser();
  const clerk = useClerk();
  const navigate = useNavigate();
  const { setShowRecruiterLogin } = useContext(AppContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center py-4">
        
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="Velora Logo"
          className="w-24 h-auto rounded cursor-pointer hover:scale-105 transition-transform"
        />

        {/* Navigation / Auth Buttons */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/applications"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Applied Jobs
            </Link>
            <p className="max-sm:hidden text-gray-600">
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9 rounded-full",
                },
              }}
            />
          </div>
        ) : (
          <div className="flex gap-3 max-sm:text-xs">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              Recruiter Login
            </button>
            <button
              onClick={() => clerk.openSignIn()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
