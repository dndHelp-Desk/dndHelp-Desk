import { FC, useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { RichTextEditor } from "@mantine/rte";
import { newTemplate } from "../../Data_Fetching/TicketsnUserData";

const NewTemplate: FC = () => {
  const [value, onChange] = useState("");
  const [input, setInput] = useState({
    name: "",
    message: "",
  });

  useEffect(() => {
    setInput((previous: any) => ({ ...previous, message: value }));
  }, [value]);

  //Component =======================
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        newTemplate(input.name, input.message);
        onChange("");
        setInput({
          name: "",
          message: "",
        });
      }}
      className="col-span-2 lg:col-span-1 space-y-4 p-4"
    >
      <h1 className="text-base text-center dark:text-slate-400 text-slate-800 uppercase font-bold font-sans">
        New template
      </h1>
      <div className="flex justify-between items-center gap-4 h-11">
        <div className="h-full w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="nope"
            placeholder="Name ..."
            onChange={(e) => {
              setInput({ ...input, name: e.target.value });
            }}
            value={input.name}
            className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-800 dark:text-slate-400 dark:bg-slate-800 bg-slate-200"
          />
          <BiDetail className="absolute text-slate-500 text-lg top-3 left-4" />
        </div>
        <button
          type="submit"
          className="h-full m-auto px-8 p-2 rounded outline-none focus:outline-none bg-blue-600 text-slate-100 font-medium"
        >
          Create
        </button>
      </div>

      {/**Text Editor =============== */}
      <div className="w-full h-[30rem] rounded border dark:border-slate-700 border-slate-400 dark:bg-slate-800 bg-slate-100 overflow-hidden text-slate-800 dark:text-slate-400">
        <RichTextEditor
          value={value}
          onChange={onChange}
          className="h-full w-full border-0 bg-white dark:bg-slate-800 text-inherit overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar rounded-none"
          classNames={{
            toolbar:
              "flex justify-center items-center w-full text-inherit border-slate-200 dark:border-slate-800 rounded-none dark:bg-[#182235] bg-slate-100",
            toolbarInner:
              "bg-inherit text-inherit border-slate-300 dark:border-slate-700",
            toolbarGroup:
              "bg-inherit text-inherit border-slate-300 dark:border-slate-700",
            toolbarControl:
              "bg-inherit text-inherit border-slate-300 dark:border-slate-700 leading-2",
            root: "h-[30rem] overflow-hidden overflow-y-scroll",
          }}
          controls={[
            ["bold", "italic", "underline", "code", "blockquote"],
            ["unorderedList", "orderedList", "h1", "h2", "h3"],
            ["sup", "sub", "strike", "image"],
            ["alignLeft", "alignCenter", "alignRight", "link"],
          ]}
        />
      </div>
    </form>
  );
};

export default NewTemplate;
