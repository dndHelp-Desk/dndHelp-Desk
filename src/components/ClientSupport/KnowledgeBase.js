// import React,{useState} from 'react'
// import { BsSearch } from "react-icons/bs";
// import { useSelector } from 'react-redux';
// 
// const KnowledgeBase = () => {
//   const frequentlyAsked = useSelector((state) => state.Tickets.frequentlyAsked);
//   const [search, setSearch] = useState("");
// 
//   //Frequenlty Asked Questions ========================
//   const questions =
//     frequentlyAsked.length >= 1 &&
//     frequentlyAsked.map((question) => {
//       return (
//         <div
//           key={question.id}
//           className={`bg-slate-600 rounded-lg w-full mt-3 custom-shadow py-4 px-4 text-base font-semibold text-slate-200 flex flex-col justify-between snap_child col-span-1 h-fit ${
//             question.question
//               .toLowerCase()
//               .replace(/\s/g, "")
//               .includes(search.toLowerCase().replace(/\s/g, "")) === true
//               ? ""
//               : "hidden"
//           }`}
//         >
//           <div className=" flex items-center">
//             <h3 className="capitalize">{question.question}</h3>
//           </div>
//           <p className="text-sm font-medium border-t text-slate-300 border-slate-500 p-1 capitalize">
//             {question.answer}
//           </p>
//         </div>
//       );
//     });
// 
// 	//Components
//   return (
//     <>
//       {/**Frequantly Asked Questions =============================== */}
//       <div className="min-h-[500px] 2xl:h-[80%] w-full flex flex-col items-center rounded-lg p-4 overflow-hidden">
//         <h2 className="text-2xl text-slate-600 font-sans font-semibold text-center underline">
//           Frequently Asked Questions
//         </h2>
// 
//         {/**Search ============================ */}
//         <div className="flex bg-slate-300 w-[80%] max-w-[35rem] m-auto h-10 rounded-lg items-center mt-8 justify-center relative">
//           <BsSearch className="absolute left-3 text-slate-500 font-semibold" />
//           <input
//             className="w-full bg-transparent border-2 focus:border-0 rounded-lg pl-10 focus:outline-none outline-none text-slate-500 focus:ring focus:ring-slate-500 transition-h duration-300"
//             type="search"
//             placeholder="Quick Search ..."
//             id="search"
//             name="search"
//             onChange={(e) => setSearch(e.target.value)}
//             value={search}
//           />
//         </div>
// 
//         {/**Questions ================================== */}
//         <div className="grid grid-cols-2 gap-4 py-3  overflow-y-scroll scroll-snap px-2 w-full  max-w-[50rem] max-h-[36.5rem]">
//           {questions}
//         </div>
//       </div>
//     </>
//   );
// }
// 
// export default KnowledgeBase

import React, { useState } from "react";
export default function KnowledgeBase() {
  const [box1, setBox1] = useState(false);
  const [box2, setBox2] = useState(false);
  const [box3, setBox3] = useState(false);
  const [box4, setBox4] = useState(false);

  return (
    <div>
      <div>
        <img
          src="https://i.ibb.co/DQ4FZhL/pattern-bg.png"
          alt="blue pattern background"
          class="absolute w-full h-64 md:h-96 object-center object-fit z-0"
        />
        <div class="relative flex flex-col items-center justify-center sm:px-0 px-6 z-20 pb-32">
          <div class="md:py-36 py-20">
            <h1
              class="xl:text-6xl md:text-5xl text-xl font-bold leading-10 text-white"
            >
              Frequently asked questions
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-8/12 sm:w-9/12 w-full">
            <div class="bg-white shadow rounded p-8">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-base font-semibold leading-none text-gray-800">
                    Why should I use your service?
                  </h2>
                </div>
                <button
                  onClick={() => setBox1(!box1)}
                  class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
                >
                  {box1 ? (
                    <svg
                      role="button"
                      aria-label="close dropdown"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 1L9 5"
                        stroke="#4B5563"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="10"
                      role="button"
                      aria-label="open dropdown"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="#4B5563"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {box1 && (
                <ul class="">
                  <li>
                    <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                      If you want to choose Pro or Business plan the you can use
                      all payments. You can pay from Paypal, Payoneer, Master
                      Card, Debit Card.
                    </p>
                  </li>
                </ul>
              )}
            </div>
            <div class="bg-white shadow rounded p-8 mt-8">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-base font-semibold leading-none text-gray-800">
                    What payment method I can use?
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setBox2(!box2);
                  }}
                  data-menu
                  class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
                >
                  {box2 ? (
                    <svg
                      role="button"
                      aria-label="close dropdown"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 1L9 5"
                        stroke="#4B5563"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="10"
                      role="button"
                      aria-label="open dropdown"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="#4B5563"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {box2 && (
                <ul>
                  <li>
                    <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                      If you want to choose Pro or Business plan the you can use
                      all payments. You can pay from Paypal, Payoneer, Master
                      Card, Debit Card.
                    </p>
                  </li>
                </ul>
              )}
            </div>
            <div class="bg-white shadow rounded p-8 mt-8">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-base font-semibold leading-none text-gray-800">
                    Is your service safe to use?
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setBox3(!box3);
                  }}
                  data-menu
                  class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
                >
                  {box3 ? (
                    <svg
                      role="button"
                      aria-label="close dropdown"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 1L9 5"
                        stroke="#4B5563"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="10"
                      role="button"
                      aria-label="open dropdown"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="#4B5563"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {box3 && (
                <ul>
                  <li>
                    <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                      If you want to choose Pro or Business plan the you can use
                      all payments. You can pay from Paypal, Payoneer, Master
                      Card, Debit Card.
                    </p>
                  </li>
                </ul>
              )}
            </div>
            <div class="bg-white shadow rounded p-8 mt-8">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-base font-semibold leading-none text-gray-800">
                    How to recover password?
                  </h2>
                </div>
                <button
                  onClick={() => setBox4(!box4)}
                  data-menu
                  class="focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ring-offset-white cursor-pointer"
                >
                  {box4 ? (
                    <svg
                      role="button"
                      aria-label="close dropdown"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 1L9 5"
                        stroke="#4B5563"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="10"
                      role="button"
                      aria-label="open dropdown"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="#4B5563"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {box4 && (
                <ul>
                  <li>
                    <p class="text-base leading-normal text-gray-600 mt-4 lg:w-96">
                      If you want to choose Pro or Business plan the you can use
                      all payments. You can pay from Paypal, Payoneer, Master
                      Card, Debit Card.
                    </p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
