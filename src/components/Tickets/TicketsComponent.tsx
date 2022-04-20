import { FC,useState } from "react";
import TicketsList from "./TicketsList";

const TicketsComponent:FC = () => {
  const [newTicketModal, setModal] = useState<any>(false);
  const [deleteArray, setDelete] = useState<any>([]);
 
  //Component ======================
  return (
    <div className="w-[95%] 2xl:w-[75rem] mt-4 min-h-screen">
      {/**Tickects /Not Expanded=========== */}
      <div className="rounded-md pb-2 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-2">
        <TicketsList
          deleteArray={deleteArray}
          setDelete={setDelete}
          setModal={setModal}
          newTicketModal={newTicketModal}
        />
      </div>
    </div>
  );
};

export default TicketsComponent;
