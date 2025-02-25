import { Link, useNavigate } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { useUpdateProfileMutation } from '@/redux/features/auth/authApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import cToast from '@/components/ReactHotToast';
import {
  selectToken,
  selectUser,
  setUser,
  TUserFromToken,
} from '@/redux/features/auth/authSlice';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const UpdateProfile = () => {
  const user = useAppSelector(selectUser) as TUserFromToken;
  const token = useAppSelector(selectToken);

  const formData = {
    name: user.name,
    image: null,
    gender: user.gender,
  };

  const form = useForm({ defaultValues: formData });
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleUpdate: SubmitHandler<FieldValues> = async data => {
    const { image, ...userData } = data;

    const formData = new FormData();
    formData.append('data', JSON.stringify(userData));

    if (image) {
      formData.append('file', image);
    }

    const res = await updateProfile(formData).unwrap();

    if (res?.success) {
      form.reset();
      const updatedUser = {
        ...user,
        name: res.data.name,
        gender: res.data.gender,
        image: res.data.image,
      };

      // update the user in the Redux store and toast success message
      dispatch(setUser({ user: updatedUser, token }));
      cToast.success(res?.message);
      navigate('/dashboard/profile');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-black dark:text-amber-500">
      <h2 className="text-xl sm:text-2xl mt-10 mb-5 text-center font-bold">
        Update Profile
      </h2>

      <Form {...form}>
        <form
          className="space-y-3 flex flex-col justify-center items-center w-2/3 md:w-1/2"
          onSubmit={form.handleSubmit(handleUpdate)}
        >
          {/* FormField for name */}
          <FormField
            control={form.control}
            name="name"
            rules={{
              required: {
                value: true,
                message: 'You must write your Name.',
              },
              minLength: {
                value: 5,
                message: 'Name must have minimum 5 characters!',
              },
              maxLength: {
                value: 30,
                message: "Name can't exceed 30 characters!",
              },
            }}
            render={({ field }) => (
              <FormItem className="text-left w-2/3 md:w-full">
                <FormLabel className="m-2 text-black dark:text-amber-500">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-black dark:text-white"
                    type="text"
                    placeholder="Your Name..."
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                {form.getFieldState(field.name).error && (
                  <p className="text-red-500 text-sm">
                    {form.getFieldState(field.name).error?.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* FormField for image */}
          <FormField
            control={form.control}
            name="image"
            // rules={{
            //   required: {
            //     value: true,
            //     message: 'You must input your image.',
            //   },
            // }}
            render={({ field }) => (
              <FormItem className="text-left w-2/3 md:w-full">
                <FormLabel className="m-2 text-black dark:text-amber-500">
                  Image
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-500 text-black dark:text-amber-500 font-medium"
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </FormControl>
                {form.getFieldState(field.name).error && (
                  <p className="text-red-500 text-sm">
                    {form.getFieldState(field.name).error?.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* FormField for gender */}
          <FormField
            control={form.control}
            name="gender"
            rules={{
              required: {
                value: true,
                message: 'You must select gender.',
              },
            }}
            render={({ field }) => (
              <FormItem className="text-left w-2/3 md:w-full">
                <FormLabel className="m-2 text-black dark:text-amber-500">
                  Gender
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="text-black dark:text-white">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.getFieldState(field.name).error && (
                  <p className="text-red-500 text-sm">
                    {form.getFieldState(field.name).error?.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <Button
            disabled={isLoading}
            className="mt-5 text-black dark:text-white bg-amber-500"
            type="submit"
          >
            {isLoading ? (
              <div className="animate-spin">
                <TbFidgetSpinner />
              </div>
            ) : (
              'Update'
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center mt-4">
        Want to check your profile?{' '}
        <Link
          className="text-blue-600 text-sm font-bold ml-2"
          to="/dashboard/profile"
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

export default UpdateProfile;
