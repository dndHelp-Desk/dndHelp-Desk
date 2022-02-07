import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "../../store/TicketsSlice";

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
      className="bg-slate-900 w-full h-10 border border-slate-800 rounded-lg text-xs pl-10 text-slate-500 cursor-pointer"
      onChange={(update) => {
        setDateRange(update);
        dispatch(
          filter({
            ...filters,
            startDate: update[0] && update[0].toLocaleDateString(),
            endDate: update[1] && update[1].toLocaleDateString(),
          })
        );
      }}
    />
  );
};
export default DateFilter;