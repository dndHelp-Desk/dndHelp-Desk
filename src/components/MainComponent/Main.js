import React, { useState } from "react";
import WelcomeSvg from "./images/welcome.svg";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Businnes from "./images/businnes.jpg";
import {
  BsCalendarPlusFill,
  BsCheck2All,
  BsArrowRightShort,
  BsDashSquare,
  BsCheckAll,
  BsArrowRepeat,
  BsEnvelopeOpen,
} from "react-icons/bs";

const Main = () => {
  const location = useLocation();
  let allTickets = useSelector((state) => state.Tickets.allTickets);

  const [demoArr, setDemoArr] = useState([
    { id: 1, task: "Finish document review", date: "", doneStatus: false },
    { id: 2, task: "Project Meeting", date: "", doneStatus: true },
    { id: 3, task: "Meet with Kacey M.", date: "", doneStatus: false },
    { id: 4, task: "Review final draft", date: "", doneStatus: false },
  ]);

  const handleChange = (e, id) => {
    setDemoArr(
      demoArr.map((item) => {
        return item.id === id && e === true
          ? { ...item, doneStatus: true }
          : item.id === id && e === false
          ? { ...item, doneStatus: false }
          : { ...item };
      })
    );
    console.log(id);
  };

  //Map Through Each Task =============================
  const tasks = demoArr.map((task) => {
    return (
      <div
        key={task.id}
        className="h-14 w-full flex items-center justify-between space-x-2 rounded-lg bg-slate-800 p-2"
      >
        <label
          htmlFor="taskCkeckBox"
          className="cursor-pointer checked:bg-gray-50"
          onClick={() => console.log(task.id)}
        >
          <input
            type="checkbox"
            name="taskCkeckBox"
            id="taskCkeckBox"
            className="hidden"
            onChange={(e) => handleChange(e.target.checked, task.id)}
          />
          <div
            className={`h-8 w-8 rounded-full border border-dashed transition-all duration-500 flex items-center justify-center ${
              task.doneStatus === true ? "border-blue-600" : "border-slate-400"
            } `}
          >
            <div
              className={`h-6 w-6 rounded-full transition-all duration-500 border flex items-center justify-center overflow-hidden ${
                task.doneStatus === true
                  ? "border-blue-600"
                  : "border-slate-400"
              }`}
            >
              <BsCheck2All
                className={`text-blue-700 font-bold ${
                  task.doneStatus === true ? "" : "hidden"
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
            at 11:00 AM
          </small>
        </div>
        <div
          className={`h-6 border border-slate-700 flex items-center justify-center rounded-full px-2 text-xs  p-1 ${
            task.doneStatus === true
              ? "bg-[#4ef31c33] text-green-400"
              : "bg-slate-900 text-slate-400"
          }`}
        >
          {`${task.doneStatus === true ? "Completed" : "Pending"}`}
        </div>
      </div>
    );
  });

  //Component ========================
  return (
    <div
      className={`${
        location.pathname === "/help-desk" ? "grid" : "hidden"
      } bg-slate-300 mt-[-2rem] absolute left-[9.5%] 2xl:left-[15%] z-0 rounded-xl w-[80%] 2xl:w-[70%] p-2 overflow-hidden`}
    >
      <div className="h-[40rem] grid grid-rows-3 gap-2">
        <div className="row-span-1 w-full bg-slate-900 rounded-lg grid grid-cols-3 overflow-hidden py-6 p-2 gap-1">
          <div
            style={{ backgroundImage: `url(${WelcomeSvg})` }}
            className="col-span-1 rounded-lg h-full w-full grid grid-rows-2 2xl:flex p-1 overflow-hidden bg-no-repeat bg-contain bg-center"
          ></div>
          {/** Online Members ==================================*/}
          <div className="col-span-1 grid grid-rows-2 overflow-hidden px-2">
            <div className="row-span-1 overflow-hidden">
              <h2 className="text-base font-bold text-slate-400 capitalize">
                Online Users
              </h2>
              <p className="text-thin text-slate-500 text-sm">
                You can click on the chat icon on your top right to chat with
                active members & share thoughts ideas.
              </p>
            </div>
            <div className="row-span-1 flex items-center space-x-1">
              <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center relative">
                <img
                  src="https://cutt.ly/1OxImPP"
                  alt="user"
                  className="object-center h-full w-full object-cover rounded-lg"
                />
                <span className="absolute top-[-.1rem] right-[-.1rem] h-[.6rem] w-[.6rem] rounded-full bg-green-500 border border-slate-900"></span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center relative">
                <img
                  src="https://cutt.ly/jOxI9s4"
                  alt="user"
                  className="object-center h-full w-full object-cover rounded-lg"
                />
                <span className="absolute top-[-.1rem] right-[-.1rem] h-[.6rem] w-[.6rem] rounded-full bg-green-500 border border-slate-900"></span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center relative">
                <img
                  src="https://cutt.ly/aOxUWV8"
                  alt="user"
                  className="object-center h-full w-full object-cover rounded-lg"
                />
                <span className="absolute top-[-.1rem] right-[-.1rem] h-[.6rem] w-[.6rem] rounded-full bg-green-500 border border-slate-900"></span>
              </div>
            </div>
          </div>
          {/**End Of Online Members ==================================*/}

          <div className="col-span-1 border-l border-slate-700 grid grid-rows-2 px-4 overflow-hidden">
            <div className="row-span-1 overflow-hidden">
              <h2 className="text-base font-bold text-slate-400 capitalize">
                contacts
              </h2>
              <p className="text-thin text-slate-500 text-sm">
                Make sure to add/check if your contact is saved before you open a new
                ticket.
              </p>
            </div>
            <div className="row-span-1 flex items-center space-x-1">
              <button className="bg-slate-800 rounded-lg text-slate-400 outline-none focus:outline-none focus:ring focus:ring-blue-600 hover:ring-1 ring-1 ring-slate-600 hover:ring-blue-600 text-xs font-bold h-10 px-4 transition-all duration-300">
                Manage Contacts
              </button>
            </div>
          </div>
        </div>
        {/**Bottom Half ================================ */}
        <div className="row-span-2 rounded-lg grid grid-cols-2 xl:grid-cols-3 gap-2">
          <div className="col-span-1 rounded-lg space-y-2">
            <div className="h-[17%] p-1 px-3 bg-slate-900 w-full rounded-lg flex justify-between items-center space-x-1">
              <div className="h-12 w-full bg-slate-800 rounded-lg relative">
                <button className="h-11 w-[3rem] border-l border-slate-700 absolute top-[4%] right-0 flex justify-center items-center outline-none focus:outline-none hover:text-blue-600 text-slate-400 transition-all">
                  <BsCalendarPlusFill />
                </button>
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
          <div className="col-span-1 grid grid-rows-5 bg-slate-900 rounded-lg px-2">
            <div className="row-span-2 bg-no-repeat bg-center bg-contain border-b border-slate-700 flex flex-col justify-center items-center px-4">
              <h2 className="text-slate-400 text-2xl font-bold capitalize">
                Today's Sumary
              </h2>
              <p className="text-slate-500 text-center text-xs">
                To see more analytics please visit the reports page and you can
                also check the current progress or your tickets in tickets page.
              </p>
            </div>
            <div className="row-span-3 space-y-2 p-2">
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-lg bg-blue-700 flex justify-center items-center text-2xl">
                    <BsCheckAll />
                  </div>
                  <h5 className="text-slate-400 text-sm font-bold">Resolved</h5>
                </div>
                <h5 className="text-slate-400 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status.toLowerCase() === "resolved"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-lg bg-green-700 flex justify-center items-center text-xl">
                    <BsDashSquare />
                  </div>
                  <h5 className="text-slate-400 text-sm font-bold">Closed</h5>
                </div>
                <h5 className="text-slate-400 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status.toLowerCase() === "closed"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-lg bg-yellow-700 flex justify-center items-center text-xl">
                    <BsArrowRepeat />
                  </div>
                  <h5 className="text-slate-400 text-sm font-bold">Pending</h5>
                </div>
                <h5 className="text-slate-400 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status.toLowerCase() === "pending"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-lg bg-slate-500 flex justify-center items-center text-xl">
                    <BsEnvelopeOpen />
                  </div>
                  <h5 className="text-slate-400 text-sm font-bold">Open</h5>
                </div>
                <h5 className="text-slate-400 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status.toLowerCase() === "open"
                    ).length
                  }
                </h5>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-slate-900 rounded-lg hidden xl:grid grid-rows-2 overflow-hidden place-items-center">
            <img
              className="h-full w-full object-cover object-center rounded-t-md"
              src={Businnes}
              alt="business"
            />
            <div className="row-span-1 px-4 p-2 space-y-2 overflow-y-hidden">
              <h2 className="md:text-2xl text-lg text-slate-300 font-bold">
                Biggest Business Trends In 2022
              </h2>
              <p className="text-slate-400 text-sm">
                Here are the eight key trends every company will have to tackle
                in order to succeed.
              </p>
              <button className="bg-blue-600 outline-none focus:outline-none focus:ring focus:ring-blue-600 hover:ring-1 ring-1 ring-blue-400 hover:opacity-90 transition-all  text-sm text-slate-300 font-semibold px-4 py-2 rounded-lg">
                Read more <BsArrowRightShort className="inline text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
