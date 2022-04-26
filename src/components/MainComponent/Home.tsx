import { FC, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfile from "./../../default.webp";
import noUsers from "./images/no-userss.svg";
import { BsEnvelope, BsAlarm, BsArrowRight } from "react-icons/bs";
import MostRecent from "./MostRecent";
import StatusSummary from "./StatusSummary";
import { RootState } from "../../Redux/store";

const Home: FC = () => {
  const location = useLocation();
  const todoList = useSelector((state: RootState) => state.UserInfo.toDo);
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const unread = useSelector((state: RootState) => state.Tickets.unread);
  let filteredTickets = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );

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

  const categoriesData = useMemo(() => {
    return (
      categories.length >= 1 &&
      categories
        .map((element) => {
          return {
            name: element,
            value: (
              (filteredTickets?.filter(
                (ticket) =>
                  ticket?.category?.toLowerCase() === element?.toLowerCase()
              ).length /
                filteredTickets.length) *
              100
            ).toFixed(1),
          };
        })
        .splice(0, 5)
        .sort((a: any, b: any) => b.value - a.value)
    );
  }, [categories, filteredTickets]);

  const categoryPreloader =
    !categoriesData &&
    [1, 2, 3, 4, 5].map((index) => {
      return (
        <div key={index} className="w-full">
          <small className="text-slate-700 uppercase font-medium dark:text-slate-400 text-[0.6rem]">
            No Data
          </small>
          <div className="w-full flex items-center justify-between">
            <div
              role="progressbar"
              aria-label="progressbas"
              className="h-2 w-full flex-[3] rounded-full animate-pulse bg-slate-400 dark:bg-slate-700 overflow-hidden"
            ></div>
            <div className="flex-[1] flex justify-end text-slate-700 dark:text-slate-400 font-semibold text-xs">
              <span>0.0%</span>
            </div>
          </div>
        </div>
      );
    });

  //Loop Through All Users ================
  const users =
    allMembers.length >= 1 &&
    allMembers.map((user) => {
      return (
        <div
          key={user.id}
          className="w-full snap_child h-13 rounded-md dark:bg-slate-800 bg-white flex items-center space-x-4 p-2 border dark:border-slate-700 border-slate-200"
        >
          <div
            className={`h-10 w-10 flex justify-center items-center rounded relative`}
          >
            <img
              src={
                user.photoUrl !== null && user.photoUrl !== ""
                  ? user.photoUrl
                  : defaultProfile
              }
              alt="profile"
              className={`object-cover w-full h-full object-center rounded`}
            />
            <div
              className={`absolute right-[-0.25rem] top-[-0.1rem] h-2.5 w-2.5 rounded-full border-2 dark:border-slate-800 border-slate-50 ${
                user.status === "available"
                  ? "bg-green-600"
                  : user.status === "unavailable"
                  ? "bg-red-600"
                  : "bg-yellow-600"
              }`}
            ></div>
          </div>
          <div className="text-xs whitespace-nowrap overflow-hidden text-ellipsis font-bold capitalize dark:text-slate-300 text-slate-800 tracking-wider">
            <abbr title={user.name}>
              <p>{user.name}</p>
            </abbr>
            <abbr title={user.email}>
              <p className="text-[0.7rem] font-medium tracking-normal dark:text-slate-400 text-slate-600 lowercase">
                {user.email}
              </p>
            </abbr>
          </div>
        </div>
      );
    });

  //Component ========================
  return (
    <div
      className={`${
        location.pathname === "/app" ? "grid" : "hidden"
      } dark:bg-transparent bg-transparent w-[95%] 2xl:w-[75rem] min-h-screen mt-4 select-text`}
    >
      <div className="grid gap-4 place-content-center pb-4 h-fit tracking-wide">
        <section className="row-span-3 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/**Top 5 Categories  ========================= */}
          <div className="col-span-1 h-[20rem] flex flex-col justify-between dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded-md overflow-hidden p-4 py-6">
            <div className="w-full">
              <h1 className="dark:text-slate-300 text-slate-900 text-xs text-center font-bold dark:font-semibold uppercase">
                Top 5 Categories
              </h1>
              <p className="text-center text-xs font-medium tracking-normal text-slate-700 dark:text-slate-400 mt-2">
                Actual figures can be found on the reports page.
              </p>
            </div>
            <div className="flex flex-col mt-2 w-full justify-center gap-1 overflow-hidden rounded-lg px-4">
              {categoriesData &&
                categoriesData?.map((element: any, index) => {
                  return (
                    <div key={index} className="w-full">
                      <small className="text-slate-800 dark:text-slate-400 text-[0.6rem] font-medium uppercase">
                        {element.name}
                      </small>
                      <div className="w-full flex items-center justify-between">
                        <div
                          role="progressbar"
                          aria-label="progressbas"
                          className="h-2 w-full flex-[3] rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden"
                        >
                          <div
                            style={{
                              width: `${
                                Number(element.value)
                                  ? parseFloat(element.value).toFixed(1)
                                  : "0.0"
                              }%`,
                            }}
                            className="h-full bg-blue-700 text.[0.15rem] border-r dark:border-slate-800 border-slate-400 text-slate-300 relative hover:opacity-80 rounded-full"
                          >
                            <abbr
                              title={`${element.name} : ${
                                Number(element.value)
                                  ? parseFloat(element.value).toFixed(0)
                                  : 0.0
                              }%`}
                            >
                              <div className="w-full h-full"></div>
                            </abbr>
                          </div>
                        </div>
                        <div className="flex-[1] flex justify-end text-slate-700 dark:text-slate-400 font-semibold text-xs">
                          <span>
                            {element.value >= 0.1 ? element.value : "0.0"}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {/**Preloader ============= */}
              {categoryPreloader}
            </div>
          </div>
          {/**Todo List ================================ */}
          {/* <ToDo />*/}
          {/**Tickets Per Status Summary ================================ */}
          <div className="col-span-1 h-[20rem] grid grid-rows-5 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded-md px-4 pb-4">
            <div className="row-span-2 bg-no-repeat bg-center bg-contain flex flex-col justify-center items-center px-4">
              <h1 className="dark:text-slate-300 text-slate-900 text-xs text-center font-bold dark:font-semibold uppercase mt-1">
                Tickets Per Status
              </h1>
              <p className="dark:text-slate-400 text-slate-700 text-center text-xs font-medium tracking-normal mt-2 px-2">
                Hover your mouse on top of each slice below to see the
                percentages, for more analytics please visit the reports page.
              </p>
            </div>
            <StatusSummary />
          </div>
          {/**MostRecent ================================= */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 h-[20rem] dark:bg-slate-800 bg-white  border dark:border-slate-800 border-slate-300 rounded-md p-4 pt-3 pb-4 flex flex-col justify-between items-center">
            <article className="text-center">
              <h1 className="dark:text-slate-300 text-slate-900 text-xs text-center font-bold dark:font-semibold uppercase mt-3">
                Recent Activities
              </h1>
              <p className="text-xs font-medium tracking-normal dark:text-slate-400 text-slate-700 mt-2">
                Your most recent activities.
              </p>
            </article>
            <MostRecent />
          </div>
        </section>

        {/**Others  ====================================== */}
        <div className="w-full rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 overflow-hidden pt-4 lg:pt-0 gap-4 grid grid-cols-1 lg:grid-cols-3">
          {/**Messages Reply Count ====================== */}
          <div className="col-span-1 flex justify-center items-center">
            <div className="h-12 w-[90%] dark:custom-shadow flex items-center space-x-4 dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-200 rounded-md p-2">
              <div className="h-8 w-10 bg-slate-700 text-slate-100 dark:text-slate-300 flex justify-center items-center text-xl rounded">
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
            <div className="h-12 w-[90%] dark:custom-shadow flex items-center space-x-4 dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-200 rounded p-2">
              <div className="h-8 w-10 bg-slate-700 text-slate-100 dark:text-slate-300 flex justify-center items-center text-xl rounded">
                <BsAlarm />
              </div>
              <h2 className="dark:text-slate-300 text-slate-700 uppercase text-xs font-sans font-semibold w-full pr-2 flex justify-between items-center">
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
                <div className="col-span-1 h-full border-r dark:border-slate-700 border-slate-200 pr-6 flex flex-col justify-center items-center">
                  <p className="dark:text-slate-300 text-slate-700 text-sm font-bold">
                    {
                      allMembers
                        .filter((user) => user.access === "agent")
                        .filter((user) => user.status === "available").length
                    }
                  </p>
                  <p className="text-slate-500 text-xs font-semibold">
                    available
                  </p>
                </div>
                <div className="col-span-1 h-full border-r dark:border-slate-700 border-slate-200 pr-6 flex flex-col justify-center items-center">
                  <p className="dark:text-slate-300 text-slate-700  text-sm font-bold">
                    {
                      allMembers
                        .filter((user) => user.access === "agent")
                        .filter((user) => user.status === "busy").length
                    }
                  </p>
                  <p className="text-slate-500 text-xs font-semibold">Busy</p>
                </div>
                <div className="col-span-1 h-full pr-6 flex flex-col justify-center items-center">
                  <p className="dark:text-slate-300 text-slate-700  text-sm font-bold">
                    {
                      allMembers
                        .filter((user) => user.access === "agent")
                        .filter((user) => user.status === "unavailable").length
                    }
                  </p>
                  <p className="text-slate-500 text-xs font-semibold">
                    Unavailable
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/**Bottom Half ================================ */}
        <section className="row-span-2 w-full h-fit lg:h-[16rem] rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center space-y-4 lg:space-y-0 lg:gap-4">
          <div className="col-span-2 w-full rounded-md grid grid-cols-2 md:grid-cols-7 gap-4">
            {/**Quick Settings ==================================== */}
            <div className="col-span-5 h-[16rem] rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-2 overflow-hidden relative">
              <div className="rounded w-full h-full p-2 flex-col flex justify-between gap-4">
                <h3 className="flex-[1] dark:text-slate-300 text-slate-900 text-lg font-medium font-sans capitalize">
                  Quick Settings
                </h3>
                <div className="w-full rounded border border-slate-200 dark:border-slate-700 flex-[5]"></div>
              </div>
            </div>

            {/**Progress ============================== */}
            <article className="col-span-5 md:col-span-2 min-h-[8rem] h-full rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-4 flex flex-col space-y-5">
              <h3 className="dark:text-slate-300 text-slate-900 text-lg font-medium font-sans capitalize">
                Progress
              </h3>
              <p className="text-xs font-medium tracking-normal dark:text-slate-400 text-slate-700">
                You managed to get{" "}
                <span className="text-slate-900 dark:text-slate-300 font-semibold">
                  {" "}
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
                        data?.status?.toLowerCase() === "solved"
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
                      )?.length) *
                    100
                  )?.toFixed(1) || 0}
                  %
                </span>{" "}
                of your tickets resolved.
                <br /> Currently you have{" "}
                <span className="text-slate-900 dark:text-slate-300 font-semibold">
                  {" "}
                  {(filteredTickets.length >= 1 &&
                    filteredTickets.filter((ticket) => ticket.status === "open")
                      ?.length) ||
                    0}
                </span>{" "}
                open tickets, and{" "}
                <span className="text-slate-900 dark:text-slate-300 font-semibold">
                  {overDue.length}
                </span>{" "}
                overdue tickets.
              </p>
              <div
                role="progressbar"
                aria-label="progressbas"
                className="w-full h-2 rounded-full overflow-hidden dark:bg-slate-700 bg-slate-300"
              >
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
                          data?.status?.toLowerCase() === "solved"
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
          <div className="col-span-2 lg:col-span-1 h-[16rem] w-full rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-2">
            <div className="h-full w-full dark:bg-slate-800 bg-white rounded-md flex flex-col place-items-center p-4 py-2 overflow-hidden">
              {allMembers.length >= 1 &&
                (user[0]?.access && user[0]?.access) !== "client" && (
                  <div className="w-full h-full overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap space-y-2">
                    <h3 className="sticky top-0 z-[99] dark:text-slate-300 text-slate-900 text-lg font-semibold font-sans tracking-wide capitalize dark:bg-slate-800 bg-white h-6 flex justify-between items-center">
                      <span className="text-base font-medium font-sans tracking-wide capitalize">
                        Members
                      </span>
                      <span className="text-base font-medium font-sans tracking-wide capitalize">
                        {allMembers.length}
                      </span>
                    </h3>
                    {users}
                  </div>
                )}
              {(allMembers.length <= 0 ||
                (user[0]?.access && user[0]?.access) === "client") && (
                <div className="h-full w-full">
                  <div className="h-full w-full rounded-lg dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 p-6 space-y-4">
                    <h2 className="dark:text-slate-400 text-slate-600 tracking-wide text-center uppercase text-xs font-sans font-bold">
                      add your team members
                    </h2>
                    <img
                      src={noUsers}
                      alt="no-users"
                      className="object-center object-fit w-full h-[90%]"
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

export default Home;
