import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SureToDelete = ({ setOpen, handleDelete, id }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    handleDelete(id);
    setOpen(false);
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent className="modalMinWidth">
        <p className="nameModel text-black p-2 mb-0">
          You sure you want to delete this record?
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>no</Button>
        <Button onClick={handleOk}>yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SureToDelete;
