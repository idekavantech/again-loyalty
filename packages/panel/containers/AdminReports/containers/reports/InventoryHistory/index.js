/**
 *
 * PURCHASE BY INGREDIETNS REPORTS
 *
 */
import React, {memo, useEffect, useMemo, useRef, useState} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {compose} from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import {persianToEnglishNumber} from "@saas/utils/helpers/persianToEnglishNumber";
import {generateCSVFile} from "@saas/utils/helpers/generateCSVFile";

import {englishNumberToPersianNumber} from "@saas/utils/helpers/englishNumberToPersianNumber";
import jMoment from "moment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import MaterialSelect from "@saas/components/Select/MaterialSelect";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {makeSelectLoading} from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import {useRouter} from "next/router";
import Input from "@saas/components/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import useTheme from "@material-ui/core/styles/useTheme";
import {unitsDictionary} from "store/constants";
import {
    makeSelectBranches,
    makeSelectBusinessSlug,
} from "@saas/stores/business/selector";
import Chip from "@material-ui/core/Chip";
import {makeSelectInventoryHistoryReports} from "store/selectors";
import {getInventoryHistoryReports} from "store/actions";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import CustomCalendar from "@saas/components/CustomCalendar";
import {defaultFromDate, defaultToDate} from "@saas/utils/constants/date";
import {formatDateObjectToNormal} from "../../../../../utils/helpers";



const NEWEST = "NEWEST";
const OLDEST = "OLDEST";
const HIGHEST_PURCHASE_COST = "HIGHEST_PURCHASE_COST";
const HIGHEST_ITEM_AMOUNT = "HIGHEST_ITEM_AMOUNT";

const sortingOptions = [
    {id: 0, text: "the newest", keyword: NEWEST},
    {id: 1, text: "The oldest", keyword: OLDEST},
    {id: 2, text: "The highest amount of purchase", keyword: HIGHEST_PURCHASE_COST},
    {id: 3, text: "The highest amount of item", keyword: HIGHEST_ITEM_AMOUNT},
];

const sortingFunctions = {
    [NEWEST]: (purchases) =>
        purchases?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    [OLDEST]: (purchases) =>
        purchases?.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1)),
    [HIGHEST_PURCHASE_COST]: (purchases) =>
        purchases?.sort((a, b) => (a.price < b.price ? 1 : -1)),
    [HIGHEST_ITEM_AMOUNT]: (purchases) =>
        purchases?.sort((a, b) => (a.amount < b.amount ? 1 : -1)),
};

