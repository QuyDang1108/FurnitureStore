import React, { useEffect, useState } from "react";
import { use } from "react";
import { useDispatch } from "react-redux";
import { get_users } from "../../store/Reducers/userReducer";
import toast from "react-hot-toast";

const CustomerList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const dispatch = useDispatch();
  const { users, success, errorMessage } = use((state) => state.users);

  useEffect(() => {
    dispatch(get_users());
  }, [dispatch]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [success, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#6a5fdf] rounded-md">
        <h1 className="text-[#d0d2d6] font-semibold text-lg">Customer List</h1>
      </div>

      <div className="flex flex-wrap w-full">
        <div className="w-full p-4">
          <div className="bg-white p-5 rounded-md shadow-md">
            <div className="flex flex-wrap">
              <div className="w-full">
                <h2 className="text-lg font-semibold mb-4">Customers</h2>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Name
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Email
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Address
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((customer) => (
                      <tr key={customer.id}>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {customer.name}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {customer.email}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {customer.address}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200">
                          {customer.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                  <Pagination
                    pageNumber={currentPage}
                    setPageNumber={setCurrentPage}
                    totalItem={50}
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

export default CustomerList;
