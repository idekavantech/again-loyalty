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
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { createStructuredSelector } from "reselect";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";

import { compose } from "redux";

import {
  makeSelectCashDrawers,
  makeSelectCashDrawersPagination,
} from "store/selectors";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { getMonthName } from "@saas/utils/helpers/getMonthName";

import { getCashDrawers } from "store/actions";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { dust } from "@saas/utils/colors";
import Chip from "@material-ui/core/Chip";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import IconButton from "@material-ui/core/IconButton";

import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import moment from "moment-jalaali";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeSelectBranches } from "@saas/stores/business/selector";
import CashTransactionsDrawer from "containers/AdminPOS/containers/AdminDrawerAnalytics/CashTransactionsDrawer";
import Head from "next/head";
import { cashDrawerTypes } from "containers/AdminPOS/constants";
import { formatDateObjectToNormal } from "../../../../utils/helpers";
import CustomCalendar from "@saas/components/CustomCalendar";
import TableNoResultMessage from "../../../../components/TableNoResultMessage";

const headCells = [
  {
    id: "start_time",
    align: "right",
    label: "زمان شروع",
  },
  {
    id: "finish_time",
    align: "right",
    label: "زمان پایان",
  },
  {
    id: "pos_device",
    align: "right",
    label: "دستگاه",
  },
  {
    id: "description",
    align: "right",
    label: "توضیحات",
  },
  {
    id: "branch",
    align: "right",
    label: "شعبه",
    super: true,
  },
  {
    id: "paid_in",
    align: "center",
    label: "دریافت شده",
  },
  {
    id: "paid_out",
    align: "center",
    label: "پرداخت شده",
  },
  {
    id: "expected",
    align: "center",
    label: "مورد انتظار",
  },
  {
    id: "actual",
    align: "center",
    label: "مقدار واقعی",
  },
  {
    id: "difference",
    align: "center",
    label: "اختلاف",
  },
  {
    id: "status",
    align: "center",
    label: "وضعیت",
  },
];

