import { FC, useState } from "react";
import Table from "./ContactsTable";
import NewContact from "./NewContact";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const ContactsComponent: FC = () => {
  const [contactModal, setModal] = useState<boolean | any>(false);
  const member_details = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );

  //Block Clients From accessing ==========================
  if (member_details[0]?.access === "client") {
    return <Navigate to="/app/tickets" />;
  }
  //Component ======================================
  return (
    <div className="dark:bg-transparent bg-transparent w-full min-h-[calc(100%-3.65rem)] overflow-hidden overflow-y-scroll">
      <div className="pt-4 px-4 dark:bg-slate-800 bg-white space-y-4 flex flex-col relative min-h-full">
        <h1 className="text-slate-800 dark:text-slate-300 text-2xl font-sans font-bold">
          Contacts
        </h1>
        <Table setModal={setModal} />
        <NewContact contactModal={contactModal} setModal={setModal} />
      </div>
    </div>
  );
};

export default ContactsComponent;
