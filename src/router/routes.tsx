import { createBrowserRouter } from 'react-router-dom';
import Profile from '@/pages/Dashboard/Profile/Profile';
import UpdateProfile from '@/pages/Dashboard/UpdateProfile/UpdateProfile';
import ErrorPage from '@/pages/ErrorPage/ErrorPage';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import Register from '@/pages/Register/Register';
import ChangePassword from '@/pages/Dashboard/ChangePassword/ChangePassword';
import AllProducts from '@/pages/AllProducts/AllProducts';
import ProductDetails from '@/pages/ProductDetails/ProductDetails';
import Root from '@/Root';
import Checkout from '@/pages/Checkout/Checkout';
import PrivateRoute from '@/router/PrivateRoute';
import AboutUs from '@/pages/AboutUs/AboutUs';
import DashBoardLayout from '@/pages/Dashboard/DashBoardLayout';
import DashboardHome from '@/pages/Dashboard/DashboardHome';
import Orders from '@/pages/Dashboard/Orders/Orders';
import CustomerRoute from './CustomerRoute';
import AdminRoute from './AdminRoute';
import ManageUsers from '@/pages/Dashboard/AdminRoute/ManageUsers';
import ManageProducts from '@/pages/Dashboard/AdminRoute/ManageProducts';
import ManageOrders from '@/pages/Dashboard/AdminRoute/ManageOrders';
import AddProduct from '@/pages/Dashboard/AdminRoute/AddProduct';
import ResetPassword from '@/pages/ResetPassword/ResetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'all-products',
        element: <AllProducts />,
      },
      {
        path: 'product/:productId',
        element: <ProductDetails />,
      },
      {
        path: 'checkout/:productId',
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'update-profile',
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: 'change-password',
        element: (
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        ),
      },
      // customer route
      {
        path: 'orders',
        element: (
          <PrivateRoute>
            <CustomerRoute>
              <Orders />
            </CustomerRoute>
          </PrivateRoute>
        ),
      },
      // Admin route
      {
        path: 'users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'add-product',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-products',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'update-product/productId',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageOrders />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
