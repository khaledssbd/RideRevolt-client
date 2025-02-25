import { selectUser } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const CustomerRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectUser);

  if (user && user.role === 'customer') return children;

  return <Navigate to="/dashboard" />;
};

export default CustomerRoute;
