import { FC,useState } from "react";
import Table from "./ContactsTable";
import NewContact from "./NewContact";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const ContactsComponent:FC = () => {
  const [contactModal, setModal] = useState<boolean|any>(false);
  const member_details = useSelector((state:RootState) => state.UserInfo.member_details);

  //Block Clients From accessing ==========================
  if (member_details[0]?.access === "client") {
    return <Navigate to="/app/tickets" />;
  }
  //Component ======================================
  return (
    <div className=" mt-4 w-[95%] 2xl:w-[75rem] min-h-screen">
      <div className="dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 gap-4 flex flex-col tracking-wider rounded-md relative">
        <Table setModal={setModal} />
        <NewContact contactModal={contactModal} setModal={setModal} />
      </div>
    </div>
  );
};

export default ContactsComponent;
