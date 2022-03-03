import React from "react";
function Footer() {
  return (
    <>
      <div className=" bg-linear-pink-invert pb-12 w-[90%] md:w-full container mt-4 m-auto 2xl:w-[75rem] overflow-hidden">
        <div className="mx-auto container pt-2 border-t border-slate-300 flex flex-col items-center justify-center">
          <div className="text-slate-600 flex flex-col md:items-center justify-center f-f-l pt-3">
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
