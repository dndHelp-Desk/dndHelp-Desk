import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Cloud from "./Cloud";
import HeroImg from "./images/Hero.jpg";
import ShowcaseOne from "./images/showcase2.png";
import ShowcaseTwo from "./images/showcase11.png";
import Footer from "./Footer";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Help from "./../ClientSupport/Help";

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
    <div className="bg-slate-50 pb-2 relative">
      {/**Navigation ========================== */}
      <nav className="w-full bg-slate-200">
        <div className="h-[20rem] p-6 xl:p-0 py-6 w-[90%] md:w-full container bg-transparent 2xl:w-[75rem] m-auto">
          <div className="w-full h-[4rem] py-2 flex justify-between items-center border-b border-slate-400">
            {/**Logo ==================== */}
            <svg
              className="text-[1.5rem] font-sans fill-transparent flex"
              width="210"
              height="50"
              viewBox="0 0 200 50"
            >
              <text x="0" y="35">
                <tspan className="stroke-[2.5px] stroke-slate-700 fill-slate-700">
                  dnd
                </tspan>
                <tspan
                  className="stroke-[2px] fill-slate-500 stroke-slate-500"
                  x="41"
                  y="35"
                >
                  Help-Desk
                </tspan>
              </text>
            </svg>
            {/**Menu Options ========================= */}
            <div className="hidden lg:flex space-x-4">
              <Link
                to=""
                className="text-slate-500 font-semibold text-base hover:text-blue-600 "
              >
                Solutions
              </Link>
              <Link
                to=""
                className="text-slate-500 font-semibold text-base hover:text-blue-600 "
              >
                Pricing
              </Link>
              <Link
                to=""
                className="text-slate-500 font-semibold text-base hover:text-blue-600 "
              >
                Partners
              </Link>
              <Link
                to=""
                className="text-slate-500 font-semibold text-base hover:text-blue-600 "
              >
                Company
              </Link>
            </div>

            <div className="flex space-x-2 items-center relative">
              {/**Logiin button ================== */}
              <Link to="/logIn">
                <button className="bg-slate-800 h-10 w-[7rem] rounded-md text-slate-300 font-semibold tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-800">
                  Log-In
                </button>
              </Link>
              {/**Small Menu Options =================== */}
              <button
                onClick={() => setMenu(true)}
                className="focus:outline-none outline-none flex justify-center items-center h-10 w-10 rounded-lg bg-slate-300 hover:bg-slate-400 transition-all lg:hidden"
              >
                <HiOutlineMenuAlt3 className="text-3xl cursor-pointer hover:opacity-70" />
              </button>
              <div
                ref={smallMenuRef}
                className={`absolute h-[15rem] w-[12rem] shadow-2xl lg:hidden bg-slate-800 rounded-xl top-[3rem]  ${
                  menu ? "" : "hidden"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </nav>

      {/** Hero Section ========================= */}
      <section className="w-full bg-gradient-to-b from-slate-300 to-slate-50 p-6">
        <div
          style={{ backgroundImage: `url(${HeroImg})` }}
          className="w-[90%] md:w-full container 2xl:w-[75rem]  m-auto h-[30rem] rounded-xl bg-slate-900 mt-[-15rem] bg-no-repeat bg-center bg-cover overflow-hidden"
        >
          <div className="w-full h-full bg-[#0e0c4ebe] p-10 px-6 lg:px-36 flex flex-col justify-center items-center gap-4">
            <h1 className="text-[2.3rem] md:text-[4rem] leading-[2rem] md:leading-[4rem] text-slate-100 font-bold text-center">
              <span className="">Take control of your</span>
              <br />
              <span className="text-slate-300">customer support</span>
            </h1>
            <p className="text-center text-slate-100 text-base font-semibold font-sans">
              Customer service shouldn't just be a department, it should be the
              entire company. dndHelp-Desk makes customer service better. With
              our powerful simple to comprehend software, we make sure you focus
              only on what matters with a short learning curve.
            </p>
            <div className="h-12 w-full flex justify-center gap-6">
              <button className="bg-slate-200 h-10 w-[8rem] rounded-md text-slate-800 tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-800 hover:bg-slate-300">
                Get started
              </button>
              <button className="bg-[#1d4fd8c7] h-10 w-[8rem] rounded-md text-slate-300 font-medium tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-800 hover:bg-slate-800">
                Live demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/**Cloud =================== */}
      <Cloud />

      {/**First Section ================================ */}
      <section className="w-[90%] md:w-full container mt-4 m-auto 2xl:w-[75rem] grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div className="col-span-1 flex flex-col justify-center p-4">
          <div className="border-b border-slate-300 space-y-4 py-2">
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
          <p className="text-slate-500 text-sm mt-4">
            “Revolve your world around the customer and more customers will
            revolve around you.” – Heather Williams
          </p>
        </div>
        <div className="col-span-1 h-[30rem] flex items-center rounded-tr-md rounded-br-xl overflow-hidden">
          {" "}
          <img
            src={ShowcaseOne}
            alt=""
            className="object-center object-cover shadow-xl"
          />
        </div>
      </section>

      {/**Second Section ================================ */}
      <section className="w-[90%] md:w-full container mt-4 m-auto 2xl:w-[75rem] grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-2 overflow-hidden">
        <div className="col-span-1  flex items-center rounded-tr-md rounded-br-xl overflow-hidden py-8">
          {" "}
          <img
            src={ShowcaseTwo}
            alt=""
            className="object-center object-fit rounded-tr-xl rounded-br-xl shadow-xl w-[90%]"
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
      <section className="w-[90%] md:w-full container mt-4 mb-2 m-auto 2xl:w-[75rem] h-[35rem] bg-slate-300 p-6 rounded-xl flex flex-col justify-center">
        <h2 className="text-slate-700 text-2xl font-bold font-sans tracking-tightest">
          Support Inbox built for sufficency
        </h2>
        <p className="text-slate-500 text-base mt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit
          quibusdam fuga enim accusamus quisquam eveniet atque, dignissimos rem
          labore, numquam architecto aspernatur non error? Assumenda non minima
          eius quibusdam necessitatibus.
        </p>
        <div className="grid grid-cols-4 gap-4 mt-4">
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
    </div>
  );
};

export default Landing;
