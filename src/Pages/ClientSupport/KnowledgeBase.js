import React, { useState } from "react";
import { BsSearch, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useSelector } from "react-redux";

const KnowledgeBase = () => {
  const frequentlyAsked = useSelector((state) => state.Tickets.frequentlyAsked);
  const [search, setSearch] = useState("");

  //Expand Accordion ========================================
  const [openAccordion, setAccordion] = useState({
    status: false,
    id: "",
  });

  //Frequenlty Asked Questions ========================
  const questions =
    frequentlyAsked.length >= 1 &&
    frequentlyAsked.map((question) => {
      return (
        <div
          key={question.id}
          className={`bg-slate-200 shadow rounded p-8 mt-8 ${
            question.question
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(search.toLowerCase().replace(/\s/g, "")) === true
              ? ""
              : "hidden"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold leading-none capitalize text-gray-800">
                {question.question}
              </h2>
            </div>
            <button
              onClick={() =>
                setAccordion({
                  ...openAccordion,
                  status: !openAccordion.status ? true : false,
                  id: question.id,
                })
              }
              data-menu
              className="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
            >
              {openAccordion.id === question.id &&
              openAccordion.status === true ? (
                <BsChevronUp />
              ) : (
                <BsChevronDown />
              )}
            </button>
          </div>
          <ul>
            <li>
              <p
                className={`text-base leading-normal text-gray-600 mt-4 lg:w-96 ${
                  openAccordion.id === question.id &&
                  openAccordion.status === true
                    ? ""
                    : "hidden"
                }`}
              >
                {question.answer}
              </p>
            </li>
          </ul>
        </div>
      );
    });

  //Component ==============================================
  return (
    <div>
      <div>
        <img
          src="https://i.ibb.co/DQ4FZhL/pattern-bg.png"
          alt="blue pattern background"
          className="absolute w-full h-64 md:h-96 object-center object-fit z-0"
        />
        <div className="relative flex flex-col items-center justify-center sm:px-0 px-6 z-20 pb-32">
          <div className="py-14 md:pt-40">
            <h1 className="xl:text-6xl md:text-5xl text-xl font-bold leading-10 text-slate-300">
              Frequently asked questions
            </h1>
            {/**Search ============================ */}
            <div className="flex bg-slate-300 w-[80%] max-w-[35rem] m-auto h-10 rounded-lg items-center mt-7 justify-center relative">
              <BsSearch className="absolute left-3 text-slate-500 font-semibold" />
              <input
                className="w-full bg-transparent border-2 focus:border-0 rounded-lg pl-10 focus:outline-none outline-none text-slate-500 focus:ring focus:ring-slate-500 transition-h duration-300"
                type="search"
                placeholder="Quick Search ..."
                id="search"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>
          <div className="lg:w-1/2 mt-[-2rem] md:w-8/12 sm:w-9/12 w-full">
            {questions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
