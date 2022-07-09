import { FC, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfile from "../../Assets/logos/faviLight.png";
import noUsers from "./images/no-userss.svg";
import { BsArrowRight } from "react-icons/bs";
import MostRecent from "./MostRecent";
import StatusSummary from "./StatusSummary";
import { RootState } from "../../Redux/store";
import ProgressBars from "./ProgressBars";
import BottomSection from "./BottomSection";
import RadialBar from "./RadialBar";

const Home: FC = () => {
  const location = useLocation();
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const dashboardData = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );

  const overDue = useMemo(() => {
    return (
      dashboardData &&
      dashboardData.filter(
        (firstMsg) =>
          new Date(firstMsg.due_date !== null && firstMsg.due_date).getTime() <=
            new Date().getTime() && firstMsg.status === "open"
      )
    );
  }, [dashboardData]);

  //Monthly Data =================
  const monthlyData = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ].map((day: any) => ({
    day: day,
    data: dashboardData.filter(
      (ticket: any) => new Date(ticket?.date).getDate() === day
    )?.length,
  }));
  const maxValue = Math.max(...monthlyData?.map((day) => day?.data));

  //Loop Through All Users ================
  const users =
    allMembers.length >= 1 &&
    allMembers
      ?.filter((user: any) => user.access?.toLowerCase() === "agent")
      ?.map((user: any) => {
        return (
          <div
            key={user.id}
            className="w-full snap_child h-14  bg-inherit flex items-center space-x-4 p-2 border-b dark:border-slate-700 border-slate-200 overflow-hidden"
          >
            <div
              className={`h-10 w-10  bg-slate-700 dark:bg-slate-50 flex justify-center items-center rounded-full relative`}
            >
              <img
                src={
                  user.photoUrl !== null && user.photoUrl !== ""
                    ? user.photoUrl
                    : defaultProfile
                }
                alt="profile"
                className={`object-cover w-9 h-9 object-center rounded-full`}
              />
            </div>
            <div className="text-xs whitespace-nowrap overflow-hidden text-ellipsis font-semibold dark:font-medium capitalize dark:text-slate-300 text-slate-800 tracking-wider">
              <abbr title={user.name}>
                <p className="tracking-wide font-sans">{user.name}</p>
              </abbr>
              <abbr title={user.email}>
                <div className="text-xs font-medium dark:text-slate-400 text-slate-700 capitalize tracking-wider font-sans flex items-center space-x-1">
                  <div
                    className={`h-3 w-3 rounded-full border-2 dark:border-slate-800 border-white font-sans ${
                      user.status === "available"
                        ? "bg-green-600"
                        : user.status === "unavailable"
                        ? "bg-red-600"
                        : "bg-yellow-500"
                    }`}
                  ></div>{" "}
                  <span>
                    {user.status === "available"
                      ? "Available"
                      : user.status === "unavailable"
                      ? "away"
                      : "Busy"}
                  </span>
                </div>
              </abbr>
            </div>
          </div>
        );
      });

  //Component ========================
  return (
    <div
      className={`min-h-[calc(100%-3.65rem)] dark:bg-transparent bg-transparent w-full select-text p-4 pb-0 ${
        location.pathname === "/app" ? "grid" : "hidden"
      }`}
    >
      <div className="grid-cols-3 3xl:grid-cols-4 grid gap-4 h-full overflow-x-hidden overflow-y-scroll pb-4 no-scrollbar no-scrollbar::-webkit-scrollbar">
        <div className="col-span-3 flex flex-col space-y-4 min-h-[58rem] tracking-wide">
          <section className="row-span-1 rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
            {/**Top 5 Categories  ========================= */}
            <ProgressBars />
            {/**Todo List ================================ */}
            {/* <ToDo />*/}
            {/**Tickets Per Status Summary ================================ */}
            <div className="col-span-1  h-[23rem] grid grid-rows-5 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded px-4 pb-4 py-6">
              <div className="row-span-2 bg-no-repeat bg-center bg-contain flex flex-col items-center px-4">
                <div className="dark:text-slate-300 tracking-wider text-slate-800 text-base text-center font-bold uppercase font-sans">
                  Tickets Status
                </div>
                <p className="dark:text-slate-400 text-slate-700 text-center text-sm font-medium tracking-normal mt-2 px-2 font-sans">
                  Hover your mouse on top of each slice below to see the
                  percentages, for more analytics please visit the reports page.
                </p>
              </div>
              <StatusSummary />
            </div>
            {/**MostRecent ================================= */}
            <div className="col-span-1 h-[23rem] md:col-span-2 lg:col-span-1 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded p-4 pt-3 pb-4 flex flex-col justify-between items-center overflow-hidden">
              <div className="text-center">
                <div className="dark:text-slate-300 text-slate-800 text-base text-center tracking-wider font-bold uppercase mt-3 font-sans">
                  Recent Activities
                </div>
                <p className="text-sm font-medium tracking-normal dark:text-slate-400 text-slate-700 mt-2 font-sans">
                  Your most recent activities.
                </p>
              </div>
              <MostRecent />
            </div>
          </section>

          {/**Middle Half ================================ */}
          <section className="w-full h-fit rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-4 lg:space-y-0 lg:gap-4">
            <div className="col-span-2 w-full h-fit rounded grid grid-cols-2 2xl:grid-cols-7 gap-4">
              {/***Monthly Trend ========================================= */}
              <div className="col-span-5 min-h-[21rem] rounded dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-4 overflow-hidden flex flex-col justify-between space-y-2 relative">
                <div className="mt-2 h-6 dark:text-slate-300 text-slate-800 text-lg font-semibold font-sans capitalize tracking-wider">
                  Monthly Trend
                </div>
                <p className="text-xs font-medium tracking-normal dark:text-slate-400 text-slate-700 mt-2 font-sans">
                  Hover your mouse or cursor on top of each bar to see details.
                </p>
                <div className="w-full h-[calc(100%-4rem)] overflow-hidden bg-inherit rounded flex justify-between items-end pr-2 relative">
                  {monthlyData?.map((day) => {
                    return (
                      <div
                        key={day?.day}
                        className="h-full w-3 grid grid-rows-6 p-2 overflow group"
                      >
                        <div className="row-span-5 w-3 h-full rounded-sm bg-slate-200 dark:bg-slate-700 flex items-end relative pt-2">
                          <div
                            style={{
                              height: `${(
                                (Number(day?.data) / Number(maxValue)) *
                                100
                              ).toFixed(2)}%`,
                            }}
                            className="w-full rounded-sm bg-blue-700 hover:opacity-80 transition-all duration-150 overflow-hidden"
                          ></div>
                          {/**Tooltip=  */}
                          <div className="hidden group-hover:flex justify-center items-center absolute top-[10%] left-1 h-6 min-w-[5rem] w-fit whitespace-nowrap overflow-hidden overflow-ellipsis shadow-2xl z-[999]  rounded-sm bg-slate-800 text-slate-100 text-xs px-2">
                            Day {day?.day} - {day?.data} tickets
                          </div>
                          {/**Tooltip=  */}
                        </div>
                        <div
                          className={`row-span-1 w-3 flex justify-center items-end text-xs capitalize  dark:text-slate-300 text-slate-800 font-semibold font-sans ${
                            Number(day.day) % 2 === 0 ? "opacity-0" : ""
                          }`}
                        >
                          {day?.day}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/**Progress ============================== */}
              <article className="col-span-5 md:hidden 2xl:flex 2xl:col-span-2 h-[21rem] rounded dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-4 pt-6 flex flex-col space-y-2">
                <div className="dark:text-slate-300 text-slate-800 text-lg font-semibold font-sans capitalize tracking-wider">
                  Progress
                </div>
                <p className="text-xs font-medium tracking-normal dark:text-slate-400 text-slate-700 font-sans">
                  Manage all tickets in one place
                  <br /> currently you have{" "}
                  <span className="text-slate-900 dark:text-slate-300 font-semibold">
                    {" "}
                    {(dashboardData.length >= 1 &&
                      dashboardData.filter((ticket) => ticket.status === "open")
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
                  className={`w-full h-[6.5rem] overflow-hidden flex justify-center items-center mb-4 relative`}
                >
                  <RadialBar />
                </div>
                <Link
                  to="/app/tickets"
                  className="text-blue-600 text-sm font-medium font-sans flex md:hidden xl:flex items-center justify-center space-x-2"
                >
                  <span>View all Your Tickets</span>
                  <BsArrowRight />
                </Link>
              </article>
            </div>

            {/**Online Users ================================ */}
            <div className="col-span-2 lg:col-span-1 h-[21rem] w-full rounded dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-2">
              <div className="h-full w-full dark:bg-slate-800 bg-white rounded-md flex flex-col place-items-center p-2 overflow-hidden">
                {allMembers?.filter(
                  (user) => user.access?.toLowerCase() === "agent"
                ).length >= 1 && (
                  <div className="w-full h-full overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap space-y-2">
                    <div className="sticky top-0 z-[99] text-lg font-semibold font-sans tracking-wide capitalize dark:bg-slate-800 bg-white h-12 flex justify-between items-center gap-2 border-b border-slate-300 dark:border-slate-700 pb-2 mb-1">
                      <div className="flex-[2] dark:text-slate-300 text-slate-800 text-lg font-semibold font-sans capitalize tracking-wider">
                        Agents
                      </div>
                      <div className="flex-[3] gap-1 items-center h-full w-full grid grid-cols-3 capitalize dark:text-slate-300 text-slate-900">
                        <div className="col-span-1 flex justify-center items-center space-x-2 relative">
                          <p className="dark:text-slate-300 text-slate-900 text-sm font-bold dark:font-medium">
                            {
                              allMembers.filter(
                                (user) =>
                                  user.access?.toLowerCase() === "agent" &&
                                  user.status === "available"
                              ).length
                            }
                          </p>
                          <div className="h-2 w-2 rounded-sm bg-green-600"></div>
                        </div>
                        <div className="col-span-1 flex justify-center items-center space-x-2 relative">
                          <p className="dark:text-slate-300 text-slate-900  text-sm font-bold dark:font-medium">
                            {
                              allMembers.filter(
                                (user) =>
                                  user.access?.toLowerCase() === "agent" &&
                                  user.status === "busy"
                              ).length
                            }
                          </p>
                          <div className="h-2 w-2 rounded-sm bg-yellow-500"></div>
                        </div>
                        <div className="col-span-1 flex justify-center items-center space-x-2 relative">
                          <p className="dark:text-slate-300 text-slate-900  text-sm font-bold dark:font-medium">
                            {
                              allMembers.filter(
                                (user) =>
                                  user.access?.toLowerCase() === "agent" &&
                                  user.status === "unavailable"
                              ).length
                            }
                          </p>
                          <div className="h-2 w-2 rounded-sm bg-red-600"></div>
                        </div>
                      </div>
                    </div>
                    {users}
                  </div>
                )}

                {/**Placeholders ||Preloader ====================== */}
                {allMembers?.filter(
                  (user) => user.access?.toLowerCase() === "agent"
                ).length <= 0 && (
                  <div className="h-full w-full">
                    <div className="h-full w-full rounded-sm dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 p-6 space-y-4">
                      <h2 className="dark:text-slate-400 text-slate-700 tracking-wide text-center uppercase text-xs font-sans font-bold">
                        add your team members
                      </h2>
                      <img
                        src={noUsers}
                        alt="no-users"
                        className="object-center object-fit w-full h-[70%]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/**Bottom Half ================================ */}
          <BottomSection />
        </div>

        {/***What's new ==================== */}
        <div className="col-span-1 bg-white dark:bg-slate-800 rounded"></div>
      </div>
    </div>
  );
};

export default Home;
