import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { FaHome, FaHistory, FaUser, FaProductHunt } from "react-icons/fa";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiOutlineDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/orders",
  },
  {
    id: 3,
    title: "Category",
    icon: <BiSolidCategory />,
    role: "admin",
    path: "/admin/category",
  },
  {
    id: 6,
    title: "User List",
    icon: <FaUser />,
    role: "admin",
    path: "/admin/user-list",
  },
  {
    id: 8,
    title: "Home",
    icon: <FaHome />,
    role: "customer",
    path: "/customer/homepage",
  },
  {
    id: 9,
    title: "Product List",
    icon: <FaProductHunt />,
    role: "customer",
    path: "/customer/product-list",
  },
  {
    id: 10,
    title: "Cart",
    icon: <AiOutlineShoppingCart />,
    role: "customer",
    path: "/customer/cart",
  },
  {
    id: 12,
    title: "Account",
    icon: <FaUser />,
    role: "customer",
    path: "/customer/user-profile",
  },
  {
    id: 13,
    title: "Add Product",
    icon: <FaProductHunt />,
    role: "admin",
    path: "/admin/add-product",
  },
  {
    id: 14,
    title: "Product List",
    icon: <FaProductHunt />,
    role: "admin",
    path: "/admin/product-list",
  },
  {
    id: 15,
    title: "Order History",
    icon: <FaHistory />,
    role: "customer",
    path: "/customer/order-history",
  },
];
