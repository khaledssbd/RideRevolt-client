import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TbFidgetSpinner } from 'react-icons/tb';
import cToast from '@/components/ReactHotToast';
import { usePostProductMutation } from '@/redux/features/product/productApi';
import { Textarea } from '@/components/ui/textarea';
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

const AddProduct = () => {
  const form = useForm();
  const [postProductIntoDb, { isLoading }] = usePostProductMutation();

  // const navigate = useNavigate();

  const handlePostProduct: SubmitHandler<FieldValues> = async data => {
    const { image, inStock, price, quantity, ...postData } = data;

    const updatedData = {
      ...postData,
      inStock: inStock === 'true' ? true : false,
      price: Number(price),
      quantity: Number(quantity),
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(updatedData));
    formData.append('file', image);

    const res = await postProductIntoDb(formData).unwrap();

    if (res?.success) {
      form.reset();
      cToast.success(res?.message);
      // navigate(`/product/${res.data._id}`);
    }
  };

  return (
    <div className="lg:w-2/3 mx-auto md:p-12">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-amber-500 text-center mb-4">
        Post Product
      </h2>
      <Form {...form}>
        <form
          className="space-y-3 flex flex-col justify-center items-center"
          onSubmit={form.handleSubmit(handlePostProduct)}
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
            rules={{
              required: {
                value: true,
                message: 'You must input product image!',
              },
            }}
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="text-white">
                    <SelectTrigger className="text-black dark:text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="Mountain"
                      className="bg-white text-black"
                    >
                      Mountain
                    </SelectItem>
                    <SelectItem value="Road" className="bg-white text-black">
                      Road
                    </SelectItem>
                    <SelectItem value="Hybrid" className="bg-white text-black">
                      Hybrid
                    </SelectItem>
                    <SelectItem
                      value="Electric"
                      className="bg-white text-black"
                    >
                      Electric
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
                  defaultValue={field.value}
                >
                  <FormControl className="text-black dark:text-white">
                    <SelectTrigger>
                      <SelectValue placeholder="Select stock status..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">inStock</SelectItem>
                    <SelectItem value="false">Out of stock</SelectItem>
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
            className="my-5 text-black bg-amber-500 hover:bg-black hover:text-amber-500  dark:text-black dark:hover:bg-white dark:hover:text-black"
            type="submit"
          >
            {isLoading ? (
              <div className="animate-spin">
                <TbFidgetSpinner />
              </div>
            ) : (
              'Post Product'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddProduct;
