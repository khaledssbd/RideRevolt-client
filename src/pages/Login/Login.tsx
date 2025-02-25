import SideImg from '@/assets/Images/Revolt-RV400-BRZ.webp';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { Button } from '@/components/ui/button';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ForgotPasswordModal from '@/components/layout/ForgotPasswordModal';
import { verifyToken } from '@/utils/verifyToken';
import cToast from '@/components/ReactHotToast';
import {
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

const Login = () => {
  const form = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<FieldValues> = async data => {
    const res = await login(data).unwrap();

    if (res?.success) {
      form.reset();
      const user = verifyToken(res.data.accessToken) as TUserFromToken;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      cToast.success(res?.message);
      navigate('/');
    }
  };

  if (user) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:m-24">
      {/* colum-1 */}
      <div className="hidden md:flex h-1/2 lg:h-auto">
        <img src={SideImg} alt="Login Image" height={540} width={540} />
      </div>

      {/* colum-2 */}
      <div className="md:border-2 md:rounded-2xl p-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-500 text-center mb-4">
          Login
        </h2>
        <Form {...form}>
          <form
            className="space-y-3 flex flex-col justify-center items-center"
            onSubmit={form.handleSubmit(handleLogin)}
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

            {/* FormField for password */}
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: 'You must write your password!',
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
                    Password
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
                'Login'
              )}
            </Button>
          </form>
        </Form>

        {/* ForgotPasswordModal */}
        <ForgotPasswordModal />

        <p className="text-center text-amber-500 dark:text-white font-semibold mt-4">
          Don't have an account?{' '}
          <Link className="text-blue-600 font-bold ml-2" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
