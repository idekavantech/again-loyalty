import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "react-dates/initialize";
import useTheme from "@material-ui/core/styles/useTheme";
import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { createStructuredSelector } from "reselect";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import { compose } from "redux";

import {
  makeSelectAdminTransactions,
  makeSelectAdminTransactionsPagination,
} from "store/selectors";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { getMonthName } from "@saas/utils/helpers/getMonthName";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { getAdminTransactions } from "store/actions";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import MaterialSelect from "@saas/components/Select/MaterialSelect";
import { coal, dust, jungleI, strawberryII } from "@saas/utils/colors";
import Chip from "@material-ui/core/Chip";
import { BASE_PLUGIN } from "@saas/utils/constants/plugins";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import IconButton from "@material-ui/core/IconButton";

import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment-jalaali";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import OrderTransactionsDrawer from "containers/AdminShopping/containers/AdminTransactions/OrderTransactionsDrawer";
import Checkbox from "@material-ui/core/Checkbox";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Fade from "@material-ui/core/Fade";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import { makeSelectBranches } from "@saas/stores/business/selector";
import Button from "@material-ui/core/Button";
import { paymentTypeOptions, terminalOptions } from "store/constants";
import { formatDateObjectToNormal } from "../../../../utils/helpers";
import CustomCalendar from "@saas/components/CustomCalendar";
import TableNoResultMessage from "../../../../components/TableNoResultMessage";

moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const headCells = [
  {
    id: "transaction_id",
    align: "right",
    label: "ID",
  },
  {
    id: "time",
    align: "right",
    label: "Time",
  },
  {
    id: "status",
    align: "center",
    label: "Condition",
  },

  {
    id: "branch",
    align: "right",
    label: "Branch",
    super: true,
  },
  {
    id: "source",
    align: "right",
    label: "Sales Channel",
  },
  {
    id: "type",
    align: "center",
    label: "payment type",
  },
  {
    id: "amount",
    align: "center",
    label: "the amount of",
  },
  {
    id: "terminal",
    align: "center",
    label: "The door",
  },
];

