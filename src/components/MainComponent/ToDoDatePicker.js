import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ToDODatePicker = ({ setStartDate }) => {
  return (
    <DatePicker
      placeholderText="📅"
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      onChange={(date) => setStartDate(date)}
      className="dark:bg-transparent bg-slate-100 w-[4.2rem] h-12 col-span-2 text-center text-slate-300 cursor-pointer border-0 border-l dark:border-slate-700 border-slate-300   focus:border-0 focus:ring-0"
    />
  );
};
export default ToDODatePicker;
