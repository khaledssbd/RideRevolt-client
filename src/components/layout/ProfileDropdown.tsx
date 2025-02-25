import { Button } from '../ui/button';
import { logout, TUserFromToken } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import userImg from '@/assets/Images/user.png';

type IProp = {
  user: TUserFromToken;
};

const ProfileDropdown = ({ user }: IProp) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="relative ml-3">
      <div>
        <button
          type="button"
          className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setOpen(!open)}
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          <img
            className="size-12 rounded-full"
            src={user?.image || userImg}
            alt={user?.name || 'User'}
          />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-200 dark:bg-gray-400 py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex={-1}
        >
          {/* <div className="pl-36">
            <Button
              variant="default"
              onClick={() => setOpen(!open)}
              className="px-4 text-sm font-medium text-white text-end mx-auto bg-black rounded-xl"
            >
              X
            </Button>
          </div> */}

          <Link
            to="/dashboard/profile"
            className="block py-2 w-4/5 mx-auto text-sm font-medium text-black dark:text-amber-900 hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white rounded-2xl border-2 border-transparent"
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-0"
          >
            Profile
          </Link>
          <Link
            to="/dashboard/update-profile"
            className="block py-2 w-4/5 mx-auto text-sm font-medium text-black dark:text-amber-900 hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white rounded-2xl border-2 border-transparent"
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-1"
          >
            Update Profile
          </Link>

          <Link
            to="/dashboard/change-password"
            className="block py-2 w-4/5 mx-auto text-sm font-medium text-black dark:text-amber-900 hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white rounded-2xl border-2 border-transparent"
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-2"
          >
            Change Password
          </Link>
          <Link
            to="/dashboard"
            className="block py-2 w-4/5 mx-auto text-sm font-medium text-black dark:text-amber-900 hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-white rounded-2xl border-2 border-transparent"
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-0"
          >
            Dashboard
          </Link>
          <Button
            variant="default"
            onClick={handleLogout}
            className="block px-4 py-2 my-2 text-sm font-medium bg-amber-500 dark:bg-black text-black dark:text-amber-500 hover:text-white dark:hover:text-black hover:bg-black dark:hover:bg-amber-500  mx-auto"
            role="menuitem"
            tabIndex={1}
            id="user-menu-item-2"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
