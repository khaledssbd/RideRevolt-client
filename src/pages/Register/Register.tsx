import SideImg from '@/assets/Images/raleigh-edux.png';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { useRegisterMutation } from '@/redux/features/auth/authApi';

import { Button } from '@/components/ui/button';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import { selectUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import cToast from '@/components/ReactHotToast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

const Register = () => {
  const form = useForm();
  const password = form.watch('password');
  const [register, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleRegister: SubmitHandler<FieldValues> = async data => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, image, ...userData } = data;

    const formData = new FormData();
    formData.append('data', JSON.stringify(userData));

    if (image) {
      formData.append('file', image);
    }

    const res = await register(formData).unwrap();

    if (res?.success) {
      form.reset();
      cToast.success(`${res?.message}... Login Now!`);
      navigate('/login');
    }
  };

  if (user) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:m-24">
      {/* colum-1 */}
      <div className="hidden md:flex h-1/2 lg:h-2/3">
        <img src={SideImg} alt="Login Image" height={540} width={540} />
      </div>

      {/* colum-2 */}
      <div className="md:border-2 md:rounded-2xl p-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-500 text-center mb-4">
          Register
        </h2>
        <Form {...form}>
          <form
            className="space-y-3 flex flex-col justify-center items-center"
            onSubmit={form.handleSubmit(handleRegister)}
          >
            {/* FormField for name */}
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: {
                  value: true,
                  message: 'You must write your Name!',
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
                      autoComplete="name"
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
              //     message: 'You must input your image!',
              //   },
              // }} // later will uncomment the upper part
              render={({ field }) => (
                <FormItem className="text-left w-2/3 md:w-full">
                  <FormLabel className="m-2 text-black dark:text-amber-500">
                    Image (optional)
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
                      autoComplete="email"
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

            {/* FormField for gender */}
            {/* <FormField
              control={form.control}
              name="gender"
              rules={{
                required: {
                  value: true,
                  message: 'You must select gender!',
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
            /> */}

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
                        autoComplete="new-password"
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
                  matchesPassword: value => {
                    if (value === password) {
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
                        placeholder="Your confirm password..."
                        autoComplete="new-password"
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
                'Register'
              )}
            </Button>
          </form>
        </Form>

        <p className="text-center text-amber-500 dark:text-white font-semibold mt-4">
          Already have an account?{' '}
          <Link className="text-blue-600 font-bold ml-2" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
