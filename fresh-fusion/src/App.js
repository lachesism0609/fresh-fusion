import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/menu",
      element: <MenuPage />,
    }
  ], {
    basename: '/sushi-lover'
  });

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;

