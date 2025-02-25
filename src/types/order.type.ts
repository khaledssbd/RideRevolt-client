import { TProduct } from './product.type';
import { TUser } from './user.type';

export type TOrder = {
  _id: string;
  user: TUser;
  product: TProduct;
  quantity: number;
  totalPrice: number;
  address: string;
  city: string;
  phone: string;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  estimatedDeliveryDate: Date;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status?: string;
    sp_code?: string;
    sp_message?: string;
    method?: string;
    date_time?: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type TProductsProps = {
  products: TOrder[] | undefined;
};

export type TProductProps = {
  product: TOrder;
};
