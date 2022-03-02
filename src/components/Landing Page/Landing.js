import React from "react";
import { Link } from "react-router-dom";
import Cloud from "./Cloud";
import HeroImg from "./images/Hero.jpg";
import ShowcaseOne from "./images/showcase2.png";
import ShowcaseTwo from "./images/showcase11.png";

const Landing = () => {
  return (
    <div className="bg-slate-50 py-2">
      {/**Navigation ========================== */}
      <nav className="h-[20rem] p-6 xl:p-0 py-6 w-[90%] md:w-full container bg-slate-50 2xl:w-[75rem] border-b border-slate-300 m-auto">
        <div className="w-full h-[4rem] py-2 flex justify-between items-center">
          {/**Logo ==================== */}
          <svg
            className="text-[1.5rem] font-sans fill-transparent hidden lg:flex"
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
          <div className="flex space-x-4">
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

          {/**Logiin button ================== */}
          <button className="bg-slate-800 h-10 w-[7rem] rounded-md text-slate-300 font-semibold tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-800 hover:bg-slate-800">
            Log-In
          </button>
        </div>
      </nav>

      {/** Hero Section ========================= */}
      <section className="w-full bg-gradient-to-b from-slate-300 to-slate-50 p-6">
        <div
          style={{ backgroundImage: `url(${HeroImg})` }}
          className="w-[90%] md:w-full container 2xl:w-[75rem]  m-auto h-[30rem] rounded-xl bg-slate-900 mt-[-15rem] bg-no-repeat bg-center bg-cover overflow-hidden"
        >
          <div className="w-full h-full bg-[#0e0c4ebe] p-10 px-36 flex flex-col justify-center items-center gap-4">
            <h1 className="text-[4rem] leading-[4rem] text-slate-100 font-bold text-center">
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
      <section className="w-[90%] md:w-full container mt-4 m-auto 2xl:w-[75rem] grid grid-cols-2 gap-4 py-4">
        <div className="col-span-1 flex flex-col justify-center p-4">
          <div className="border-b border-slate-300 space-y-4 py-2">
            <h2 className="text-slate-800 text-2xl font-bold tracking-tightest">
              Stay on top of your customers
            </h2>
            <p className="text-slate-600">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
              assumenda est voluptates eligendi? Minus, dolore quo nesciunt
              rerum dolor aspernatur officiis, veritatis repellat voluptatum
              velit pariatur ullam facilis sapiente quidem!
            </p>
            <button className="bg-slate-800 text-base h-10 w-[8rem] rounded-md text-slate-300 tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-700 hover:bg-slate-900">
              Get started
            </button>
          </div>
          <p className="text-slate-500 text-sm mt-4">
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
            assumenda est voluptates eligendi? Minus"
          </p>
          <div className="w-full flex items-center space-x-2">
            <div className="h-10 w-10 mt-2 rounded-full bg-slate-800 text-slate-400 flex justify-center items-center"></div>
            <p className="font-semibold text-sm text-slate-800">
              Matt Johns, Digital Markket Manager
            </p>
          </div>
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
      <section className="w-[90%] md:w-full container mt-4 m-auto 2xl:w-[75rem] grid grid-cols-2 gap-4 py-4 px-2 overflow-hidden">
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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
              assumenda est voluptates eligendi? Minus, dolore quo nesciunt
              rerum dolor aspernatur officiis, veritatis repellat voluptatum
              velit pariatur ullam facilis sapiente quidem!
            </p>
            <button className="bg-slate-800 text-base h-10 w-[8rem] rounded-md text-slate-300 tracking-wide outline-none focus:outline-none focus:ring focus:ring-slate-700 hover:bg-slate-900">
              Get started
            </button>
          </div>
        </div>
      </section>

      {/**Third Section ============================== */}
      <section className="w-[90%] md:w-full container mt-4 mb-2 m-auto 2xl:w-[75rem] h-[30rem] bg-slate-900 p-6 rounded-xl">
        <h2 className="text-slate-200 text-2xl font-bold font-sans tracking-tightest">
          Support Inbox built for sufficency
        </h2>
        <p className="text-slate-400 text-base mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit quibusdam fuga enim accusamus quisquam eveniet atque, dignissimos rem labore, numquam architecto aspernatur non error? Assumenda non minima eius quibusdam necessitatibus.</p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-slate-800 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-800 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-800 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-800 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-800 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-800 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-800 col-span-1 h-[10rem] rounded-xl"></div>
          <div className="bg-slate-800 col-span-1 h-[10rem] rounded-xl"></div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
