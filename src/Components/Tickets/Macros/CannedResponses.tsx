import { FC, useState } from "react";
import { BiSearchAlt, BiTrash } from "react-icons/bi";
import { deleteCannedRes } from "../../Data_Fetching/TicketsnUserData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import { updateAlert } from "../../../Redux/Slices/NotificationsSlice";
import useOnClickOutside from "../../../Custom-Hooks/useOnClickOutsideRef";
import NewCanned from "./NewCanned";

type Props = {
  setReply: any;
  onChange: any;
  showCanned: boolean;
  setCanned: any;
  tooltipPosition: any;
  position: any;
};

const CannedResponses: FC<Props> = ({
  setReply,
  onChange,
  setCanned,
  showCanned,
  tooltipPosition,
  position,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const allCannedRes = useSelector(
    (state: RootState) => state.UserInfo.cannedResponses
  );
  const modRef = useOnClickOutside(() => {
    setCanned(false);
  });
  const [cannedSearch, setCannedSearch] = useState<string>("");
  const [newResponseModal, setModal] = useState<boolean>(false);

  //component ==========
  return (
    <div
      ref={modRef}
      className={`absolute bottom-[2.9rem] ${
        tooltipPosition === "[9.4rem]" ? "left-[-9.4rem]" : "left-[-0.7rem]"
      } w-[20rem] h-[20rem] pb-1 ${showCanned ? "flex" : "hidden"}`}
    >
      {/**New Canned Response Modal */}
      <NewCanned newResponseModal={newResponseModal} setModal={setModal} />
      {/**New Canned Response Modal */}
      <div
        className={`rounded bg-slate-50 dark:bg-slate-700 z-[999] border border-slate-500 dark:border-slate-600 p-2 w-full h-full shadow-2xl drop-shadow-2xl grid grid-rows-6 relative after:absolute after:contents-[''] after:h-5 after:w-5 after:bg-inherit after:border after:border-inherit after:border-l-transparent after:border-t-transparent after:bottom-[-0.65rem] ${
          position === 4 ? "after:left-[9.7rem]" : "after:left-5"
        } after:rotate-45`}
      >
        <div
          className={`row-span-1 grid ${
            position === 4 ? "grid-cols-8" : "grid-cols-10"
          } place-content-center`}
        >
          <div
            className={`col-span-2 flex items-center ${
              position === 4 && "hidden"
            }`}
          >
            <button
              type="button"
              onClick={() => {
                setModal(true);
                document.body.style.overflow = "hidden";
              }}
              className="outline-none focus:outline-none h-9 w-14 text-xs tracking-wide font-medium bg-blue-700 hover:opacity-80 transition-all duration-200 text-white flex justify-center items-center rounded-sm"
            >
              <abbr title="Add Canned Response">New</abbr>
            </button>
          </div>
          <div className="w-full h-10 col-span-8 bg-inherit px-2 overflow-hidden relative bg-white border border-slate-300 dark:border-slate-600 rounded">
            <input
              type="search"
              onChange={(e) => {
                setCannedSearch(e.target.value);
              }}
              value={cannedSearch}
              placeholder="Quick Search ..."
              className="outline-none focus:outline-none focus:border-0 focus:ring-0 h-full w-full bg-inherit border-0 text-sm pr-4 placeholder:text-slate-600 dark:placeholder:text-slate-400 dark:text-slate-400 text-slate-800"
            />
            <BiSearchAlt className="absolute right-2 top-2.5 dark:text-slate-400 text-slate-800 text-lg z-[9]" />
          </div>
        </div>
        <div className="w-full row-span-5 overflow-hidden z-[9] bg-inherit">
          <ul className="mt-1 h-full w-full flex flex-col p-2 space-y-1 overflow-hidden overflow-y-scroll dark:text-slate-300 text-slate-700 text-xs font-semibold ">
            {allCannedRes.length >= 1 &&
              allCannedRes.map((template, index) => {
                return (
                  <li
                    onClick={() => {
                      setReply((prev: any) => ({
                        ...prev,
                        message: template.message,
                      }));
                      onChange(template.message);
                      setCanned(false);
                    }}
                    className={`capitalize hover:opacity-80 border-b border-slate-300 dark:border-slate-600 p-1 pr-4 overflow-hidden overflow-ellipsis whitespace-nowrap h-10 cursor-pointer relative w-full flex items-center cannedResponseList ${
                      template?.name
                        ?.toLowerCase()
                        .replace(/\s/g, "")
                        .includes(
                          cannedSearch?.toLowerCase().replace(/\s/g, "")
                        )
                        ? ""
                        : "hidden"
                    }`}
                    key={index}
                  >
                    {template.name}
                    <button
                      type="button"
                      onClick={() => {
                        deleteCannedRes(template.id, user[0]?.id);
                        dispatch(
                          updateAlert([
                            ...alerts,
                            {
                              message: "Macro Deleted succesfully",
                              color: "bg-green-200",
                              id: new Date().getTime(),
                            },
                          ])
                        );
                      }}
                      className="absolute right-0 hidden outline-none fucus:outline-none text-red-500 border border-red-400 h-8 w-8 rounded bg-white dark:bg-slate-800 justify-center items-center shadow-lg"
                    >
                      <BiTrash />
                    </button>
                  </li>
                );
              })}
            {allCannedRes.length <= 0 && (
              <>
                <h2 className="mt-4 text-center text-lg">No macros yet</h2>
                <p className="text-center">
                  Create macros to speed up and standardize your responses.
                </p>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CannedResponses;
