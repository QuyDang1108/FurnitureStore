import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, get_orders_by_status } from "../../store/Reducers/orderReducer";
import toast from "react-hot-toast";
import { Pagination } from "antd";

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const dispatch = useDispatch();
  const { orders, success, errorMessage} = useSelector(
    (state) => state.orders
  );

  const total = orders?.length;

  useEffect(() => {
    dispatch(get_orders_by_status('PENDING'));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
    dispatch(clearMessage());
  }, [success, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md">
        <h1 className="text-[#d0d2d6] font-semibold text-lg">Order List</h1>
      </div>

      <div className="flex flex-wrap w-full">
        <div className="w-full p-4">
          <div className="bg-white p-5 rounded-md shadow-md">
            <div className="flex flex-wrap">
              <div className="w-full">
                <h2 className="text-lg font-semibold mb-4">Orders</h2>

                {/* Display table on large screens */}
                <div className="hidden lg:block">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b border-gray-200">No</th>
                        <th className="py-2 px-4 border-b border-gray-200">Order ID</th>
                        <th className="py-2 px-4 border-b border-gray-200">Address</th>
                        <th className="py-2 px-4 border-b border-gray-200">Created Date</th>
                        <th className="py-2 px-4 border-b border-gray-200">Status</th>
                        <th className="py-2 px-4 border-b border-gray-200">Total Amount</th>
                        <th className="py-2 px-4 border-b border-gray-200">Confirmed Admin</th>
                        <th className="py-2 px-4 border-b border-gray-200">Created Customer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order, i) => (
                        <tr>
                          <td className="py-2 px-4 border-b border-gray- text-center">
                            {i + 1}
                          </td>
                          <td className="py-2 px-4 border-b border-gray- text-center">
                            {order.id}
                          </td>
                          <td className="py-2 px-4 border-b border-gray- text-center">
                            {order.address}
                          </td>
                          <td className="py-2 px-4 border-b border-gray- text-center">
                            {new Date(order.createdDate).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 border-b border-gray- text-center">
                            {order.status}
                          </td>
                          <td className="py-2 px-4 border-b border-gray- text-center">
                            {order.total_amount}
                          </td>
                          <td className="py-2 px-4 border-b border-gray- text-center">
                            {order.confirmed_admin_id}
                          </td>
                          <td className="py-2 px-4 border-b border-gray- text-center">
                            {order.created_customer_id}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Display cards on small screens */}
                <div className="block lg:hidden">
                  {orders?.map((order, i) => (
                    <div
                      key={order.order_id}
                      onClick={() =>
                        (window.location.href = `/admin/orders/${order.order_id}`)
                      }
                      className="mb-4 p-4 border rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">No:</span>
                        <span>{i + 1}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Order ID:</span>
                        <span>{order.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Address:</span>
                        <span>{order.address}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Created Date:</span>
                        <span>{order.createdDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Status:</span>
                        <span>{order.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Total Amount:</span>
                        <span>{order.total_amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Confirmed Admin:</span>
                        <span>{order.confirmed_admin_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Created Customer:</span>
                        <span>{order.created_customer_id}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                  <Pagination
                    current={currentPage}
                    total={total}
                    pageSize={perPage}
                    onChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;