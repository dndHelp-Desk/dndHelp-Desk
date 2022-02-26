import React, { useState } from "react";
import { BsFillChatSquareTextFill, BsXSquareFill } from "react-icons/bs";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";

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
          ? "h-[20rem] w-[15rem]"
          : "cursor-pointer hover:bg-slate-800 h-14 w-20"
      } transition-all hidden md:flex bg-slate-900 rounded-xl fixed left-6 bottom-6 justify-center items-center`}
    >
      <BsFillChatSquareTextFill
        className={`text-2xl text-slate-300 animate-pulse ${
          chatStatus ? "hidden" : "flex"
        }`}
      />
      <div
        onClick={() => setChat(true)}
        className={`h-full w-full absolute bg-transparent z-[999] rounded-xl ${
          chatStatus === true ? "hidden" : "flex"
        }`}
      ></div>
      <div className={`${chatStatus ? "" : "hidden"} h-full w-full relative`}>
        <BsXSquareFill
          onClick={() => setChat(false)}
          className="text-slate-300 absolute top-2 right-2 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Help;
