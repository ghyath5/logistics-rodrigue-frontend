import React from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const DatePicker = ({ id, lable }) => {
  const [value, setValue] = React.useState(dayjs("2022-04-07"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="d-flex flex-column dateTimePicker">
        <label htmlFor={id} className="formsLable mb-2">
          {lable}
        </label>
        <DateTimePicker
          id={id}
          renderInput={(props) => (
            <TextField
              {...props}
              className="formsInput border-0 p-2"
              variant="standard"
            />
          )}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DatePicker;
