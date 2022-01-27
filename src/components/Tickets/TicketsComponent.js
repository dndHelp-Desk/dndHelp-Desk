import React from 'react';
import { BsSearch, BsFillCalendar2RangeFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import TicketsList from './TicketsList';

const TicketsComponent = () => {
	let allTickects = useSelector(state => state.Tickects.allTickects)
	console.log(allTickects)
  return (
    <div className="bg-slate-300 mt-[-2rem] px-1 absolute left-[9.5%] z-0 rounded-lg max-h-[42rem] w-[80%] overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar">
      {/**Navbar or Control Bar  ====================== */}
      <nav className="h-[3.5rem] sticky top-0 bg-slate-300 pt-2 flex justify-between items-center w-full overflow-x-hidden p-1">
        {/**Search Bar ============================== */}
        <div className="flex bg-slate-900 rounded-lg h-full items-center justify-center relative">
          <BsSearch className="absolute left-3 text-slate-400 font-semibold" />
          <input
            className="w-11 md:w-[18rem] h-full bg-transparent rounded-lg focus:w-[15rem] md:focus:w-[18rem] focus:px-4 md:focus:px-10 focus:bg-slate-900 md:focus:bg-transparent text-slate-400 text-sm md:px-10 z-[999] placeholder-slate-900 md:placeholder-slate-400 border-0 focus:outline-none outline-none  focus:ring focus:ring-slate-500 transition-h duration-300"
            type="search"
            placeholder="Quick Search ..."
          />
        </div>

        {/**Date Filter & New Tickect ============================== */}
        <div className="rounded-lg h-full flex justify-between items-center space-x-2">
          <button className="bg-slate-900 h-full w-[92px] rounded-lg flex justify-center items-center text-slate-400 text-sm font-base tracking-wide focus:outline-none outline-none  focus:ring focus:ring-slate-500 hover:bg-slate-800 duration-300 transition-bg">
            + New
          </button>
          <button className="w-10 md:w-[200px] h-full rounded-lg flex justify-center items-center relative bg-slate-900 focus:outline-none outline-none  focus:ring focus:ring-slate-500 hover:bg-slate-800 duration-300 transition-bg text-slate-400 text-sm font-bas">
            <BsFillCalendar2RangeFill className="absolute left-3 text-slate-400" />
            <span className="hidden md:flex">Pick A Date ...</span>
          </button>
        </div>
      </nav>
      {/**Tickects /Not Expanded=========== */}
      <TicketsList />
    </div>
  );
};

export default TicketsComponent;
