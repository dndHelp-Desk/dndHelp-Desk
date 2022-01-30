import React from "react";
import WelcomeSvg from "./images/welcome.svg";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCalendarPlusFill } from "react-icons/bs";

const Main = () => {
  const location = useLocation();
  const memberDetails = useSelector((state) => state.UserInfo.member_details);
  let allTickets = useSelector((state) => state.Tickets.allTickets);
  const recentTickets = allTickets.length >= 1 && allTickets.slice(0, 3);

  const recents =
    recentTickets.length >= 1 &&
    recentTickets.map((recent) => {
      return (
        <div
          key={recent.ticket_id}
          className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center uppercase text-slate-400 font-semibold text-lg"
        >
          <abbr title={recent.recipient_name}>{`${recent.recipient_name.charAt(
            0
          )}`}</abbr>
        </div>
      );
    });

  //Component ========================
  return (
    <div
      className={`${
        location.pathname === "/help-desk" ? "grid" : "hidden"
      } bg-slate-300 mt-[-2rem] absolute left-[9.5%] z-0 rounded-xl w-[80%] p-2 overflow-hidden`}
    >
      <div className="h-[40rem] grid grid-rows-3 gap-2">
        <div className="row-span-1 w-full bg-slate-900 rounded-lg grid grid-cols-3 overflow-hidden py-6 p-2 gap-1">
          <div className="col-span-1 rounded-lg h-full w-full grid grid-rows-2 2xl:flex p-1 overflow-hidden">
            <div
              style={{ backgroundImage: `url(${WelcomeSvg})` }}
              className="row-span-1 2xl:w-[50%] overflow-hidden bg-no-repeat bg-contain bg-center"
            ></div>
            <div className="row-span-1 overflow-hidden flex justify-center items-center px-4">
              <h1 className="text-slate-400 font-bold text-base md:text-lg lg:text-xl rotate-[-5deg] text-center">
                Welcome back 🖐️, {memberDetails[0].name}
              </h1>
            </div>
          </div>
          <div className="col-span-1 grid grid-rows-2 overflow-hidden px-2">
            <div className="row-span-1 overflow-hidden">
              <h2 className="text-base font-bold text-slate-400 capitalize">
                recent tickets
              </h2>
              <p className="text-thin text-slate-500 text-sm">
                Hover on top of below letters to see the reciepent name or
                alternatively select <b>tickets</b>.
              </p>
            </div>
            <div className="row-span-1 flex items-center space-x-1">
              {recents}
            </div>
          </div>
          <div className="col-span-1 border-l border-slate-700 grid grid-rows-2 px-4 overflow-hidden">
            <div className="row-span-1 overflow-hidden">
              <h2 className="text-base font-bold text-slate-400 capitalize">
                contacts
              </h2>
              <p className="text-thin text-slate-500 text-sm">
                Make sure you add all the contacts before starting opening a new
                ticket.
              </p>
            </div>
            <div className="row-span-1 flex items-center space-x-1">
              <button className="bg-slate-800 rounded-lg text-slate-400 outline-none focus:outline-none focus:ring focus:ring-blue-600 hover:ring-1 ring-1 ring-slate-600 hover:ring-blue-600 text-xs font-bold h-10 px-4 transition-all duration-300">
                Manage Contacts
              </button>
            </div>
          </div>
        </div>
        {/**Bottom Half ================================ */}
        <div className="row-span-2 rounded-lg grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
          <div className="col-span-1 rounded-lg space-y-2">
            <div className="h-[17%] p-1 px-3 bg-slate-900 w-full rounded-lg flex justify-between items-center space-x-1">
              <div className="h-12 w-full bg-slate-800 rounded-lg relative">
                <button className="h-11 w-[3rem] border-l border-slate-700 absolute top-[4%] right-0 flex justify-center items-center outline-none focus:outline-none hover:text-blue-600 text-slate-400 transition-all">
                  <BsCalendarPlusFill />
                </button>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="w-full h-full rounded-lg outline-none focus:outline-none bg-transparent border-slate-700 placeholder:text-sm text-slate-400"
                  placeholder="Add New Task Here ..."
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="h-[81%] w-full bg-slate-900 rounded-lg p-4">
              <div className="h-12 w-full">
                <label htmlFor="taskCkeckBox">
                  <div className="h-8 w-8 rounded-full border border-slate-700 flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full border border-slate-700 flex items-center justify-center">
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="taskCkeckBox"
                    id="taskCkeckBox"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-slate-900 rounded-lg"></div>
          <div className="col-span-1 hidden lg:flex bg-slate-900 rounded-lg"></div>
          <div className="col-span-1 hidden 2xl:flex bg-slate-900 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Main;
