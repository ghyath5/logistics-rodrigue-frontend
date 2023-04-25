import { Checkbox } from "@mui/material";
import axios from "../axios";
import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // set the primary color to a shade of blue
    },
    secondary: {
      main: "#ff3333", // set the primary color to a shade of blue
    },
  },
});

const CallsList = ({
  customers,
  setCustomers,
  selectedCustomer,
  handleSendCustomerId,
}) => {
  const toggleCall = async (id) => {
    await axios
      .put(`/customers/${id}/calls`)
      .then((res) => {
        setCustomers((prev) => [...prev.filter((c) => c._id !== id), res.data]);
      })
      .catch(console.error);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div className="formsContainer px-2 pt-4" style={{ flex: 1 }}>
        {customers.map((cust, i) => {
          return (
            <div key={i}>
              <div
                className={`d-flex align-items-center px-2 ${
                  selectedCustomer.id === cust._id && "highlightedCall"
                }`}
              >
                <h4
                  onClick={() =>
                    handleSendCustomerId({
                      id: cust._id,
                      name: cust.businessname,
                    })
                  }
                >
                  {i + 1}- {cust.businessname} -
                </h4>
                <Checkbox
                  checked={cust.sheduledCall.isCalled}
                  onChange={() => toggleCall(cust._id)}
                  color="primary"
                  icon={
                    <span
                      style={{
                        border: "2px solid  #ff3333",
                        borderRadius: 2,
                        width: 26,
                        height: 26,
                        display: "inline-block",
                      }}
                    />
                  }
                  checkedIcon={
                    <span
                      style={{
                        border: "2px solid #2196f3",
                        borderRadius: 2,
                        width: 26,
                        height: 26,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckIcon
                        style={{
                          fontSize: 18,
                          color: "#2196f3",
                          fontWeight: "bold",
                        }}
                      />
                    </span>
                  }
                  inputProps={{ "aria-label": "blue checkbox" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </ThemeProvider>
  );
};

export default CallsList;
