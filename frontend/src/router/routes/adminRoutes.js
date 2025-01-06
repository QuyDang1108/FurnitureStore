import { lazy } from "react";
const AdminDashboard = lazy(() => import("./../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("./../../views/admin/Orders"));
const Category = lazy(() => import("./../../views/admin/Category"));
const AddProduct = lazy(() => import("./../../views/admin/AddProduct"));
const UserList = lazy(() => import("./../../views/admin/UserList"));
const ProductList = lazy(() => import("./../../views/admin/Product"));
const OrderDetail = lazy(() => import("./../../views/admin/OrderDetail"));
const UserDetail = lazy(() => import("./../../views/admin/UserDetail"));
const CategoryDetail = lazy(() => import("./../../views/admin/CategoryDetail"));

export const adminRoute = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    role: ["admin", "superadmin"],
  },
  {
    path: "/admin/orders",
    element: <Orders />,
    role: ["admin", "superadmin"],
  },
  {
    path: "/admin/category",
    element: <Category />,
    role: ["admin", "superadmin"],
  },
  {
    path: "/admin/add-product",
    element: <AddProduct />,
    role: ["admin", "superadmin"],
  },
  {
    path: "/admin/user-list",
    element: <UserList />,
    role: ["admin", "superadmin"],
  },
  {
    path: "/admin/product-list",
    element: <ProductList />,
    role: ["admin", "superadmin"],
  },
  {
    path: "/admin/orders/:id",
    element: <OrderDetail />,
    role: ["admin", "superadmin"],
  },
  {
    path: "/admin/users/:id",
    element: <UserDetail />,
    role: ["admin", "superadmin"],
  },
  {
    path: "/admin/category/:id",
    element: <CategoryDetail />,
    role: ["admin", "superadmin"],
  },
];
