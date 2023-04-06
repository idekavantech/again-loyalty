import React, { memo, useEffect, useMemo, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Skeleton from "@material-ui/lab/Skeleton";
import Paper from "@material-ui/core/Paper";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { withStyles } from "@material-ui/core/styles";
import {
  LEFTOVER,
  transactionDescription,
} from "@saas/stores/plugins/constants";
import moment from "moment-jalaali";
moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
import useTheme from "@material-ui/core/styles/useTheme";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import IconButton from "@material-ui/core/IconButton";
import TablePagination from "@material-ui/core/TablePagination";
import TableEmptyState from "../components/TableEmptyState";
import { coal } from "@saas/utils/colors";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.secondary,
    },
  },
}))(TableRow);

const headCells = [
  {
    id: "time",
    label: "Date and hour",
    align: "center",
  },

  {
    id: "reason",
    align: "center",
    label: "Transaction cause",
  },
  {
    id: "description",
    align: "center",
    label: "Description",
  },
  {
    id: "price",
    align: "center",
    label: "Transaction amount",
  },
];

function CheckoutTable({
  isLoading,
  setDescription,
  walletBalance,
  walletBalanceColor,
  walletTransactions,
  isSuper,
  page,
  setPage,
}) {
  const {maxWidth768 , maxWidth992} = useResponsive()
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(20);
  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    if (walletTransactions?.length) {
      const newArr = [...walletTransactions];
      const leftOverMoney = {
        created_at: newArr[newArr.length - 1]?.created_at,
        amount: newArr[newArr.length - 1]?.balance,
        description: LEFTOVER,
        color: coal,
      };
      newArr.splice(newArr.length - 1, 0, leftOverMoney);
      setTransactions(newArr);
    } else {
      setTransactions([]);
    }
  }, [walletTransactions]);
  const subStringNumber = useMemo(() => {
    if (maxWidth768) {
      return 8;
    } else if (maxWidth992) {
      return 15;
    } else {
      return 40;
    }
  }, [maxWidth768, maxWidth992]);
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
          {!transactions?.length ? (
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
              <TableRow style={{ height: 50 }}>
                <TableCell align="center" className="u-fontWeightBold">
                  The total amount of settlement
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell
                  align="center"
                  className="u-fontWeightBold"
                  style={{ color: walletBalanceColor }}
                >
                  <div className="d-flex justify-content-center">
                    <div style={{ direction: "ltr" }} className="ml-1">
                      {priceFormatter(Math.abs(walletBalance))}
                    </div>
                    <div>Toman</div>
                  </div>
                </TableCell>
              </TableRow>
              {transactions?.map((transaction) => {
                const createdAt = new Date(transaction.created_at);
                const createdAtFormattedDate = moment(
                  `${createdAt.getFullYear()}-${
                    createdAt.getMonth() + 1
                  }-${createdAt.getDate()}`,
                  "YYYY-MM-DD"
                );
                const jalaaliTime =
                  createdAt.getHours() + ":" + createdAt.getMinutes();
                const jalaaliDate =
                  createdAtFormattedDate.jYear() +
                  "-" +
                  (createdAtFormattedDate.jMonth() + 1) +
                  "-" +
                  createdAtFormattedDate.jDate();

                let priceObj = {};
                if (isSuper) {
                  if (Math.sign(transaction.amount) === 1) {
                    priceObj = {
                      price: transaction.amount * -1,
                      color: theme.palette.error.main,
                    };
                  } else {
                    priceObj = {
                      price: transaction.amount * -1,
                      color: theme.palette.success.main,
                    };
                  }
                } else {
                  if (Math.sign(transaction.amount) === 1) {
                    priceObj = {
                      price: transaction.amount,
                      color: theme.palette.success.main,
                    };
                  } else {
                    priceObj = {
                      price: transaction.amount,
                      color: theme.palette.error.main,
                    };
                  }
                }
                return (
                  <StyledTableRow key={transaction.id}>
                    <TableCell align="center">
                      <div className="d-flex justify-content-center">
                        <div style={{ width: 70 }}>
                          {englishNumberToPersianNumber(jalaaliDate)}
                        </div>
                        <div className="mx-2">|</div>
                        <div style={{ width: 40 }}>
                          {englishNumberToPersianNumber(jalaaliTime)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {transactionDescription[transaction.description] || "-"}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="cursor-pointer"
                      style={{
                        color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                      }}
                      onClick={() =>
                        setDescription(transaction.user_description)
                      }
                    >
                      {(transaction.user_description?.length > subStringNumber
                        ? transaction.user_description
                            ?.substr(0, subStringNumber)
                            .concat("...")
                        : transaction.user_description) || "-"}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ color: transaction.color || priceObj.color }}
                    >
                      <div className="d-flex justify-content-center">
                        <div style={{ direction: "ltr" }} className="ml-1">
                          {priceFormatter(priceObj.price)}
                        </div>
                        <div>Toman</div>
                      </div>
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={!maxWidth768 ? "The number of rows per page" : ""}
        labelDisplayedRows={({ from }) =>
          `${englishNumberToPersianNumber(from)}`
        }
        rowsPerPageOptions={[20]}
        component="div"
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        SelectProps={{
          renderValue: () => englishNumberToPersianNumber(pageSize),
          IconComponent: ArrowDropDownRoundedIcon,
        }}
        ActionsComponent={({page, onPageChange }) => (
          <div>
            <IconButton
              onClick={(event) => {
                onPageChange(event, page - 1);
              }}
              disabled={page === 0}
              aria-label="previous page"
            >
              <KeyboardArrowRight />
            </IconButton>
            <IconButton
              onClick={(event) => {
                onPageChange(event, page + 1);
              }}
              disabled={!transactions?.length}
              aria-label="next page"
            >
              <KeyboardArrowLeft />
            </IconButton>
          </div>
        )}
      />
    </>
  );
}

export default memo(CheckoutTable);
