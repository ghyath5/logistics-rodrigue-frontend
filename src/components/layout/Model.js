import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import BtnContained from "./BtnContained";
import InputOutlined from "./InputOutlined";
import BtnOutlined from "./BtnOutlined";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #495767",
  boxShadow: 24,
  borderRadius: 1,
  p: 2,
};

const Model = ({ id, handleAction, btn, title, defaultValue, isUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(isUpdate ? defaultValue : "");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  return (
    <div>
      {isUpdate ? (
        <BtnOutlined title={btn} handleClick={handleOpen} />
      ) : (
        <BtnContained title={btn} handleClick={handleOpen} />
      )}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <div className="gap-2">
            <InputOutlined
              lable=""
              defaultValue={defaultValue}
              type="text"
              value={name}
              handleChange={(e) => setName(e.target.value)}
              name={title}
            />
            <div className="d-flex justify-content-center mt-3 gap-2">
              <BtnOutlined
                title={isUpdate ? "Update" : "Add"}
                handleClick={() => {
                  isUpdate ? handleAction(id, name) : handleAction(name);
                }}
              />
              <BtnOutlined
                title="Cancel"
                color="error"
                handleClick={handleClose}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Model;
