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
    <div className=" mt-4 container w-[90%] md:w-full 2xl:w-[72rem] min-h-screen">
      <div className="dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 gap-4 flex flex-col tracking-wider rounded-xl relative">
        <Table setModal={setModal} />
        <NewContact contactModal={contactModal} setModal={setModal} />
      </div>
    </div>
  );
};

export default ContactsComponent;
