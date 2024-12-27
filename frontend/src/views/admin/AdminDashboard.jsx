import React, { useEffect, useState } from "react";
import { MdCurrencyYen, MdOutlineShoppingCart } from "react-icons/md";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  get_total_orders,
  get_total_products,
  get_total_sales,
  get_total_users,
} from "../../store/Reducers/statReducer";
import { get_recent_orders } from "../../store/Reducers/orderReducer";

const AdminDashboard = () => {
  const [unit, setUnit] = useState("VND");
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);
  const [users, setUsers] = useState(0);
  const [recentOrd, setRecentOrd] = useState([]);

  const {
    totalSales,
    totalUsers,
    totalProducts,
    totalOrders,
    success,
    errorMessage,
  } = useSelector((state) => state.stat);

  const { recentOrders } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_total_users());
    dispatch(get_total_sales());
    dispatch(get_total_products());
    dispatch(get_total_orders());
    dispatch(get_recent_orders());
  }, []);

  useEffect(() => {
    if (totalSales > 1000000000) {
      setUnit("B");
      setSales(totalSales / 1000000000);
    } else if (totalSales > 1000000) {
      setUnit("M");
      setSales(totalSales / 1000000);
    } else if (totalSales > 1000) {
      setUnit("K");
      setSales(totalSales / 1000);
    }
  }, [totalSales]);

  useEffect(() => {
    setProducts(totalProducts);
  }, [totalProducts]);

  useEffect(() => {
    setOrders(totalOrders);
  }, [totalOrders]);

  useEffect(() => {
    setUsers(totalUsers);
  }, [totalUsers]);

  useEffect(() => {
    setRecentOrd(recentOrders);
  }, [recentOrders]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [success, errorMessage]);

  return (
    // Main dashboard
    <div className="px-2 md:px-7 py-5">
      {/* // Summary tabs */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {/* // Total sales */}
        <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5C5A5A]">
            <h2 className="font-bold text-3xl">
              {sales}
              {unit}
            </h2>
            <span className="text-md font-medium">Total sales</span>
          </div>

          <div
            className="w-[40px] h-[47px] rounded-full bg-[#FF0305] flex justify-center
                    items-center text-xl"
          >
            <MdCurrencyYen className="text-[white] shadow-lg" />
          </div>
        </div>

        {/* //Products */}
        <div className="flex justify-between items-center p-5 bg-[#FDE2FF] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5C5A5A]">
            <h2 className="font-bold text-3xl">{products}</h2>
            <span className="text-md font-medium">Products</span>
          </div>

          <div
            className="w-[40px] h-[47px] rounded-full bg-[#7E0080] flex justify-center
                    items-center text-xl"
          >
            <MdOutlineShoppingCart className="text-[white] shadow-lg" />
          </div>
        </div>

        {/* // Orders */}
        <div className="flex justify-between items-center p-5 bg-[#ECEBFF] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5C5A5A]">
            <h2 className="font-bold text-3xl">{orders}</h2>
            <span className="text-md font-medium">Orders</span>
          </div>

          <div
            className="w-[40px] h-[47px] rounded-full bg-[#0200FD] flex justify-center
                    items-center text-xl"
          >
            <RiShoppingCartFill className="text-[white] shadow-lg" />
          </div>
        </div>

        {/* // Customers */}
        <div className="flex justify-between items-center p-5 bg-[#E6F9FF] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5C5A5A]">
            <h2 className="font-bold text-3xl">{users}</h2>
            <span className="text-md font-medium">Users</span>
          </div>

          <div
            className="w-[40px] h-[47px] rounded-full bg-[#0080FF] flex justify-center
                    items-center text-xl"
          >
            <FaUser className="text-[white] shadow-lg" />
          </div>
        </div>
      </div>

      {/* // Orders table */}
      <div className="w-full p-4 bg-white rounded-md mt-6">
        {/* // Header  */}
        <div className="flex justify-between items-center pr-4">
          <h2 className="font-semibold text-lg text-black pb-3">
            Recent Orders
          </h2>
          <Link
            to={"/admin/orders"}
            className="font-semibold text-sm text-black"
          >
            View All
          </Link>
        </div>

        {/* // Table  */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-center text-black">
            <thead className="text-sm text-black uppercase border-b border-gray-300">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4"></th>
              </tr>
            </thead>

            <tbody>
              {recentOrd.map((order, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    order.id
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    $454
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    Pending
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    Pending
                  </td>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    <Link className="text-blue-500">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
