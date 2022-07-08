import { FC } from "react";

type Props = {
  name: string;
};

const NavlinkToolTip: FC<Props> = ({ name }) => {
  return (
    <div className="hidden group-hover:flex absolute left-[110%] top-0 text-xs text-slate-200 font-sans bg-slate-900 border border-slate-900 rounded-sm before:contents-[''] before:h-3 before:w-3 before:absolute before:bg-inherit before:border before:border-l-inherit before:border-b-inherit before:border-r-0 before:border-t-0 before:left-[-0.3rem] before:top-2.5 before:rotate-45 shadow-2xl drop-shadow-2xl z-[99999]">
      <div className="w-full h-full p-2 px-3 bg-inherit rounded">{name}</div>
    </div>
  );
};

export default NavlinkToolTip;
