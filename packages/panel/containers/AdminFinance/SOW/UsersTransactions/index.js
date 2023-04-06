import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";

import { makeSelectLoading } from "@saas/stores/global/selectors";
import UsersTransactionsTable from "./UsersTransactionsTable";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getUsersWalletTransactions } from "@saas/stores/plugins/actions";
import { makeSelectUsersWalletTransactions } from "@saas/stores/plugins/selector";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  ALL_CREDIT_TYPE,
  LEFTOVER,
  transactionDescription,
} from "@saas/stores/plugins/constants";

import jMoment from "moment-jalaali";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import CustomCalendar from "@saas/components/CustomCalendar";
import { formatDateObjectToNormal } from "../../../../utils/helpers";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const headCells = [
  {
    id: "id",
    name: "شناسه",
    label: "شناسه",
    align: "center",
  },
  {
    id: "time",
    name: "تاریخ و ساعت",
    label: "تاریخ و ساعت",
    align: "center",
  },
  {
    id: "type",
    align: "center",
    name: "نوع تراکنش",
    label: "نوع تراکنش",
  },
  {
    id: "price",
    align: "center",
    name: "مبلغ تراکنش",
    label: "مبلغ تراکنش",
  },
];
function SOWUsersTransactions({
  isSuper = false,
  isLoading,
  business,
  _getUsersWalletTransactions,
  usersWalletTransactions,
}) {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [transactionType, setTransactionType] = useState(ALL_CREDIT_TYPE);

  const handleChange = (event) => {
    setTransactionType(event.target.value);
  };

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;

  const submitDate = () => {
    if (isSuper && business?.id) {
      setTimeout(() => {
        _getUsersWalletTransactions({
          businessId: business?.id,
          page: page + 1,
          from_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 0);
    } else if (business?.id && business?.super_business?.id) {
      setTimeout(() => {
        _getUsersWalletTransactions({
          businessId: business?.super_business?.id,
          branchId: business?.id,
          page: page + 1,
          from_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 0);
    }
    handleClose();
  };
  useEffect(() => {
    if (isSuper && business?.id) {
      setTimeout(() => {
        _getUsersWalletTransactions({
          businessId: business?.id,
          page: page + 1,
          description: transactionType,
        });
      }, 0);
    } else if (business?.id && business?.super_business?.id) {
      setTimeout(() => {
        _getUsersWalletTransactions({
          businessId: business?.super_business?.id,
          branchId: business?.id,
          page: page + 1,
          description: transactionType,
        });
      }, 0);
    }
  }, [business?.id, business?.super_business?.id, page, transactionType]);
  const headRow = useMemo(() => headCells.map((headCell) => headCell.name), []);
  const rows = useMemo(
    () =>
      usersWalletTransactions?.map((transaction) => {
        const createdAt = new Date(transaction.created_at);
        const createdAtFormattedDate = jMomemt(
          `${createdAt.getFullYear()}-${
            createdAt.getMonth() + 1
          }-${createdAt.getDate()}`,
          "YYYY-MM-DD"
        );
        const jalaaliTime = createdAt.getHours() + ":" + createdAt.getMinutes();
        const jalaaliDate =
          createdAtFormattedDate.jYear() +
          "-" +
          (createdAtFormattedDate.jMonth() + 1) +
          "-" +
          createdAtFormattedDate.jDate();

        let priceObj = {};
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
        return [
          transaction.transaction_id,
          `${jalaaliDate} | ${jalaaliTime}`,
          transactionDescription[transaction.description] || "-",
          priceObj.price,
        ];
      }),
    [usersWalletTransactions]
  );

  return (
    <div>
      <div className="container mb-5">
        <Head>
          <title>گزارش‌های کیف پول کاربران</title>
        </Head>
        <AdminBreadCrumb
          submitButtonText="خروجی گرفتن"
          submitAction={() =>
            generateCSVFile(headRow, rows, [], "گزارشات کیف پول کاربران")
          }
        />
        <Paper
          elevation={1}
          className="mt-4 p-4 d-flex flex-wrap align-items-center justify-content-between"
        >
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex flex-wrap align-items-center ml-5 mb-4 mb-lg-0">
              <Button
                style={{
                  direction: "rtl",
                }}
                aria-describedby={id}
                onClick={handleOpen}
                variant="outlined"
              >
                از{" "}
                <span className="px-2">
                  {englishNumberToPersianNumber(
                    formatDateObjectToNormal(selectedDayRange.from)
                  )}
                </span>
                تا{" "}
                <span className="px-2">
                  {englishNumberToPersianNumber(
                    formatDateObjectToNormal(selectedDayRange.to)
                  )}
                </span>
              </Button>
              <Popover
                id={id}
                anchorOrigin={{
                  vertical: 195,
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={openModal}
                onClose={handleClose}
              >
                <div style={{ backgroundColor: "#fff", position: "relative" }}>
                  <CloseIcon
                    onClick={handleClose}
                    className="u-cursor-pointer"
                    style={{
                      fontSize: 24,
                      position: "absolute",
                      top: 8,
                      right: 8,
                      zIndex: 10000,
                      color: "#555555",
                    }}
                  />
                  <CustomCalendar
                    selectedDayRange={selectedDayRange}
                    setSelectedDayRange={setSelectedDayRange}
                    submitDate={submitDate}
                  />
                </div>
              </Popover>
            </div>
            <div className="d-flex flex-wrap align-items-center mb-4 mb-lg-0">
              <p className="pl-1">نوع تراکنش:</p>
              <FormControl variant="outlined" style={{ width: 199 }}>
                <Select
                  value={transactionType}
                  onChange={handleChange}
                  style={{ height: 40 }}
                >
                  {Object.entries(transactionDescription)
                    .filter(([key]) => key !== LEFTOVER)
                    .map(([key, value]) => {
                      return (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </div>
          </div>
        </Paper>
        <UsersTransactionsTable
          isLoading={isLoading}
          usersWalletTransactions={usersWalletTransactions}
          headCells={headCells}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  business: makeSelectBusiness(),
  usersWalletTransactions: makeSelectUsersWalletTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getUsersWalletTransactions: (data) =>
      dispatch(getUsersWalletTransactions(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(SOWUsersTransactions);
