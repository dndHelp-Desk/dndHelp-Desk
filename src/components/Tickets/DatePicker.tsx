import { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./../../Redux/store";
import { updateTicketsComponentDates } from "./../../Redux/Slices/Tickets_n_Settings_Slice";

const DateFilter: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [dateRange, setDateRange] = useState<string[] | any[]>([null, null]);
  const [startDate, endDate] = dateRange;

  //Component =========================================
  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      placeholderText="Pick A Date"
      className="dark:bg-slate-900 bg-slate-100 w-full h-10 border z-[999] dark:border-slate-700 border-slate-400 rounded text-xs pl-10 text-slate-500 cursor-pointer"
      onChange={(update: any) => {
        setDateRange(update);
        dispatch(
          updateTicketsComponentDates({
            startDate: update[0] && update[0].toLocaleDateString(),
            endDate: update[1] && update[1].toLocaleDateString(),
          })
        );
        localStorage.setItem(
          "ticketsDate",
          JSON.stringify({
            startDate: update[0] && update[0].toLocaleDateString(),
            endDate: update[1] && update[1].toLocaleDateString(),
          })
        );
      }}
    />
  );
};
export default DateFilter;
