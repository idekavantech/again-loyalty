import React from "react";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";

const tableHead = [
  {
    id: 0,
    label: "Date",
    align: "right",
    minWidth: 100,
    width: 160,
  },
  {
    id: 4,
    label: "Number of customers",
    align: "right",
    minWidth: 100,
    width: 160,
  },
  {
    id: 5,
    label: "Action",
    align: "right",
    minWidth: 100,
    width: 160,
  },
  {
    id: 6,
    label: "SMS number",
    align: "right",
    minWidth: 100,
    width: 160,
  },
  {
    id: 7,
    label: "SMS cost",
    align: "right",
    minWidth: 100,
    width: 160,
  },
];
function CRMRCampaignTable(props) {
  const { historyLogs, isLoading } = props;

  if (historyLogs?.length === 0) {
    return <></>;
  }

  return (
    <Paper>
      {!isLoading && (
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
                {tableHead?.map((headCell, index) => (
                  <TableCell
                    className="d-flex align-items-center justify-content-between"
                    key={headCell.id}
                    align={headCell.align}
                    color="text.primary"
                    style={{
                      minWidth: headCell.minWidth,
                      width: headCell.width,
                      maxWidth: headCell.maxWidth,
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
                          tableHead.length === index + 1 ? null : "#E0E0E0"
                        }`,
                      }}
                    ></div>
                    <p>{headCell.label}</p>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {historyLogs?.map((item) => (
                <TableRow
                  className="d-flex align-items-center faq-box my-1 position-relative text-right rtl"
                  style={{
                    borderBottom: "1px solid #E4E6E7",
                    overflowX: "hidden",
                    height: 56,
                    fontWeight: 400,
                    fontSize: 14,
                  }}
                  key={item.id}
                >
                  <div
                    className="text-nowrap pr-4"
                    align="right"
                    style={{
                      width: 160,
                      minWidth: 100,
                      fontWeight: 400,
                      fontSize: 14,
                    }}
                  >
                    {englishNumberToPersianNumber(
                      moment(item?.created_at).format("YYYY/MM/DD")
                    )}
                  </div>
                  <div
                    className="text-nowrap pr-4"
                    align="right"
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      width: 160,
                      minWidth: 100,
                    }}
                  >
                    {englishNumberToPersianNumber(
                      item?.number_of_membership_in_segment
                    )}
                  </div>
                  <div
                    className="text-nowrap pr-4 cursor-pointer"
                    align="right"
                    style={{
                      fontWeight: 400,
                      fontSize: 16,
                      width: 160,
                      minWidth: 100,
                    }}
                  >
                    {priceFormatter(item?.total_credit_value)}$
                  </div>
                  <div
                    className="text-nowrap pr-4"
                    align="right"
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      width: 160,
                      minWidth: 100,
                    }}
                  >
                    {englishNumberToPersianNumber(
                      item?.number_of_membership_in_execution
                    )}
                  </div>
                  <div
                    className="text-nowrap pr-4"
                    align="right"
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      width: 160,
                      minWidth: 100,
                    }}
                  >
                    {priceFormatter(item?.total_sms_cost)}$
                  </div>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default CRMRCampaignTable;
