import React from "react";
import {
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
  BsEmojiFrownFill,
} from "react-icons/bs";
import CategoryPies from "./CategoryPies";

const AdditionalStats = () => {
  return (
    <div className="col-span-3 lg:col-span-2 rounded-xl grid grid-rows-2 gap-4">
      <div className="row-span-1 bg-slate-900 rounded-xl space-y-2 p-4 pt-6">
        <h2 className="text-base text-slate-400 font-sans font-semibold tracking-normal">
          Top 3 Categories
        </h2>
        <div className="grid grid-cols-3 gap-1 xl:gap-3 px-1 xl:px-4">
          <div className="col-span-1 flex flex-col space-y-1 overflow-hidden items-center justify-center">
            <CategoryPies data={23} />
            <h3 className="text-slate-400 text-base font-bold">23</h3>
            <h3 className="text-slate-500 text-xs font-semibold">
              Late Deliveries
            </h3>
          </div>
          <div className="col-span-1 flex flex-col space-y-1 overflow-hidden items-center justify-center">
            <CategoryPies data={43} />
            <h3 className="text-slate-400 text-base font-bold">40</h3>
            <h3 className="text-slate-500 text-xs font-semibold">Offiline</h3>
          </div>
          <div className="col-span-1 flex flex-col space-y-1 overflow-hidden items-center justify-center">
            <CategoryPies data={53} />
            <h3 className="text-slate-400 text-base font-bold">53</h3>
            <h3 className="text-slate-500 text-xs font-semibold">Complaints</h3>
          </div>
        </div>
      </div>
      <div className="row-span-1 bg-slate-900 rounded-xl space-y-2 p-4 pt-6 overflow-hidden">
        <h2 className="text-base text-slate-400 font-sans font-semibold tracking-normal">
          Customer Satisfaction
        </h2>
        <div className="grid grid-cols-3 gap-2 xl:gap-4 w-full xl:px-2 2xl:px-4 overflow-hidden">
          <div className="h-32 col-span-1 rounded-xl bg-slate-800 flex flex-col items-center justify-center p-2">
            <BsEmojiSmileFill className="text-3xl text-green-500" />
            <h5 className="text-slate-400 text-lg font-sans font-bold"> 70%</h5>
            <h6 className="text-slate-500 text-lg font-sans font-medium">
              {" "}
              Positive
            </h6>
          </div>
          <div className="h-32 col-span-1 rounded-xl bg-slate-800 flex flex-col items-center justify-center p-2">
            <BsEmojiNeutralFill className="text-3xl text-yellow-500" />
            <h5 className="text-slate-400 text-lg font-bold font-sans"> 20%</h5>
            <h6 className="text-slate-500 text-lg font-medium font-sans">
              {" "}
              Neutral
            </h6>
          </div>
          <div className="h-32 col-span-1 rounded-xl bg-slate-800 flex flex-col items-center justify-center p-2">
            <BsEmojiFrownFill className="text-3xl text-red-500" />
            <h5 className="text-slate-400 text-lg font-bold font-sans"> 10%</h5>
            <h6 className="text-slate-500 text-lg font-medium font-sans">
              {" "}
              Negative
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalStats;
