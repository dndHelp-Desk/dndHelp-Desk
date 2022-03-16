import React from "react";
const Cloud =()=>{
  return (
    <div className="w-[90%] delayDisplay md:w-full container 2xl:w-[75rem]  m-auto border-t border-slate-200 py-4 pt-10 flex flex-col justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold leading-10 text-slate-800">
          Our Trusted Partners
        </h1>
        <p className="text-base leading-normal text-center text-slate-500 mt-4 xl:w-1/2 w-10/12">
          We just got featured in the following magazines and it has been the
          most incredible journey. We work with the best fashion magazines
          across the world
        </p>
      </div>
      <div className="flex items-center justify-center mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center items-center w-full">
          <div className="col-span-1 w-full h-32 bg-slate-200 rounded-xl flex items-center justify-center"></div>
          <div className="col-span-1 w-full h-32 bg-slate-200 rounded-xl flex items-center justify-center">
          </div>
          <div className="col-span-1 w-full h-32 bg-slate-200 rounded-xl flex items-center justify-center">
          </div>
          <div className="col-span-1 w-full h-32 bg-slate-200 rounded-xl flex items-center justify-center">
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cloud