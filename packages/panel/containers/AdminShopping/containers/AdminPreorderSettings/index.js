/**
 *
 * Settings
 *
 */

import React, {memo, useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import {connect} from "react-redux";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";
import {SHOPPING_PLUGIN} from "@saas/utils/constants/plugins";
import {
    makeSelectDeliveryTypes,
    makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import {coal, night, pollution, smoke} from "@saas/utils/colors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@saas/components/Input";
import Divider from "@material-ui/core/Divider";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import CustomizedSelect from "@saas/components/CustomizedSelect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import {
    getDeliveryTypes,
    setPluginData,
    updateDeliveryType,
} from "@saas/stores/plugins/actions";
import {
    PRE_ORDER_DELAYED,
    PRE_ORDER_NORMAL,
    PRE_ORDER_ACTIVE,
    DELIVERY_TYPE_FAST,
    PRE_ORDER_INACTIVE,
} from "@saas/plugins/Shopping/constants";
import {useResponsive} from "@saas/utils/hooks/useResponsive";


const SelectComponentOptions = [
    {
        name: PRE_ORDER_NORMAL,
        Icon: `/images/normalPreorder.svg`,
        title: "No time(Approximate)",
        description:
            "If you are outside the working hours, the customer can register their order at any time and the business will submit an order as soon as the activity begins..",
    },
    {
        name: PRE_ORDER_DELAYED,
        Icon: HistoryRoundedIcon,
        title: `/images/timer.svg`,
        description:
            "If you are outside the working hours, the customer can also register their order at any time and select the delivery time.",
    },
];

function AdminShoppingPreOrderSettings({
                                           pluginData,
                                           _setPluginData,
                                           deliveryTypes,
                                           _getDeliveryTypes,
                                           _updateDeliveryType,
                                       }) {
    const [hasPreorder, setPreorder] = useState(true);
    const {minWidth768} = useResponsive()
    const handleChange = (event) => {
        setPreorder(event.target.checked);
    };

    const [notificationMethod, setNotificationMethod] = useState("rightNow");
    const handleNotificationMethod = (event) => {
        setNotificationMethod(event.target.value);
    };
    const [preOrderMethod, setPreOrderMethod] = useState(
        SelectComponentOptions[0]
    );

    const [valueOfTime, setValueOfTime] = useState(45);
    const [timeMethod, setTimeMethod] = useState("minute");

    const [popupType, setPopupType] = useState("default");
    const [popupCustomText, setPopupCustomText] = useState("");

    useEffect(() => {
        _getDeliveryTypes(SHOPPING_PLUGIN);
    }, []);

    useEffect(() => {
        if (deliveryTypes) {
            setPreorder(
                deliveryTypes.find((item) => item.timing.type === DELIVERY_TYPE_FAST)
                    .timing.pre_order.status === PRE_ORDER_ACTIVE
            );
            setPreOrderMethod(
                deliveryTypes.find((item) => item.timing.type === DELIVERY_TYPE_FAST)
                    .timing.pre_order.type === PRE_ORDER_NORMAL
                    ? SelectComponentOptions[0]
                    : SelectComponentOptions[1]
            );
        }
    }, [deliveryTypes]);

    const submit = () => {
        _updateDeliveryType({
            ...deliveryTypes.find((item) => item.timing.type === DELIVERY_TYPE_FAST),
            timing: {
                ...deliveryTypes.find((item) => item.timing.type === DELIVERY_TYPE_FAST)
                    .timing,
                pre_order: {
                    type: preOrderMethod.name,
                    status: hasPreorder ? PRE_ORDER_ACTIVE : PRE_ORDER_INACTIVE,
                },
            },
        });

        const dto = {
            ...pluginData.data,
            pre_order_notification_time: {
                type: timeMethod,
                value: Number(valueOfTime),
            },
        };
        if (notificationMethod === "beforeDeliveryTime") {
            _setPluginData(SHOPPING_PLUGIN, dto);
        } else {
            delete dto.pre_order_notification_time;
            _setPluginData(SHOPPING_PLUGIN, dto);
        }
    };
    useEffect(() => {
        if (
            !pluginData.data.pre_order_notification_time ||
            pluginData.data.pre_order_notification_time.value === 0
        ) {
            setNotificationMethod("rightNow");
        } else {
            setTimeMethod(pluginData.data.pre_order_notification_time.type);
            setValueOfTime(pluginData.data.pre_order_notification_time.value);
            setNotificationMethod("beforeDeliveryTime");
        }
    }, [pluginData.data]);

    return (
        <div className="container">
            <Head>
                <title>Scheduled order settings</title>
            </Head>
            <AdminBreadCrumb submitButtonText="Save changes" submitAction={submit}/>
            <Paper
                elevation={`${hasPreorder ? "3" : "1"}`}
                className="mt-4"
                style={{marginBottom: minWidth768 ? "" : 80}}
            >
                <div className="d-flex align-items-center py-3 px-2">
                    <div className="w-75">
                        <div
                            className="u-fontMedium u-fontWeightMedium"
                            style={{color: coal}}
                        >
                            Accept the pre -stroke
                        </div>
                        <div style={{color: smoke}} className="u-font-semi-small mt-1">
                            If activated, your business out of the working hours is also unable to
                            Receive the order will be.
                        </div>
                    </div>
                    <div className="d-flex justify-content-end w-25">
                        <Switch
                            checked={hasPreorder}
                            onChange={handleChange}
                            color="primary"
                            name="checkedB"
                            inputProps={{"aria-label": "primary checkbox"}}
                        />
                    </div>
                </div>
                {hasPreorder && (
                    <>
                        <Divider/>
                        <div className="d-flex flex-column py-3 px-2">
                            <div
                                style={{color: night}}
                                className="u-fontMedium  u-fontWeightMedium mb-2"
                            >
                                {`How to choose time"Put" By the customer`}
                            </div>
                            <CustomizedSelect
                                options={SelectComponentOptions}
                                value={preOrderMethod}
                                onChangeMethod={setPreOrderMethod}
                                key={preOrderMethod.name}
                            />
                            <div
                                style={{color: night}}
                                className="u-fontMedium  u-fontWeightMedium mt-4"
                            >
                                {`Time and how to inform"Put" Received`}
                            </div>
                            <div
                                style={{color: pollution}}
                                className="u-font-semi-small mt-1"
                            >
                                {`When the message receiving"Put" in part"‌Orders" Show you
                to be given?`}
                            </div>
                            <FormControl
                                variant="outlined"
                                style={{maxWidth: 450}}
                                className="mt-3"
                            >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={notificationMethod}
                                    onChange={handleNotificationMethod}
                                    className="medium"
                                >
                                    <MenuItem value="rightNow">
                                        Immediately after receiving the order
                                    </MenuItem>
                                    <MenuItem value="beforeDeliveryTime">
                                        After the specified time before the delivery deadline
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            {notificationMethod === "beforeDeliveryTime" && (
                                <div
                                    className="d-flex align-items-center justify-content-between mt-3"
                                    style={{maxWidth: 450}}
                                >
                                    <TextField
                                        type="number"
                                        id="outlined-basic"
                                        variant="outlined"
                                        value={valueOfTime}
                                        onChange={(event) => setValueOfTime(event.target.value)}
                                        size="medium"
                                        InputProps={{
                                            className: "small",
                                        }}
                                        InputLabelProps={{
                                            className: "small",
                                        }}
                                        className="ml-2 flex-1"
                                    />
                                    <FormControl variant="outlined">
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={timeMethod}
                                            onChange={(event) => setTimeMethod(event.target.value)}
                                            className="medium"
                                            style={{width: 85, height: 36}}
                                        >
                                            <MenuItem value="minute">Minutes</MenuItem>
                                            <MenuItem value="hour">the watch</MenuItem>
                                            <MenuItem value="day">Day</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            )}
                            <div
                                style={{color: night}}
                                className="u-fontMedium  u-fontWeightMedium mt-4"
                            >
                                View message
                            </div>
                            <div
                                style={{color: pollution}}
                                className="u-font-semi-small mt-1"
                            >
                                If you are out of the working hours, this message on the order page
                                Displayed to customers.
                            </div>
                            <FormControl component="fieldset" className="w-100 mt-3">
                                <RadioGroup
                                    aria-label="gender"
                                    name="gender1"
                                    value={popupType}
                                    onChange={(event) => setPopupType(event.target.value)}
                                >
                                    <FormControlLabel
                                        className="mr-0"
                                        value="default"
                                        control={<Radio color="primary" className="pr-0"/>}
                                        label="The default message"
                                    />
                                    <div
                                        className="mr-5 u-fontNormal "
                                        style={{color: pollution}}
                                    >
                                        {`"We're out of work now, please register your order.
                    We will process your order after starting the working hours."`}
                                    </div>
                                    <FormControlLabel
                                        className="mr-0"
                                        value="custom"
                                        control={<Radio color="primary" className="pr-0"/>}
                                        label="The desired message"
                                    />
                                    <Input
                                        label="The text of the desired message"
                                        placeholder="The text of the desired message"
                                        value={popupCustomText}
                                        onChange={(value) => setPopupCustomText(value)}
                                        className="mr-5"
                                        size="medium"
                                        disabled={popupType !== "custom"}
                                        style={{width: 450}}
                                    />
                                    <FormControlLabel
                                        className="mr-0"
                                        value="none"
                                        control={<Radio color="primary" className="pr-0"/>}
                                        label="There is a message."
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </>
                )}
            </Paper>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
    deliveryTypes: makeSelectDeliveryTypes(SHOPPING_PLUGIN),
});

function mapDispatchToProps(dispatch) {
    return {
        _setPluginData: (pluginName, data) =>
            dispatch(setPluginData(pluginName, data)),
        _getDeliveryTypes: (pluginName) => dispatch(getDeliveryTypes(pluginName)),
        _updateDeliveryType: (data) => dispatch(updateDeliveryType(data)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminShoppingPreOrderSettings);
