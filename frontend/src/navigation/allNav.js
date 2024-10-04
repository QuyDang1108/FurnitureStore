import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";

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
];
