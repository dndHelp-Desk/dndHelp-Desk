import { FC, useState, useEffect } from "react";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { useSelector } from "react-redux";
import { RootState } from "./../../Redux/store";
import { BiBuilding } from "react-icons/bi";

interface Props {
  setList: any;
  contactsList: any;
  filtersModal: boolean;
}
const CompanyFilter: FC<Props> = ({ setList, contactsList, filtersModal }) => {
  const [list, setLists] = useState<string[] | any[]>([]);
  const [search, setSearch] = useState<string | any>("");
  const [modal, setModal] = useState<boolean>(false);
  const modalRef = useClickOutside(() => {
    setModal(false);
  });
  const reportsData = useSelector(
    (state: RootState) => state.Tickets.allTickets
  );

  useEffect(() => {
    reportsData
      ? setLists(
          Array.from(
            new Set(
              reportsData
                ?.filter((data) => data.message_position === 1)
                ?.map((data) => data.branch_company?.trim())
            )
          ).sort((a, b) => (a < b ? -1 : 1))
        )
      : setLists([]);
  }, [reportsData]);

  //Component ==================
  return (
    <div ref={modalRef} className="relative">
      <div
        className={`col-span-1 h-10 dark:bg-slate-900 bg-slate-100 w-full min-w-[16rem] ${
          filtersModal ? "flex" : "hidden"
        } pl-7 items-center overflow-hidden relative rounded-sm border dark:border-slate-700 border-slate-400`}
      >
        <BiBuilding className="dark:text-slate-400 text-slate-900 text-lg absolute h-full left-3" />
        <label htmlFor="company" className="">
          <input
            type="search"
            name="company"
            id="company"
            autoComplete="off"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            onFocus={() => {
              setModal(true);
            }}
            className="w-full h-full outline-none focus:outline-none focus:ring-0 border-0 text-xs dark:text-slate-400 text-slate-800 dark:font-medium font-semibold bg-inherit placeholder-slate-900 dark:placeholder:text-slate-400 rounded-sm"
            placeholder="Company ..."
          />
        </label>
      </div>

      {/**List ===================== */}
      <div
        className={`${
          modal ? "flex" : "hidden"
        } flex-col items-center p-2 absolute top-12 left-0] w-full min-w-[15rem] h-[20rem] bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-xl drop-shadow-xl z-[999] text-xs font-semibold dark:text-slate-400 text-slate-800 overflow-hidden rounded`}
      >
        <div className="mt-2 w-full h-full p-2 space-y-2 overflow-hidden overflow-y-scroll">
          <label
            htmlFor="select_all"
            className="w-full flex items-center space-x-2 capitalize"
          >
            {" "}
            <input
              type="checkbox"
              checked={contactsList.length <= 0 ? true : false}
              onChange={() => {
                if (contactsList.length <= 0) {
                  setList(list);
                } else {
                  setList([]);
                }
              }}
              name="select_all"
              id="select_all"
            />
            <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
              Select All
            </span>
          </label>

          {list.length >= 1 &&
            list?.map((name, index) => {
              return (
                <label
                  key={index}
                  htmlFor="index"
                  className={`w-full flex items-center space-x-2 capitalize ${
                    name
                      ?.toLowerCase()
                      ?.replace(/\s/g, "")
                      ?.includes(search?.toLowerCase()?.replace(/\s/g, ""))
                      ? ""
                      : "hidden"
                  }`}
                >
                  {" "}
                  <input
                    type="checkbox"
                    checked={
                      (contactsList.length >= 1 &&
                        contactsList.filter(
                          (data: any) =>
                            data?.toLowerCase()?.replace(/\/s/g, "") ===
                            name?.toLowerCase()?.replace(/\/s/g, "")
                        )?.length <= 0) ||
                      contactsList.length <= 0
                        ? true
                        : false
                    }
                    onChange={() => {
                      if (contactsList.length <= 0) {
                        setList([name]);
                      } else if (contactsList.length >= 1) {
                        if (
                          contactsList.filter(
                            (data: any) =>
                              data?.toLowerCase()?.replace(/\/s/g, "") ===
                              name?.toLowerCase()?.replace(/\/s/g, "")
                          )?.length <= 0
                        ) {
                          setList([...contactsList, name]);
                        } else {
                          setList(
                            contactsList.filter(
                              (data: any) =>
                                data?.toLowerCase()?.replace(/\/s/g, "") !==
                                name?.toLowerCase()?.replace(/\/s/g, "")
                            )
                          );
                        }
                      }
                    }}
                    name="index"
                    id="index"
                  />
                  <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                    {name}
                  </span>
                </label>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CompanyFilter;
