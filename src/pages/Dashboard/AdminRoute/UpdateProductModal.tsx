import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TbFidgetSpinner } from 'react-icons/tb';
import cToast from '@/components/ReactHotToast';
import { useUpdateProductMutation } from '@/redux/features/product/productApi';
import { Textarea } from '@/components/ui/textarea';
import { TProduct } from '@/types';
import { useState } from 'react';
import { FaPenToSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface UpdateProductModalProps {
  product: TProduct;
}

const UpdateProductModal = ({ product }: UpdateProductModalProps) => {
  const [open, setOpen] = useState(false);

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const productValue = {
    name: product?.name,
    image: null,
    brand: product?.brand,
    category: product?.category,
    description: product?.description,
    inStock: String(product?.inStock),
    price: product?.price,
    model: product?.model,
    quantity: product?.quantity,
  };

  const form = useForm({ defaultValues: productValue });

  const navigate = useNavigate();

  const handleUpdateProduct: SubmitHandler<FieldValues> = async data => {
    const { image, inStock, price, quantity, ...otherData } = data;

    const updatedData = {
      ...otherData,
      inStock: inStock === 'true' ? true : false,
      price: Number(price),
      quantity: Number(quantity),
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(updatedData));

    if (image) {
      formData.append('file', image);
    }

    const res = await updateProduct({ id: product._id, formData }).unwrap();

    if (res?.success) {
      form.reset();
      cToast.success(res?.message);
      navigate(`/product/${res.data._id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">
          <FaPenToSquare />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-4xl overflow-y-auto h-full">
        <DialogHeader>
          <DialogTitle>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-amber-500 text-center mb-4">
              Update Product
            </div>
          </DialogTitle>
          <DialogDescription hidden={true} className="sr-only">
            Update task data here
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-3 flex flex-col justify-center items-center"
            onSubmit={form.handleSubmit(handleUpdateProduct)}
          >
            {/* FormField for name */}
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: {
                  value: true,
                  message: 'You must write product Name!',
                },
                minLength: {
                  value: 2,
                  message: 'Name must have minimum 2 characters!',
                },
                maxLength: {
                  value: 80,
                  message: "Name can't exceed 80 characters!",
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
                      placeholder="Product name..."
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
              //     message: 'You must input product image!',
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

            {/* FormField for brand */}
            <FormField
              control={form.control}
              name="brand"
              rules={{
                required: {
                  value: true,
                  message: 'You must write a brand!',
                },
                maxLength: {
                  value: 45,
                  message: "Brand can't exceed 45 characters!",
                },
              }}
              render={({ field }) => (
                <FormItem className="text-left w-2/3 md:w-full">
                  <FormLabel className="m-2 text-black dark:text-amber-500">
                    Brand
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      type="text"
                      placeholder="Product brand..."
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

            {/* FormField for model */}
            <FormField
              control={form.control}
              name="model"
              rules={{
                required: {
                  value: true,
                  message: 'You must write a model!',
                },
                maxLength: {
                  value: 75,
                  message: "Model can't exceed 75 characters!",
                },
              }}
              render={({ field }) => (
                <FormItem className="text-left w-2/3 md:w-full">
                  <FormLabel className="m-2 text-black dark:text-amber-500">
                    Model
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      type="text"
                      placeholder="Product model..."
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

            {/* FormField for price */}
            <FormField
              control={form.control}
              name="price"
              rules={{
                required: {
                  value: true,
                  message: 'You must write a price!',
                },
              }}
              render={({ field }) => (
                <FormItem className="text-left w-2/3 md:w-full">
                  <FormLabel className="m-2 text-black dark:text-amber-500">
                    Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      type="number"
                      placeholder="Product price..."
                      {...field}
                      value={field.value}
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

            {/* FormField for category */}
            <FormField
              control={form.control}
              name="category"
              rules={{
                required: {
                  value: true,
                  message: 'You must select a category!',
                },
              }}
              render={({ field }) => (
                <FormItem className="text-left w-2/3 md:w-full">
                  <FormLabel className="m-2 text-black dark:text-amber-500">
                    Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    {...field}
                    value={field.value || ''}
                  >
                    <FormControl className="text-black dark:text-white">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Mountain">Mountain</SelectItem>
                      <SelectItem value="Road">Road</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
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

            {/* FormField for description */}
            <FormField
              control={form.control}
              name="description"
              rules={{
                required: {
                  value: true,
                  message: 'You must write description!',
                },
                minLength: {
                  value: 20,
                  message: 'Must have minimum 20 characters!',
                },
              }}
              render={({ field }) => (
                <FormItem className="text-left w-2/3 md:w-full">
                  <FormLabel className="m-2 text-black dark:text-amber-500">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-black dark:text-white max-h-screen overflow-y-auto"
                      placeholder="Product description..."
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

            {/* FormField for quantity */}
            <FormField
              control={form.control}
              name="quantity"
              rules={{
                required: {
                  value: true,
                  message: 'You must write a quantity!',
                },
              }}
              render={({ field }) => (
                <FormItem className="text-left w-2/3 md:w-full">
                  <FormLabel className="m-2 text-black dark:text-amber-500">
                    Quantity
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black dark:text-white"
                      type="number"
                      placeholder="Product quantity..."
                      {...field}
                      value={field.value}
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

            {/* FormField for inStock */}
            <FormField
              control={form.control}
              name="inStock"
              rules={{
                required: {
                  value: true,
                  message: 'You must select inStock!',
                },
              }}
              render={({ field }) => (
                <FormItem className="text-left w-2/3 md:w-full">
                  <FormLabel className="m-2 text-black dark:text-amber-500">
                    inStock
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    {...field}
                    value={field.value || ''}
                  >
                    <FormControl className="text-white">
                      <SelectTrigger className="text-black dark:text-white">
                        <SelectValue placeholder="Select Stock Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true" className="bg-white text-black">
                        In Stock
                      </SelectItem>
                      <SelectItem value="false" className="bg-white text-black">
                        Out of Stock
                      </SelectItem>
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
            <DialogFooter>
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
                  'Update Product'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductModal;
