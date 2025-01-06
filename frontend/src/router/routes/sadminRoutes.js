import { lazy } from "react";
const AdminDashboard = lazy(() => import("./../../views/admin/AdminDashboard"));
const RevenueDashboard = lazy(() =>
  import("./../../views/sadmin/RevenueDashboard")
);
const Orders = lazy(() => import("./../../views/admin/Orders"));
const Category = lazy(() => import("./../../views/admin/Category"));
const AddProduct = lazy(() => import("./../../views/admin/AddProduct"));
const UserList = lazy(() => import("./../../views/admin/UserList"));
const ProductList = lazy(() => import("./../../views/admin/Product"));
const OrderDetail = lazy(() => import("./../../views/admin/OrderDetail"));
const UserDetail = lazy(() => import("./../../views/admin/UserDetail"));
const CategoryDetail = lazy(() => import("./../../views/admin/CategoryDetail"));

export const sadminRoute = [
  {
    path: "/sadmin/dashboard",
    element: <AdminDashboard />,
    role: "superadmin",
  },
  {
    path: "/sadmin/revenue",
    element: <RevenueDashboard />,
    role: "superadmin",
  },
  {
    path: "/admin/orders",
    element: <Orders />,
    role: "superadmin",
  },
  {
    path: "/sadmin/category",
    element: <Category />,
    role: "superadmin",
  },
  {
    path: "/sadmin/add-product",
    element: <AddProduct />,
    role: "superadmin",
  },
  {
    path: "/sadmin/user-list",
    element: <UserList />,
    role: "superadmin",
  },
  {
    path: "/sadmin/product-list",
    element: <ProductList />,
    role: "superadmin",
  },
  {
    path: "/sadmin/orders/:id",
    element: <OrderDetail />,
    role: "superadmin",
  },
  {
    path: "/sadmin/users/:id",
    element: <UserDetail />,
    role: "superadmin",
  },
  {
    path: "/sadmin/category/:id",
    element: <CategoryDetail />,
    role: "superadmin",
  },
];
