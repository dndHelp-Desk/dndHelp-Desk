import React, { useState } from "react";
import { BsFillChatSquareTextFill, BsXSquareFill } from "react-icons/bs";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import lightLogo from "./images/dndHelp-Desk_Light.png";

const Help = () => {
  const [chatStatus, setChat] = useState(false);
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
      } transition-all flex bg-slate-900 rounded-xl overflow-hidden fixed left-6 bottom-6 justify-center items-center shadow-2xl drop-shadow-2xl`}
    >
      <BsFillChatSquareTextFill
        className={`text-2xl text-slate-300 ${chatStatus ? "hidden" : "flex"}`}
      />
      {/**Open Chat =========================================== */}
      <div
        onClick={() => setChat(true)}
        className={`h-full w-full absolute bg-transparent z-[999] rounded-xl ${
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
          <BsXSquareFill className="text-slate-400" />
        </button>
        {/***Logo =================================== */}
        <div className="h-20 w-[95%] m-auto bg-slate-900 flex justify-center items-center border-b border-slate-500">
          <h2 className="text-2xl font-semibold text-slate-800 relative">
            <img
              src={lightLogo}
              alt="logo"
              className="w-[90%] h-[90%] m-auto object-cover object-center"
            />
          </h2>
        </div>
        {/***Contents =================================== */}
        <form className="h-[23rem] w-[90%] m-auto bg-slate-800 rounded-lg flex flex-col p-1">
          <div className="w-full h-[90%]"></div>
          <div className="w-full h-[10%] bg-slate-900 rounded-xl"></div>
        </form>
      </div>
    </div>
  );
};

export default Help;
