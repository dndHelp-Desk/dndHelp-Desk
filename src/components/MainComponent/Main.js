import React from "react";
import WelcomeSvg from "./images/welcome.svg";
import { useLocation } from "react-router-dom";

const Main = () => {
  const location = useLocation();
  const cardsArr = [
    { id: 1, name: "Resolved", count: 12 },
    { id: 2, name: "Closed", count: 52 },
    { id: 3, name: "Open", count: 23 },
    { id: 4, name: "Pending", count: 4 },
  ];

  //Loop through different status for each cards
  const cards =  cardsArr.map((card,index)=>{
    return (
      <div
        key={index}
        className="custom-shadow
        col-span-1 bg-slate-900 rounded-lg p-3 py-4"
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h3 className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-400">
              {card.name}
            </h3>
            <h3 className="text-center w-full h-full flex items-center justify-center text-[3rem] font-bold text-gray-500">
              {card.count}
            </h3>
            <div className="h-5 w-14 rounded-full bg-[#00e98865] flex justify-center items-center text-green-400 font-bold text-xs tracking-wider">
              <small>▴12%</small>
            </div>
        </div>
      </div>
    );
  })

  //Component ========================
  return (
    <div
      className={`${
        location.pathname === "/help-desk" ? "grid" : "hidden"
      } bg-slate-300 mt-[-2rem] absolute left-[9.5%] z-0 rounded-xl w-[80%] p-2 grid-rows-2 gap-2 overflow-hidden`}
    >
      <div className="row-span-1rounded-lg md:grid grid-cols-3 gap-2 overflow-hidden">
        {/**Welcome Card ================================= */}
        <div className="col-span-1  p-4 h-full bg-gradient-to-tr from-slate-900 to-slate-500 rounded-lg overflow-hidden justify-center grid grid-rows-3">
          <div
            style={{ backgroundImage: `url(${WelcomeSvg})` }}
            className="row-span-2 bg-local bg-contain bg-no-repeat bg-center h-full w-full flex justify-center items-center overflow-hidden"
          ></div>
          <div className="row-span-1 flex justify-center items-center bg-transparent backdrop-blur-[1px] w-full h-full">
            <h2 className="text-slate-400 pb-2 font-sans font-semibold text-2xl md:text-lg lg:text-xl xl:text-2xl  text-center rotate-[-5deg]">
              <span className="whitespace-nowrap">Welcome Back 🖐️!</span>,
              <br /> Let's Get You Started
            </h2>
          </div>
        </div>

        <div className="hidden col-span-2 rounded-lg md:grid grid-cols-2 grid-rows-1 xl:grid-rows-2  xl:grid-cols-4 gap-2">
          {cards}
          <div className="hidden xl:flex bg-slate-900 col-span-1 rounded-lg"></div>
          <div className="hidden xl:flex bg-slate-900 col-span-1 rounded-lg"></div>
          <div className="hidden xl:flex bg-slate-900 col-span-1 rounded-lg"></div>
          <div className="hidden xl:flex bg-slate-900 col-span-1 rounded-lg"></div>
        </div>
      </div>

      {/**Bottom Half ============================= */}
      <div className="h-full w-full grid grid-cols-2 gap-2 rounded-lg">
        <div className="cols-span-1 rounded-lg bg-slate-900 "></div>
        <div className="cols-span-1 rounded-lg bg-slate-900 "></div>
      </div>
    </div>
  );
};

export default Main;
