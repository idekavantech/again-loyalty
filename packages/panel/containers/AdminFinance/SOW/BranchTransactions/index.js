import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import {
  makeSelectBranches,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import DescriptionModal from "../components/DescriptionModal";
import BranchTransactionsTable from "./BranchTransactionsTable";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  getWalletBalance,
  getWalletTransactions,
} from "@saas/stores/plugins/actions";
import { makeSelectWalletTransactions } from "@saas/stores/plugins/selector";
import useTheme from "@material-ui/core/styles/useTheme";
import LocationSelector from "components/LocationSelector";
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
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../utils/helpers";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const headCells = [
  {
    id: "id",
    name: "ID",
    label: "ID",
    align: "center",
  },
  {
    id: "time",
    name: "Date and hour",
    label: "Date and hour",
    align: "center",
  },
  {
    id: "type",
    align: "center",
    name: "Transaction type",
    label: "Transaction type",
  },
  {
    id: "description",
    align: "center",
    name: "Description",
    label: "Description",
  },
  {
    id: "price",
    align: "center",
    name: "Transaction amount",
    label: "Transaction amount",
  },
];
function SOWBranchTransactions({
  isSuper = false,
  branches,
  isLoading,
  business,
  _getWalletTransactions,
  _getWallletBalance,
  walletTransactions,
}) {
  const theme = useTheme();
  const [description, setDescription] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(
    isSuper ? branches?.[0]?.slug : null
  );
  const [page, setPage] = useState(0);
  const [transactionType, setTransactionType] = useState(ALL_CREDIT_TYPE);

  const handleChange = (event) => {
    setTransactionType(event.target.value);
  };

  const branchId = useMemo(() => {
    if (business?.super_business) {
      return business?.id;
    } else {
      return branches.find((branch) => branch.slug === selectedBranch)?.id;
    }
  }, [business, branches, selectedBranch]);

  const businessId = useMemo(() => {
    if (business?.super_business) {
      return business?.super_business?.id;
    } else {
      return business?.id;
    }
  }, [business, branches, selectedBranch]);

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;

  const submitDate = () => {
    if ((businessId, branchId)) {
      setTimeout(() => {
        _getWalletTransactions({
          businessId,
          branchId,
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
          description: transactionType,
        });
      }, 0);
    }
    handleClose();
  };
  useEffect(() => {
    if ((businessId, branchId)) {
      setTimeout(() => {
        _getWallletBalance({
          businessId,
          branchId,
        });
      }, 0);
    }
  }, [businessId, branchId]);
  useEffect(() => {
    if ((businessId, branchId)) {
      setTimeout(() => {
        _getWalletTransactions({
          businessId,
          branchId,
          page: page + 1,
          description: transactionType,
        });
      }, 0);
    }
  }, [businessId, branchId, page, transactionType]);
  const headRow = useMemo(() => headCells.map((headCell) => headCell.name), []);
  const rows = useMemo(
    () =>
      walletTransactions?.map((transaction) => {
        const createdAt = new Date(transaction.created_at);
        const createdAtFormattedDate = jMoment(
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
        return [
          transaction.transaction_id,
          `${jalaaliDate} | ${jalaaliTime}`,
          transactionDescription[transaction.description],
          transaction.user_description,
          priceObj.price,
        ];
      }),
    [walletTransactions, isSuper]
  );

  return (
    <div>
      <div className="container mb-5">
        <Head>
          <title>Branch wallet reports</title>
        </Head>
        <AdminBreadCrumb
          submitButtonText="Output"
          submitAction={() =>
            generateCSVFile(headRow, rows, [], "Wallet reports of users")
          }
        />
        {isSuper ? (
          <div className="mt-2">
            <LocationSelector
              value={selectedBranch}
              onChange={(slug) => {
                localStorage.setItem("adminDeliverySelectedBranch", slug);
                setSelectedBranch(slug);
              }}
              items={branches.map((branch) => ({
                title: branch.title,
                value: branch.slug,
              }))}
            />
          </div>
        ) : null}
        <DescriptionModal
          description={description}
          isOpen={description}
          onClose={() => setDescription(null)}
        />
        <Paper
          elevation={1}
          className="mt-4 p-4 d-flex align-items-center flex-wrap justify-content-between"
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
                From{" "}
                <span className="px-2">
                  {englishNumberToPersianNumber(
                    formatDateObjectToNormal(selectedDayRange.from)
                  )}
                </span>
                until the{" "}
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
                    setSelectedDayRange={setSelectedDayRange}
                    selectedDayRange={selectedDayRange}
                    submitDate={submitDate}
                  />
                </div>
              </Popover>
            </div>
            <div className="d-flex flex-wrap align-items-center mb-4 mb-lg-0">
              <p className="pl-1">Transaction type:</p>
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
        <BranchTransactionsTable
          isLoading={isLoading}
          setDescription={setDescription}
          walletTransactions={walletTransactions}
          isSuper={isSuper}
          page={page}
          setPage={setPage}
          headCells={headCells}
        />
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  branches: makeSelectBranches(),
  isLoading: makeSelectLoading(),
  business: makeSelectBusiness(),
  walletTransactions: makeSelectWalletTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getWalletTransactions: (data) => dispatch(getWalletTransactions(data)),
    _getWallletBalance: (data) => dispatch(getWalletBalance(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(SOWBranchTransactions);
