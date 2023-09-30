import React from "react";

const EditModal = ({handleCancel,handleClick}) => {
  const modalStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: "1rem",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    textAlign: "center",
  };

  const buttonStyles = {
    margin: "0.5rem",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "3px",
    background: "#007BFF",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div style={modalStyles}>
      <h3>Are you sure you want to edit?</h3>
      <p>Editing will remove all scheduled calls.</p>
      <div>
        <button style={buttonStyles} onClick={handleClick}> Proceed</button>
        <button style={buttonStyles} onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
