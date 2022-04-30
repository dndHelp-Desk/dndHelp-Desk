import { FC } from "react";
import { useSelector } from "react-redux";
import NewTemplate from "./NewTemplate";
import { RootState } from "./../../../Redux/store";
import { BiTrash } from "react-icons/bi";
import { deleteTemplate } from "./../../Data_Fetching/TicketsnUserData";

const Templates: FC = () => {
  const templates = useSelector(
    (state: RootState) => state.Tickets.email_templates
  );

  //Component =========================
  return (
    <div className="w-full min-h-[45rem] rounded bg-white dark:bg-slate-800 p-6 grid grid-cols-2 gap-4">
      <NewTemplate />
      {/**Templates List */}
      <div className="col-span-2 lg:col-span-1 p-2 h-full flex flex-col gap-4 overflow-hidden overflow-y-scroll">
        {templates.length >= 1 &&
          templates.map((template) => {
            return (
              <article
                key={template.id}
                className="template w-full bg-slate-50 dark:bg-[#182235] border border-slate-200 dark:border-slate-700 rounded text-slate-800 dark:text-slate-300 p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-base font-semibold capitalize">
                    <span>{template?.name} Template</span>
                  </div>
                  <button
                    onClick={() => {
                      prompt("Enter Pin To Perform Action") === "0001"
                        ? deleteTemplate(template.id)
                        : alert("Wrong Pin");
                    }}
                    className="w-10 h-10 rounded outline-none focus:outline-none hover:text-red-600 transition-all"
                  >
                    <BiTrash />
                  </button>
                </div>
                <div
                  className="text-sm dark:text-slate-400"
                  dangerouslySetInnerHTML={{ __html: template?.message }}
                ></div>
              </article>
            );
          })}
      </div>
    </div>
  );
};

export default Templates;
