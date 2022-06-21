import { FC } from "react";
import gettingStartedIng from "./images/getting-started.webp";
import { BsArrowRight, BsFillCaretRightFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const BottomSection: FC = () => {
  return (
    <section className="w-full h-fit  rounded grid grid-col-1 gap-4">
      <article className="col-span-1 h-[12.5rem]  rounded dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-4 overflow-hidden">
        <h3 className="flex-[1] dark:text-slate-300 text-slate-900 text-base font-semibold font-sans capitalize tracking-normal py-2 border-b border-slate-200 dark:border-slate-700">
          Knowledge Base
        </h3>
        <p className="my-3 text-xs text-slate-600 dark:text-slate-400 font-medium tracking-normal overflow-hidden overflow-ellipsis leading-5 max-h-[5rem]">
          Optimize your workflows through automated FAQ responses, intent
          detection, and more. A knowledge base allows you to anticipate those
          needs before they're noticed by customers. As opposed to reactive
          support, which can leave customers frustrated. Benefits of a proactive
          knowledge base system include: Reduced ticket resolution times.
        </p>
        <Link
          to=""
          className="text-blue-700 text-sm font-semibold flex items-center space-x-2 tracking-normal"
        >
          <span>Learn how</span>
          <BsArrowRight />
        </Link>
      </article>

      {/**Getting Started =========== */}
      <div className="hidden col-span-1 h-[13rem]  rounded dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-4 overflow-hidden">
        <h3 className="flex-[1] dark:text-slate-300 text-slate-900 text-lg font-medium font-sans capitalize tracking-normal">
          Getting Started
        </h3>
        <div className="mt-3 w-full h-[8rem] grid grid-cols-2 gap-2 rounded">
          <div className="col-span-2 sm:col-span-1 rounded overflow-hidden relative after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-[#030d2798] after:content-['']">
            <img
              src={gettingStartedIng}
              alt="setting up"
              className="h-full w-full object-cover object-center"
            />
            <button className="absolute w-10 h-10 rounded border border-slate-100 z-[99] top-[35%] left-[45%] flex justify-center items-center outline-none focus:outline-none hover:opacity-80 transition-all">
              <BsFillCaretRightFill className="text-lg text-slate-50" />
            </button>
          </div>
          <div className="hidden sm:flex flex-col justify-center col-span-1 px-4 overflow-hidden">
            <h2 className="text-slate-800 dark:text-slate-300 text-base font-medium tracking-normal">
              Manage all tickets in one place
            </h2>
            <p className="my-2 text-slate-600 dark:text-slate-400 text-xs font-medium tracking-normal">
              Learn how to set up your dndHelp-Desk account and fully unlock
              it's potential.
            </p>
            <Link
              to=""
              className="text-blue-700 text-sm font-semibold flex items-center space-x-2 tracking-normal"
            >
              <span>See full playlist</span>
              <BsArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomSection;
