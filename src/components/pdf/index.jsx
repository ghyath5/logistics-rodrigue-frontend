import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import pdfLogo from "../../assets/pdfLogo.png";
import Table from "./Table";
import ScheduleTable from "./ScheduleTable";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    width: 150,
    height: 50,
  },
  date: {
    fontSize: 12,
  },
  footerDate: {
    fontSize: 12,
    marginLeft: "auto",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    marginVertical: 10,
  },
  body: {
    maxWidth: "100%",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
  },
  pageNumbers: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
  },
});

const MyDocument = ({ data, stock }) => {
  console.log("d",data)
  return (
    <Document size="A4" orientation="landscape">
      <Page size="A4" orientation="landscape" style={styles.page} wrap>
        <View style={styles.header}>
          <View style={styles.column}>
            <Text style={styles.date}>{data.date}</Text>
            <Text style={styles.title}>
              {stock ? `Delivery Sheet for ${data.driver}` : "Deliver schedule"}
            </Text>
            {stock && <Text style={styles.subTitle}>Total Stock Needed</Text>}
          </View>
          <View>
            <Image src={pdfLogo} style={styles.logo} />
          </View>
        </View>

        <View style={styles.body}>
          {stock ? (
            <Table data={data.products} />
          ) : (
            <ScheduleTable data={data.orders} />
          )}
        </View>
        <View
          style={styles.pageNumbers}
          fixed
          render={({ pageNumber, totalPages }) => (
            <View style={styles.footer}>
              <Text style={styles.footerDate}>
                {pageNumber} / {totalPages}
              </Text>
            </View>
          )}
        />
      </Page>
    </Document>
  );
};

const Pdf = ({ children, stock, data }) => {
  return (
    // <PDFDownloadLink
    //   document={<MyDocument data={data} stock={stock} />}
    //   fileName={!stock ? "Deliver schedule" : "Stock report"}
    // >
    //   {() => children}
    // </PDFDownloadLink>
    <></>
  );
};

export default Pdf;
