import React, { useState } from "react";
import {
  BsCheck2All,
  BsFillTrashFill,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import { useSelector } from "react-redux"; //Firestore ===================
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import ToDODatePicker from "./ToDoDatePicker";

// init services for firestore =========================
const db = getFirestore();

const ToDo = () => {
  const todoList = useSelector((state) => state.UserInfo.toDo);
  const member_details = useSelector((state) => state.UserInfo.member_details);
  let toDoRef = collection(db, `members/${member_details[0].id}/to-do`);
  const [startDate, setStartDate] = useState(null);
  const [taskName, setTask] = useState("");

  //Update to-do List ===========================
  const markToDo = (id, state) => {
    let docRef = doc(db, `members/${member_details[0].id}/to-do`, id);
    updateDoc(docRef, {
      status: state,
    });
  };

  // deleting Task ===========================
  const deleteTask = (id) => {
    const docRef = doc(db, `members/${member_details[0].id}/to-do`, id);
    deleteDoc(docRef);
  };

  //Add Task ==========================
  const addTask = (e) => {
    e.preventDefault();
    startDate &&
      addDoc(toDoRef, {
        date: startDate.toLocaleDateString(),
        task: taskName,
        status: "pending",
      });
    setTask("");
  };

  //Map Through Each Task =============================
  const tasks =
    todoList.length >= 1 &&
    todoList.map((task) => {
      return (
        <div
          key={task.id}
          className="h-14 w-full flex items-center justify-between space-x-2 rounded-lg dark:bg-slate-800 bg-slate-100 border dark:border-0 border-slate-300 p-2 snap_childTwo"
        >
          <button
            onClick={() => markToDo(task.id, task.status ? false : true)}
            className={`h-8 w-8 rounded-full border border-dashed transition-all duration-500 flex items-center justify-center focus:outline-none outline-none hover:border-blue-600 ${
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
          </button>
          <div className="h-full overflow-hidden">
            <p className="dark:text-slate-400 text-slate-500 w-[12rem] lg:w-[11rem] 2xl:w-[12rem] text-sm whitespace-nowrap overflow-ellipsis overflow-hidden">
              <abbr title={task.task}>{task.task}</abbr>
            </p>
            <small className="text-slate-500 text-xs font-semibold">
              {`${new Date(task.date).toDateString()}`}
            </small>
          </div>
          <BsFillTrashFill
            onClick={() => deleteTask(task.id)}
            className="dark:text-slate-400 text-slate-400 dark:hover:text-red-500 hover:text-red-500 cursor-pointer transition-all duration-300"
          />
        </div>
      );
    });

  //Component =============================================
  return (
    <div className="col-span-1 h-[26rem] rounded-xl flex flex-col justify-between space-y-2 relative">
      <form className="h-[15%] p-2 dark:bg-slate-900  bg-slate-100 w-full rounded-xl gap-1 items-center place-content-center">
        <div className="h-full flex items-center w-full col-span-8 dark:bg-slate-800 bg-slate-200 rounded-lg border dark:border-0 border-slate-300 overflow-hidden">
          <input
            type="text"
            name="search"
            id="search"
            required
            className="w-full h-full outline-none focus:outline-none bg-transparent border-0 placeholder:text-sm placeholder:text-slate-500 dark:text-slate-400 text-slate-500"
            placeholder="Type here ..."
            autoComplete="off"
            onChange={(e) => setTask(e.target.value)}
            value={taskName}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                addTask(e);
              }
            }}
          />
          <abbr title="Pick a date">
            <ToDODatePicker startDate={startDate} setStartDate={setStartDate} />
          </abbr>
          <button type="submit" className="px-[15px] h-full p-2 text-sm uppercase font-bold font-sans dark:text-slate-300 text-slate-500 outline-none focus:outline-none bg-transparent hover:opacity-90 transition-all">
            Add
          </button>
        </div>
      </form>
      {/**Task List ===================== */}
      <div className="h-[83%] max-h-[22rem] w-full dark:bg-slate-900 bg-slate-100 rounded-xl p-4 overflow-hidden">
        <div className="h-full w-full p-1 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap flex flex-col space-y-2">
          {todoList.length >= 1 && tasks}
          {todoList.length <= 0 && (
            <>
              <h2 className="dark:text-slate-400 text-slate-500 font-semibold font-sans text-lg mt-[35%] rotate-[-10deg] flex space-x-2 items-center justify-center">
                There's no pending task,
              </h2>
              <h2 className="dark:text-slate-400 text-slate-500 font-semibold font-sans text-2xl rotate-[-10deg] flex space-x-2 items-center justify-center">
                <span>You All Caught Up</span>{" "}
                <BsFillHandThumbsUpFill className="inline text-yellow-400" />
              </h2>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
