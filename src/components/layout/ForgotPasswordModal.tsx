import { Button } from '@/components/ui/button';
import { useForgotPasswordMutation } from '@/redux/features/auth/authApi';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { TbFidgetSpinner } from 'react-icons/tb';
import { Input } from '../ui/input';
import cToast from '../ReactHotToast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

const ForgotPasswordModal = () => {
  const [open, setOpen] = useState(false);
  const form = useForm();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPass: SubmitHandler<FieldValues> = async data => {
    const res = await forgotPassword(data).unwrap();

    if (res?.success) {
      form.reset();
      setOpen(false);
      cToast.success(`${res?.message} Check mail...`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="text-start w-full">
          <h5 className="text-amber-500 dark:text-white text-sm">
            Forgot password?
          </h5>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Input Email</DialogTitle>
          <DialogDescription className="sr-only">
            Input your email
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-3"
            onSubmit={form.handleSubmit(handleForgotPass)}
          >
            {/* FormField for email */}
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: 'You must write your email.',
                },
                validate: {
                  isValid: value => {
                    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      return true;
                    }
                    return 'Must use a valid email address';
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
            <DialogFooter>
              <Button disabled={isLoading} className="mt-5" type="submit">
                {isLoading ? (
                  <div className="animate-spin">
                    <TbFidgetSpinner />
                  </div>
                ) : (
                  'Submit'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
