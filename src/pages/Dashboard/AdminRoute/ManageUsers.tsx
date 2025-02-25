import { cn } from '@/lib/utils';
import LoadingSpinner from '@/components/LoadingSpinner';
import cToast from '@/components/ReactHotToast';
import {
  useChangeUserStatusMutation,
  useGetAllUsersQuery,
} from '@/redux/features/user/userApi';

const ManageUsers = () => {
  const { data: allUsers, isLoading } = useGetAllUsersQuery(undefined);
  const [changeUserStatus] = useChangeUserStatusMutation();

  // change User Status
  const handleUserStatusChange = async (status: string, userId: string) => {
    const res = await changeUserStatus({ status, userId }).unwrap();

    if (res?.success) {
      cToast.success(res?.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="my-12 text-black dark:text-white">
      <h3 className="text-xl md:text-4xl text-center my-10">
        Manage users ({allUsers?.length})
      </h3>

      <div>
        {allUsers?.length ? (
          <div className="rounded-lg border border-gray-200 shadow-md overflow-x-auto">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    isDeleted
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Gender
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Role
                  </th>
                  {/* <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Delete
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {allUsers.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={user.image}
                          alt={user.name || 'No name'}
                        />
                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {user.name}
                        </div>
                        <div className="text-gray-400">{user.email}</div>
                      </div>
                    </th>
                    <td>
                      <select
                        className="p-2 border rounded-lg focus:outline-green-500"
                        required
                        onChange={e =>
                          handleUserStatusChange(e.target.value, user._id)
                        }
                        defaultValue={user.status}
                      >
                        <option value="in-progress">In-progress</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 capitalize">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold ${
                          user.isDeleted ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        <span
                          className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            user.isDeleted ? 'bg-red-600' : 'bg-green-600'
                          )}
                        ></span>
                        {user.isDeleted ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 capitalize">{user.gender}</td>
                    <td className="px-6 py-4 capitalize">{user.role}</td>
                    {/* <td className="px-6 py-4">
                      <button onClick={() => handleDelete(user._id)}>
                        <img
                          src={deleteImg}
                          alt="delete-item"
                          className="w-6"
                        />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h3 className="mt-20 md:mt-40 text-4xl font-bold">No user yet</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