function AdminTransactions({
  transactions,
  pagination = {},
  isSuper = false,
  isLoading,
  _getTransactions,
  branches,
  BasePluginData,
}) {
  const salesChannels = BasePluginData?.salesChannels;
  const salesChannelsOptions = useMemo(() => {
    const dynamicSalesChannels = Object.entries(salesChannels).map(
      ([key, value]) => ({
        id: key,
        keyword: key,
        text: value.name,
      })
    );
    dynamicSalesChannels.unshift({ id: 0, text: "All", keyword: null });
    return dynamicSalesChannels;
  }, [salesChannels]);
  const router = useRouter();
  const [rerenderKey, setRerenderKey] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState("");
  const selectedBranches = router.query.business
    ? Array.isArray(router.query.business)
      ? router.query.business.map((id) => parseInt(id))
      : [parseInt(router.query.business)]
    : router.query.no_branches
    ? []
    : (branches || []).map((branch) => branch.id);
  const page = parseInt(router.query.page) || 1;
  const pageSize = parseInt(router.query.page_size) || 10;
  const { maxWidth768 } = useResponsive();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const [timeSelect, setTimeSelect] = useState(false);
  const [customTimeSelected, setCustomTimeSelected] = useState(
    router.query.from_hour || router.query.to_hour
  );
  const [toHour, setToHour] = useState(router.query.to_hour || "24");
  const [fromHour, setFromHour] = useState(router.query.from_hour || "0");
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: moment().startOf("day"),
    to: moment().endOf("day"),
  });
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
  }, []);
  useEffect(() => {
    const defaultMomentToDate = router.query.to_date
      ? moment(router.query.to_date, "YYYY-MM-DD")
      : moment();
    const defaultMomentFromDate = router.query.from_date
      ? moment(router.query.from_date, "YYYY-MM-DD")
      : moment().add(-6, "day");
    const defaultFromDate = {
      year: defaultMomentFromDate.jYear(),
      month: defaultMomentFromDate.jMonth() + 1,
      day: defaultMomentFromDate.jDate(),
    };
    const defaultToDate = {
      year: defaultMomentToDate.jYear(),
      month: defaultMomentToDate.jMonth() + 1,
      day: defaultMomentToDate.jDate(),
    };
    setSelectedDayRange({
      from: defaultFromDate,
      to: defaultToDate,
    });

    setTimeout(() => {
      const query = {
        ...router.query,
        page,
        page_size: pageSize,
      };
      if (router.query.from_hour)
        query.from_hour =
          router.query.from_hour === "24"
            ? "23:59:59"
            : `${router.query.from_hour}:00`;
      if (router.query.to_hour)
        query.to_hour =
          router.query.to_hour === "24"
            ? "23:59:59"
            : `${router.query.to_hour}:00`;

      _getTransactions(query);
    }, 0);
  }, [
    router.query.to_hour,
    router.query.from_hour,
    router.query.from_date,
    router.query.to_date,
    router.query.gateway,
    router.query.source,
    router.query.payment_type,
    router.query.business,
    page,
    pageSize,
  ]);
  const handleChangePage = (event, page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: parseInt(page) + 1 },
    });
  };
  const handleChangeRowsPerPage = (event) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, page_size: event.target.value },
    });
  };

  return (
    <div className="container pb-3">
      <OrderTransactionsDrawer
        isOpen={Boolean(selectedTransaction)}
        transaction={selectedTransaction}
        onClose={() => {
          setSelectedTransaction("");
        }}
        salesChannels={salesChannels}
      />
      <AdminBreadCrumb />
      <Paper elevation={1} className="pb-3 mt-3">
        <div className="d-flex pt-2 align-items-center px-4">
          <div className={`d-flex flex-wrap ${maxWidth768 ? "flex-1" : ""}`}>
            <MaterialSelect
              FormControlProps={{
                style: {
                  width: 80,
                  flexShrink: 0,
                },
              }}
              className="small ml-2 pr-0  mt-2"
              inputProps={{
                className: "text-center ml-minus-2",
              }}
              IconComponent={() => null}
              options={paymentTypeOptions}
              selectOption={(text) => {
                const query = { ...router.query };
                const keyword = paymentTypeOptions.find(
                  (i) => i.text === text
                ).keyword;
                if (keyword) query.payment_type = keyword;
                else delete query.payment_type;
                router.push({
                  pathname: router.pathname,
                  query,
                });
              }}
              inputData={{
                defaultValue: "payment type",
              }}
              selected={paymentTypeOptions.find((i) => {
                return (
                  i.keyword ===
                  (router.query.payment_type
                    ? router.query.payment_type
                    : paymentTypeOptions[0].keyword)
                );
              })}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                elevation: 3,
                getContentAnchorEl: null,
              }}
            />
            <MaterialSelect
              FormControlProps={{
                style: {
                  width: 80,
                  flexShrink: 0,
                },
              }}
              className="small ml-2 pr-0 direction-ltr mt-2"
              inputProps={{
                className: "text-center ml-minus-2",
              }}
              IconComponent={() => null}
              options={terminalOptions}
              selectOption={(text) => {
                const query = { ...router.query };
                const keyword = terminalOptions.find(
                  (i) => i.text === text
                ).keyword;
                if (keyword) query.gateway = keyword;
                else delete query.gateway;
                router.push({
                  pathname: router.pathname,
                  query,
                });
              }}
              inputData={{
                defaultValue: "The door",
              }}
              selected={terminalOptions.find((i) => {
                return (
                  i.keyword ===
                  (router.query.gateway
                    ? router.query.gateway
                    : terminalOptions[0].keyword)
                );
              })}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                elevation: 3,
                getContentAnchorEl: null,
              }}
            />
            <MaterialSelect
              FormControlProps={{
                style: {
                  width: 80,
                  flexShrink: 0,
                },
              }}
              className="small ml-2 pr-0 direction-ltr mt-2"
              inputProps={{
                className: "text-center ml-minus-2",
              }}
              IconComponent={() => null}
              options={salesChannelsOptions}
              selectOption={(text) => {
                const query = { ...router.query };
                const keyword = salesChannelsOptions.find(
                  (i) => i.text === text
                ).keyword;
                if (keyword) query.source = keyword;
                else delete query.source;
                router.push({
                  pathname: router.pathname,
                  query,
                });
              }}
              inputData={{
                defaultValue: "Sales Channel",
              }}
              selected={salesChannelsOptions.find((i) => {
                return (
                  i.keyword ===
                  (router.query.source
                    ? router.query.source
                    : salesChannelsOptions[0].keyword)
                );
              })}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
                elevation: 3,
                getContentAnchorEl: null,
              }}
            />
            <div className="mt-2 ml-2">
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
                  <div
                    style={{ backgroundColor: "#fff", position: "relative" }}
                  >
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
                      submitDate={() => {
                        const query = { ...router.query };
                        if (selectedDayRange.from)
                          query.from_date = persianToEnglishNumber(
                            moment(
                              formatDateObjectToNormal(selectedDayRange.from),
                              "jYYYY-jM-jD"
                            ).format("YYYY-M-D")
                          );
                        else delete query.from_date;
                        if (selectedDayRange.to)
                          query.to_date = persianToEnglishNumber(
                            moment(
                              formatDateObjectToNormal(selectedDayRange.to),
                              "jYYYY-jM-jD"
                            ).format("YYYY-M-D")
                          );
                        else delete query.to_date;
                        router.push({
                          pathname: router.pathname,
                          query,
                        });
                        handleClose();
                      }}
                    />
                  </div>
                </Popover>
              </div>
            </div>
            {loaded && branches?.length ? (
              <Select
                className="mt-2 ml-2"
                style={{ minWidth: 150, height: 36 }}
                value={selectedBranches}
                multiple
                margin="dense"
                variant="outlined"
                displayEmpty
                IconComponent={() => null}
                renderValue={() => {
                  if (selectedBranches.length === 0) return "Choose a branch";
                  if (selectedBranches.length === 1 && selectedBranches[0])
                    return branches.find(
                      (branch) => branch.id === selectedBranches[0]
                    ).title;
                  if (selectedBranches.length === branches.length)
                    return "All branches";
                  return `${englishNumberToPersianNumber(
                    selectedBranches.length
                  )} Branch`;
                }}
                MenuProps={{
                  getContentAnchorEl: null,
                  style: { maxHeight: 500 },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  variant: "menu",
                }}
              >
                <MenuItem className="px-2">
                  <Checkbox
                    className="p-1"
                    size="small"
                    indeterminate={
                      selectedBranches.length !== branches.length &&
                      selectedBranches.length
                    }
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (selectedBranches.length) {
                        const query = { ...router.query };
                        delete query.business;
                        query.no_branches = true;
                        router.push({ pathname: router.pathname, query });
                      } else {
                        const query = { ...router.query };
                        delete query.business;
                        delete query.no_branches;
                        router.push({ pathname: router.pathname, query });
                      }
                    }}
                    color="primary"
                    checked={selectedBranches.length === branches.length}
                  />
                  <ListItemText
                    primary="Choosing all branches"
                    className="text-right"
                  />
                </MenuItem>
                {branches.map((branch) => (
                  <MenuItem className="px-2" key={branch.id} value={branch.id}>
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!selectedBranches.find((id) => id === branch.id)) {
                          const query = { ...router.query };
                          query.business = [...selectedBranches, branch.id];
                          delete query.no_branches;
                          router.push({ pathname: router.pathname, query });
                        } else {
                          const query = { ...router.query };
                          query.business = selectedBranches.filter(
                            (id) => id !== branch.id
                          );
                          if (query.business.length === 0)
                            query.no_branches = true;
                          router.push({ pathname: router.pathname, query });
                        }
                      }}
                      color="primary"
                      checked={selectedBranches.includes(branch.id)}
                    />
                    <ListItemText
                      primary={branch.title}
                      className="text-right"
                    />
                  </MenuItem>
                ))}
              </Select>
            ) : null}
            <Button
              className="u-height-36 u-fontWeightNormal mt-2 ml-2"
              onClick={(e) => {
                if (timeSelect) setTimeSelect(null);
                else setTimeSelect(e.currentTarget);
              }}
              variant="outlined"
              color="default"
              size="small"
              margin="dense"
            >
              {router.query.to_time || router.query.from_time
                ? `${router.query.from_time} until the${router.query.to_time}`
                : "All hours"}
            </Button>
            <Popper
              open={Boolean(timeSelect)}
              anchorEl={timeSelect}
              placement="bottom"
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={150}>
                  <ClickAwayListener
                    onClickAway={() => {
                      setTimeSelect(null);
                    }}
                  >
                    <Paper style={{ width: 170 }}>
                      <RadioGroup
                        aria-label="position"
                        name="position"
                        value={customTimeSelected ? "selected" : "unselected"}
                        onChange={(e) => {
                          setCustomTimeSelected(e.target.value === "selected");
                          if (e.target.value === "selected")
                            router.push({
                              pathname: router.pathname,
                              query: {
                                ...router.query,
                                from_hour: fromHour,
                                to_hour: toHour,
                              },
                            });
                          else {
                            const newQuery = { ...router.query };
                            delete newQuery.from_hour;
                            delete newQuery.to_hour;
                            router.push({
                              pathname: router.pathname,
                              query: newQuery,
                            });
                          }
                        }}
                      >
                        <FormControlLabel
                          value="unselected"
                          control={<Radio color="primary" />}
                          label="All hours"
                        />
                        <FormControlLabel
                          value="selected"
                          className="align-items-start"
                          control={<Radio color="primary" />}
                          label={
                            <div className="mt-3 mb-1">
                              <div>Special watches</div>
                              <div>
                                <div className="d-flex align-items-center mt-1">
                                  <div className="ml-2">From</div>
                                  <Select
                                    style={{ minWidth: 50, height: 36 }}
                                    variant="outlined"
                                    native
                                    margin="dense"
                                    defaultValue={fromHour}
                                    onChange={(e) => {
                                      setFromHour(e.target.value);
                                      if (customTimeSelected)
                                        router.push({
                                          pathname: router.pathname,
                                          query: {
                                            ...router.query,
                                            from_hour: e.target.value,
                                          },
                                        });
                                    }}
                                  >
                                    {Array.from(Array(25)).map((_, number) => (
                                      <option value={number} key={_}>
                                        {englishNumberToPersianNumber(number)}
                                      </option>
                                    ))}
                                  </Select>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                  <div className="ml-2">until the</div>
                                  <Select
                                    style={{ minWidth: 50, height: 36 }}
                                    variant="outlined"
                                    native
                                    margin="dense"
                                    value={toHour}
                                    onChange={(e) => {
                                      setToHour(e.target.value);
                                      if (customTimeSelected)
                                        router.push({
                                          pathname: router.pathname,
                                          query: {
                                            ...router.query,
                                            to_hour: e.target.value,
                                          },
                                        });
                                    }}
                                  >
                                    {Array.from(Array(25)).map((_, number) => (
                                      <option value={number} key={_}>
                                        {englishNumberToPersianNumber(number)}
                                      </option>
                                    ))}
                                  </Select>
                                </div>
                              </div>
                            </div>
                          }
                        />
                      </RadioGroup>
                    </Paper>
                  </ClickAwayListener>
                </Fade>
              )}
            </Popper>
          </div>
        </div>
        <div className="px-4 pt-2 d-flex flex-wrap">
          {Object.entries(router.query).map(([key, value]) => {
            if (
              [
                "search",
                "payment_type",
                "category",
                "gateway",
                "source",
                "from_date",
                "to_date",
                "no_branches",
                "branches",
              ].includes(key)
            )
              return (
                <Chip
                  deleteIcon={
                    <ClearRoundedIcon
                      style={{ color: theme.palette.text.disabled }}
                    />
                  }
                  style={{
                    borderRadius: 4,
                    background: theme.palette.background.secondary,
                  }}
                  className="ml-2 mb-2"
                  onDelete={async () => {
                    const query = { ...router.query };
                    delete query[key];
                    await router.push({ pathname: router.pathname, query });
                    setRerenderKey(1 - rerenderKey);
                  }}
                  label={
                    key === "payment_type"
                      ? paymentTypeOptions.find((o) => o.keyword === value).text
                      : key === "from_date"
                      ? `From${moment(value).format("jYYYY/jM/jD")}`
                      : key === "to_date"
                      ? `until the${moment(value).format("jYYYY/jM/jD")}`
                      : key === "business"
                      ? Array.isArray(value)
                        ? ` Branch${englishNumberToPersianNumber(value.length)}`
                        : "۱Branch"
                      : key === "no_branches"
                      ? "None of the branches"
                      : key === "gateway"
                      ? terminalOptions.find((o) => o.keyword === value).text
                      : key === "source"
                      ? salesChannelsOptions.find((o) => o.keyword === value)
                          .text
                      : value
                  }
                />
              );
          })}
        </div>
        {!transactions || transactions.length ? (
          <>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow
                    className={isLoading ? "u-pointer-events-none" : ""}
                  >
                    {headCells.map((headCell) => {
                      if (
                        (isSuper || headCell.super !== true) &&
                        (!maxWidth768 || !headCell.responsive)
                      )
                        return (
                          <TableCell
                            style={{
                              minWidth: headCell.minWidth,
                              width: headCell.width,
                            }}
                            className="text-nowrap u-fontWeightBold p-2"
                            key={headCell.id}
                            align={headCell.align}
                            color="text.primary"
                          >
                            {headCell.label}
                          </TableCell>
                        );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions?.map((transaction) => {
                    const {
                      id,
                      amount,
                      _created_at,
                      status,
                      payment_type,
                      gateway,
                      business_slug,
                      transaction_id,
                      sales_channel,
                    } = transaction;
                    const paymentType = paymentTypeOptions.find(
                      (i) => parseInt(i.keyword) === payment_type
                    );
                    const date = new Date(_created_at);
                    const createdAt = moment(_created_at, "YYYY/MM/DD");
                    const isMock = !id;
                    return (
                      <TableRow
                        onClick={() => {
                          setSelectedTransaction(transaction);
                        }}
                        className={
                          isLoading
                            ? "u-pointer-events-none"
                            : "u-cursor-pointer"
                        }
                        hover
                        key={id}
                      >
                        <TableCell align="center">
                          {isMock ? (
                            <Skeleton
                              style={{
                                width: 36,
                                height: 36,
                                transform: "none",
                              }}
                            />
                          ) : (
                            <div>
                              {englishNumberToPersianNumber(transaction_id)}
                            </div>
                          )}
                        </TableCell>
                        <TableCell
                          style={{ width: "99%" }}
                          scope="row"
                          className="px-2"
                          align="right"
                        >
                          {isMock ? (
                            <Skeleton style={{ width: 150 }} />
                          ) : (
                            englishNumberToPersianNumber(
                              `${createdAt.jDate()} ${getMonthName(
                                createdAt.jMonth() + 1
                              )} ${createdAt.jYear()} - ${`0${date.getHours()}`.slice(
                                -2
                              )}:${`0${date.getMinutes()}`.slice(-2)}`
                            )
                          )}
                        </TableCell>
                        <TableCell
                          component="a"
                          className="text-nowrap px-2"
                          align="center"
                          style={{ padding: 18 }}
                        >
                          {isMock ? (
                            <Skeleton
                              style={{
                                width: 50,
                              }}
                            />
                          ) : (
                            <Chip
                              style={{
                                color: status === 0 ? jungleI : strawberryII,
                                backgroundColor:
                                  status === 0
                                    ? "rgba(0, 200, 151, 0.12)"
                                    : "rgba(255, 0, 56, 0.16)",
                                maxWidth: "100%",
                                direction: "ltr",
                                cursor: "pointer",
                              }}
                              label={status === 0 ? "Successful" : "Failed"}
                              variant="default"
                              className="m-1 px-1 u-text-ellipse"
                            />
                          )}
                        </TableCell>
                        {isSuper ? (
                          <TableCell
                            style={{ padding: 18 }}
                            scope="row"
                            className="px-2 text-nowrap"
                            align="right"
                          >
                            {isMock ? (
                              <Skeleton style={{ width: 150 }} />
                            ) : (
                              <div>
                                {branches.find(
                                  (branch) => branch.slug === business_slug
                                )?.title || ""}
                              </div>
                            )}
                          </TableCell>
                        ) : null}
                        <TableCell
                          style={{ padding: 18 }}
                          scope="row"
                          className="px-2"
                          align="right"
                        >
                          {isMock ? (
                            <Skeleton className="w-100" />
                          ) : (
                            salesChannelsOptions.find(
                              (o) => o.keyword == sales_channel
                            )?.text || "-"
                          )}
                        </TableCell>
                        <TableCell
                          component="a"
                          className="text-nowrap px-2"
                          align="center"
                          style={{ padding: 18 }}
                        >
                          {isMock ? (
                            <Skeleton
                              style={{
                                width: 50,
                              }}
                            />
                          ) : (
                            <Chip
                              style={{
                                color: coal,
                                backgroundColor: paymentType?.color,
                                maxWidth: "100%",
                                direction: "ltr",
                                cursor: "pointer",
                              }}
                              label={paymentType?.text}
                              variant="default"
                              className="m-1 px-1 u-text-ellipse"
                            />
                          )}
                        </TableCell>
                        <TableCell className="text-nowrap" align="center">
                          {isMock ? (
                            <Skeleton
                              style={{
                                width: 70,
                              }}
                            />
                          ) : (
                            <div>{priceFormatter(amount)} $</div>
                          )}
                        </TableCell>
                        <TableCell
                          className="text-nowrap"
                          align="center"
                          style={{ width: 160 }}
                        >
                          {isMock ? (
                            <Skeleton />
                          ) : (
                            <div>
                              {gateway
                                ? terminalOptions.find(
                                    (i) => i.keyword === gateway
                                  )?.text
                                : "-"}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              labelRowsPerPage={!maxWidth768 ? "The number of rows per page" : ""}
              labelDisplayedRows={({ from, to, count }) =>
                `${englishNumberToPersianNumber(
                  from
                )} - ${englishNumberToPersianNumber(to)} From${
                  count !== -1
                    ? englishNumberToPersianNumber(count)
                    : `more than${englishNumberToPersianNumber(to)}`
                }`
              }
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={pagination.count}
              rowsPerPage={pageSize}
              page={page - 1}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              SelectProps={{
                renderValue: () => englishNumberToPersianNumber(pageSize),
                IconComponent: ArrowDropDownRoundedIcon,
              }}
              ActionsComponent={({
                count,
                page,
                rowsPerPage,
                onChangePage,
              }) => (
                <div className="">
                  <IconButton
                    onClick={(event) => {
                      onChangePage(event, page - 1);
                    }}
                    disabled={page === 0}
                    aria-label="previous page"
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                  <IconButton
                    onClick={(event) => {
                      onChangePage(event, page + 1);
                    }}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                </div>
              )}
            />
          </>
        ) : (
          <TableNoResultMessage
            title={"The transaction was not found in accordance with your search!"}
          />
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
    transactions: makeSelectAdminTransactions(),
    pagination: makeSelectAdminTransactionsPagination(),
    urlPrefix: makeSelectAdminUrlPrefix(),
    pluginsData: makeSelectPlugins(),
    isLoading: makeSelectLoading(),
    branches: makeSelectBranches(),
    BasePluginData: makeSelectPlugin(BASE_PLUGIN),
});

function mapDispatchToProps(dispatch) {
    return {
        _getTransactions: (data) => dispatch(getAdminTransactions(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminTransactions);
