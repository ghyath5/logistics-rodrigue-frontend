import React from "react";

const styles = {
  main: {
    fontFamily: "sans-serif",
    backgroundColor: "#edf2f7",
    color: "#2d3748",
    overflowX: "hidden",
  },
  container: {
    position: "relative",
    padding: "1rem",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 10,
    inset: 0,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "0.375rem",
    maxWidth: "28rem",
    margin: "auto",
    padding: "1rem",
    position: "fixed",
    insetX: 0,
    bottom: 0,
    zIndex: 50,
    marginBottom: "1rem",
    marginRight: "1rem",
    position: "relative",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
  iconContainer: {
    border: "1px solid #e2e8f0",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "4rem",
    height: "4rem",
    flexShrink: 0,
    margin: "auto",
  },
  icon: {
    fontSize: "1.5rem",
    color: "#e2e8f0",
  },
  textContainer: {
    marginTop: "1rem",
    textAlign: "center",
    marginTop: "0.25rem",
    textAlign: "left",
  },
  heading: {
    fontWeight: "bold",
  },
  description: {
    fontSize: "0.875rem",
    color: "#4a5568",
    marginTop: "0.25rem",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "1rem",
  },
  deleteButton: {
    display: "block",
    width: "100%",
    backgroundColor: "#fc8181",
    color: "#edf2f7",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    fontWeight: "bold",
    fontSize: "0.875rem",
    cursor: "pointer",
    marginLeft: "0.5rem",
    order: 2,
  },
  cancelButton: {
    display: "block",
    width: "100%",
    backgroundColor: "#edf2f7",
    color: "#2d3748",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    fontWeight: "bold",
    fontSize: "0.875rem",
    cursor: "pointer",
    marginTop: "1rem",
    order: 1,
  },
};

function EditModal() {
  return (
    <main style={styles.main} className="antialiased bg-gray-200 text-gray-900 font-sans overflow-x-hidden">
      <div style={styles.container} className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div style={styles.overlay} className="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
        <div style={styles.card} className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div style={styles.flexContainer} className="md:flex items-center">
            <div style={styles.iconContainer}>
              <i style={styles.icon} className="bx bx-error text-3xl"></i>
            </div>
            <div style={styles.textContainer} className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p style={styles.heading} className="font-bold">Delete your account</p>
              <p style={styles.description} className="text-sm text-gray-700 mt-1">
                You will lose all of your data by deleting your account. This action cannot be undone.
              </p>
            </div>
          </div>
          <div style={styles.buttonContainer} className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button style={styles.deleteButton} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">Delete Account</button>
            <button style={styles.cancelButton} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditModal;
