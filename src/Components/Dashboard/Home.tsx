import { FC, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfile from "./../../default.webp";
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

  const totalProgress =
    dashboardData.length >= 1
      ? (
          (dashboardData.filter(
            (data) => data?.status?.toLowerCase() === "solved"
          ).length /
            dashboardData?.length) *
          100
        )?.toFixed(1)
      : 0;

  //Loop Through All Users ================
  const users =
    allMembers.length >= 1 &&
    allMembers.map((user) => {
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
              className={`absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 dark:border-slate-800 border-white ${
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
              <p className="tracking-normal">{user.name}</p>
            </abbr>
            <abbr title={user.email}>
              <p className="text-[0.7rem] font-medium tracking-normal dark:text-slate-400 text-slate-600 lowercase italic">
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
          <ProgressBars />
          {/**Todo List ================================ */}
          {/* <ToDo />*/}
          {/**Tickets Per Status Summary ================================ */}
          <div className="col-span-1 h-[20rem] grid grid-rows-5 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded-md px-4 pb-4">
            <div className="row-span-2 bg-no-repeat bg-center bg-contain flex flex-col justify-center items-center px-4">
              <h1 className="dark:text-slate-300 text-slate-900 text-xs text-center font-bold dark:font-semibold uppercase mt-1">
                Tickets Per Status
              </h1>
              <p className="dark:text-slate-400 text-slate-600 text-center text-xs font-medium tracking-normal mt-2 px-2">
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
              <p className="text-xs font-medium tracking-normal dark:text-slate-400 text-slate-600 mt-2">
                Your most recent activities.
              </p>
            </article>
            <MostRecent />
          </div>
        </section>

        {/**Middle Half ================================ */}
        <section className="row-span-2 w-full h-fit lg:min-h-[18rem] rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center space-y-4 lg:space-y-0 lg:gap-4 overflow-hidden">
          <div className="col-span-2 w-full h-full rounded-md grid grid-cols-2 md:grid-cols-7 gap-4">
            {/**Connect Other Sources || Omni Channel Settings==================================== */}
            <Connect openAPIModal={openAPIModal} />
            <ConnectModal
              apiChannelModal={apiChannelModal}
              openAPIModal={openAPIModal}
            />

            {/**Progress ============================== */}
            <article className="col-span-5 md:col-span-2 min-h-[10rem]  max-h-[18rem] h-full rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-4 flex flex-col space-y-2">
              <h3 className="dark:text-slate-300 text-slate-900 text-lg font-medium font-sans capitalize">
                Progress
              </h3>
              <p className="text-xs font-medium tracking-normal dark:text-slate-400 text-slate-600">
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
                className={`w-full h-[6.5rem] overflow-hidden mb-4 relative`}
              >
                <RadialBar />
                <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center font-semibold text-slate-800 dark:text-slate-300 text-sm pt-4 pl-2">
                  {Number(totalProgress) + "%"}
                </div>
              </div>
              <Link
                to="/app/tickets"
                className="text-blue-600 text-sm font-medium flex md:hidden xl:flex items-center justify-center space-x-2"
              >
                <span>View all Your Tickets</span>
                <BsArrowRight />
              </Link>
            </article>
          </div>

          {/**Online Users ================================ */}
          <div className="col-span-2 lg:col-span-1 h-[18rem] w-full rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-2">
            <div className="h-full w-full dark:bg-slate-800 bg-white rounded-md flex flex-col place-items-center p-4 py-2 overflow-hidden">
              {allMembers.length >= 1 &&
                (user[0]?.access && user[0]?.access) !== "client" && (
                  <div className="w-full h-full overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap space-y-2">
                    <header className="sticky top-0 z-[99] dark:text-slate-300 text-slate-900 text-lg font-semibold font-sans tracking-wide capitalize dark:bg-slate-800 bg-white h-12 flex justify-between gap-2 border-b border-slate-300 dark:border-slate-700 pb-2 mb-1">
                      <h3 className="flex-[2] text-base font-medium font-sans tracking-wide capitalize">
                        Members
                      </h3>
                      <div className="flex-[3] gap-1 items-center h-full w-full grid grid-cols-3 capitalize">
                        <div className="col-span-1 flex flex-col justify-center items-center">
                          <p className="dark:text-slate-300 text-slate-700 text-xs font-bold">
                            {
                              allMembers.filter(
                                (user) => user.status === "available"
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
                                (user) => user.status === "busy"
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
                                (user) => user.status === "unavailable"
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

        {/**Bottom Half ================================ */}
        <BottomSection />
      </div>
    </div>
  );
};

export default Home;
