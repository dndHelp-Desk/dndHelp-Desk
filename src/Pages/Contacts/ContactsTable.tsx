import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineSearch,
  HiUserAdd,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { BsTwitter, BsWhatsapp } from "react-icons/bs";
import { deleteContact } from "../../Adapters/Data_Fetching/TicketsnUserData";
import { RootState } from "../../Redux/store";
import ActionPanel from "../../Components/ActionPanel";
import NewContact from "./NewContact";

const Table: FC = () => {
  const contacts = useSelector((state: RootState) => state.Tickets.contacts);
  const [contactModal, setModal] = useState<boolean | any>(false);
  const [edit, setEdit] = useState<boolean | any>(false);
  const [loadMore, setLimit] = useState<number | any>(10);
  const [searchResults, setResults] = useState<string | any>(
    window.localStorage.getItem("contactSearch")
      ? window.localStorage.getItem("contactSearch")
      : ""
  );
  const [selectedArray, select] = useState<any>([]);
  const [filteredContacts, setContacts] = useState<any>([]);
  const [openPanel, setActionPanel] = useState<boolean>(false);
  const [emailChipValid, setEmailValid] = useState<boolean>(false);
  const [phoneChipValid, setPhoneValid] = useState<boolean>(false);
  const [newContactValue, setValue] = useState<any>({
    name: "",
    email: "",
    phoneNumber: "",
    company: "",
    twitter_handle: "",
    whatsapp_number: "",
    contact_id: "",
  });

  //Filter Contacts ============
  useEffect(() => {
    contacts.length >= 1
      ? setContacts(
          contacts.filter(
            (contact) =>
              contact?.branch_company
                ?.toLowerCase()
                ?.replace(/\s/g, "")
                .includes(searchResults?.toLowerCase()?.replace(/\s/g, "")) ===
                true ||
              contact?.name
                .toLowerCase()
                ?.replace(/\s/g, "")
                .includes(searchResults.toLowerCase()?.replace(/\s/g, "")) ===
                true ||
              contact?.phone
                .toLowerCase()
                ?.replace(/\s/g, "")
                .includes(searchResults.toLowerCase()?.replace(/\s/g, "")) ===
                true ||
              contact?.email
                .toLowerCase()
                ?.replace(/\s/g, "")
                .includes(searchResults.toLowerCase()?.replace(/\s/g, "")) ===
                true
          )
        )
      : setContacts([]);
  }, [searchResults, contacts]);

  const deleteCont = () => {
    selectedArray.length >= 1 &&
      selectedArray.forEach((id: string | any) => deleteContact(id));
  };

  //MarkAll ==========================================
  // const markAll = () => {
  //   select([]);
  //   let arr: any = [];
  //   contacts.length >= 1 && contacts.forEach((contact) => arr.push(contact?.id));
  //   select(arr);
  // };

  //Loop Through Each Contact =========================
  const contactList =
    filteredContacts.length >= 1 &&
    filteredContacts?.slice(loadMore - 10, loadMore)?.map((contact: any) => {
      return (
        <div
          key={contact?.id}
          className="h-[3.7rem] rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 p-2 px-4 pr-14 flex items-center justify-between relative"
        >
          <div className="flex items-center space-x-4">
            {/**Mark Contact =========================== */}
            <input
              type="checkbox"
              name="mark"
              id="mark"
              checked={
                selectedArray.includes(contact?.id) === true ? true : false
              }
              onChange={(e) =>
                e.target.checked === true
                  ? select([...selectedArray, contact?.id])
                  : select(
                      selectedArray.filter((data: any) => data !== contact?.id)
                    )
              }
              className="cursor-pointer w-3 h-3 border rounded-sm border-gray-400 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none hidden md:flex"
            />
            {/**End Editi Contact ======================== */}
            <abbr title="Edit">
              <button
                onClick={() => {
                  setEdit(true);
                  setModal(true);
                  setPhoneValid(true);
                  setEmailValid(true);
                  setValue({
                    name: contact?.name?.split(/[/,]/gi)[0],
                    email: contact?.email,
                    phoneNumber: contact?.phone,
                    company: contact?.branch_company,
                    twitter_handle: contact?.twitter_handle
                      ? contact?.twitter_handle
                      : "",
                    whatsapp_number: contact?.whatsapp_number
                      ? contact?.whatsapp_number
                      : "",
                    contact_id: contact?.id,
                  });
                }}
                className="text-slate-600 dark:text-gray-400 h-6 w-6 flex justify-center items-center border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-750 dark:hover:bg-slate-700 hover:bg-slate-200 cursor-pointer rounded focus:outline-none focus:border-gray-800"
              >
                <HiOutlinePencilAlt />
              </button>
            </abbr>
            {/**End of Mark Contact ======================== */}
            <div className="h-10 w-10 rounded-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 flex justify-center items-center text-base font-semibold dark:font-medium font-sans dark:text-slate-300 text-slate-600 capitalize">
              {contact?.name?.split(/[/,]/gi)[0]?.charAt(0)}
            </div>
            <div className="tracking-tight flex flex-col justify-center space-y-1 px-2 text-xs capitalize font-semibold dark:font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap overflow-hidden">
              <span>{contact?.name?.split(/[/,]/gi)[0]}</span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {contact?.branch_company}
              </span>
            </div>
          </div>
          <div className="h-12 hidden md:flex items-center gap-2">
            {" "}
            <div className="contact_Option group">
              <HiOutlinePhone />
              <div className="hidden group-hover:flex absolute top-10 pt-3">
                <div className="contact_Tooltip after:content-[''] after:absolute after: after:top-[0.25rem] after:h-4 after:w-4 after:rotate-45 after:bg-inherit after:border-t after:border-l after:border-inherit italic font-medium text-xs whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {" "}
                  {contact?.phone?.split(/[/,]/)?.map((data: any) => {
                    return <div key={data}>{data}</div>;
                  })}
                </div>
              </div>
            </div>
            <div className="contact_Option group">
              <HiOutlineMail />
              <div className="hidden group-hover:flex absolute top-10 pt-3">
                <div className="contact_Tooltip after:content-[''] after:absolute after: after:top-[0.25rem] after:h-4 after:w-4 after:rotate-45 after:bg-inherit after:border-t after:border-l after:border-inherit lowercase italic font-medium text-xs whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {" "}
                  {contact?.email?.split(/[/,]/)?.map((data: any) => {
                    return <div key={data}>{data}</div>;
                  })}
                </div>
              </div>
            </div>
            <div className="contact_Option group">
              <BsTwitter />
              <div className="hidden group-hover:flex absolute top-10 pt-3">
                <div className="contact_Tooltip after:content-[''] after:absolute after: after:top-[0.25rem] after:h-4 after:w-4 after:rotate-45 after:bg-inherit after:border-t after:border-l after:border-inherit">
                  {" "}
                  {contact?.twitter_handle}
                </div>
              </div>
            </div>
            <div className="contact_Option group">
              <BsWhatsapp />
              <div className="hidden group-hover:flex absolute top-10 pt-3">
                <div className="contact_Tooltip after:content-[''] after:absolute after: after:top-[0.25rem] after:h-4 after:w-4 after:rotate-45 after:bg-inherit after:border-t after:border-l after:border-inherit">
                  {" "}
                  {contact?.whatsapp_number}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

  //Component  =============================
  return (
    <div className="rounded p-2 pb-4 w-full h-[52rem] relative">
      {/**New Contact ========================== */}
      <NewContact
        contactModal={contactModal}
        setModal={setModal}
        newContactValue={newContactValue}
        setValue={setValue}
        edit={edit}
        setEdit={setEdit}
        phoneChipValid={phoneChipValid}
        setPhoneValid={setPhoneValid}
        emailChipValid={emailChipValid}
        setEmailValid={setEmailValid}
      />
      {/**New Contact ========================== */}

      {/**Delete Contact Action Panel */}
      <ActionPanel
        openPanel={openPanel}
        setActionPanel={setActionPanel}
        deleteSelected={deleteCont}
        option="contact"
      />
      {/**Delete Contact Action Panel */}

      <div className="flex flex-col md:flex-row p-4 px-2 justify-between items-start lg:items-stretch w-full space-y-2 md:space-y-0 z-[99]">
        {/**Search contact ===================== */}
        <div className="flex w-1/2 xl:w-[30%]">
          <div className="relative h-10 w-full rounded-full dark:bg-slate-750 bg-slate-50 border border-slate-300 dark:border-slate-700">
            <input
              type="search"
              name="search"
              id="search"
              autoComplete="off"
              onChange={(e) => {
                setResults(e.target.value);
                setLimit(10);
              }}
              value={searchResults}
              placeholder="Quick Search ..."
              className="bg-transparent w-full h-full border-0 focus:border-0 dark:border-slate-400 border-slate-700 outline-none focus:outline-none focus:ring-0 text-sm px-4 pr-8 focus:ring-blue-700 text-slate-600 dark:text-slate-400 placeholder:text-slate-600 dark:placeholder:text-slate-400"
            />
            <HiOutlineSearch className="absolute text-slate-600 dark:text-slate-400 text-lg top-2.5 right-3" />
          </div>
        </div>
        {/**Search contact ===================== */}

        <div className="flex items-center justify-end space-x-2">
          <div className="flex items-center gap-2">
            <abbr title="Delete">
              <button
                onClick={() => {
                  setActionPanel(true);
                }}
                className="text-red-500 p-2 border-slate-300 dark:border-slate-700 border bg-slate-100 dark:bg-slate-750 dark:hover:bg-slate-700 hover:bg-slate-200 h-9 w-9 flex justify-center items-center cursor-pointer rounded-sm focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
              >
                <HiOutlineTrash />
              </button>
            </abbr>
          </div>
          <button
            onClick={() => setModal(true)}
            className="text-slate-100 text-sm font-medium cursor-pointer outline-none focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray dark:bg-blue-700 bg-slate-800 transition duration-150 ease-in-out hover:opacity-80 h-9 px-4 rounded-sm flex items-center justify-center space-x-2"
          >
            <HiUserAdd className="text-lg" />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <section className="flex flex-col space-y-2 w-full h-[42rem] p-2 overflow-hidden overflow-y-scroll">
        {contactList}
      </section>

      {/**Pagination ================================ */}
      <div className="h-[8%] w-full bottom-0 flex flex-col justify-center items-center">
        <div className="h-8 w-56 grid grid-cols-4 gap-1 dark:bg-slate-750 bg-slate-50 py-1 rounded border dark:border-slate-700 border-slate-300">
          <button
            onClick={() => {
              setLimit(loadMore <= 19 ? loadMore - 0 : loadMore - 10);
            }}
            className="col-span-1 dark:text-slate-300 text-slate-800 font-bold text-lg tracking-wider flex items-center justify-center outline-none focus:outline-none hover:opacity-80"
          >
            <BiChevronLeft />
          </button>
          <div className="col-span-2 dark:text-slate-300 text-slate-800 font-bold text-xs tracking-wider flex items-center justify-center border-l border-r dark:border-slate-700 border-slate-300 overflow-hidden px-1">
            <p className="text-[0.65rem] overflow-hidden overflow-ellipsis whitespace-nowrap">
              {loadMore - 10 === 0 ? 1 : loadMore - 10}{" "}
              <span className="text-slate-500">-</span>{" "}
              {loadMore > contacts.length ? contacts.length : loadMore}{" "}
              <span className="text-slate-500">of </span>
              {contacts.length}
            </p>
          </div>
          <button
            onClick={() => {
              setLimit(contacts.length > loadMore ? loadMore + 10 : 10);
            }}
            className="col-span-1 dark:text-slate-300 text-slate-800 font-bold text-lg tracking-wider flex items-center justify-center outline-none focus:outline-none hover:opacity-80"
          >
            <BiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Table;
