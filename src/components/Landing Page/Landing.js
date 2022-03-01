import React from "react";
import { NavLink } from "react-router-dom";

const Landing = () => {
  //Component =========================
  return (
    <div>
      <section>
        <div className="w-full relative pb-10 px-6 xl:px-0">
          <img
            className="absolute w-full inset-0 h-full object-cover object-center"
            src="https://cdn.tuk.dev/assets/templates/weCare/hero2-bg.png"
            alt="we care family"
          />
          <nav
            aria-label="Main"
            tabLanding="0"
            className="hidden relative z-10 w-full lg:flex justify-between items-center p-20"
          >
            <div className="w-1/6">
              {/**Logo ==================== */}
              <svg
                className="stroke-slate-700 text-[2rem] font-sans fill-transparent hidden lg:flex"
                width="250"
                height="50"
                viewBox="0 0 200 50"
              >
                <text x="0" y="35">
                  <tspan className="stroke-[3.5px] fill-slate-500">dnd</tspan>
                  <tspan className="stroke-[2px]  fill-slate-400" x="53" y="35">
                    Help-Desk
                  </tspan>
                </text>
              </svg>
            </div>
            <div className="w-5/6">
              <div className="flex items-center justify-end">
                <ul className="text-gray-800 lg:space-x-8 flex items-center leading-none">
                  <li>
                    <NavLink
                      to=""
                      className="hover:text-indigo-500 text-lg focus:text-indigo-500"
                    >
                      Services
                    </NavLink>
                  </li>
                  <li className="ml-4 hover:text-indigo-500 ">
                    <NavLink to="" className="focus:text-indigo-500 text-lg">
                      Request-Demo
                    </NavLink>
                  </li>
                  <li className="ml-4 hover:text-indigo-500 focus:text-indigo-500">
                    <NavLink to="" className="focus:text-indigo-500 text-lg">
                      Support
                    </NavLink>
                  </li>
                  <li className="ml-4 hover:text-indigo-500 focus:text-indigo-500">
                    <NavLink to="" className="focus:text-indigo-500 text-lg">
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
          <div className="pt-32 lg:flex items-center relative z-10 container mx-auto">
            <div className="w-full lg:w-1/2 h-full lg:pr-10 xl:pr-0">
              <img
                tabLanding="0"
                aria-label="people smiling"
                className="mx-auto"
                src="https://cdn.tuk.dev/assets/templates/weCare/hero2-left.png"
                alt="people smiling"
              />
            </div>
            <div  className="w-full lg:w-1/2 h-full">
              <p
                tabLanding="0"
                className="text-slate-800 uppercase text-2xl mb-4"
              >Focus on what matters.</p>
              <h1
                tabLanding="0"
                className="text-slate-900 text-4xl lg:text-6xl font-black mb-8"
              >
                All in one support system
              </h1>
              <p tabLanding="0" className="text-gray-800 font-regular mb-8">
                Simplifies processing billions of activities into a simple API
                for input and output, with performance that would take our team
                months, if not years to learn and optimize.
              </p>
              <div className="bg-white lg:mt-16 py-4 px-4 flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center shadow-lg rounded-lg">
                <div className="sm:flex items-center py-2">
                  <div className="flex items-center">
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg4.svg"
                      alt="icon"
                    />
                    <input
                      aria-label="How it Works"
                      className="w-24 xl:w-32 leading-none tracking-normal text-gray-800 ml-2.5 placeholder-black"
                      placeholder="How it Works"
                    />
                  </div>
                  <div className="flex items-center sm:mx-4 xl:mx-14 my-6 lg:my-0">
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg5.svg"
                      alt="icon"
                    />
                    <input
                      aria-label="Learn"
                      className="w-24 xl:w-32 leading-none tracking-normal text-gray-800 ml-2.5 placeholder-black"
                      placeholder="Learn"
                    />
                  </div>
                  <div className="flex items-center">
                    <img
                      src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg6.svg"
                      alt="icon"
                    />
                    <input
                      aria-label="Live Chat"
                      className="w-24 xl:w-32 leading-none tracking-normal text-gray-800 ml-2.5 placeholder-black"
                      placeholder="Live Chat"
                    />
                  </div>
                </div>
                <button
                  aria-label="search"
                  className="focus:bg-indigo-700 focus:ring-indigo-700 focus:ring-2 focus:ring-offset-2 text-white bg-indigo-600 hover:bg-indigo-700 mt-4 sm:mt-0 p-3 lg:-ml-8 rounded w-full sm:w-auto relative"
                >
                  <img
                    className="absolute right-0 mr-2 sm:mr-auto sm:relative icon icon-tabler icon-tabler-search cursor-pointer"
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/right_aligned_with_searchbar_Svg7.svg"
                    alt="search"
                  />
                  <input
                    aria-label="search"
                    className="sm:hidden border-b border-gray-300 w-full bg-transparent pr-6"
                  />
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
