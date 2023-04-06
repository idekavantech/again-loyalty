import React, { memo } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "@material-ui/lab/Skeleton";
import Paper from "@material-ui/core/Paper";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { withStyles } from "@material-ui/core/styles";

import TableEmptyState from "../components/TableEmptyState";
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.secondary,
    },
  },
}))(TableRow);
function AllBranchTransactionsTable({ isLoading, headCells, walletBalance }) {
  return (
    <>
      <TableContainer className="mt-3" component={Paper}>
        <Table
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <TableHead style={{ backgroundColor: "black", height: 50 }}>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  padding={headCell.padding || "unset"}
                  width={headCell.width || ""}
                  className="text-nowrap u-fontWeightBold"
                  key={headCell.id}
                  align={headCell.align}
                  style={{ color: "white" }}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!walletBalance?.businesses?.length ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}>
                  <TableEmptyState />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : isLoading ? (
            <TableBody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <TableRow style={{ height: 53 }} key={item}>
                  {headCells.map((cell) => (
                    <TableCell key={cell.id}>
                      <Skeleton
                        style={{
                          transform: "scale(1)",
                          width: "100%",
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {walletBalance?.businesses?.map((item) => (
                <StyledTableRow key={item.id}>
                  <TableCell align="center">{item.branch_title} </TableCell>
                  <TableCell align="center">
                    <div
                      className="d-flex justify-content-center"
                      style={{
                        color: `${
                          item.balance > 0
                            ? "rgb(0, 200, 151)"
                            : "rgb(255, 0, 56)"
                        }`,
                      }}
                    >
                      <div style={{ direction: "ltr" }} className="ml-1">
                        {priceFormatter(item.balance)}
                      </div>
                      <div>Toman</div>
                    </div>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export default memo(AllBranchTransactionsTable);
