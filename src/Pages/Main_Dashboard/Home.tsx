import { FC, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfile from "../../Assets/logos/faviLight.png";
import noUsers from "./images/no-userss.svg";
import { BsArrowRight } from "react-icons/bs";
import MostRecent from "./MostRecent";
import StatusSummary from "./StatusSummary";
import { RootState } from "../../Redux/store";
import Connect from "./Connect";
import ConnectModal from "./ConnectModal";
import ProgressBars from "./ProgressBars";
import BottomSection from "./BottomSection";
import RadialBar from "./RadialBar";

const Home: FC = () => {
  const [apiChannelModal, openAPIModal] = useState<boolean>(false);
  const location = useLocation();
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
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

  //Loop Through All Users ================
  const users =
    allMembers.length >= 1 &&
    allMembers
      ?.filter((user) => user.access?.toLowerCase() === "agent")
      ?.map((user) => {
        return (
          <div
            key={user.id}
            className="w-full snap_child h-14  bg-inherit flex items-center space-x-4 p-2 border-b dark:border-slate-700 border-slate-200 overflow-hidden"
          >
            <div
              className={`h-9 w-9 flex justify-center items-center rounded-full relative`}
            >
              <img
                src={
                  user.photoUrl !== null && user.photoUrl !== ""
                    ? user.photoUrl
                    : defaultProfile
                }
                alt="profile"
                className={`object-cover w-full h-full object-center rounded-full border-2 border-slate-500 dark:border-slate-300`}
              />
              <div
                className={`absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 dark:border-slate-800 border-white font-sans ${
                  user.status === "available"
                    ? "bg-green-600"
                    : user.status === "unavailable"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              ></div>
            </div>
            <div className="text-xs whitespace-nowrap overflow-hidden text-ellipsis font-semibold capitalize dark:text-slate-300 text-slate-800 tracking-wider">
              <abbr title={user.name}>
                <p className="tracking-normal font-sans">{user.name}</p>
              </abbr>
              <abbr title={user.email}>
                <p className="text-[0.7rem] font-medium tracking-normal dark:text-slate-400 text-slate-600 lowercase italic font-sans">
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
                <div className="dark:text-slate-300 text-slate-700 text-sm text-center font-bold uppercase font-sans">
                  Tickets Status
                </div>
                <p className="dark:text-slate-400 text-slate-600 text-center text-xs font-medium tracking-normal mt-2 px-2 font-sans">
                  Hover your mouse on top of each slice below to see the
                  percentages, for more analytics please visit the reports page.
                </p>
              </div>
              <StatusSummary />
            </div>
            {/**MostRecent ================================= */}
            <div className="col-span-1 h-[23rem] md:col-span-2 lg:col-span-1 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded p-4 pt-3 pb-4 flex flex-col justify-between items-center overflow-hidden">
              <div className="text-center">
                <div className="dark:text-slate-300 text-slate-700 text-sm text-center font-bold uppercase mt-3 font-sans">
                  Recent Activities
                </div>
                <p className="text-xs font-medium tracking-normal dark:text-slate-400 text-slate-600 mt-2 font-sans">
                  Your most recent activities.
                </p>
              </div>
              <MostRecent />
            </div>
          </section>

          {/**Middle Half ================================ */}
          <section className="w-full h-fit rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-4 lg:space-y-0 lg:gap-4">
            <div className="col-span-2 w-full h-fit rounded grid grid-cols-2 2xl:grid-cols-7 gap-4">
              {/**Connect Other Sources || Omni Channel Settings==================================== */}
              <Connect openAPIModal={openAPIModal} />
              <ConnectModal
                apiChannelModal={apiChannelModal}
                openAPIModal={openAPIModal}
              />

              {/**Progress ============================== */}
              <article className="col-span-5 md:hidden 2xl:flex 2xl:col-span-2 h-[20rem] rounded dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-4 flex flex-col space-y-2">
                <h3 className="dark:text-slate-300 text-slate-900 text-base font-semibold font-sans capitalize">
                  Progress
                </h3>
                <p className="text-xs font-medium tracking-normal dark:text-slate-400 text-slate-600 font-sans">
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
            <div className="col-span-2 lg:col-span-1 h-[20rem] w-full rounded dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-2">
              <div className="h-full w-full dark:bg-slate-800 bg-white rounded-md flex flex-col place-items-center p-2 overflow-hidden">
                {allMembers?.filter(
                  (user) => user.access?.toLowerCase() === "agent"
                ).length >= 1 &&
                  (user[0]?.access && user[0]?.access) !== "client" && (
                    <div className="w-full h-full overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap space-y-2">
                      <header className="sticky top-0 z-[99] dark:text-slate-300 text-slate-900 text-lg font-semibold font-sans tracking-wide capitalize dark:bg-slate-800 bg-white h-12 flex justify-between gap-2 border-b border-slate-300 dark:border-slate-700 pb-2 mb-1">
                        <h2 className="flex-[2] text-base font-semibold font-sans tracking-wide capitalize">
                          Members
                        </h2>
                        <div className="flex-[3] gap-1 items-center h-full w-full grid grid-cols-3 capitalize">
                          <div className="col-span-1 flex flex-col justify-center items-center">
                            <p className="dark:text-slate-300 text-slate-700 text-xs font-bold">
                              {
                                allMembers.filter(
                                  (user) =>
                                    user.access?.toLowerCase() === "agent" &&
                                    user.status === "available"
                                ).length
                              }
                            </p>
                            <p className="text-slate-500 text-[0.6rem] font-semibold">
                              available
                            </p>
                          </div>
                          <div className="col-span-1 flex flex-col justify-center items-center">
                            <p className="dark:text-slate-300 text-slate-700  text-xs font-bold">
                              {
                                allMembers.filter(
                                  (user) =>
                                    user.access?.toLowerCase() === "agent" &&
                                    user.status === "busy"
                                ).length
                              }
                            </p>
                            <p className="text-slate-500 text-[0.6rem] font-semibold">
                              Busy
                            </p>
                          </div>
                          <div className="col-span-1 flex flex-col justify-center items-center">
                            <p className="dark:text-slate-300 text-slate-700  text-xs font-bold">
                              {
                                allMembers.filter(
                                  (user) =>
                                    user.access?.toLowerCase() === "agent" &&
                                    user.status === "unavailable"
                                ).length
                              }
                            </p>
                            <p className="text-slate-500 text-[0.6rem] font-semibold">
                              Unavailable
                            </p>
                          </div>
                        </div>
                      </header>
                      {users}
                    </div>
                  )}

                {/**Placeholders ||Preloader ====================== */}
                {(allMembers?.filter(
                  (user) => user.access?.toLowerCase() === "agent"
                ).length <= 0 ||
                  (user[0]?.access && user[0]?.access) === "client") && (
                  <div className="h-full w-full">
                    <div className="h-full w-full rounded-sm dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 p-6 space-y-4">
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
