/**
 *
 * Categories
 *
 */
import React, {memo, useEffect, useMemo, useState} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import "jspdf-autotable";
import jMoment from "moment";
import {makeSelectBranches} from "@saas/stores/business/selector";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import {getReportData} from "store/actions";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import {makeSelectReportsData} from "store/selectors";
import {persianToEnglishNumber} from "@saas/utils/helpers/persianToEnglishNumber";
import {priceFormatter} from "@saas/utils/helpers/priceFormatter";
import {englishNumberToPersianNumber} from "@saas/utils/helpers/englishNumberToPersianNumber";

import {makeSelectReportsLoading} from "@saas/stores/global/selectors";
import {
    BRANCHES_ORDERS_REPORT_TYPE,
    BRANCHES_TRANSACTIONS_REPORT_TYPE,
} from "@saas/stores/global/constants";
import LoadingIndicator from "@saas/components/LoadingIndicator";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {businessBranchesDataMerger} from "containers/helper";
import Chart from "../../Chart";
import {NEW_SHOPPING_ORDERS, NEW_TRANSACTION_API} from "@saas/utils/api";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import {
    TOTAL_ORDER,
    TOTAL_PAYMENTS,
} from "containers/AdminReportBuilder/constants";

import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import {defaultFromDate, defaultToDate} from "@saas/utils/constants/date";
import CustomCalendar from "@saas/components/CustomCalendar";
import {formatDateObjectToNormal} from "../../../../../../utils/helpers";


 
jMoment.loadPersian({dialect: "persian-modern", usePersianDigits: true});

const $ = `/images/$.svg`;

const columns = ["Date", "Total sales", "Number of order", "Average order value"];

