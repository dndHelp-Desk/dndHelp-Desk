import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import heroTop from "./images/heroTop.png"
import darkLogo from "./images/dndHelp-Desk_Dark.png";
import Cloud from "./Cloud";
import halfDark_Chat from "./images/halfDark_Chat.png";
import ShowcaseTwo from "./images/chatLight.png";
import Footer from "./Footer";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Help from "../Others/Help";
import Cookies from "./Cookies";

const Landing = () => {
  const logged = useSelector((state) => state.UserInfo.authenticated);
  const [menu, setMenu] = useState(false);
  const smallMenuRef = useOnClickOutside(() => {
    setMenu(false);
  });

  if (logged === true) {
    return <Navigate to="/app" />;
  }

  //Component =====================
  return (
    <div className="bg-slate-300 pb-2 relative h-fit">
      <section className="h-fit bg-slate-300">
        {/**Navigation ========================== */}
        <nav className="w-full">
          <div className="w-full h-[4rem] z-[99] flex justify-between items-center bg-slate-300 border-b border-slate-500 px-12">
            {/**Logo ==================== */}
            <div className="h-full hidden lg:flex items-center justify-center overflow-hidden pt-1">
              <img
                src={darkLogo}
                alt="logo"
                className="object-cover object-center w-[14rem]"
              />
            </div>
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
                to=""
                className="text-slate-900 font-semibold text-base hover:text-blue-600 "
              >
                Solutions
              </Link>
              <Link
                to=""
                className="text-slate-900 font-semibold text-base hover:text-blue-600 "
              >
                Pricing
              </Link>
              <Link
                to=""
                className="text-slate-900 font-semibold text-base hover:text-blue-600 "
              >
                Partners
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
                <button className="bg-slate-900 h-9 w-[7rem] rounded-md text-slate-300 font-bold tracking-wide outline-none uppercase text-sm focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-800">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/**Hero Section =========================== */}
        <div
          className="h-fit
         mt-[2rem] flex flex-col justify-between items-center container w-[90%] md:w-full 2xl:w-[72rem] m-auto"
        >
          <div className="flex-[1] h-full bg-transparent flex flex-col justify-center items-center space-y-6">
            <h1 className="text-2xl sm:text-[2.3rem] md:text-[4rem] sm:leading-[2rem] md:leading-[4rem] text-slate-900 font-bold text-center">
              Take control of your customer support
            </h1>
            <p className=" text-slate-700 text-lg font-semibold font-sans text-center">
              Customer service shouldn't just be a department, it should be the
              entire company. dndHelp-Desk makes customer service better. With
              our powerful simple to comprehend software, we make sure you focus
              only on what matters with a short learning curve.
            </p>
            <div className="h-12 w-full flex justify-center gap-6">
              <NavLink
                to="/getting-started"
                className="hidden sm:inline-block bg-slate-200 h-10 w-[8rem] rounded-md text-slate-800 tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-800 hover:bg-slate-100"
              >
                <div className="h-full w-full flex justify-center items-center font-semibold">
                  Get started
                </div>
              </NavLink>
              <button className="bg-[#1d4fd8c7] h-10 w-[8rem] rounded-md text-slate-300 font-semibold tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-800 hover:bg-slate-800">
                Live demo
              </button>
            </div>
          </div>
          <div className="flex-[1] h-full bg-transparent p-6 flex justify-center items-center">
            <img
              src={heroTop}
              alt="showcase"
              className="object-fit object-center object-cover rounded-xl shadow-2xl drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/**Cloud =================== */}
      <Cloud />

      {/**First Section ================================ */}
      <section className="w-[90%] md:w-full container mt-4 m-auto 2xl:w-[75rem] grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-2">
        <div className="col-span-1 flex flex-col justify-center p-4">
          <div className="border-b border-slate-900 space-y-4 py-2">
            <h2 className="text-slate-800 text-2xl font-bold tracking-tightest">
              Stay on top of your customers
            </h2>
            <p className="text-slate-600">
              According to Aspect, 68% of customers patronize companies that
              offer good customer service. One of the easiest ways to execute
              quality customer support is through a reliable help desk solution.
              Aside from the fact that these can automate the customer support
              process, there are also plenty of reasons why businesses should
              use these tools. They eliminate the need for agents to respond to
              individual inquiries sent via email as such can be moved to help
              desk queues.
            </p>
            <button className="bg-slate-800 text-base h-10 w-[8rem] rounded-md text-slate-300 tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-700 hover:bg-slate-900">
              Get started
            </button>
          </div>
          <q className="text-slate-500 text-sm mt-4">
            Revolve your world around the customer and more customers will
            revolve around you.
          </q>
        </div>
        <div className="col-span-1 justify-end flex items-center rounded-tr-md rounded-br-xl py-8">
          {" "}
          <img
            src={halfDark_Chat}
            alt=""
            className="object-center object-fit rounded-l-xl w-[90%] shadow-2xl drop-shadow-2xl"
          />
        </div>
      </section>

      {/**Second Section ================================ */}
      <section className="w-[90%] md:w-full container mt-4 m-auto 2xl:w-[75rem] grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-2">
        <div className="col-span-1  flex items-center rounded-tr-md rounded-br-xl py-8">
          {" "}
          <img
            src={ShowcaseTwo}
            alt=""
            className="object-center object-fit rounded-r-xl w-[90%] shadow-2xl drop-shadow-2xl"
          />
        </div>
        <div className="col-span-1 flex flex-col justify-center p-4">
          <div className="space-y-4 py-2">
            <h2 className="text-slate-800 text-2xl font-bold tracking-tightest">
              Better understand your customers
            </h2>
            <p className="text-slate-600">
              Aiding agents in redirecting customer queries and concerns to
              competent staff is the principal function of the automation suite.
              This capability makes sure that all tickets are responded to
              quickly, which is made possible by automated notifications.
            </p>
            <button className="bg-slate-800 text-base h-10 w-[8rem] rounded-md text-slate-300 tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-700 hover:bg-slate-900">
              Get started
            </button>
          </div>
        </div>
      </section>

      {/**Third Section ============================== */}
      <section className="w-[90%] md:w-full container mt-4 mb-2 m-auto 2xl:w-[75rem] bg-slate-300 p-6 rounded-xl flex flex-col justify-center">
        <h2 className="text-slate-700 text-2xl font-bold font-sans tracking-tightest">
          Support Inbox built for sufficency
        </h2>
        <p className="text-slate-500 text-base mt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit
          quibusdam fuga enim accusamus quisquam eveniet atque, dignissimos rem
          labore, numquam architecto aspernatur non error? Assumenda non minima
          eius quibusdam necessitatibus.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-slate-400 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-400 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-400 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-400 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-400 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-400 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-400 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-400 col-span-1 h-[10rem] rounded-xl"></div>
        </div>
      </section>
      <Footer />
      <Help />
      <Cookies />
    </div>
  );
};

export default Landing;
