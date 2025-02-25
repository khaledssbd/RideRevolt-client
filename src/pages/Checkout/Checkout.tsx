import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/redux/features/product/productApi';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import cToast from '@/components/ReactHotToast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useCreateOrderMutation } from '@/redux/features/order/orderApi';
import { TbFidgetSpinner } from 'react-icons/tb';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

const Checkout = () => {
  const form = useForm();
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(productId);
  const [quantity, setQuantity] = useState(1);
  const [createOrder, { isLoading: isCreatingOrder }] =
    useCreateOrderMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async data => {
    const updateData = {
      ...data,
      quantity,
      product: product?._id,
    };

    const res = await createOrder(updateData).unwrap();

    if (res?.success) {
      form.reset();
      cToast.success(`${res?.message} Complete payment now..!`);
      window.location.href = res.data;
      //    navigate('/login');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-4/5 rounded-lg mx-auto">
      {/* col-1: name & brand */}
      <div className="text-lg font-semibold w-fit mx-auto my-5">
        <p className="rounded-4xl border border-amber-500 px-4">
          <span className="text-gray-500 text-base font-medium"> Product:</span>{' '}
          "{product?.name}"
          <span className="text-gray-500 text-base font-medium"> by </span>"
          {product?.brand}"
        </p>
      </div>

      {/* col-2: image & item button */}
      <div className="flex justify-around items-center gap-4">
        <img
          src={product?.imageUrl}
          alt={product?.name}
          className="w-1/3 rounded object-cover"
        />
        <div className="text-base font-medium">
          <h4>Items</h4>
          <div className="flex items-center gap-5 mt-3">
            <button
              disabled={quantity === 1}
              onClick={() => setQuantity(quantity - 1)}
              className="w-10 h-8 bg-amber-500 dark:bg-gray-200 text-black text-xl rounded hover:bg-gray-300 dark:hover:bg-amber-500"
            >
              -
            </button>
            <div>{quantity}</div>
            <button
              // disabled={quantity === product?.quantity}
              onClick={() => {
                if (quantity === product?.quantity) {
                  return cToast.error('Stock limited...!');
                }
                setQuantity(quantity + 1);
              }}
              className="w-10 h-8 bg-amber-500 dark:bg-gray-200 text-black text-xl rounded hover:bg-gray-300 dark:hover:bg-amber-500"
            >
              +
            </button>
          </div>
        </div>
        <p className="text-base font-medium w-1/5 text-amber-500">
          <span className="text-black dark:text-white">TotalPrice:</span> $
          {(quantity * (product?.price ?? 0)).toFixed(2)}
        </p>
      </div>
      {/* col-3: submit form */}

      <div className="w-1/2 mx-auto my-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4">
          Fill-up the form carefully!
        </h2>
        <Form {...form}>
          <form
            className="space-y-3 flex flex-col justify-center items-center"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {/* FormField for city */}
            <FormField
              control={form.control}
              name="city"
              rules={{
                required: {
                  value: true,
                  message: 'Must write your city!',
                },
                minLength: {
                  value: 4,
                  message: 'City must have minimum 4 characters!',
                },
                maxLength: {
                  value: 30,
                  message: "City can't exceed 30 characters!",
                },
              }}
              render={({ field }) => (
                <FormItem className="text-left w-2/3 md:w-full">
                  <FormLabel className="m-2 text-black dark:text-amber-500">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      type="text"
                      placeholder="Your city..."
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

            {/* FormField for address */}
            <FormField
              control={form.control}
              name="address"
              rules={{
                required: {
                  value: true,
                  message: 'Must write your address!',
                },
                minLength: {
                  value: 10,
                  message: 'Address must have minimum 10 characters!',
                },
                maxLength: {
                  value: 200,
                  message: "Address can't exceed 200 characters!",
                },
              }}
              render={({ field }) => (
                <FormItem className="text-left w-2/3 md:w-full">
                  <FormLabel className="m-2 text-black dark:text-amber-500">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      type="text"
                      placeholder="Your address..."
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

            {/* FormField for phone */}
            <FormField
              control={form.control}
              name="phone"
              rules={{
                required: {
                  value: true,
                  message: 'Must write your phone!',
                },
                //   validate: {
                //     isValid: value => {
                //       if (/^01\d{9}$/.test(value)) {
                //         return true;
                //       }
                //       return 'Must use a valid phone number!';
                //     },
                //   },
                pattern: {
                  value: /^01\d{9}$/,
                  message: 'Must use a valid phone number!',
                },
              }}
              render={({ field }) => (
                <FormItem className="text-left w-2/3 md:w-full">
                  <FormLabel className="m-2 text-black dark:text-amber-500">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      type="number"
                      placeholder="Your phone..."
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

            <Button
              disabled={isCreatingOrder}
              variant="default"
              className="my-5 hover:bg-black hover:text-amber-500 dark:bg-white dark:text-black dark:hover:bg-amber-500 dark:hover:text-white"
              type="submit"
            >
              {isCreatingOrder ? (
                <div className="animate-spin">
                  <TbFidgetSpinner />
                </div>
              ) : (
                'Order Now'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
