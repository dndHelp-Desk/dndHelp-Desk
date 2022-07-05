import { FC } from "react";
import { Outlet } from "react-router-dom";

const SettingsComponents: FC = () => {
  //Component ======================
  return (
    <div className=" w-full min-h-[calc(100%-3.65rem)] overflow-hidden">
      {/**Main Components ============================== */}
      <Outlet />
    </div>
  );
};

export default SettingsComponents;
