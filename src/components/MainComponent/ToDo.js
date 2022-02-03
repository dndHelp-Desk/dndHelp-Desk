import React, { useState } from "react";
import { BsCalendarPlusFill, BsCheck2All } from "react-icons/bs";
import { useSelector } from "react-redux"; //Firestore ===================
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";

// init services for firestore =========================
const db = getFirestore();

const ToDo = () => {
  const todoList = useSelector((state) => state.UserInfo.toDo);
  const member_details = useSelector((state) => state.UserInfo.member_details);
  let toDoRef = collection(db, `members/${member_details[0].id}/to-do`);

  //Update to-do List ===========================
  const markToDo = (id, state) => {
    let docRef = doc(db, `members/${member_details[0].id}/to-do`, id);
    updateDoc(docRef, {
      status: state,
    });
  };
  const handleChange = (e, id) => {
    markToDo(id, e);
  };

  //Add Task ==========================
  const addTask = (message, message_position, ticket_id) => {
    addDoc(toDoRef, {
      date: new Date().toISOString(),
      from: "agent",
      message: message,
      message_position: message_position,
      ticket_id: ticket_id,
    });
  };

  //Map Through Each Task =============================
  const tasks =
    todoList.length >= 1 &&
    todoList.map((task) => {
      return (
        <div
          key={task.id}
          className="h-14 w-full flex items-center justify-between space-x-2 rounded-lg bg-slate-800 p-2"
        >
          <label
            htmlFor="taskCkeckBox"
            className="cursor-pointer checked:bg-gray-50"
          >
            <input
              type="checkbox"
              name="taskCkeckBox"
              id="taskCkeckBox"
              className="hidden"
              onChange={(e) => {
                handleChange(e.target.checked, task.id);
                console.log(task.id);
              }}
            />
            <div
              className={`h-8 w-8 rounded-full border border-dashed transition-all duration-500 flex items-center justify-center ${
                task.status === true ? "border-blue-600" : "border-slate-400"
              } `}
            >
              <div
                className={`h-6 w-6 rounded-full transition-all duration-500 border flex items-center justify-center overflow-hidden ${
                  task.status === true ? "border-blue-600" : "border-slate-400"
                }`}
              >
                <BsCheck2All
                  className={`text-blue-700 font-bold ${
                    task.status === true ? "" : "hidden"
                  }`}
                />
              </div>
            </div>
          </label>
          <div className="h-full overflow-hidden">
            <p className="text-slate-400 w-[5rem] md:w-[10rem] lg:w-[7rem] 2xl:w-[10rem] text-sm whitespace-nowrap overflow-ellipsis overflow-hidden">
              <abbr title="Finish Document Review">{task.task}</abbr>
            </p>
            <small className="text-slate-500 text-xs font-semibold">
              {`${new Date(!task.date === "" && task.date).toDateString()}`}
            </small>
          </div>
          <div
            className={`h-6 border border-slate-700 flex items-center justify-center rounded-full px-2 text-xs  p-1 ${
              task.status === true
                ? "bg-[#4ef31c33] text-green-400"
                : "bg-slate-900 text-slate-400"
            }`}
          >
            {`${task.status === true ? "Completed" : "Pending"}`}
          </div>
        </div>
      );
    });

  //Component =============================================
  return (
    <div className="col-span-1 rounded-lg space-y-2">
      <div className="h-[17%] p-1 px-3 bg-slate-900 w-full rounded-lg flex justify-between items-center space-x-1">
        <div className="h-12 w-full bg-slate-800 rounded-lg relative">
          <label htmlFor="date">
            <button className="h-11 w-[3rem] border-l border-slate-700 absolute top-[4%] right-0 flex justify-center items-center outline-none focus:outline-none hover:text-blue-600 text-slate-400 transition-all">
              <BsCalendarPlusFill />
            </button>
            <input type="date" name="date" id="date" className="hidden" />
          </label>
          <input
            type="text"
            name="search"
            id="search"
            className="w-full h-full rounded-lg outline-none focus:outline-none bg-transparent border-slate-700 placeholder:text-sm text-slate-400"
            placeholder="Add New Task Here ..."
            autoComplete="off"
          />
        </div>
      </div>
      <div className="h-[81%] w-full bg-slate-900 rounded-lg p-4 space-y-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
        {tasks}
      </div>
    </div>
  );
};

export default ToDo;
