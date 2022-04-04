import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import moment from "moment";

const Calendar = () => {
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const monthsWords = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //Tickets Matching Current Month ======================
  const currentMonthTickets =
    filteredTickets.length >= 0 &&
    filteredTickets.filter(
      (ticket) => new Date(ticket.due_date).getMonth() === Number(month) - 1
    );

  // WeekDays Array
  const weekdaysArray = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  //Getting Days In a Month =====
  const getDaysInMonth = (month, year) => {
    return moment(`${month}-${year}`, "MM-YYYY").daysInMonth();
  };

  // Getting fist Day of the first Week Mon/Wed in 0 based Index
  const getFirstWeekdayOfMonth = (month, year) => {
    return moment(`${month}-${year}`, "MM-YYYY").startOf("month").weekday();
  };

  //Get All Days Of the Month
  const getDatesInMonthDisplay = (month, year) => {
    const daysInMonth = getDaysInMonth(month, year);
    const result = [];
    for (let i = 1; i <= daysInMonth; i++) {
      result.push(moment(`${month}-${i}-${year}`, "MM-DD-YYYY").toDate());
    }
    return result;
  };

  //Get Overlapping Dates
  const previousMonthOverlap = () => {
    let arr = [];
    for (let i = 0; i < getFirstWeekdayOfMonth(month, year); i++) {
      arr.push(i);
    }
    return arr;
  };

  //Previous Month Overlapping Days =====================
  const previousMonthDaysOverlap = getDatesInMonthDisplay(month - 1, year)
    .map((data) => data.getDate())
    .sort((a, b) => b - a)
    .slice(0, previousMonthOverlap().length)
    .sort((a, b) => a - b);

  const firstOverlap =
    previousMonthDaysOverlap.length >= 1 &&
    previousMonthDaysOverlap.map((day, index) => {
      return (
        <div key={index} className="p-[0.3rem] flex w-full justify-center">
          <p
            className={`dark:text-slate-400 opacity-50 text-slate-500 font-medium text-xs h-4 w-4 flex items-center justify-center rounded-full`}
          >
            {day}
          </p>
        </div>
      );
    });

  //Next Month Overlapping Days ==============================
  const nextMonthDaysOverlap = getDatesInMonthDisplay(month + 1, year)
    .map((data) => data.getDate())
    .slice(
      0,
      42 -
        (getDatesInMonthDisplay(month, year).length +
          previousMonthOverlap().length)
    );

  const lastOverlap =
    nextMonthDaysOverlap.length >= 1 &&
    nextMonthDaysOverlap.map((day, index) => {
      return (
        <div key={index} className="p-[0.3rem] flex w-full justify-center">
          <p
            className={`dark:text-slate-400 opacity-50 text-slate-500 font-medium text-xs h-4 w-4 flex items-center justify-center rounded-full`}
          >
            {day}
          </p>
        </div>
      );
    });

  //Map though weekdays ==================
  const weekdays = weekdaysArray.map((day, index) => {
    return (
      <div key={index} className="w-full flex justify-center">
        <p className="text-sm font-semibold text-center text-blue-600">{day}</p>
      </div>
    );
  });

  //Map Through Days =======================
  const days = getDatesInMonthDisplay(month, year).map((day, index) => {
    const ticket_id =
      currentMonthTickets.filter(
        (data) =>
          new Date(data.due_date).getDate() === day.getDate() &&
          new Date(data.due_date).getFullYear() === day.getFullYear() &&
          data.status !== "solved" &&
          data.status !== "on hold"
      ).length >= 1
        ? currentMonthTickets
            .filter(
              (data) =>
                new Date(data.due_date).getDate() === day.getDate() &&
                new Date(data.due_date).getFullYear() === day.getFullYear() &&
                data.status === "open"
            )
            .map((data) => data.ticket_id)
        : "";
    return (
      <div key={index} className="p-[0.3rem] flex w-full justify-center">
        <abbr title={`${ticket_id}`}>
          <p
            className={`${
              day.getDate() === new Date().getDate() &&
              day.getFullYear() === new Date().getFullYear() &&
              day.getMonth() === new Date().getMonth()
                ? "text-blue-600 font-semibold"
                : "dark:text-slate-300 text-slate-800 font-medium"
            } ${
              currentMonthTickets.filter(
                (data) =>
                  new Date(data.due_date).getDate() === day.getDate() &&
                  new Date(data.due_date).getFullYear() === day.getFullYear() &&
                  data.status !== "solved" &&
                  data.status !== "on hold"
              ).length >= 1
                ? "border-b border-blue-600"
                : ""
            } text-xs h-4 w-4 flex items-center justify-center cursor-pointer`}
          >{`${day.getDate()}`}</p>
        </abbr>
      </div>
    );
  });

  //Component
  return (
    <>
      <div className="w-full py-2 flex flex-col justify-center px-4 select-none rounded-xl border dark:border-slate-700 border-slate-200">
        <div className="px-2 rounded-xl">
          <div className="flex items-center justify-between">
            <HiChevronLeft
              role="button"
              onClick={() => {
                setMonth(month === 1 ? 12 : month - 1);
                setYear(month === 1 ? year - 1 : year);
              }}
              className="text-base cursor-pointer dark:text-slate-300 text-slate-700"
            />
            {/**Month Name & Year === */}
            <h1 className="text-sm font-bold dark:text-slate-300 text-slate-700">
              {`${monthsWords[month]} ${year}`}
            </h1>
            <HiChevronRight
              role="button"
              onClick={() => {
                setMonth(month === 12 ? 1 : month + 1);
                setYear(month === 12 ? year + 1 : year);
              }}
              className="text-base cursor-pointer dark:text-slate-300 text-slate-700"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full h-[2.5rem] grid grid-cols-7 gap-2 pt-3">
              {weekdays}
            </div>
            <div className="grid grid-cols-7 w-full">
              {firstOverlap}
              {days}
              {lastOverlap}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Calendar;
