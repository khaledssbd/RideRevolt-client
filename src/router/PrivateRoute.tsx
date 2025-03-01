import { ReactNode } from 'react';
import { useAppSelector } from '../redux/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { selectToken } from '@/redux/features/auth/authSlice';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectToken);
  const location = useLocation();

  if (!token) {
    return <Navigate state={{ from: location }} to="/login" replace={true} />;
  }

  return children;
};

export default PrivateRoute;
