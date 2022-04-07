import React from "react";
import { Outlet } from "react-router-dom";

const SettingsComponents = () => {

  //Component ======================
  return (
    <div className="mt-4 container w-[90%] md:w-full 2xl:w-[72rem] min-h-screen overflow-hidden">
      {/**Main Components ============================== */}
        <Outlet />
    </div>
  );
};

export default SettingsComponents;
