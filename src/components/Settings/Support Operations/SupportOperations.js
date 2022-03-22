import React, { useState } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import EmailAccounts from "./EmailAccounts";

const SupportOperations = () => {
  const member_details = useSelector((state) => state.UserInfo.member_details);
  const [menuItems, setTab] = useState([
    {
      id: 1,
      name: "Email Accounts",
      active: true,
    },
    {
      id: 2,
      name: "Templates",
      active: false,
    },
    {
      id: 3,
      name: "Others",
      active: false,
    },
  ]);

  //Allow Admin Only ==========================
  if (member_details[0].access !== "admin") {
    return <Navigate to="/app" />;
  }
  //Tabs ========================
  const tabsMenu = menuItems.map((item) => {
    return (
      <button
        key={item.id}
        onClick={() =>
          setTab(
            menuItems.map((list) =>
              list.id === item.id
                ? { id: item.id, name: item.name, active: true }
                : { id: list.id, name: list.name, active: false }
            )
          )
        }
        className={`text-sm dark:text-slate-300 text-slate-800 font-semibold p-2 w-32 border-b-2 outline-none focus:outline-none  ${
          item.active
            ? "border-slate-800 dark:border-slate-300"
            : "border-slate-300 dark:border-slate-700"
        } text-center`}
      >
        {item.name}
      </button>
    );
  });

  //Component =================
  return (
    <section className="dark:bg-slate-900 bg-slate-100 w-full h-full grid grid-rows-9 overflow-hidden">
      <nav className="row-span-1 w-full flex justify-center">
        <ul className="h-full flex items-center justify-center">{tabsMenu}</ul>
      </nav>
      <div className="row-span-8 w-full h-[36rem]">
        {menuItems.filter(
          (item) => item.name === "Email Accounts" && item.active === true
        ).length >= 1 && <EmailAccounts />}
      </div>
    </section>
  );
};

export default SupportOperations;