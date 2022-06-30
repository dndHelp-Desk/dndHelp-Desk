import { FC, useState } from "react";
import { BiChevronRight, BiSearchAlt, BiBookOpen } from "react-icons/bi";
import useClickOutside from "../Custom-Hooks/useOnClickOutsideRef";
import lightLogoShort from "../Assets/logos/dndHelp-desk_ShortLight.webp";

const Help: FC = () => {
  const [chatStatus, setChat] = useState<boolean>(false);
  const closeChatRef = useClickOutside(() => {
    setChat(false);
  });

  //component ====================
  return (
    <div
      ref={closeChatRef}
      className={`${
        chatStatus === true
          ? "h-[30rem] w-[22rem] bg-slate-700"
          : "cursor-pointer hover:bg-slate-800 bg-indigo-700 h-14 w-20"
      } group transition-all flex rounded  fixed right-2 bottom-6 justify-center items-center shadow-2xl drop-shadow-2xl z-[999] ${
        chatStatus ? "after:hidden" : ""
      } after:contents-[''] after:absolute after:bottom-[-0.5rem] after:h-5 after:w-5 after:bg-inherit after:rotate-45 after:hover:bg-inherit`}
    >
      <img
        src={lightLogoShort}
        alt="logo"
        className={`h-9 w-9 rotate-[-12deg] group-hover:rotate-0 transition-all object-cover object-center z-[999]  ${
          chatStatus ? "hidden" : "flex"
        }`}
      />
      {/**Open Chat =========================================== */}
      <div
        onClick={() => setChat(true)}
        className={`h-full w-full absolute bg-transparent z-[999] rounded ${
          chatStatus === true ? "hidden" : "flex"
        }`}
      ></div>
      <div
        className={`${
          chatStatus ? "" : "hidden"
        } h-full w-full relative flex flex-col justify-between overflow-hidden z-[99]rounded`}
      >
        {/**Close Chat ==================================== */}
        <button
          onClick={() => setChat(false)}
          className="outline-none focus:outline-none absolute top-2 right-2 z-[9999] bg-slate-700 h-5 w-5 flex justify-center items-center rounded-sm text-slate-100 font-bold hover:opacity-80 transition-all"
        >
          <span className="mb-[0.15rem]">&times;</span>
        </button>

        {/***Contents =================================== */}
        <div className="h-full w-full rounded overflow-hidden z-[999]">
          <div className="w-full h-[10rem] bg-slate-400 p-6">
            <h1 className="text-2xl font-semibold text-slate-900 font-sans">
              Welcome to support
            </h1>
          </div>

          {/***FAQ Get Started =============== */}
          <div className="m-auto mt-[-5rem] w-[90%] h-[24rem] rounded flex flex-col justify-between overflow-hidden space-y-4 shadow-2xl drop-shadow-2xl">
            <div className="w-full h-[20rem] rounded bg-slate-200">
              <div className="w-full h-16 border-b bg-slate-300 px-4 pt-2 relative">
                <h2 className="text-base font-semibold font-sans text-slate-800">
                  Have questions ?
                </h2>
                {/**Search Question */}
                <label
                  htmlFor="search"
                  className="absolute h-10 w-[80%] left-[10%] top-[70%] bg-slate-200 rounded border border-slate-400  overflow-hidden"
                >
                  <input
                    type="search"
                    placeholder="Search for help"
                    className="w-full h-full outline-none focus:outline-none border-0 text-sm text-slate-800 p-2 pr-6"
                  />
                  <BiSearchAlt className="absolute top-3 right-2 text-inherit" />
                </label>

                {/***Questions List =============== */}
                <h3 className="text-xs text-slate-500 font-semibold font-sans mt-16">
                  Suggested articles
                </h3>
                <ul className="w-full h-[11.5rem] mt-2 overflow-hidden overflow-y-scroll p-1 px-2 space-y-2">
                  <li className="hover:bg-slate-50 transition-all cursor-pointer  font-medium min-h-9 w-full rounded-sm bg-slate-300 text-xs capitalize text-slate-800 p-2 px-4 flex items-center space-x-4">
                    <BiBookOpen className="text-base" />
                    <span>What is a help desk ?</span>
                  </li>
                  <li className="hover:bg-slate-50 transition-all cursor-pointer  font-medium min-h-9 w-full rounded-sm bg-slate-300 text-xs capitalize text-slate-800 p-2 px-4 flex items-center space-x-4">
                    <BiBookOpen className="text-base" />
                    <span>How do I set up my account ?</span>
                  </li>
                  <li className="hover:bg-slate-50 transition-all cursor-pointer  font-medium min-h-9 w-full rounded-sm bg-slate-300 text-xs capitalize text-slate-800 p-2 px-4 flex items-center space-x-4">
                    <BiBookOpen className="text-base" />
                    <span>Is my data secure ?</span>
                  </li>
                </ul>
              </div>
            </div>

            {/**Contact Us ============================== */}
            <button className="w-full h-[3rem] rounded bg-slate-200 flex justify-between items-center p-4 outline-none focus:outline-none text-slate-800 text-base font-semibold font-sans hover:bg-slate-300 transition-all">
              <span>Contact us</span>
              <BiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
