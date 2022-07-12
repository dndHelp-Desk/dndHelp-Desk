import { FC } from "react";
import useOnClickOutside from "../../../Custom-Hooks/useOnClickOutsideRef";

type Props = {
  setDetails: any;
  showDetails: any;
  firstMessage: any;
};

const Details: FC<Props> = ({ showDetails, setDetails, firstMessage }) => {
  //Hide Details OnClick Outside ===
  const closeDetails = useOnClickOutside(() => {
    setDetails(false);
  }, "button");

  //Component ====================
  return (
    <div
      ref={closeDetails}
      className={`fixed top-0 bottom-0 z-[9999] flex justify-center h-full dark:bg-[#1e293bee] bg-slate-50 backdrop-blur-sm shadow-2xl  pt-28 p-4 ${
        showDetails === true ? "w-fit ml-0 right-0" : "right-[-300%] w-0"
      } transition-all`}
    >
      {/**Close Details ======= */}
      <button
        onClick={() => setDetails(false)}
        className="absolute  top-2 left-2 h-5 w-5 rounded flex items-center justify-center dark:bg-slate-700  bg-slate-200 hover:bg-red-300 dark:hover:bg-red-500 transition-all outline-none focus:outline-none dark:text-slate-300 text-slate-700 text-sm border-2 border-slate-500 dark:border-slate-500 cursor-pointer"
      >
        &times;
      </button>
      {/**Close Details ======= */}
      <div
        className={`h-full flex flex-col items-center gap-2 ${
          showDetails ? "w-[20rem]" : "w-0"
        } transition-all`}
      >
        <div
          className={`${
            showDetails ? "flex" : "hidden"
          } w-full p-2 flex-col space-y-2 justify-center items-center"`}
        >
          <div className="h-10 w-10 m-auto rounded dark:bg-slate-600 bg-slate-400 overflow-hidden flex items-center justify-center dark:text-slate-300 text-slate-50 font-bold text-xl">
            {firstMessage && firstMessage[0]?.recipient_name?.charAt(0)}
          </div>
          <div className="text-center w-full capitalize">
            <h2 className="dark:text-slate-300 text-slate-800 font-semibold text-xs">
              {firstMessage && firstMessage[0]?.recipient_name}
            </h2>
            <h3 className="dark:text-slate-300 text-slate-800 font-semibold text-xs">
              {firstMessage && firstMessage[0]?.branch_company}
            </h3>
          </div>
        </div>
        <ul
          className={`${
            showDetails ? "" : "hidden"
          } last:w-full mt-2 dark:text-slate-300 text-slate-800 space-y-4 capitalize`}
        >
          <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-400/10">
            <b className="hidden sm:flex">Assigned To</b>
            {firstMessage && firstMessage[0]?.agent_name}
          </li>
          <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-400/10">
            <b className="hidden sm:flex">Open Date</b>
            {firstMessage[0]?.date
              ? new Date(firstMessage[0]?.date).toLocaleString()
              : "No Date"}
          </li>
          <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-400/10">
            <b className="hidden sm:flex">Status</b>
            {firstMessage && firstMessage[0]?.status}
          </li>
          <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-400/10">
            <b className="hidden sm:flex">Priority</b>
            {firstMessage && firstMessage[0]?.priority}
          </li>
          <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-400/10">
            <b className="hidden sm:flex">Company</b>
            {firstMessage && firstMessage[0]?.branch_company}
          </li>
          <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-400/10">
            <b className="hidden sm:flex">First Contact Resolution</b>
            {firstMessage && firstMessage[0]?.fcr}{" "}
          </li>
          <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-400/10">
            <b className="hidden sm:flex">Customer's Name</b>
            {firstMessage && firstMessage[0]?.complainant_name}{" "}
          </li>
          <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-400/10">
            <b className="hidden sm:flex">Customer's Number</b>
            {firstMessage && firstMessage[0]?.complainant_number}{" "}
          </li>
          <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-400/10">
            <b className="hidden sm:flex">Customer's Email</b>
            <span className="lowercase">
              {firstMessage && firstMessage[0]?.complainant_email}{" "}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Details;
