import React from "react";
import { FaDyalog, FaSellsy, FaHome, FaSlack } from "react-icons/fa";
import Background from "./images/welcome.png";

const LogIn = () => {
  return (
    <div className="bg-slate-900 w-screen h-screen min-h-[45rem] flex relative overflow-hidden">
      {/**Top Nav ================= */}
      <nav className="absolute w-[75%] h-16 bg-transparent backdrop-blur-lg rounded-[1.25rem] border border-slate-500 top-4 left-[12%] p-2 px-4 flex justify-between items-center">
        <h3 className="uppercase font-semibold text-lg text-gray-200 flex items-center">
          <FaDyalog className="inline-block" />
          ial n Dine
        </h3>
        <div className="text-gray-200 flex space-x-10">
          <a href="" className="flex items-center space-x-1 hover:opacity-80">
            <FaSellsy
              className="inline-block
			  "
            />
            <span>Dashboard</span>
          </a>
          <a href="" className="flex items-center space-x-1 hover:opacity-80">
            <FaHome
              className="inline-block
			  "
            />
            <span>Home</span>
          </a>
        </div>
        <a
          href=""
          className="flex items-center space-x-1 bg-blue-700 cursor-pointer outline-none focus:outline-none transition-bg duration-300 hover:bg-blue-800 text-gray-200 rounded-xl p-2 px-4"
        >
          <FaSlack className="text-lg inline-block" />
          <span>Our Workspace</span>
        </a>
      </nav>

      {/**First Half ================ */}
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="hidden lg:flex lg:flex-col w-[50%] h-full  bg-no-repeat bg-cover bg-center items-center justify-center"
      >
        <h2 className="uppercase font-bold text-gray-200 text-2xl tracking-[.5rem]">
          Inspired by the future :
        </h2>
        <h1 className="uppercase font-bold text-gray-200 text-[2.5rem] tracking-[.5rem]">
          Dial & Dine Help-desk
        </h1>
      </div>

      {/**Second Half ==================================== */}
      <div className="w-full lg:w-[50%] h-full bg-gradient-to-t to-[#0c0c34] from-[#040b22] lg:pl-14 p-2">
        <div className="w-full h-full flex flex-col items-center lg:items-start justify-center p-2 space-y-4">
          <h2 className="font-bold text-gray-200 text-3xl font-['Plus Jakarta','Helvetica','Arial','sans-serif']">
            Nice to see you!
          </h2>
          <h4 className="text-gray-200">
            Enter your username and password to sign in
          </h4>
          <div className="w-[23rem] h-[28rem] border border-slate-600 rounded-[1.25rem] bg-[#131538] p-8">
            <form
              action=""
              className="text-gray-200 flex flex-col justify-center h-full"
            >
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Your username..."
                  className="log_In_Input input:-webkit-autofill input:-webkit-autofill:hover input:-webkit-autofill:focus textarea:-webkit-autofill textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus select:-webkit-autofill select:-webkit-autofill:hover select:-webkit-autofill:focus"
                />
              </div>
              {/** Password ========================= */}
              <div className="flex flex-col space-y-2 mt-6">
                <label className="font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password..."
                  className="log_In_Input input:-webkit-autofill input:-webkit-autofill:hover input:-webkit-autofill:focus textarea:-webkit-autofill textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus select:-webkit-autofill select:-webkit-autofill:hover select:-webkit-autofill:focus"
                />
              </div>
              <button className="h-12 mt-6 bg-blue-700 outline-none focus:outline-none hover:bg-blue-800 text-gray-300 transition-bg duration-300 w-full rounded-[1.25rem] uppercase font-bold text-xs">
                Sing In
              </button>
              <small className="mt-4 text-gray-400 flex justify-center">
                Forgot password ?
                <a href="" className="text-blue-500 pl-1">
                  Reset
                </a>
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
