/**
 *
 * Settings
 *
 */

import React, { memo, useState, useEffect, useMemo } from "react";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";

import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { coal, pollution, smoke } from "@saas/utils/colors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { setPluginData } from "@saas/stores/plugins/actions";
import {
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_WEBSITE,
  FULFILLMENT_CARRY_OUT,
  DAY,
  FULFILLMENT_ON_CAR,
  FULFILLMENT_ON_USER_SITE,
  MINUTE,
  HOUR,
} from "@saas/plugins/Shopping/constants";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Input from "@saas/components/Input";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import LocationSelector from "components/LocationSelector";
import { makeSelectBranches } from "@saas/stores/business/selector";
import { getBusiness } from "@saas/stores/business/actions";
import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";

function AdminShoppingPickup({
  shoppingPluginData,
  _setPluginData,
  isLoading,
  isSuper,
  branches,
  _getBusinessData,
}) {
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

  const accessedDeliverySiteTypeOptions = pluginData?.ui_access_config
    ?.delivery_site_type_options || [
    FULFILLMENT_ON_BUSINESS_SITE,
    FULFILLMENT_CARRY_OUT,
    FULFILLMENT_ON_CAR,
    FULFILLMENT_ON_USER_SITE,
    FULFILLMENT_ON_WEBSITE,
  ];
  const [deliveryTypesState, toggleDeliveryTypes] = useState(() => {
    const options = {};
    accessedDeliverySiteTypeOptions.forEach((_option) => {
      options[_option] = false;
    });
    return options;
  });
  const noneDeliveryTypesOptions = useMemo(
    () => ({
      [FULFILLMENT_CARRY_OUT]: {
        title: `Receive an order on the business location:‌
      ${deliveryTypesState[FULFILLMENT_CARRY_OUT] ? "active" : "Inactive"}`,
        description: `${
          deliveryTypesState[FULFILLMENT_CARRY_OUT]
            ? "Customers can register their order on the site and receive it in person at your business."
            : "It is not possible to obtain an order in person at the business location for customers."
        }`,
      },
      [FULFILLMENT_ON_CAR]: {
        title: `Receive order on -site by car:
      ${deliveryTypesState[FULFILLMENT_ON_CAR] ? "active" : "Inactive"}`,
        description: `${
          deliveryTypesState[FULFILLMENT_ON_CAR]
            ? "Customers can register their order on the site and receive it in person at your business without getting off their car."
            : "It is not possible to get an order in person at the business location without being off the car for customers."
        }`,
      },
      [FULFILLMENT_ON_BUSINESS_SITE]: {
        title: `Cedar in place:
      ${deliveryTypesState[FULFILLMENT_ON_BUSINESS_SITE] ? "active" : "Inactive"}`,
        description: `${
          deliveryTypesState[FULFILLMENT_ON_BUSINESS_SITE]
            ? "Customers can register their order on the site and then visit the business in the hall by visiting the business in person."
            : "It is not possible to serve in the hall for customers who have registered their order on the site."
        }`,
      },
      [FULFILLMENT_ON_WEBSITE]: {
        title: `Virtual receipt:
      ${deliveryTypesState[FULFILLMENT_ON_WEBSITE] ? "active" : "Inactive"}`,
        description: `${
          deliveryTypesState[FULFILLMENT_ON_WEBSITE]
            ? "Customers can register their order on the site and then wait for a call from the business owner to deliver the order."
            : "It is not possible to receive a virtual for customers who have registered their order on the site."
        }`,
      },
    }),
    [deliveryTypesState]
  );
  const [valueOfTime, setValueOfTime] = useState(
    pluginData.data.maximum_pickup_time?.value || 60
  );
  const [timeMethod, setTimeMethod] = useState(
    pluginData.data.maximum_pickup_time?.type || MINUTE
  );
  useEffect(() => {
    const _deliveryTypesState = accessedDeliverySiteTypeOptions.reduce(
      (_deliveryState, _option) => ({
        ..._deliveryState,
        [_option]: (
          pluginData.data?.delivery_type_options || [
            FULFILLMENT_ON_BUSINESS_SITE,
            FULFILLMENT_CARRY_OUT,
            FULFILLMENT_ON_USER_SITE,
          ]
        ).includes(_option),
      }),
      {}
    );
    toggleDeliveryTypes(_deliveryTypesState);
    setValueOfTime(pluginData.data.maximum_pickup_time?.value || 60);
    setTimeMethod(pluginData.data.maximum_pickup_time?.type || MINUTE);
  }, [pluginData?.data]);
  useEffect(() => {
    if (localStorage.getItem("adminDeliverySelectedBranch") && isSuper)
      setSelectedBranch(localStorage.getItem("adminDeliverySelectedBranch"));
  }, []);
  const submit = () => {
    const options = Object.keys(deliveryTypesState).filter(
      (key) => deliveryTypesState[key]
    );

    if (pluginData) {
      _setPluginData(
        SHOPPING_PLUGIN,
        {
          ...pluginData.data,
          delivery_type_options: options,
          maximum_pickup_time: { value: Number(valueOfTime), type: timeMethod },
        },
        _getBusinessData,
        selectedBranch
      );
    }
  };
  const filteredNoneDeliveryTypesOptions = Object.entries(
    noneDeliveryTypesOptions
  ).filter(([key]) => accessedDeliverySiteTypeOptions.includes(key));
  const none_delivery_type_card_title_options = {
    hasServe: "Cedar and in -person delivery(Receiving in place)",
    hasNoServe: "In-person delivery(Receiving in place)",
  };
  const hasServeVariable = accessedDeliverySiteTypeOptions.includes(
    FULFILLMENT_ON_BUSINESS_SITE
  )
    ? "hasServe"
    : "hasNoServe";
  return (
    <div className="container">
      <Head>
        <title>{none_delivery_type_card_title_options[hasServeVariable]}</title>
      </Head>
      <AdminBreadCrumb
        submitButtonText="Save changes"
        submitAction={submit}
        isLoading={isLoading}
        helpVideo={{
          url: ADMIN_HELP_VIDEOS.pickupSetting.url,
        }}
      />
      {isSuper ? (
        <div className="mt-2">
          <LocationSelector
            value={selectedBranch}
            onChange={(slug) => {
              localStorage.setItem("adminDeliverySelectedBranch", slug);
              setSelectedBranch(slug);
            }}
            items={branches.map((branch) => ({
              title: branch.title,
              value: branch.slug,
            }))}
          />
        </div>
      ) : null}

      <Paper elevation={1} className="mt-4">
        {filteredNoneDeliveryTypesOptions.map(([key, value]) => (
          <>
            <div className="d-flex align-items-center py-3 px-2">
              <div className="w-75">
                <div
                  className="u-fontMedium u-fontWeightBold"
                  style={{ color: coal }}
                >
                  {value.title}
                </div>
                <div
                  style={{ color: smoke, lineHeight: 1.7 }}
                  className="u-font-semi-small mt-1 text-justify"
                >
                  {value.description}
                </div>
              </div>
              <div className="d-flex justify-content-end w-25">
                <Switch
                  checked={deliveryTypesState[key]}
                  onChange={(event) =>
                    toggleDeliveryTypes({
                      ...deliveryTypesState,
                      [key]: event.target.checked,
                    })
                  }
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </div>
            </div>
          </>
        ))}

        {filteredNoneDeliveryTypesOptions.length ? (
          <>
            <Divider />
            <div
              className="py-3 px-2 d-flex align-items-center flex-wrap"
              style={{ lineHeight: 4 }}
            >
              <span className="ml-2 u-fontNormal " style={{ color: pollution }}>
                {`Orders that"In-person delivery" Are recorded after`}
              </span>
              <span className="d-flex flex-wrap" style={{ width: 100 }}>
                <Input
                  style={{ maxWidth: 80 }}
                  numberOnly
                  id="outlined-basic"
                  variant="outlined"
                  value={englishNumberToPersianNumber(valueOfTime)}
                  onChange={(value) =>
                    setValueOfTime(persianToEnglishNumber(value))
                  }
                  size="medium"
                  InputProps={{
                    className: "small",
                  }}
                  InputLabelProps={{
                    className: "small",
                  }}
                  className="ml-2"
                />
              </span>
              <FormControl variant="outlined" className="ml-2">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={timeMethod}
                  onChange={(event) => setTimeMethod(event.target.value)}
                  className="medium"
                  style={{ width: 110, height: 36 }}
                >
                  <MenuItem value={MINUTE}>Minutes</MenuItem>
                  <MenuItem value={HOUR}>the watch</MenuItem>
                  <MenuItem value={DAY}>Day</MenuItem>
                </Select>
              </FormControl>
              <span style={{ color: pollution }} className="u-fontNormal ">
                Are ready to deliver on -site to the customer. (At the time of purchase to the customer
                is shown.)
              </span>
            </div>
          </>
        ) : null}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  isLoading: makeSelectLoading(),
  branches: makeSelectBranches(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setPluginData: (pluginName, data, callback, slug) =>
      dispatch(setPluginData(pluginName, data, callback, slug)),
    _getBusinessData: () => dispatch(getBusiness()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminShoppingPickup);
