import React from "react";
import WelcomeSvg from "./images/welcome.svg";

const Main = () => {
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
          <div className="row-span-1 3xl:col-span-2 flex justify-center items-center">
            <h2 className="text-slate-400 pb-2 font-sans font-semibold text-lg 2xl:text-xl 3xl:text-2xl text-center rotate-[-10deg]">
              <span className="whitespace-nowrap">Welcome Back 🖐️!</span>,
              <br /> Let's Get You Started
            </h2>
          </div>
        </div>

        <div className="hidden md:flex col-span-2 bg-slate-900 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Main;
