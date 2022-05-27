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
import { deleteContact } from "../Data_Fetching/TicketsnUserData";
import EditContact from "./EditContact";
import { RootState } from "../../Redux/store";

interface Prop {
  setModal: any;
}

const Table: FC<Prop> = ({ setModal }) => {
  const contacts = useSelector((state: RootState) => state.Tickets.contacts);
  const [edit, setEdit] = useState<boolean | any>(false);
  const [loadMore, setLimit] = useState<number | any>(10);
  const [searchResults, setResults] = useState<string | any>("");
  const [selectedArray, select] = useState<any>([]);
  const [filteredContacts, setContacts] = useState<any>([]);

  //Filter Contacts ============
  useEffect(() => {
    contacts.length >= 1
      ? setContacts(
          contacts.filter(
            (contact) =>
              contact.branch_company
                ?.toLowerCase()
                ?.replace(/\s/g, "")
                .includes(searchResults?.toLowerCase().replace(/\s/g, "")) ===
                true ||
              contact?.name
                .toLowerCase()
                .replace(/\s/g, "")
                .includes(searchResults.toLowerCase().replace(/\s/g, "")) ===
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
  //   contacts.length >= 1 && contacts.forEach((contact) => arr.push(contact.id));
  //   select(arr);
  // };

  //Loop Through Each Contact =========================
  const contactList =
    filteredContacts.length >= 1 &&
    filteredContacts?.slice(loadMore - 10, loadMore)?.map((contact: any) => {
      return (
        <div
          key={contact.id}
          className="h-[3.7rem] rounded border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-[#182235] p-2 flex items-center relative"
        >
          {/**Mark Contact =========================== */}
          <input
            type="checkbox"
            name="mark"
            id="mark"
            checked={selectedArray.includes(contact.id) === true ? true : false}
            onChange={(e) =>
              e.target.checked === true
                ? select([...selectedArray, contact.id])
                : select(
                    selectedArray.filter((data: any) => data !== contact.id)
                  )
            }
            className="cursor-pointer w-3 h-3 border rounded-sm border-gray-400 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none absolute right-2 top-2 hidden md:flex"
          />
          {/**End of Mark Contact ======================== */}
          <h3 className="flex-[4] tracking-tight flex items-center space-x-1 px-2 text-sm capitalize font-semibold text-slate-800 dark:text-slate-300 whitespace-nowrap overflow-hidden">
            <span>{contact.name?.split("/")[0]}</span>
          </h3>
          <h4 className="flex-[8] tracking-normal hidden md:flex px-2 text-[0.65rem] uppercase font-semibold text-slate-800 dark:text-slate-400 whitespace-nowrap overflow-hidden overflow-ellipsis">
            {contact.branch_company}
          </h4>
          <div className="h-12 flex-[4] flex items-center gap-2">
            {" "}
            <div className="contact_Option group">
              <HiOutlinePhone />
              <div className="hidden group-hover:flex absolute top-10 pt-3">
                <div className="contact_Tooltip after:content-[''] after:absolute after: after:top-[0.25rem] after:h-4 after:w-4 after:rotate-45 after:bg-inherit after:border-t after:border-l after:border-inherit italic font-medium">
                  {" "}
                  {contact.phone}
                </div>
              </div>
            </div>
            <div className="contact_Option group">
              <HiOutlineMail />
              <div className="hidden group-hover:flex absolute top-10 pt-3">
                <div className="contact_Tooltip after:content-[''] after:absolute after: after:top-[0.25rem] after:h-4 after:w-4 after:rotate-45 after:bg-inherit after:border-t after:border-l after:border-inherit lowercase italic font-medium">
                  {" "}
                  {contact.email}
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
    <div className="mx-auto container shadow rounded p-2 pb-4 h-[52rem] relative">
      {/**Edit Contact ============ */}
      <EditContact
        edit={edit}
        setEdit={setEdit}
        selectedArray={selectedArray}
      />

      <div className="flex flex-row p-4 px-2 justify-between items-start lg:items-stretch w-full space-y-2 md:space-y-0 z-[99]">
        <div className="flex flex-col md:flex-row items-start lg:items-center">
          <div className="flex items-center gap-2">
            <abbr title="Edit">
              <button
                onClick={() => setEdit(true)}
                className="contacts-control"
              >
                <HiOutlinePencilAlt />
              </button>
            </abbr>
            <abbr title="Delete">
              <button
                onClick={() => {
                  let pin = prompt("Enter Admin Pin");
                  pin === "0001" ? deleteCont() : alert("Wrong Pin");
                }}
                className="text-red-500 p-2 border-slate-300 dark:border-slate-700 border bg-slate-200 dark:bg-[#182235] dark:hover:bg-slate-700 hover:bg-gray-300  h-10 w-10 flex justify-center items-center cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
              >
                <HiOutlineTrash />
              </button>
            </abbr>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-end gap-4">
          <div className="relative h-8 w-48  border-b dark:border-slate-700 border-slate-400">
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
              className="bg-transparent w-full h-full border-0 focus:border-0 dark:border-slate-400 border-slate-700 outline-none focus:outline-none focus:ring-0 text-sm px-4 pl-8 focus:ring-blue-700 text-slate-600 dark:text-slate-400 placeholder:text-slate-600 dark:placeholder:text-slate-400"
            />
            <HiOutlineSearch className="absolute text-slate-600 dark:text-slate-400 text-lg top-2 left-2" />
          </div>
          <button
            onClick={() => setModal(true)}
            className="text-slate-100 text-sm font-semibold cursor-pointer outline-none focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-blue-700 transition duration-150 ease-in-out hover:bg-blue-600 h-10 px-6 rounded flex items-center justify-center space-x-2"
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
        <div className="h-8 w-56 grid grid-cols-4 gap-1 dark:bg-[#182235] bg-slate-50 py-1 rounded border dark:border-slate-700 border-slate-300">
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
              <span className="text-slate-500">-</span> {loadMore}{" "}
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
