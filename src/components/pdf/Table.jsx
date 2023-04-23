import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    display: "flex",
    flexDirection: "column",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "black",
  },
  tableHeader: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomStyle: "dashed",
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
  },
  centerCell: {
    borderRightWidth: 1,
    borderRightStyle: "dashed",
    width: "100%",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  normalText: {
    fontSize: 14,
    color: "black",
  },
});

const TableHeader = () => {
  return (
    <View style={styles.tableHeader}>
      <View style={styles.cell}>
        <Text style={styles.headerText}>Product</Text>
      </View>
      <View style={styles.centerCell}>
        <Text style={styles.headerText}>Quantity</Text>
      </View>
      <View style={styles.centerCell}>
        <Text style={styles.headerText}>Boxes</Text>
      </View>
    </View>
  );
};

const TableRow = ({ id, item }) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.cell}>
        <Text style={styles.normalText}>{item.name}</Text>
      </View>
      <View style={styles.centerCell}>
        <Text style={styles.normalText}>{item.quantity}</Text>
      </View>
      <View style={styles.centerCell}>
        <Text style={styles.normalText}>{item.boxes}</Text>
      </View>
    </View>
  );
};

const Table = ({ data }) => {
  return (
    <View style={styles.table}>
      <TableHeader />
      {data.map((item, i) => (
        <TableRow key={i} id={i} item={item} />
      ))}
    </View>
  );
};

export default Table;
