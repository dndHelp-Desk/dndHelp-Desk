import { FC } from "react";

type Props = {};

const UniversalSearch: FC<Props> = () => {
  return (
    <div className="hidden absolute top-9 z-[99999] h-44 w-full rounded-sm shadow-2xl bg-slate-100 dark:bg-slate-600 border border-slate-300 dark:border-slate-500 p-2">
      UniversalSearch
    </div>
  );
};

export default UniversalSearch;
