import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useState } from "react";
import InputOutlined from "./layout/InputOutlined";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const EditModal = ({id, handleClosePopup,value,handleBlur,handleChange,handleEdit}) => {
  const [isOpen,setIsOpen]=useState(true)

  const handleClose = () => {
    setIsOpen(false);
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
        <p className="nameModel text-center text-black p-2 mb-0">
           
          Edit
        </p>

        <InputOutlined
          lable="name "
          defaultValue="name"
          type="text"
          value={value ?? ''}
          id={id}
          handleChange={handleChange}
          handleBlur={handleBlur}
          name={id}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClosePopup }
>Cancel</Button>
<Button onClick={handleEdit }
>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
