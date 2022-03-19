import React, { useMemo } from "react";
import { getAuth } from "firebase/auth";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import noUsers from "./images/no-userss.svg";
import { BsEnvelope, BsAlarm, BsStopFill, BsArrowRight } from "react-icons/bs";
import Calendar from "./Calendar";
import SummaryPie from "./SummaryPie";

const Main = () => {
  const location = useLocation();
  const todoList = useSelector((state) => state.UserInfo.toDo);
  const allMembers = useSelector((state) => state.UserInfo.allMembers);
  const user = useSelector((state) => state.UserInfo.member_details);
  const unread = useSelector((state) => state.Tickets.unread);
  let filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const overDue = useMemo(() => {
    return (
      filteredTickets &&
      filteredTickets.filter(
        (firstMsg) =>
          new Date(firstMsg.due_date !== null && firstMsg.due_date).getTime() <=
            new Date().getTime() && firstMsg.status === "open"
      )
    );
  }, [filteredTickets]);

  //Loop Through All Users ================
  const users =
    allMembers.length >= 1 &&
    allMembers
      .filter((user) => user.access === "agent")
      .map((user) => {
        return (
          <div
            key={user.id}
            className="w-full snap_child h-13 rounded-lg dark:bg-[#1e293b18] bg-[#e2e8f059] flex items-center space-x-4 p-2 border dark:border-slate-800 border-slate-400"
          >
            <div className="h-10 w-10 rounded-xl border-2 p-[2px] dark:border-slate-500 border-slate-400 relative overflow-hidden">
              <img
                src={
                  user.photoUrl !== null && user.photoUrl !== ""
                    ? user.photoUrl
                    : "https://firebasestorage.googleapis.com/v0/b/dial-n-dine-help-desk.appspot.com/o/no-profile.jpg?alt=media&token=82e21d0b-4af2-40d3-9f69-5ff676aa36d5"
                }
                alt="profile"
                className="object-cover w-full h-full object-center rounded-lg"
              />
            </div>
            <h3 className="text-xs whitespace-nowrap overflow-hidden text-ellipsis font-semibold capitalize dark:text-slate-400 text-slate-800 w-36">
              <abbr title={user.name}>{user.name}</abbr>
            </h3>
            <h3
              className={`text-[0.68rem] flex items-center space-x-1 ${
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
      } dark:bg-transparent bg-transparent w-[90%] md:w-full container 2xl:w-[72rem] mt-4 overflow-hidden select-text`}
    >
      <div className="grid gap-4 place-content-center pb-4 h-fit">
        <section className="row-span-3 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/**User Details  ============== */}
          <div className="col-span-1 h-[20rem] dark:bg-slate-900 bg-slate-100 rounded-xl overflow-hidden p-4">
            <div className="flex flex-col h-full w-full justify-center space-y-6 items-center overflow-hidden dark:bg-[#1e293b18] bg-[#e2e8f059] border dark:border-slate-800 border-slate-300  rounded-lg">
              <div className="w-24 h-24 rounded-full overflow-hidden p-[2px] border-2 dark:border-slate-400 border-slate-800">
                <img
                  src={
                    getAuth().currentUser &&
                    getAuth().currentUser.photoURL !== null &&
                    getAuth().currentUser &&
                    getAuth().currentUser.photoURL !== ""
                      ? getAuth().currentUser && getAuth().currentUser.photoURL
                      : "https://firebasestorage.googleapis.com/v0/b/dial-n-dine-help-desk.appspot.com/o/no-profile.jpg?alt=media&token=82e21d0b-4af2-40d3-9f69-5ff676aa36d5"
                  }
                  alt="avatar"
                  className="w-full h-full rounded-full object-fit object-cover object-center"
                />
              </div>
              <article className="text-lg font-bold dark:text-slate-300 text-slate-900 capitalize text-center px-8 leading-5">
                <h2>Welcome back, {user[0].name.split(" ")[0]}.</h2>
                <q className="text-xs dark:text-slate-400 text-slate-700">
                  Remeber Our greatest asset is the customer! Treat each
                  customer as if they are the only one!
                </q>
              </article>
            </div>
          </div>
          {/**Todo List ================================ */}
          {/* <ToDo />*/}
          {/**Monthly Summary ================================ */}
          <div className="col-span-1 h-[20rem] grid grid-rows-5 dark:bg-slate-900 bg-slate-100 rounded-xl px-4">
            <div className="row-span-2 bg-no-repeat bg-center bg-contain border-b dark:border-slate-700 border-slate-400 flex flex-col justify-center items-center px-4 space-y-4">
              <h2 className="dark:text-slate-300 text-slate-900 text-lg font-bold capitalize">
                Monthly Summary
              </h2>
              <p className="dark:text-slate-400 text-slate-700 text-center text-sm">
                You have{" "}
                <span className="dark:text-slate-300 text-slate800 font-semibold">
                  {
                    filteredTickets.filter(
                      (data) =>
                        new Date(data.date).getTime() >=
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            1
                          ).getTime() &&
                        new Date(data.date).getTime() <=
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            30
                          ).getTime()
                    ).length
                  }
                </span>{" "}
                tickets in total, to see more analytics please visit the reports
                page. Make use of filters to get more insight.
              </p>
            </div>
            <div className="row-span-3 space-y-2 px-4 p-2">
              <SummaryPie />
            </div>
          </div>
          {/**Calendar ================================= */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 h-[20rem] dark:bg-slate-900 bg-slate-100 rounded-xl p-4 pt-3 pb-4 flex flex-col justify-between items-center">
            <article className="text-center">
              <h2 className="dark:text-slate-300 text-slate-900 text-lg font-bold font-sans capitalize">
                Due Dates
              </h2>
              <p className="text-sm font-medium dark:text-slate-400 text-slate-700">
                Hover on top of each date to see the details.
              </p>
            </article>
            <Calendar />
          </div>
        </section>

        {/**Others  ====================================== */}
        <div className="w-full rounded-xl dark:bg-slate-900 bg-slate-100 overflow-hidden pt-4 lg:pt-0 gap-4 grid grid-cols-1 lg:grid-cols-3">
          {/**Messages Reply Count ====================== */}
          <div className="col-span-1 flex justify-center items-center">
            <div className="h-12 w-[90%] dark:custom-shadow flex items-center space-x-4 dark:bg-[#1e293b18] bg-[#e2e8f059] border dark:border-slate-800 border-slate-300 rounded-lg p-2">
              <div className="h-8 w-10 bg-slate-700 text-slate-100 dark:text-slate-300 flex justify-center items-center text-xl rounded-md">
                <BsEnvelope />
              </div>
              <h2 className="dark:text-slate-300 text-slate-700 tracking-wide uppercase text-xs font-sans font-semibold w-full pr-2 flex justify-between items-center">
                <span>Inbox Replies</span>
                <span>{unread.length}</span>
              </h2>
            </div>
          </div>
          {/**Reminders  Count ====================== */}
          <div className="col-span-1 flex justify-center items-center">
            <div className="h-12 w-[90%] dark:custom-shadow flex items-center space-x-4 dark:bg-[#1e293b18] bg-[#e2e8f059] border dark:border-slate-800 border-slate-300 rounded-lg p-2">
              <div className="h-8 w-10 bg-slate-700 text-slate-100 dark:text-slate-300 flex justify-center items-center text-xl rounded-md">
                <BsAlarm />
              </div>
              <h2 className="dark:text-slate-300 text-slate-700 tracking-wide uppercase text-xs font-sans font-semibold w-full pr-2 flex justify-between items-center">
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
                      allMembers
                        .filter((user) => user.access === "agent")
                        .filter((user) => user.status === "available").length
                    }
                  </p>
                  <p className="dark:text-slate-500 text-slate-600 text-xs font-semibold">
                    available
                  </p>
                </div>
                <div className="col-span-1 h-full border-r dark:border-slate-800 border-slate-300 pr-6 flex flex-col justify-center items-center">
                  <p className="dark:text-slate-300 text-slate-700  text-lg font-bold">
                    {
                      allMembers
                        .filter((user) => user.access === "agent")
                        .filter((user) => user.status === "busy").length
                    }
                  </p>
                  <p className="dark:text-slate-500 text-slate-600 text-xs font-semibold">
                    Busy
                  </p>
                </div>
                <div className="col-span-1 h-full pr-6 flex flex-col justify-center items-center">
                  <p className="dark:text-slate-300 text-slate-700  text-lg font-bold">
                    {
                      allMembers
                        .filter((user) => user.access === "agent")
                        .filter((user) => user.status === "unavailable").length
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
        <section className="row-span-2 w-full h-fit lg:h-[16rem] rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden items-center space-y-4 lg:space-y-0 lg:gap-4">
          <div className="col-span-2 w-full rounded-xl grid grid-cols-2 md:grid-cols-7 gap-4">
            {/**Quotes ==================================== */}
            <div className="col-span-5 h-[16rem] rounded-xl dark:bg-slate-900 bg-slate-100 p-4 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                alt="background"
                className="rounded-xl h-full w-full object-center object-cover"
              />
              <div className="absolute top-4 left-4 right-4 bottom-4 rounded-xl bg-[#0f172ac9]">
                <article className="h-full w-full p-6 flex flex-col justify-between">
                  <h2 className="text-slate-100 text-2xl font-bold">
                    Customer Service Tip
                  </h2>
                  <p className="text-slate-100 text-sm font-medium">
                    Excellence in anything increases your potential in
                    everything. There are few positions for which this applies
                    more than support — clarity in communication is paramount
                    because it affects everything you do. Styling affects
                    communication. Tone affects communication. Common mistakes
                    include using passive-aggressive language (“Actually…”) or
                    confusing customers with slang, colloquialisms, or technical
                    jargon.
                  </p>
                </article>
              </div>
            </div>
            {/**Progress ============================== */}
            <article className="col-span-5 md:col-span-2 min-h-[8rem] h-full rounded-xl dark:bg-slate-900 bg-slate-100 p-4 flex flex-col space-y-5">
              <h3 className="dark:text-slate-300 text-slate-900 text-lg font-bold font-sans capitalize">
                Progress
              </h3>
              <p className="text-xs dark:text-slate-400 text-slate-700">
                You managed to get{" "}
                {(
                  (filteredTickets.filter(
                    (data) =>
                      new Date(data.date).getTime() >=
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          1
                        ).getTime() &&
                      new Date(data.date).getTime() <=
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          30
                        ).getTime() &&
                      data.status.toLowerCase() === "solved"
                  ).length /
                    filteredTickets.filter(
                      (data) =>
                        new Date(data.date).getTime() >=
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            1
                          ).getTime() &&
                        new Date(data.date).getTime() <=
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            30
                          ).getTime()
                    ).length) *
                  100
                ).toFixed(1)}
                % of your tickets resolved.
                <br /> Currently you have{" "}
                {filteredTickets.length >= 1 &&
                  filteredTickets.filter((ticket) => ticket.status === "open")
                    .length}{" "}
                open tickets, and {overDue.length} overdue tickets.
              </p>
              <div className="w-full h-2 rounded-full overflow-hidden dark:bg-slate-700 bg-slate-300">
                <div
                  style={{
                    width: `${(
                      (filteredTickets.filter(
                        (data) =>
                          new Date(data.date).getTime() >=
                            new Date(
                              new Date().getFullYear(),
                              new Date().getMonth(),
                              1
                            ).getTime() &&
                          new Date(data.date).getTime() <=
                            new Date(
                              new Date().getFullYear(),
                              new Date().getMonth(),
                              30
                            ).getTime() &&
                          data.status.toLowerCase() === "solved"
                      ).length /
                        filteredTickets.filter(
                          (data) =>
                            new Date(data.date).getTime() >=
                              new Date(
                                new Date().getFullYear(),
                                new Date().getMonth(),
                                1
                              ).getTime() &&
                            new Date(data.date).getTime() <=
                              new Date(
                                new Date().getFullYear(),
                                new Date().getMonth(),
                                30
                              ).getTime()
                        ).length) *
                      100
                    ).toFixed(1)}%`,
                  }}
                  className="h-full bg-blue-600 rounded-full"
                ></div>
              </div>
              <Link
                to="/app/tickets"
                className="text-blue-600 text-sm font-medium flex items-center space-x-2"
              >
                <span>View all Your Tickets</span>
                <BsArrowRight />
              </Link>
            </article>
          </div>
          {/**Online Users ================================ */}
          <div className="col-span-2 lg:col-span-1 h-[16rem] w-full rounded-xl dark:bg-slate-900 bg-slate-100 p-2">
            <div className="h-full w-full dark:bg-slate-900 bg-slate-100 rounded-xl flex flex-col place-items-center p-4 py-2 overflow-hidden">
              {allMembers.length >= 1 && (
                <div className="w-full h-full overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap space-y-2">
                  <h3 className="dark:text-slate-300 text-slate-900 text-base font-bold font-sans capitalize h-6 flex justify-between items-center">
                    <span>All Agents</span>
                    <span>
                      {
                        allMembers.filter((user) => user.access === "agent")
                          .length
                      }
                    </span>
                  </h3>
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main;