const reasonType = (reason, amount) => {
    switch (reason) {
        case "stock_received":
            return {
                html: (
                    <>
                        <ArrowUpwardIcon
                            className="ml-3"
                            style={{color: "#00A47C", fontSize: 12}}
                        />
                        <span>{Math.abs(amount).toFixed(3)} received</span>
                    </>
                ),
                label: "received",
                amount,
            };
        case "sales":
            return {
                html: (
                    <>
                        <ArrowDownwardIcon
                            className="ml-3"
                            style={{color: "#D82C0D", fontSize: 12}}
                        />
                        <span>{Math.abs(amount).toFixed(3)} Sold</span>
                    </>
                ),
                label: "Sold",
                amount,
            };
        case "recount":
            return {
                html: (
                    <>
                        <img
                            src={`/images/reCount.svg`}
                            style={{width: "16px", height: "16px"}}
                            className="ml-3"
                            alt=""
                        />
                        <span>{Math.abs(amount).toFixed(3)} Re -count</span>
                    </>
                ),
                label: "Re -count",
                amount,
            };
        case "damage":
            return {
                html: (
                    <>
                        <ArrowDownwardIcon
                            className="ml-3"
                            style={{color: "#D82C0D", fontSize: 12}}
                        />
                        <span>{Math.abs(amount).toFixed(3)} Error</span>
                    </>
                ),
                label: "Error",
                amount,
            };
        case "theft":
            return {
                html: (
                    <>
                        <ArrowDownwardIcon
                            className="ml-3"
                            style={{fontSize: 12, color: "#D82C0D"}}
                        />
                        <span>{Math.abs(amount).toFixed(3)} Theft</span>
                    </>
                ),
                label: "Theft",
                amount,
            };
        case "loss":
            return {
                html: (
                    <>
                        <ArrowDownwardIcon
                            className="ml-3"
                            style={{fontSize: 12, color: "#D82C0D"}}
                        />
                        <span>{Math.abs(amount).toFixed(3)} lost</span>
                    </>
                ),
                label: "lost",
                amount,
            };
        case "return":
            return {
                html: (
                    <>
                        <ArrowUpwardIcon
                            className="ml-3"
                            style={{fontSize: 12, color: "#00A47C"}}
                        />
                        <span>{Math.abs(amount).toFixed(3)} returned</span>
                    </>
                ),
                label: "returned",
                amount,
            };
        case "order_item_not_found":
        case "order_without_payment":
        case "order_fraud":
        case "other_reason":
            return {
                html: (
                    <>
                        <ArrowUpwardIcon
                            className="ml-3"
                            style={{fontSize: 12, color: "#00A47C"}}
                        />
                        <span>{Math.abs(amount).toFixed(3)}Back to the warehouse</span>
                    </>
                ),
                label: "Back to the warehouse",
                amount,
            };
        case "lend":
            return {
                html: (
                    <>
                        <ArrowDownwardIcon
                            className="ml-3"
                            style={{fontSize: 12, color: "#D82C0D"}}
                        />
                        <span>{Math.abs(amount).toFixed(3)} Borrow</span>
                    </>
                ),
                label: "",
                amount,
            };
        case "borrow":
            return {
                html: (
                    <>
                        <ArrowUpwardIcon
                            className="ml-3"
                            style={{fontSize: 12, color: "#00A47C"}}
                        />
                        <span>{Math.abs(amount).toFixed(3)}To borrow</span>
                    </>
                ),
                label: "To borrow",
                amount,
            };
        case "move_in":
            return {
                html: (
                    <>
                        <ArrowDownwardIcon
                            className="ml-3"
                            style={{fontSize: 12, color: "#D82C0D"}}
                        />
                        <span>{Math.abs(amount).toFixed(3)} Transfer to</span>
                    </>
                ),
                label: "Transfer to",
                amount,
            };
        case "move_out":
            return {
                html: (
                    <>
                        <ArrowUpwardIcon
                            className="ml-3"
                            style={{fontSize: 12, color: "#00A47C"}}
                        />
                        <span>{Math.abs(amount).toFixed(3)}Transition</span>
                    </>
                ),
                label: "Transfer from",
                amount,
            };
        default:
            null;
    }
};

const causesType = [
    {
        id: 0,
        title: "Sale",
        type: "sales",
    },
    {
        id: 1,
        title: "Receive",
        type: "stock_received",
    },
    {
        id: 2,
        title: "Re -count",
        type: "recount",
    },
    {
        id: 3,
        title: "Error",
        type: "damage",
    },
    {
        id: 4,
        title: "Theft",
        type: "theft",
    },
    {
        id: 5,
        title: "getting lost",
        type: "loss",
    },
    {
        id: 6,
        title: "returned",
        type: "return",
    },
    {
        id: 7,
        title: "Fake order",
        type: "order_fraud",
    },
    {
        id: 8,
        title: "Order items are not available.",
        type: "order_item_not_found",
    },
    {
        id: 9,
        title: "Failed to pay.",
        type: "order_without_payment",
    },
    {
        id: 10,
        title: "Other reasons",
        type: "other_reason",
    },
    {
        id: 11,
        title: "To borrow",
        type: "lend",
    },
    {
        id: 12,
        title: "Borrowers",
        type: "borrow",
    },
    {
        id: 13,
        title: "Transfer to",
        type: "move_in",
    },
    {
        id: 14,
        title: "Transition",
        type: "move_out",
    },
];

const branchHeadCells = [
    {
        id: "id",
        name: "Row",
        label: "Row",
        align: "center",
        minWidth: 100,
    },
    {
        id: "id",
        name: "She.commodity",
        label: "She.commodity",
        align: "center",
        minWidth: 100,
    },
    {
        id: "id",
        name: "commodity",
        label: "commodity",
        align: "center",
        minWidth: 100,
    },
    {
        id: "id",
        name: "One",
        label: "One",
        align: "center",
        minWidth: 100,
    },
    {
        id: "id",
        name: "the reason",
        label: "the reason",
        align: "center",
        minWidth: 100,
    },
];

