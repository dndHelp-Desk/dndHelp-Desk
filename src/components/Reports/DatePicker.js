import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({ filters, setFilters }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  //Component =========================================
  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      placeholderText="Pick A Date"
      className="dark:bg-slate-800 bg-white  border  dark:border-slate-700 border-slate-300  w-full h-10 z-[999] rounded text-xs pl-10 text-slate-500 cursor-pointer shadow"
      onChange={(update) => {
        setDateRange(update);
        setFilters({
          ...filters,
          startDate: update[0] && update[0].toLocaleString(),
          endDate: update[1] && update[1].toLocaleDateString(),
        });
      }}
    />
  );
};
export default DateFilter;
