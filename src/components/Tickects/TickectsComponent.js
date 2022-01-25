import React from "react";
import { useSelector } from "react-redux";

const TicketsComponent = () => {
  const tickets = useSelector((state) => state.AllTickects);
  console.log(tickets)
  return (
    <div className="bg-slate-900 mt-[-2rem] absolute left-[9.5%] z-0 rounded-lg h-[40rem] w-[80%]"></div>
  );
};

export default TicketsComponent;
