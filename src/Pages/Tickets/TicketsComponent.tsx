import { FC, useState } from "react";
import MessageThread from "./Thread/MessageThread";
import TicketsList from "./TicketsList";

const TicketsComponent: FC = () => {
  const [isChatOpen, setChat] = useState<boolean>(false);
  const [audio, audioUrl] = useState<string | any>("");
  const [newTicketModal, setModal] = useState<any>(false);
  const [deleteArray, setDelete] = useState<any>([]);

  //Get Draft Message From the Local Storage ==============
  const initialDraft = () => {
    const draft = localStorage.getItem("newTicketDraftValues");
    return draft
      ? JSON.parse(draft)
      : {
          recipient_name: "",
          recipient_email: "",
          agent: "",
          agent_email: "",
          priority: "",
          category: "",
          branch_company: "",
          message: "<p></p>",
          state: "",
          date: "",
          complainant_name: "",
          complainant_email: "none",
          complainant_number: "",
          send_as: "",
        };
  };

  //New Ticket Values | Draft
  const [inputValue, setValues] = useState<any>(initialDraft());

  //Component ======================
  return (
    <div
      style={{ height: `calc(100% - [3.65rem])` }}
      className="dark:bg-transparent bg-transparent w-full select-text overflow-hidden"
    >
      <div className="w-full h-full grid grid-cols-5">
        <div
          className={`${
            isChatOpen ? "hidden" : "col-span-5"
          } lg:grid lg:col-span-2 w-full h-full bg-white dark:bg-slate-800 border-r dark:border-slate-700 border-slate-400 overflow-hidden`}
        >
          <TicketsList
            deleteArray={deleteArray}
            setDelete={setDelete}
            setModal={setModal}
            newTicketModal={newTicketModal}
            setChat={setChat}
            audioUrl={audioUrl}
            inputValue={inputValue}
            setValues={setValues}
          />
        </div>
        <div
          className={`${
            isChatOpen ? "col-span-5" : "hidden"
          } lg:flex lg:col-span-3 h-full bg-inherit overflow-hidden`}
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
