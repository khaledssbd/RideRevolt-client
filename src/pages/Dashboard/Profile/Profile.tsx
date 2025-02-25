import { Link } from 'react-router-dom';
import userImg from '@/assets/Images/user.png';
import { Tooltip } from 'react-tooltip';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/features/auth/authSlice';

const Profile = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="text-black dark:text-amber-500">
      <h2 className="text-xl sm:text-2xl mt-10 mb-5 text-center font-bold">
        Profile
      </h2>
      <div className="md:w-3/4 lg:w-1/2 mx-auto">
        <div className="flex justify-center items-center my-10">
          <img
            className="rounded-full w-48 h-48"
            src={user?.image || userImg}
            data-tooltip-id="userName"
            data-tooltip-content={user?.name || 'No Name Set Yet'}
            data-tooltip-place="right"
          />
          <Tooltip id="userName" />
        </div>
        <div className="space-y-2">
          <h4 className="text-base font-medium text-left">
            Name:
            <span className="text-amber-500 dark:text-white ml-2">
              {user?.name}
            </span>
          </h4>
          <h4 className="text-base font-medium text-left">
            Email:
            <span className="text-amber-500 dark:text-white ml-2">
              {user?.email}
            </span>
          </h4>
          <h4 className="text-base font-medium text-left">
            Gender:
            <span className="text-amber-500 dark:text-white ml-2 capitalize">
              {user?.gender}
            </span>
          </h4>
          <h4 className="text-base font-medium text-left">
            Role:
            <span className="text-amber-500 dark:text-white ml-2">
              {user?.role}
            </span>
          </h4>
        </div>
      </div>

      <p className="text-center mt-10">
        Want to update your profile?{' '}
        <Link
          className="text-blue-600 text-sm font-bold ml-2"
          to="/dashboard/update-profile"
        >
          Click here
        </Link>
      </p>
      <p className="text-center mt-4">
        Want to change your password?{' '}
        <Link
          className="text-blue-600 text-sm font-bold ml-2"
          to="/dashboard/change-password"
        >
          Click here
        </Link>
      </p>
    </div>
  );
};

export default Profile;
