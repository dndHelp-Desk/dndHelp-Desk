import { FC } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const BottomSection: FC = () => {
  return (
    <section className=" row-span-1 w-full h-full  rounded">
      <article className="h-full w-full  rounded dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-4 overflow-hidden">
        <div className="flex-[1] dark:text-slate-300 text-slate-800 text-base font-semibold font-sans capitalize py-2 border-b border-slate-200 dark:border-slate-700 tracking-wider">
          Knowledge Base
        </div>
        <p className="my-3 text-xs text-slate-800 dark:text-slate-400 font-medium tracking-normal overflow-hidden overflow-ellipsis leading-5 max-h-[5rem]">
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
    </section>
  );
};

export default BottomSection;
