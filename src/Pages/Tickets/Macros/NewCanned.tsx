import { FC, useEffect, useState, useRef } from "react";
import { RichTextEditor } from "@mantine/rte";
import { BiDetail } from "react-icons/bi";
import useOnClickOutside from "../../../Custom-Hooks/useOnClickOutsideRef";
import {
  newCannedRes,
  newPublicCannedRes,
} from "../../../Adapters/Data_Fetching/TicketsnUserData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import { updateAlert } from "../../../Redux/Slices/NotificationsSlice";

type Props = {
  newResponseModal: boolean;
  setModal: any;
};

const NewCanned: FC<Props> = ({ newResponseModal, setModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const scopeSelectionRef = useRef<HTMLSelectElement>(null);
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [value, onChange] = useState<string>("<p></p>");
  const modalRef = useOnClickOutside(() => {
    setModal(false);
    document.body.style.overflow = "";
  });
  const [input, setInput] = useState({
    name: "",
    message: "",
    scope: "private",
  });

  useEffect(() => {
    setInput((previous: any) => ({ ...previous, message: value }));
  }, [value]);

  //Save New Canned Response =========
  const openNew = () => {
    if (input?.name.length >= 1 && input?.message?.length >= 9) {
      if (input.scope === "private") {
        newCannedRes(user[0]?.id, input?.name, input?.message);
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Macro added succesfully",
              color: "bg-green-200",
              id: new Date().getTime(),
            },
          ])
        );
        setInput({
          name: "",
          message: "",
          scope: "private",
        });
        setModal(false);
        //Reset Scope Selection ==================
        onChange("<p></p>");
        if (scopeSelectionRef && scopeSelectionRef.current) {
          scopeSelectionRef.current.selectedIndex = 0;
        }
        document.body.style.overflow = "";
      } else if (input.scope === "public") {
        newPublicCannedRes(input?.name, input?.message);
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Macro added succesfully",
              color: "bg-green-200",
              id: new Date().getTime(),
            },
          ])
        );
        setInput({
          name: "",
          message: "",
          scope: "private",
        });
        setModal(false);
        //Reset Scope Selection ==================
        onChange("<p></p>");
        if (scopeSelectionRef && scopeSelectionRef.current) {
          scopeSelectionRef.current.selectedIndex = 0;
        }
        document.body.style.overflow = "";
      }
    } else {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Please fill all the details",
            color: "bg-yelow-200",
            id: new Date().getTime(),
          },
        ])
      );
    }
  };

  //Component
  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 z-[9999] ${
        newResponseModal ? "" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        id="newCannedResponse"
        className={`m-auto mt-24 drop-shadow-2xl bg-slate-50 dark:bg-slate-800 rounded h-[60vh] min-h-[30rem] min-w-[35rem] w-[50vw] flex flex-col space-y-4 p-4 border border-slate-200 dark:border-slate-700 transition-all duration-300 z-[999] relative`}
      >
        {/**Close Modal Btn */}
        <button
          type="button"
          onClick={() => {
            setModal(false);
            document.body.style.overflow = "";
          }}
          className="absolute top-1 right-1 bg-inherit transition-all duration-200 dark:text-slate-100 text-slate-800 text-lg rounded-sm h-5 w-5 flex justify-center items-center outlinenone focus:outline-none z-[999]"
        >
          <span>&times;</span>
        </button>
        {/**Close Modal Btn */}

        <h2 className="text-center text-lg tracking-wide font-semibold dark:text-slate-300 text-slate-800">
          Create new canned response
        </h2>

        <div className="flex justify-between items-center gap-4 h-11 overflow-hidden mt-4">
          <div className="h-full w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="nope"
              placeholder="Name ..."
              onChange={(e) => {
                setInput({ ...input, name: e.target.value });
              }}
              value={input.name}
              className="bg-transparent w-full h-full rounded-sm dark:border-slate-700 border-slate-400 outline-none focus:outline-none focus:ring-0 text-sm px-4 pl-11 placeholder:text-slate-500 text-slate-800 dark:text-slate-300 dark:bg-slate-800 bg-slate-50"
            />
            <BiDetail className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <select
            ref={scopeSelectionRef}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, scope: e.target.value }));
            }}
            className="h-full bg-inherit rounded-sm border dark:border-slate-700 border-slate-400 text-sm font-semibold dark:text-slate-400 text-slate-700"
            name="scope"
            id="scope"
          >
            <option value="private">Private Scope</option>
            <option value="public">Public Scope</option>
          </select>
          <button
            type="button"
            onClick={openNew}
            className="h-full m-auto px-4 p-2 rounded-sm outline-none focus:outline-none bg-indigo-600 text-slate-100 text-sm font-medium whitespace-nowrap"
          >
            Create new
          </button>
        </div>
        <div className="min-h-[10rem] w-full">
          <RichTextEditor
            value={value}
            onChange={onChange}
            id=""
            className="h-full w-full border-0 bg-inherit text-inherit rounded-none relative overflow-hidden"
            classNames={{
              toolbar:
                "bg-white dark:bg-slate-800 flex justify-center items-center  flex-nowrap w-full text-slate-700 dark:text-slate-400 border-b border-slate-300 dark:border-slate-700 rounded-none sticky p-0  overflow-hidden",
              toolbarInner:
                "bg-slate-100 dark:bg-[#182235] text-inherit border-b border-slate-300 dark:border-slate-700 w-full h-[3.25rem] flex justify-center flex-nowrap overflow-hidden py-1",
              toolbarGroup:
                "bg-inherit text-inherit border-0 border-slate-300 dark:border-slate-600 rounded-sm flex justify-between w-full",
              toolbarControl:
                "bg-inherit text-inherit border-0  dark:hover:bg-slate-600 hover:bg-white rounded-sm",
              root: "replyEditor h-full min-h-[20rem] py-0 pl-0 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar bg-white dark:bg-slate-800",
            }}
            controls={[
              [
                "bold",
                "italic",
                "h1",
                "h2",
                "underline",
                "code",
                "blockquote",
                "unorderedList",
                "orderedList",
                "strike",
                "alignLeft",
                "alignCenter",
                "alignRight",
                "link",
              ],
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default NewCanned;
