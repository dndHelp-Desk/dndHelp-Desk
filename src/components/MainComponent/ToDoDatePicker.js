import React from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const ToDODatePicker = ({ selectedDay, setSelectedDay }) => {
  // render regular HTML input element
  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref} // necessary
      placeholder="📅"
      value={selectedDay ? `${selectedDay.day}/ ${selectedDay.month}` : ""}
      style={{
        textAlign: "center",
        padding: "1px",
        fontSize: ".8rem",
        width: "3rem",
        height: "2.75rem",
        borderRadius: "0.5rem",
        border: "1px solid #334155",
        color: "#cbd5e1",
        outline: "none",
        background: "#1e293b",
      }}
      className="my-custom-input-class h-11" // a styling class
    />
  );

  return (
      <DatePicker
        value={selectedDay}
        onChange={setSelectedDay}
        renderInput={renderCustomInput} // render a custom input
        shouldHighlightWeekends
        colorPrimary="#1e293b" // added this
      />
  );
};

export default ToDODatePicker;
