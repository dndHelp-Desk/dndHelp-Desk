import { FC, useState } from "react";
import { TbChevronLeft, TbChevronRight, TbCalendarEvent } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import {
  updateTicketsComponentDates,
  changeLoadingStatus,
} from "../Redux/Slices/Tickets_n_Settings_Slice";
import useOnClickOutside from "../Custom-Hooks/useOnClickOutsideRef";

type Props = { openDatePicker: any; setDateOpen: any };

const DatePicker: FC<Props> = ({ openDatePicker, setDateOpen }) => {
  const dispatch: AppDispatch = useDispatch();
  const ticketsComponentDates = useSelector(
    (state: RootState) => state.Tickets.ticketsComponentDates
  );
  const [startDate, setStartDate] = useState<any>(
    ticketsComponentDates?.startDate
  );
  const [endDate, setEndDate] = useState<any>(ticketsComponentDates?.endDate);
  const [months, setMonths] = useState<any>([
    startDate,
    new Date(
      new Date(startDate)?.setMonth(new Date(startDate).getMonth() + 1)
    )?.getTime(),
  ]);

  //Check if start Date is selected  ==============
  const [startSelected, setStartSelect] = useState<boolean>(false);

  //Overlap Start Dates ==============
  const overlapStartDate = () => {
    let days = new Date(
      new Date(months[0]).getFullYear(),
      new Date(months[0]).getMonth(),
      1
    ).getDay();
    let arr = [];
    for (let i = 1; i <= days; i++) {
      arr.push(i);
    }
    return arr;
  };
  const overlapStartDateTwo = () => {
    let days = new Date(
      new Date(months[1]).getFullYear(),
      new Date(months[1]).getMonth(),
      1
    ).getDay();
    let arr = [];
    for (let i = 1; i <= days; i++) {
      arr.push(i);
    }
    return arr;
  };

  //Days In A Month
  const getDays = (year: number, month: number) => {
    let days = new Date(year, month, 0).getDate();
    let arr = [];
    for (let i = 1; i <= days; i++) {
      arr.push({ day: i, dayMilli: new Date(year, month, i).getTime() });
    }
    return arr;
  };

  //Close Picker OnClick Outside ======
  const pickerRef = useOnClickOutside(() => {
    setDateOpen(false);
  });

  //component =================
  return (
    <div ref={pickerRef} className="relative">
      <button
        onClick={() => {
          setDateOpen(true);
        }}
        className="h-9 w-[8rem] bg-white dark:bg-slate-800 outline-none focus:outline-none focus:border-slate-700 dark:focus:border-blue-600 border-b-2 border-slate-300 dark:border-slate-700 rounded-sm flex items-center justify-start px-2 relative"
      >
        <span className="text-xs dark:text-slate-300 text-slate-600 font-sans overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold dark:font-medium">
          Select Date
        </span>
        <TbCalendarEvent className="absolute text-lg top-2 right-2 dark:text-slate-400 text-slate-600" />
      </button>

      {/**Content ================== */}
      <div
        className={`absolute top-11 z-[99999] h-[18rem] w-[33rem] rounded-sm shadow-2xl bg-white dark:bg-slate-700 border border-slate-400 dark:border-slate-600 ${
          openDatePicker ? "grid" : "hidden"
        } grid-rows-6 text-slate-800 dark:text-slate-300`}
      >
        <div className="row-span-5 w-full grid grid-cols-2 gap-2">
          {/**First Half ================================================ */}
          <div className="col-span-1 space-y-1 p-2 overflow-hidden">
            <div className="h-7 w-full flex items-center justify-between p-2">
              <button
                onClick={() => {
                  setMonths((prev: any[]) => [
                    new Date(
                      new Date(prev[0]).setMonth(
                        new Date(prev[0]).getMonth() - 1
                      )
                    ).getTime(),
                    new Date(
                      new Date(prev[1]).setMonth(
                        new Date(prev[1]).getMonth() - 1
                      )
                    ).getTime(),
                  ]);
                }}
                className="h-6 w-6 flex items-center justify-center bg-slate-100 dark:bg-slate-750 hover:opacity-80 transition-all rounded"
              >
                <TbChevronLeft />
              </button>
              <div className="text-xs font-sans font-semibold uppercase flex items-center justify-center overflow-hidden whitespace-nowrap overflow-ellipsis w-28  tracking-wider">
                {new Date(
                  new Date(months[0]).getFullYear(),
                  new Date(months[0]).getMonth(),
                  1
                ).toLocaleString("en-us", {
                  month: "short",
                })}{" "}
                {new Date(months[0]).getFullYear()}
              </div>
            </div>
            {/**Heding ===================== */}
            <div className="h-7 w-full grid grid-cols-7">
              {["su", "mo", "tu", "we", "th", "fr", "sa"].map((day) => {
                return (
                  <div
                    key={day + 1}
                    className="col-span-1 h-full flex items-center justify-center text-xs capitalize"
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            {/**Day ===================== */}
            <div className="h-[10rem] w-full grid grid-cols-7 grid-rows-6 gap-1">
              {/**Overlap ============= */}
              {overlapStartDate()?.map((day) => {
                return (
                  <div
                    key={day + "h"}
                    className="col-span-1 row-span-1 h-full flex items-center justify-center text-xs capitalize "
                  ></div>
                );
              })}
              {/**Days ============= */}
              {getDays(
                new Date(months[0]).getFullYear(),
                new Date(months[0]).getMonth() + 1
              )?.map((day) => {
                return (
                  <button
                    onClick={() => {
                      if (!startSelected) {
                        setStartDate(
                          new Date(
                            new Date(day.dayMilli).setMonth(
                              new Date(day.dayMilli).getMonth() - 1
                            )
                          ).getTime()
                        );
                        setEndDate(null);
                        setStartSelect(true);
                      } else if (
                        startSelected &&
                        new Date(
                          new Date(day.dayMilli).setMonth(
                            new Date(day.dayMilli).getMonth() - 1
                          )
                        ).getTime() >= startDate
                      ) {
                        setEndDate(
                          new Date(
                            new Date(day.dayMilli).setMonth(
                              new Date(day.dayMilli).getMonth() - 1
                            )
                          ).getTime()
                        );
                        setStartSelect(false);
                      } else if (
                        new Date(
                          new Date(day.dayMilli).setMonth(
                            new Date(day.dayMilli).getMonth() - 1
                          )
                        ).getTime() < startDate
                      ) {
                        setStartDate(
                          new Date(
                            new Date(day.dayMilli).setMonth(
                              new Date(day.dayMilli).getMonth() - 1
                            )
                          ).getTime()
                        );
                        setEndDate(null);
                        setStartSelect(true);
                      }
                    }}
                    data-date={day.dayMilli}
                    key={day.dayMilli}
                    className={`col-span-1 h-full row-span-1 flex items-center justify-center text-xs capitalize transition-all outline-none focus:outline-none rounded-sm peer ${
                      new Date(
                        new Date(
                          new Date(day.dayMilli).setMonth(
                            new Date(day.dayMilli).getMonth() - 1
                          )
                        ).getTime()
                      ).toLocaleDateString() === new Date().toLocaleDateString()
                        ? "border border-slate-800 dark:border-blue-700"
                        : ""
                    } ${
                      new Date(
                        new Date(day.dayMilli).setMonth(
                          new Date(day.dayMilli).getMonth() - 1
                        )
                      ).getTime() === startDate
                        ? "bg-slate-800 dark:bg-blue-700 text-slate-50"
                        : ""
                    } ${
                      new Date(
                        new Date(day.dayMilli).setMonth(
                          new Date(day.dayMilli).getMonth() - 1
                        )
                      ).getTime() === endDate
                        ? "bg-slate-800 dark:bg-blue-700 text-slate-50"
                        : ""
                    } ${
                      new Date(
                        new Date(day.dayMilli).setMonth(
                          new Date(day.dayMilli).getMonth() - 1
                        )
                      ).getTime() > startDate &&
                      new Date(
                        new Date(day.dayMilli).setMonth(
                          new Date(day.dayMilli).getMonth() - 1
                        )
                      ).getTime() < endDate
                        ? "bg-slate-200 dark:bg-slate-750"
                        : ""
                    }`}
                  >
                    {day?.day}
                  </button>
                );
              })}
            </div>
          </div>
          {/**First Half ================================================ */}

          {/**Second Half ================================================ */}
          <div className="col-span-1 space-y-1 p-2 overflow-hidden">
            <div className="h-7 w-full flex items-center justify-between p-2">
              <div className="text-xs font-sans font-semibold uppercase flex items-center justify-center overflow-hidden whitespace-nowrap overflow-ellipsis w-28 tracking-wider">
                {new Date(
                  new Date(months[1]).getFullYear(),
                  new Date(months[1]).getMonth(),
                  1
                ).toLocaleString("en-us", {
                  month: "short",
                })}{" "}
                {new Date(months[1]).getFullYear()}
              </div>
              <button
                onClick={() => {
                  setMonths((prev: any[]) => [
                    new Date(
                      new Date(prev[0]).setMonth(
                        new Date(prev[0]).getMonth() + 1
                      )
                    ).getTime(),
                    new Date(
                      new Date(prev[1]).setMonth(
                        new Date(prev[1]).getMonth() + 1
                      )
                    ).getTime(),
                  ]);
                }}
                className="h-6 w-6 flex items-center justify-center bg-slate-100 dark:bg-slate-750 hover:opacity-80 transition-all rounded"
              >
                <TbChevronRight />
              </button>
            </div>
            {/**Heding ===================== */}
            <div className="h-7 w-full grid grid-cols-7">
              {["su", "mo", "tu", "we", "th", "fr", "sa"].map((day) => {
                return (
                  <div
                    key={day + "k"}
                    className="col-span-1 h-full flex items-center justify-center text-xs capitalize"
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            {/**Day ===================== */}
            <div className="h-[10rem] w-full grid grid-cols-7 grid-rows-6 gap-1">
              {/**Overlap ============= */}
              {overlapStartDateTwo()?.map((day) => {
                return (
                  <div
                    key={day + "f"}
                    className="col-span-1 row-span-1 h-full flex items-center justify-center text-xs capitalize "
                  ></div>
                );
              })}
              {/**Days ============= */}
              {getDays(
                new Date(months[1]).getFullYear(),
                new Date(months[1]).getMonth() + 1
              )?.map((day) => {
                return (
                  <button
                    onClick={() => {
                      if (!startSelected) {
                        setStartDate(
                          new Date(
                            new Date(day.dayMilli).setMonth(
                              new Date(day.dayMilli).getMonth() - 1
                            )
                          ).getTime()
                        );
                        setEndDate(null);
                        setStartSelect(true);
                      } else if (
                        startSelected &&
                        new Date(
                          new Date(day.dayMilli).setMonth(
                            new Date(day.dayMilli).getMonth() - 1
                          )
                        ).getTime() >= startDate
                      ) {
                        setEndDate(
                          new Date(
                            new Date(day.dayMilli).setMonth(
                              new Date(day.dayMilli).getMonth() - 1
                            )
                          ).getTime()
                        );
                        setStartSelect(false);
                      } else if (
                        new Date(
                          new Date(day.dayMilli).setMonth(
                            new Date(day.dayMilli).getMonth() - 1
                          )
                        ).getTime() < startDate
                      ) {
                        setStartDate(
                          new Date(
                            new Date(day.dayMilli).setMonth(
                              new Date(day.dayMilli).getMonth() - 1
                            )
                          ).getTime()
                        );
                        setEndDate(null);
                        setStartSelect(true);
                      }
                    }}
                    key={day.dayMilli}
                    className={`col-span-1 h-full row-span-1 flex items-center justify-center text-xs capitalize transition-all outline-none focus:outline-none rounded-sm peer ${
                      new Date(
                        new Date(
                          new Date(day.dayMilli).setMonth(
                            new Date(day.dayMilli).getMonth() - 1
                          )
                        ).getTime()
                      )?.toLocaleDateString() ===
                      new Date().toLocaleDateString()
                        ? "border border-slate-800 dark:border-blue-700"
                        : ""
                    } ${
                      new Date(
                        new Date(day.dayMilli).setMonth(
                          new Date(day.dayMilli).getMonth() - 1
                        )
                      ).getTime() === startDate
                        ? "bg-slate-800 dark:bg-blue-700 text-slate-50"
                        : ""
                    } ${
                      new Date(
                        new Date(day.dayMilli).setMonth(
                          new Date(day.dayMilli).getMonth() - 1
                        )
                      ).getTime() === endDate
                        ? "bg-slate-800 dark:bg-blue-700 text-slate-50"
                        : ""
                    } ${
                      new Date(
                        new Date(day.dayMilli).setMonth(
                          new Date(day.dayMilli).getMonth() - 1
                        )
                      ).getTime() > startDate &&
                      new Date(
                        new Date(day.dayMilli).setMonth(
                          new Date(day.dayMilli).getMonth() - 1
                        )
                      ).getTime() < endDate
                        ? "bg-slate-200 dark:bg-slate-750"
                        : ""
                    }`}
                  >
                    {day?.day}
                  </button>
                );
              })}
            </div>
          </div>
          {/**Second Half ================================================ */}
        </div>

        {/**Bottom Nav ========================= */}
        <div className="row-span-1 w-full border-t border-slate-300 dark:border-slate-600 flex justify-between items-center px-1">
          <div className="flex items-center justify-between space-x-2 p-1">
            <div className="text-xs dark:text-slate-400 text-slate-700 font-sans w-32 h-8 border dark:border-slate-600 border-slate-300 rounded-sm overflow-hidden whitespace-nowrap overflow-ellipsis p-2 flex items-center justify-center">
              <span className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                <b>From</b> {new Date(startDate).toDateString()}
              </span>
            </div>
            <div className="text-xs dark:text-slate-400 text-slate-700 font-sans w-32 h-8 border dark:border-slate-600 border-slate-300 rounded-sm overflow-hidden whitespace-nowrap overflow-ellipsis p-2 flex items-center justify-center">
              <span className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                <b>To</b> {new Date(endDate ? endDate : "").toDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-1">
            <button
              onClick={() => {
                setDateOpen(false);
              }}
              className="h-8 w-24 bg-slate-200 dark:bg-slate-750 dark:text-slate-300 text-slate-900 text-xs font-sans uppercase hover:opacity-80 transition-all rounded-sm"
            >
              cancel
            </button>
            <button
              onClick={() => {
                dispatch(
                  updateTicketsComponentDates({
                    startDate: startDate,
                    endDate: endDate,
                  })
                );
                localStorage.setItem(
                  "ticketsDate",
                  JSON.stringify({
                    startDate: startDate,
                    endDate: endDate,
                  })
                );
                setDateOpen(false);
                dispatch(changeLoadingStatus(true));
              }}
              className="h-8 w-24 bg-slate-800 dark:bg-blue-700 text-slate-50 text-xs font-sans uppercase hover:opacity-80 transition-all rounded-sm"
            >
              apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
