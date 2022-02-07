import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ToDODatePicker = ({ setStartDate }) => {
  return (
    <DatePicker
      placeholderText="📅"
      onChange={(date) => setStartDate(date)}
      className="bg-slate-800 w-full h-10 col-span-2 text-center text-slate-300 cursor-pointer rounded-lg border-slate-700"
    />
  );
};
export default ToDODatePicker;
