import React from 'react';
import { useSelector } from "react-redux";
import TicketsnUserData from "../Data_Fetching/TicketsnUserData";

const TicketsComponent = () => {
	let allTickects = useSelector(state => state.Tickects.allTickects)
	console.log(allTickects)
  return (
    <div className="bg-slate-900 mt-[-2rem] absolute left-[9.5%] z-0 rounded-lg h-[40rem] w-[80%]">
      <TicketsnUserData />
    </div>
  );
};

export default TicketsComponent;
