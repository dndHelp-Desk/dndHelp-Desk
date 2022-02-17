import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ToDODatePicker = ({ setStartDate }) => {
  return (
    <DatePicker
      placeholderText="📅"
      onChange={(date) => setStartDate(date)}
      className="dark:bg-slate-800 bg-slate-200 w-[4.2rem] h-12 col-span-2 text-center text-slate-300 cursor-pointer border-0  focus:border-0 focus:ring-0"
    />
  );
};
export default ToDODatePicker;
