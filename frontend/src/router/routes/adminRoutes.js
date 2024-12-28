import { lazy } from "react";
const PaymentRequest = lazy(() => import("./../../views/admin/PaymentRequest"));
const AdminDashboard = lazy(() => import("./../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("./../../views/admin/Orders"));
const Category = lazy(() => import("./../../views/admin/Category"));
const AddProduct = lazy(() => import("./../../views/admin/AddProduct"));
const UserList = lazy(() => import("./../../views/admin/UserList"));
const ProductList = lazy(() => import("./../../views/admin/Product"));
const OrderDetail = lazy(() => import("./../../views/admin/OrderDetail"));
const UserDetail = lazy(() => import("./../../views/admin/UserDetail"));

export const adminRoute = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "/admin/orders",
    element: <Orders />,
    role: "admin",
  },
  {
    path: "/admin/category",
    element: <Category />,
    role: "admin",
  },
  // {
  //   path: "/admin/payment-request",
  //   element: <PaymentRequest />,
  //   role: "admin",
  // },
  {
    path: "/admin/add-product",
    element: <AddProduct />,
    role: "admin",
  },
  {
    path: "/admin/user-list",
    element: <UserList />,
    role: "admin",
  },
  {
    path: "/admin/product-list",
    element: <ProductList />,
    role: "admin",
  },
  {
    path: "/admin/orders/:id",
    element: <OrderDetail />,
    role: "admin",
  },
  {
    path: "/admin/users/:id",
    element: <UserDetail />,
    role: "admin",
  },
];
