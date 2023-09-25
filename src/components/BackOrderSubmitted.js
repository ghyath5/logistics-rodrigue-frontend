import React, { useState } from 'react'
import Layout from './partials/Layout'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { downloadPdf } from '../utils/downloadPdf';
import { useNavigate } from 'react-router-dom';
import BtnContained from './layout/BtnContained';
import Pdf from './pdf';

const BackOrderSubmitted = () => {
    const [stockNeededPdfData, setStockNeededPdfData] = useState({});
    const [deliveryPdfData, setDeliveryPdfData] = useState({});
    const [buff, setBuffer] = useState(null);
    const nav = useNavigate();

  return (
    <Layout>
    <div className="d-flex align-items-center ">
      <ArrowBackIcon
        className="ArrowBackIcon"
        fontSize="medium"
        onClick={() => nav("/orders")}
      />
      <h4
        className={`headerss-${localStorage.getItem(
          "monjay-theme"
        )} my-3 mx-2`}
      >
        Back to orders
      </h4>
    </div>
    <div className="formsContainer px-4 d-flex flex-column gap-3">
      <h4
        className={`headerss-${localStorage.getItem(
          "monjay-theme"
        )} my-3 mx-2`}
      >
        Print back order pdfs
      </h4>
      <BtnContained title="PRINT INVOICE" handleClick={downloadPdf(buff)} />
      <Pdf stock={true} data={stockNeededPdfData}>
        <BtnContained
          title="PRINT STOCK REPORT"
          handleClick={() => console.log("")}
        />
      </Pdf>
      <Pdf stock={false} data={deliveryPdfData}>
        <BtnContained
          title="PRINT DELIVERY REPORT"
          handleClick={() => console.log("")}
        />
      </Pdf>
    </div>
  </Layout>
  )
}

export default BackOrderSubmitted