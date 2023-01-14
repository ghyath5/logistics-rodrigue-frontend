import React from "react";
import "dayjs/locale/en-gb";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment/moment";

export const DatePickerr = ({
  id,
  lable,
  name,
  minDate,
  value,
  handleChange,
  shouldDisableDate,
  inputFormat,
  views,
  nol,
}) => {
  const handleTime = (string) => {
    let newTime = new Date(string).toISOString();
    handleChange({ target: { name: name, value: newTime } });
  };

  return (
    <div
      className={`d-flex flex-column dateTimePicker ${!nol ? "mt-2" : "mt-0"}`}
    >
      {!nol && (
        <label htmlFor={id} className="formsLable mb-2">
          {lable}
        </label>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
        <DatePicker
          orientation="landscape"
          views={views && views}
          inputFormat={inputFormat && inputFormat}
          id="date"
          value={value}
          minDate={minDate && minDate}
          onChange={(d) => {
            handleTime(moment(new Date(d["$d"])).format("L"));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className={
                nol
                  ? "formsInput border-0 py-1 px-2 m-0"
                  : "formsInput border-0 p-2"
              }
              variant="standard"
            />
          )}
          shouldDisableDate={shouldDisableDate && shouldDisableDate}
          // inputFormat="'Week of' MMM d"
        />
      </LocalizationProvider>
    </div>
  );
};

export const DateTimePickerr = ({
  id,
  lable,
  name,
  minDate,
  value,
  handleChange,
}) => {
  const handleTime = (string) => {
    let newTime = new Date(string).toDateString();
    handleChange({ target: { name: name, value: newTime } });
  };

  return (
    <div className="d-flex flex-column dateTimePicker mt-2">
      <label htmlFor={id} className="formsLable mb-2">
        {lable}
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
        <DateTimePicker
          id={id}
          renderInput={(props) => (
            <TextField
              {...props}
              className="formsInput border-0 p-2"
              variant="standard"
            />
          )}
          name={name}
          minDate={minDate && minDate}
          value={value}
          onChange={(e) => {
            handleTime(e["$d"]);
          }}
        />
      </LocalizationProvider>
    </div>
  );
};
