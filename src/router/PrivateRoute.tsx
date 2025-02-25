import { ReactNode } from 'react';
import { useAppSelector } from '../redux/hooks';
import { Navigate } from 'react-router-dom';
import { selectToken } from '@/redux/features/auth/authSlice';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default PrivateRoute;
