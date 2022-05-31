import { FC, useEffect, useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import { BiDetail } from "react-icons/bi";
import useOnClickOutside from "../../../Custom-Hooks/useOnClickOutsideRef";
import { newCannedRes } from "../../Data_Fetching/TicketsnUserData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import { updateAlert } from "../../../Redux/Slices/NotificationsSlice";

type Props = {
  newResponseModal: boolean;
  setModal: any;
};

const NewCanned: FC<Props> = ({
  newResponseModal,
  setModal,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [value, onChange] = useState<string>(
    "<p>Type your response here ...</p>"
  );
  const modalRef = useOnClickOutside(() => {
    setModal(false);
    document.body.style.overflow = "";
  });
  const [input, setInput] = useState({
    name: "",
    message: "",
  });

  useEffect(() => {
    setInput((previous: any) => ({ ...previous, message: value }));
  }, [value]);

  //Save New Canned Response =========
  const openNew = () => {
    if (input.name?.length >= 1) {
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
      setInput({ name: "", message: "<p>Type your template here ...</p>" });
      setModal(false);
      document.body.style.overflow = "";
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
      {/**Close Modal Btn */}
      <button
        type="button"
        onClick={() => {
          setModal(false);
          document.body.style.overflow = "";
        }}
        className="absolute top-4 right-4 bg-blue-700 hover:bg-red-600 transition-all duration-200 text-slate-100 text-sm rounded h-6 w-6 flex justify-center items-center outlinenone focus:outline-none z-[999]"
      >
        <span>x</span>
      </button>
      {/**Close Modal Btn */}

      <div
        ref={modalRef}
        id="newCannedResponse"
        className={`m-auto mt-24 drop-shadow-2xl bg-slate-50 dark:bg-slate-800 rounded h-[60vh] min-h-[30rem] min-w-[35rem] w-[50vw] flex flex-col space-y-4 p-4 border border-slate-200 dark:border-slate-700 transition-all duration-300 z-[999]`}
      >
        <div className="flex justify-between items-center gap-4 h-11 overflow-hidden">
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
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none focus:ring-0 text-sm px-4 pl-11 placeholder:text-slate-500 text-slate-800 dark:text-slate-300 dark:bg-slate-800 bg-slate-200"
            />
            <BiDetail className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <button
            type="button"
            onClick={openNew}
            className="h-full m-auto px-8 p-2 rounded outline-none focus:outline-none bg-blue-600 text-slate-100 text-sm font-medium"
          >
            Create
          </button>
        </div>
        <div className="h-[10rem] w-full">
          <RichTextEditor
            value={value}
            onChange={onChange}
            id=""
            className="h-full w-full border-0 bg-inherit text-inherit rounded-none relative overflow-hidden"
            classNames={{
              toolbar:
                "bg-white dark:bg-slate-800 flex justify-center items-center w-full text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700 rounded-none sticky p-0 pb-1 overflow-hidden",
              toolbarInner:
                "bg-inherit text-inherit border-slate-300 dark:border-slate-700",
              toolbarGroup:
                "bg-inherit text-inherit border-slate-300 dark:border-slate-700",
              toolbarControl:
                "bg-inherit text-inherit border-slate-300 dark:border-slate-700  dark:hover:bg-slate-700 hover:bg-slate-100",
              root: "replyEditor min-h-[6.5rem] py-2 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar bg-white dark:bg-slate-800 pt-1",
            }}
            controls={[
              [
                "bold",
                "italic",
                "underline",
                "code",
                "blockquote",
                "unorderedList",
                "orderedList",
                "h1",
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
