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
import BlogDetailPage from "./pages/BlogDetailPage";
import RefundOrderPage from "./pages/RefundOrderPage";
import AdminRefundPage from "./pages/Admin/AdminRefundOrderPage";
import ProtectedRoute from "./ProtectedRoute";

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
    element: (
      <ProtectedRoute
        element={<CustomNailPage />}
        allowedRoles={["Customer"]}
      />
    ),
  },
  {
    path: "/product/custom-nail",
    element: (
      <ProtectedRoute element={<CustomPage />} allowedRoles={["Customer"]} />
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute element={<CartPage />} allowedRoles={["Customer"]} />
    ),
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
    element: (
      <ProtectedRoute
        element={<ProfilePage />}
        allowedRoles={["Customer", "Admin"]}
      />
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute element={<CheckoutPage />} allowedRoles={["Customer"]} />
    ),
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/order-history",
    element: (
      <ProtectedRoute
        element={<OrderHistoryPage />}
        allowedRoles={["Customer"]}
      />
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectedRoute element={<AdminProductPage />} allowedRoles={["Admin"]} />
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute element={<DashboardPage />} allowedRoles={["Admin"]} />
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedRoute element={<OrderPage />} allowedRoles={["Admin"]} />
    ),
  },
  {
    path: "/admin/refund",
    element: (
      <ProtectedRoute element={<AdminRefundPage />} allowedRoles={["Admin"]} />
    ),
  },
  {
    path: "/blog/:id",
    element: <BlogDetailPage />,
  },
  {
    path: "/refund-order",
    element: (
      <ProtectedRoute
        element={<RefundOrderPage />}
        allowedRoles={["Customer"]}
      />
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
