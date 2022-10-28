import * as React from "react";
import Paper from "@mui/material/Paper";
import Tablee from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function Table({ columns, rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Tablee stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, j) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={j}>
                    {columns.map((column, i) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={i} align={column.align}>
                          <span
                            className={`
                              ${column.class ? column.class : ""} 
                              ${column.id !== "code" ? "text-capitalize" : ""}
                              ${
                                column.id === "status" && value === "visible"
                                  ? column.class?.split("/")[0]
                                  : column.class?.split("/")[1]
                              }
                            `}
                            onClick={() =>
                              column.action && column.action(row["id"])
                            }
                          >
                            {/* handleRemoveProduct(row["id"]) */}
                            {column.id === "price" ? `$ ${value}` : value}
                          </span>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Tablee>
      </TableContainer>
      <TablePagination
        className="tablePagination"
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
