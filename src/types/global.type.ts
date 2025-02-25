import { BaseQueryApi } from '@reduxjs/toolkit/query';
import { TProduct } from './product.type';

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TData<T> = { result: T; meta?: TMeta };

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  success: boolean;
  message: string;
  error?: TError;
  stack?: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TBaseApiError = { data: TResponse<TProduct[]> };
