import { memo } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Skeleton from "@material-ui/lab/Skeleton";
import TableCell from "@material-ui/core/TableCell";

import CreditReportsRow from "./creditReportsRow";

function CreditReportTable(props) {
  const { loading, selectedCreditReport, tableHeaders, reportData } = props;

  return (
    <TableContainer
      component={Paper}
      style={{ border: "none", borderRadius: "none !important" }}
    >
      <Table
        aria-labelledby="tableTitle"
        size="small"
        aria-label="enhanced table"
        style={{
          borderRadius: "none !important",
        }}
      >
        <TableHead
          className="d-flex align-items-center"
          style={{
            width: "100%",
            height: 56,
            position: "sticky",
            top: 0,
            zIndex: 1000,
            borderBottom: "1px solid rgba(0, 0, 0, 0.23)",
          }}
        >
          <TableRow style={{ width: "100%" }} className="d-flex">
            {tableHeaders[selectedCreditReport.type]?.map(
              ({ id, align, minWidth, width, maxWidth, label , headerFormater}, index) => (
                <TableCell
                  className="d-flex align-items-center justify-content-between"
                  key={id}
                  align={align}
                  color="text.primary"
                  style={{
                    minWidth,
                    width,
                    maxWidth,
                    fontSize: 14,
                    fontWeight: 500,
                    paddingRight: 16,
                    paddingLeft: 0,
                  }}
                >
                  <div
                    style={{
                      width: 2,
                      height: 14,
                      background: `${
                        tableHeaders[selectedCreditReport.type].length ===
                        index + 1
                          ? null
                          : "#E0E0E0"
                      }`,
                    }}
                  ></div>
                  <p>{ headerFormater ? headerFormater(label) : label}</p>
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>

        {loading ? (
          <TableBody>
            {[1, 2, 3, 4, 5].map((item) => (
              <TableRow
                style={{ height: 53 }}
                key={item}
                className="d-flex py-4"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((cell, index) => (
                  <div
                    key={cell}
                    style={{
                      height: 40,
                      width: `${index === 1 ? "250px" : "160px"}`,
                      minWidth: 100,
                    }}
                  >
                    <Skeleton
                      style={{
                        transform: "scale(1)",
                        height: 40,
                        padding: "24px 0",
                        marginRight: 10,
                        align: "right",
                      }}
                    />
                  </div>
                ))}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {reportData?.map((reportRow , idx) => (
              <CreditReportsRow
                key= {idx}
                reportRow={reportRow}
                tableHeaders={tableHeaders[selectedCreditReport.type]}
                selectedCreditReport={selectedCreditReport}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export default memo(CreditReportTable);
