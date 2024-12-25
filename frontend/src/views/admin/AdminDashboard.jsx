import React from "react";
import { MdCurrencyYen, MdOutlineShoppingCart } from "react-icons/md";
import { RiShoppingCartFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    // Main dashboard
    <div className="px-2 md:px-7 py-5">
      {/* // Summary tabs */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {/* // Total sales */}
        <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5C5A5A]">
            <h2 className="font-bold text-3xl">$3434</h2>
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
            <h2 className="font-bold text-3xl">20</h2>
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
            <h2 className="font-bold text-3xl">$3434</h2>
            <span className="text-md font-medium">Orders</span>
          </div>

          <div
            className="w-[40px] h-[47px] rounded-full bg-[#0200FD] flex justify-center
                    items-center text-xl"
          >
            <RiShoppingCartFill className="text-[white] shadow-lg" />
          </div>
        </div>
      </div>

      {/* // Messages */}
      <div className="w-full flex mt-7 bg-[#6A5FDF] rounded-xl">
        <div className="w-full p-4 text-[#D0D2D6]">
          {/* // Header */}
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg text-[#D0D2D6] pb-3">
              Recent seller messages
            </h2>
            <Link className="font-semibold text-sm text-[#D0D2D6] pb-3">
              View all
            </Link>
          </div>

          {/* // Unseen messages */}
          <div className="flex flex-col gap-2 pt-6 text-[#D0D2D6]">
            <ol className="relative border-1 border-slate-600 ml-4">
              <li className="mb-3 ml-6 ">
                <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4C7FE2] rounded-full z-10">
                  <img
                    className="w-full rounded-full h-full"
                    src="http://localhost:3000/images/admin.jpg"
                    alt="Admin avatar"
                  />
                </div>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <Link className="text-md font-normal">Admin</Link>
                    <time
                      className="mb-1 text-sm font-normal sm:order-last sm:mb-0"
                      datetime=""
                    >
                      2 days ago
                    </time>
                  </div>

                  <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                    How are you
                  </div>
                </div>
              </li>

              <li className="mb-3 ml-6 ">
                <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4C7FE2] rounded-full z-10">
                  <img
                    className="w-full rounded-full h-full"
                    src="http://localhost:3000/images/admin.jpg"
                    alt="Admin avatar"
                  />
                </div>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <Link className="text-md font-normal">Admin</Link>
                    <time
                      className="mb-1 text-sm font-normal sm:order-last sm:mb-0"
                      datetime=""
                    >
                      2 days ago
                    </time>
                  </div>

                  <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                    How are you
                  </div>
                </div>
              </li>

              <li className="mb-3 ml-6 ">
                <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4C7FE2] rounded-full z-10">
                  <img
                    className="w-full rounded-full h-full"
                    src="http://localhost:3000/images/admin.jpg"
                    alt="Admin avatar"
                  />
                </div>
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <Link className="text-md font-normal">Admin</Link>
                    <time
                      className="mb-1 text-sm font-normal sm:order-last sm:mb-0"
                      datetime=""
                    >
                      2 days ago
                    </time>
                  </div>

                  <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                    How are you
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* // Orders table */}
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md mt-6">
        {/* // Header  */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3 ">
            Recent Orders
          </h2>
          <Link className="font-semibold text-sm text-[#d0d2d6]">View All</Link>
        </div>

        {/* // Table  */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
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
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    #34344
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
                    <Link>View</Link>
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
