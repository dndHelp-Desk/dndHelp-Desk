import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../store/Tickets_n_Settings_Slice";

const DateFilter = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.Tickets.filters);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  //Component =========================================
  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      placeholderText="Pick A Date"
      className="dark:bg-slate-900 bg-slate-200 w-full h-12 border z-[999] dark:border-slate-700 border-slate-400 rounded-lg text-xs pl-10 text-slate-500 cursor-pointer"
      onChange={(update) => {
        setDateRange(update);
        dispatch(
          filter({
            ...filters,
            startDate: update[0] && update[0].toLocaleString(),
            endDate: update[1] && update[1].toLocaleString(),
          })
        );
      }}
    />
  );
};
export default DateFilter;
