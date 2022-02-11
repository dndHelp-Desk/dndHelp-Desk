import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ToDODatePicker = ({ setStartDate }) => {
  return (
    <DatePicker
      placeholderText="📅"
      onChange={(date) => setStartDate(date)}
      className="dark:bg-slate-800 bg-slate-200 w-full h-10 col-span-2 text-center text-slate-300 cursor-pointer rounded-lg dark:border-slate-700 border-slate-300"
    />
  );
};
export default ToDODatePicker;
