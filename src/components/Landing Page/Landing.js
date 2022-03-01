import React from "react";
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineLightBulb,
  HiOutlineChatAlt2,
  HiOutlineCursorClick,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import WallImg from "./images/wall.svg";
import HeroImg from "./images/Hero.png";

const Landing = () => {
  //Component =========================
  return (
    <div>
      <section>
        <div
          style={{ backgroundImage: `url(${WallImg})` }}
          className="w-full min-h-screen bg-no-repeate bg-center bg-cover relative pb-10 px-6"
        >
          <nav
            aria-label="Main"
            className="hidden relative z-10 w-full md:flex justify-between items-center py-10 2xl:py-20"
          >
            <div className="w-1/6">
              {/**Logo ==================== */}
              <svg
                className="stroke-slate-800 text-[2rem] font-sans fill-transparent hidden lg:flex"
                width="250"
                height="50"
                viewBox="0 0 200 50"
              >
                <text x="0" y="35">
                  <tspan className="stroke-[3.5px] fill-slate-500">dnd</tspan>
                  <tspan
                    className="stroke-[2px] stroke-slate-500  fill-slate-500"
                    x="53"
                    y="35"
                  >
                    Help-Desk
                  </tspan>
                </text>
              </svg>
            </div>
            <div className="w-5/6">
              <div className="flex items-center justify-end">
                <ul className="text-gray-800 lg:space-x-8 flex items-center leading-none font-semibold">
                  <li>
                    <NavLink
                      to=""
                      className="hover:text-blue-500 text-lg focus:text-blue-500"
                    >
                      Services
                    </NavLink>
                  </li>
                  <li className="ml-4 hover:text-blue-500 ">
                    <NavLink to="" className="focus:text-blue-500 text-lg">
                      Demo
                    </NavLink>
                  </li>
                  <li className="ml-4 hover:text-blue-500 focus:text-blue-500">
                    <NavLink to="" className="focus:text-blue-500 text-lg">
                      Support
                    </NavLink>
                  </li>
                  <li className="ml-4 hover:text-blue-500 focus:text-blue-500">
                    <NavLink to="" className="focus:text-blue-500 text-lg">
                      About
                    </NavLink>
                  </li>
                </ul>
                <div className="pl-40">
                  <button
                    aria-label="live chat"
                    className="focus:bg-slate-600 focus:ring-2 focus:ring-offset-2 focus:ring-slate-700 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 font-semibold rounded focus:outline-none"
                  >
                    <NavLink to="/logIn">Log-In</NavLink>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <div className="pt-14 xl:pt-32 lg:flex items-center relative z-10 container mx-auto lg:space-x-4 space-y-4 lg:space-y-0">
            <div className="w-full max-h-[35rem] lg:w-1/2 h-full lg:pr-10 xl:pr-4 p-2 rounded-xl backdrop-blur-lg shadow-sm overflow-hidden border-2 border-[#0f172a09]">
              <img
                tabLanding="0"
                aria-label="people smiling"
                className="mx-auto rounded-xl h-[35rem] object-cover object-center"
                src={HeroImg}
                alt="people smiling"
              />
            </div>
            <div className="w-full lg:w-1/2 h-full">
              <p
                tabLanding="0"
                className="text-slate-800 uppercase text-2xl mb-4"
              >
                Focus on what matters.
              </p>
              <h1
                tabLanding="0"
                className="text-slate-900 text-4xl lg:text-6xl font-black mb-8"
              >
                All in one support system
              </h1>
              <p tabLanding="0" className="text-gray-900 font-semibold mb-8">
                Simplifies processing billions of activities into a simple API
                for input and output, with performance that would take our team
                months, if not years to learn and optimize.
              </p>
              <div className="bg-slate-900 lg:mt-16 py-4 px-4 flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center shadow-lg rounded-lg">
                <div className="sm:flex w-[80%] justify-between px-2 items-center py-2">
                  <div className="flex items-center space-x-1">
                    <HiOutlineQuestionMarkCircle className="text-blue-600 text-xl font-bold" />
                    <p className="text-slate-300 text-base">How it works</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HiOutlineLightBulb className="text-blue-600 text-xl font-bold" />
                    <p className="text-slate-300 text-base">Learn</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <HiOutlineChatAlt2 className="text-blue-600 text-xl font-bold" />
                    <p className="text-slate-300 text-base">Live Chat</p>
                  </div>
                </div>
                <button
                  aria-label="search"
                  className="focus:bg-blue-700 focus:ring-blue-700 focus:ring-2 focus:ring-offset-2 text-white bg-blue-600 hover:bg-blue-700 mt-4 sm:mt-0 p-3 lg:-ml-8 rounded w-full sm:w-auto relative"
                >
                  <HiOutlineCursorClick classsName="text-slate-200 text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
            /* Top menu */
            .top-100 {
                animation: slideDown 0.5s ease-in-out;
            }
            @keyframes slideDown {
                0% {
                    top: -50%;
                }
                100% {
                    top: 0;
                }
            }
            * {
                outline: none !important;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-tap-highlight-color: transparent;
            }`}
      </style>
    </div>
  );
};
export default Landing;
