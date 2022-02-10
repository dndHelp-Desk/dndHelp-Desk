import React from "react";
import Filters from "../Reports/Filters";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef"

const OffCanvasMenu = ({ filtersModal, setfiltersModal }) => {
  const closeCanvasRef = useOnClickOutside(()=>{
	  setfiltersModal(false);
  });

  //Component ================
  return (
    <div ref={closeCanvasRef} className={`fixed left-0 top-0 right-0 flex justify-center w-full  bg-[#1e293bde] backdrop-blur-sm border-b shadow-2xl border-slate-800 p-4 ${filtersModal?"h-[9.8rem] z-[999]":"h-0 opacity-0 z-[-9999]"} transition-all`}>
      <div className="h-full flex justify-center w-[80%] 2xl:w-[72rem]">
        <div className="w-[25rem] h-full grid grid-cols-2 gap-2">
          <Filters />
        </div>
      </div>
    </div>
  );
};

export default OffCanvasMenu;
