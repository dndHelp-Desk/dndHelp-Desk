import { FC, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import heroTop from "./images/heroTop.webp";
import heroTopSm from "./images/heroTop_sm.webp";
import darkLogo from "./images/dndHelp-Desk_Dark.webp";
import Cloud from "./Cloud";
import reportImg from "./images/report.webp";
import reportImg2 from "./images/report2.webp";
import Footer from "./Footer";
import useOnClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";
import Help from "../Others/Help";
import Cookies from "./Cookies";

const Landing: FC = () => {
  const scrollToFeatures = useRef<HTMLDivElement | null>(null);
  const [menu, setMenu] = useState<boolean>(false);
  const smallMenuRef = useOnClickOutside(() => {
    setMenu(false);
  });

  //Scroll to Features =====
  const features = () => {
    if (scrollToFeatures && scrollToFeatures.current) {
      scrollToFeatures.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  //Component =====================
  return (
    <div className="bg-slate-300 relative h-fit">
      <section className="h-fit bg-slate-300">
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
                <button
                  onClick={() => features()}
                  className="text-slate-900 font-semibold text-base hover:text-blue-600 transition-all duration-200 outline-none focus:outline-none"
                >
                  Features
                </button>
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
                  <button className="bg-slate-900 h-10 w-[8rem] rounded text-slate-300 font-bold tracking-wide outline-none uppercase text-sm focus:outline-none focus:ring focus:ring-slate-500 hover:bg-slate-800 flex justify-between items-center px-4">
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

        {/**Hero Section =========================== */}
        <div className="h-fit bg-slate-300 w-full pt-40 flex flex-col justify-between items-center m-auto">
          <div className="flex-[1] h-full bg-transparent flex flex-col justify-center items-center space-y-6">
            <header className="px-10 md:px-40">
              <h1 className="text-[2.3rem] md:text-[4rem] leading-[1.8rem] sm:leading-[2rem] md:leading-[4rem] text-slate-900 font-bold text-center">
                Take control of your customer support
              </h1>
              <h2 className="mt-6 text-slate-700 text-lg font-sans text-center">
                Customer service should not be limited to a single department,
                but rather encompass the entire organization. Customer service
                is improved with <strong>dndHelp-Desk</strong>.With our simple
                yet powerful software, we make sure you focus only on what
                matters.
              </h2>
            </header>
            <div className="h-12 w-full justify-center gap-6 hidden md:flex">
              <NavLink
                to="/pricing"
                className="hidden sm:inline-block bg-blue-700 h-12 px-4 rounded text-slate-50 tracking-wide outline-none focus:outline-none border-2 border-slate-800 focus:ring focus:ring-slate-900 hover:bg-blue-600 transition-all duration-200 font-medium"
              >
                <div className="h-full w-full flex justify-center items-center ">
                  Get started free
                </div>
              </NavLink>
            </div>
          </div>
          <div className="flex-[1] h-full bg-transparent p-6 flex justify-center items-center">
            <img
              src={heroTop}
              alt="showcase"
              className="object-fit object-center object-cover rounded shadow-2xl drop-shadow-2xl hidden md:flex max-w-[90%] xl:max-w-full"
            />
            <img
              src={heroTopSm}
              alt="showcase"
              className="object-fit object-center object-cover rounded shadow-2xl drop-shadow-2xl flex md:hidden"
            />
          </div>
        </div>
      </section>

      {/**Cloud =================== */}
      <Cloud />

      {/**First Section ================================ */}
      <section className="w-[90%] md:w-full container mt-8 m-auto 2xl:w-[75rem] grid grid-cols-1 md:grid-cols-2 gap-4 py-4 px-2">
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
            <Link to="/pricing">
              <button
                role="link"
                className="bg-slate-800 font-semibold text-base h-10 w-[8rem] rounded text-slate-300  tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-700 hover:bg-slate-900"
              >
                Get started
              </button>
            </Link>
          </div>
          <q className="text-slate-500 text-sm mt-4">
            Revolve your world around the customer and more customers will
            revolve around you.
          </q>
        </div>
        <div className="col-span-1 justify-end flex items-center rounded-tr-md rounded-br-xl py-8">
          {" "}
          <img
            src={reportImg}
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
            src={reportImg2}
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
            <Link to="/pricing">
              <button
                role="link"
                className="bg-slate-800 h-10 w-[8rem] rounded  font-semibold text-base text-slate-300 tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-700 hover:bg-slate-900"
              >
                Get started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/**Third Section ============================== */}
      <section
        ref={scrollToFeatures}
        className="w-[90%] md:w-full container my-16 pb-10 m-auto 2xl:w-[75rem] bg-slate-300 p-6 rounded flex flex-col justify-center"
      >
        <h2 className="text-slate-800 text-2xl font-bold font-sans tracking-tightest">
          Support Inbox built for sufficency
        </h2>
        <p className="text-slate-600 text-base mt-2">
          Every business must focus on delivering quick and accurate answers to
          customer questions. But, this seems impossible without this incredible
          tool. According to a recent survey, 68% of customers agreed that the
          key to their positive service experiences was a pleasant support
          agent. Also, 62% of customers agreed that a representative’s knowledge
          or resourcefulness was key.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <article className="block p-8 bg-gray-900 border border-gray-800 shadow-xl rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-checkbox w-10 h-10 text-blue-400"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              stroke-width={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <polyline points="9 11 12 14 20 6"></polyline>
              <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"></path>
            </svg>

            <h3 className="mt-3 text-xl font-bold text-white">
              Resolve tickets with more accuracy.
            </h3>

            <p className="mt-4 text-sm text-gray-300">
              Agents can route technical questions to the IT professional or an
              in-house expert for an accurate response.
            </p>
          </article>
          <article className="block p-8 bg-gray-900 border border-gray-800 shadow-xl rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-writing-sign w-10 h-10 text-blue-400"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              stroke-width={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5"></path>
              <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z"></path>
              <path d="M16 7h4"></path>
            </svg>

            <h3 className="mt-3 text-xl font-bold text-white">
              Address Service Level Agreements.
            </h3>

            <p className="mt-4 text-sm text-gray-300">
              Managers can assign rules to route different SLAs to their
              respective workflows; thereby, each SLA type, from basic to
              premium, gets the appropriate customer service.
            </p>
          </article>
          <article className="block p-8 bg-gray-900 border border-gray-800 shadow-xl rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-mail-fast w-10 h-10 text-blue-400"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              stroke-width={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M3 7h3"></path>
              <path d="M3 11h2"></path>
              <path d="M9.02 8.801l-.6 6a2 2 0 0 0 1.99 2.199h7.98a2 2 0 0 0 1.99 -1.801l.6 -6a2 2 0 0 0 -1.99 -2.199h-7.98a2 2 0 0 0 -1.99 1.801z"></path>
              <path d="M9.8 7.5l2.982 3.28a3 3 0 0 0 4.238 .202l3.28 -2.982"></path>
            </svg>

            <h3 className="mt-3 text-xl font-bold text-white">
              Resolve tickets faster.
            </h3>

            <p className="mt-4 text-sm text-gray-300">
              It’s one of the main advantages of help desk software. Agents
              resolve tickets faster and more accurately through collaboration
              with other agents, routing to in-house experts, or quickly
              accessing product specs.
            </p>
          </article>
          <article className="block p-8 bg-gray-900 border border-gray-800 shadow-xl rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-device-desktop-analytics w-10 h-10 text-blue-400"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              stroke-width={2}
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <rect x={3} y={4} width={18} height={12} rx={1}></rect>
              <path d="M7 20h10"></path>
              <path d="M9 16v4"></path>
              <path d="M15 16v4"></path>
              <path d="M9 12v-4"></path>
              <path d="M12 12v-1"></path>
              <path d="M15 12v-2"></path>
              <path d="M12 12v-1"></path>
            </svg>

            <h3 className="mt-3 text-xl font-bold text-white">
              Resolve tickets consistently.
            </h3>

            <p className="mt-4 text-sm text-gray-300">
              FAQs and unique issues are recorded and best practices are logged
              as a reference for future incidents. Next time a similar query is
              received, an agent will know exactly how to respond.
            </p>
          </article>
        </div>
      </section>

      <Footer />
      <Help />
      <Cookies />
    </div>
  );
};

export default Landing;
