import { FC, useState, useEffect } from "react";
import { BiSearchAlt, BiTrash, BiRightArrowAlt } from "react-icons/bi";
import {
  deleteCannedRes,
  deletePublicCannedRes,
  newPublicCannedRes,
} from "../../../Adapters/Data_Fetching/TicketsnUserData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import { updateAlert } from "../../../Redux/Slices/NotificationsSlice";
import useClickOutside from "../../../Custom-Hooks/useOnClickOutsideRef";
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
  const privateCannedRes = useSelector(
    (state: RootState) => state.UserInfo.cannedResponses
  );
  const publicCannedRes = useSelector(
    (state: RootState) => state.UserInfo.publicCannedResponses
  );
  const [allCannedRes, setAllCannedRes] = useState<any[]>([]);
  const [cannedSearch, setCannedSearch] = useState<string>("");
  const [newResponseModal, setModal] = useState<boolean>(false);
  const modRef = useClickOutside(() => {
    setCanned(false);
  });

  //Combined All Canned Responses
  useEffect(() => {
    setAllCannedRes([...privateCannedRes, ...publicCannedRes]);
  }, [privateCannedRes, publicCannedRes]);

  //component ==========
  return (
    <>
      {/**New Canned Response Modal */}
      <NewCanned newResponseModal={newResponseModal} setModal={setModal} />
      {/**New Canned Response Modal */}
      <div
        ref={modRef}
        className={`absolute bottom-2 z-[999] ${
          tooltipPosition === "[9.4rem]" ? "left-[-9.4rem]" : "left-[-0.7rem]"
        } w-[23rem] h-[23rem] pb-[2.9rem] ${
          showCanned ? "group-hover:flex" : "group-hover:hidden"
        } hidden`}
      >
        <div
          className={`rounded bg-slate-50 dark:bg-slate-700 z-[9999] border border-slate-400 dark:border-slate-600  w-full h-full shadow-2xl drop-shadow-2xl grid grid-rows-6 relative after:absolute after:contents-[''] after:h-5 after:w-5 after:bg-inherit after:border after:border-inherit after:border-l-transparent after:border-t-transparent after:bottom-[-0.65rem] ${
            position === 4 ? "after:left-[9.7rem]" : "after:left-5"
          } after:rotate-45 p-2 relative`}
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
                className="outline-none focus:outline-none h-9 w-14 text-xs tracking-wide font-medium bg-indigo-700 hover:opacity-80 transition-all duration-200 text-white flex justify-center items-center rounded-sm"
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
            <ul className="mt-1 h-[15rem] w-full p-2 space-y-1 overflow-hidden overflow-y-scroll dark:text-slate-300 text-slate-700 text-xs font-semibold ">
              {allCannedRes.length >= 1 &&
                allCannedRes.map((template, index) => {
                  return (
                    <li
                      onClick={() => {
                        setReply((prev: any) => ({
                          ...prev,
                          message: template.message,
                        }));
                        onChange((prev: any) => prev + template.message);
                        setCanned(false);
                      }}
                      className={`capitalize hover:opacity-80 border-b border-slate-300 dark:border-slate-600 p-1 pr-4 overflow-hidden overflow-ellipsis whitespace-nowrap h-10 cursor-pointer relative w-full flex items-center text-xs font-sans font-medium cannedResponseList ${
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
                      <div className="absolute right-0 flex items-center space-x-2">
                        <div
                          className={`${
                            template?.scope === "public" ? "hidden" : ""
                          }`}
                        >
                          <abbr title="Move to public">
                            <button
                              type="button"
                              onClick={() => {
                                newPublicCannedRes(
                                  template?.name,
                                  template?.message
                                );
                                deleteCannedRes(template.id, user[0]?.id);
                                dispatch(
                                  updateAlert([
                                    ...alerts,
                                    {
                                      message: "Moved to public",
                                      color: "bg-green-200",
                                      id: new Date().getTime(),
                                    },
                                  ])
                                );
                              }}
                              className="hidden outline-none fucus:outline-none text-indigo-600 border border-indigo-600 h-8 w-8 rounded bg-white dark:bg-slate-800 justify-center items-center shadow-lg"
                            >
                              <BiRightArrowAlt className="text-lg" />
                            </button>
                          </abbr>
                        </div>
                        <button
                          type="button"
                          disabled={
                            template?.scope === "public" &&
                            user[0]?.access !== "admin"
                              ? true
                              : false
                          }
                          onClick={() => {
                            if (template?.scope === "public") {
                              deletePublicCannedRes(template.id);
                            } else {
                              deleteCannedRes(template.id, user[0]?.id);
                            }
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
                          className="hidden outline-none fucus:outline-none text-red-500 border border-red-400 h-8 w-8 rounded bg-white dark:bg-slate-800 justify-center items-center shadow-lg disabled:cursor-not-allowed disabled:opacity-80"
                        >
                          <BiTrash />
                        </button>
                      </div>
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
    </>
  );
};

export default CannedResponses;
