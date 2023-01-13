import * as React from "react";
import Paper from "@mui/material/Paper";
import Tablee from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material";

export default function Table({ columns, rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Tablee stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={
                    column.noCell
                      ? `d-none`
                      : column.id === "Statu"
                      ? "text-center tableHeading"
                      : "tableHeading"
                  }
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
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={j}>
                    {columns.map((column, i) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={i}
                          align={column.align}
                          className={
                            column.noCell
                              ? "d-none"
                              : column.id === "Statu"
                              ? "text-center"
                              : ""
                          }
                        >
                          <span
                            className={`
                              ${column.id !== "code" ? "text-capitalize" : ""}
                              ${
                                column.class &&
                                (column.id === "status"
                                  ? value === "Visible"
                                    ? column.class[0]
                                    : column.class[1]
                                  : column.id === "Statu"
                                  ? value === "Registration Due"
                                    ? column.class[0]
                                    : column.class[1]
                                  : column.class[0])
                              }
                            `}
                            onClick={() =>
                              column.action && column.id === "archive"
                                ? column.action(row["id"], row["archived"])
                                : column.action && column.action(row["id"])
                            }
                          >
                            {column.id === "price" ? (
                              `$ ${value}`
                            ) : column.id === "NameModel" ? (
                              <div className="d-flex flex-column">
                                <span className="">{value.split("/")[0]}</span>
                                <span className="dateNamemodel">
                                  {value.split("/")[1]}
                                </span>
                              </div>
                            ) : (
                              value
                            )}
                          </span>
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
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
