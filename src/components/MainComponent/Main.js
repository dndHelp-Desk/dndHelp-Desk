import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector} from "react-redux";
import noUsers from "./images/no-userss.svg";
import {
  BsDashCircleDotted,
  BsCheckAll,
  BsArrowRepeat,
  BsEnvelopeOpen,
  BsFillHandThumbsUpFill,
  BsEnvelope,
  BsAlarm,
  BsStopFill,
} from "react-icons/bs";
import ToDo from "./ToDo";
import Calendar from "./Calendar";

const Main = () => {
  const location = useLocation();
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const todoList = useSelector((state) => state.UserInfo.toDo);
  const allMembers = useSelector((state) => state.UserInfo.allMembers);
  let filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const overDue =
    filteredTickets &&
    filteredTickets.filter(
      (firstMsg) =>
        new Date(firstMsg.due_date !== null && firstMsg.due_date).getTime() <=
        new Date().getTime()
    );

  //New Replies Array ========================
  const newReplies =
    (allTickets.length >= 1 &&
      allTickets.filter(
        (ticket) => ticket.readStatus !== "read" && ticket.from !== "agent"
      )) ||
    [];

  //Loop Through All Users ================
  const users =
    allMembers.length >= 1 &&
    allMembers.map((user) => {
      return (
        <div
          key={user.id}
          className="w-full snap_child h-16 rounded-lg dark:bg-[#1e293b9c] bg-slate-200 flex items-center space-x-4 p-2 border dark:border-slate-800 border-slate-300"
        >
          <div className="h-10 w-10 rounded-xl border-2 p-[2px] dark:border-slate-500 border-slate-400 relative overflow-hidden">
            <img
              src={
                user.photoUrl !== null
                  ? user.photoUrl
                  : "https://firebasestorage.googleapis.com/v0/b/dial-n-dine-help-desk.appspot.com/o/no-profile.jpg?alt=media&token=82e21d0b-4af2-40d3-9f69-5ff676aa36d5"
              }
              alt="profile"
              className="object-cover w-full h-full object-center rounded-lg"
            />
          </div>
          <h3 className="text-sm font-semibold capitalize dark:text-slate-400 text-slate-600 w-40">
            {user.name}
            <br />
            <small className="capitalize dark:text-slate-500 text-slate-500 w-40">
              {user.dept}
            </small>
          </h3>
          <h3
            className={`text-xs flex items-center space-x-1 ${
              user.status === "available"
                ? "text-green-600"
                : user.status === "unavailable"
                ? "text-red-600"
                : "text-yellow-600"
            } capitalize`}
          >
            <BsStopFill /> <span>{user.status}</span>
          </h3>
        </div>
      );
    });

  //Component ========================
  return (
    <div
      className={`${
        location.pathname === "/app" ? "grid" : "hidden"
      } dark:bg-transparent bg-transparent w-[90%] md:w-full container 2xl:w-[72rem] mt-4 overflow-hidden`}
    >
      <div className="grid gap-4 place-content-center pb-4 h-fit">
        <div className="row-span-2 w-full h-fit dark:bg-slate-900 bg-slate-100 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center overflow-hidden p-4 gap-5 lg:h-[16rem] items-center lg:gap-2">
          <div className="col-span-1 py-2 lg:py-0 h-[15rem] border-b lg:border-0 dark:border-slate-800 border-slate-300 md:col-span-2 lg:col-span-1 lg:max-h-[13rem] w-full 2xl:flex overflow-hidden">
            <Calendar />
          </div>
          {/** Overdue Tickets ==================================*/}
          <div className="col-span-1 lg:max-h-[13rem] flex flex-col h-full justify-between overflow-hidden px-2 py-1  lg:border-l dark:border-slate-800 border-slate-300">
            {overDue.length >= 1 && (
              <div className="flex flex-col gap-1 pb-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
                <h2 className="text-base font-bold dark:text-slate-300 text-slate-900 capitalize text-center">
                  Overdue Tickets
                </h2>
                <p className="text-thin dark:text-slate-400 text-slate-700 text-xs lg:text-sm text-center">
                  {overDue.length} ticket/s that are highlighted with blue on
                  the calendar have been overdue the resolve-by date. To keep
                  yourself up-to date the calender has highlighted all due
                  dates, just hover on top to see clients name which can be used
                  to search.
                </p>
              </div>
            )}
            {overDue.length <= 0 && (
              <div className="flex flex-col justify-between pb-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
                <h2 className="text-base font-bold dark:text-slate-300 text-slate-900 capitalize text-center">
                  Overdue Tickets
                </h2>
                <p className="text-thin dark:text-slate-400 text-slate-700 text-sm text-center">
                  You all catched up{" "}
                  <BsFillHandThumbsUpFill className="inline text-yellow-500" />
                  .You can check/hover on top of the highlighted dates on the
                  calendar to see upcoming deadline. . Don’t dwell on what went
                  wrong. Instead, focus on what to do next. Spend your energies
                  on moving forward toward finding the answer.
                </p>
              </div>
            )}
            <div className="flex items-center justify-center space-x-1">
              <Link to="./tickets">
                <button className="dark:bg-slate-800 bg-slate-200 rounded-lg dark:text-slate-400 text-slate-700 outline-none focus:outline-none focus:ring focus:ring-red-600 hover:ring-1 ring-1 dark:ring-slate-600 ring-slate-500 dark:hover:ring-red-600 hover:ring-red-600 text-xs font-bold h-10 px-5 transition-all duration-300">
                  Resolve Tickets
                </button>
              </Link>
            </div>
          </div>
          {/**End Of Overdue Tickets ==================================*/}

          {/**Manage Contacts ==================================*/}
          <div className="col-span-1 lg:max-h-[13rem] flex flex-col h-full justify-between overflow-hidden px-2 py-1 lg:border-l dark:border-slate-800 border-slate-300">
            <div className="flex flex-col gap-2 pb-2 overflow-hidden">
              <h2 className="text-base text-center font-bold dark:text-slate-300 text-slate-900 capitalize">
                contacts
              </h2>
              <p className="text-thin dark:text-slate-400 text-slate-700 text-sm text-center">
                Click below button to manage yours contacts. It is important to
                keep them up-to date as it will ensure no email is sent to the
                wrong recipient. All contacts must be added/saved before opening
                a new ticket.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <Link to="./contacts">
                <button className="dark:bg-slate-800 bg-slate-200 rounded-lg dark:text-slate-400 text-slate-600 outline-none focus:outline-none focus:ring focus:ring-blue-700 hover:ring-1 ring-1 dark:ring-slate-600 ring-slate-500 dark:hover:ring-blue-600 hover:ring-blue-600 text-xs font-bold h-10 px-4 transition-all duration-300">
                  Manage Contacts
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/**Others  ====================================== */}
        <div className="w-full rounded-xl dark:bg-slate-900 bg-slate-100 overflow-hidden p-4 gap-4 grid grid-cols-1 lg:grid-cols-3">
          {/**Messages Reply Count ====================== */}
          <div className="col-span-1 h-20 flex justify-center items-center">
            <div className="h-14 w-[90%] dark:custom-shadow flex items-center space-x-4 dark:bg-[#1e293b9c] bg-slate-300 rounded-lg p-2">
              <div className="h-10 w-12 dark:bg-[#2564eb7a] bg-[#2564eb54] text-slate-700 dark:text-slate-400 flex justify-center items-center text-2xl rounded-md">
                <BsEnvelope />
              </div>
              <h2 className="dark:text-slate-300 text-slate-700 tracking-wide uppercase text-xs font-sans w-full pr-2 flex justify-between items-center">
                <span>Inbox Replies</span>
                <span>{newReplies.length}</span>
              </h2>
            </div>
          </div>
          {/**Reminders  Count ====================== */}
          <div className="col-span-1 h-20 flex justify-center items-center">
            <div className="h-14 w-[90%] dark:custom-shadow flex items-center space-x-4 dark:bg-[#1e293b9c] bg-slate-300 rounded-lg p-2">
              <div className="h-10 w-12 dark:bg-[#2564eb7a] bg-[#2564eb54] text-slate-700 dark:text-slate-300 flex justify-center items-center text-2xl rounded-md">
                <BsAlarm />
              </div>
              <h2 className="dark:text-slate-300 text-slate-700 tracking-wide uppercase text-xs font-sans w-full pr-2 flex justify-between items-center">
                <span>Pending Reminders</span>
                <span>
                  {todoList.filter((todo) => todo.status === false).length}
                </span>
              </h2>
            </div>
          </div>
          {/**Agents Queue ====================== */}
          <div className="w-full h-20 col-span-1 flex justify-center py-4">
            <div className="h-full w-full flex flex-col justify-between space-y-2">
              <div className="space-x-2 items-center h-full w-full grid grid-cols-3 px-2 capitalize">
                <div className="col-span-1 h-full border-r dark:border-slate-800 border-slate-300 pr-6 flex flex-col justify-center items-center">
                  <p className="dark:text-slate-300 text-slate-700 text-lg font-bold">
                    {
                      allMembers.filter((user) => user.status === "available")
                        .length
                    }
                  </p>
                  <p className="dark:text-slate-500 text-slate-600 text-xs font-semibold">
                    available
                  </p>
                </div>
                <div className="col-span-1 h-full border-r dark:border-slate-800 border-slate-300 pr-6 flex flex-col justify-center items-center">
                  <p className="dark:text-slate-300 text-slate-700  text-lg font-bold">
                    {allMembers.filter((user) => user.status === "busy").length}
                  </p>
                  <p className="dark:text-slate-500 text-slate-600 text-xs font-semibold">
                    Busy
                  </p>
                </div>
                <div className="col-span-1 h-full pr-6 flex flex-col justify-center items-center">
                  <p className="dark:text-slate-300 text-slate-700  text-lg font-bold">
                    {
                      allMembers.filter((user) => user.status === "unavailable")
                        .length
                    }
                  </p>
                  <p className="dark:text-slate-500 text-slate-600 text-xs font-semibold">
                    Unavailable
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/**Bottom Half ================================ */}
        <section className="row-span-3 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/**Todo List ================================ */}
          <ToDo />
          {/**Monthly Summary ================================ */}
          <section className="col-span-1 h-[26rem] hidden lg:grid grid-rows-5 dark:bg-slate-900 bg-slate-100 rounded-xl px-2">
            <div className="row-span-2 bg-no-repeat bg-center bg-contain border-b dark:border-slate-700 border-slate-400 flex flex-col justify-center items-center px-4">
              <h2 className="dark:text-slate-300 text-slate-900 text-2xl font-bold capitalize">
                Monthly Summary
              </h2>
              <p className="dark:text-slate-400 text-slate-700 text-center text-sm">
                To see more analytics please visit the reports page and you can
                also check the current progress or your tickets in tickets page.
              </p>
            </div>
            <div className="row-span-3 space-y-2 px-4 p-2">
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl  dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-600 flex justify-center items-center text-2xl">
                    <BsCheckAll />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-600 text-sm font-bold">
                    Solved
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-600 text-xl font-semibold flex items-center">
                  {
                    filteredTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "solved"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl  dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-600 flex justify-center items-center text-xl">
                    <BsArrowRepeat />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-600 text-sm font-bold">
                    Re-Opened
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-600 text-xl font-semibold flex items-center">
                  {
                    filteredTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "reopened"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl  dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-600 flex justify-center items-center text-xl">
                    <BsDashCircleDotted />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-600 text-sm font-bold">
                    On-Hold
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-600 text-xl font-semibold flex items-center">
                  {
                    filteredTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "on hold"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-600 flex justify-center items-center text-xl">
                    <BsEnvelopeOpen />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-600 text-sm font-bold">
                    Open
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-600 text-xl font-semibold flex items-center">
                  {
                    filteredTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "open"
                    ).length
                  }
                </h5>
              </div>
            </div>
          </section>
          {/**Online Users ================================ */}
          <section className="col-span-1 h-[26rem] dark:bg-slate-900 bg-slate-100 rounded-xl flex flex-col place-items-center p-4 overflow-hidden">
            {allMembers.length >= 1 && (
              <div className="w-full h-full overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap space-y-2">
                <h2 className="w-full h-6 text-xs sticky top-0 z-[99] dark:bg-slate-900 bg-slate-100 flex items-center space-x-4 font-semibold uppercase dark:text-slate-300 text-slate-700 px-3">
                  <span className="w-10"></span>
                  <span className="w-40">User-Name</span>
                  <span>Status</span>
                </h2>
                {users}
              </div>
            )}
            {!allMembers.length >= 1 && (
              <div className="h-full w-full">
                <div className="h-full w-full rounded-lg dark:bg-slate-900 bg-slate-100 border dark:border-slate-800 border-slate-300 p-6">
                  <h2 className="dark:text-slate-400 text-slate-600 tracking-wide text-center uppercase text-xs font-sans font-bold">
                    add your team members
                  </h2>
                  <img
                    src={noUsers}
                    alt="no-users"
                    className="object-center object-fit w-full h-full"
                  />
                </div>
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Main;
