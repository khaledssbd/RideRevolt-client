import { NavLink } from 'react-router-dom';
import { FaListAlt } from 'react-icons/fa';
import { FaGear, FaPenToSquare } from 'react-icons/fa6';
import { useAppSelector } from '@/redux/hooks';
import { selectUserRole } from '@/redux/features/auth/authSlice';
import { PiPasswordBold } from 'react-icons/pi';

const CustomerMenu = () => {
  const role = useAppSelector(selectUserRole);

  return (
    <>
      {role === 'customer' && (
        <ul className="menu p-2 space-y-4 text-black font-medium">
          <li>
            <NavLink
              to="/dashboard/orders"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-md text-amber-500 bg-black text-sm md:text-base font-medium flex justify-start items-center gap-2 px-2 py-2'
                  : 'hover:bg-black rounded-md hover:text-white flex justify-start items-center gap-2 px-2 py-2'
              }
            >
              <FaListAlt />
              View-orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-md text-amber-500 bg-black text-sm md:text-base font-medium flex justify-start items-center gap-2 px-2 py-2'
                  : 'hover:bg-black rounded-md hover:text-white flex justify-start items-center gap-2 px-2 py-2'
              }
            >
              <FaGear /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/update-profile"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-md text-amber-500 bg-black text-sm md:text-base font-medium flex justify-start items-center gap-2 px-2 py-2'
                  : 'hover:bg-black rounded-md hover:text-white flex justify-start items-center gap-2 px-2 py-2'
              }
            >
              <FaPenToSquare /> Update Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/change-password"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-md text-amber-500 bg-black text-sm md:text-base font-medium flex justify-start items-center gap-2 px-2 py-2'
                  : 'hover:bg-black rounded-md hover:text-white flex justify-start items-center gap-2 px-2 py-2'
              }
            >
              <PiPasswordBold />
              Change Password
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
};

export default CustomerMenu;
