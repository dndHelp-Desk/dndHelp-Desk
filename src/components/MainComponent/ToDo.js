import React, { useState } from "react";
import { BsCheck2All, BsFillTrashFill } from "react-icons/bs";
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
          className="h-14 w-full flex items-center justify-between space-x-2 rounded-xl bg-slate-800 p-2 snap_childTwo"
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
            <p className="text-slate-400 w-[5rem] md:w-[10rem] lg:w-[7rem] 2xl:w-[10rem] text-sm whitespace-nowrap overflow-ellipsis overflow-hidden">
              <abbr title={task.task}>{task.task}</abbr>
            </p>
            <small className="text-slate-500 text-xs font-semibold">
              {`${new Date(task.date).toDateString()}`}
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
          <BsFillTrashFill
            onClick={() => deleteTask(task.id)}
            className="text-slate-400 hover:text-red-500 cursor-pointer transition-all duration-300"
          />
        </div>
      );
    });

  //Component =============================================
  return (
    <div className="col-span-1 rounded-xl space-y-2">
      <form
        onSubmit={(e) => addTask(e)}
        className="h-[15%] p-1 px-3 bg-slate-900 w-full rounded-xl grid grid-cols-10 gap-1 place-content-center"
      >
        <div className="h-10 w-full col-span-6 bg-slate-800 rounded-xl relative overflow-hidden">
          <input
            type="text"
            name="search"
            id="search"
            required
            className="w-full h-full rounded-xl outline-none focus:outline-none bg-transparent border-slate-700 placeholder:text-sm text-slate-400"
            placeholder="Type Your Task Here ..."
            autoComplete="off"
            onChange={(e) => setTask(e.target.value)}
            value={taskName}
          />
        </div>
        <div className="col-span-2 h-10">
          <abbr title="Pick a date">
            <ToDODatePicker startDate={startDate} setStartDate={setStartDate} />
          </abbr>
        </div>
        <button
          type="submit"
          className="h-10 col-span-2 bg-blue-700 rounded-xl flex justify-center items-center outline-none focus:outline-none hover:bg-blue-800 text-slate-300 font-sans font-bold capitalize text-sm transition-all"
        >
          Add
        </button>
      </form>
      {/**Task List ===================== */}
      <div className="h-[22rem] w-full bg-slate-900 rounded-xl p-4 overflow-hidden">
        <div className="h-full w-full p-1 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap flex flex-col space-y-2">
          {tasks}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
