import { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  filters: any;
  setFilters: any;
}

const DateFilter: FC<Props> = ({ filters, setFilters }) => {
  const [dateRange, setDateRange] = useState<Date | any>([null, null]);
  const [startDate, endDate] = dateRange;

  //Component =========================================
  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      placeholderText="Pick A Date"
      className="dark:bg-slate-800 bg-white  border  dark:border-slate-700 border-slate-300  w-full h-10 z-[999] rounded text-xs pl-10 dark:text-slate-400 text-slate-900 placeholder:text-slate-900 dark:placeholder:text-slate-400 cursor-pointer shadow"
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
