/* eslint-disable camelcase */
/* eslint-disable indent */
/**
 *
 * Orders
 *
 */
import React, {memo, useEffect, useState} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Link from "next/link";
import {compose} from "redux";
import {
    makeSelectCountOfUserOrders,
    makeSelectUserOrders,
} from "../../selectors";
import {getUserOrders} from "../../actions";
import {makeSelectBranches} from "@saas/stores/business/selector";
import {SHOPPING_PLUGIN} from "@saas/utils/constants/plugins";
import {
    makeSelectPlugins,
    makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import {
    cement,
    coal,
    graphite,
    jungleI,
    pollution,
    smoke,
    strawberryII,
    white,
} from "@saas/utils/colors";
import IconButton from "@material-ui/core/IconButton";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Tabs from "@material-ui/core/Tabs";
import useTheme from "@material-ui/core/styles/useTheme";
import {priceFormatter} from "@saas/utils/helpers/priceFormatter";
import {englishNumberToPersianNumber} from "@saas/utils/helpers/englishNumberToPersianNumber";

import {
    FULFILLMENT_CARRY_OUT,
    FULFILLMENT_ON_BUSINESS_SITE,
    FULFILLMENT_ON_WEBSITE,
    NEW_ORDER_STATUS_ACCEPTED,
    NEW_ORDER_STATUS_CART,
    NEW_ORDER_STATUS_COMP,
    NEW_ORDER_STATUS_COMPLETED,
    NEW_ORDER_STATUS_COURIER_ASSIGNED,
    NEW_ORDER_STATUS_COURIER_PICKED_UP,
    NEW_ORDER_STATUS_DELIVERED,
    NEW_ORDER_STATUS_NEW,
    NEW_ORDER_STATUS_OPEN_TAB,
    NEW_ORDER_STATUS_READY_TO_DELIVER,
    NEW_ORDER_STATUS_VOID,
} from "../../constants";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import {useResponsive} from "@saas/utils/hooks/useResponsive";
import {paidPriceTypes} from "@saas/utils/constants/paidPriceTypes";


const $ = `/images/$.svg`;

const deliveryTypes = {
    send: {
        label: "submit",
        icon: `/images/bike.svg`,
    },
    onSpot: {
        label: "In-person delivery",
        icon: `/images/man.svg`,
    },
    serve: {
        label: "Cedar in place",
        icon: `/images/serve.svg`,
    },
    onWebSite: {
        label: "Virtual receipt",
        icon: `/images/phonelink.svg`,
    },
};

export const orderStatus = {
    [NEW_ORDER_STATUS_CART]: {
        label: "Pending",
        iconProgress: "0%",
        iconColor: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
        backgroundColor:
            "linear-gradient(0deg, rgba(0, 80, 255, 0.16), rgba(0, 80, 255, 0.16)), #FFFFFF",
    },
    [NEW_ORDER_STATUS_OPEN_TAB]: {
        label: "Open",
        iconProgress: "0%",
        iconColor: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
        backgroundColor:
            "linear-gradient(0deg, rgba(0, 80, 255, 0.16), rgba(0, 80, 255, 0.16)), #FFFFFF",
    },
    [NEW_ORDER_STATUS_VOID]: {
        label: "Cancelled by returning to Anbar",
        iconProgress: "50%",
        iconColor: strawberryII,
        backgroundColor: "rgba(152, 169, 177, 0.16)",
    },
    [NEW_ORDER_STATUS_COMP]: {
        label: "Cancellation without returning to the warehouse",
        iconProgress: "100%",
        iconColor: strawberryII,
        backgroundColor: "rgba(152, 169, 177, 0.16)",
    },
    [NEW_ORDER_STATUS_NEW]: {
        label: "New",
        iconProgress: "100%",
        iconColor: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
        backgroundColor: "rgba(152, 169, 177, 0.16)",
    },
    [NEW_ORDER_STATUS_ACCEPTED]: {
        label: "Accepted",
        iconProgress: "100%",
        iconColor: jungleI,
        backgroundColor: "rgba(152, 169, 177, 0.16)",
    },
    [NEW_ORDER_STATUS_READY_TO_DELIVER]: {
        label: "Ready to send",
        iconProgress: "100%",
        iconColor: jungleI,
        backgroundColor: "rgba(152, 169, 177, 0.16)",
    },
    [NEW_ORDER_STATUS_COURIER_ASSIGNED]: {
        label: "Packaged",
        iconProgress: "100%",
        iconColor: jungleI,
        backgroundColor: "rgba(152, 169, 177, 0.16)",
    },
    [NEW_ORDER_STATUS_COURIER_PICKED_UP]: {
        label: "Courier delivery",
        iconProgress: "100%",
        iconColor: jungleI,
        backgroundColor: "rgba(152, 169, 177, 0.16)",
    },
    [NEW_ORDER_STATUS_DELIVERED]: {
        label: "Posted",
        iconProgress: "100%",
        iconColor: jungleI,
        backgroundColor: "rgba(152, 169, 177, 0.16)",
    },
    [NEW_ORDER_STATUS_COMPLETED]: {
        label: "Closed",
        iconProgress: "100%",
        iconColor: jungleI,
        backgroundColor: "rgba(152, 169, 177, 0.16)",
    },
};

export function Orders({
                           userOrders,
                           _fetchUserOrders,
                           isSuper,
                           plugin = SHOPPING_PLUGIN,
                           pluginsData,
                           urlPrefix,
                           branches,
                           countOfUserOrders,
                       }) {
    const [value, setValue] = useState("1");
    const [orderStatusFilter, setOrderStatusFilter] = useState(null);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const theme = useTheme();
    const pluginUrl = pluginsData[plugin].plugin_url;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const {minWidth768} = useResponsive();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPageSize(event.target.value);
        setPage(0);
    };

    useEffect(() => {
        setTimeout(() => {
            _fetchUserOrders(page + 1, pageSize, isSuper);
        }, 0);
    }, [page, pageSize]);

    const canceledOrders =
        userOrders &&
        userOrders.filter(
            (order) =>
                order.order_status === NEW_ORDER_STATUS_VOID ||
                order.order_status === NEW_ORDER_STATUS_COMP
        ).length;
    const submittedOrders =
        userOrders &&
        userOrders.filter((order) => order.order_status === NEW_ORDER_STATUS_NEW)
            .length;
    const doingOrders =
        userOrders &&
        userOrders.filter(
            (order) => order.order_status === NEW_ORDER_STATUS_ACCEPTED
        ).length;
    const tabLabel = (label, orderAmount, isActive) => (
        <div className="d-flex justify-content-center align-items-center">
            <div>{label}</div>
            <div
                className="mr-2 d-flex justify-content-center align-items-center"
                style={{
                    width: 11,
                    height: 11,
                    backgroundColor: isActive ? theme.palette.secondary.main : cement,
                    borderRadius: "50%",
                    padding: 9,
                    fontSize: 10,
                    color: white,
                }}
            >
        <span style={{lineHeight: 0}}>
          {englishNumberToPersianNumber(orderAmount)}
        </span>
            </div>
        </div>
    );
    const filteredUserOrders = userOrders
        ? userOrders.filter(
            (order) =>
                typeof orderStatusFilter !== "number" ||
                order.order_status === orderStatusFilter
        )
        : [];
    return minWidth768 ? (
        <div style={{backgroundColor: "#F6F6F7"}}>
            <div className="container py-5">
                <Paper>
                    <TableContainer
                        style={{backgroundColor: "#ffffff", borderRadius: 8}}
                    >
                        <Tabs
                            style={{
                                borderBottom: "1px solid #F0F2F3",
                            }}
                            value={value}
                            indicatorColor="secondary"
                            onChange={handleChange}
                            aria-label="disabled tabs example"
                        >
                            <Tab
                                value="1"
                                style={{
                                    fontSize: 14,
                                    minWidth: "unset",
                                    padding: "0 20px",
                                }}
                                label="All"
                                onClick={() => setOrderStatusFilter(null)}
                            />
                            <Tab
                                value="2"
                                style={{
                                    fontSize: 14,
                                    minWidth: "unset",
                                    padding: "0 20px",
                                }}
                                label={tabLabel("Pending", submittedOrders, value === "2")}
                                onClick={() => setOrderStatusFilter(NEW_ORDER_STATUS_NEW)}
                            />
                            <Tab
                                value="3"
                                style={{
                                    fontSize: 14,
                                    minWidth: "unset",
                                    padding: "0 20px",
                                }}
                                label={tabLabel("Accepted", doingOrders, value === "3")}
                                onClick={() => setOrderStatusFilter(NEW_ORDER_STATUS_ACCEPTED)}
                            />
                            <Tab
                                value="5"
                                style={{
                                    fontSize: 14,
                                    minWidth: "unset",
                                    padding: "0 20px",
                                }}
                                label={tabLabel("Canceled", canceledOrders, value === "5")}
                                onClick={() => setOrderStatusFilter(NEW_ORDER_STATUS_COMP)}
                            />
                        </Tabs>
                        {filteredUserOrders.length ? (
                            <Table
                                aria-labelledby="tableTitle"
                                size="small"
                                aria-label="enhanced table"
                            >
                                <TableHead
                                    style={{
                                        borderBottom: "1px solid #F0F2F3",
                                    }}
                                >
                                    <TableRow>
                                        <TableCell
                                            size="medium"
                                            style={{
                                                textAlign: "right",
                                                color: coal,
                                                fontSize: 14,
                                                fontWeight: 500,
                                            }}
                                        >
                                            Date
                                        </TableCell>
                                        {isSuper ? (
                                            <TableCell
                                                size="medium"
                                                style={{
                                                    textAlign: "right",
                                                    color: coal,
                                                    fontSize: 14,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Branch
                                            </TableCell>
                                        ) : null}
                                        <TableCell
                                            size="medium"
                                            style={{
                                                textAlign: "right",
                                                color: coal,
                                                fontSize: 14,
                                                fontWeight: 500,
                                            }}
                                        >
                                            total
                                        </TableCell>
                                        <TableCell
                                            size="medium"
                                            style={{
                                                textAlign: "right",
                                                color: coal,
                                                fontSize: 14,
                                                fontWeight: 500,
                                            }}
                                        >
                                            the payment
                                        </TableCell>
                                        <TableCell
                                            size="medium"
                                            style={{
                                                textAlign: "right",
                                                color: coal,
                                                fontSize: 14,
                                                fontWeight: 500,
                                            }}
                                        >
                                            The number of items
                                        </TableCell>
                                        <TableCell
                                            size="medium"
                                            style={{
                                                textAlign: "right",
                                                color: coal,
                                                fontSize: 14,
                                                fontWeight: 500,
                                            }}
                                        >
                                            Method of sending
                                        </TableCell>
                                        <TableCell
                                            size="medium"
                                            style={{
                                                textAlign: "right",
                                                color: coal,
                                                fontSize: 14,
                                                fontWeight: 500,
                                            }}
                                        >
                                            Order status
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredUserOrders.map((order) => {
                                        const orderDate = new Date(order.submitted_at);
                                        const orderTime = moment(
                                            `${orderDate.getFullYear()}-${
                                                orderDate.getMonth() + 1
                                            }-${orderDate.getDate()}`,
                                            "YYYY-MM-DD"
                                        );
                                        const isPaidPriceOnLocation =
                                            order.paid_price_details &&
                                            !Object?.values?.(order.paid_price_details).filter(
                                                (item) => Boolean(item) === true
                                            )?.length;

                                        const totalAmount = order.items.reduce(
                                            (sum, orderItem) => sum + orderItem.amount,
                                            0
                                        );
                                        const deliveryTypeVariable =
                                            order.delivery_site_type?.toUpperCase() ===
                                            FULFILLMENT_ON_BUSINESS_SITE
                                                ? "serve"
                                                : order.delivery_site_type?.toUpperCase() ===
                                                FULFILLMENT_CARRY_OUT
                                                    ? "onSpot"
                                                    : order.delivery_site_type?.toUpperCase() ===
                                                    FULFILLMENT_ON_WEBSITE
                                                        ? "onWebSite"
                                                        : "send";
                                        return (
                                            <Link
                                                key={order?.id}
                                                href={`${urlPrefix}/${pluginUrl}/orders/${order.id}/status`}
                                                passHref
                                            >
                                                <TableRow
                                                    style={{
                                                        cursor: "pointer",
                                                        borderBottom: "1px solid #F0F2F3",
                                                    }}
                                                >
                                                    <TableCell
                                                        style={{
                                                            textAlign: "right",
                                                            fontSize: 14,
                                                            fontWeight: 400,
                                                            color: graphite,
                                                            paddingRight: 16,
                                                        }}
                                                        className="py-2"
                                                    >
                                                        {englishNumberToPersianNumber(
                                                            orderTime.format("YYYY/MM/DD")
                                                        )}
                                                    </TableCell>
                                                    {isSuper ? (
                                                        <TableCell
                                                            style={{
                                                                textAlign: "right",
                                                                fontSize: 14,
                                                                fontWeight: 400,
                                                                color: graphite,
                                                                paddingRight: 16,
                                                            }}
                                                            className="py-2"
                                                        >
                                                            {branches.find(
                                                                (branch) => branch.id === order.business_id
                                                            )?.title || "-"}
                                                        </TableCell>
                                                    ) : null}
                                                    <TableCell
                                                        style={{
                                                            textAlign: "right",
                                                            fontSize: 14,
                                                            fontWeight: 400,
                                                            color: graphite,
                                                            paddingRight: 16,
                                                        }}
                                                        className="py-2"
                                                    >
                                                        <span>{priceFormatter(order.total_price)}</span>
                                                        <span>
                              {" "}
                                                            <img alt="" src={$}/>
                            </span>
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            textAlign: "right",
                                                            fontSize: 14,
                                                            fontWeight: 400,
                                                            color: graphite,
                                                            paddingRight: 16,
                                                        }}
                                                        className="py-2 d-flex flex-column"
                                                    >
                                                        {isPaidPriceOnLocation ||
                                                        isPaidPriceOnLocation === null ? (
                                                            <div
                                                                style={{
                                                                    background: "rgba(152, 169, 177, 0.16)",
                                                                    borderRadius: 100,
                                                                    width: "fit-content",
                                                                    padding: "3px 8px",
                                                                }}
                                                                className="d-flex mt-1 align-items-center pdf-no-style"
                                                            >
                                                                <div style={{fontSize: 12, color: smoke}}>
                                                                    in place
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            order.paid_price_details &&
                                                            Object?.entries?.(
                                                                order.paid_price_details
                                                            )?.map?.(([key, value]) => {
                                                                if (!value) return;
                                                                return (
                                                                    <div
                                                                        key={key}
                                                                        style={{
                                                                            background:
                                                                            paidPriceTypes[key]?.backgroundColor,
                                                                            borderRadius: 100,
                                                                            width: "fit-content",
                                                                            padding: "3px 8px",
                                                                        }}
                                                                        className="d-flex mt-1 align-items-center pdf-no-style"
                                                                    >
                                                                        <div style={{fontSize: 12, color: smoke}}>
                                                                            {paidPriceTypes[key]?.label}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        )}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            textAlign: "right",
                                                            fontSize: 14,
                                                            fontWeight: 400,
                                                            color: graphite,
                                                            paddingRight: 37,
                                                        }}
                                                        className="py-2"
                                                    >
                                                        {englishNumberToPersianNumber(totalAmount)}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            textAlign: "right",
                                                            fontSize: 14,
                                                            fontWeight: 400,
                                                            color: graphite,
                                                            paddingRight: 16,
                                                        }}
                                                        className="py-2"
                                                    >
                                                        <div
                                                            style={{
                                                                background:
                                                                    "linear-gradient(0deg, rgba(152, 169, 177, 0.16), rgba(152, 169, 177, 0.16)), #FFFFFF",
                                                                borderRadius: 100,
                                                                width: "fit-content",
                                                                padding: "3px 8px",
                                                            }}
                                                            className="d-flex align-items-center"
                                                        >
                                                            <img
                                                                alt=""
                                                                className="ml-1"
                                                                src={deliveryTypes[deliveryTypeVariable].icon}
                                                            />
                                                            <div style={{fontSize: 12}}>
                                                                {deliveryTypes[deliveryTypeVariable].label}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            textAlign: "right",
                                                            fontSize: 14,
                                                            fontWeight: 400,
                                                            color: graphite,
                                                            paddingRight: 16,
                                                        }}
                                                        className="py-2"
                                                    >
                                                        <div
                                                            style={{
                                                                background:
                                                                orderStatus[order.order_status]
                                                                    ?.backgroundColor,
                                                                borderRadius: 100,
                                                                width: "fit-content",
                                                                padding: "3px 8px",
                                                            }}
                                                            className="d-flex align-items-center"
                                                        >
                                                            <div
                                                                className="ml-1 d-flex justify-content-center align-items-end"
                                                                style={{
                                                                    width: 8,
                                                                    height: 8,
                                                                    borderRadius: "100%",
                                                                    border: `2px solid ${
                                                                        orderStatus[order.order_status]?.iconColor
                                                                    }`,
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        width: "100%",
                                                                        height:
                                                                        orderStatus[order.order_status]
                                                                            ?.iconProgress,
                                                                        backgroundColor:
                                                                        orderStatus[order.order_status]
                                                                            ?.iconColor,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <div style={{fontSize: 12}}>
                                                                {orderStatus[order.order_status]?.label}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            </Link>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        ) : (
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{height: "30vh"}}
                            >
                                {orderStatusFilter === null ? (
                                    <div>
                                        <h1 style={{fontSize: 18, fontWeight: 700}}>
                                            Not registered yet customized.
                                        </h1>
                                    </div>
                                ) : (
                                    <div style={{fontSize: 18, fontWeight: 700}}>
                                        Any order{orderStatus[orderStatusFilter].label}‌O being
                                        is not.
                                    </div>
                                )}
                            </div>
                        )}
                    </TableContainer>
                    <TablePagination
                        labelRowsPerPage={!minWidth768 ? "The number of rows per page" : ""}
                        labelDisplayedRows={({from, to, count}) =>
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
                        count={countOfUserOrders}
                        rowsPerPage={pageSize}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        SelectProps={{
                            renderValue: () => englishNumberToPersianNumber(pageSize),
                            IconComponent: ArrowDropDownRoundedIcon,
                        }}
                        ActionsComponent={({count, page, rowsPerPage, onChangePage}) => (
                            <div className="">
                                <IconButton
                                    onClick={(event) => {
                                        onChangePage(event, page - 1);
                                    }}
                                    disabled={page === 0}
                                    aria-label="previous page"
                                >
                                    <KeyboardArrowRight/>
                                </IconButton>
                                <IconButton
                                    onClick={(event) => {
                                        onChangePage(event, page + 1);
                                    }}
                                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                                    aria-label="next page"
                                >
                                    <KeyboardArrowLeft/>
                                </IconButton>
                            </div>
                        )}
                    />
                </Paper>
            </div>
        </div>
    ) : (
        <div style={{backgroundColor: "#F6F6F7"}}>
            <div className="container" style={{paddingTop: 50, paddingBottom: 50}}>
                <Paper style={{backgroundColor: "#ffffff"}}>
                    <Tabs
                        style={{
                            borderBottom: "1px solid #F0F2F3",
                            paddingRight: 16,
                        }}
                        value={value}
                        indicatorColor="secondary"
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="off"
                        aria-label="disabled tabs example"
                    >
                        <Tab
                            value="1"
                            style={{
                                fontSize: 14,
                                minWidth: "unset",
                                padding: "0 20px",
                            }}
                            label="All"
                            onClick={() => setOrderStatusFilter(null)}
                        />
                        <Tab
                            value="2"
                            style={{
                                fontSize: 14,
                                minWidth: "unset",
                                padding: "0 20px",
                            }}
                            label={tabLabel("Pending", submittedOrders, value === "2")}
                            onClick={() => setOrderStatusFilter(NEW_ORDER_STATUS_NEW)}
                        />
                        <Tab
                            value="3"
                            style={{
                                fontSize: 14,
                                minWidth: "unset",
                                padding: "0 20px",
                            }}
                            label={tabLabel("Accepted", doingOrders, value === "3")}
                            onClick={() => setOrderStatusFilter(NEW_ORDER_STATUS_ACCEPTED)}
                        />
                        <Tab
                            value="5"
                            style={{
                                fontSize: 14,
                                minWidth: "unset",
                                padding: "0 20px",
                            }}
                            label={tabLabel("Canceled", canceledOrders, value === "5")}
                            onClick={() => setOrderStatusFilter(NEW_ORDER_STATUS_COMP)}
                        />
                    </Tabs>
                    {filteredUserOrders.length ? (
                        filteredUserOrders.map((order) => {
                            const orderDate = new Date(order.submitted_at);
                            const orderTime = moment(
                                `${orderDate.getFullYear()}-${
                                    orderDate.getMonth() + 1
                                }-${orderDate.getDate()}`,
                                "YYYY-MM-DD"
                            );

                            const isPaidPriceOnLocation =
                                order.paid_price_details &&
                                !Object?.values?.(order.paid_price_details).filter(
                                    (item) => Boolean(item) === true
                                )?.length;

                            const totalAmount = order.items.reduce(
                                (sum, orderItem) => sum + orderItem.amount,
                                0
                            );
                            const deliveryTypeVariable =
                                order.delivery_site_type?.toUpperCase() ===
                                FULFILLMENT_ON_BUSINESS_SITE
                                    ? "serve"
                                    : order.delivery_site_type?.toUpperCase() ===
                                    FULFILLMENT_CARRY_OUT
                                        ? "onSpot"
                                        : order.delivery_site_type?.toUpperCase() ===
                                        FULFILLMENT_ON_WEBSITE
                                            ? "onWebSite"
                                            : "send";

                            return (
                                <Link
                                    key={order.id}
                                    href={`${urlPrefix}/${pluginUrl}/orders/${order.id}/status`}
                                    passHref
                                >
                                    <div style={{borderBottom: "1px solid #EDEDED"}}>
                                        <div
                                            className="d-flex justify-content-between align-items-center pt-2 pb-1 px-3">
                                            <div style={{fontSize: 13, color: pollution}}>
                                                Date:
                                            </div>
                                            <div
                                                style={{
                                                    textAlign: "right",
                                                    fontSize: 14,
                                                    fontWeight: 400,
                                                    color: graphite,
                                                    paddingRight: 16,
                                                }}
                                            >
                                                {englishNumberToPersianNumber(
                                                    orderTime.format("YYYY/MM/DD")
                                                )}
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center py-1 px-3">
                                            <div style={{fontSize: 13, color: pollution}}>
                                                total:
                                            </div>
                                            <div
                                                style={{
                                                    textAlign: "right",
                                                    fontSize: 14,
                                                    fontWeight: 400,
                                                    color: graphite,
                                                    paddingRight: 16,
                                                }}
                                            >
                                                <span>{priceFormatter(order.total_price)}</span>
                                                <span style={{marginRight: 2}}>
                          {" "}
                                                    <img alt="" src={$}/>
                        </span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center py-1 px-3">
                                            <div style={{fontSize: 13, color: pollution}}>
                                                Payment status:
                                            </div>
                                            {isPaidPriceOnLocation ||
                                            isPaidPriceOnLocation === null ? (
                                                <div
                                                    style={{
                                                        background: "rgba(152, 169, 177, 0.16)",
                                                        borderRadius: 100,
                                                        width: "fit-content",
                                                        padding: "3px 8px",
                                                    }}
                                                    className="d-flex mt-1 align-items-center pdf-no-style"
                                                >
                                                    <div style={{fontSize: 12, color: smoke}}>
                                                        in place
                                                    </div>
                                                </div>
                                            ) : (
                                                order.paid_price_details &&
                                                Object?.entries?.(order.paid_price_details)?.map?.(
                                                    ([key, value]) => {
                                                        if (!value) return;
                                                        return (
                                                            <div
                                                                key={key}
                                                                style={{
                                                                    background:
                                                                    paidPriceTypes[key]?.backgroundColor,
                                                                    borderRadius: 100,
                                                                    width: "fit-content",
                                                                    padding: "3px 8px",
                                                                }}
                                                                className="d-flex mt-1 align-items-center pdf-no-style"
                                                            >
                                                                <div style={{fontSize: 12, color: smoke}}>
                                                                    {paidPriceTypes[key]?.label}
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )
                                            )}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center py-1 px-3">
                                            <div style={{fontSize: 13, color: pollution}}>
                                                The number of items:
                                            </div>
                                            <div
                                                style={{
                                                    textAlign: "right",
                                                    fontSize: 14,
                                                    fontWeight: 400,
                                                    color: graphite,
                                                    paddingRight: 37,
                                                }}
                                            >
                                                {englishNumberToPersianNumber(totalAmount)}
                                            </div>
                                        </div>
                                        <div
                                            className="d-flex justify-content-between align-items-center pt-1 pb-2  px-3">
                                            <div style={{fontSize: 13, color: pollution}}>
                                                Method of sending:
                                            </div>
                                            <div
                                                style={{
                                                    background:
                                                        "linear-gradient(0deg, rgba(152, 169, 177, 0.16), rgba(152, 169, 177, 0.16)), #FFFFFF",
                                                    borderRadius: 100,
                                                    width: "fit-content",
                                                    padding: "3px 8px",
                                                }}
                                                className="d-flex align-items-center"
                                            >
                                                <img
                                                    alt=""
                                                    className="ml-1"
                                                    src={deliveryTypes[deliveryTypeVariable].icon}
                                                />
                                                <div style={{fontSize: 12}}>
                                                    {deliveryTypes[deliveryTypeVariable].label}
                                                </div>
                                            </div>
                                        </div>
                                        <hr
                                            style={{
                                                border: "none",
                                                borderTop: "1px dashed #EDEDED",
                                                height: 1,
                                                width: "100%",
                                                padding: 0,
                                            }}
                                        />
                                        <div className="d-flex justify-content-between align-items-center py-2 px-3">
                                            <div style={{fontSize: 13, color: pollution}}>
                                                Order status:
                                            </div>
                                            <div
                                                style={{
                                                    background:
                                                    orderStatus[order.order_status]?.backgroundColor,
                                                    borderRadius: 100,
                                                    width: "fit-content",
                                                    padding: "3px 8px",
                                                }}
                                                className="d-flex align-items-center"
                                            >
                                                <div
                                                    className="ml-1 d-flex justify-content-center align-items-end"
                                                    style={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: "100%",
                                                        border: `2px solid ${
                                                            orderStatus[order.order_status]?.iconColor
                                                        }`,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            height:
                                                            orderStatus[order.order_status]?.iconProgress,
                                                            backgroundColor:
                                                            orderStatus[order.order_status]?.iconColor,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div style={{fontSize: 12}}>
                                                    {orderStatus[order.order_status]?.label}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div
                            className="d-flex justify-content-center align-items-center p-3"
                            style={{height: "30vh"}}
                        >
                            {orderStatusFilter === null ? (
                                <div>
                                    <h1 style={{fontSize: 18, fontWeight: 700}}>
                                        Not registered yet customized.
                                    </h1>
                                </div>
                            ) : (
                                <div style={{fontSize: 18, fontWeight: 700}}>
                                    Any order{orderStatus[orderStatusFilter].label}‌O being
                                    is not.
                                </div>
                            )}
                        </div>
                    )}
                </Paper>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    userOrders: makeSelectUserOrders(),
    urlPrefix: makeSelectUrlPrefix(),
    pluginsData: makeSelectPlugins(),
    branches: makeSelectBranches(),
    countOfUserOrders: makeSelectCountOfUserOrders(),
});

function mapDispatchToProps(dispatch) {
    return {
        _fetchUserOrders: (page, pageSize, isSuper) =>
            dispatch(getUserOrders(page, pageSize, isSuper)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(Orders);
