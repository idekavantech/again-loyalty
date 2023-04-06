/**
 *
 * Settings
 *
 */

import React, {memo, useEffect, useMemo, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import {connect} from "react-redux";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";
import {
    SHOPPING_PLUGIN,
    SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import {
    makeSelectAdminUrlPrefix,
    makeSelectDeliveryType,
    makeSelectPlugin,
    makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import {coal, graphite, night, pollution, smoke} from "@saas/utils/colors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import {persianToEnglishNumber} from "@saas/utils/helpers/persianToEnglishNumber";
import {generateTimeRange} from "@saas/utils/helpers/generateTimeRange";
import {englishNumberToPersianNumber} from "@saas/utils/helpers/englishNumberToPersianNumber";

import {getWeekDays} from "@saas/utils/constants/date";
import {getWeekDay} from "@saas/utils/helpers/getWeekDay";

import IconButton from "@material-ui/core/IconButton";
import CustomizedSelect from "@saas/components/CustomizedSelect";
import Input from "@saas/components/Input";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Button from "@material-ui/core/Button";
import {useRouter} from "next/router";
import {
    createDeliveryType,
    deleteDeliveryType,
    getDeliveryType,
    updateDeliveryType,
} from "@saas/stores/plugins/actions";
import {
    addressDetailsRequirementsFieldsLabels,
    defaultAddressDetailsRequirements,
    DELIVERY_TYPE_CUSTOM,
    DELIVERY_TYPE_FAST,
    DELIVERY_TYPE_SCHEDULED,
    PRE_ORDER_ACTIVE,
    PRE_ORDER_DELAYED,
    PRE_ORDER_INACTIVE,
    PRE_ORDER_NORMAL,
} from "@saas/plugins/Shopping/constants";
import {
    makeSelectBranches,
    makeSelectBusinessId,
} from "@saas/stores/business/selector";
import {makeSelectLoading} from "@saas/stores/global/selectors";
import useTheme from "@material-ui/core/styles/useTheme";
import {setSnackBarMessage} from "@saas/stores/ui/actions";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import Icon from "@saas/components/Icon";
import {$} from "@saas/icons";
import {useResponsive} from "@saas/utils/hooks/useResponsive";


const SelectComponentOptions = [
    {
        name: DELIVERY_TYPE_CUSTOM,
        Icon: `/images/manual.svg`,
        title: "Manual",
        description:
            "This method is mostly used to create a simple submission with a fixed preparation time.",
    },
    {
        name: DELIVERY_TYPE_SCHEDULED,
        Icon: `/images/automatic.svg`,
        title: "Scheduled",
        description:
            "This method allows the customer to select a range from the specified intervals..",
    },
    {
        name: DELIVERY_TYPE_FAST,
        Icon: `/images/fastDelivery.svg`,
        title: "Fast",
        description:
            "This method is usually used to send orders in less than two days.",
    },
];

const SelectComponentOptionsFastDelivery = [
    {
        name: PRE_ORDER_NORMAL,
        Icon: `/images/normalPreorder.svg`,
        title: "No time(Approximate)",
        description: `Outside the working hours, the customer can register his order and the business will send the order as soon as the business hours arrive.
     `,
    },
    {
        name: PRE_ORDER_DELAYED,
        Icon: `/images/automatic.svg`,
        title: "Scheduled",
        description: `Out -of -working customer can register their order and select the delivery time of their order.
     `,
    },
];

const defaultDeliveryTimes = [
    {
        name: "Saturday",
        id: 6,
        shifts: [{from: "08:30", to: "12:00"}],
        isOpen: 1,
    },
    {
        name: "Sunday",
        id: "7",
        shifts: [
            {from: "09:00", to: "12:00"},
            {from: "18:30", to: "22:00"},
        ],
        isOpen: 2,
    },
    {
        name: "Monday",
        id: "1",
        shifts: [{from: "09:00", to: "12:00"}],
        isOpen: 1,
    },
    {
        name: "Tuesday",
        id: 2,
        shifts: [{from: "09:00", to: "12:00"}],
        isOpen: 1,
    },
    {
        name: "Wednesday",
        id: 3,
        shifts: [{from: "09:00", to: "12:00"}],
        isOpen: 1,
    },
    {
        name: "Thursday",
        id: 4,
        shifts: [
            {from: "09:00", to: "23:30"},
            {from: "09:00", to: "18:00"},
        ],
        isOpen: 2,
    },
    {
        name: "Friday",
        id: 5,
        shifts: [{from: "13:00", to: "23:30"}],
        isOpen: 1,
    },
];

const defaultEditedDeliveryTimes = {
    1: [
        {
            to: "12:00",
            from: "09:00",
        },
    ],
    2: [
        {
            to: "12:00",
            from: "09:00",
        },
    ],
    3: [
        {
            to: "12:00",
            from: "09:00",
        },
    ],
    4: [
        {
            to: "23:30",
            from: "09:00",
        },
        {
            to: "18:00",
            from: "09:00",
        },
    ],
    5: [
        {
            to: "23:30",
            from: "13:00",
        },
    ],
    6: [
        {
            to: "10:00",
            from: "05:00",
        },
        {
            to: "21:00",
            from: "18:30",
        },
    ],
    7: [
        {
            to: "12:00",
            from: "09:00",
        },
        {
            to: "22:00",
            from: "18:30",
        },
    ],
};

const times = generateTimeRange(30);

function AdminDeliveryTypeSettings({
                                       shoppingPluginData,
                                       _getDeliveryType,
                                       _deliveryType,
                                       _updateDeliveryType,
                                       _deleteDeliveryType,
                                       _createDeliveryType,
                                       businessId,
                                       loading,
                                       branches,
                                       isSuper,
                                       _setSnackBarMessage,
                                       urlPrefix,
                                   }) {
    const theme = useTheme();
    const [selectedBranch, setSelectedBranch] = useState(
        isSuper ? branches?.[0]?.slug : null
    );
    const pluginData = isSuper
        ? {
            ...branches.find((branch) => branch.slug === selectedBranch)
                ?.plugins_config[SHOPPING_PLUGIN],
            ui_access_config: branches.find(
                (branch) => branch.slug === selectedBranch
            )?.ui_access_config?.admin_panel?.plugins?.[SHOPPING_PLUGIN],
        }
        : shoppingPluginData;

    const accessedDeliveryTypeOptions = pluginData?.ui_access_config
        ?.delivery_type_options || [
        DELIVERY_TYPE_FAST,
        DELIVERY_TYPE_CUSTOM,
        DELIVERY_TYPE_SCHEDULED,
    ];
    const {minWidth768, minWidth992} = useResponsive();
    const router = useRouter();
    const deliveryTypeId = router.query.id === "new" ? null : router.query.id;
    const [isDialogBoxOpen, setDialogBoxOpen] = useState(false);

    const [scheduledDeliveryTimes, setScheduledDeliveryTimes] =
        useState(defaultDeliveryTimes);
    const [editedScheduledDeliveryTimes, setEditedScheduledDeliveryTimes] =
        useState(defaultEditedDeliveryTimes);
    const handleShiftChange = (value, weekDayIndex, shiftIndex, property) => {
        const arrayOfObjects = [...scheduledDeliveryTimes];
        arrayOfObjects[weekDayIndex].shifts[shiftIndex][property] = value;
        setScheduledDeliveryTimes(arrayOfObjects);
        setTimeout(() => {
            changeTheState();
        }, 0);
    };

    const addNewShiftToWeekDay = (weekDayIndex) => {
        const arrayOfObjects = [...scheduledDeliveryTimes];
        arrayOfObjects[weekDayIndex].shifts.push({
            from: times[10].value,
            to: times[20].value,
        });
        setScheduledDeliveryTimes(arrayOfObjects);
        setTimeout(() => {
            changeTheState();
        }, 0);
    };

    const deleteShiftFromWeekDay = (weekDayIndex, shiftIndex) => {
        const arrayOfObjects = [...scheduledDeliveryTimes];
        arrayOfObjects[weekDayIndex].shifts.splice(shiftIndex, 1);
        setScheduledDeliveryTimes(arrayOfObjects);
        setTimeout(() => {
            changeTheState();
        }, 0);
    };

    const toggleSelectedDayHasDelivery = (value, weekDayIndex) => {
        const arrayOfObjects = [...scheduledDeliveryTimes];
        arrayOfObjects[weekDayIndex].isOpen = value;
        setScheduledDeliveryTimes(arrayOfObjects);
        setTimeout(() => {
            changeTheState();
        }, 0);
    };

    const changeTheState = () => {
        const newScheduledDeliveryTimeObj = {};
        scheduledDeliveryTimes.forEach((weekDay) => {
            newScheduledDeliveryTimeObj[weekDay.id] = weekDay.isOpen
                ? weekDay.shifts.map((shift) => ({
                    from: `${shift.from}`,
                    to: `${shift.to}`,
                }))
                : [];
        });
        setEditedScheduledDeliveryTimes(newScheduledDeliveryTimeObj);
    };

    useEffect(() => {
        if (scheduledDeliveryTimes) {
            const newScheduledDeliveryTimeObj = {};
            scheduledDeliveryTimes.forEach((weekDay) => {
                newScheduledDeliveryTimeObj[weekDay.id] = weekDay.isOpen
                    ? weekDay.shifts.map((shift) => ({
                        from: `${shift.from}`,
                        to: `${shift.to}`,
                    }))
                    : [];
            });
            setEditedScheduledDeliveryTimes(newScheduledDeliveryTimeObj);
        }
    }, [scheduledDeliveryTimes]);

    const [hasError, setHasError] = useState({
        deliveryTitleError: false,
        scheduledDelvieryTimesError: false,
        scheduledDeliveryFromTimeError: false,
    });

    const hasMinimumOneOpenDay = useMemo(() => {
        const isOpenDays = [];
        if (scheduledDeliveryTimes) {
            scheduledDeliveryTimes.forEach((deliveryTime) => {
                if (deliveryTime.isOpen) {
                    isOpenDays.push(deliveryTime);
                }
            });
        }
        return Boolean(isOpenDays.length);
    }, [scheduledDeliveryTimes]);

    const [delivery, setDelivery] = useState({
        title: "",
        description: "",
        timing: {
            type: accessedDeliveryTypeOptions[0],
            pre_order: {type: PRE_ORDER_NORMAL, status: PRE_ORDER_ACTIVE},
            notification_time: {
                type: "hour",
                value: 8,
            },
            packaging_price: 3000,
            maximum_delivery_time: {type: "minute", value: 40},
            address_detail_requirements: defaultAddressDetailsRequirements,
            delivery_interval: {
                from: 2,
                to: 5,
                type: "hour",
            },
            no_next_delivery_days: 4,
            delivery_times: [],
        },
    });

    useEffect(() => {
        if (localStorage.getItem("adminDeliverySelectedBranch") && isSuper)
            setSelectedBranch(localStorage.getItem("adminDeliverySelectedBranch"));
        if (deliveryTypeId) {
            setTimeout(() => {
                _getDeliveryType(SHOPPING_PLUGIN, deliveryTypeId);
            }, 0);
        }
    }, []);

    useEffect(() => {
        if (_deliveryType && deliveryTypeId !== null) {
            if (_deliveryType.timing.type === DELIVERY_TYPE_SCHEDULED) {
                const newObj = JSON.parse(JSON.stringify(_deliveryType));
                setScheduledDeliveryTimes(
                    getWeekDays.map((weekDay) => ({
                        name: getWeekDay(weekDay),
                        id: weekDay,
                        shifts: newObj.timing.delivery_times[weekDay].length
                            ? newObj.timing.delivery_times[weekDay].map((shift) => ({
                                from: shift.from.substring(0, 5),
                                to: shift.to.substring(0, 5),
                            }))
                            : [{from: times[10].value, to: times[20].value}],
                        isOpen: newObj.timing.delivery_times[weekDay].length,
                    }))
                );
                delete newObj.timing.delivery_times;
                setDelivery(newObj);
            } else {
                setDelivery(_deliveryType);
            }
        }
    }, [_deliveryType]);

    const editDeliveryTypeSubmit = () => {
        setHasError({
            deliveryTitleError: delivery.title === "",
            scheduledDelvieryTimesError: !hasMinimumOneOpenDay,
            scheduledDeliveryFromTimeError:
                delivery?.timing.maximum_delivery_time?.value === 0,
        });
        if (
            delivery.title !== "" &&
            hasMinimumOneOpenDay &&
            delivery?.timing.maximum_delivery_time?.value !== 0
        ) {
            if (delivery.timing.type === DELIVERY_TYPE_SCHEDULED) {
                const newObj = JSON.parse(JSON.stringify(delivery));
                newObj.timing.delivery_times = editedScheduledDeliveryTimes;
                _updateDeliveryType(newObj);
            } else {
                _updateDeliveryType(delivery);
            }
        } else if (delivery.title === "" && hasMinimumOneOpenDay) {
            _setSnackBarMessage(
                "You need to specify the title for your submission method.",
                "fail"
            );
        } else if (delivery.title !== "" && !hasMinimumOneOpenDay) {
            _setSnackBarMessage(
                "You need to choose at least one of the days of the week.",
                "fail"
            );
        } else {
            _setSnackBarMessage("You need to fix existing errors.", "fail");
        }
    };
    const addDeliveryTypeSubmit = () => {
        const newObj = JSON.parse(JSON.stringify(delivery));
        newObj.business =
            branches?.find((branch) => branch.slug === selectedBranch)?.id ||
            businessId;
        setHasError({
            deliveryTitleError: delivery.title === "",
            scheduledDelvieryTimesError: !hasMinimumOneOpenDay,
            scheduledDeliveryFromTimeError:
                delivery?.timing.maximum_delivery_time.value === 0,
        });
        if (
            delivery.title !== "" &&
            hasMinimumOneOpenDay &&
            delivery?.timing.maximum_delivery_time.value !== 0
        ) {
            if (delivery.timing.type === DELIVERY_TYPE_SCHEDULED) {
                newObj.timing.delivery_times = editedScheduledDeliveryTimes;
                _createDeliveryType(newObj);
            } else if (delivery.timing.type === DELIVERY_TYPE_FAST) {
                delete newObj.timing.delivery_times;
                _createDeliveryType(newObj);
            } else {
                _createDeliveryType(newObj);
            }
        } else if (delivery.title === "" && hasMinimumOneOpenDay) {
            _setSnackBarMessage(
                "You need to specify the title for your submission method.",
                "fail"
            );
        } else if (delivery.title !== "" && !hasMinimumOneOpenDay) {
            _setSnackBarMessage(
                "You need to choose at least one of the days of the week.",
                "fail"
            );
        } else {
            _setSnackBarMessage("You need to fix existing errors.", "fail");
        }
    };

    const filteredDeliveryTypeOptions = SelectComponentOptions.filter((option) =>
        accessedDeliveryTypeOptions.includes(option.name)
    );
    const selectedDeliveryTypeOptions = filteredDeliveryTypeOptions.find(
        (option) => option.name === delivery.timing.type
    );
    const selectedBranchTitle =
        branches?.find((branch) => branch.slug === selectedBranch)?.title || "";
    let headerTitle = deliveryTypeId ? "Edit the Method of Send" : "Making a new submission method";
    if (selectedBranchTitle) headerTitle += ` (${selectedBranchTitle})`;
    return (
        <>
            {loading ? (
                <LoadingIndicator/>
            ) : (
                <>
                    <div className="container mb-3 mb-md-0">
                        <Head>
                            <title>{headerTitle}</title>
                        </Head>
                        <AdminBreadCrumb
                            submitButtonText={
                                deliveryTypeId ? "Save changes" : "Construction of sending method"
                            }
                            submitAction={
                                deliveryTypeId !== null
                                    ? editDeliveryTypeSubmit
                                    : addDeliveryTypeSubmit
                            }
                            deleteButtonText={deliveryTypeId ? "Remove the submission method" : null}
                            deleteButtonAction={() => setDialogBoxOpen(true)}
                            isLoading={loading}
                        />
                        <Paper elevation={1} className="mt-4">
                            {filteredDeliveryTypeOptions.length > 1 ? (
                                <>
                                    <div className="py-3 px-4">
                                        <div
                                            className="u-fontMedium u-fontWeightBold mb-2"
                                            style={{color: coal}}
                                        >
                                            Post Type
                                        </div>
                                        <CustomizedSelect
                                            key={delivery.timing.type}
                                            options={filteredDeliveryTypeOptions}
                                            value={selectedDeliveryTypeOptions}
                                            onChangeMethod={(option) => {
                                                if (option.name === DELIVERY_TYPE_SCHEDULED) {
                                                    const newObj = JSON.parse(JSON.stringify(delivery));
                                                    newObj.timing.type = option.name;
                                                    newObj.timing.delivery_times = defaultDeliveryTimes;
                                                    setDelivery(newObj);
                                                } else {
                                                    const newObj = JSON.parse(JSON.stringify(delivery));
                                                    delete newObj.timing.delivery_times;
                                                    newObj.timing.type = option.name;
                                                    setDelivery(newObj);
                                                }
                                            }}
                                        />
                                    </div>
                                    <Divider/>
                                </>
                            ) : null}
                            <div className="py-3 px-4">
                                <div
                                    className="u-fontMedium u-fontWeightBold mb-2"
                                    style={{color: coal}}
                                >
                                    Title and description
                                </div>
                                <Input
                                    inputProps={{maxLength: 50}}
                                    label="The title of the method of submission"
                                    value={delivery && delivery.title}
                                    onChange={(value) => {
                                        const newObj = JSON.parse(JSON.stringify(delivery));
                                        newObj.title = value;
                                        setDelivery(newObj);
                                        setHasError({
                                            ...hasError,
                                            deliveryTitleError: false,
                                        });
                                    }}
                                    className="w-100"
                                    size="medium"
                                />
                                {hasError.deliveryTitleError && (
                                    <div
                                        style={{color: theme.palette.error.main}}
                                        className="u-font-semi-small mt-1"
                                    >
                                        This field cannot be empty.
                                    </div>
                                )}
                                <Input
                                    inputProps={{maxLength: 50}}
                                    label="Description(Optional)"
                                    value={delivery?.description || ""}
                                    onChange={(value) => {
                                        const newObj = JSON.parse(JSON.stringify(delivery));
                                        newObj.description = value;
                                        setDelivery(newObj);
                                    }}
                                    className="w-100 mt-4"
                                    size="medium"
                                />
                                <div
                                    className="u-font-semi-small mt-1"
                                    style={{color: pollution}}
                                >
                                    {`These descriptions when selecting the Method of Send and Under"The title of the method of submission" To
                  Users will be displayed.`}
                                </div>
                            </div>
                            <Divider/>
                            {delivery && delivery.timing.type === DELIVERY_TYPE_CUSTOM && (
                                <div className="py-3 px-4">
                                    <div
                                        className="u-fontMedium u-fontWeightBold"
                                        style={{color: coal}}
                                    >
                                        Select the time of submission
                                    </div>
                                    <div
                                        className="u-font-semi-small mt-1"
                                        style={{color: pollution}}
                                    >
                                        This time when selecting the method of sending and proposition to users
                                        is shown.
                                    </div>
                                    <div className="d-flex flex-wrap align-items-start mt-3">
                    <span
                        style={{color: smoke}}
                        className="u-fontMedium ml-1 mb-1 mt-2"
                    >
                      From
                    </span>
                                        <span className="ml-1 mb-1">
                      <Input
                          numberOnly
                          value={
                              delivery.timing.delivery_interval
                                  ? englishNumberToPersianNumber(
                                      delivery.timing.delivery_interval.from
                                  )
                                  : englishNumberToPersianNumber(3)
                          }
                          onChange={(value) => {
                              const newObj = JSON.parse(JSON.stringify(delivery));
                              newObj.timing.delivery_interval.from = Number(
                                  persianToEnglishNumber(value)
                              );
                              setDelivery(newObj);
                          }}
                          size="medium"
                      />
                    </span>
                                        <span
                                            style={{color: smoke}}
                                            className="u-fontMedium ml-1 mb-1 mt-2"
                                        >
                      until the
                    </span>
                                        <span className="ml-1 mb-1">
                      <Input
                          numberOnly
                          value={
                              delivery.timing.delivery_interval
                                  ? englishNumberToPersianNumber(
                                      delivery.timing.delivery_interval.to
                                  )
                                  : englishNumberToPersianNumber(5)
                          }
                          onChange={(value) => {
                              const newObj = JSON.parse(JSON.stringify(delivery));
                              newObj.timing.delivery_interval.to = Number(
                                  persianToEnglishNumber(value)
                              );
                              setDelivery(newObj);
                          }}
                          size="medium"
                      />
                    </span>
                                        <FormControl
                                            variant="outlined"
                                            style={{minWidth: 100}}
                                            className="ml-1 mb-1"
                                        >
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={
                                                    delivery.timing?.delivery_interval?.type || "hour"
                                                }
                                                onChange={(event) => {
                                                    const newObj = JSON.parse(JSON.stringify(delivery));
                                                    newObj.timing.delivery_interval.type =
                                                        event.target.value;
                                                    setDelivery(newObj);
                                                }}
                                                className="medium"
                                            >
                                                <MenuItem value="hour">the watch</MenuItem>
                                                <MenuItem value="day">Day</MenuItem>
                                                <MenuItem value="week">Week</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            )}
                            {delivery && delivery.timing.type === DELIVERY_TYPE_SCHEDULED && (
                                <>
                                    <div className="py-3 px-4">
                                        <div
                                            className="u-fontMedium u-fontWeightBold"
                                            style={{color: coal}}
                                        >
                                            Select the delivery time
                                        </div>
                                        <div
                                            className="u-font-semi-small mt-1"
                                            style={{color: pollution}}
                                        >
                                            Specify the selected intervals by your customers. This
                                            The intervals are determined when the customer tends to order
                                            Receive self.
                                        </div>
                                        {hasError.scheduledDelvieryTimesError ? (
                                            <div
                                                style={{color: theme.palette.error.main}}
                                                className="u-font-semi-small mt-1"
                                            >
                                                At least one of the days of the week must be selected.
                                            </div>
                                        ) : null}
                                        {scheduledDeliveryTimes &&
                                            scheduledDeliveryTimes.map((weekDay, idx) =>
                                                weekDay.isOpen ? (
                                                    <div
                                                        key={`day-${weekDay.name}`}
                                                        className="d-flex flex-row align-items-center mt-3"
                                                    >
                                                        <div className="d-flex flex-column">
                                                            {weekDay.shifts.map((shift, index) => (
                                                                <div
                                                                    key={`shift-${index}`}
                                                                    className="mt-3 d-flex align-items-center"
                                                                    style={{minHeight: 55.87, marginRight: -10}}
                                                                >
                                                                    {index === 0 ? (
                                                                        <>
                                                                            <Checkbox
                                                                                color="primary"
                                                                                inputProps={{
                                                                                    "aria-label": "secondary checkbox",
                                                                                }}
                                                                                checked={weekDay.isOpen}
                                                                                onChange={(event) => {
                                                                                    toggleSelectedDayHasDelivery(
                                                                                        event.target.checked,
                                                                                        idx
                                                                                    );
                                                                                    setHasError({
                                                                                        ...hasError,
                                                                                        scheduledDelvieryTimesError: false,
                                                                                    });
                                                                                }}
                                                                            />
                                                                            <div
                                                                                className="ml-1 ml-sm-2 d-inline-block"
                                                                                style={{width: 50}}
                                                                            >
                                                                                {weekDay.name}
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Checkbox
                                                                                color="primary"
                                                                                inputProps={{
                                                                                    "aria-label": "secondary checkbox",
                                                                                }}
                                                                                style={{visibility: "hidden"}}
                                                                            />
                                                                            <div
                                                                                className="ml-1 ml-sm-2 d-inline-block"
                                                                                style={{
                                                                                    width: 50,
                                                                                    visibility: "hidden",
                                                                                }}
                                                                            >
                                                                                {weekDay.name}
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                    {weekDay.isOpen ? (
                                                                        <>
                                                                            <FormControl
                                                                                variant="outlined"
                                                                                style={{
                                                                                    minWidth: minWidth992 ? 150 : 75,
                                                                                    marginLeft: minWidth992 ? 15 : 5,
                                                                                }}
                                                                            >
                                                                                <Select
                                                                                    value={shift.from}
                                                                                    onChange={(e) =>
                                                                                        handleShiftChange(
                                                                                            e.target.value,
                                                                                            idx,
                                                                                            index,
                                                                                            "from"
                                                                                        )
                                                                                    }
                                                                                    className="medium"
                                                                                    inputProps={{
                                                                                        "aria-label": "Without label",
                                                                                    }}
                                                                                >
                                                                                    {times.map((time) => (
                                                                                        <MenuItem
                                                                                            key={`menu-${time.label}`}
                                                                                            value={time.value}
                                                                                        >
                                                                                            From{time.label}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                            <FormControl
                                                                                variant="outlined"
                                                                                style={{
                                                                                    minWidth: minWidth992 ? 150 : 75,
                                                                                    marginLeft: minWidth992 ? 15 : 5,
                                                                                }}
                                                                            >
                                                                                <Select
                                                                                    value={shift.to}
                                                                                    onChange={(e) =>
                                                                                        handleShiftChange(
                                                                                            e.target.value,
                                                                                            idx,
                                                                                            index,
                                                                                            "to"
                                                                                        )
                                                                                    }
                                                                                    displayEmpty
                                                                                    className="medium"
                                                                                    inputProps={{
                                                                                        "aria-label": "Without label",
                                                                                    }}
                                                                                >
                                                                                    {times.map((time) => (
                                                                                        <MenuItem
                                                                                            key={`menu-${time.label}`}
                                                                                            value={time.value}
                                                                                        >
                                                                                            until the{time.label}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </Select>
                                                                            </FormControl>
                                                                            {index === 0 ? (
                                                                                <IconButton
                                                                                    onClick={() =>
                                                                                        addNewShiftToWeekDay(idx)
                                                                                    }
                                                                                >
                                                                                    <AddCircleOutlineIcon
                                                                                        color="primary"
                                                                                        style={{cursor: "pointer"}}
                                                                                    />
                                                                                </IconButton>
                                                                            ) : (
                                                                                <IconButton
                                                                                    onClick={() =>
                                                                                        deleteShiftFromWeekDay(idx, index)
                                                                                    }
                                                                                >
                                                                                    <DeleteRoundedIcon
                                                                                        color="primary"
                                                                                        style={{cursor: "pointer"}}
                                                                                    />
                                                                                </IconButton>
                                                                            )}
                                                                        </>
                                                                    ) : null}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex flex-row align-items-center mt-3">
                                                        <div className="d-flex flex-column">
                                                            <div
                                                                className="mt-3 d-flex align-items-center"
                                                                style={{minHeight: 55.87, marginRight: -10}}
                                                            >
                                                                <Checkbox
                                                                    color="primary"
                                                                    inputProps={{
                                                                        "aria-label": "secondary checkbox",
                                                                    }}
                                                                    checked={weekDay.isOpen}
                                                                    onChange={(event) => {
                                                                        toggleSelectedDayHasDelivery(
                                                                            event.target.checked,
                                                                            idx
                                                                        );
                                                                        setHasError({
                                                                            ...hasError,
                                                                            scheduledDelvieryTimesError: false,
                                                                        });
                                                                    }}
                                                                />
                                                                <div
                                                                    className="ml-1 ml-sm-2 d-inline-block"
                                                                    style={{width: 50}}
                                                                >
                                                                    {weekDay.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                    <Divider/>
                                    <div className="py-3 px-4">
                                        <div
                                            className="u-fontMedium u-fontWeightBold"
                                            style={{color: coal}}
                                        >
                                            Selected interval settings
                                        </div>
                                        <div
                                            className="u-font-semi-small mt-1"
                                            style={{color: pollution}}
                                        >
                                            In the selection section of delivery time(The box above) Shipping intervals
                                            The length of the week is specified. By taking the time of preparation
                                            Order, must be the first selective interval, according to the time of order
                                            To determine the customer. For this purpose of two numbers in the box below
                                            Used. First number: The interval limit of the moment
                                            Order by the beginning of the first selective interval(To prepare
                                            Order) Specifies that with the day, hour or minute
                                            Is setting. The second number: Specifies that the intervals in the
                                            Days of the week until a few days after the moment the order is to the customer
                                            to be given.
                                        </div>
                                        <div className="d-flex flex-wrap align-items-center">
                                            <div className="d-flex flex-wrap align-items-start mt-3 ml-5">
                                                <div className="d-flex align-items-center mb-1 mt-2">
                          <span
                              style={{color: smoke}}
                              className="u-fontMedium ml-1"
                          >
                            From
                          </span>
                                                    <span className="ml-1">
                            <Input
                                value={englishNumberToPersianNumber(
                                    delivery?.timing.maximum_delivery_time?.value ||
                                    0
                                )}
                                onChange={(value) => {
                                    const newObj = JSON.parse(
                                        JSON.stringify(delivery)
                                    );
                                    newObj.timing.maximum_delivery_time.value =
                                        Number(persianToEnglishNumber(value));
                                    setDelivery(newObj);
                                    setHasError({
                                        ...hasError,
                                        scheduledDeliveryFromTimeError: false,
                                    });
                                }}
                                numberOnly
                                size="medium"
                            />
                          </span>
                                                </div>
                                                <div className="d-flex align-items-center mb-1 mt-2">
                          <span
                              style={{color: smoke, visibility: "hidden"}}
                              className="u-fontMedium ml-1"
                          >
                            From
                          </span>
                                                    <FormControl
                                                        variant="outlined"
                                                        style={{minWidth: 100}}
                                                        className="ml-1"
                                                    >
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={
                                                                delivery.timing.maximum_delivery_time?.type ||
                                                                "day"
                                                            }
                                                            onChange={(event) => {
                                                                const newObj = JSON.parse(
                                                                    JSON.stringify(delivery)
                                                                );
                                                                newObj.timing.maximum_delivery_time.type =
                                                                    event.target.value;
                                                                setDelivery(newObj);
                                                            }}
                                                            className="medium"
                                                        >
                                                            <MenuItem value="minute">Minutes</MenuItem>
                                                            <MenuItem value="hour">the watch</MenuItem>
                                                            <MenuItem value="day">Day</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-wrap align-items-start mt-3">
                                                <div className="d-flex align-items-center mb-1 mt-2">
                          <span
                              style={{color: smoke}}
                              className="u-fontMedium ml-1"
                          >
                            until the
                          </span>
                                                    <span className="ml-1">
                            <Input
                                numberOnly
                                placeholder="Number"
                                variant="outlined"
                                value={
                                    delivery &&
                                    englishNumberToPersianNumber(
                                        typeof delivery.timing
                                            .no_next_delivery_days === "number"
                                            ? delivery.timing.no_next_delivery_days
                                            : 4
                                    )
                                }
                                onChange={(value) => {
                                    const newObj = JSON.parse(
                                        JSON.stringify(delivery)
                                    );
                                    newObj.timing.no_next_delivery_days = Number(
                                        persianToEnglishNumber(value)
                                    );
                                    setDelivery(newObj);
                                }}
                                size="medium"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            Day
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{
                                    className: "small",
                                }}
                            />
                          </span>
                                                </div>
                                                {/* <div className="d-flex align-items-center mb-1 mt-2">
                          <span
                            style={{ color: smoke, visibility: "hidden" }}
                            className="u-fontMedium ml-1"
                          >
                            until the
                          </span>
                          <FormControl
                            variant="outlined"
                            style={{ minWidth: 100 }}
                            className="ml-1"
                            disabled
                          >
                            <Select value="day" className="medium">
                              <MenuItem value="day">Day</MenuItem>
                            </Select>
                          </FormControl>
                        </div> */}
                                            </div>
                                        </div>
                                        {hasError.scheduledDeliveryFromTimeError ? (
                                            <div
                                                style={{color: theme.palette.error.main}}
                                                className="u-font-semi-small mt-1"
                                            >
                                                Zero value is not allowed.
                                            </div>
                                        ) : null}
                                    </div>
                                    {/* <div className="py-3 px-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="u-fontMedium" style={{ color: night }}>
                        The number of days displayed
                      </div>
                    </div>
                    <div
                      className="u-font-semi-small mt-1"
                      style={{ color: pollution }}
                    >
                      This number of days when selected when choosing the interval to be displayed to the customer
                      Determines the given.
                    </div>
                    <span
                      className="d-flex flex-wrap"
                      style={{
                        width: minWidth768 ? "50% !important" : "100%",
                      }}
                    >
                      <Input
                        numberOnly
                        className="mt-3"
                        placeholder="Number"
                        variant="outlined"
                        value={
                          delivery &&
                          englishNumberToPersianNumber(
                            typeof delivery.timing.no_next_delivery_days ===
                              "number"
                              ? delivery.timing.no_next_delivery_days
                              : 4
                          )
                        }
                        onChange={(value) => {
                          const newObj = JSON.parse(JSON.stringify(delivery));
                          newObj.timing.no_next_delivery_days = Number(
                            persianToEnglishNumber(value)
                          );
                          setDelivery(newObj);
                        }}
                        size="medium"
                        InputProps={{
                          className: "small",
                          endAdornment: (
                            <InputAdornment position="end">Day</InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          className: "small",
                        }}
                      />
                    </span>
                  </div> */}
                                </>
                            )}
                            <Divider/>
                            {delivery && delivery.timing.type === DELIVERY_TYPE_FAST && (
                                <div className="py-3 px-4">
                                    <div
                                        className="u-fontMedium u-fontWeightBold"
                                        style={{color: coal}}
                                    >
                                        Time preparation and sending order
                                    </div>
                                    <div
                                        className="u-font-semi-small mt-1"
                                        style={{color: pollution}}
                                    >
                                        This time is displayed by default to users and in
                                        The order of order confirmation is editable.
                                    </div>
                                    <div className="d-flex flex-wrap align-items-start mt-3">
                                        <div
                                            className="ml-1"
                                            style={{maxWidth: "190px !important"}}
                                        >
                                            <Input
                                                numberOnly
                                                value={englishNumberToPersianNumber(
                                                    delivery?.timing.maximum_delivery_time?.value || 60
                                                )}
                                                onChange={(value) => {
                                                    const newObj = JSON.parse(JSON.stringify(delivery));
                                                    newObj.timing.maximum_delivery_time = {
                                                        type:
                                                            delivery?.timing.maximum_delivery_time?.type ||
                                                            "minute",
                                                    };
                                                    newObj.timing.maximum_delivery_time.value = Number(
                                                        persianToEnglishNumber(value)
                                                    );
                                                    setDelivery(newObj);
                                                }}
                                                size="medium"
                                            />
                                        </div>
                                        <div
                                            style={{
                                                width: minWidth768 && 100,
                                                flexGrow: !minWidth768 && 1,
                                            }}
                                        >
                                            <FormControl
                                                variant="outlined"
                                                className="mb-1"
                                                fullWidth={true}
                                            >
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={
                                                        delivery?.timing.maximum_delivery_time?.type ||
                                                        "minute"
                                                    }
                                                    onChange={(event) => {
                                                        const newObj = JSON.parse(JSON.stringify(delivery));
                                                        newObj.timing.maximum_delivery_time = {
                                                            value:
                                                                delivery?.timing.maximum_delivery_time?.value ||
                                                                60,
                                                        };
                                                        newObj.timing.maximum_delivery_time.type =
                                                            event.target.value;
                                                        setDelivery(newObj);
                                                    }}
                                                    className="medium"
                                                >
                                                    <MenuItem value="minute">Minutes</MenuItem>
                                                    <MenuItem value="hour">the watch</MenuItem>
                                                    <MenuItem value="day">Day</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Paper>
                        {delivery?.timing.type === DELIVERY_TYPE_FAST && (
                            <Paper elevation={1} className="mt-4">
                                <div className="d-flex align-items-center py-3 px-4">
                                    <div className="w-75">
                                        <div
                                            className="u-fontMedium u-fontWeightBold d-flex align-items-center"
                                            style={{color: coal}}
                                        >
                                            <div>Pre -order:</div>
                                            <div>
                                                &nbsp;
                                                {delivery?.timing?.pre_order?.status ===
                                                PRE_ORDER_ACTIVE
                                                    ? "active"
                                                    : "Inactive"}
                                            </div>
                                        </div>
                                        <div
                                            style={{color: smoke}}
                                            className="u-font-semi-small mt-1"
                                        >
                                            {delivery?.timing?.pre_order?.status === PRE_ORDER_ACTIVE
                                                ? "Out -of -working hours are also available for ordering."
                                                : "Unable to place an order on the site, outside the working hours.."}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end w-25">
                                        <Switch
                                            checked={
                                                delivery?.timing?.pre_order?.status === PRE_ORDER_ACTIVE
                                            }
                                            onChange={(event) => {
                                                const newObj = JSON.parse(JSON.stringify(delivery));
                                                newObj.timing.pre_order = {
                                                    status: event.target.checked
                                                        ? PRE_ORDER_ACTIVE
                                                        : PRE_ORDER_INACTIVE,
                                                    type:
                                                        newObj?.timing?.pre_order?.type || PRE_ORDER_NORMAL,
                                                };
                                                setDelivery(newObj);
                                            }}
                                            color="primary"
                                            name="checkedB"
                                            inputProps={{"aria-label": "primary checkbox"}}
                                        />
                                    </div>
                                </div>
                                {delivery?.timing?.pre_order?.status === PRE_ORDER_ACTIVE && (
                                    <>
                                        <Divider/>
                                        <div className="d-flex flex-column py-3 px-4">
                                            <div
                                                style={{color: night}}
                                                className="u-fontMedium  u-fontWeightBold mb-2"
                                            >
                                                {`How to choose time"Put" By the customer`}
                                            </div>
                                            <CustomizedSelect
                                                options={SelectComponentOptionsFastDelivery}
                                                value={SelectComponentOptionsFastDelivery.find(
                                                    (option) =>
                                                        option.name === delivery.timing.pre_order.type
                                                )}
                                                onChangeMethod={(option) => {
                                                    const newObj = JSON.parse(JSON.stringify(delivery));
                                                    newObj.timing.pre_order.type = option.name;
                                                    setDelivery(newObj);
                                                }}
                                                key={
                                                    SelectComponentOptionsFastDelivery.find(
                                                        (option) =>
                                                            option.name === delivery.timing.pre_order.type
                                                    ).name
                                                }
                                            />
                                            <div
                                                style={{color: night}}
                                                className="u-fontMedium  u-fontWeightBold mt-4"
                                            >
                                                {`Time and how to inform"Put" Received`}
                                            </div>
                                            <div
                                                style={{color: pollution}}
                                                className="u-font-semi-small mt-1"
                                            >
                        <span>
                          {` This time determines that"Put" What time in the section`}
                            <span
                                className="u-cursor-pointer mx-1"
                                style={{
                                    borderBottom: `1px solid ${process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}`,
                                    color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                                }}
                                onClick={() =>
                                    router.push(
                                        `${urlPrefix}${SHOPPING_PLUGIN_URL}/orders`
                                    )
                                }
                            >
                            {`"Order management"`}
                          </span>
                          To be displayed to you..
                        </span>
                                            </div>
                                            <FormControl
                                                variant="outlined"
                                                style={{maxWidth: 450}}
                                                className="mt-3"
                                            >
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={
                                                        typeof delivery.timing.notification_time ===
                                                        "undefined"
                                                            ? "rightNow"
                                                            : "beforeDeliveryTime"
                                                    }
                                                    onChange={(event) => {
                                                        const newObj = JSON.parse(JSON.stringify(delivery));
                                                        if (event.target.value === "rightNow") {
                                                            delete newObj.timing.notification_time;
                                                        } else if (
                                                            event.target.value === "beforeDeliveryTime"
                                                        ) {
                                                            newObj.timing.notification_time = {
                                                                type: "hour",
                                                                value: 3,
                                                            };
                                                        }
                                                        setDelivery(newObj);
                                                    }}
                                                    className="medium"
                                                >
                                                    <MenuItem value="rightNow">
                                                        Immediately after the customer's order registration
                                                    </MenuItem>
                                                    <MenuItem value="beforeDeliveryTime">
                                                        A specified time before delivery.
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                            {delivery.timing.notification_time && (
                                                <div className="d-flex flex-wrap align-items-start mt-3">
                                                    <div
                                                        className="ml-1"
                                                        style={{maxWidth: "190px !important"}}
                                                    >
                                                        <Input
                                                            numberOnly
                                                            value={
                                                                delivery &&
                                                                englishNumberToPersianNumber(
                                                                    delivery.timing.notification_time.value
                                                                )
                                                            }
                                                            onChange={(value) => {
                                                                const newObj = JSON.parse(
                                                                    JSON.stringify(delivery)
                                                                );
                                                                newObj.timing.notification_time.value = Number(
                                                                    persianToEnglishNumber(value)
                                                                );
                                                                setDelivery(newObj);
                                                            }}
                                                            size="medium"
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            width: minWidth768 && 100,
                                                            flexGrow: !minWidth768 && 1,
                                                        }}
                                                    >
                                                        <FormControl
                                                            variant="outlined"
                                                            style={{minWidth: 100}}
                                                            className="mb-1"
                                                            fullWidth={true}
                                                        >
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={
                                                                    delivery &&
                                                                    delivery.timing.notification_time.type
                                                                }
                                                                onChange={(event) => {
                                                                    const newObj = JSON.parse(
                                                                        JSON.stringify(delivery)
                                                                    );
                                                                    newObj.timing.notification_time.type =
                                                                        event.target.value;
                                                                    setDelivery(newObj);
                                                                }}
                                                                className="medium"
                                                            >
                                                                <MenuItem value="minute">Minutes</MenuItem>
                                                                <MenuItem value="hour">the watch</MenuItem>
                                                                <MenuItem value="day">Day</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </Paper>
                        )}
                        <Paper elevation={1} className="mt-4">
                            <div className="py-3 px-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div
                                        className="u-fontMedium u-fontWeightBold"
                                        style={{color: night}}
                                    >
                                        Packaging cost
                                    </div>
                                </div>
                                <div
                                    className="u-font-semi-small mt-1"
                                    style={{color: pollution}}
                                >
                                    If for the products separately, the cost of setting the packaging
                                    You will have this cost at the cost of packaging the product
                                    became.
                                </div>
                                <span
                                    className="d-flex flex-wrap"
                                    style={{width: minWidth768 ? "50%" : "100%"}}
                                >
                  <Input
                      numberOnly
                      className="mt-3"
                      id="outlined-basic"
                      label="Packaging cost"
                      variant="outlined"
                      value={
                          !delivery.timing.packaging_price
                              ? ""
                              : englishNumberToPersianNumber(
                                  delivery.timing.packaging_price
                              )
                      }
                      onChange={(value) => {
                          const newObj = JSON.parse(JSON.stringify(delivery));
                          if (value === "") {
                              delete newObj.timing.packaging_price;
                          } else {
                              newObj.timing.packaging_price = Number(
                                  persianToEnglishNumber(value)
                              );
                          }
                          setDelivery(newObj);
                      }}
                      size="medium"
                      InputProps={{
                          className: "small",
                          endAdornment: (
                              <InputAdornment position="end">
                                  <Icon
                                      icon={$}
                                      width={21}
                                      height={21}
                                      color={graphite}
                                  />
                              </InputAdornment>
                          ),
                      }}
                      InputLabelProps={{
                          className: "small",
                      }}
                  />
                </span>
                            </div>
                        </Paper>
                        <Paper elevation={1} className="mt-4" style={{marginBottom: 70}}>
                            <div className="py-3 px-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div
                                        className="u-fontMedium u-fontWeightBold"
                                        style={{color: night}}
                                    >
                                        Further information
                                    </div>
                                </div>
                                <div
                                    className="u-font-semi-small mt-1"
                                    style={{color: pollution}}
                                >
                                    Selected items on the order registration route are asked by users.
                                </div>
                                {defaultAddressDetailsRequirements.map((field) => (
                                    <div key={field} className="d-flex align-items-center">
                                        <Checkbox
                                            color="primary"
                                            inputProps={{"aria-label": "secondary checkbox"}}
                                            onChange={(event) => {
                                                const _address_detail_requirements =
                                                    delivery?.timing.address_detail_requirements || [];
                                                const isChecked = event.target.checked;
                                                const isFieldInCluded =
                                                    delivery?.timing.address_detail_requirements?.includes(
                                                        field
                                                    );
                                                if (isChecked && !isFieldInCluded) {
                                                    _address_detail_requirements.push(field);
                                                } else if (!isChecked && isFieldInCluded) {
                                                    const index =
                                                        _address_detail_requirements.indexOf(field);
                                                    if (index > -1) {
                                                        _address_detail_requirements.splice(index, 1);
                                                    }
                                                }
                                                const newObj = JSON.parse(JSON.stringify(delivery));
                                                newObj.timing.address_detail_requirements =
                                                    _address_detail_requirements;
                                                setDelivery(newObj);
                                            }}
                                            checked={
                                                delivery?.timing.address_detail_requirements?.includes(
                                                    field
                                                ) || false
                                            }
                                            className="pr-0"
                                        />
                                        <div style={{color: night}} className="u-fontMedium">
                                            {addressDetailsRequirementsFieldsLabels[field]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    </div>
                    <Dialog
                        open={isDialogBoxOpen}
                        aria-describedby="alert-dialog-description"
                        onClose={() => setDialogBoxOpen(false)}
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div
                                        style={{color: night}}
                                        className="u-fontLarge u-fontWeightBold"
                                    >
                                        Remove the submission method
                                    </div>
                                    <CloseRoundedIcon
                                        className="u-cursor-pointer"
                                        style={{color: night}}
                                        onClick={() => setDialogBoxOpen(false)}
                                    />
                                </div>
                                <div style={{color: graphite}} className="u-fontMedium mt-4">
                                    Method of sending{`"${delivery.title}"`} Will be removed. Relative to its removal
                                    Are you sure?
                                </div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions
                            className="justify-content-start"
                            style={{padding: "0px 24px 20px 0px"}}
                        >
                            <Button
                                onClick={() => setDialogBoxOpen(false)}
                                variant="outlined"
                                color="primary"
                                className="ml-2"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    _deleteDeliveryType(deliveryTypeId);
                                    setDialogBoxOpen(false);
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
    _deliveryType: makeSelectDeliveryType(SHOPPING_PLUGIN),
    businessId: makeSelectBusinessId(),
    loading: makeSelectLoading(),
    branches: makeSelectBranches(),
    urlPrefix: makeSelectAdminUrlPrefix(),
    pluginsData: makeSelectPlugins(),
});

function mapDispatchToProps(dispatch) {
    return {
        _getDeliveryType: (pluginName, id) =>
            dispatch(getDeliveryType(pluginName, id)),
        _updateDeliveryType: (data) => dispatch(updateDeliveryType(data)),
        _deleteDeliveryType: (data) => dispatch(deleteDeliveryType(data)),
        _createDeliveryType: (data) => dispatch(createDeliveryType(data)),
        _setSnackBarMessage: (message, type) =>
            dispatch(setSnackBarMessage(message, type)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminDeliveryTypeSettings);
