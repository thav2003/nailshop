import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import LandingPage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";
import CustomNailPage from "./pages/CustomNailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import BlogPage from "./pages/BlogPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import CustomPage from "./pages/CustomPage";
import AdminProductPage from "./pages/Admin/AdminProductPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import OrderPage from "./pages/Admin/OrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/shop",
    element: <ShopPage />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetailPage />,
  },
  {
    path: "/product/custom",
    element: <CustomNailPage />,
  },
  {
    path: "/product/custom-nail",
    element: <CustomPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/order-history",
    element: <OrderHistoryPage />,
  },
  {
    path: "/admin/products",
    element: <AdminProductPage />,
  },
  {
    path: "/admin/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/admin/orders",
    element: <OrderPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
