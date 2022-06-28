import { FC } from "react";
import { Outlet } from "react-router-dom";

const SettingsComponents: FC = () => {
  //Component ======================
  return (
    <div className="w-[95%] 2xl:w-[80rem] h-full px-4 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
      {/**Main Components ============================== */}
      <Outlet />
    </div>
  );
};

export default SettingsComponents;
