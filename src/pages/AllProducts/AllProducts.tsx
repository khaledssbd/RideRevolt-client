import { useState } from 'react';
import { useGetAllProductsQuery } from '@/redux/features/product/productApi';
import { TbFidgetSpinner } from 'react-icons/tb';
import AllProductsCard from './AllProductsCard';
import { Button } from '@/components/ui/button';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import cToast from '@/components/ReactHotToast';
import { Input } from '@/components/ui/input';
// import LoadingSpinner from '@/components/LoadingSpinner';
import AllProductsSkeleton from './AllProductSkeleton';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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

const AllProducts = () => {
  const form = useForm();

  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [availability, setAvailability] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = [
    priceRange.min && { name: 'minPrice', value: priceRange.min },
    priceRange.max && { name: 'maxPrice', value: priceRange.max },
    model && { name: 'model', value: model },
    brand && { name: 'brand', value: brand },
    category && { name: 'category', value: category },
    availability && { name: 'inStock', value: availability === 'available' },
    searchText && { name: 'searchTerm', value: searchText },
    { name: 'page', value: currentPage },
    { name: 'limit', value: '12' },
  ].filter(Boolean);

  const { data: productsForOptions, isLoading: isLoading2 } =
    useGetAllProductsQuery(undefined, {
      pollingInterval: 1800000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    });

  const { data: productsData, isLoading } = useGetAllProductsQuery(
    queryParams.length ? queryParams : undefined,
    {
      pollingInterval: 1800000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const pages = [...Array(productsData?.meta?.totalPage).keys()].map(
    num => num + 1
  );

  const handleFilter: SubmitHandler<FieldValues> = async data => {
    const { model, brand, category, availability, minPrice, maxPrice } = data;

    if (
      !model &&
      !brand &&
      !category &&
      !availability &&
      !minPrice &&
      !maxPrice
    ) {
      cToast.error('No filters applied!');
      return;
    }

    setModel(model);
    setBrand(brand);
    setCategory(category);
    setAvailability(availability);
    setPriceRange({ ...priceRange, min: minPrice, max: maxPrice });
    setCurrentPage(1);

    cToast.success('Filters applied successfully!');
  };

  if (isLoading || isLoading2) return <AllProductsSkeleton />;

  return (
    <div>
      <div className="flex justify-around items-center">
        {/* Search Box */}
        <input
          className="border p-4 rounded-md focus:placeholder-transparent dark:focus:placeholder-transparent dark:placeholder-white focus:border-blue-400 dark:border-amber-500 dark:focus:border-blue-400"
          type="text"
          onChange={e => {
            setCurrentPage(1);
            setSearchText(e.target.value);
          }}
          value={searchText}
          placeholder="Search products"
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="p-6 text-lg">
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-black overflow-y-scroll">
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
              <SheetDescription>
                Use this form to filter Products by price range, model, brand,
                category, and availability.
              </SheetDescription>
            </SheetHeader>

            <div className="text-right mr-6 md:mb-6">
              {/* Reset button */}
              <Button
                onClick={() => {
                  setSearchText('');
                  setModel('');
                  setBrand('');
                  setCategory('');
                  setAvailability('');
                  setPriceRange({ min: '', max: '' });
                  setCurrentPage(1);
                  form.setValue('minPrice', '');
                  form.setValue('maxPrice', '');
                  form.setValue('model', '');
                  form.setValue('brand', '');
                  form.setValue('category', '');
                  form.setValue('availability', '');
                }}
                className="text-white hover:bg-white hover:text-black"
              >
                Reset
              </Button>
            </div>

            <Form {...form}>
              <form
                className="space-y-3 flex flex-col justify-center items-center"
                onSubmit={form.handleSubmit(handleFilter)}
              >
                <div className="mx-5 flex flex-col justify-center items-center md:gap-10">
                  <div className="flex justify-center items-center md:gap-5">
                    {/* FormField for Model */}
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="m-2 text-amber-500">
                            Model
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl className="text-white">
                              <SelectTrigger>
                                <SelectValue placeholder="Model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[
                                ...new Set(
                                  productsForOptions?.data?.map(
                                    product => product.model
                                  )
                                ),
                              ].map(model => (
                                <SelectItem
                                  key={model}
                                  value={model}
                                  className="bg-white text-black"
                                >
                                  {model}
                                </SelectItem>
                              ))}
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
                    {/* filter on Model */}
                    {/* <select
                      onChange={e => {
                        setCurrentPage(1);
                        setModel(e.target.value);
                      }}
                      value={model}
                      className="border p-2 w-1/3 rounded-md border-white dark:border-amber-500"
                    >
                      <option hidden value="">
                        Model
                      </option>
                      {[
                        ...new Set(
                          productsForOptions?.data?.map(product => product.model)
                        ),
                      ].map(model => (
                        <option
                          key={model}
                          value={model}
                          className="bg-white text-black"
                        >
                          {model}
                        </option>
                      ))}
                    </select> */}

                    {/* FormField for Brand */}
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="m-2 text-amber-500">
                            Brand
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl className="text-white">
                              <SelectTrigger>
                                <SelectValue placeholder="Brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[
                                ...new Set(
                                  productsForOptions?.data?.map(
                                    product => product.brand
                                  )
                                ),
                              ].map(brand => (
                                <SelectItem
                                  key={brand}
                                  value={brand}
                                  className="bg-white text-black"
                                >
                                  {brand}
                                </SelectItem>
                              ))}
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
                    {/* filter on Brand */}
                    {/* <select
                      onChange={e => {
                        setCurrentPage(1);
                        setBrand(e.target.value);
                      }}
                      value={brand}
                      className="border p-2 w-1/3 rounded-md border-white dark:border-amber-500"
                    >
                      <option hidden value="">
                        Brand
                      </option>
                      {[
                        ...new Set(
                          productsForOptions?.data?.map(product => product.brand)
                        ),
                      ].map(brand => (
                        <option
                          key={brand}
                          value={brand}
                          className="bg-white text-black"
                        >
                          {brand}
                        </option>
                      ))}
                    </select> */}
                  </div>

                  <div className="flex justify-center items-center gap-5">
                    {/* FormField for Category */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="m-2 text-amber-500">
                            Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl className="text-white">
                              <SelectTrigger>
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[
                                ...new Set(
                                  productsForOptions?.data?.map(
                                    product => product.category
                                  )
                                ),
                              ].map(category => (
                                <SelectItem
                                  key={category}
                                  value={category}
                                  className="bg-white text-black"
                                >
                                  {category}
                                </SelectItem>
                              ))}
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
                    {/* filter on Category */}
                    {/* <select
                      onChange={e => {
                        setCurrentPage(1);
                        setCategory(e.target.value);
                      }}
                      value={category}
                      className="border p-2 w-1/3 rounded-md border-white dark:border-amber-500"
                    >
                      <option hidden value="">
                        Category
                      </option>
                      {[
                        ...new Set(
                          productsForOptions?.data?.map(product => product.category)
                        ),
                      ].map(category => (
                        <option
                          key={category}
                          value={category}
                          className="bg-white text-black"
                        >
                          {category}
                        </option>
                      ))}
                    </select> */}

                    {/* FormField for Availability */}
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="m-2 text-amber-500">
                            Availability
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl className="text-white">
                              <SelectTrigger>
                                <SelectValue placeholder="Availability" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem
                                value="available"
                                className="bg-white text-black"
                              >
                                In Stock
                              </SelectItem>
                              <SelectItem
                                value="unavailable"
                                className="bg-white text-black"
                              >
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

                    {/* filter on Availability */}
                    {/* <select
                      onChange={e => {
                        setCurrentPage(1);
                        setAvailability(e.target.value);
                      }}
                      value={availability}
                      className="border p-2 w-1/3 rounded-md border-white dark:border-amber-500"
                    >
                      <option hidden value="">
                        Availability
                      </option>
                      <option value="available" className="bg-white text-black">
                        In Stock
                      </option>
                      <option
                        value="unavailable"
                        className="bg-white text-black"
                      >
                        Out of Stock
                      </option>
                    </select> */}
                  </div>

                  {/* filter on Price */}
                  <div className="flex justify-center items-center gap-5">
                    {/* FormField for Min Price */}
                    <FormField
                      control={form.control}
                      name="minPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="m-2 text-black dark:text-amber-500">
                            Minimum Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border rounded-md focus:placeholder-transparent dark:focus:placeholder-transparent dark:placeholder-white focus:border-blue-400 border-white dark:border-amber-500 dark:focus:border-blue-400"
                              type="number"
                              placeholder="Number"
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

                    {/* Min Price */}
                    {/* <input
                      className="border p-2 w-1/3 rounded-md focus:placeholder-transparent dark:focus:placeholder-transparent dark:placeholder-white focus:border-blue-400 border-white dark:border-amber-500 dark:focus:border-blue-400"
                      type="number"
                      placeholder="Min Price"
                      value={priceRange.min}
                      onChange={e => {
                        setCurrentPage(1);
                        setPriceRange({ ...priceRange, min: e.target.value });
                      }}
                    /> */}

                    {/* FormField for Max Price */}

                    <FormField
                      control={form.control}
                      name="maxPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="m-2 text-black dark:text-amber-500">
                            Maximum Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border rounded-md focus:placeholder-transparent dark:focus:placeholder-transparent dark:placeholder-white focus:border-blue-400 border-white dark:border-amber-500 dark:focus:border-blue-400"
                              type="number"
                              placeholder="Number"
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

                    {/* Max Price */}
                    {/* <input
                      className="border p-2 w-1/3 rounded-md focus:placeholder-transparent dark:focus:placeholder-transparent dark:placeholder-white focus:border-blue-400 border-white dark:border-amber-500 dark:focus:border-blue-400"
                      type="number"
                      placeholder="Max Price"
                      value={priceRange.max}
                      onChange={e => {
                        setCurrentPage(1);
                        setPriceRange({ ...priceRange, max: e.target.value });
                      }}
                    /> */}
                  </div>
                </div>

                <Button
                  disabled={isLoading}
                  className="text-white hover:bg-white hover:text-black"
                  type="submit"
                >
                  {isLoading ? (
                    <div className="animate-spin">
                      <TbFidgetSpinner />
                    </div>
                  ) : (
                    'Done'
                  )}
                </Button>
              </form>
            </Form>

            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="submit"
                  className="text-white hover:bg-white hover:text-black"
                >
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {productsData?.data?.length ? (
        <>
          <h1 className="text-3xl text-center my-5 font-bold">
            Products From{' '}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              RideRevolt
            </span>
          </h1>
          <p className="text-center text-gray-400 w-2/5 mx-auto">
            <i>RideRevolt – Unleash the Road, Rule the Streets!</i>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
            {productsData?.data?.map(product => (
              <AllProductsCard key={product._id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 bg-gray-200 rounded-md hover:bg-blue-500 hover:text-white"
            >
              Previous
            </Button>
            {pages.map(btnNum => (
              <Button
                key={btnNum}
                onClick={() => setCurrentPage(btnNum)}
                className={`${
                  currentPage === btnNum
                    ? 'bg-amber-500 text-white'
                    : 'bg-blue-200'
                } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md hover:bg-black hover:text-white`}
              >
                {btnNum}
              </Button>
            ))}
            <Button
              disabled={currentPage === productsData?.meta?.totalPage}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 mx-1 text-gray-700 bg-gray-200 rounded-md hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <h3 className="mt-20 text-4xl font-bold">No product found</h3>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
