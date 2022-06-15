import { FC, useState } from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import darkLogo from "./images/dndHelp-Desk_Dark.webp";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Help from "../../Components/Help";
import Footer from "./Footer";

const Pricing: FC = () => {
  const [menu, setMenu] = useState<boolean | null>(false);
  const smallMenuRef = useOnClickOutside(() => {
    setMenu(false);
  });

  //Coimponent ==============================
  return (
    <>
      <section className="bg-slate-300 pt-28 w-screen min-h-[70rem] overflow-hidden">
        {/**Help Chat ============ */}
        <Help />
        {/**Navigation ========================== */}
        <nav className="w-full fixed z-[999] top-0">
          <div className="w-full h-[5rem] flex justify-between items-center bg-[#c4d1dd]">
            <div className="w-full h-full px-6 flex justify-between items-center">
              {/**Logo ==================== */}
              <Link
                to="/"
                className="h-full hidden lg:flex items-center justify-center overflow-hidden pt-1 outline-none focus:outline-none"
              >
                <img
                  src={darkLogo}
                  alt="logo"
                  className="object-cover object-center w-[14rem]"
                />
              </Link>
              {/**Small Menu Options =================== */}
              <button
                onClick={() => setMenu(true)}
                className="focus:outline-none outline-none flex justify-center ml-4 items-center h-10 w-10 rounded-lg bg-slate-300 hover:bg-slate-400 transition-all lg:hidden"
              >
                <HiOutlineMenuAlt3 className="text-3xl cursor-pointer hover:opacity-70" />
              </button>
              <div
                ref={smallMenuRef}
                className={`absolute h-[15rem] w-[12rem] shadow-2xl lg:hidden bg-slate-300 rounded-xl top-[5rem] left-4  ${
                  menu ? "" : "hidden"
                }`}
              ></div>
              {/**Small Menu Options =================== */}
              {/**Menu Options ========================= */}
              <div className="hidden lg:flex space-x-4">
                <Link
                  to="/pricing"
                  className="text-slate-900 font-semibold text-base hover:text-blue-600 transition-all duration-200 outline-none focus:outline-none"
                >
                  Pricing
                </Link>
                <Link
                  to=""
                  className="text-slate-900 font-semibold text-base hover:text-blue-600 transition-all duration-200 outline-none focus:outline-none"
                >
                  Resources
                </Link>
                <Link
                  to=""
                  className="text-slate-900 font-semibold text-base hover:text-blue-600 transition-all duration-200 outline-none focus:outline-none"
                >
                  Company
                </Link>
              </div>
              <div className="flex space-x-2 items-center relative px-4">
                {/**Logiin button ================== */}
                <Link to="/logIn">
                  <button className="bg-slate-900 h-9 w-[8rem] rounded-sm text-slate-300 font-bold tracking-wide outline-none uppercase text-sm focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-800 flex justify-between items-center px-5">
                    <span>Log In</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-arrow-big-right-line"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-6v-6h6z"></path>
                      <path d="M3 9v6"></path>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-slate-300 dark:bg-gray-900 overflow-hidden">
          <div className="container px-6 py-8 mx-auto overflow-hidden">
            <div className="xl:items-center xl:-mx-8 xl:flex overflow-hidden">
              <div className="flex flex-col items-center xl:items-start xl:mx-8">
                <h1 className="text-3xl font-medium text-gray-800 capitalize lg:text-4xl dark:text-white">
                  Our Pricing Plan
                </h1>

                <div className="mt-4">
                  <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                  <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                  <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>

                <p className="mt-4 font-medium text-gray-500 dark:text-gray-300">
                  You can get All Access by selecting your plan!
                </p>

                <a
                  href="https://www.dndhelp-desk.co.za/"
                  className="flex items-center mt-4 -mx-1 text-sm text-gray-700 capitalize dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                  <span className="mx-1">read more</span>
                  <svg
                    className="w-4 h-4 mx-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>

              <div className="flex-1 xl:mx-8">
                <div className="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
                  <div className="max-w-sm mx-auto border border-slate-400 bg-[#c4d1dd] rounded-lg md:mx-4">
                    <div className="p-6">
                      <h1 className="text-xl font-medium text-gray-700 capitalize lg:text-3xl dark:text-white">
                        Free
                      </h1>

                      <p className="mt-4 text-gray-500 dark:text-gray-300">
                        Get started at no const. We have several plans to
                        showcase your Business. Get everything you need
                      </p>

                      <h2 className="mt-4 text-2xl font-medium text-gray-700 sm:text-4xl dark:text-gray-300">
                        $0.00{" "}
                        <span className="text-base font-medium">/ Month</span>
                      </h2>

                      <p className="mt-1 text-gray-500 dark:text-gray-300">
                        Yearly payment
                      </p>

                      <Link
                        onClick={() => {
                          window.localStorage.setItem("plan", "free");
                        }}
                        to="/workspace-setup"
                        className="outline-none focus:outline-none font-medium"
                      >
                        {" "}
                        <button
                          role="link"
                          className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-700 rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                        >
                          Start Now
                        </button>
                      </Link>
                    </div>

                    <hr className="border-slate-400" />

                    <div className="p-6">
                      <h1 className="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-white">
                        What’s included:
                      </h1>

                      <ul className="text-sm text-slate-700 font-medium space-y-4 mt-8">
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Email Ticketing</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>2 Agents and 1 admin</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Up to 500 tickets /month</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>2 Teams Max</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Knowledge Base</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Custom email templates</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Contacts 100</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Basic Reports</span>
                        </li>
                        <li className="flex items-center space-x-2 line-through">
                          <BsFillCheckCircleFill className="text-slate-500 text-lg" />
                          <span>Automated Reports</span>
                        </li>
                        <li className="flex items-center space-x-2 line-through">
                          <BsFillCheckCircleFill className="text-slate-500 text-lg" />
                          <span>Ticket merging</span>
                        </li>
                        <li className="flex items-center space-x-2 line-through">
                          <BsFillCheckCircleFill className="text-slate-500 text-lg" />
                          <span>Advanced reporting</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="max-w-sm mx-auto border border-slate-400 bg-[#c4d1dd] rounded-lg md:mx-4">
                    <div className="p-6">
                      <h1 className="text-xl font-medium text-gray-700 capitalize lg:text-3xl dark:text-white">
                        Premium
                      </h1>

                      <p className="mt-4 text-gray-500 dark:text-gray-300">
                        Get started at no cost, then pay as you go. We have
                        several plans to showcase your Business. Get everything
                        you need
                      </p>

                      <h2 className="mt-4 text-2xl font-medium text-gray-700 sm:text-4xl dark:text-gray-300">
                        $0.034{" "}
                        <span className="text-base font-medium">/ Ticket</span>
                      </h2>

                      <p className="mt-1 text-gray-500 dark:text-gray-300">
                        Pay as you go
                      </p>

                      <Link
                        onClick={() => {
                          window.localStorage.setItem("plan", "pro");
                        }}
                        to="/workspace-setup"
                        className="outline-none focus:outline-none font-medium"
                      >
                        <button
                          role="link"
                          className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-700 rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                        >
                          Start Now
                        </button>
                      </Link>
                    </div>

                    <hr className="border-slate-400" />

                    <div className="p-6">
                      <h1 className="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-white">
                        What’s included:
                      </h1>

                      <ul className="text-sm text-slate-700 font-medium space-y-4 mt-8">
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Omni Channel</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Unlimited Agents and admins</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Up to 500 Free then $0.034 /ticket</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>50 Teams Max</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Knowledge Base</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Custom email templates</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Unlimited contacts</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Advanced Reports - prebuilt</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Automated Reports</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Ticket merging</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <BsFillCheckCircleFill className="text-blue-600 text-lg" />
                          <span>Intergrations prebuilt</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <style>
        {` 
            .checkbox:checked {
                right: 0;
                background-color: #4338ca;
            }
            `}
      </style>
    </>
  );
};
export default Pricing;
