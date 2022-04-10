import React from "react";
import { Outlet } from "react-router-dom";

const SettingsComponents = () => {

  //Component ======================
  return (
    <div className="mt-4 w-[95%] 2xl:w-[75rem] min-h-screen overflow-hidden">
      {/**Main Components ============================== */}
        <Outlet />
    </div>
  );
};

export default SettingsComponents;
