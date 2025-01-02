import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import {
  clearMessage,
  get_categories,
} from "../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Pagination } from "antd";

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchvalue, setSearchvalue] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const perPage = 5;

  const { categories, loader, errorMessage, success, total } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(get_categories({ currentPage, perPage }));
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
        <h1 className="text-[#d0d2d6] font-semibold text-lg">Category</h1>
        <button
          onClick={() => setShow(true)}
          className="bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap w-full">
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-white rounded-md">
            {/* // Category table  */}
            <div className="relative mt-5 overflow-x-auto">
              <table className="w-full text-sm text-center text-black">
                <thead className="text-sm text-black uppercase border-b border-gray-300">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      No
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Image
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Name
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((d, i) => (
                    <tr
                      key={i}
                      onClick={() => navigate(`/admin/category/${d.id}`)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <td className="py-1.5 px-4 font-medium whitespace-nowrap">
                        {i + 1}
                      </td>
                      <td className="py-1.5 px-4 font-medium whitespace-nowrap flex justify-center items-center">
                        <img
                          className="w-[50px] h-[50px] rounded-md"
                          src={d.image}
                          alt="Category"
                        />
                      </td>
                      <td className="py-1.5 px-4 font-medium whitespace-nowrap">
                        {d.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                <Pagination
                  defaultPageSize={perPage}
                  defaultCurrent={1}
                  current={currentPage}
                  total={total}
                  onChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-[320px] lg:w-5/12 translate-x lg:relative lg:right-0 fixed ${
            show ? "right-0" : "-right-[340px]"
          } z-[1000] top-0 transition-all duration-500`}
        >
          <div className="w-full pl-5">
            <div className="bg-[#6A5FDF] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#D0D2D6]">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-[#d0d2d6] font-semibold text-xl mb-4 w-full text-center ">
                  Add Category
                </h1>

                <div onClick={() => setShow(false)} className="block lg:hidden">
                  <IoMdCloseCircle />
                </div>
              </div>

              <form action="">
                <div className="flex flex-col w-full gap-1  mb-3">
                  <label htmlFor="name">Category Name</label>
                  <input
                    className="px-4 py-2 outline-none bg-white text-black border border-gray-300 rounded-md"
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="Category Name"
                  />
                </div>

                <div>
                  <label
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-gray-300"
                    htmlFor="image"
                  >
                    <span>
                      <FaImage />{" "}
                    </span>
                    <span>Select Image</span>
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                  />
                  <div>
                    <button className="bg-red-500 w-full hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
                      Add Category
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
