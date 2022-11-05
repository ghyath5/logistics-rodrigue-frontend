import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
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
  p: 3,
};

const Model = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <BtnContained title="Add" onClick={handleOpen} />
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Add New Category
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <div className="  gap-2">
              <InputOutlined />
              <div className="d-flex justify-content-between mt-4">
                <BtnOutlined title="Add" />
                <BtnOutlined title="Cancel" color="error" onClick={handleClose}/>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Model;
