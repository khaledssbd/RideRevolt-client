import { NavLink } from 'react-router-dom';
import { FaListAlt } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';
import { useAppSelector } from '@/redux/hooks';
import { selectUserRole } from '@/redux/features/auth/authSlice';
import { TbMotorbike } from 'react-icons/tb';

const AdminMenu = () => {
  const role = useAppSelector(selectUserRole);

  return (
    <>
      {role === 'admin' && (
        <ul className="menu p-2 space-y-4 text-black font-medium">
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
              to="/dashboard/manage-users"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-md text-amber-500 bg-black text-sm md:text-base font-medium flex justify-start items-center gap-2 px-2 py-2'
                  : 'hover:bg-black rounded-md hover:text-white flex justify-start items-center gap-2 px-2 py-2'
              }
            >
              <FaUsers /> Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-products"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-md text-amber-500 bg-black text-sm md:text-base font-medium flex justify-start items-center gap-2 px-2 py-2'
                  : 'hover:bg-black rounded-md hover:text-white flex justify-start items-center gap-2 px-2 py-2'
              }
            >
              <TbMotorbike />
              Manage Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-orders"
              className={({ isActive }) =>
                isActive
                  ? 'rounded-md text-amber-500 bg-black text-sm md:text-base font-medium flex justify-start items-center gap-2 px-2 py-2'
                  : 'hover:bg-black rounded-md hover:text-white flex justify-start items-center gap-2 px-2 py-2'
              }
            >
              <FaListAlt />
              Manage Orders
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
};
export default AdminMenu;
