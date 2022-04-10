import React from "react";
import debonairs from "./cloudImages/deb.png"
import steers from "./cloudImages/steers.png";
import fishaways from "./cloudImages/fishaways.png";

const Cloud = () => {
  return (
    <div className="w-[90%] delayDisplay md:w-full container 2xl:w-[75rem]  m-auto py-4 pt-20 flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-3xl font-bold leading-10 text-slate-800">
          The companies you trust, use dndHelp-Desk.
        </h3>
        <p className="text-base leading-normal text-center text-slate-600 mt-4 xl:w-1/2 w-10/12">
          80% of tradeshow leads are never followed up..Dissatisfied customers
          communicate with 7-10 people while a satisfied customer will recommend
          a company to 3-4 of their friends.
        </p>
      </div>
      <div className="flex items-center justify-center mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center items-center px-28 w-full">
          <div className="col-span-1 w-full h-32 bg-slate-200 border border-slate-300 rounded flex items-center justify-center">
            <img
              src={debonairs}
              alt="debonairs"
              className="w-[70%] object-cover object-center"
            />
          </div>
          <div className="col-span-1 w-full h-32 bg-slate-200 border border-slate-300 rounded flex items-center justify-center">
            <img
              src={steers}
              alt="debonairs"
              className="h-[90%] object-cover object-center"
            />
          </div>
          <div className="col-span-1 w-full h-32 bg-slate-200 border border-slate-300 rounded flex items-center justify-center">
            <img
              src={fishaways}
              alt="debonairs"
              className="w-[70%] object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cloud;