function CashDrawerAnalytics({
  cashDrawers,
  pagination = {},
  isLoading,
  branches,
  _getCashDrawers,
}) {
  const router = useRouter();
  const [rerenderKey, setRerenderKey] = useState(0);
  const [selectedDrawer, setSelectedDrawer] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selectedBranches = router.query.business
    ? Array.isArray(router.query.business)
      ? router.query.business.map((id) => parseInt(id))
      : [parseInt(router.query.business)]
    : router.query.no_branches
    ? []
    : (branches || []).map((branch) => branch.id);
  const isSuper = Boolean(branches.length);
  const selectedTypes = router.query.type
    ? Array.isArray(router.query.type)
      ? router.query.type
      : [router.query.type]
    : router.query.no_types
    ? []
    : cashDrawerTypes.map((type) => type.id);
  const page = parseInt(router.query.page) || 1;
  const pageSize = parseInt(router.query.page_size) || 10;
  const { maxWidth768 } = useResponsive();
  const theme = useTheme();

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: moment().startOf("day"),
    to: moment().endOf("day"),
  });
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;
  const [loaded, setLoaded] = useState(false);
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
      _getCashDrawers({
        business: query.business,
        from_date: router.query.from_date,
        to_date: router.query.to_date,
        status: Array.isArray(router.query.type)
          ? router.query.type.join(",")
          : router.query.type,
        device: router.query.device,
      });
    }, 0);
  }, [
    router.query.device,
    router.query.from_date,
    router.query.to_date,
    router.query.business,
    router.query.type,
    router.query.no_branches,
    router.query.type,
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
      <Head>
        <title>گزارش صندوق</title>
      </Head>
      <CashTransactionsDrawer
        isOpen={drawerOpen}
        cashDrawer={selectedDrawer}
        onClose={() => {
          setDrawerOpen(false);
        }}
      />
      <AdminBreadCrumb />
      <Paper elevation={1} className="pb-3 mt-3">
        <div className="d-flex pt-2 align-items-center px-4">
          <div className={`d-flex flex-wrap ${maxWidth768 ? "flex-1" : ""}`}>
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
                      }}
                    />
                  </div>
                </Popover>
              </div>
            </div>
            {loaded && branches && branches.length ? (
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
                  if (selectedBranches.length === 0) return "شعبه انتخاب کنید";
                  if (selectedBranches.length === 1 && selectedBranches[0])
                    return branches.find(
                      (branch) => branch.id === selectedBranches[0]
                    ).title;
                  if (selectedBranches.length === branches.length)
                    return "همه شعب";
                  return `${englishNumberToPersianNumber(
                    selectedBranches.length
                  )} شعبه `;
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
                    primary="انتخاب همه شعب"
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
            <Select
              className="mt-2 ml-2"
              style={{ minWidth: 150, height: 36 }}
              value={selectedTypes}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              IconComponent={() => null}
              renderValue={() => {
                if (selectedTypes.length === 0) return "صندوق انتخاب کنید";
                if (selectedTypes.length === 1 && selectedTypes[0])
                  return cashDrawerTypes.find(
                    (type) => type.id === selectedTypes[0]
                  ).title;
                if (selectedTypes.length === cashDrawerTypes.length)
                  return "همه صندوق‌ها";
                return `${englishNumberToPersianNumber(
                  selectedTypes.length
                )} صندوق `;
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
                    selectedTypes.length !== cashDrawerTypes.length &&
                    selectedTypes.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (selectedTypes.length) {
                      const query = { ...router.query };
                      delete query.type;
                      query.no_types = true;
                      router.push({ pathname: router.pathname, query });
                    } else {
                      const query = { ...router.query };
                      delete query.type;
                      delete query.no_types;
                      router.push({ pathname: router.pathname, query });
                    }
                  }}
                  color="primary"
                  checked={selectedTypes.length === cashDrawerTypes.length}
                />
                <ListItemText
                  primary="انتخاب همه صندوق‌ها"
                  className="text-right"
                />
              </MenuItem>
              {cashDrawerTypes.map((type) => (
                <MenuItem className="px-2" key={type.id} value={type.id}>
                  <Checkbox
                    className="p-1"
                    size="small"
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!selectedTypes.find((id) => id === type.id)) {
                        const query = { ...router.query };
                        query.type = [...selectedTypes, type.id];
                        delete query.no_types;
                        router.push({ pathname: router.pathname, query });
                      } else {
                        const query = { ...router.query };
                        query.type = selectedTypes.filter(
                          (id) => id !== type.id
                        );
                        if (query.type.length === 0) query.no_types = true;
                        router.push({ pathname: router.pathname, query });
                      }
                    }}
                    color="primary"
                    checked={selectedTypes.includes(type.id)}
                  />
                  <ListItemText primary={type.title} className="text-right" />
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="px-4 pt-2 d-flex flex-wrap">
          {Object.entries(router.query).map(([key, value]) => {
            if (
              [
                "from_date",
                "to_date",
                "no_branches",
                "branches",
                "no_types",
                "type",
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
                    key === "from_date"
                      ? `از ${moment(value).format("jYYYY/jM/jD")}`
                      : key === "to_date"
                      ? `تا ${moment(value).format("jYYYY/jM/jD")}`
                      : key === "business"
                      ? Array.isArray(value)
                        ? ` شعبه${englishNumberToPersianNumber(value.length)}`
                        : "۱ شعبه"
                      : key === "no_branches"
                      ? "هیچ کدام از شعب"
                      : key === "type"
                      ? Array.isArray(value)
                        ? `${englishNumberToPersianNumber(
                            value.length
                          )} نوع صندوق `
                        : cashDrawerTypes.find((type) => type.id === value)
                            ?.title
                      : key === "no_types"
                      ? "هیچ کدام از انواع صندوق"
                      : value
                  }
                />
              );
          })}
        </div>
        {(!cashDrawers || cashDrawers.length) &&
        !router.query.no_branches &&
        !router.query.no_types ? (
          <>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow
                    className={isLoading ? "u-pointer-events-none" : ""}
                  >
                    {headCells.map((headCell, index) => {
                      if (
                        (!isSuper || headCell.super !== false) &&
                        (isSuper || headCell.super !== true) &&
                        (!maxWidth768 || !headCell.responsive)
                      )
                        return (
                          <TableCell
                            style={{
                              minWidth: headCell.minWidth,
                              width: headCell.width,
                            }}
                            className={`text-nowrap u-fontWeightBold ${
                              index !== 0 ? "p-2" : ""
                            }`}
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
                  {cashDrawers?.map((drawer) => {
                    const {
                      id,
                      business,
                      pos_device: posDevice,
                      data: {
                        drawer: {
                          closed_at,
                          opened_at,
                          balance,
                          total_paid_out,
                          total_paid_in,
                          final_money,
                          diff,
                          status,
                          description,
                        },
                      },
                    } = drawer;
                    const createdAt = moment(opened_at);
                    const finishedAt = moment(closed_at);
                    const drawerType = cashDrawerTypes.find(
                      (_type) => parseInt(_type.id) === parseInt(status)
                    );
                    const isMock = !id;
                    return (
                      <TableRow
                        onClick={() => {
                          setSelectedDrawer(drawer);
                          setDrawerOpen(true);
                        }}
                        className={
                          isLoading
                            ? "u-pointer-events-none"
                            : "u-cursor-pointer"
                        }
                        hover
                        key={id}
                      >
                        <TableCell scope="row" align="right">
                          {isMock ? (
                            <Skeleton style={{ width: 150 }} />
                          ) : (
                            <div style={{ width: 150 }}>
                              {englishNumberToPersianNumber(
                                `${createdAt.jDate()} ${getMonthName(
                                  createdAt.jMonth() + 1
                                )} ${createdAt.jYear()} - ${createdAt.format(
                                  "HH:mm"
                                )}`
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell scope="row" className="px-2" align="right">
                          {isMock ? (
                            <Skeleton style={{ width: 150 }} />
                          ) : (
                            <div style={{ width: 150 }}>
                              {closed_at
                                ? englishNumberToPersianNumber(
                                    `${finishedAt.jDate()} ${getMonthName(
                                      finishedAt.jMonth() + 1
                                    )} ${finishedAt.jYear()} - ${finishedAt.format(
                                      "HH:mm"
                                    )}`
                                  )
                                : "-"}
                            </div>
                          )}
                        </TableCell>
                        <TableCell
                          component="a"
                          className="text-nowrap px-2"
                          align="right"
                          style={{ padding: 18 }}
                        >
                          {isMock ? (
                            <Skeleton
                              style={{
                                width: 50,
                              }}
                            />
                          ) : (
                            posDevice?.name || "-"
                          )}
                        </TableCell>
                        <TableCell
                          style={{ padding: 18 }}
                          scope="row"
                          className="px-2"
                          align="right"
                        >
                          {isMock ? (
                            <Skeleton className="w-100" />
                          ) : (
                            <div style={{ width: 100 }}>
                              {description || "-"}
                            </div>
                          )}
                        </TableCell>
                        {isSuper ? (
                          <TableCell
                            style={{ padding: 18 }}
                            scope="row"
                            className="px-2"
                            align="right"
                          >
                            {isMock ? (
                              <Skeleton className="w-100" />
                            ) : (
                              <div style={{ width: 100 }}>
                                {branches.find(
                                  (branch) => branch.id === business
                                )?.title || "-"}
                              </div>
                            )}
                          </TableCell>
                        ) : null}
                        <TableCell className="text-nowrap" align="center">
                          {isMock ? (
                            <Skeleton
                              style={{
                                width: 70,
                              }}
                            />
                          ) : (
                            <div>{priceFormatter(total_paid_in)} تومان </div>
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
                            <div>{priceFormatter(total_paid_out)} تومان </div>
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
                            <div>
                              {balance === undefined
                                ? "-"
                                : `${priceFormatter(Math.abs(balance))}${
                                    balance < 0 ? "-" : ""
                                  } تومان`}
                            </div>
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
                            <div>
                              {final_money === undefined
                                ? "-"
                                : `${priceFormatter(Math.abs(final_money))}${
                                    final_money < 0 ? "-" : ""
                                  } تومان`}
                            </div>
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
                            <div>
                              {diff === undefined
                                ? "-"
                                : `${priceFormatter(Math.abs(diff))}${
                                    diff < 0 ? "-" : ""
                                  } تومان`}
                            </div>
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
                            <div
                              className="u-fontWeightHeavy"
                              style={{ color: drawerType.color }}
                            >
                              {drawerType.text}
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
              labelRowsPerPage={!maxWidth768 ? "تعداد ردیف در هر صفحه" : ""}
              labelDisplayedRows={({ from, to, count }) =>
                `${englishNumberToPersianNumber(
                  from
                )} - ${englishNumberToPersianNumber(to)} از ${
                  count !== -1
                    ? englishNumberToPersianNumber(count)
                    : `بیشتر از  ${englishNumberToPersianNumber(to)}`
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
            title={"صندوقی مطابق با جستجوی شما پیدا نشد!"}
          />
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  cashDrawers: makeSelectCashDrawers(),
  pagination: makeSelectCashDrawersPagination(),
  urlPrefix: makeSelectUrlPrefix(),
  isLoading: makeSelectLoading(),
  branches: makeSelectBranches(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCashDrawers: (data) => dispatch(getCashDrawers(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CashDrawerAnalytics);
