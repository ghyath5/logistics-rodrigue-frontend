import React from "react";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 3;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const DropDown = ({ lable, defaultValue }) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <>
     <lable   className="lable-customer mb-2">State*</lable>
      <FormControl sx={{ m: 1 }}>
        <Select
           id=""
          value={personName}
          onChange={handleChange}
          MenuProps={MenuProps}
          size="small"
          inputProps={{ "aria-label": "Without label" }}
          displayEmpty
        >
          <MenuItem value="" selected>
            <em>None</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>

    // <div className="d-flex">
    //   <div className="mt-4 ">
    //     <lable className="lable-customer mb-3 mt-2">{lable}*</lable>
    //     <div className="d-flex input-dropDown">

    //     <input className="input-ff" placeholder={defaultValue} />
    //   <ExpandMoreIcon
    //     aria-label="more"
    //     id="long-button"
    //     aria-controls={open ? "long-menu" : undefined}
    //     aria-expanded={open ? "true" : undefined}
    //     aria-haspopup="true"
    //     onClick={handleClick}
    //         // className="mt-5"
    //   >
    //     <MoreVertIcon />
    //   </ExpandMoreIcon>
    //   <Menu
    //     id="long-menu"
    //     MenuListProps={{
    //       "aria-labelledby": "long-button",
    //     }}
    //     anchorEl={anchorEl}
    //     open={open}
    //     onClose={handleClose}
    //     PaperProps={{
    //       style: {
    //         maxHeight: ITEM_HEIGHT * 4.5,
    //         width: "20ch",
    //       },
    //     }}
    //   >
    //     {options.map((option) => (
    //       <MenuItem
    //         key={option}
    //         selected={option === "Pyxis"}
    //         onClick={handleClose}
    //       >
    //         {option}
    //       </MenuItem>
    //     ))}
    //   </Menu>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DropDown;
