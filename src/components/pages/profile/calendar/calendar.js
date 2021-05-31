import React, { useState } from "react";
import Calendar from "react-calendar";
import Paper from "@material-ui/core/Paper";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

export default function CalendarCont() {
  const [value] = useState(new Date());

  return (
    <Paper variant="outlined" style={{ marginTop: "10px", padding: "5px" }}>
      <Calendar
        className="customCalendar"
        // onChange={null} // commented to not use in prod
        value={value}
        onClickDay={null}
      />
    </Paper>
  );
}
