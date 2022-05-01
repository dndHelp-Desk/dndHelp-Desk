import { FC, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineSearch,
  HiPlus,
  HiOutlinePhone,
  HiOutlineMail,
} from "react-icons/hi";
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
  const [searchResults, setResults] = useState<string | any>("");
  const [selectedArray, select] = useState<any>([]);

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
    contacts.length >= 1 &&
    contacts.map((contact) => {
      return (
        <div
          key={contact.id}
          className="col-span-4 md:col-span-2 lg:col-span-1 h-[14.5rem] rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-[#182235] p-4 flex flex-col justify-center items-center relative"
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
            className="cursor-pointer w-3 h-3 border rounded-sm border-gray-400 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none absolute right-2 top-2"
          />
          {/**End of Mark Contact ======================== */}

          <div className="w-10 h-10 rounded bg-slate-200 dark:bg-slate-800 border border-slate-600 dark:border-slate-500 flex items-center justify-center text-lg uppercase font-bold text-slate-800 dark:text-slate-300">
            {contact.name?.charAt(0)}
          </div>
          <h3 className="mt-2 w-full tracking-tight flex justify-center px-2 text-sm capitalize font-semibold text-slate-800 dark:text-slate-300 whitespace-nowrap overflow-hidden">
            {contact.name}
          </h3>
          <h4 className="w-full tracking-normal flex justify-center px-2 text-[0.65rem] uppercase font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap overflow-hidden overflow-ellipsis">
            {contact.branch_company}
          </h4>
          <div className="mt-2 h-12 w-full flex justify-center items-center gap-2">
            {" "}
            <div className="contact_Option group">
              <HiOutlinePhone />
              <div className="hidden group-hover:flex absolute top-10 pt-3">
                <div className="contact_Tooltip after:content-[''] after:absolute after: after:top-[0.25rem] after:h-4 after:w-4 after:rotate-45 after:bg-inherit after:border-t after:border-l after:border-inherit">
                  {" "}
                  {contact.phone}
                </div>
              </div>
            </div>
            <div className="contact_Option group">
              <HiOutlineMail />
              <div className="hidden group-hover:flex absolute top-10 pt-3">
                <div className="contact_Tooltip after:content-[''] after:absolute after: after:top-[0.25rem] after:h-4 after:w-4 after:rotate-45 after:bg-inherit after:border-t after:border-l after:border-inherit">
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
    <div className="mx-auto container shadow rounded-xl p-2 pb-4 h-[52rem] relative">
      {/**Edit Contact ============ */}
      <EditContact
        edit={edit}
        setEdit={setEdit}
        selectedArray={selectedArray}
      />

      <div className="flex flex-row p-4 justify-between items-start lg:items-stretch w-full space-y-2 md:space-y-0 z-[99]">
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
                className="text-red-500 p-2 border-slate-300 dark:border-slate-700 border bg-slate-200 dark:bg-[#182235] dark:hover:bg-slate-700 hover:bg-gray-200  h-10 w-10 flex justify-center items-center cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
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
              onChange={(e) => setResults(e.target.value)}
              value={searchResults}
              placeholder="Quick Search ..."
              className="bg-transparent w-full h-full border-0 focus:border-0 dark:border-slate-400 border-slate-700 outline-none focus:outline-none focus:ring-0 text-sm px-4 pl-8 focus:ring-blue-700 text-slate-600 dark:text-slate-400 placeholder:text-slate-600 dark:placeholder:text-slate-400"
            />
            <HiOutlineSearch className="absolute text-slate-600 dark:text-slate-400 text-lg top-2 left-2" />
          </div>
          <button
            onClick={() => setModal(true)}
            className="text-slate-100 cursor-pointer outline-none focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-blue-700 transition duration-150 ease-in-out hover:bg-blue-600 h-10 px-6 rounded flex items-center justify-center space-x-2"
          >
            <HiPlus />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <section className="grid grid-cols-4 gap-4 w-full h-[46rem] p-2 overflow-hidden overflow-y-scroll">
        {contactList}
      </section>
    </div>
  );
};
export default Table;
