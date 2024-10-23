import { lazy } from "react";
import AllProducts from "../../views/admin/AllProducts";
import AddProduct from "../../views/admin/AddProduct";
const AdminDashboard = lazy(() => import("./../../views/admin/AdminDashboard"));
const Chat = lazy(() => import("./../../views/admin/Chat"));
const Orders = lazy(() => import("./../../views/admin/Orders"));
const Category = lazy(() => import("./../../views/admin/Category"));

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
    path: "/admin/chat",
    element: <Chat />,
    role: "admin",
  },
  {
    path: "/admin/all-products",
    element: <AllProducts />,
    role: "admin",
  },
  {
    path: "/admin/add-product",
    element: <AddProduct />,
    role: "admin",
  },
];
