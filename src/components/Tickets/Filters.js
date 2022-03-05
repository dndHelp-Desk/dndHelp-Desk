import React from "react";
import { BsShopWindow } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "./../../store/TicketsSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.Tickets.filters);

  //Component ==============================
  return (
    <>
      <div className="h-full bg-transparent w-full lg:min-w-0 flex items-center border-b dark:border-slate-700 border-slate-300 relative">
        <BsShopWindow className="text-slate-500 text-lg absolute h-10 left-3" />
        <input
          type="search"
          autoComplete="off"
          name="brand"
          id="brand"
          onChange={(e) =>
            dispatch(filter({ ...filters, brand: e.target.value }))
          }
          value={filters.brand}
          className="h-full w-full bg-transparent outline-none focus:outline-none border-0 focus:ring-0 focus:border-b duration-300 text-slate-400 placeholder:text-slate-500 placeholder:text-xs text-sm pl-10 text-center"
          placeholder="Search By Store Name ..."
        />
      </div>
    </>
  );
};

export default Filters;
