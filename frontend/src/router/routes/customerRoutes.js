import { lazy } from "react";
const HomePage = lazy(() => import("../../views/customer/HomePage"));
const ProductList = lazy(() => import("../../views/customer/Shop"));
const Filter = lazy(() => import("./../../views/customer/Filter"));
const Cart = lazy(() => import("./../../views/customer/Cart"));
const PaymentHistory = lazy(() =>
  import("./../../views/customer/PaymentHistory")
);
const ProductDetails = lazy(() =>
  import("./../../views/customer/ProductDetails")
);
const UserProfile = lazy(() => import("./../../views/customer/UserProfile"));
const ShippingInfo = lazy(() => import("./../../views/customer/ShippingInfo"));

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
    path: "/customer/filter",
    element: <Filter />,
    role: "customer",
  },
  {
    path: "/customer/cart",
    element: <Cart />,
    role: "customer",
  },
  {
    path: "/customer/payment-history",
    element: <PaymentHistory />,
    role: "customer",
  },
  {
    path: "/customer/product-detail",
    element: <ProductDetails />,
    role: "customer",
  },
  {
    path: "/customer/user-profile",
    element: <UserProfile />,
    role: "customer",
  },
  {
    path: "/customer/shipping-info",
    element: <ShippingInfo />,
    role: "customer",
  },
];
