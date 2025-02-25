export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  imageUrl: string;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TProductsProps = {
  products: TProduct[] | undefined;
};

export type TProductProps = {
  product: TProduct;
};
