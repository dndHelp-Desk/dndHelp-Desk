import {FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface  Props {
  inputValue:any;
  setValues:(inputValue:any)=>any;
}

const DueDate:FC<Props> = ({ inputValue, setValues }) => {
  const [startDate, setStartDate] = useState<any|null>(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        setValues({
          ...inputValue,
          date: date !== null && date.toLocaleString(),
        });
      }}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      className="w-8 h-8 rounded-xl border-0 bg-transparent text-transparent outline-none focus:outline-none focus:border-0 focus:ring-0 cursor-pointer"
    />
  );
};
export default DueDate;
