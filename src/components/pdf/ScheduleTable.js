import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "black",
    maxWidth: "100%",
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomStyle: "dashed",
    backgroundColor: "#3EB489",
  },
  tableRow: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomStyle: "dashed",
  },
  cell: {
    borderRightWidth: 1,
    borderRightStyle: "dashed",
    width: "100%",
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    display: "flex",
    flexDirection: "column",
  },
  centerCell: {
    borderRightWidth: 1,
    borderRightStyle: "dashed",
    width: "100%",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  smallCenterCell: {
    borderRightWidth: 1,
    borderRightStyle: "dashed",
    textAlign: "start",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    // maxWidth: 120,
    display: "flex",
    flexDirection: "column",
  },
  headerText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  normalText: {
    fontSize: 14,
    color: "black",
  },
  boxInput: {
    borderWidth: 2,
    borderColor: "#000",
    borderStyle: "solid",
    width: "90%",
    height: 30,
    marginTop: 15,
  },
});

const TableHeader = () => {
  return (
    <View style={styles.tableHeader}>
      <View style={styles.cell}>
        <Text style={styles.headerText}>Business Details</Text>
      </View>
      <View style={styles.centerCell}>
        <Text style={styles.headerText}>Delivery Note</Text>
      </View>
      <View style={{ ...styles.smallCenterCell, width: "40%" }}>
        <Text style={styles.headerText}>Balance</Text>
      </View>
      <View style={{ ...styles.smallCenterCell, width: "60%" }}>
        <Text style={styles.headerText}>Items Ordered</Text>
      </View>
      <View style={{ ...styles.smallCenterCell, width: "70%" }}>
        <Text style={styles.headerText}>Total Pay Due</Text>
      </View>
      <View
        style={{ ...styles.smallCenterCell, width: "60%" }}
        className="text-center"
      >
        <Text style={styles.headerText}>Amount Paid</Text>
      </View>
    </View>
  );
};

const TableRow = ({ data }) => {
  let total = 0;
  data.products?.map((p) => (total += p.quantity));
  return (
    <View style={styles.tableRow}>
      <View style={styles.cell}>
        <Text style={styles.normalText}>{data.customer?.businessname}</Text>
        <Text style={styles.normalText}>{data.customer?.address}</Text>
        <Text style={styles.normalText}>{data.customer?.abn}</Text>
      </View>
      <View style={styles.centerCell}>
        <Text style={styles.normalText}>{data.customer?.notes || ""}</Text>
      </View>
      <View
        style={{
          ...styles.smallCenterCell,
          width: "40%",
          textAlign: "center",
          paddingLeft: 0,
        }}
      >
        <Text style={styles.normalText}>0.00</Text>
        <Text style={styles.normalText}>overdue</Text>
      </View>
      <View style={{ ...styles.smallCenterCell, width: "60%" }}>
        <Text style={{ ...styles.normalText, textAlign: "center" }}>
          {total}
        </Text>
      </View>
      <View style={{ ...styles.smallCenterCell, width: "70%" }}>
        <Text style={styles.normalText}>$ {data?.totalamount}</Text>
        <Text style={styles.normalText}>{data?.taxType || "Tax Free"}</Text>
        <Text style={styles.normalText}>
          {data.customer?.paymentmethod?.name}
        </Text>
      </View>
      <View style={{ ...styles.smallCenterCell, width: "60%" }}>
        <View style={styles.boxInput}></View>
      </View>
    </View>
  );
};

const ScheduleTable = ({ data }) => {
  return (
    <View style={styles.table}>
      <TableHeader />
      {data.map((item, i) => (
        <TableRow key={i} data={item} />
      ))}
    </View>
  );
};

export default ScheduleTable;
