import React from "react";
import darkLogo from "./images/dndHelp-Desk_Dark.png";



function Footer() {

  //Component =============================
  return (
    <>
      <div className=" bg-linear-pink-invert pb-12 w-[90%] md:w-full container mt-4 m-auto 2xl:w-[75rem] overflow-hidden">
        <div className="mx-auto container pt-2 border-t border-slate-300 flex flex-col items-center justify-center">
          <div className="text-slate-600 flex flex-col md:items-center justify-center f-f-l pt-3">
            {/**Logo ==================== */}
            <div className="h-full hidden lg:flex items-center justify-center overflow-hidden pt-1">
                <img
                  src={darkLogo}
                  alt="logo"
                  className="object-cover object-center w-[10rem]"
                />
            </div>

            <div className="my-6 text-base text-color f-f-l">
              <ul className="md:flex items-center">
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">About</li>
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">
                  Features
                </li>
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">
                  Pricing
                </li>
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">
                  Careers
                </li>
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">Help</li>
                <li className="cursor-pointer pt-4 lg:py-0">Privacy Policy</li>
              </ul>
            </div>
            <div className="text-sm text-color mb-10 f-f-l">
              <p>
                {" "}
                © {new Date().getFullYear()} dndHelp-Desk. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
