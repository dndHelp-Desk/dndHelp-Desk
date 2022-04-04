import React from "react";
import Filters from "./Filters";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef"

const OffCanvasMenu = ({ filtersModal, setfiltersModal, filters, setFilters }) => {
  const closeCanvasRef = useOnClickOutside(()=>{
	  setfiltersModal(false);
  });

  //Component ================
  return (
    <div
      ref={closeCanvasRef}
      className={`fixed left-0 top-0 bottom-0 flex justify-center h-full dark:bg-[#1e293bde] bg-slate-50 backdrop-blur-sm shadow-2xl pt-28 p-4 ${
        filtersModal ? "z-[999]" : "hidden z-[-999]"
      } transition-all`}
    >
      <div
        className={`h-full flex flex-col items-center gap-2 w-full  ${
          filtersModal ? "" : "hidden"
        } transition-all`}
      >
        <Filters filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
};

export default OffCanvasMenu;
