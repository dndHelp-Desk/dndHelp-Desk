import React from "react";
import {
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
  BsEmojiFrownFill,
} from "react-icons/bs";
import CategoryPies from "./CategoryPies";
import { useSelector } from "react-redux";

const AdditionalStats = () => {
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const settings = useSelector((state) => state.Tickets.settings);
  const categories = settings.length >= 1 && settings[0].categories;
  const dataArray = []
   categories.length >= 1 && categories.forEach(element => {
    dataArray.push({
      name: element,
      value:
        (((filteredTickets.length >= 1 &&
          filteredTickets.filter(
            (ticket) => ticket.category.toLowerCase() === element.toLowerCase()
          ).length) / filteredTickets.length) * 100).toFixed(1),
    });
  });

  dataArray.sort((a,b)=>{
    return Number(b.value) - Number(a.value)
  })

  const topThree = dataArray.length >= 3 ? dataArray.slice(0,3): dataArray 
  const category = topThree.length >= 1 && topThree.map((element,index)=>{
    return (
      <div
        key={index}
        className="col-span-1 flex flex-col space-y-1 overflow-hidden items-center justify-center"
      >
        <CategoryPies data={element.value} />
        <h3 className="dark:text-slate-400 text-slate-500 text-base font-bold">
          {Number(element.value) ? parseFloat(element.value) : "0.00"}%
        </h3>
        <h3 className="text-slate-500 text-xs font-semibold">{element.name}</h3>
      </div>
    );
  })

  //Component ==========================================
  return (
    <div className="col-span-3 lg:col-span-2 rounded-xl grid grid-rows-2 gap-4">
      <div className="row-span-1 dark:bg-slate-900 bg-white rounded-xl space-y-2 p-4 pt-6">
        <h2 className="text-base dark:text-slate-400 text-slate-500 font-sans font-semibold tracking-normal">
          Top 3 Categories
        </h2>
        <div className="grid grid-cols-3 gap-1 xl:gap-3 px-1 xl:px-4">
          {category}
        </div>
      </div>
      <div className="row-span-1 dark:bg-slate-900 bg-white rounded-xl space-y-2 p-4 pt-6 overflow-hidden">
        <h2 className="text-base dark:text-slate-400 text-slate-500 font-sans font-semibold tracking-normal">
          Customer Satisfaction
        </h2>
        <div className="grid grid-cols-3 gap-2 xl:gap-4 w-full xl:px-2 2xl:px-4 overflow-hidden">
          <div className="h-32 space-y-2 col-span-1 rounded-xl dark:bg-slate-800 bg-slate-100 flex flex-col items-center justify-center p-2">
            <BsEmojiSmileFill className="text-3xl text-green-500" />
            <h5 className="dark:text-slate-400 text-slate-500 text-base font-sans font-bold">
              {" "}
              70%
            </h5>
            <h6 className="text-slate-500 text-base font-sans font-medium">
              {" "}
              Positive
            </h6>
          </div>
          <div className="h-32 space-y-2 col-span-1 rounded-xl dark:bg-slate-800 bg-slate-100 flex flex-col items-center justify-center p-2">
            <BsEmojiNeutralFill className="text-3xl text-yellow-500" />
            <h5 className="dark:text-slate-400 text-slate-500 text-base font-bold font-sans">
              {" "}
              20%
            </h5>
            <h6 className="text-slate-500 text-base font-medium font-sans">
              {" "}
              Neutral
            </h6>
          </div>
          <div className="h-32 space-y-2 col-span-1 rounded-xl dark:bg-slate-800 bg-slate-100 flex flex-col items-center justify-center p-2">
            <BsEmojiFrownFill className="text-3xl text-red-500" />
            <h5 className="dark:text-slate-400 text-slate-500 text-base font-bold font-sans">
              {" "}
              10%
            </h5>
            <h6 className="text-slate-500 text-base font-medium font-sans">
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
