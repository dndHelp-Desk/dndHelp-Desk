import { FC } from "react";
import { BiCollection, BiMicrophone, BiChevronDown } from "react-icons/bi";
import TextEditor from "./TextEditor";
import CannedResponses from "../Macros/CannedResponses";
import HintTooltip from "../../../Components/HintTooltip";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

type Props = {
  setReply: any;
  value: any;
  onChange: any;
  setUploadStatus: any;
  sendReply: any;
  setFile: any;
  statusSelectionRef: any;
  firstMessage: any;
  reply:any;
};

const Reply: FC<Props> = ({
  setReply,
  value,
  onChange,
  setUploadStatus,
  sendReply,
  setFile,
  statusSelectionRef,
  firstMessage,
  reply,
}) => {
  const user = useSelector((state: RootState) => state.UserInfo.member_details);

  //Component ================
  return (
    <div className="min-h-[11rem] max-h-[15rem] w-full flex items-center justify-center dark:bg-slate-800 bg-white pb-2">
      <div className="h-[90%] w-[95%] relative rounded-sm dark:bg-slate-750 bg-slate-100 border border-slate-400 dark:border-slate-700 hover:border-slate-600 dark:hover:border-slate-500 transion-all shadow-lg">
        <form
          onSubmit={(e) => sendReply(e)}
          className="w-full h-full bg-transparent rounded-lg flex flex-col justify-between overflow-hidden z-[999] pt-0"
        >
          <div className="w-full h-[78%] overflow-hidden">
            <div className="h-full w-full bg-transparent rounded resize-none text-sm dark:text-slate-400 text-slate-700 transition-all  dark:placeholder:text-slate-600 placeholder:text-slate-500 placeholder:text-sm overflow-hidden pt-0">
              <TextEditor
                setReply={setReply}
                value={value}
                onChange={onChange}
                setUploadStatus={setUploadStatus}
              />
            </div>
          </div>
          {/**Reply options ======================= */}
          <div className="h-[2.8rem] p-[0.15rem] px-[0.23rem] w-full flex justify-between items-center">
            <div className="h-full flex items-center pr-[0.10rem]">
              {/**Canned Response ========================================= */}
              <div className="w-8 h-8 group rounded-l-sm bg-white dark:bg-[#182235] border border-r-0 border-slate-400 dark:border-slate-700 flex justify-center items-center text-base  text-slate-700 dark:text-slate-400">
                <div className="relative group">
                  <div className="h-full w-full flex items-center justify-center outline-none focus:outline-none">
                    <BiCollection className="text-base hover:opacity-80" />
                  </div>
                </div>
                <CannedResponses
                  setReply={setReply}
                  onChange={onChange}
                  position={0.7}
                  tooltipPosition={5}
                />
              </div>
              {/**Upload Recordings ========================================= */}
              <div className="relative group">
                <HintTooltip
                  details={"Upload an audio"}
                  positions={{
                    horizontal: `left-[0%]`,
                    vertical: `top-[-115%]`,
                  }}
                />
                <label
                  htmlFor="replyRecording"
                  className={`w-8 h-8 border ${
                    user[0]?.access === "client" ? "rounded-r-sm" : "border-r-0"
                  } bg-white dark:bg-[#182235]  border-slate-400 dark:border-slate-700 flex justify-center items-center text-base outline-none focus:outline-none hover:opacity-80 text-slate-700 dark:text-slate-400 cursor-pointer`}
                >
                  <BiMicrophone className="text-base" />
                  <input
                    type="file"
                    id="replyRecording"
                    accept=".wav"
                    name="replyRecording"
                    title="Upload Recording"
                    onChange={(e) => {
                      let target: any = e.target; //<-- This (any) will tell compiler to shut up!
                      let content: any = target.files[0];
                      setFile(content);
                    }}
                    className="outline-none focus:outline-none hidden"
                  />
                </label>
              </div>
              {/**Change Status ========================================= */}
              <div className="h-8 relative group">
                <HintTooltip
                  details={"Change Status"}
                  positions={{
                    horizontal: `right-0`,
                    vertical: `top-[-115%]`,
                  }}
                />
                <select
                  ref={statusSelectionRef}
                  onChange={(e) => {
                    setReply({ ...reply, status: e.target.value });
                  }}
                  required
                  className={`w-24 md:w-28 h-8 rounded-r-sm bg-white dark:bg-[#182235] border border-slate-400 dark:border-slate-700 justify-center items-center outline-none focus:outline-none focus:ring-0 hover:opacity-80 text-slate-800 dark:text-slate-400 text-xs font-semibold dark:font-medium capitalize ${
                    user[0]?.access === "client" ? "hidden" : "flex"
                  }`}
                >
                  <option
                    className="p-2"
                    value={firstMessage[0]?.status || "Status"}
                  >
                    {firstMessage[0]?.status || "Status"}
                  </option>
                  <option className="p-2" value="open">
                    open
                  </option>
                  <option className="p-2" value="on hold">
                    on hold
                  </option>
                  <option className="p-2" value="solved">
                    solved
                  </option>
                  <option className="p-2" value="reopened">
                    reopened
                  </option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center h-8 py-1 rounded-sm text-slate-100 bg-slate-800 dark:bg-blue-700 shadow-lg">
                <button
                  type="submit"
                  className="h-full outline-none focus:outline-none rounded-sm text-lg p-2 px-4 font-medium  text-slate-100 bg-slate-800 dark:bg-blue-700 z-[9] flex items-center space-x-1 hover:opacity-80 transition-all  disabled:cursor-not-allowed disabled:opacity-80"
                >
                  <span className="text-xs capitalize">Send now</span>
                </button>
                <div className="h-full flex items-center relative group">
                  <button
                    type="button"
                    className="h-[80%] px-2 bg-inherit text-inherit border-0 outline-none focus:outline-none border-l border-slate-400 hover:opacity-80 transition-all  disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    <BiChevronDown className="text-lg" />
                  </button>
                  <HintTooltip
                    details={"Schedule for later"}
                    positions={{
                      horizontal: `right-0`,
                      vertical: `top-[-170%]`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/**Slash Command Canned Responses Results ==== */}
        <div className="absolute left-8 top-11 z-[9999] h-7 w-fit p-1 px-2 rounded-full bg-white dark:bg-slate-800 border border-slate-400 dark:border-slate-600 italic text-xs text-slate-700 dark:text-slate-300 hidden jflex justify-center items-center cursor-pointer">
          Late delivery
        </div>
        {/**Slash Command Canned Responses Results ==== */}
      </div>
    </div>
  );
};

export default Reply;
