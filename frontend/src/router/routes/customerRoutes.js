import { lazy } from "react";
import OrderHistory from "../../views/customer/OrderHistory";
const HomePage = lazy(() => import("../../views/customer/HomePage"));
const ProductList = lazy(() => import("../../views/customer/Shop"));
const Cart = lazy(() => import("./../../views/customer/Cart"));
const ProductDetails = lazy(() =>
  import("./../../views/customer/ProductDetails")
);
const UserProfile = lazy(() => import("./../../views/customer/UserProfile"));

export const customerRoute = [
  {
    path: "/customer/homepage",
    element: <HomePage />,
    role: "customer",
  },
  {
    path: "/customer/product-list",
    element: <ProductList />,
    role: "customer",
  },
  {
    path: "/customer/cart",
    element: <Cart />,
    role: "customer",
  },
  {
    path: "/customer/order-history",
    element: <OrderHistory />,
    role: "customer",
  },
  {
    path: "/customer/product/:id",
    element: <ProductDetails />,
    role: "customer",
  },
  {
    path: "/customer/user-profile",
    element: <UserProfile />,
    role: "customer",
  },
];
