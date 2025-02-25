import { Link } from 'react-router-dom';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { logout } from '@/redux/features/auth/authSlice';
import { useChangePasswordMutation } from '@/redux/features/auth/authApi';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import cToast from '@/components/ReactHotToast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

const ChangePassword = () => {
  const form = useForm();
  const oldPassword = form.watch('oldPassword');
  const newPassword = form.watch('newPassword');
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const handleUpdate: SubmitHandler<FieldValues> = async data => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data;

    const res = await changePassword(userData).unwrap();

    if (res?.success) {
      form.reset();
      cToast.success(`${res?.message} Login again...`);
      dispatch(logout());
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-black dark:text-amber-500">
      <h2 className="text-xl sm:text-2xl mt-10 mb-5 text-center font-bold">
        Change Password
      </h2>

      <Form {...form}>
        <form
          className="space-y-3 flex flex-col justify-center items-center w-2/3 md:w-1/2"
          onSubmit={form.handleSubmit(handleUpdate)}
        >
          {/* FormField for oldPassword */}
          <FormField
            control={form.control}
            name="oldPassword"
            rules={{
              required: {
                value: true,
                message: 'Must write your old password!',
              },
              minLength: {
                value: 8,
                message: "Can't be less then 8 characters!",
              },
              maxLength: {
                value: 20,
                message: "Can't exceed 20 characters!",
              },
              validate: {
                isCapital: value => {
                  if (/(?=.*[A-Z])/.test(value)) {
                    return true;
                  }
                  return 'Must have at least one Uppercase letter!';
                },
                isLower: value => {
                  if (/(?=.*[a-z])/.test(value)) {
                    return true;
                  }
                  return 'Must have at least one lowercase letter!';
                },
                isNumeric: value => {
                  if (/(?=.*\d{2,})/.test(value)) {
                    return true;
                  }
                  return 'Must have at least 2 numbers!';
                },
                isSpecialChar: value => {
                  if (
                    /(?=.*[!@#$%^&*()_+\-~=[\]{};'`:"\\|,.<>/?])/.test(value)
                  ) {
                    return true;
                  }
                  return 'Must contain a symbol!';
                },
              },
            }}
            render={({ field }) => (
              <FormItem className="text-left w-2/3 md:w-full">
                <FormLabel className="m-2 text-black dark:text-amber-500">
                  Old Password
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Your password..."
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3/5 transform -translate-y-1/2 cursor-pointer text-black dark:text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {form.getFieldState(field.name).error && (
                  <p className="text-red-500 text-sm">
                    {form.getFieldState(field.name).error?.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* FormField for newPassword */}
          <FormField
            control={form.control}
            name="newPassword"
            rules={{
              required: {
                value: true,
                message: 'Must write your new password!',
              },
              minLength: {
                value: 8,
                message: "Can't be less then 8 characters!",
              },
              maxLength: {
                value: 20,
                message: "Can't exceed 20 characters!",
              },
              validate: {
                isCapital: value => {
                  if (/(?=.*[A-Z])/.test(value)) {
                    return true;
                  }
                  return 'Must have at least one Uppercase letter!';
                },
                isLower: value => {
                  if (/(?=.*[a-z])/.test(value)) {
                    return true;
                  }
                  return 'Must have at least one lowercase letter!';
                },
                isNumeric: value => {
                  if (/(?=.*\d{2,})/.test(value)) {
                    return true;
                  }
                  return 'Must have at least 2 numbers!';
                },
                isSpecialChar: value => {
                  if (
                    /(?=.*[!@#$%^&*()_+\-~=[\]{};'`:"\\|,.<>/?])/.test(value)
                  ) {
                    return true;
                  }
                  return 'Must contain a symbol!';
                },
                isNewPasswordUnique: value => {
                  if (value !== oldPassword) {
                    return true;
                  }
                  return "Old and new password can't match!";
                },
              },
            }}
            render={({ field }) => (
              <FormItem className="text-left w-2/3 md:w-full">
                <FormLabel className="m-2 text-black dark:text-amber-500">
                  New Password
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Your password..."
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3/5 transform -translate-y-1/2 cursor-pointer text-black dark:text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {form.getFieldState(field.name).error && (
                  <p className="text-red-500 text-sm">
                    {form.getFieldState(field.name).error?.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* FormField for confirmPassword */}
          <FormField
            control={form.control}
            name="confirmPassword"
            rules={{
              required: {
                value: true,
                message: 'You must write your confirm password!',
              },
              validate: {
                matchesNewPassword: value => {
                  if (value === newPassword) {
                    return true;
                  }
                  return 'Password and Confirm Password did not match!';
                },
              },
            }}
            render={({ field }) => (
              <FormItem className="text-left w-2/3 md:w-full">
                <FormLabel className="m-2 text-black dark:text-amber-500">
                  Confirm Password
                </FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Your password..."
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3/5 transform -translate-y-1/2 cursor-pointer text-black dark:text-white"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
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
              'Change'
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
        Want to update your profile?{' '}
        <Link
          className="text-blue-600 text-sm font-bold ml-2"
          to="/dashboard/update-profile"
        >
          Click here
        </Link>
      </p>
    </div>
  );
};

export default ChangePassword;
