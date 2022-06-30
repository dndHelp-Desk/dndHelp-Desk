import { FC, useState } from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import EmailAccounts from "./EmailAccounts";
import Templates from "./Templates";
import Categories from "./Categories";
import { RootState } from "../../../Redux/store";

const SupportOperations: FC = () => {
  const member_details = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );
  const [menuItems, setTab] = useState<any>([
    {
      id: 3,
      name: "Categories",
      active: true,
    },
    {
      id: 1,
      name: "Email Accounts",
      active: false,
    },
    {
      id: 2,
      name: "Templates",
      active: false,
    },
    {
      id: 4,
      name: "Integrations",
      active: false,
    },
  ]);

  //Allow Admin Only ==========================
  if (member_details[0]?.access !== "admin") {
    return <Navigate to="/app" />;
  }
  //Tabs ========================
  const tabsMenu = menuItems.map((item: any) => {
    return (
      <li
        key={item.id}
        onClick={() =>
          setTab(
            menuItems.map((list: any) =>
              list.id === item.id
                ? { id: item.id, name: item.name, active: true }
                : { id: list.id, name: list.name, active: false }
            )
          )
        }
        className={`text-sm dark:text-slate-300 text-slate-800 font-semibold p-2 w-32 border-b-2 outline-none focus:outline-none whitespace-nowrap cursor-pointer  ${
          item.active
            ? "border-slate-800 dark:border-slate-300"
            : "border-slate-400 dark:border-slate-700"
        } text-center`}
      >
        {item.name}
      </li>
    );
  });

  //Component =================
  return (
    <section className="bg-transparent w-full h-full grid grid-rows-9 gap-4 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
      <nav className="row-span-1 w-full flex justify-center sticky top-0 bg-slate-200 dark:bg-slate-750 py-4 z-[99]">
        <ul className="h-full flex items-center justify-center">{tabsMenu}</ul>
      </nav>
      <div className="row-span-8 w-full min-h-[50rem]">
        {menuItems.filter(
          (item: any) => item.name === "Email Accounts" && item.active === true
        ).length >= 1 && <EmailAccounts />}
        {menuItems.filter(
          (item: any) => item.name === "Templates" && item.active === true
        ).length >= 1 && <Templates />}
        {menuItems.filter(
          (item: any) => item.name === "Categories" && item.active === true
        ).length >= 1 && <Categories />}
      </div>
    </section>
  );
};

export default SupportOperations;
