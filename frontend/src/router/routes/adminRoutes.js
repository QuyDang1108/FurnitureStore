import { lazy } from "react";
const PaymentRequest = lazy(() => import("./../../views/admin/PaymentRequest"));
const AdminDashboard = lazy(() => import("./../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("./../../views/admin/Orders"));
const Category = lazy(() => import("./../../views/admin/Category"));
const AddProduct = lazy(() => import("./../../views/admin/AddProduct"));
const CustomerList = lazy(() => import("./../../views/admin/CustomerList"));

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
  {
    path: "/admin/payment-request",
    element: <PaymentRequest />,
    role: "admin",
  },
  {
    path: "/admin/add-product",
    element: <AddProduct />,
    role: "admin",
  },
  {
    path: "/admin/user-list",
    element: <CustomerList />,
    role: "admin",
  },
];