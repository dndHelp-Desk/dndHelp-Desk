import React from "react";
import {
  BsDashSquare,
  BsCheckAll,
  BsArrowRepeat,
  BsEnvelopeOpen,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import cardsBg from "./image/cardsBg.svg";
import { useSelector } from "react-redux";

const TopCards = () => {
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const filters = useSelector((state) => state.Tickets.filters);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const firstMessages =
    allTickets.length >= 1 &&
    allTickets.filter((ticket) => ticket.message_position === 1);

  //Cards Data ==============
  const cardsData = [
    {
      name: "resolved",
      id: 1,
      count:
        filteredTickets.length >= 1
          ? filteredTickets.filter(
              (data) => data.status.toLowerCase() === "resolved"
            ).length
          : 0,
      compare:
        firstMessages.length >= 1
          ? firstMessages.filter(
              (data) =>
                data.status.toLowerCase() === "resolved" &&
                new Date(data.date).toISOString() >=
                  new Date(filters.startDate).toISOString() &&
                new Date(
                  filters.startDate !== null && data.date
                ).toISOString() >=
                  new Date(
                    filters.endDate !== null && filters.endDate
                  ).toISOString()
            ).length
          : 0,
    },
    {
      name: "closed",
      id: 2,
      count:
        filteredTickets.length >= 1
          ? filteredTickets.filter(
              (data) => data.status.toLowerCase() === "closed"
            ).length
          : 0,
      compare:
        firstMessages.length >= 1
          ? firstMessages.filter(
              (data) =>
                data.status.toLowerCase() === "closed" &&
                new Date(data.date).toISOString() >=
                  new Date(filters.startDate).toISOString() &&
                new Date(
                  filters.startDate !== null && data.date
                ).toISOString() >=
                  new Date(
                    filters.endDate !== null && filters.endDate
                  ).toISOString()
            ).length
          : 0,
    },
    {
      name: "open",
      id: 3,
      count:
        filteredTickets.length >= 1
          ? filteredTickets.filter(
              (data) => data.status.toLowerCase() === "open"
            ).length
          : 0,
      compare:
        firstMessages.length >= 1
          ? firstMessages.filter(
              (data) =>
                data.status.toLowerCase() === "open" &&
                new Date(data.date).toISOString() >=
                  new Date(filters.startDate).toISOString() &&
                new Date(
                  filters.startDate !== null && data.date
                ).toISOString() >=
                  new Date(
                    filters.endDate !== null && filters.endDate
                  ).toISOString()
            ).length
          : 0,
    },
    {
      name: "pending",
      id: 4,
      count:
        filteredTickets.length >= 1
          ? filteredTickets.filter(
              (data) => data.status.toLowerCase() === "pending"
            ).length
          : 0,
      compare:
        firstMessages.length >= 1
          ? firstMessages.filter(
              (data) =>
                data.status.toLowerCase() === "pending" &&
                new Date(data.date).toISOString() >=
                  new Date(filters.startDate).toISOString() &&
                new Date(
                  filters.startDate !== null && data.date
                ).toISOString() >=
                  new Date(
                    filters.endDate !== null && filters.endDate
                  ).toISOString()
            ).length
          : 0,
    },
  ];

  //Looping Through Each Items ==============
  const cards = cardsData.map((data) => {
    return (
      <div
        style={{ backgroundImage: `url(${cardsBg})` }}
        key={data.id}
        className="bg-slate-900 h-[10rem]  cols-span-1 rounded-xl
		 p-4 grid-rows-3 bg-no-repeat bg-bottom"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-slate-400 font-semibold font-sans text-base capitalize">
            {data.name}
          </h2>
          <div className="h-10 w-10 rounded-xl flex items-center justify-center font-bold text-lg text-slate-300 bg-blue-700 custom-shadow">
            {data.name === "open" && <BsEnvelopeOpen />}
            {data.name === "pending" && <BsArrowRepeat />}
            {data.name === "closed" && <BsDashSquare />}
            {data.name === "resolved" && <BsCheckAll />}
          </div>
        </div>
        <div className="flex justify-start items-center">
          <h3 className="text-slate-400 font-bold font-sans text-[2rem]">
            {data.count}
          </h3>
        </div>
        <div className="flex justify-start items-center overflow-hidden">
          <h5
            className={`${
              data.count - data.compare >= 0 ? "text-green-600" : "text-red-600"
            } flex space-x-1 items-center font-bold font-sans text-sm`}
          >
            {data.count - data.compare >= 0 && (
              <>
                <span>
                  {((data.count - data.compare / data.count) * 100).toFixed(
                    1
                  ) === "NaN" ||
                  ((data.count - data.compare / data.count) * 100).toFixed(
                    1
                  ) === "-Infinity"
                    ? 0
                    : ((data.count - data.compare / data.count) * 100).toFixed(
                        1
                      )}
                  %
                </span>{" "}
                <HiTrendingUp />
                <small>Increase</small>
              </>
            )}
            {data.count - data.compare < 0 && (
              <>
                <span>
                  {((data.count - data.compare / data.count) * 100).toFixed(
                    1
                  ) === "NaN" ||
                  ((data.count - data.compare / data.count) * 100).toFixed(
                    1
                  ) === "-Infinity"
                    ? 0
                    : ((data.count - data.compare / data.count) * 100).toFixed(
                        1
                      )}
                  %
                </span>{" "}
                <HiTrendingDown />
                <small>Decrease</small>
              </>
            )}
          </h5>
        </div>
      </div>
    );
  });

  //Component ==================================
  return (
    <div className="w-full rounded-xl grid grid-cols-2 md:grid-cols-4 3xl:grid-cols-5 gap-4 overflow-hidden">
      {cards}
      <div className="bg-slate-900 h-[10rem]  cols-span-1 rounded-xl hidden 3xl:flex flex-col justify-center space-y-4 p-5">
        <div className="w-full flex justify-between p-1 text-sm font-bold text-slate-500 font-sans">
          <h3>Labels</h3>
          <BsThreeDotsVertical className="text-lg cursor-pointer" />
        </div>
        <div className="w-full flex flex-wrap gap-2 p-1 font-medium text-blue-700 font-sans">
          <div className="border border-blue-700 py-1 px-3 h-7 flex justify-center items-center rounded-lg text-xs">
            Resolve
          </div>
          <div className="border border-blue-700 py-1 px-3 h-7 flex justify-center items-center rounded-lg text-xs">
            Closed
          </div>
          <div className="text-slate-300 bg-blue-700 py-1 px-3 h-7 flex justify-center items-center rounded-lg text-xs">
            Open
          </div>
          <div className="border border-blue-700 py-1 px-3 h-7 flex justify-center items-center rounded-lg text-xs">
            Pending
          </div>
          <div className="border border-blue-700 py-1 px-3 h-7 flex justify-center items-center rounded-lg text-xs">
            Urgent
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
