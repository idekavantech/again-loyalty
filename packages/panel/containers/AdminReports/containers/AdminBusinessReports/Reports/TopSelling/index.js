/**
 *
 * Categories
 *
 */
import React, {memo, useEffect, useState} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import jMoment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {getProductsTopSellingReport} from "store/actions";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import {makeSelectBusinessTopSellingDeals} from "store/selectors";
import {persianToEnglishNumber} from "@saas/utils/helpers/persianToEnglishNumber";
import {priceFormatter} from "@saas/utils/helpers/priceFormatter";
import {englishNumberToPersianNumber} from "@saas/utils/helpers/englishNumberToPersianNumber";

import {makeSelectLoading} from "@saas/stores/global/selectors";
import {TOP_SELLING_REPORT_TYPE} from "@saas/stores/global/constants";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import {defaultFromDate, defaultToDate} from "@saas/utils/constants/date";
import CustomCalendar from "@saas/components/CustomCalendar";
import {formatDateObjectToNormal} from "../../../../../../utils/helpers";


 
jMoment.loadPersian({dialect: "persian-modern", usePersianDigits: true});

const $ = `/images/$.svg`;
const columns = ["Product Name", "Sales number", "Sale of product", "Product number"];

export function AdminTopSellingReport({
                                          _getProductsTopSellingReport,
                                          businessTopSellingDeals = {},
                                          isTopSellingReportLoading,
                                      }) {
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: defaultFromDate,
        to: defaultToDate,
    });

    const [rows, setRows] = useState([]);

    const [countOfTopSelling, setCountOfTopSelling] = useState(5);
    const [open, setOpen] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => setOpenModal(false);
    const handleOpenModal = () => setOpenModal(true);
    const id = openModal ? "simple-popover" : undefined;

    const handleChange = (event) => {
        setCountOfTopSelling(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const submitDate = () => {
        _getProductsTopSellingReport(
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
            countOfTopSelling
        );
        handleCloseModal();
    };
    useEffect(() => {
        setTimeout(() => {
            submitDate();
        }, 0);
    }, [countOfTopSelling]);

    useEffect(() => {
        if (businessTopSellingDeals && businessTopSellingDeals.data) {
            const _rows = businessTopSellingDeals.data.map((deals) => {
                const newRow = [
                    {
                        data: deals.deal_title,
                        is_price: false,
                    },
                    {
                        data: deals.count_deal_sold,
                        is_price: false,
                    },
                    {
                        data: deals.sum_discounted_price,
                        is_price: true,
                    },
                    {
                        data: deals.deal_id,
                        is_price: false,
                    },
                ];
                return newRow;
            });
            setRows(_rows);
        } else return null;
    }, [businessTopSellingDeals]);

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

    return (
        <div className="px-5 pb-5 container-fluid">
            <div className="d-flex flex-wrap align-items-center my-4">
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
                            vertical: 120,
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
                                selectedDayRange={selectedDayRange}
                                setSelectedDayRange={setSelectedDayRange}
                                submitDate={submitDate}
                            />
                        </div>
                    </Popover>
                </div>
                <div className="d-flex justify-content-center align-items-center mr-3">
                    <div className="ml-1">Display Product Number:</div>
                    <div>
                        <FormControl style={{minWidth: 53}}>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={countOfTopSelling}
                                onChange={handleChange}
                            >
                                <MenuItem value={5}>
                                    <em>{priceFormatter(5)}</em>
                                </MenuItem>
                                <MenuItem value={10}>{priceFormatter(10)}</MenuItem>
                                <MenuItem value={20}>{priceFormatter(20)}</MenuItem>
                                <MenuItem value={30}>{priceFormatter(30)}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <Button
                    className="mr-auto"
                    size="large"
                    color="primary"
                    variant="contained"
                    onClick={() => {
                        let csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF";
                        const content = [columns, ...rows]
                            .map((e) =>
                                e
                                    .map((cell) => (typeof cell === "string" ? cell : cell.data))
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
                    Output
                </Button>
            </div>

            <div>
                {!isTopSellingReportLoading &&
                businessTopSellingDeals &&
                businessTopSellingDeals.data.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky customized table">
                            <TableHead style={{backgroundColor: "#1f1f25"}}>
                                <TableRow>
                                    {columns.map((column, index) => (
                                        <StyledTableCell key={index} align="center">
                                            {column}
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows &&
                                    rows.map((row, index) => (
                                        <StyledTableRow key={index}>
                                            {row.map((rowCell, index) => (
                                                <StyledTableCell align="center" key={index}>
                                                    {rowCell.is_price
                                                        ? priceFormatter(rowCell.data)
                                                        : englishNumberToPersianNumber(rowCell.data)}{" "}
                                                    {rowCell.is_price && <img alt="" src={$}/>}
                                                </StyledTableCell>
                                            ))}
                                        </StyledTableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : isTopSellingReportLoading ? (
                    <>
                        <TableContainer component={Paper}>
                            <Table stickyHeader aria-label="sticky customized table">
                                <TableHead style={{backgroundColor: "#1f1f25"}}>
                                    <TableRow>
                                        {columns.map((column, index) => (
                                            <StyledTableCell key={index} align="center">
                                                {column}
                                            </StyledTableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <LoadingIndicator/>
                    </>
                ) : (
                    <>
                        <TableContainer component={Paper}>
                            <Table stickyHeader aria-label="sticky customized table">
                                <TableHead style={{backgroundColor: "#1f1f25"}}>
                                    <TableRow>
                                        {columns.map((column, index) => (
                                            <StyledTableCell key={index} align="center">
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
                            There is no product in this time interval
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    businessTopSellingDeals: makeSelectBusinessTopSellingDeals(),
    isTopSellingReportLoading: makeSelectLoading(TOP_SELLING_REPORT_TYPE),
});

function mapDispatchToProps(dispatch) {
    return {
        _getProductsTopSellingReport: (from, to, count) =>
            dispatch(getProductsTopSellingReport(from, to, count)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminTopSellingReport);
