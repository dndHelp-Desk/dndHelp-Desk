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
    <div className="bg-transparent mt-4 min-h-[40rem] w-[90%] space-y-4 md:w-full rounded-xl container 2xl:w-[72rem] overflow-hidden pt-2 pb-1">
      <Table setModal={setModal} />
      <NewContact contactModal={contactModal} setModal={setModal} />
    </div>
  );
};

export default ContactsComponent;
