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
          A knowledge base is a digital library containing product, service, and
          topical information. It is the ultimate self-service resource used by
          customers, employees, and support teams. Enabling them to quickly and
          easily find solutions to common issues. It consists of FAQs, manuals,
          how-to guides, and troubleshooting information. With each resource
          providing a solution to a commonly asked question.
        </p>
        <Link
          to=""
          className="text-blue-700 text-sm font-medium flex items-center space-x-2 tracking-normal"
        >
          <span>Browse solutions</span>
          <BsArrowRight />
        </Link>
      </article>
    </section>
  );
};

export default BottomSection;
