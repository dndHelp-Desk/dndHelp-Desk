import { FC } from "react";

type Props = {
  openPanel: boolean;
  setActionPanel: any;
  deleteSelected: any;
  option: string;
};

const ActionPanel: FC<Props> = ({
  openPanel,
  setActionPanel,
  deleteSelected,
  option,
}) => {
  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 z-[9999] flex justify-center items-center ${
        openPanel ? "" : "hidden"
      }`}
    >
      <div
        id="actionPanel"
        className={`drop-shadow-2xl bg-slate-50 dark:bg-slate-800 rounded h-[60vh] md:h-[12rem] md:w-[27rem] w-[50vw] flex flex-col justify-between p-4 pt-2 border border-slate-200 dark:border-slate-700 transition-all duration-300 z-[999]`}
      >
        <div className="flex w-full justify-between items-center text-slate-800 dark:text-slate-300 text-sm font-medium">
          <h2>{`Delete this ${option} ?`}</h2>
          <button
            onClick={() => {
              setActionPanel(false);
            }}
            className="text-xl outline-none focus:outline-none"
          >
            &times;
          </button>
        </div>

        <p className="text-slate-800 dark:text-slate-300 text-xs">
          {`Are you sure you want to delete this ${option}? This action is
          destructive and can not be undone. All the data related to this ${option}
          will be permanently removed.`}
        </p>
        <div className="flex justify-end items-center space-x-4">
          <button
            onClick={() => {
              setActionPanel(false);
            }}
            className="h-8 rounded-sm text-xs font-normal hover:opacity-80 transition-all duration-200 px-6 bg-blue-700 text-slate-50 outline-none focus:outline-none"
          >
            Cancel action
          </button>
          <button
            onClick={() => {
              deleteSelected();
              setActionPanel(false);
            }}
            className="h-8 rounded-sm text-xs font-normal hover:opacity-80 transition-all duration-200 px-6 bg-red-600 text-slate-50 outline-none focus:outline-none"
          >
            {`Delete ${option}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;
