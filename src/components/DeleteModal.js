import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteModal = ({ setOpen,handleClosePopup,title }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose }
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent className="modalMinWidth">
        <p className="nameModel text-black p-2 mb-0">
           
          {
            title ? title : " You can't delete this record, it's id is used somewhere else."
          }
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClosePopup ? handleClosePopup:handleClose }
>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
