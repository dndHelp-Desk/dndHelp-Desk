import { FC } from "react";

type Props = {
  name: string;
};

const NavlinkToolTip: FC<Props> = ({ name }) => {
  return (
    <div className="hidden group-hover:flex absolute left-[110%] top-0 text-xs text-slate-200 font-sans bg-slate-600 rounded-sm before:contents-[''] before:h-3 before:w-3 before:absolute before:bg-inherit before:left-[-0.35rem] before:top-2.5 before:rotate-45 shadow-2xl drop-shadow-2xl z-[99999]">
      <div className="w-full h-full p-2 px-3 bg-inherit rounded">{name}</div>
    </div>
  );
};

export default NavlinkToolTip;
