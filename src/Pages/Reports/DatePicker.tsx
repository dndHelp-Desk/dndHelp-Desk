import { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./../../Redux/store";
import { updateTicketsComponentDates } from "./../../Redux/Slices/Tickets_n_Settings_Slice";

interface Props {
  filters: any;
  setFilters: any;
}

const DateFilter: FC<Props> = () => {
  const [dateRange, setDateRange] = useState<Date | any>([null, null]);
  const [startDate, endDate] = dateRange;
  const dispatch: AppDispatch = useDispatch();

  //Component =========================================
  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      monthsShown={2}
      placeholderText="Date ..."
      className="dark:bg-slate-800 bg-white font-medium border  dark:border-slate-700 border-slate-300  w-full h-14 lg:h-10  z-[9999] rounded text-xs pl-10 dark:text-slate-400 text-slate-900 placeholder:text-slate-900 dark:placeholder:text-slate-400 cursor-pointer"
      onChange={(update) => {
        setDateRange(update);
        dispatch(
          updateTicketsComponentDates({
            startDate: update[0] && update[0].getTime(),
            endDate: update[1] && update[1].getTime(),
          })
        );
        localStorage.setItem(
          "ticketsDate",
          JSON.stringify({
            startDate: update[0] && update[0].getTime(),
            endDate: update[1] && update[1].getTime(),
          })
        );
      }}
    />
  );
};
export default DateFilter;
