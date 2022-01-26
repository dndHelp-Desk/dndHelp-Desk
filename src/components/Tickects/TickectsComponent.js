import React from "react";
import { useSelector } from "react-redux";
import TickectsnUserData from "./../Data_Fetching/TickectsnUserData"

const TicketsComponent = () => {
  const tickets = useSelector((state) => state.AllTickects);
  console.log(tickets)
  return (
    <div className="mt-[-2rem] absolute left-[9.5%] z-0 rounded-lg h-[40rem] w-[80%]">
      <TickectsnUserData />
    </div>
  );
};

export default TicketsComponent;
