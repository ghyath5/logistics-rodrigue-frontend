export const downloadPdf = ({buff}) => {
    
    const uint8Array = new Uint8Array(buff);
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

