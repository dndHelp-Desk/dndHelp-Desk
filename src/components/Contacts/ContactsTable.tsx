import { FC, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineSearch,
  HiPlus,
  HiUser,
  HiMail,
  HiPhone,
} from "react-icons/hi";
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
  const markAll = () => {
    select([]);
    let arr: any = [];
    contacts.length >= 1 && contacts.forEach((contact) => arr.push(contact.id));
    select(arr);
  };

  //Loop Through Each Contact =========================
  const contactList =
    contacts.length >= 1 &&
    contacts.map((contact, index) => {
      return (
        <tr
          key={contact.id}
          className={`h-14 border-gray-300 dark:border-slate-700 border-b ${
            contact.branch_company
              ?.toLowerCase()
              ?.replace(/\s/g, "")
              .includes(searchResults?.toLowerCase().replace(/\s/g, "")) ===
              true ||
            contact?.name
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(searchResults.toLowerCase().replace(/\s/g, "")) === true
              ? ""
              : "hidden"
          }`}
        >
          <td className="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-slate-700 dark:text-gray-400 tracking-normal leading-4">
            <input
              type="checkbox"
              name="mark"
              id="mark"
              checked={
                selectedArray.includes(contact.id) === true ? true : false
              }
              onChange={(e) =>
                e.target.checked === true
                  ? select([...selectedArray, contact.id])
                  : select(
                      selectedArray.filter((data: any) => data !== contact.id)
                    )
              }
              className="cursor-pointer relative w-3 h-3 border rounded border-gray-400 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 outline-none"
            />
          </td>
          <td className="text-sm pr-6 whitespace-no-wrap text-slate-700 dark:text-slate-400 tracking-normal leading-4">
            <div className="h-full w-full flex items-center space-x-2">
              <div className="h-8 w-8 flex items-center justify-center rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-400 font-bold border border-slate-400 dark:border-slate-500">
                {contact.branch_company.charAt(0)}
              </div>
              <div>
                <span className="w-40 text-slate-800 dark:text-slate-300 overflow-hidden whitespace-nowrap text-xs font-bold">
                  {contact.branch_company}
                </span>
                <br />
                <span className="text-xs">{contact.name}</span>
              </div>
            </div>
          </td>
          <td className="pr-6 whitespace-no-wrap text-slate-700 dark:text-slate-400 tracking-normal leading-4 text-xs lowercase">
            {contact.email}
          </td>
          <td className="text-xs pr-6 whitespace-no-wrap text-slate-700 dark:text-slate-400 tracking-normal leading-4 w-10">
            {contact.phone}
          </td>
        </tr>
      );
    });

  //Component  =============================
  return (
    <div className="mx-auto container shadow rounded-xl p-2pb-4 h-[52rem] overflow-hidden relative">
      {/**Edit Contact ============ */}
      <EditContact
        edit={edit}
        setEdit={setEdit}
        selectedArray={selectedArray}
      />
      {/**================== Tables */}

      <div className="flex flex-col md:flex-row p-4 justify-between items-start lg:items-stretch w-full space-y-2 md:space-y-0 z-[99]">
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
                className="text-red-500 p-2 border-transparent border bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-700 hover:bg-gray-200  h-10 w-10 flex justify-center items-center cursor-pointer rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
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
              className="bg-transparent w-full h-full border-0 focus:border-0 dark:border-slate-700 border-slate-400 outline-none focus:outline-none focus:ring-0 text-sm px-4 pl-8 focus:ring-blue-700 text-slate-500"
            />
            <HiOutlineSearch className="absolute text-slate-500 text-lg top-2 left-2" />
          </div>
          <button
            onClick={() => setModal(true)}
            className="text-white cursor-pointer outline-none focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-blue-700 transition duration-150 ease-in-out hover:bg-blue-600 w-8 h-8 rounded flex items-center justify-center"
          >
            <HiPlus />
          </button>
        </div>
      </div>
      <div className="w-[98%] h-[46rem] m-auto px-2 overflow-hidden overflow-y-scroll">
        <table className="min-w-full  overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
          <thead className="sticky top-0 z-[99] dark:bg-slate-700 bg-slate-100">
            <tr className="w-full h-16">
              <th className="pl-8 text-slate-900 dark:text-gray-400 font-semibold pr-6 text-left text-sm tracking-normal leading-4">
                <input
                  type="checkbox"
                  name="selectAll"
                  id="selectAll"
                  onChange={(e) =>
                    e.target.checked === true ? markAll() : select([])
                  }
                  className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-slate-700 outline-none"
                />
              </th>
              <th className="text-slate-900 dark:text-gray-300 font-semibold pr-6 text-left text-sm tracking-normal leading-4">
                <HiUser className="inline" /> Contact
              </th>
              <th className="text-slate-900 dark:text-gray-300 font-semibold pr-6 text-left text-sm tracking-normal leading-4">
                <HiMail className="inline" /> Email
              </th>
              <th className="text-slate-900 dark:text-gray-300 font-semibold pr-6 text-left text-sm tracking-normal leading-4">
                <HiPhone className="inline" /> Phone Number
              </th>
            </tr>
          </thead>
          <tbody>{contactList}</tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;
