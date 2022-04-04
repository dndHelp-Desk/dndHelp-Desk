import React,{useState} from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import darkLogo from "./images/dndHelp-Desk_Dark.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Help from "../Others/Help";

const Pricing = () => {
  const [menu, setMenu] = useState(false);
  const smallMenuRef = useOnClickOutside(() => {
    setMenu(false);
  });

  //Coimponent ==============================
  return (
    <>
      <section className="bg-slate-300 h-screen w-screen min-h-[40rem]">
        {/**Help Chat ============ */}
        <Help />

        {/**Navigation ========================== */}
        <nav className="w-full">
          <div className="w-full h-[4rem] z-[99] flex justify-between items-center bg-slate-300 border-b border-slate-500 px-12">
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
                to=""
                className="text-slate-900 font-semibold text-base hover:text-blue-600 "
              >
                Solutions
              </Link>
              <Link
                to="/getting-started"
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

        {/** //Section =======================*/}
        <div className="mt-12 mx-auto container">
          <div className="flex flex-col lg:items-center justify-center w-full">
            <h1 className="font-semibold text-gray-800 text-3xl md:text-4xl">
              Get started at no cost, then pay as you go.
            </h1>
            <p className="mt-2.5 lg:w-1/2 lg:text-center text-2xl">
              We have several plans to showcase your Business. Get everything
              you need
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="pt-14">
              <div className="container mx-auto">
                <div className="xl:w-4/5 w-11/12 mx-auto mb-28">
                  <div
                    className="flex justify-center items-center"
                    role="button"
                  >
                    <p className="mr-3 text-lg text-gray-600 font-bold">
                      Bill Monthly
                    </p>
                    <div className="cursor-pointer w-12 h-6 rounded-full relative shadow-sm">
                      <input
                        defaultChecked
                        type="checkbox"
                        name="toggle"
                        id="toggle2"
                        className="focus:outline-none checkbox w-4 h-4 rounded-full bg-indigo-700 transition duration-150 ease-in-out absolute m-1 shadow-sm appearance-none cursor-pointer"
                      />
                      <label
                        htmlFor="toggle2"
                        className="toggle-label block w-12 h-6 overflow-hidden rounded-full border border-indigo-700 cursor-pointer"
                      />
                    </div>
                    <p className="ml-3 text-lg font-normal text-gray-800">
                      Bill Anually
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap mb-12 justify-between sm:justify-center -mx-6">
                  <div className="w-full xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2 mb-4 px-6">
                    <div className="py-5 px-4 bg-white border border-gray-200shadow rounded-lg text-left">
                      <h4 className="text-2xl text-indigo-700 font-semibold pb-8">
                        Free
                      </h4>
                      <ul className="flex flex-col mb-6">
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-800 text-base font-normal">
                            24/7 access
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-800 text-base font-normal">
                            Order labs + Results
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="opacity-0 mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-400 text-base font-normal">
                            Radiology tests + Results
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="opacity-0 mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-400 text-base font-normal">
                            Partnership + Discounts
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="opacity-0 mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-400 text-base font-normal">
                            Direct doctor phone number
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="opacity-0 mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-400 text-base font-normal">
                            Specialists appoinments
                          </p>
                        </li>
                      </ul>
                      <p className="text-base text-indigo-700 relative pl-3 mb-5">
                        <span className="font-light text-lg">$</span>
                        <span className="text-2xl font-semibold">0</span>
                        <span className="text-gray-600 font-light text-lg">
                          /month
                        </span>
                      </p>
                      <Link
                        to="/company-set-up"
                        className="w-full bg-gray-200 hover:bg-gray-300 focus:outline-none transition duration-150 ease-in-out rounded text-indigo-700 px-8 text-base font-semibold py-3"
                      >
                        Choose
                      </Link>
                    </div>
                  </div>
                  <div className="w-full xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2 mb-4 px-6">
                    <div className="py-5 px-4 bg-indigo-700 border border-gray-200 shadow rounded-lg text-left">
                      <h4 className="text-2xl text-white font-semibold pb-8">
                        Basic
                      </h4>
                      <ul className="flex flex-col mb-6">
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMarkWhite.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-white text-base font-normal">
                            24/7 access
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMarkWhite.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-white text-base font-normal">
                            Order labs + Results
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMarkWhite.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-white text-base font-normal">
                            Radiology tests + Results
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMarkWhite.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-white text-base font-normal">
                            Partnership + Discounts
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="mr-4 opacity-0"
                            alt="check-mark"
                          />
                          <p className="text-indigo-700 text-base font-normal">
                            Direct doctor phone number
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="mr-4 opacity-0"
                            alt="check-mark"
                          />
                          <p className="text-indigo-700 text-base font-normal">
                            Specialists appoinments
                          </p>
                        </li>
                      </ul>
                      <p className="text-base text-white relative pl-3 mb-5">
                        <span className="font-light text-lg">$</span>
                        <span className="text-2xl font-semibold">5</span>
                        <span className="font-light text-lg">/month/User</span>
                      </p>
                      <Link
                        to="/company-set-up"
                        className="w-full text-indigo-700 focus:outline-none transition duration-150 ease-in-out rounded bg-white hover:bg-gray-100 px-8 text-base font-semibold py-3"
                      >
                        Try
                      </Link>
                    </div>
                  </div>
                  <div className="w-full xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-1/2 mb-4 px-6">
                    <div className="py-5 px-4 bg-white border border-gray-200shadow rounded-lg text-left">
                      <h4 className="text-2xl text-indigo-700 font-semibold pb-8">
                        Pro
                      </h4>
                      <ul className="flex flex-col mb-6">
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-800 text-base font-normal">
                            24/7 access
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-800 text-base font-normal">
                            Order labs + Results
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-800 text-base font-normal">
                            Radiology tests + Results
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-800 text-base font-normal">
                            Partnership + Discounts
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-800 text-base font-normal">
                            Direct doctor phone number
                          </p>
                        </li>
                        <li className="flex items-center mb-2.5">
                          <img
                            src="https://cdn.tuk.dev/assets/templates/weCare/checkMark.png"
                            className="mr-4"
                            alt="check-mark"
                          />
                          <p className="text-gray-800 text-base font-normal">
                            Specialists appoinments
                          </p>
                        </li>
                      </ul>
                      <p className="text-base text-indigo-700 relative pl-3 mb-5">
                        <span className="font-light text-lg">$</span>
                        <span className="text-2xl font-semibold">10</span>
                        <span className="font-light text-lg">/month/User</span>
                      </p>
                      <Link
                        to="/company-set-up"
                        className="w-full bg-gray-200 hover:bg-gray-300 focus:outline-none transition duration-150 ease-in-out rounded text-indigo-700 px-8 text-base font-semibold py-3"
                      >
                        Choose
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html: "",
                }}
              />
            </div>
          </div>
        </div>
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
