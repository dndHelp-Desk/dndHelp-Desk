import { FC, useState } from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import darkLogo from "./images/dndHelp-Desk_Dark.webp";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Help from "../Others/Help";
import Footer from "./Footer";

const Pricing:FC = () => {
  const [menu, setMenu] = useState<boolean | null>(false);
  const smallMenuRef = useOnClickOutside(() => {
    setMenu(false);
  });

  //Coimponent ==============================
  return (
    <>
      <section className="bg-slate-300 pt-28 h-screen w-screen min-h-[40rem] overflow-hidden overflow-y-scroll">
        {/**Help Chat ============ */}
        <Help />

        {/**Navigation ========================== */}
        <nav className="w-full fixed z-[999] top-0 shadow-xl">
          <div className="w-full h-[5rem] z-[99] flex justify-between items-center bg-[#b4c0d0] px-12">
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
                className="text-slate-900 font-semibold text-base hover:text-blue-600 "
              >
                Pricing
              </Link>
              <Link
                to=""
                className="text-slate-900 font-semibold text-base hover:text-blue-600 "
              >
                Resources
              </Link>
              <Link
                to=""
                className="text-slate-900 font-semibold text-base hover:text-blue-600 "
              >
                Company
              </Link>
            </div>
            <div className="flex space-x-2 items-center relative px-4">
              {/**Logiin button ================== */}
              <Link to="/logIn">
                <button className="bg-slate-900 h-9 w-[7rem] rounded text-slate-300 font-bold tracking-wide outline-none uppercase text-sm focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-800">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/** //Section =======================*/}
        <div className="my-16 mx-auto container">
          <div className="flex flex-col lg:items-center justify-center w-full">
            <h1 className="font-semibold text-slate-800 text-3xl md:text-4xl text-center">
              Get started at no cost, then pay as you go.
            </h1>
            <h2 className="mt-2.5 lg:w-1/2 text-center text-slate-700 text-lg">
              We have several plans to showcase your Business. Get everything
              you need
            </h2>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 min-h-[36rem]">
                <div className="col-span-1 h-full w-[20rem] bg-white rounded-lg space-y-4 p-4 shadow-2xl drop-shadow-md">
                  <h3 className="text-2xl font-medium text-slate-600 font-sans">
                    Free plan
                  </h3>
                  <h4 className="traciking-wide">
                    <span className="text-xl text-slate-800 font-bold">$</span>
                    <span className="text-3xl text-slate-800 font-bold">
                      0{" "}
                    </span>
                    <span className="text-base text-slate-600 font-medium">
                      /month
                    </span>
                  </h4>
                  <ul className="text-sm text-slate-600 font-medium space-y-4">
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
                  <Link
                    onClick={() => {
                      window.localStorage.setItem("plan", "free");
                    }}
                    to="/workspace-setup"
                  >
                    <div className="mt-4 w-full h-10 bg-blue-600 rounded text-slate-50 text-base font-semibold flex justify-center items-center">
                      Choose
                    </div>
                  </Link>
                </div>
                <div className="col-span-1 h-full w-[20rem] bg-blue-600 rounded-lg space-y-4 p-4 shadow-2xl drop-shadow-md">
                  <h3 className="text-2xl font-medium text-slate-100 font-sans">
                    Pro plan
                  </h3>
                  <h4 className="traciking-wide">
                    <span className="text-xl text-slate-50 font-bold">$</span>
                    <span className="text-3xl text-slate-50 font-bold">
                      0.034{" "}
                    </span>
                    <span className="text-base text-slate-100 font-medium">
                      /ticket
                    </span>
                  </h4>
                  <ul className="text-sm text-slate-200 font-medium space-y-4">
                    <li className="flex items-center space-x-2">
                      <BsFillCheckCircleFill className="text-slate-100 text-lg" />
                      <span>Omni Channel</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BsFillCheckCircleFill className="text-slate-100 text-lg" />
                      <span>Unlimited Agents and admins</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BsFillCheckCircleFill className="text-slate-100 text-lg" />
                      <span>Up to 500 Free then $0.034 /ticket</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BsFillCheckCircleFill className="text-slate-100 text-lg" />
                      <span>50 Teams Max</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BsFillCheckCircleFill className="text-slate-100 text-lg" />
                      <span>Knowledge Base</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BsFillCheckCircleFill className="text-slate-100 text-lg" />
                      <span>Custom email templates</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BsFillCheckCircleFill className="text-slate-100 text-lg" />
                      <span>Unlimited contacts</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BsFillCheckCircleFill className="text-slate-100 text-lg" />
                      <span>Advanced Reports - prebuilt</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BsFillCheckCircleFill className="text-slate-100 text-lg" />
                      <span>Automated Reports</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BsFillCheckCircleFill className="text-slate-100 text-lg" />
                      <span>Ticket merging</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BsFillCheckCircleFill className="text-slate-100 text-lg" />
                      <span>Intergrations prebuilt</span>
                    </li>
                  </ul>
                  <Link
                    onClick={() => {
                      window.localStorage.setItem("plan", "pro");
                    }}
                    to="/workspace-setup"
                  >
                    <div className="mt-4 w-full h-10 bg-slate-100 rounded text-blue-600 text-base font-semibold flex justify-center items-center">
                      Choose
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
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