export function AdminAovReport({
                                   _getReportData,
                                   reportsData,
                                   reportsLoadingState,
                                   branches,
                               }) {
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: defaultFromDate,
        to: defaultToDate,
    });

    const [rows, setRows] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedBranches, setSelectedBranches] = useState(
        branches.map((branche) => branche.id)
    );

    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = () => setOpenModal(true);
    const id = openModal ? "simple-popover" : undefined;
    const [compareToPrevious, setCompareToPrevious] = useState(true);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const submitDate = () => {
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
            BRANCHES_ORDERS_REPORT_TYPE,
            NEW_SHOPPING_ORDERS,
            true,
            compareToPrevious
        );
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
            BRANCHES_TRANSACTIONS_REPORT_TYPE,
            NEW_TRANSACTION_API,
            true,
            compareToPrevious
        );
        handleCloseModal();
    };
    useEffect(() => {
        setTimeout(() => {
            submitDate();
        }, 0);
    }, []);

    const {
        currentRange: mainTransactionsData,
        previousRange: comparedTransactionsData,
    } = reportsData?.[BRANCHES_TRANSACTIONS_REPORT_TYPE] || [];

    const isTransactionsReportLoading = useMemo(
        () => reportsLoadingState?.[BRANCHES_TRANSACTIONS_REPORT_TYPE],
        [reportsLoadingState]
    );
    const isOrdersReportLoading = useMemo(
        () => reportsLoadingState?.[BRANCHES_ORDERS_REPORT_TYPE],
        [reportsLoadingState]
    );

    const mergedMainTransactionsPerDay = useMemo(
        () =>
            reportsLoadingState?.[BRANCHES_TRANSACTIONS_REPORT_TYPE] &&
            mainTransactionsData &&
            businessBranchesDataMerger(mainTransactionsData, selectedBranches),
        [mainTransactionsData, compareToPrevious, selectedBranches]
    );
    const mergedComparedTransactionsPerDay = useMemo(
        () =>
            reportsLoadingState?.[BRANCHES_TRANSACTIONS_REPORT_TYPE] &&
            comparedTransactionsData &&
            businessBranchesDataMerger(comparedTransactionsData, selectedBranches),
        [comparedTransactionsData, compareToPrevious, selectedBranches]
    );

    useEffect(() => {
        if (mergedMainTransactionsPerDay) {
            const _rows = mergedMainTransactionsPerDay?.map((transaction) => {
                const currentDate = new Date(transaction.timestamp);
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
                if (transaction[TOTAL_PAYMENTS]) {
                    const newRow = [
                        {
                            data: jalaaliDate,
                            is_price: false,
                        },
                        {
                            data: transaction[TOTAL_PAYMENTS],
                            is_price: true,
                        },
                        {
                            data: transaction[TOTAL_ORDER],
                            is_price: false,
                        },
                        {
                            data: transaction[TOTAL_PAYMENTS] / transaction[TOTAL_ORDER],
                            is_price: true,
                        },
                    ];
                    return newRow;
                } else {
                    const newRow = [
                        {
                            data: jalaaliDate,
                            is_price: false,
                        },
                        {
                            data: "0",
                            is_price: true,
                        },
                        {
                            data: "0",
                            is_price: false,
                        },
                        {
                            data: "0",
                            is_price: true,
                        },
                    ];
                    return newRow;
                }
            });
            setRows(_rows);
        }
    }, [mergedMainTransactionsPerDay]);

    const totalSales = useMemo(
        () =>
            mergedMainTransactionsPerDay?.length &&
            mergedMainTransactionsPerDay
                ?.filter((transaction) => transaction.id)
                .reduce(
                    (previousTransaction, nextTransaction) =>
                        previousTransaction.id && previousTransaction !== 0
                            ? previousTransaction[TOTAL_PAYMENTS]
                            : previousTransaction + nextTransaction[TOTAL_PAYMENTS],
                    0
                ),
        [mergedMainTransactionsPerDay]
    );

    const previousPeriodTotalSales = useMemo(
        () =>
            mergedComparedTransactionsPerDay?.length &&
            mergedComparedTransactionsPerDay
                ?.filter((transaction) => transaction.id)
                .reduce(
                    (previousTransaction, nextTransaction) =>
                        previousTransaction.id && previousTransaction !== 0
                            ? previousTransaction[TOTAL_PAYMENTS]
                            : previousTransaction + nextTransaction[TOTAL_PAYMENTS],
                    0
                ),
        [mergedComparedTransactionsPerDay]
    );
    const totalOrdersCount = useMemo(
        () =>
            mergedMainTransactionsPerDay?.length &&
            mergedMainTransactionsPerDay
                ?.filter((transactionPerDay) => transactionPerDay.id)
                .reduce(
                    (previousTransaction, nextTransaction) =>
                        previousTransaction.id && previousTransaction !== 0
                            ? previousTransaction[TOTAL_ORDER]
                            : previousTransaction + nextTransaction[TOTAL_ORDER],
                    0
                ),
        [mergedMainTransactionsPerDay]
    );

    const previousTotalOrderCount = useMemo(
        () =>
            mergedComparedTransactionsPerDay?.length &&
            mergedComparedTransactionsPerDay
                ?.filter((transactionPerDay) => transactionPerDay.id)
                .reduce(
                    (previousTransaction, nextTransaction) =>
                        previousTransaction.id && previousTransaction !== 0
                            ? previousTransaction[TOTAL_ORDER]
                            : previousTransaction + nextTransaction[TOTAL_ORDER],
                    0
                ),
        [mergedComparedTransactionsPerDay]
    );

    const totalOrdersAverageValues = useMemo(
        () =>
            totalSales * totalOrdersCount === 0 ? 0 : totalSales / totalOrdersCount,
        [totalSales, totalOrdersCount]
    );
    const previousPeriodTotalOrdersAverageValues = useMemo(
        () =>
            previousPeriodTotalSales * previousTotalOrderCount === 0
                ? 0
                : previousPeriodTotalSales / previousTotalOrderCount,
        [previousPeriodTotalSales, previousTotalOrderCount]
    );
    const totalOrderAverageCompare =
        totalOrdersAverageValues * previousPeriodTotalOrdersAverageValues
            ? (totalOrdersAverageValues / previousPeriodTotalOrdersAverageValues) *
            100 >
            100
                ? (
                    (totalOrdersAverageValues /
                        previousPeriodTotalOrdersAverageValues) *
                    100 -
                    100
                ).toFixed(2)
                : (
                    100 -
                    (totalOrdersAverageValues /
                        previousPeriodTotalOrdersAverageValues) *
                    100
                ).toFixed(2)
            : 0;
    const totalOrderAverageCompareColor =
        totalOrdersAverageValues > previousPeriodTotalOrdersAverageValues
            ? "#42e25c"
            : "rgb(208 48 48)";

    const mainDailyOrderAverageValues = useMemo(
        () =>
            mergedMainTransactionsPerDay?.length &&
            mergedMainTransactionsPerDay?.map((transaction) => {
                if (transaction.id) {
                    return Math.round(
                        transaction[TOTAL_PAYMENTS] / transaction[TOTAL_ORDER]
                    );
                } else return 0;
            }),
        [mergedMainTransactionsPerDay]
    );

    const comparedDailyOrderAverageValues = useMemo(
        () =>
            mergedComparedTransactionsPerDay?.length &&
            mergedComparedTransactionsPerDay?.map((transaction) => {
                if (transaction.id) {
                    return Math.round(
                        transaction[TOTAL_PAYMENTS] / transaction[TOTAL_ORDER]
                    );
                } else return 0;
            }),
        [mergedComparedTransactionsPerDay]
    );
    const summary = useMemo(() => {
        if (!reportsLoadingState?.[BRANCHES_TRANSACTIONS_REPORT_TYPE]) {
            return [
                {
                    data: totalSales,
                    is_price: true,
                },
                {
                    data: totalOrdersCount,
                    is_price: false,
                },
                {
                    data: totalOrdersAverageValues,
                    is_price: true,
                },
            ];
        }
        return [];
    }, [reportsLoadingState?.[BRANCHES_TRANSACTIONS_REPORT_TYPE]]);
    const transactionsXAxiosLabel = useMemo(
        () =>
            mergedMainTransactionsPerDay
                ? mergedMainTransactionsPerDay?.map((transaction) => {
                    const transactionDate = new Date(transaction.timestamp);
                    const transactionJalaaliFormat = jMoment(
                        `${transactionDate.getFullYear()}-${
                            transactionDate.getMonth() + 1
                        }-${transactionDate.getDate()}`,
                        "YYYY-MM-DD"
                    );
                    const formattedDate =
                        transactionJalaaliFormat.year() +
                        "-" +
                        (transactionJalaaliFormat.month() + 1) +
                        "-" +
                        transactionJalaaliFormat.date();
                    return englishNumberToPersianNumber(formattedDate);
                })
                : [],
        [mergedMainTransactionsPerDay]
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

    const printDocument = () => {
        const input = document.getElementById("aov-table");
        html2canvas(input).then((canvas) => {
            let imgWidth = 210;
            let imgHeight = (canvas.height * imgWidth) / canvas.width;
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            let position = 0;
            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
            pdf.save("The average value of orders.pdf");
        });
    };
    return (
        <div className="px-5 pb-5 container-fluid">
            <AdminBreadCrumb/>

            <div className="d-flex flex-wrap align-items-center my-4">
                <Select
                    className=" ml-2"
                    style={{minWidth: 150, height: 36}}
                    value={selectedBranches}
                    multiple
                    margin="dense"
                    variant="outlined"
                    displayEmpty
                    size="large"
                    renderValue={() => {
                        if (selectedBranches?.length === 0) return "Choose a branch";
                        if (selectedBranches?.length === 1 && selectedBranches[0])
                            return branches.find(
                                (branch) => branch.id === selectedBranches[0]
                            ).title;
                        if (selectedBranches?.length === branches?.length) return "All branches";
                        return `${englishNumberToPersianNumber(
                            selectedBranches?.length
                        )} Branch`;
                    }}
                    MenuProps={{
                        getContentAnchorEl: null,
                        style: {maxHeight: 500},
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
                                selectedBranches?.length !== branches?.length &&
                                selectedBranches?.length
                            }
                            onChange={(e) => {
                                e.preventDefault();
                            }}
                            onClick={() => {
                                if (selectedBranches?.length) setSelectedBranches([]);
                                else setSelectedBranches(branches.map((b) => b.id));
                            }}
                            color="primary"
                            checked={selectedBranches?.length === branches?.length}
                        />
                        <ListItemText primary="Choosing all branches" className="text-right"/>
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
                                <ListItemText primary={branch.title} className="text-right"/>
                            </MenuItem>
                        );
                    })}
                </Select>
                <div className="d-flex flex-wrap align-items-center ">
                    <Button
                        style={{
                            direction: "rtl",
                        }}
                        aria-describedby={id}
                        onClick={handleOpenModal}
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
                        onClose={handleCloseModal}
                    >
                        <div style={{backgroundColor: "#fff", position: "relative"}}>
                            <CloseIcon
                                onClick={handleCloseModal}
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

                <div className="mr-auto">
                    <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={handleClick}
                    >
                        Output
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={() => {
                                let csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF";
                                const content = [
                                    columns,
                                    [{data: "Summary"}, ...summary],
                                    ...rows,
                                ]
                                    .map((e) =>
                                        e
                                            .map((cell) =>
                                                typeof cell === "string" ? cell : cell.data
                                            )
                                            .join(",")
                                    )
                                    .join("\n");
                                let encodedUri = csvContent + encodeURIComponent(content);
                                let link = document.createElement("a");
                                link.setAttribute("href", encodedUri);
                                link.setAttribute("download", "report.csv");
                                document.body.appendChild(link); // Required for FF

                                link.click();
                            }}
                        >
                            EXEL
                        </MenuItem>
                        <MenuItem onClick={printDocument}>PDF</MenuItem>
                    </Menu>
                </div>
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
                        {(isTransactionsReportLoading && isOrdersReportLoading) ||
                        transactionsXAxiosLabel?.length === 0 ? (
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <LoadingIndicator/>
                            </div>
                        ) : (
                            <div>
                                <h2 style={{fontWeight: 700}} className="mb-2">
                                    The average value of orders
                                </h2>
                                <div className="my-2 d-flex justify-content-between align-items-center">
                                    <div style={{fontSize: 20, fontWeight: 700}}>
                                        {reportsData?.[BRANCHES_TRANSACTIONS_REPORT_TYPE] &&
                                            priceFormatter(totalOrdersAverageValues)}{" "}
                                        Toman
                                    </div>
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{
                                            fontSize: 20,
                                            color: totalOrderAverageCompareColor,
                                        }}
                                    >
                                        <div>
                                            % {englishNumberToPersianNumber(totalOrderAverageCompare)}{" "}
                                        </div>
                                        <div className="mr-2">
                                            {totalOrdersAverageValues >
                                            previousPeriodTotalOrdersAverageValues ? (
                                                <p style={{fontSize: 22}}>&#8593;</p> // UpArrowIcon
                                            ) : (
                                                <p style={{fontSize: 22}}>&#8595;</p> // DownArrowIcon
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {transactionsXAxiosLabel?.length || selectedBranches?.length ? (
                                    <Chart
                                        xAxisNodeTitle="Average order value"
                                        hasToCompare={compareToPrevious}
                                        xAxisLabel={transactionsXAxiosLabel}
                                        mainLineData={mainDailyOrderAverageValues}
                                        compareLineData={comparedDailyOrderAverageValues}
                                        selectedBranches
                                        title="The average value of orders"
                                    />
                                ) : (
                                    <div
                                        style={{fontWeight: 700, fontSize: 18}}
                                        className="mb-2 mx-auto text-bold text-center"
                                    >
                                        No branch is selected
                                    </div>
                                )}
                            </div>
                        )}
                    </Paper>
                </div>
                {!isTransactionsReportLoading && selectedBranches?.length ? (
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="customized table">
                            <TableHead style={{backgroundColor: "#1f1f25"}}>
                                <TableRow>
                                    {columns.map((column) => (
                                        <StyledTableCell key={column.id} align="center">
                                            {column}
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {summary && summary?.length ? (
                                    <StyledTableRow>
                                        <StyledTableCell
                                            align="center"
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 700,
                                            }}
                                        >
                                            Summary
                                        </StyledTableCell>
                                        {summary.map((summaryCell) => (
                                            <StyledTableCell
                                                key={summaryCell.id}
                                                align="center"
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {summaryCell.is_price
                                                    ? priceFormatter(summaryCell.data)
                                                    : englishNumberToPersianNumber(summaryCell.data)}{" "}
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                ) : null}
                                {rows &&
                                    rows.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            {row.map((rowCell) => (
                                                <StyledTableCell key={rowCell.id} align="center">
                                                    {rowCell.is_price
                                                        ? priceFormatter(rowCell.data)
                                                        : englishNumberToPersianNumber(rowCell.data)}{" "}
                                                    {rowCell.is_price && <img alt="" src={$}/>}
                                                </StyledTableCell>
                                            ))}
                                        </StyledTableRow>
                                    ))}
                                {summary?.length ? (
                                    <StyledTableRow>
                                        <StyledTableCell
                                            align="center"
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 700,
                                            }}
                                        >
                                            Summary
                                        </StyledTableCell>
                                        {summary.map((summaryCell) => (
                                            <StyledTableCell
                                                key={summaryCell.id}
                                                align="center"
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {summaryCell.is_price
                                                    ? priceFormatter(summaryCell.data)
                                                    : englishNumberToPersianNumber(summaryCell.data)}{" "}
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                ) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : null}
                {!isTransactionsReportLoading && !selectedBranches?.length && (
                    <>
                        <TableContainer component={Paper}>
                            <Table stickyHeader aria-label="customized table">
                                <TableHead style={{backgroundColor: "#1f1f25"}}>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <StyledTableCell key={column.id} align="center">
                                                {column}
                                            </StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <div
                            style={{fontSize: 15, fontWeight: 900}}
                            className="mx-auto text-bold text-center font-weight-bold w-100 mt-3"
                        >
                            No branch is selected
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    branches: makeSelectBranches(),
    reportsData: makeSelectReportsData(),
    reportsLoadingState: makeSelectReportsLoading(),
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

export default compose(withConnect, memo)(AdminAovReport);
