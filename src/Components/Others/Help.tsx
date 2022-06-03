import { FC, useState } from "react";
import { BsFillChatSquareTextFill, BsXSquareFill } from "react-icons/bs";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import lightLogo from "./images/dndHelp-Desk_Light.png";

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
          ? "h-[30rem] w-[22rem]"
          : "cursor-pointer hover:bg-slate-800 h-14 w-20"
      } transition-all flex bg-slate-900 rounded overflow-hidden fixed right-2 bottom-6 justify-center items-center shadow-2xl drop-shadow-2xl border-2 border-blue-600 z-[999]`}
    >
      <BsFillChatSquareTextFill
        className={`text-2xl text-slate-300 ${chatStatus ? "hidden" : "flex"}`}
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
        } h-full w-full relative flex flex-col justify-between`}
      >
        {/**Close Chat ==================================== */}
        <button
          onClick={() => setChat(false)}
          className="outline-none focus:outline-none absolute top-2 right-2 z-10"
        >
          <BsXSquareFill className="text-slate-300" />
        </button>
        {/***Logo =================================== */}
        <div className="h-10 m-auto bg-slate-900 flex justify-center items-center border-b border-slate-500">
          <img
            src={lightLogo}
            alt="logo"
            className="h-10 m-auto object-cover object-center"
          />
        </div>
        {/***Contents =================================== */}
        <form className="h-[25rem] w-[90%] m-auto border border-slate-800 rounded flex flex-col p-1">
          <div className="w-full h-[90%] rounded"></div>
          <textarea
            placeholder="Type here ...."
            className="w-full h-[10%] bg-slate-900 placeholder:text-xs placeholder:text-slate-300 text-slate-300 outline-none focus:outline-none focus:border-none border-slate-800 resize-none rounded"
          ></textarea>
        </form>
      </div>
    </div>
  );
};

export default Help;
