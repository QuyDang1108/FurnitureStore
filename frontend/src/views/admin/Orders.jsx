import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, get_orders } from "../../store/Reducers/orderReducer";
import toast from "react-hot-toast";
import Pagination from "../Pagination";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const dispatch = useDispatch();
  const { orders, success, errorMessage, total } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(get_orders({ currentPage, perPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (success) {
      toast.success("Order list fetched successfully");
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }

    clearMessage();
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
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Order ID
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Customer Name
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Total Amount
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        onClick={() =>
                          (window.location.href = `/admin/orders/${order.id}`)
                        }
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          {order.id}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          {order.customerName}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          {order.totalAmount}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          {order.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                  <Pagination
                    pageNumber={currentPage}
                    setPageNumber={setCurrentPage}
                    totalItem={total}
                    perPage={perPage}
                    showItem={3}
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

export default Orders;
