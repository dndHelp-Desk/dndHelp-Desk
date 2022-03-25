import React, { useState } from "react";
import Table from "./ContactsTable";
import NewContact from "./NewContact";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ContactsComponent = () => {
  const [contactModal, setModal] = useState(false);
  const member_details = useSelector((state) => state.UserInfo.member_details);

  //Block Clients From accessing ==========================
  if (member_details[0].access === "client") {
    return <Navigate to="/app/tickets" />;
  }
  //Component ======================================
  return (
    <div className="dark:bg-[#1e293b18] bg-[#e2e8f059] border dark:border-slate-800 border-slate-300 mt-4 container w-[90%] md:w-full rounded-xl 2xl:w-[72rem] gap-4 flex flex-col tracking-wider relative">
      <Table setModal={setModal} />
      <NewContact contactModal={contactModal} setModal={setModal} />
    </div>
  );
};

export default ContactsComponent;
