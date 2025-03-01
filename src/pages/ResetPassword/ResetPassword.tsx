import { Button } from '@/components/ui/button';
import { TbFidgetSpinner } from 'react-icons/tb';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import cToast from '@/components/ReactHotToast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResetPasswordMutation } from '@/redux/features/auth/authApi';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const ResetPassword = () => {
  const form = useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    cToast.error('Something went wrong! Please try again..!');
  }

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword: SubmitHandler<FieldValues> = async data => {
    const updateData = { ...data, token };
    const res = await resetPassword(updateData).unwrap();

    if (res?.success) {
      form.reset();
      cToast.success(`${res?.message}... Login Now!`);
      navigate('/login');
    }
  };

  return (
    <div className="py-12 md:w-1/2 w-full mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-500 text-center mb-4">
        Reset Password
      </h2>
      <Form {...form}>
        <form
          className="space-y-3 flex flex-col justify-center items-center"
          onSubmit={form.handleSubmit(handleResetPassword)}
        >
          {/* FormField for email */}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: {
                value: true,
                message: 'You must write your email!',
              },
              validate: {
                isValid: value => {
                  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return true;
                  }
                  return 'Must use a valid email address!';
                },
              },
            }}
            render={({ field }) => (
              <FormItem className="text-left w-2/3 md:w-full">
                <FormLabel className="m-2 text-black dark:text-amber-500">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-black dark:text-white"
                    type="text"
                    placeholder="Your email..."
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

          {/* FormField for newPassword */}
          <FormField
            control={form.control}
            name="newPassword"
            rules={{
              required: {
                value: true,
                message: 'You must write your new password!',
              },
              minLength: {
                value: 8,
                message: "Password can't be less then 8 characters!",
              },
              maxLength: {
                value: 20,
                message: "Password can't exceed 20 characters!",
              },
              validate: {
                isCapital: value => {
                  if (/(?=.*[A-Z])/.test(value)) {
                    return true;
                  }
                  return 'Password must have at least one Uppercase letter!';
                },
                isLower: value => {
                  if (/(?=.*[a-z])/.test(value)) {
                    return true;
                  }
                  return 'Password must have at least one lowercase letter!';
                },
                isNumeric: value => {
                  if (/(?=.*\d{2,})/.test(value)) {
                    return true;
                  }
                  return 'Password must have at least 2 numbers!';
                },
                isSpecialChar: value => {
                  if (
                    /(?=.*[!@#$%^&*()_+\-~=[\]{};'`:"\\|,.<>/?])/.test(value)
                  ) {
                    return true;
                  }
                  return 'Password must contain a symbol!';
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

          <Button
            disabled={isLoading}
            className="my-5 text-black bg-amber-500 hover:bg-black hover:text-amber-500  dark:text-black dark:hover:bg-white dark:hover:text-black"
            type="submit"
          >
            {isLoading ? (
              <div className="animate-spin">
                <TbFidgetSpinner />
              </div>
            ) : (
              'Reset'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
