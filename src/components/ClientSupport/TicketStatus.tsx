import { FC} from "react";
import { useLocation } from "react-router-dom";
import Chat from "./Chat";
import {  useSelector } from "react-redux";
import { markAsSeen } from "./DataFetching";
import {  RootState } from "../../Redux/store";

const TicketStatus:FC = () => {
  let allTickets = useSelector((state:RootState) => state.Tickets.allTickets);
  const threadId = useSelector((state: RootState) => state.Tickets.threadId);
  const location = useLocation();

  console.log(location.search?.split(/[=&]/)[1]);
  console.log(location.search?.split(/[=&]/)[3]);

  const newMessages:any =
    allTickets.length >= 1 &&
    allTickets.filter(
      (msg) =>
        msg.from !== "client" &&
        msg.readStatus !== "read" &&
        msg.ticket_id === threadId
    );

  if (navigator.onLine && newMessages?.length >= 1) {
    newMessages.forEach((msg:any) => {
      markAsSeen(msg.id, "read");
    });
  }

  //Components ==========================================
  return (
    <div
      className={` ${
        location.pathname === "/support" ? "flex" : "hidden"
      } w-full h-full overflow-hidden p-2 md:p-6  justify-center`}
    >
      <div className="min-h-[500px] 2xl:h-[80%] flex flex-col items-center  w-[90%] md:w-full container 2xl:w-[72rem] min-w-[200px] rounded overflow-hidden">
        <h2 className="text-2xl text-slate-600 font-sans font-bold text-center">
          Welcome back!
        </h2>
        <Chat />
      </div>
    </div>
  );
};

export default TicketStatus;
