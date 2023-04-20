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
import Layout from "../partials/Layout";
import pdfLogo from "../../assets/pdfLogo.png";
import Table from "./Table";

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

const MyDocument = () => {
  return (
    <Document size="A4" orientation="landscape">
      <Page size="A4" orientation="landscape" style={styles.page} wrap>
        <View style={styles.header}>
          <View style={styles.column}>
            <Text style={styles.date}>09 March 2023</Text>
            <Text style={styles.title}>Delivery Schedule</Text>
          </View>
          <View>
            <Image src={pdfLogo} style={styles.logo} />
          </View>
        </View>

        <View style={styles.body}>
          <Table />
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

const Pdf = () => {
  return (
    <Layout>
      <div style={{ flexDirection: "column", display: "flex" }}>
        <PDFDownloadLink document={<MyDocument />} fileName="Invoice">
          {(loading, error) => (loading ? "Loading Document" : "Download")}
        </PDFDownloadLink>
        <MyDocument />
      </div>
    </Layout>
  );
};

export default Pdf;
