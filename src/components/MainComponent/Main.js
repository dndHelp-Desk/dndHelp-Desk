import React from "react";
import WelcomeSvg from "./images/welcome.svg";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Businnes from "./images/businnes.jpg";
import {
  BsArrowRightShort,
  BsDashSquare,
  BsCheckAll,
  BsArrowRepeat,
  BsEnvelopeOpen,
} from "react-icons/bs";
import ToDo from "./ToDo";

const Main = () => {
  const location = useLocation();
  let allTickets = useSelector((state) => state.Tickets.allTickets);
  // const overDue =
  //   allTickets &&
  //   allTickets
  //     .filter((data) => data.message_position === 1)
  //     .filter(
  //       (firstMsg) =>
  //         new Date(firstMsg.due_date).toISOString() <= new Date().toISOString()
  //     );
  // console.log(overDue)

  //Component ========================
  return (
    <div
      className={`${
        location.pathname === "/help-desk" ? "grid" : "hidden"
      } bg-slate-500 mt-[-2rem] absolute left-[9.5%] 2xl:left-[15%] z-0 rounded-xl w-[80%] 2xl:w-[70%] p-2 overflow-hidden`}
    >
      <div className="h-[40rem] grid grid-rows-3 gap-2">
        <div className="row-span-1 w-full bg-slate-900 rounded-xl grid grid-cols-1 md:grid-cols-3 overflow-hidden py-6 p-2 gap-1">
          <div
            style={{ backgroundImage: `url(${WelcomeSvg})` }}
            className="col-span-1 rounded-xl h-full w-full hidden md:grid grid-rows-2 2xl:flex p-1 overflow-hidden bg-no-repeat bg-contain bg-center"
          ></div>
          {/** Online Members ==================================*/}
          <div className="col-span-1 grid grid-rows-3 overflow-hidden px-2">
            <div className="row-span-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
              <h2 className="text-base font-bold text-slate-400 capitalize text-center md:text-left">
                Overdue Tickets
              </h2>
              <p className="text-thin text-slate-500 text-[13px] text-center md:text-left">
                The tickets displayed have been overdue or will soon be overdue.
                This doesn't indicate any good, try to resolve all isssue before
                the deadline. More in-depth reports can be found on reports
                page.
              </p>
            </div>
            <div className="row-span-1 flex justify-center md:justify-start items-center space-x-1">
              <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center relative">
                <img
                  src="https://cutt.ly/1OxImPP"
                  alt="user"
                  className="object-center h-full w-full object-cover rounded-xl"
                />
                <span className="absolute top-[-.1rem] right-[-.1rem] h-[.6rem] w-[.6rem] rounded-full bg-green-500 border border-slate-900"></span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center relative">
                <img
                  src="https://cutt.ly/jOxI9s4"
                  alt="user"
                  className="object-center h-full w-full object-cover rounded-xl"
                />
                <span className="absolute top-[-.1rem] right-[-.1rem] h-[.6rem] w-[.6rem] rounded-full bg-green-500 border border-slate-900"></span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center relative">
                <img
                  src="https://cutt.ly/aOxUWV8"
                  alt="user"
                  className="object-center h-full w-full object-cover rounded-xl"
                />
                <span className="absolute top-[-.1rem] right-[-.1rem] h-[.6rem] w-[.6rem] rounded-full bg-green-500 border border-slate-900"></span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-slate-800 text-slate-400 text-xl flex items-center justify-center">
                +
              </div>
            </div>
          </div>
          {/**End Of Online Members ==================================*/}

          {/**Manage Contacts ==================================*/}
          <div className="col-span-1 border-l border-slate-700 hidden md:grid grid-rows-2 px-4 overflow-hidden">
            <div className="row-span-1 overflow-hidden">
              <h2 className="text-base font-bold text-slate-400 capitalize">
                contacts
              </h2>
              <p className="text-thin text-slate-500 text-[13px]">
                Make sure to add/check if your contact is saved before you open
                a new ticket.
              </p>
            </div>
            <div className="row-span-1 flex items-center space-x-1">
              <button className="bg-slate-800 rounded-xl text-slate-400 outline-none focus:outline-none focus:ring focus:ring-blue-600 hover:ring-1 ring-1 ring-slate-600 hover:ring-blue-600 text-xs font-bold h-10 px-4 transition-all duration-300">
                Manage Contacts
              </button>
            </div>
          </div>
        </div>

        {/**Bottom Half ================================ */}
        <div className="row-span-2 rounded-xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          <ToDo />
          <div className="col-span-1 hidden md:grid grid-rows-5 bg-slate-900 rounded-xl px-2">
            <div className="row-span-2 bg-no-repeat bg-center bg-contain border-b border-slate-700 flex flex-col justify-center items-center px-4">
              <h2 className="text-slate-400 text-2xl font-bold capitalize">
                Today's Sumary
              </h2>
              <p className="text-slate-500 text-center text-xs">
                To see more analytics please visit the reports page and you can
                also check the current progress or your tickets in tickets page.
              </p>
            </div>
            <div className="row-span-3 space-y-2 p-2">
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl bg-blue-700 flex justify-center items-center text-2xl">
                    <BsCheckAll />
                  </div>
                  <h5 className="text-slate-400 text-sm font-bold">Resolved</h5>
                </div>
                <h5 className="text-slate-400 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "resolved"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl bg-green-700 flex justify-center items-center text-xl">
                    <BsDashSquare />
                  </div>
                  <h5 className="text-slate-400 text-sm font-bold">Closed</h5>
                </div>
                <h5 className="text-slate-400 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "closed"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl bg-yellow-700 flex justify-center items-center text-xl">
                    <BsArrowRepeat />
                  </div>
                  <h5 className="text-slate-400 text-sm font-bold">Pending</h5>
                </div>
                <h5 className="text-slate-400 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "pending"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl bg-slate-500 flex justify-center items-center text-xl">
                    <BsEnvelopeOpen />
                  </div>
                  <h5 className="text-slate-400 text-sm font-bold">Open</h5>
                </div>
                <h5 className="text-slate-400 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "open"
                    ).length
                  }
                </h5>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-slate-900 rounded-xl hidden xl:grid grid-rows-2 overflow-hidden place-items-center">
            <img
              className="h-full w-full object-cover object-center rounded-t-xl"
              src={Businnes}
              alt="business"
            />
            <div className="row-span-1 px-4 p-2 space-y-2 overflow-y-hidden">
              <h2 className="md:text-2xl text-lg text-slate-300 font-bold">
                Biggest Business Trends In 2022
              </h2>
              <p className="text-slate-400 text-sm">
                Here are the eight key trends every company will have to tackle
                in order to succeed.
              </p>
              <button className="bg-blue-700 outline-none focus:outline-none focus:ring focus:ring-blue-600 hover:ring-1 ring-1 ring-blue-800 hover:opacity-90 transition-all  text-sm text-slate-300 font-semibold px-4 py-2 rounded-xl">
                Read more <BsArrowRightShort className="inline text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
