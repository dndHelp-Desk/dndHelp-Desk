import React from "react";
import { Outlet } from "react-router-dom";

const SettingsComponents = () => {

  //Component ======================
  return (
    <div className=" mt-4 h-[42rem]  container w-[90%] md:w-full 2xl:w-[72rem] overflow-hidden">
      {/**Main Components ============================== */}
      <section className="w-full h-full dark:bg-slate-800 bg-slate-200 border dark:border-slate-800 border-slate-300 rounded-lg p-4 overflow-hidden">
        <Outlet />
      </section>
    </div>
  );
};

export default SettingsComponents;
