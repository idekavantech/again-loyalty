import React, { memo, useEffect, useMemo, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {
  businessBranchesDataMerger,
  convertEnglishNumToPersianNum,
} from "containers/helper";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { exportPDFFromHTML } from "@saas/utils/helpers/exportPDFFromHTML";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { DATE } from "./constants";
import jMoment from "moment";
import Paper from "@material-ui/core/Paper";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { getReportData } from "store/actions";
import { makeSelectReportsData } from "store/selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectBranches,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import { makeSelectReportsLoading } from "@saas/stores/global/selectors";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from "@material-ui/core/Menu";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";

import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";

import TomanIcon from "@saas/icons/TomanIcon";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../utils/helpers";

 
 

const AdminReportBuilder = ({
  reportsData,
  _getReportData,
  config,
  branches,
  reportsLoadingState,
  isPrice = false,
  business,
}) => {
  const {
    is_multibranch,
    initial_requests,
    has_date_picker,
    fields_data,
    title = "",
    x_axis_node_title = "",
    has_branches_selector,
    has_export_button,
    has_table,
    columns,
    table_type,
    pdf,
    has_csv = true,
  } = config;
  const [localReportsData, setLocalReportsData] = useState(null);
  const [localReportsMergedData, setLocalReportsMergedData] = useState(null);
  const [compareToPrevious, setCompareToPrevious] = useState(false);
  const [_columns, setColumns] = useState(columns);
  const [rows, setRows] = useState([]);
  const [selectedBranches, setSelectedBranches] = useState(
    is_multibranch ? branches.map((branche) => branche.id) : [business.id]
  );
  const [exportAnchor, toggleExportAnchor] = useState(null);

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;

  const submitDate = () => {
    initial_requests.map((request) =>
      _getReportData(
        persianToEnglishNumber(
          jMoment(
            formatDateObjectToNormal(selectedDayRange.from),
            "YYYY-jM-jD"
          ).format("YYYY-M-D")
        ),
        persianToEnglishNumber(
          jMoment(
            formatDateObjectToNormal(selectedDayRange.to),
            "YYYY-jM-jD"
          ).format("YYYY-M-D")
        ),
        request.type,
        request.url,
        is_multibranch,
        compareToPrevious
      )
    );
    handleClose();
  };
  useEffect(
    () =>
      setTimeout(() => {
        submitDate();
      }, 0),
    []
  );

  useEffect(
    () =>
      setTimeout(() => {
        submitDate();
      }, 0),
    [compareToPrevious]
  );

  useEffect(() => {
    if (Object.keys(reportsData).length) {
      const newLocalReportsData = initial_requests.map((request) => {
        return { ...reportsData[request.type], type: request.type };
      });
      setLocalReportsData(newLocalReportsData);
    }
  }, [reportsData]);
  useEffect(() => {
    if (selectedBranches && localReportsData) {
      const newLocalMergedReportsData = localReportsData?.map((element) => {
        const { currentRange, previousRange, type } = element;
        if (currentRange && previousRange) {
          return {
            type,
            currentRange: businessBranchesDataMerger(
              currentRange,
              selectedBranches
            ),
            previousRange: businessBranchesDataMerger(
              previousRange,
              selectedBranches
            ),
          };
        }
        return null;
      });
      setLocalReportsMergedData(newLocalMergedReportsData);
    }
  }, [localReportsData, selectedBranches]);

  useEffect(() => {
    if (localReportsData) {
      const _rows = localReportsMergedData
        ?.find((data) => data?.type === table_type)
        ?.currentRange?.map((data) => {
          const currentDate = new Date(data.timestamp);
          const currentFormattedDate = jMoment(
            `${currentDate.getFullYear()}-${
              currentDate.getMonth() + 1
            }-${currentDate.getDate()}`,
            "YYYY-MM-DD"
          );
          const jalaaliDate =
            currentFormattedDate.year() +
            "-" +
            (currentFormattedDate.month() + 1) +
            "-" +
            currentFormattedDate.date();
          if (data.id) {
            const newRow = _columns.map((column) => {
              const isColumnMultiField = Array.isArray(column.uniqe_name);
              if (column.uniqe_name === DATE) {
                return {
                  data: jalaaliDate,
                  uniqe_name: "date",
                  is_price: false,
                  has_to_shown: column.has_to_shown,
                };
              }
              if (isColumnMultiField) {
                const dataValues =
                  column.uniqe_name.map((colItem) => {
                    return data[colItem] ? Number(data[colItem]) : 0;
                  }) ?? [];
                return {
                  data: dataValues.reduce((acc, cur) => acc + cur),
                  uniqe_name: column.uniqe_name,
                  is_price: column.is_price,
                  has_to_shown: column.has_to_shown,
                };
              }
              return {
                data: data[column.uniqe_name],
                uniqe_name: column.uniqe_name,
                is_price: column.is_price,
                has_to_shown: column.has_to_shown,
              };
            });
            return newRow;
          } else {
            const newRow = _columns.map((column) => {
              if (column.uniqe_name === DATE) {
                return {
                  data: jalaaliDate,
                  uniqe_name: "date",
                  is_price: false,
                  has_to_shown: column.has_to_shown,
                };
              }
              return {
                data: data[column.uniqe_name] || 0,
                uniqe_name: column.uniqe_name,
                is_price: column.is_price,
                has_to_shown: column.has_to_shown,
              };
            });
            return newRow;
          }
        });
      setRows(_rows);
    }
  }, [localReportsMergedData, localReportsData, _columns]);
  const summary = useMemo(() => {
    if (localReportsData && _columns) {
      const selectedDataByTypeOfTable = localReportsMergedData?.find(
        (data) => data?.type === table_type
      )?.currentRange;
      return _columns.map((column) => {
        const isColumnMultiField = Array.isArray(column.uniqe_name);
        if (column.uniqe_name === DATE) {
          return {
            data: "Summary",
            uniqe_name: DATE,
            is_price: false,
            has_to_shown: column.has_to_shown,
          };
        }
        if (isColumnMultiField) {
          const columnsSum = column.uniqe_name.join("-");
          const _selectedDataByTypeOfTable = selectedDataByTypeOfTable.map(
            (dataByType) => {
              const columnDataSum = column.uniqe_name.map((item) => {
                return dataByType[item] ? Number(dataByType[item]) : 0;
              });
              return {
                ...dataByType,
                [columnsSum]: columnDataSum.reduce((acc, cur) => acc + cur),
              };
            }
          );
          return {
            data: _selectedDataByTypeOfTable?.reduce(
              (a, b) => a + (b[columnsSum] || 0),
              0
            ),
            uniqe_name: column.uniqe_name,
            is_price: column.is_price,
            has_to_shown: column.has_to_shown,
          };
        }

        return {
          data: selectedDataByTypeOfTable?.reduce(
            (a, b) => a + (b[column.uniqe_name] || 0),
            0
          ),
          uniqe_name: column.uniqe_name,
          is_price: column.is_price,
          has_to_shown: column.has_to_shown,
        };
      });
    } else return [];
  }, [_columns, localReportsMergedData, localReportsMergedData]);

  const xAxisLabel = useMemo(() => {
    return (
      localReportsMergedData?.[0]?.currentRange?.map((item) => {
        const itemDate = new Date(item.timestamp);
        const itemJalaaliFormat = jMoment(
          `${itemDate.getFullYear()}-${
            itemDate.getMonth() + 1
          }-${itemDate.getDate()}`,
          "YYYY-MM-DD"
        );
        const formattedDate =
          itemJalaaliFormat.year() +
          "-" +
          (itemJalaaliFormat.month() + 1) +
          "-" +
          itemJalaaliFormat.date();
        return englishNumberToPersianNumber(formattedDate);
      }) || []
    );
  }, [localReportsMergedData, localReportsData]);

  const currentChartLineData = useMemo(() => {
    return localReportsMergedData
      ?.find((data) => data?.type === fields_data.type)
      ?.currentRange?.map((data) =>
        data[fields_data.name] ? data[fields_data.name] : 0
      );
  }, [localReportsMergedData, localReportsData, selectedBranches]);

  const previousChartLineData = useMemo(() => {
    return localReportsMergedData
      ?.find((data) => data?.type === fields_data.type)
      ?.previousRange?.map((data) =>
        data[fields_data.name] ? data[fields_data.name] : 0
      );
  }, [localReportsMergedData, localReportsData, selectedBranches]);

  const currentTotalValue = useMemo(() => {
    return localReportsMergedData
      ?.find((data) => data?.type === fields_data.type)
      ?.currentRange?.filter((data) => data?.[fields_data.name])
      ?.reduce(
        (previousData, nextData) =>
          previousData.id === 0 && previousData !== 0
            ? previousData[fields_data.name]
            : previousData + nextData[fields_data.name],
        0
      );
  }, [localReportsMergedData, localReportsData, selectedBranches]);

  const previousTotalValue = useMemo(() => {
    return localReportsMergedData
      ?.find((data) => data?.type === fields_data.type)
      ?.previousRange?.filter((data) => data?.[fields_data.name])
      ?.reduce(
        (previousData, nextData) =>
          previousData.id === 0 && previousData !== 0
            ? previousData[fields_data.name]
            : previousData + nextData[fields_data.name],
        0
      );
  }, [localReportsMergedData, localReportsData, selectedBranches]);

  const compareOfTotalValue = useMemo(
    () =>
      currentTotalValue * previousTotalValue
        ? (currentTotalValue / previousTotalValue) * 100 > 100
          ? ((currentTotalValue / previousTotalValue) * 100 - 100).toFixed(2)
          : (100 - (currentTotalValue / previousTotalValue) * 100).toFixed(2)
        : currentTotalValue === 0 && previousTotalValue > 0
        ? (100 - (1 / previousTotalValue) * 100).toFixed(2)
        : previousTotalValue === 0 && currentTotalValue > 0
        ? 100
        : 0,
    [currentTotalValue, previousTotalValue]
  );
  const compareOfTotalValueColor = useMemo(
    () =>
      +currentTotalValue > +previousTotalValue ? "#42c25c" : "rgb(208 48 48)",
    [compareOfTotalValue]
  );
  const isReportLoading = useMemo(
    () => reportsLoadingState?.[fields_data.type],
    [fields_data,reportsLoadingState]
  );
  const chartOption = useMemo(
    () => ({
      chart: {
        type: "spline",
        numberFormatter: function () {
          let ret = Highcharts.numberFormat.apply(0, arguments);
          return convertEnglishNumToPersianNum(ret);
        },
      },
      title: {
        text: title,
        style: {
          color: "#000",
          fontSize: "19px",
          paddingTop: 8,
          fontFamily: "IranSans",
          borderBottom: "1px dashed #c4cdd5",
        },
      },
      tooltip: {
        useHTML: true,
        style: {
          fontSize: "10px",
          textAlign: "right",
          fontFamily: "inherit",
          color: "rgba(218, 217, 217, 0.994)",
          direction: "rtl",
        },
        formatter: function () {
          const labelText =
            this.series.name === x_axis_node_title
              ? "<p>" +
                this.series.name +
                ": " +
                priceFormatter(this.y) +
                "</p>" +
                "<br>" +
                this.key +
                "</br>"
              : "<p>" +
                this.series.name +
                ": " +
                priceFormatter(this.y) +
                "</p>";
          return labelText;
        },
      },
      legend: {
        rtl: true,
        itemStyle: {
          font: "12px IranSans",
          color: "#505050",
          fontWeight: "900",
        },
        itemHoverStyle: {
          color: "#404040",
        },
        itemHiddenStyle: {
          color: "#606060",
        },
      },
      xAxis: {
        categories: xAxisLabel,
        style: {
          color: "#2e2e2e",
        },
        labels: {
          style: {
            fontFamily: "IranSans",
            color: "#383838",
            fontWeight: "700",
          },
        },
      },
      yAxis: {
        title: {
          text: title,
          style: {
            fontSize: "14px",
            fontFamily: "IranSans",
          },
        },
        labels: {
          formatter: function () {
            return priceFormatter(this.value);
          },
          style: {
            color: "#383838",
            fontFamily: "IranSans",
            fontSize: "16px",
            fontWeight: "700",
          },
        },
      },
      plotOptions: {
        spline: {
          lineWidth: 2,
          marker: {
            enabled: false,
          },
        },
      },
      series: compareToPrevious
        ? [
            {
              name: `${x_axis_node_title + " The previous interval"}`,
              color: "rgb(96, 96, 96)",
              data: previousChartLineData,
            },
            {
              name: x_axis_node_title,
              color: "#00AB97",
              data: currentChartLineData,
            },
          ]
        : [
            {
              name: x_axis_node_title,
              color: "#00AB97",
              data: currentChartLineData,
            },
          ],
    }),
    [
      compareToPrevious,
      currentChartLineData,
      previousChartLineData,
      selectedBranches,
    ]
  );

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#1f1f25",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const PDFConfigs = useMemo(
    () =>
      typeof pdf === "function"
        ? pdf({
            business,
            branches: is_multibranch
              ? selectedBranches.map(
                  (_branch) =>
                    branches.find((__branch) => __branch.id === _branch)
                      .revised_title
                )
              : null,
            from_date: jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "YYYY-jM-jD"
            ),
            to_date: jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "YYYY-jM-jD"
            ),
          })
        : {},
    [selectedDayRange, selectedBranches, is_multibranch, business, pdf]
  );
  if (
    currentChartLineData &&
    Math.max(...currentChartLineData) < 1 &&
    previousChartLineData &&
    Math.max(...previousChartLineData) < 1
  ) {
    chartOption.yAxis = { ...chartOption.yAxis, max: 1 };
  } else chartOption.yAxis = { ...chartOption.yAxis, max: null };
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
      </Head>

      <AdminBreadCrumb
        buttons={
          has_export_button ? (
            <div className="d-inline-block mr-auto">
              <Button
                className="mr-auto"
                size="medium"
                color="primary"
                variant="contained"
                onClick={(e) => toggleExportAnchor(e.currentTarget)}
              >
                Output
              </Button>
              <Menu
                elevation={1}
                anchorEl={exportAnchor}
                keepMounted
                open={Boolean(exportAnchor)}
                onClose={() => toggleExportAnchor(false)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                {/* <MenuItem
                  onClick={async () => {
                    await exportPDFFromHTML(
                      {
                        css: PDFConfigs.main_styles,
                        html: document.getElementById("report").innerHTML,
                        configs: {
                          margin: {
                            top: 10,
                            left: 0,
                            bottom: 60,
                            right: 0,
                          },
                          displayHeaderFooter: true,
                          footerTemplate: PDFConfigs.footerTemplate,
                        },
                      },
                      title +
                        `From${englishNumberToPersianNumber(
                          formatDateObjectToNormal(selectedDayRange.from)
                        )} until the${englishNumberToPersianNumber(
                          formatDateObjectToNormal(selectedDayRange.to)
                        )}` +
                        ".pdf"
                    );
                  }}
                >
                  PDF
                </MenuItem> */}
                {has_csv ? (
                  <MenuItem
                    onClick={() => {
                      let csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF";
                      const content = [columns, [...summary], ...rows]
                        .map((e) =>
                          e
                            .map((cell) => (cell.name ? cell.name : cell.data))
                            .join(",")
                        )
                        .join("\n");
                      let encodedUri = csvContent + encodeURIComponent(content);
                      let link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", title + ".csv");
                      document.body.appendChild(link); // Required for FF
                      link.click();
                    }}
                  >
                    CSV
                  </MenuItem>
                ) : null}
              </Menu>
            </div>
          ) : null
        }
      />
      <div className="d-flex flex-wrap align-items-center my-4">
        {has_branches_selector ? (
          <Select
            className=" ml-2"
            style={{ minWidth: 150, height: 36 }}
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
                )?.title;
              if (selectedBranches.length === branches.length) return "All branches";
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
              <ListItemText primary="Choosing all branches" className="text-right" />
            </MenuItem>
            {branches.map((branch) => {
              return (
                <MenuItem
                  className="px-2"
                  key={`${branch.id}-${selectedBranches.includes(branch.id)}`}
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
                        setSelectedBranches([...selectedBranches, branch.id]);
                      } else {
                        setSelectedBranches(
                          selectedBranches.filter((id) => id !== branch.id)
                        );
                      }
                    }}
                    color="primary"
                    checked={selectedBranches.includes(branch.id)}
                  />
                  <ListItemText primary={branch.title} className="text-right" />
                </MenuItem>
              );
            })}
          </Select>
        ) : null}

        {has_date_picker ? (
          <div className="d-flex flex-wrap align-items-center">
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
                  selectedDayRange={selectedDayRange}
                  setSelectedDayRange={setSelectedDayRange}
                  submitDate={submitDate}
                  setCompareToPrevious={setCompareToPrevious}
                  compareToPrevious={compareToPrevious}
                />
              </div>
            </Popover>
          </div>
        ) : null}
      </div>
      <div>
        <div>
          <Paper
            className="w-100 d-flex flex-column pt-3 px-4 mb-4"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              minHeight: "550px !important",
            }}
          >
            {isReportLoading || xAxisLabel.length === 0 ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <LoadingIndicator />
              </div>
            ) : (
              <div>
                <h2 style={{ fontWeight: 700 }} className="mb-2">
                  {title}
                </h2>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {isPrice
                      ? priceFormatter(currentTotalValue) + " Toman"
                      : priceFormatter(currentTotalValue)}
                  </div>
                  {compareToPrevious ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        fontSize: 20,
                        color: compareOfTotalValueColor,
                      }}
                    >
                      <div>
                        % {englishNumberToPersianNumber(compareOfTotalValue)}{" "}
                      </div>
                      <div className="mr-2">
                        {currentTotalValue > previousTotalValue ? (
                          <p style={{ fontSize: 22 }}>&#8593;</p> // UpArrowIcon
                        ) : (
                          <p style={{ fontSize: 22 }}>&#8595;</p> // DownArrowIcon
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
                {selectedBranches.length || !is_multibranch ? (
                  <HighchartsReact
                    className="mt-auto"
                    highcharts={Highcharts}
                    options={chartOption}
                  />
                ) : (
                  <div
                    style={{ fontWeight: 700, fontSize: 18 }}
                    className="mb-2 mx-auto text-bold text-center"
                  >
                    No branch is selected
                  </div>
                )}
              </div>
            )}
          </Paper>
        </div>
        {has_table ? (
          <>
            <Select
              className="ml-2 mb-2"
              style={{
                zIndex: 10,
                minWidth: 150,
                height: 36,
              }}
              value={columns.map((column) => column.name)}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                return "columns";
              }}
              MenuProps={{
                getContentAnchorEl: null,
                style: { zIndex: 10, maxHeight: 350 },
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
              {_columns.map((column, index) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${column.uniqe_name}`}
                    // key={`${column.uniqe_name}-${selectedBranches.includes(branch.slug)}`}
                    value={column.name}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      onClick={() => {
                        const newColumns = [..._columns];
                        newColumns[index] = {
                          ...column,
                          has_to_shown: !column.has_to_shown,
                        };
                        setColumns(newColumns);
                      }}
                      color="primary"
                      checked={column.has_to_shown}
                    />
                    <ListItemText
                      primary={column.name}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
            {!isReportLoading &&
            (selectedBranches.length > 0 || !is_multibranch) ? (
              <div id="report">
                {PDFConfigs.headerTemplate}
                <TableContainer component={Paper}>
                  <Table stickyHeader aria-label="customized table">
                    <TableHead style={{ backgroundColor: "#1f1f25" }}>
                      <TableRow>
                        {_columns?.map((column) => {
                          if (column.has_to_shown) {
                            return (
                              <StyledTableCell align="center">
                                {column.name}
                              </StyledTableCell>
                            );
                          } else return null;
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {summary && summary.length ? (
                        <StyledTableRow>
                          {summary.map((summaryCell) =>
                            summaryCell.has_to_shown ? (
                              <StyledTableCell
                                align="center"
                                className="summary"
                                style={{
                                  fontSize: 16,
                                  fontWeight: 700,
                                }}
                              >
                                {summaryCell.is_price
                                  ? priceFormatter(summaryCell.data)
                                  : englishNumberToPersianNumber(
                                      summaryCell.data
                                    )}{" "}
                                {summaryCell.is_price && (
                                  <TomanIcon color="#2f2b2b" />
                                )}
                              </StyledTableCell>
                            ) : null
                          )}
                        </StyledTableRow>
                      ) : null}
                      {rows &&
                        rows.map((row) => (
                          <StyledTableRow key={row.id}>
                            {row.map((rowCell) =>
                              rowCell.has_to_shown ? (
                                <StyledTableCell
                                  key={rowCell.data}
                                  align="center"
                                >
                                  {rowCell.is_price
                                    ? priceFormatter(rowCell.data)
                                    : englishNumberToPersianNumber(
                                        rowCell.data
                                      )}{" "}
                                  {rowCell.is_price && (
                                    <TomanIcon color="#2f2b2b" />
                                  )}
                                </StyledTableCell>
                              ) : null
                            )}
                          </StyledTableRow>
                        ))}
                      {summary?.length ? (
                        <StyledTableRow>
                          {summary.map((summaryCell) =>
                            summaryCell.has_to_shown ? (
                              <StyledTableCell
                                align="center"
                                className="summary"
                                style={{
                                  fontSize: 16,
                                  fontWeight: 700,
                                }}
                              >
                                {summaryCell.is_price
                                  ? priceFormatter(summaryCell.data)
                                  : englishNumberToPersianNumber(
                                      summaryCell.data
                                    )}{" "}
                                {summaryCell.is_price && (
                                  <TomanIcon color="#2f2b2b" />
                                )}
                              </StyledTableCell>
                            ) : null
                          )}
                        </StyledTableRow>
                      ) : null}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table stickyHeader aria-label="customized table">
                    <TableHead style={{ backgroundColor: "#1f1f25" }}>
                      <TableRow>
                        {_columns?.map((column) => {
                          if (column.has_to_shown) {
                            return (
                              <StyledTableCell align="center">
                                {column.name}
                              </StyledTableCell>
                            );
                          } else return null;
                        })}
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
                <div
                  style={{ fontSize: 15, fontWeight: 900 }}
                  className="mx-auto text-bold text-center font-weight-bold w-100 mt-3"
                >
                  No branch is selected
                </div>
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  reportsData: makeSelectReportsData(),
  branches: makeSelectBranches(),
  reportsLoadingState: makeSelectReportsLoading(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getReportData: (
      from,
      to,
      reportName,
      url,
      isMultiBranch,
      compareToPrevious
    ) =>
      dispatch(
        getReportData(
          from,
          to,
          reportName,
          url,
          isMultiBranch,
          compareToPrevious
        )
      ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminReportBuilder);
