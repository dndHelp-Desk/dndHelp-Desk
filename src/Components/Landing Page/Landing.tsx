import { FC, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import heroTop from "./images/heroTop.webp";
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
        <nav className="w-full fixed z-[999] top-0 shadow-lg">
          <div className="w-full h-[5rem] flex justify-between items-center bg-[#b4c0d0]">
            <div className="w-[90%] md:w-full container m-auto 2xl:w-[75rem] h-full flex justify-between items-center">
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
                  className="text-slate-900 font-semibold text-base hover:text-blue-600 outline-none focus:outline-none"
                >
                  Features
                </button>
                <Link
                  to="/pricing"
                  className="text-slate-900 font-semibold text-base hover:text-blue-600 outline-none focus:outline-none"
                >
                  Pricing
                </Link>
                <Link
                  to=""
                  className="text-slate-900 font-semibold text-base hover:text-blue-600 outline-none focus:outline-none"
                >
                  Resources
                </Link>
                <Link
                  to=""
                  className="text-slate-900 font-semibold text-base hover:text-blue-600 outline-none focus:outline-none"
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
          </div>
        </nav>

        {/**Hero Section =========================== */}
        <div className="h-fit pt-40 flex flex-col justify-between items-center container w-[90%] md:w-full 2xl:w-[72rem] m-auto">
          <div className="flex-[1] h-full bg-transparent flex flex-col justify-center items-center space-y-6">
            <header>
              <h1 className="text-2xl sm:text-[2.3rem] md:text-[4rem] sm:leading-[2rem] md:leading-[4rem] text-slate-900 font-bold text-center">
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
            <div className="h-12 w-full flex justify-center gap-6">
              <NavLink
                to="/pricing"
                className="hidden sm:inline-block bg-blue-700 h-10 px-4 rounded text-slate-50 tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-900 hover:bg-blue-600"
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
              className="object-fit object-center object-cover rounded shadow-2xl drop-shadow-2xl"
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
            <button className="bg-slate-800 text-base h-10 w-[8rem] rounded text-slate-300 tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-700 hover:bg-slate-900">
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
            <button className="bg-slate-800 text-base h-10 w-[8rem] rounded text-slate-300 tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-700 hover:bg-slate-900">
              Get started
            </button>
          </div>
        </div>
      </section>

      {/**Third Section ============================== */}
      <section
        ref={scrollToFeatures}
        className="w-[90%] md:w-full container my-16 pb-10 m-auto 2xl:w-[75rem] bg-slate-300 p-6 rounded-xl flex flex-col justify-center"
      >
        <h2 className="text-slate-700 text-2xl font-bold font-sans tracking-tightest">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <article className="bg-slate-200 shadow-lg col-span-1 min-h-[13rem] rounded p-4">
            <h6 className="test-base text-slate-900 font-semibold">
              Resolve tickets with more accuracy.
            </h6>
            <p className="mt-2 text-sm text-slate-600">
              Agents can route technical questions to the IT professional or an
              in-house expert for an accurate response.
            </p>
          </article>
          <article className="bg-slate-200 shadow-lg col-span-1 min-h-[13rem] rounded p-4">
            <h6 className="test-base text-slate-900 font-semibold">
              Address Service Level Agreements.
            </h6>
            <p className="mt-2 text-sm text-slate-600">
              Managers can assign rules to route different SLAs to their
              respective workflows; thereby, each SLA type, from basic to
              premium, gets the appropriate customer service.
            </p>
          </article>
          <article className="bg-slate-200 shadow-lg col-span-1 min-h-[13rem] rounded p-4">
            <h6 className="test-base text-slate-900 font-semibold">
              Resolve tickets faster.
            </h6>
            <p className="mt-2 text-sm text-slate-600">
              It’s one of the main advantages of help desk software. Agents
              resolve tickets faster and more accurately through collaboration
              with other agents, routing to in-house experts, or quickly
              accessing product specs.
            </p>
          </article>
          <article className="bg-slate-200 shadow-lg col-span-1 min-h-[13rem] rounded p-4">
            <h6 className="test-base text-slate-900 font-semibold">
              Resolve tickets consistently.
            </h6>
            <p className="mt-2 text-sm text-slate-600">
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
