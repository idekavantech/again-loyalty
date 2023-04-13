import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import jMoment from "moment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  makeSelectBranches,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import Chip from "@material-ui/core/Chip";
import { getFirstAndLastReport } from "store/actions";
import { makeSelectFirstAndLastReport } from "store/selectors";
import { BASE_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";

 
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });
const branchHeadCells = [
  {
    id: "id",
    name: "Row",
    label: "Row",
    align: "center",
  },
  {
    id: "id",
    name: "First purchase",
    label: "First purchase",
    align: "center",
  },
  {
    id: "id",
    name: "Last purchase",
    label: "Last purchase",
    align: "center",
  },
  {
    id: "id",
    name: "The first hour of arrival",
    label: "The first hour of arrival",
    align: "center",
  },
  {
    id: "id",
    name: "The last hour of departure",
    label: "The last hour of departure",
    align: "center",
  },
];

let timeoutId = null;

export function AdminFirstAndLastReport({
  isLoading,
  isSuper,
  branches,
  _getFirstAndLastReport,
  firstAndLastReport,
  BasePluginData,
  business,
}) {
  const salesChannels =
    business?.super_business?.plugins_config[BASE_PLUGIN]?.sales_channels ||
    BasePluginData?.salesChannels;
  const salesChannelsOptions = useMemo(() => {
    if (salesChannels) {
      return Object.entries(salesChannels).map(([key, value]) => ({
        id: key,
        keyword: key,
        title: value?.name,
      }));
    } else {
      return [];
    }
  }, [salesChannels]);
  const theme = useTheme();
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });
  const [openModal, setOpenModal] = useState(false);

  const [compareToPrevious, setCompareToPrevious] = useState(true);
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedSalesChannel, setSelectedSalesChannel] = useState(
    salesChannelsOptions.map((salesChannel) => salesChannel.id)
  );

  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = openModal ? "simple-popover" : undefined;

  const submitDate = () => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getFirstAndLastReport({
            business_id: selectedBranches,
            sales_channel: selectedSalesChannel,
            from_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.from),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.to),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getFirstAndLastReport({
          sales_channel: selectedSalesChannel,
          from_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
    handleClose();
  };

  const headCells = useMemo(() => {
    if (isSuper) {
      let mainBranchHeadCells = [...branchHeadCells];
      mainBranchHeadCells.splice(1, 0, {
        id: "id",
        name: "Branch Name",
        label: "Branch Name",
        align: "center",
      });
      return mainBranchHeadCells;
    } else {
      return branchHeadCells;
    }
  }, [isSuper]);
  useEffect(() => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getFirstAndLastReport({
            business_id: selectedBranches,
            sales_channel: selectedSalesChannel,
            from_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.from),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.to),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getFirstAndLastReport({
          sales_channel: selectedSalesChannel,
          from_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
  }, [isSuper, selectedBranches, selectedSalesChannel]);

  const headRow = useMemo(
    () => headCells.map((headCell) => headCell.name),
    [headCells]
  );

  const rows = useMemo(
    () =>
      firstAndLastReport &&
      Object.values(firstAndLastReport)?.map?.((report, index) => {
        const firstDate = new Date(report?.first_date);
        const firstDateFormattedDate = jMoment(
          `${firstDate.getFullYear()}-${
            firstDate.getMonth() + 1
          }-${firstDate.getDate()}`,
          "YYYY-MM-DD"
        );
        const jalaaliTimeForFirstDate =
          firstDate.getHours() + ":" + firstDate.getMinutes();
        const jalaaliDateForFirstDate =
          firstDateFormattedDate.year() +
          "-" +
          (firstDateFormattedDate.month() + 1) +
          "-" +
          firstDateFormattedDate.date();
        const lastDate = new Date(report?.last_date);
        const lastDateFormattedDate = jMoment(
          `${lastDate.getFullYear()}-${
            lastDate.getMonth() + 1
          }-${lastDate.getDate()}`,
          "YYYY-MM-DD"
        );
        const jalaaliTimeForLastDate =
          lastDate.getHours() + ":" + lastDate.getMinutes();
        const jalaaliDateForLastDate =
          lastDateFormattedDate.year() +
          "-" +
          (lastDateFormattedDate.month() + 1) +
          "-" +
          lastDateFormattedDate.date();

        const num = index + 1;
        const branch = branches?.find(
          (branch) => branch.id === report._id
        )?.title;
        if (isSuper) {
          return [
            num,
            branch,
            `${jalaaliDateForFirstDate} | ${jalaaliTimeForFirstDate}`,
            `${jalaaliDateForLastDate} | ${jalaaliTimeForLastDate}`,
          ];
        }
        return [
          num,
          `${jalaaliDateForFirstDate} | ${jalaaliTimeForFirstDate}`,
          `${jalaaliDateForLastDate} | ${jalaaliTimeForLastDate}`,
        ];
      }),
    [firstAndLastReport, branches, isSuper]
  );

  return (
    <div className="container">
      <Head>
        <title>Report first and last purchase, first entry and last exit</title>
      </Head>

      <AdminBreadCrumb
        submitAction={() =>
          generateCSVFile(
            headRow,
            rows || [],
            [],
            `Report of the first and last purchase, first entry and last exit from${formatDateObjectToNormal(
              selectedDayRange.from
            )} until the${formatDateObjectToNormal(selectedDayRange.to)}`
          )
        }
        submitButtonText="Output"
      />

      <Paper elevation={2} className="d-flex flex-column mt-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex flex-wrap align-items-center mb-3 ml-3">
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
                    compareToPrevious={compareToPrevious}
                    setCompareToPrevious={setCompareToPrevious}
                    selectedDayRange={selectedDayRange}
                    setSelectedDayRange={setSelectedDayRange}
                    submitDate={submitDate}
                  />
                </div>
              </Popover>
            </div>
            <Select
              className=" ml-3 mb-3"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedSalesChannel}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              // IconComponent={() => null}
              renderValue={() => {
                if (selectedSalesChannel.length === 0)
                  return "Select the sales channel";
                if (
                  selectedSalesChannel.length === 1 &&
                  selectedSalesChannel[0]
                )
                  return salesChannelsOptions.find(
                    (saleChannel) => saleChannel.id === selectedSalesChannel[0]
                  ).title;
                if (selectedSalesChannel.length === salesChannelsOptions.length)
                  return "All sales channels";
                return `${englishNumberToPersianNumber(
                  selectedSalesChannel.length
                )} Channel`;
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
                    selectedSalesChannel.length !==
                      salesChannelsOptions.length && selectedSalesChannel.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (selectedSalesChannel.length)
                      setSelectedSalesChannel([]);
                    else
                      setSelectedSalesChannel(
                        salesChannelsOptions.map(
                          (saleChannel) => saleChannel.id
                        )
                      );
                  }}
                  color="primary"
                  checked={
                    selectedSalesChannel.length === salesChannelsOptions.length
                  }
                />
                <ListItemText
                  primary="Select all sales channels"
                  className="text-right"
                />
              </MenuItem>
              {salesChannelsOptions.map((saleChannel) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={saleChannel.id}
                    value={saleChannel.id}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!selectedSalesChannel.includes(saleChannel.id)) {
                          setSelectedSalesChannel([
                            ...selectedSalesChannel,
                            saleChannel.id,
                          ]);
                        } else {
                          setSelectedSalesChannel(
                            selectedSalesChannel.filter(
                              (pr) => pr !== saleChannel.id
                            )
                          );
                        }
                      }}
                      color="primary"
                      checked={selectedSalesChannel.includes(saleChannel.id)}
                    />
                    <ListItemText
                      primary={saleChannel.title}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
            {isSuper && (
              <Select
                className=" ml-3 mb-3"
                style={{ minWidth: 150, height: 36, flex: 1 }}
                value={selectedBranches}
                multiple
                margin="dense"
                variant="outlined"
                displayEmpty
                size="large"
                // IconComponent={() => null}
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
                    onClick={() => {
                      if (selectedBranches.length) setSelectedBranches([]);
                      else setSelectedBranches(branches.map((b) => b.id));
                    }}
                    color="primary"
                    checked={selectedBranches.length === branches.length}
                  />
                  <ListItemText
                    primary="Choosing all branches"
                    className="text-right"
                  />
                </MenuItem>
                {branches.map((branch) => {
                  return (
                    <MenuItem
                      className="px-2"
                      key={`${branch.id}-${selectedBranches.includes(
                        branch.id
                      )}`}
                      value={branch.id}
                    >
                      <Checkbox
                        className="p-1"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!selectedBranches.includes(branch.id)) {
                            setSelectedBranches([
                              ...selectedBranches,
                              branch.id,
                            ]);
                          } else {
                            setSelectedBranches(
                              selectedBranches.filter((id) => id !== branch.id)
                            );
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
                  );
                })}
              </Select>
            )}
          </div>
        </div>
        {isSuper && (
          <div className="d-flex align-items-center flex-wrap px-4">
            {selectedBranches?.length === branches?.length ? (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                  maxWidth: "fit-content",
                }}
                className="ml-2 mb-2"
                onDelete={() => setSelectedBranches([])}
                label="All branches"
              />
            ) : selectedBranches?.length ? (
              branches
                ?.filter((item) => selectedBranches.includes(item.id))
                .map((branch) => {
                  return (
                    <Chip
                      key={branch.id}
                      deleteIcon={
                        <ClearRoundedIcon
                          style={{ color: theme.palette.text.disabled }}
                        />
                      }
                      style={{
                        borderRadius: 4,
                        background: theme.palette.background.secondary,
                        maxWidth: "fit-content",
                      }}
                      className="ml-2 mb-2"
                      onDelete={() =>
                        setSelectedBranches(
                          selectedBranches.filter((item) => item !== branch.id)
                        )
                      }
                      label={branch.title}
                    />
                  );
                })
            ) : (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                  maxWidth: "fit-content",
                }}
                className="ml-2 mb-2"
                onDelete={() =>
                  setSelectedBranches(branches.map((branch) => branch.id))
                }
                label="None of the branches"
              />
            )}
          </div>
        )}
        <div className="d-flex align-items-center flex-wrap px-4">
          {selectedSalesChannel?.length === salesChannelsOptions?.length ? (
            <Chip
              deleteIcon={
                <ClearRoundedIcon
                  style={{ color: theme.palette.text.disabled }}
                />
              }
              style={{
                borderRadius: 4,
                background: theme.palette.background.secondary,
                maxWidth: "fit-content",
              }}
              className="ml-2 mb-2"
              onDelete={() => setSelectedSalesChannel([])}
              label="All sales channels"
            />
          ) : selectedSalesChannel?.length ? (
            salesChannelsOptions
              ?.filter((item) => selectedSalesChannel.includes(item.id))
              .map((ingredient) => {
                return (
                  <Chip
                    key={ingredient.id}
                    deleteIcon={
                      <ClearRoundedIcon
                        style={{ color: theme.palette.text.disabled }}
                      />
                    }
                    style={{
                      borderRadius: 4,
                      background: theme.palette.background.secondary,
                      maxWidth: "fit-content",
                    }}
                    className="ml-2 mb-2"
                    onDelete={() =>
                      setSelectedSalesChannel(
                        selectedSalesChannel.filter(
                          (item) => item !== ingredient.id
                        )
                      )
                    }
                    label={ingredient.title}
                  />
                );
              })
          ) : (
            <Chip
              deleteIcon={
                <ClearRoundedIcon
                  style={{ color: theme.palette.text.disabled }}
                />
              }
              style={{
                borderRadius: 4,
                background: theme.palette.background.secondary,
                maxWidth: "fit-content",
              }}
              className="ml-2 mb-2"
              onDelete={() =>
                setSelectedSalesChannel(
                  salesChannelsOptions?.map((ingredient) => ingredient.id)
                )
              }
              label="None of the sales channels"
            />
          )}
        </div>
        {!selectedBranches?.length && isSuper ? (
          <div className="mx-auto">No branch is selected.</div>
        ) : !selectedSalesChannel?.length ? (
          <div className="mx-auto">No Selected Channels have been selected.</div>
        ) : (
          <TableContainer
            className="mt-3 purchase-by-order-table"
            style={{ maxHeight: 500 }}
          >
            <Table
              aria-labelledby="tableTitle"
              size="small"
              aria-label="enhanced table"
            >
              <TableHead
                style={{
                  backgroundColor: "#F1F2F3",
                  height: 50,
                  position: "sticky",
                  top: 0,
                }}
              >
                <TableRow>
                  {headCells?.map((headCell) => (
                    <TableCell
                      padding={headCell?.padding || "unset"}
                      width={headCell?.width || ""}
                      className="text-nowrap u-fontWeightBold"
                      key={headCell?.id}
                      align={headCell?.align}
                    >
                      {headCell?.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {isLoading ? (
                <TableBody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <TableRow style={{ height: 53 }} key={item}>
                      {headCells?.map((cell) => (
                        <TableCell key={cell?.id}>
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
                  {isSuper
                    ? firstAndLastReport &&
                      selectedBranches?.length &&
                      selectedBranches?.map((branchId, index) => {
                        const reportDataPerBranch = Object.values(
                          firstAndLastReport
                        ).find((report) => report._id === branchId);

                        const hasFirstDate =
                          !!reportDataPerBranch &&
                          !!reportDataPerBranch?.first_date;
                        const hasLastDate =
                          !!reportDataPerBranch &&
                          !!reportDataPerBranch?.last_date;
                        const firstDate = hasFirstDate
                          ? new Date(reportDataPerBranch?.first_date)
                          : null;
                        const lastDate = hasLastDate
                          ? new Date(reportDataPerBranch?.last_date)
                          : null;

                        const firstDateFormattedDate = hasFirstDate
                          ? getFormatedDate(firstDate)
                          : null;

                        const jalaaliTimeForFirstDate = hasFirstDate
                          ? getJalaaliTime(firstDate)
                          : null;

                        const jalaaliDateForFirstDate = hasFirstDate
                          ? getJalaaliDate(firstDateFormattedDate)
                          : null;

                        const lastDateFormattedDate = hasLastDate
                          ? getFormatedDate(lastDate)
                          : null;

                        const jalaaliTimeForLastDate = hasLastDate
                          ? lastDate.getHours() +
                            ":" +
                            (lastDate.getMinutes() < 10
                              ? "0" + lastDate.getMinutes()
                              : lastDate.getMinutes())
                          : null;

                        const jalaaliDateForLastDate = hasLastDate
                          ? getJalaaliDate(lastDateFormattedDate)
                          : null;

                        return (
                          <TableRow key={branchId}>
                            <TableCell align="center">
                              {englishNumberToPersianNumber(index + 1)}
                            </TableCell>
                            {isSuper && (
                              <TableCell align="center">
                                {
                                  branches?.find(
                                    (branch) => branch.id === branchId
                                  )?.title
                                }
                              </TableCell>
                            )}
                            <TableCell align="center">
                              <div className="d-flex justify-content-center">
                                <div style={{ width: 70 }}>
                                  {hasFirstDate
                                    ? englishNumberToPersianNumber(
                                        jalaaliDateForFirstDate
                                      )
                                    : "-"}
                                </div>
                                {hasFirstDate && <div className="mx-2">|</div>}
                                <div style={{ width: 40 }}>
                                  {hasFirstDate
                                    ? englishNumberToPersianNumber(
                                        jalaaliTimeForFirstDate
                                      )
                                    : ""}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              <div className="d-flex justify-content-center">
                                <div style={{ width: 70 }}>
                                  {hasLastDate
                                    ? englishNumberToPersianNumber(
                                        jalaaliDateForLastDate
                                      )
                                    : "-"}
                                </div>
                                {hasLastDate && <div className="mx-2">|</div>}
                                <div style={{ width: 40 }}>
                                  {hasLastDate
                                    ? englishNumberToPersianNumber(
                                        jalaaliTimeForLastDate
                                      )
                                    : ""}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              <div className="d-flex justify-content-center">
                                {reportDataPerBranch?.logs?.login
                                  ? jMoment(
                                      reportDataPerBranch?.logs?.login
                                        .first_login,
                                      "YYYY-M-D HH:mm:ss"
                                    ).format("YYYY/jM/jD")
                                  : "-"}
                                {reportDataPerBranch?.logs?.login && (
                                  <div className="mx-2">|</div>
                                )}
                                {reportDataPerBranch?.logs?.login
                                  ? jMoment(
                                      reportDataPerBranch?.logs?.login
                                        .first_login,
                                      "YYYY-M-D HH:mm:ss"
                                    ).format("HH:mm:ss")
                                  : "-"}
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              <div className="d-flex justify-content-center">
                                {reportDataPerBranch?.logs?.logout
                                  ? jMoment(
                                      reportDataPerBranch?.logs?.logout
                                        .last_login,
                                      "YYYY-M-D HH:mm:ss"
                                    ).format("YYYY/jM/jD")
                                  : "-"}
                                {reportDataPerBranch?.logs?.logout && (
                                  <div className="mx-2">|</div>
                                )}
                                {reportDataPerBranch?.logs?.logout
                                  ? jMoment(
                                      reportDataPerBranch?.logs?.logout
                                        .last_login,
                                      "YYYY-M-D HH:mm:ss"
                                    ).format("HH:mm:ss")
                                  : "-"}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : firstAndLastReport &&
                      Object.values(firstAndLastReport)?.map(
                        (report, index) => {
                          const hasFirstDate = !!report?.first_date;
                          const hasLastDate = !!report?.last_date;
                          const firstDate = new Date(report?.first_date);
                          const lastDate = new Date(report?.last_date);
                          const hasFirstLogin =
                            report?.logs?.login &&
                            report?.logs?.login?.first_login;
                          const hasLastLogout =
                            report?.logs?.logout &&
                            report?.logs?.logout?.first_login;

                          const firstDateFormattedDate =
                            getFormatedDate(firstDate);

                          const jalaaliDateForFirstDate = getJalaaliDate(
                            firstDateFormattedDate
                          );

                          const lastDateFormattedDate =
                            getFormatedDate(lastDate);

                          const jalaaliDateForLastDate = getJalaaliDate(
                            lastDateFormattedDate
                          );

                          const firstLogin = new Date(
                            hasFirstLogin ? report?.logs.login.first_login : 0
                          );
                          const firstClockInFormattedDate =
                            getFormatedDate(firstLogin);

                          const jalaaliTimeForFirstClockInDate =
                            getJalaaliTime(firstLogin);
                          const jalaaliDateForFirstClockInDate = getJalaaliDate(
                            firstClockInFormattedDate
                          );

                          const lastClockOutDate = new Date(
                            hasLastLogout
                              ? report?.logs?.logout?.first_login
                              : 0
                          );

                          const lastClockOutFormattedDate =
                            getFormatedDate(lastClockOutDate);

                          const jalaaliTimeForLastClockOutDate =
                            getJalaaliTime(lastClockOutDate);
                          const jalaaliDateForLastClockOutDate = getJalaaliDate(
                            lastClockOutFormattedDate
                          );

                          return (
                            <TableRow key={report.id}>
                              <TableCell align="center">
                                {englishNumberToPersianNumber(index + 1)}
                              </TableCell>
                              {isSuper && (
                                <TableCell align="center">
                                  {
                                    branches?.find(
                                      (branch) => branch.id === report._id
                                    )?.title
                                  }
                                </TableCell>
                              )}
                              <TableCell align="center">
                                <div className="d-flex justify-content-center">
                                  <div style={{ width: 70 }}>
                                    {hasFirstDate
                                      ? englishNumberToPersianNumber(
                                          jalaaliDateForFirstDate
                                        )
                                      : "-"}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                <div className="d-flex justify-content-center">
                                  <div style={{ width: 70 }}>
                                    {hasLastDate
                                      ? englishNumberToPersianNumber(
                                          jalaaliDateForLastDate
                                        )
                                      : "-"}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                <div className="d-flex justify-content-center">
                                  <div>
                                    {hasFirstLogin
                                      ? englishNumberToPersianNumber(
                                          jalaaliDateForFirstClockInDate
                                        )
                                      : "-"}
                                  </div>
                                  {hasFirstLogin && (
                                    <div className="mx-2">|</div>
                                  )}
                                  <div>
                                    {hasFirstLogin
                                      ? englishNumberToPersianNumber(
                                          jalaaliTimeForFirstClockInDate
                                        )
                                      : ""}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                <div className="d-flex justify-content-center">
                                  <div>
                                    {hasLastLogout
                                      ? englishNumberToPersianNumber(
                                          jalaaliDateForLastClockOutDate
                                        )
                                      : "-"}
                                  </div>
                                  {hasLastLogout && (
                                    <div className="mx-2">|</div>
                                  )}
                                  <div>
                                    {hasLastLogout
                                      ? englishNumberToPersianNumber(
                                          jalaaliTimeForLastClockOutDate
                                        )
                                      : ""}
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        )}
      </Paper>
    </div>
  );
}

const getJalaaliDate = (date) =>
  date.year() + "-" + (date.month() + 1) + "-" + date.date();

const getFormatedDate = (date) =>
  jMoment(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    "YYYY-MM-DD"
  );

const getJalaaliTime = (date) => date.getHours() + ":" + date.getMinutes();

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  branches: makeSelectBranches(),
  firstAndLastReport: makeSelectFirstAndLastReport(),
  BasePluginData: makeSelectPlugin(BASE_PLUGIN),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getFirstAndLastReport: (data) => dispatch(getFirstAndLastReport(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminFirstAndLastReport);
