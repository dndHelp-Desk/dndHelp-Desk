import { FC } from "react";
import Sidenav from "./Sidenav";
import { Outlet } from "react-router-dom";

const Account: FC = () => {
  //Component =========================
  return (
    <div className="w-full grid grid-cols-4 gap-4">
      {/**Nav ==================================== */}
      <Sidenav />

      {/***Main Content ================================ */}
      <Outlet />
    </div>
  );
};

export default Account;
