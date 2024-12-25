import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import { FaHome, FaHistory, FaUser } from 'react-icons/fa';

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
    id: 5,
    title: "Payment Request",
    icon: <MdPayment />,
    role: "admin",
    path: "/admin/payment-request",
  },
  {
    id: 8,
    title: "Live Chat",
    icon: <IoIosChatbubbles />,
    role: "admin",
    path: "/admin/seller-chat",
  },
  {
    id: 9,
    title: "Home",
    icon: <FaHome />,
    role: "customer",
    path: "/customer/homepage",
  },
  {
    id: 10,
    title: "Cart",
    icon: <AiOutlineShoppingCart />,
    role: "customer",
    path: "/customer/cart",
  },
  {
    id: 11,
    title: "Payment History",
    icon: <FaHistory />,
    role: "customer",
    path: "/customer/payment-history",
  },
  {
    id: 12,
    title: "Account",
    icon: <FaUser />,
    role: "customer",
    path: "/customer/user-profile",
  },
];
