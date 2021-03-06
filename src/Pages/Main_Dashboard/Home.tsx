import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfile from "../../Assets/logos/faviLight.png";
import MostRecent from "./MostRecent";
import { RootState } from "../../Redux/store";
import ProgressBars from "./ProgressBars";
import BottomSection from "./BottomSection";
import { Link } from "react-router-dom";
import PieCharts from "./PieChart";
import MonthlyTraffic from "./MonthlyTraffic";

const Home: FC = () => {
  const location = useLocation();
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const dashboardData = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );

  //Monthly Data =================
  const monthlyData = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ].map((day: any) => ({
    name: day,
    value: dashboardData.filter(
      (ticket: any) => new Date(ticket?.date).getDate() === day
    )?.length,
  }));

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
      <div className="w-full flex h-full overflow-x-hidden overflow-y-scroll pb-4 no-scrollbar no-scrollbar::-webkit-scrollbar">
        <div className="flex flex-col space-y-4 min-h-[58rem] tracking-wide">
          <section className="row-span-1 rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
            {/**Top 5 Categories  ========================= */}
            <ProgressBars />
            {/**Todo List ================================ */}
            {/* <ToDo />*/}
            {/**Tickets Per Status Summary ================================ */}
            <div className="col-span-1  h-[24rem] dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded px-4 py-4 pt-8">
              <div className="bg-no-repeat bg-center bg-contain flex flex-col items-center px-4">
                <div className="dark:text-slate-300 tracking-wider text-slate-800 text-base text-center font-bold uppercase font-sans">
                  Tickets Status
                </div>
              </div>
              <div className="mt-9 h-[16rem] relative">
                <PieCharts />
              </div>
            </div>
            {/**MostRecent ================================= */}
            <div className="col-span-1 h-[24rem] md:col-span-2 lg:col-span-1 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded p-4 pt-3 pb-4 flex flex-col justify-between items-center overflow-hidden">
              <div className="text-center">
                <div className="dark:text-slate-300 text-slate-800 text-base text-center tracking-wider font-bold uppercase mt-5 font-sans">
                  Recent Activities
                </div>
              </div>
              <MostRecent />
            </div>
          </section>

          {/**Middle Half ================================ */}
          <section className="w-full h-fit rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-4 lg:space-y-0 lg:gap-4">
            {/***Monthly Traffic ========================================= */}
            <div className="col-span-2 min-h-[21rem] rounded dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-4 overflow-hidden flex flex-col justify-between space-y-2 relative">
              <div className="mt-2 h-6 dark:text-slate-300 text-slate-800 text-lg font-semibold font-sans capitalize tracking-wider">
                Monthly Traffic
              </div>
              <p className="text-sm font-sans font-medium tracking-normal dark:text-slate-400 text-slate-700 mt-2">
                Hover your mouse or cursor on top of each bar to see details.
              </p>
              <div className="w-full h-[calc(100%-5rem)] overflow-hidden bg-inherit relative">
                <MonthlyTraffic monthlyData={monthlyData} />
              </div>
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
                    <div className="h-full w-full rounded-sm dark:bg-slate-750 bg-slate-100 border dark:border-slate-700 border-slate-300 p-6 pt-4 flex flex-col items-center justify-center space-y-6">
                      <h2 className="dark:text-slate-300 text-slate-700 tracking-wide text-center text-lg font-sans font-bold">
                        Create a team
                      </h2>
                      <p className="text-sm text-center font-sans dark:text-slate-100 text-slate-700 italic">
                        Click the button below to add all your teammates and
                        users or clients.
                      </p>
                      <Link to="/app/settings/team">
                        <button className="h-8 px-6 bg-blue-700 rounded-sm outline-none focus:outline-none text-slate-50 font=sans text-sm tracking-wider hover:opacity-80 transition-all duration-150">
                          Get started
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/**Bottom Half ================================ */}
          <BottomSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
