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

export type TSurjoPayResponse = {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
};
