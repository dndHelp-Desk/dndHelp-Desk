import React from "react";
import WelcomeSvg from "./images/welcome.svg";
import {
  BsArrowRepeat,
  BsCheck2Square,
  BsXSquare,
  BsArrowUpSquare,
} from "react-icons/bs";

const Main = () => {
  const cardsArr = [
    { id: 1, name: "Resolved", count: 12 },
    { id: 2, name: "Closed", count: 52 },
    { id: 3, name: "Open", count: 23 },
    { id: 4, name: "Pending", count: 4 },
  ];
  const cards =  cardsArr.map((card,index)=>{
    return (
      <div
        key={index}
        className="custom-shadow
        col-span-1 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-lg p-3 grid grid-cols-3 xl:grid-rows-3"
      >
        <div className="col-span-1 xl:row-span-1 xl:col-span-3 flex justify-center items-center">
          <div className="custom-shadow h-[40%] max-h-[3rem] min-h-[3rem] w-[80%] max-w-[3rem] rounded-xl bg-slate-400 flex justify-center items-center text-gray-900 text-2xl">
            {card.name === "Resolved" && <BsCheck2Square />}
            {card.name === "Closed" && <BsXSquare />}
            {card.name === "Open" && <BsArrowUpSquare />}
            {card.name === "Pending" && <BsArrowRepeat />}
          </div>
        </div>
        <div className="col-span-2 xl:order-first xl:row-span-2 xl:col-span-3 h-full  flex items-center justify-center border-l xl:border-l-0 xl:border-b border-slate-600">
          <div className="p-2">
            <h3 className="w-full h-full flex items-center justify-center text-sm font-bold text-gray-400">
              {card.name}
            </h3>
            <h3 className="text-center w-full h-full flex items-center justify-center text-[3rem] font-bold text-gray-500">
              {card.count}
            </h3>
          </div>
        </div>
      </div>
    );
  })

  //Component ========================
  return (
    <div className="bg-[#0f172a28] backdrop-blur-lg custom-shadow mt-[-2rem] absolute left-[9.5%] z-0 rounded-xl h-[40rem] w-[80%] p-2 hidden sm:grid grid-rows-2 gap-2 overflow-hidden">
      <div className="row-span-1 rounded-lg md:grid grid-cols-3 gap-2 overflow-hidden">
        {/**Welcome Card ================================= */}
        <div className="col-span-1 p-4 bg-gradient-to-tr from-slate-900 to-slate-500 rounded-lg flex  3xl:flex md:grid grid-rows-4 overflow-hidden">
          <div className="row-span-3 3xl:col-span-3 flex justify-center 3xl:items-center p-1 overflow-hidden">
            <img
              className="object-cover object-center "
              src={WelcomeSvg}
              alt=""
            />
          </div>
          <div className="row-span-1 3xl:col-span-2 flex justify-center items-center 3xl:pt-[5rem]">
            <h2 className="text-slate-400 pb-2 font-sans font-semibold text-lg 2xl:text-xl 3xl:text-2xl text-center rotate-[-10deg]">
              <span className="whitespace-nowrap">Welcome Back 🖐️!</span>,
              <br /> Let's Get You Started
            </h2>
          </div>
        </div>

        <div className="hidden col-span-2 rounded-lg md:grid grid-cols-2 grid-rows-2 xl:grid-rows-1 xl:grid-cols-4 gap-2">
          {cards}
        </div>
      </div>
      
      {/**Bottom Half ============================= */}
      <div className="bg-slate-900 h-full w-full rounded-lg"></div>
    </div>
  );
};

export default Main;
