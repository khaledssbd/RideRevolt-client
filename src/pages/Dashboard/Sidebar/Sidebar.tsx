import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { AiOutlineBars } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CustomerMenu from './Menu/CustomerMenu';
import AdminMenu from './Menu/AdminMenu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout, selectUserRole } from '@/redux/features/auth/authSlice';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [isActive, setActive] = useState(true);
  const role = useAppSelector(selectUserRole);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold text-2xl md:text-3xl">
            <Link to="/">
              <Button className="flex justify-center items-center gap-1">
                <img
                  className="w-8 sm:w-10 rounded-lg"
                  src="/RideRevolt.png"
                  alt="RideRevolt"
                />
                <span className="text-black">RideRevolt</span>
              </Button>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none text-black dark:text-white"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-300 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-gray-300 mx-auto text-2xl md:text-3xl font-semibold">
              <Link to="/">
                <button className="flex justify-center items-center gap-1">
                  <img
                    className="w-8 sm:w-10 rounded-lg"
                    src="/RideRevolt.png"
                    alt="RideRevolt"
                  />
                  <span className="text-black">RideRevolt</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/*  Menu Items */}
            <nav>
              {role === 'customer' && <CustomerMenu />}
              {role === 'admin' && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <button
            onClick={() => dispatch(logout())}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-800 hover:bg-amber-500   hover:text-black rounded-lg transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
