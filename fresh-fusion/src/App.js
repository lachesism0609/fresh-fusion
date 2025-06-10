import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import CheckoutPage from './pages/CheckoutPage';
import Address from './pages/Address';

import './App.css';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token') !== null;
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/menu",
      element: <MenuPage />,
    },
    {
      path: "/checkout",
      element: <ProtectedRoute><CheckoutPage /></ProtectedRoute>,
    },
    {
      path: "/orders",
      element: <ProtectedRoute><OrderPage /></ProtectedRoute>,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },{
      path: "/address",
      element: <Address />,
    },
  ], {
    basename: '/fresh-fusion'  // Add basename for GitHub Pages
  });

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;

