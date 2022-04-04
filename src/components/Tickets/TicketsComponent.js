import React, { useState } from "react";
import TicketsList from "./TicketsList";

const TicketsComponent = () => {
  const [newTicketModal, setModal] = useState(false);
  const [deleteArray, setDelete] = useState([]);
 
  //Component ======================
  return (
    <div className="container w-[90%] md:w-full 2xl:w-[72rem] mt-4 rounded-lg pb-2 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-2">
      {/**Tickects /Not Expanded=========== */}
      <TicketsList
        deleteArray={deleteArray}
        setDelete={setDelete}
        setModal={setModal}
        newTicketModal={newTicketModal}
      />
    </div>
  );
};

export default TicketsComponent;
