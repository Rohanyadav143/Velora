import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useUser, useClerk, UserButton } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user } = useUser();
  const clerk = useClerk();
  const navigate = useNavigate()
  const {setShowRecruiterLogin} = useContext(AppContext)

  return (
    <div className='shadow py-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <img onClick={()=> navigate('/')} src={assets.logo} alt="" className="w-20 h-auto rounded cursor-pointer" />

        {user ? (
          <div className='flex items-center gap-3'>
            <Link to={'/applications'} className='text-gray-700 hover:underline'>
              Applied Jobs
            </Link>
            <p className='max-sm:hidden'>Hi, {user.firstName + " " + user.lastName}</p>
            <UserButton/>
          </div>
        ) : (
          <div className='flex gap-4 max-sm:text-xs'>
            <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
            <button onClick={() => clerk.openSignIn()} className='bg-blue-600 text-white px-3 py-1 rounded'>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
