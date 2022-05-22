import { FC, useState } from "react";
import MessageThread from "./MessageThread";
import TicketsList from "./TicketsList";

const TicketsComponent: FC = () => {
  const [isChatOpen, setChat] = useState<boolean>(false);
  const [audio, audioUrl] = useState<string | any>("");
  const [newTicketModal, setModal] = useState<any>(false);
  const [deleteArray, setDelete] = useState<any>([]);

  //Component ======================
  return (
    <div className="w-[95%] 2xl:w-[75rem] mt-4 min-h-screen">
      <div className="w-full grid grid-cols-5 gap-4">
        <div
          className={`${
            isChatOpen ? "hidden" : "col-span-5"
          } lg:grid lg:col-span-2 w-full h-[47rem] rounded bg-white dark:bg-slate-800 border dark:border-slate-700 border-slate-400 overflow-hidden`}
        >
          <TicketsList
            deleteArray={deleteArray}
            setDelete={setDelete}
            setModal={setModal}
            newTicketModal={newTicketModal}
            setChat={setChat}
            audioUrl={audioUrl}
          />
        </div>
        <div
          className={`${
            isChatOpen ? "col-span-5" : "hidden"
          } lg:flex lg:col-span-3 h-[47rem] rounded bg-inherit`}
        >
          <MessageThread
            isChatOpen={isChatOpen}
            setChat={setChat}
            audio={audio}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketsComponent;
