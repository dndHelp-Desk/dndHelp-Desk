import React, { useState } from "react";
import NewTicket from "./NewTicket";
import TicketsList from "./TicketsList";

const TicketsComponent = () => {
  const [newTicketModal, setModal] = useState(false);
  const [deleteArray, setDelete] = useState([]);
 
  //Component ======================
  return (
    <div className="bg-transparent space-y-1 container w-[90%] md:w-full 2xl:w-[72rem] mt-4 rounded-lg pb-2 dark:bg-slate-900 bg-white p-2">
      {/**Tickects /Not Expanded=========== */}
      <TicketsList
        deleteArray={deleteArray}
        setDelete={setDelete}
        setModal={setModal} />
      <NewTicket newTicketModal={newTicketModal} setModal={setModal} />
    </div>
  );
};

export default TicketsComponent;
