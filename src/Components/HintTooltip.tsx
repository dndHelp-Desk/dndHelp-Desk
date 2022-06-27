import { FC } from "react";

type Props = {
  details: string;
  positions: any;
};

const HintTooltip: FC<Props> = ({ details, positions }) => {
  return (
    <div
      role="tooltip"
      className={`delayDisplay hidden group-hover:flex absolute min-w-full min-h-8 p-2 px-4 bg-slate-900 text-slate-50 text-xs font-sans font-medium tracking-wider rounded whitespace-nowrap transition-all duration-200 border border-slate-500 z-[999] shadow-2xl drop-shadow-2xl ${positions.vertical} ${positions.horizontal}`}
    >
      {details}
    </div>
  );
};

export default HintTooltip;
