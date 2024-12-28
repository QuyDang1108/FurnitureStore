import React from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  perPage,
  showItem,
}) => {
  let totalPage = Math.ceil(totalItem / perPage);

  if (totalPage === 0 || totalPage === 1) {
    return null;
  }

  let startPage = pageNumber - Math.floor(showItem / 2);
  startPage = startPage < 1 ? 1 : startPage;

  let endPage = startPage + showItem;
  endPage = endPage > totalPage ? totalPage : endPage;

  if (endPage === totalPage) {
    startPage = endPage - showItem;
    startPage = startPage < 1 ? 1 : startPage;
  }

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li
          onClick={() => setPageNumber(i)}
          key={i}
          className={` ${
            pageNumber === i
              ? "bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white"
              : "bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]"
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer `}
        >
          {i}
        </li>
      );
    }
    return btns;
  };
  return (
    <ul className="flex gap-3">
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