let timeoutId = null;

export function AdminPurchaseByIngredientsReport({
                                                     isLoading,
                                                     isSuper,
                                                     businessSlug,
                                                     branches,
                                                     inventoryHistoryReports,
                                                     _getInventoryHistoryReports,
                                                 }) {
    const router = useRouter();
    const theme = useTheme();

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: defaultFromDate,
        to: defaultToDate,
    });
    const [openModal, setOpenModal] = useState(false);
    const [searchedSkus, setSearchedSkus] = useState(
        router?.query?.search ? [...router?.query?.search] : []
    );
    const [selectedBranches, setSelectedBranches] = useState(
        branches.map((branch) => branch.id)
    );

    const [selectedSortingType, selectSortingType] = useState(
        sortingOptions[0].keyword
    );
    const [selectedCauseTypes, setCauseTypes] = useState(
        causesType.map((cause) => cause.type)
    );

    const documentNumberSearchInputRef = useRef(null);
    const documentNumberSearchTimeout = useRef(null);
    const [documentNumberSearch, setDocumentNumberSearch] = useState("");
    const _inventoryHistoryReports = useMemo(
        () =>
            sortingFunctions[selectedSortingType](
                inventoryHistoryReports?.inventoryHistoryReports
            ),
        [
            isSuper,
            selectedSortingType,
            inventoryHistoryReports,
            documentNumberSearch,
        ]
    );

    const handleClose = () => setOpenModal(false);
    const handleOpen = () => setOpenModal(true);
    const id = openModal ? "simple-popover" : undefined;

    const submitDate = () => {
        if (isSuper) {
            if (selectedBranches.length !== 0) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    _getInventoryHistoryReports({
                        business_id: selectedBranches,
                        business_slug: businessSlug,
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
                        reason: selectedCauseTypes,
                        search: [...searchedSkus],
                    });
                }, 500);
            } else {
                clearTimeout(timeoutId);
            }
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                _getInventoryHistoryReports({
                    business_slug: businessSlug,
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
                    reason: selectedCauseTypes,
                    search: [...searchedSkus],
                });
            }, 500);
        }
        handleClose();
    };

    useEffect(() => {
        if (isSuper) {
            if (selectedBranches.length !== 0) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    _getInventoryHistoryReports({
                        business_id: selectedBranches,
                        business_slug: businessSlug,
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
                        reason: selectedCauseTypes,
                        search: [...searchedSkus],
                    });
                }, 500);
            } else {
                clearTimeout(timeoutId);
            }
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                _getInventoryHistoryReports({
                    business_slug: businessSlug,
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
                    reason: selectedCauseTypes,
                    search: [...searchedSkus],
                });
            }, 500);
        }
    }, [isSuper, selectedBranches, selectedCauseTypes, searchedSkus]);
    const headCells = useMemo(() => {
        if (isSuper) {
            const mainBranchHeadCells = [...branchHeadCells];
            mainBranchHeadCells.splice(4, 0, {
                id: "id",
                label: "Branch",
                name: "Branch",
                align: "center",
            });
            return mainBranchHeadCells;
        } else {
            return branchHeadCells;
        }
    }, [isSuper]);

    const headRow = useMemo(
        () => headCells.map((headCell) => headCell.name),
        [headCells]
    );

    const rows = useMemo(
        () =>
            _inventoryHistoryReports?.map((row, index) => {
                const num = index + 1;
                const dealId = row.sku;
                const dealName = row.title;
                const unit = unitsDictionary[row?.unit];
                const branchName = isSuper
                    ? branches.find((branch) => branch.id === row.business_id).title
                    : null;
                const reason = `${reasonType(row.reason_string, row.amount).label}  ${
                    reasonType(row.reason_string, row.amount).amount
                }`;
                if (isSuper) {
                    return [num, dealId, dealName, unit, branchName, reason];
                }
                return [num, dealId, dealName, unit, reason];
            }),
        [isSuper, _inventoryHistoryReports, documentNumberSearch]
    );

    return (
        <div className="container">
            <Head>
                <title>Complete Raw Material Warehouse Report</title>
            </Head>

            <AdminBreadCrumb
                submitButtonText="Output"
                submitAction={() =>
                    generateCSVFile(
                        headRow,
                        rows,
                        [],
                        `Full Raw Material Warehouse Report from${formatDateObjectToNormal(
                            selectedDayRange.from
                        )} until the${formatDateObjectToNormal(selectedDayRange.to)}`
                    )
                }
            />

            <Paper
                elevation={2}
                className="d-flex flex-column mt-4"
                style={{marginBottom: 50}}
            >
                <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
                    <div className="d-flex flex-wrap align-items-center">
                        <div
                            className="d-flex flex-column align-items-center ml-3 mb-3"
                            style={{flex: 1, width: 350}}
                        >
                            <Input
                                size="small"
                                inputRef={documentNumberSearchInputRef}
                                value={documentNumberSearch}
                                fullWidth={false}
                                onChange={(documentNumberSearch) => {
                                    setDocumentNumberSearch(documentNumberSearch);
                                }}
                                onKeyDown={(e) => {
                                    setDocumentNumberSearch(documentNumberSearch);
                                    if (e.key === "Enter") {
                                        setDocumentNumberSearch("");
                                        const _search = [...searchedSkus, e.target.value];
                                        setSearchedSkus(_search);
                                        clearTimeout(documentNumberSearchTimeout.current);
                                        const query = {...router.query};
                                        delete query.search;
                                        if (_search) {
                                            query.search = [...searchedSkus, e.target.value];
                                        }
                                        documentNumberSearchTimeout.current = setTimeout(() => {
                                            router.push({
                                                pathname: router.pathname,
                                                query,
                                            });
                                        }, 500);
                                    }
                                }}
                                placeholder="Search.commodity"
                                inputProps={{
                                    className: "pr-5 mr-2",
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <>
                                            {router.query.search ? (
                                                <InputAdornment
                                                    style={{position: "absolute", left: 3}}
                                                    className="u-cursor-pointer"
                                                    position="start"
                                                    onClick={() => {
                                                        setDocumentNumberSearch("");
                                                        const query = {...router.query};
                                                        delete query.search;
                                                        router.push({
                                                            pathname: router.pathname,
                                                            query,
                                                        });
                                                    }}
                                                >
                                                    <ClearRoundedIcon
                                                        style={{color: theme.palette.text.disabled}}
                                                    />
                                                </InputAdornment>
                                            ) : null}
                                            <InputAdornment
                                                style={{position: "absolute", right: 0}}
                                                className={`u-cursor-pointer u-pointer-events-none`}
                                                position="start"
                                            >
                                                <SearchRoundedIcon
                                                    className="ml-1"
                                                    style={{color: theme.palette.text.disabled}}
                                                    fontSize="small"
                                                />
                                            </InputAdornment>
                                        </>
                                    ),
                                }}
                            />
                            <p>After entering the goods number, click Inter.</p>
                        </div>
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
                                    horizontal: "center ",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                                open={openModal}
                                onClose={handleClose}
                            >
                                <div style={{backgroundColor: "#fff", position: "relative"}}>
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
                                        submitDate={submitDate}
                                        selectedDayRange={selectedDayRange}
                                        setSelectedDayRange={setSelectedDayRange}
                                    />
                                </div>
                            </Popover>
                        </div>
                        {isSuper && (
                            <Select
                                className=" ml-3 mb-3"
                                style={{minWidth: 150, height: 36, flex: 1}}
                                value={selectedBranches}
                                multiple
                                margin="dense"
                                variant="outlined"
                                displayEmpty
                                size="large"
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
                        <Select
                            className=" ml-3 mb-3"
                            style={{minWidth: 150, height: 36, flex: 1}}
                            value={selectedCauseTypes}
                            multiple
                            margin="dense"
                            variant="outlined"
                            displayEmpty
                            size="large"
                            renderValue={() => {
                                if (selectedCauseTypes.length === 0) return "Choose the reason";
                                if (selectedCauseTypes.length === 1 && selectedCauseTypes[0])
                                    return causesType.find(
                                        (cause) => cause.type === selectedCauseTypes[0]
                                    ).title;
                                if (selectedCauseTypes.length === causesType.length)
                                    return "All causes";
                                return `${englishNumberToPersianNumber(
                                    selectedCauseTypes.length
                                )} the reason`;
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
                                        selectedCauseTypes.length !== causesType.length &&
                                        selectedCauseTypes.length
                                    }
                                    onChange={(e) => {
                                        e.preventDefault();
                                    }}
                                    onClick={() => {
                                        if (selectedCauseTypes.length) setCauseTypes([]);
                                        else setCauseTypes(causesType.map((cause) => cause.type));
                                    }}
                                    color="primary"
                                    checked={selectedCauseTypes.length === causesType.length}
                                />
                                <ListItemText
                                    primary="The choice of all the causes"
                                    className="text-right"
                                />
                            </MenuItem>
                            {causesType.map((cause) => {
                                return (
                                    <MenuItem
                                        className="px-2"
                                        key={`${cause.id}-${selectedCauseTypes.includes(cause.id)}`}
                                        value={cause.type}
                                    >
                                        <Checkbox
                                            className="p-1"
                                            size="small"
                                            onChange={(e) => {
                                                e.preventDefault();
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (!selectedCauseTypes.includes(cause.type)) {
                                                    setCauseTypes([...selectedCauseTypes, cause.type]);
                                                } else {
                                                    setCauseTypes(
                                                        selectedCauseTypes.filter(
                                                            (type) => type !== cause.type
                                                        )
                                                    );
                                                }
                                            }}
                                            color="primary"
                                            checked={selectedCauseTypes.includes(cause.type)}
                                        />
                                        <ListItemText
                                            primary={cause.title}
                                            className="text-right"
                                        />
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </div>
                    <MaterialSelect
                        FormControlProps={{
                            style: {
                                width: 80,
                                flexShrink: 0,
                            },
                        }}
                        className="small ml-2 pr-0 direction-ltr mb-3"
                        inputProps={{
                            className: "text-center ml-minus-2",
                        }}
                        IconComponent={() => null}
                        options={sortingOptions}
                        themeColor={process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
                        menuHeader={
                            <div
                                style={{width: 200}}
                                className="px-3 u-fontWeightBold u-fontNormal my-1"
                            >
                                order by
                            </div>
                        }
                        selectOption={(text) =>
                            selectSortingType(
                                sortingOptions.find((i) => i.text === text).keyword
                            )
                        }
                        inputData={{
                            defaultValue: "Ordering",
                        }}
                        selected={sortingOptions.find(
                            (i) => i.keyword === selectedSortingType
                        )}
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
                </div>
                <div className="d-flex align-items-center flex-wrap px-4">
                    {!searchedSkus?.length ? (
                        <Chip
                            deleteIcon={
                                <ClearRoundedIcon
                                    style={{color: theme.palette.text.disabled}}
                                />
                            }
                            style={{
                                borderRadius: 4,
                                background: theme.palette.background.secondary,
                                maxWidth: "fit-content",
                            }}
                            className="ml-2 mb-2"
                            onDelete={() => setSearchedSkus([])}
                            label="All goods"
                        />
                    ) : (
                        searchedSkus?.map((sku, index) => {
                            return (
                                <Chip
                                    key={index}
                                    deleteIcon={
                                        <ClearRoundedIcon
                                            style={{color: theme.palette.text.disabled}}
                                        />
                                    }
                                    style={{
                                        borderRadius: 4,
                                        background: theme.palette.background.secondary,
                                        maxWidth: "fit-content",
                                    }}
                                    className="ml-2 mb-2"
                                    onDelete={() => {
                                        const _searchedSkus = searchedSkus.filter(
                                            (_sku) => sku !== _sku
                                        );
                                        setSearchedSkus([..._searchedSkus]);
                                        const query = {...router.query};
                                        delete query.search;
                                        query.search = [..._searchedSkus];
                                        documentNumberSearchTimeout.current = setTimeout(() => {
                                            router.push({
                                                pathname: router.pathname,
                                                query,
                                            });
                                        }, 500);
                                    }}
                                    label={`Product by number${englishNumberToPersianNumber(sku)}`}
                                />
                            );
                        })
                    )}
                </div>
                <div className="d-flex align-items-center flex-wrap px-4">
                    {selectedBranches?.length === branches?.length ? (
                        <Chip
                            deleteIcon={
                                <ClearRoundedIcon
                                    style={{color: theme.palette.text.disabled}}
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
                                                style={{color: theme.palette.text.disabled}}
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
                                    style={{color: theme.palette.text.disabled}}
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
                <div className="d-flex align-items-center flex-wrap px-4">
                    {selectedCauseTypes?.length === causesType?.length ? (
                        <Chip
                            deleteIcon={
                                <ClearRoundedIcon
                                    style={{color: theme.palette.text.disabled}}
                                />
                            }
                            style={{
                                borderRadius: 4,
                                background: theme.palette.background.secondary,
                                maxWidth: "fit-content",
                            }}
                            className="ml-2 mb-2"
                            onDelete={() => setCauseTypes([])}
                            label="All causes"
                        />
                    ) : selectedCauseTypes?.length ? (
                        causesType
                            ?.filter((item) => selectedCauseTypes.includes(item.id))
                            .map((cause, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        deleteIcon={
                                            <ClearRoundedIcon
                                                style={{color: theme.palette.text.disabled}}
                                            />
                                        }
                                        style={{
                                            borderRadius: 4,
                                            background: theme.palette.background.secondary,
                                            maxWidth: "fit-content",
                                        }}
                                        className="ml-2 mb-2"
                                        onDelete={() =>
                                            setCauseTypes(
                                                selectedCauseTypes.filter((item) => item !== cause.id)
                                            )
                                        }
                                        label={cause.title}
                                    />
                                );
                            })
                    ) : (
                        <Chip
                            deleteIcon={
                                <ClearRoundedIcon
                                    style={{color: theme.palette.text.disabled}}
                                />
                            }
                            style={{
                                borderRadius: 4,
                                background: theme.palette.background.secondary,
                                maxWidth: "fit-content",
                            }}
                            className="ml-2 mb-2"
                            onDelete={() =>
                                setCauseTypes(causesType?.map(() => ingredient.id))
                            }
                            label="None of the reasons"
                        />
                    )}
                </div>
                {(isSuper && selectedBranches.length) || !isSuper ? (
                    <TableContainer
                        className="mt-3 w-100 purchase-by-order-table"
                        style={{maxHeight: 500}}
                    >
                        <Table
                            aria-labelledby="tableTitle"
                            size="small"
                            aria-label="sticky table"
                            className="w-100"
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
                                    {headCells.map((headCell, index) => (
                                        <TableCell
                                            key={index}
                                            padding={headCell.padding || "unset"}
                                            width={headCell.width || ""}
                                            className="text-nowrap u-fontWeightBold"
                                            align={headCell.align}
                                            style={{minWidth: headCell.minWidth}}
                                        >
                                            {headCell.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            {isLoading ? (
                                <TableBody>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                                        <TableRow key={index} style={{height: 53}}>
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
                                    {_inventoryHistoryReports?.map((row, index) => {
                                        const businessTitle = isSuper
                                            ? branches.find((branch) => branch.id === row.business_id)
                                                .title
                                            : null;

                                        return (
                                            <TableRow key={row.id}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">
                                                    {englishNumberToPersianNumber(row.sku)}
                                                </TableCell>
                                                <TableCell align="center">{row.title}</TableCell>
                                                <TableCell align="center">
                                                    {unitsDictionary[row?.unit]}
                                                </TableCell>
                                                {isSuper && (
                                                    <TableCell align="center">{businessTitle}</TableCell>
                                                )}
                                                <TableCell align="center">
                                                    {reasonType(row.reason_string, row.amount).html}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow
                                        style={{
                                            backgroundColor: "#F1F2F3",
                                            height: 85,
                                            position: "sticky",
                                            bottom: 0,
                                        }}
                                    ></TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                ) : (
                    <div>There is no data.</div>
                )}
            </Paper>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    isLoading: makeSelectLoading(),
    businessSlug: makeSelectBusinessSlug(),
    branches: makeSelectBranches(),
    inventoryHistoryReports: makeSelectInventoryHistoryReports(),
});

function mapDispatchToProps(dispatch) {
    return {
        _getInventoryHistoryReports: (data) =>
            dispatch(getInventoryHistoryReports(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminPurchaseByIngredientsReport);
