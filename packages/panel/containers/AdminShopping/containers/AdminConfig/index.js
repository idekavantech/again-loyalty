import Paper from "@material-ui/core/Paper";
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Input from "@saas/components/Input";
import Select from "@material-ui/core/Select";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectPlugin, makeSelectPlugins, makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { setPluginData } from "@saas/stores/plugins/actions";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { graphite, skyI, smoke } from "@saas/utils/colors";
import PriorityHighRoundedIcon from "@material-ui/icons/PriorityHighRounded";
import { useRouter } from "next/router";
import useTheme from "@material-ui/core/styles/useTheme";
import removeNullishKeysFromObj from "@saas/utils/helpers/removeNullishKeysFromObj";

import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import InputAdornment from "@material-ui/core/InputAdornment";
import { $ } from "@saas/icons";
import Icon from "@saas/components/Icon";
import LocationSelector from "components/LocationSelector";
import { makeSelectBranches } from "@saas/stores/business/selector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { MenuItem } from "@material-ui/core";

const taxTypes = [
  {
    id: 0,
    label: "Cost(Products+ packing+ submit)",
    type: "IPD",
  },
  {
    id: 1,
    label: "Cost(Products+ packing)",
    type: "IP",
  },
  {
    id: 2,
    label: "Cost(Products+ submit)",
    type: "ID",
  },
  {
    id: 3,
    label: "Cost(Products)",
    type: "I",
  },
];

export function AdminConfig({
  loading,
  _setSnackBarMessage,
  urlPrefix,
  _setPluginData,
  shoppingPluginData,
  pluginsData,
  plugin = SHOPPING_PLUGIN,
  isSuper,
  branches,
}) {
  const pluginUrl = pluginsData[plugin].plugin_url;
  const [selectedBranch, setSelectedBranch] = useState(isSuper ? branches?.[0]?.slug : null);
  const { minWidth768 } = useResponsive();

  const pluginData = isSuper
    ? branches.find((branch) => branch.slug === selectedBranch)?.plugins_config[SHOPPING_PLUGIN]
    : shoppingPluginData;
  const router = useRouter();
  const theme = useTheme();
  const [hasError, setHasError] = useState(false);
  const [taxPercent, setTaxPercent] = useState(null);
  const [taxType, setTaxType] = useState(null);
  const [minimumOrderPrice, setMinimumOrderPrice] = useState("");
  const [packagingPrice, setPackagingPrice] = useState("");
  const [taxTypeErr, setTaxTypeErr] = useState(false);
  const [taxErr , setTaxErr] = useState(false)
  const taxInputHandler = (value) => {
    setTaxPercent(persianToEnglishNumber(value));
  };
  const minimumOrderPriceInputHandler = (value) => {
    setMinimumOrderPrice(persianToEnglishNumber(value));
  };
  const packagingPriceInputHandler = (value) => {
    setPackagingPrice(persianToEnglishNumber(value));
  };

  const mainConfigs = {
    minimum_order: minimumOrderPrice === "" || !minimumOrderPrice ? 0 : parseInt(minimumOrderPrice ?? 0, 10),
    packaging_price: packagingPrice === "" || !packagingPrice ? 0 : parseInt(packagingPrice ?? 0, 10),
    taxing: {
      percent: taxPercent === "" || !taxPercent ? 0 : parseInt(taxPercent ?? 0, 10),
      type: taxType,
    },
  };

  const validate = ()=>{
    if (taxPercent || taxType) {
      if (!taxType) {
        setTaxTypeErr(true);
        return false;
      }
      if(!taxPercent){
        setTaxErr(true)
        return false
      }
    }
    setTaxErr(false)
    setTaxTypeErr(false);
    return true;
  }

  const submit = () => {
    const isValidForm = validate()
    if(!isValidForm){
      return  _setSnackBarMessage("Complete the form information", "fail");
    }

    if (!hasError) {
      const nonNullishConfig = removeNullishKeysFromObj(mainConfigs);

      const plugin_data = { ...pluginData.data };

      const data = Object.assign(plugin_data, nonNullishConfig);

      _setPluginData(SHOPPING_PLUGIN, data, selectedBranch);
    } else {
      _setSnackBarMessage("The entered number must be between 1 and 2.", "fail");
    }
  };
  useEffect(() => {
    setTaxPercent(pluginData.data?.taxing?.percent || null);
    setTaxType(pluginData.data?.taxing?.type || null);
    setMinimumOrderPrice(pluginData.data.minimum_order);
    setPackagingPrice(pluginData.data.packaging_price);
  }, [pluginData.data]);

  useEffect(() => {
    if (taxPercent !== "" && (Number(taxPercent) > 100 || Number(taxPercent) < 0)) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [taxPercent]);
  useEffect(() => {
    if (localStorage.getItem("adminDeliverySelectedBranch") && isSuper)
      setSelectedBranch(localStorage.getItem("adminDeliverySelectedBranch"));
  }, []);

  return (
    <div className="container pb-3">
      <AdminBreadCrumb submitButtonText="Save changes" submitAction={submit} isLoading={loading} />
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
      <Paper elevation={1} className="mt-3 p-3 ">
        <div className="d-flex align-items-center u-fontWeightBold">Tax percentage</div>
        <div
          className="py-3 px-2 d-flex align-items-center my-2"
          style={{
            background: "linear-gradient(0deg, rgba(0, 190, 240, 0.08), rgba(0, 190, 240, 0.08)), #FFFFFF",
            border: "1px solid rgba(0, 190, 240, 0.5)",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              backgroundColor: skyI,
              width: 20,
              height: 20,
              minWidth: 20,
              minHeight: 20,
              borderRadius: "50%",
            }}
            className="d-flex justify-content-center align-items-center ml-2"
          >
            <PriorityHighRoundedIcon style={{ color: "white" }} fontSize="small" />
          </div>
          <div className="w-100">
            <span style={{ color: smoke }} className="u-font-semi-small">
              The percentage of taxation is the number that will be added to all the products that the user will buy from you at the time of sale.
              The amount of taxation can be paid in the section
              <span
                className="u-cursor-pointer mx-1"
                style={{ borderBottom: `1px solid ${smoke}` }}
                onClick={() => router.push(`${urlPrefix}${pluginUrl}/orders`)}
              >
                {`"Order reports"`}
              </span>
              See segregated.
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center pb-3">
          Enter the percentage of tax sales in the following section.
        </div>
        <div className="d-flex flex-wrap w-100">
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3 px-md-3" style={{ padding: 0 }}>
            <Select
            error={taxTypeErr}
              className="w-100"
              style={{ height: "36px", padding: 0 }}
              size="small"
              value={taxTypes}
              variant="outlined"
              renderValue={() => {
                if (taxType) {
                  return taxTypes.find((taxTypeItem) => taxTypeItem.type === taxType).label;
                } else {
                  return "Selection of Tax Fields";
                }
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
              onChange={(e) => {
                const { value } = e.target;
                setTaxType(value.type);
              }}
            >
              {taxTypes.map((taxTypeItem) => {
                return (
                  <MenuItem key={taxTypeItem.id} value={taxTypeItem}>
                    {taxTypeItem.label}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="w-100 col-lg-2 col-md-3 col-sm-12 mb-3" style={{ padding: 0 }}>
            <Input
              inputProps={{ maxLength: 3 }}
              label="Tax percentage"
              value={englishNumberToPersianNumber(taxPercent, "")}
              onChange={taxInputHandler}
              size="medium"
              style={{ minWidth: "100%" }}
              numberOnly
              min="0"
              error={taxErr}
              max="100"
              InputProps={{
                className: "small",
                endAdornment: <InputAdornment position="end">Percent</InputAdornment>,
              }}
              InputLabelProps={{
                className: "small",
              }}
            />
            {hasError && (
              <div style={{ color: theme.palette.error.main }} className="u-font-semi-small mt-1">
                The entered number must be between 1 and 2.
              </div>
            )}
          </div>
        </div>
      </Paper>
      <Paper elevation={1} className="mt-3 p-3 ">
        <div className="d-flex align-items-center u-fontWeightBold">Minimum order value</div>
        <div
          className="py-3 px-2 d-flex align-items-center my-2"
          style={{
            background: "linear-gradient(0deg, rgba(0, 190, 240, 0.08), rgba(0, 190, 240, 0.08)), #FFFFFF",
            border: "1px solid rgba(0, 190, 240, 0.5)",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              backgroundColor: skyI,
              width: 20,
              height: 20,
              minWidth: 20,
              minHeight: 20,
              borderRadius: "50%",
            }}
            className="d-flex justify-content-center align-items-center ml-2"
          >
            <PriorityHighRoundedIcon style={{ color: "white" }} fontSize="small" />
          </div>
          <div className="w-100">
            <span style={{ color: smoke }} className="u-font-semi-small">
              This minimum value is intended for modes of sending in their settings, minimum shipping cost
              Is not intended. If you need to set the minimum shipping fee per submission law
              to section
              <span
                className="u-cursor-pointer mx-1"
                style={{ borderBottom: `1px solid ${smoke}` }}
                onClick={() => router.push(`${urlPrefix}${pluginUrl}/settings/general/delivery`)}
              >
                {`"Submit and Settings Settings"`}
              </span>
              See.
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center pb-3">
          Set the minimum order to receive an order from users in this section.
        </div>
        <div style={{ width: minWidth768 ? "25%" : "100%" }}>
          <Input
            label="The minimum order amount"
            value={englishNumberToPersianNumber(minimumOrderPrice, "")}
            onChange={minimumOrderPriceInputHandler}
            size="medium"
            style={{ minWidth: "100%" }}
            className="w-100"
            numberOnly
            InputProps={{
              className: "small",
              endAdornment: (
                <InputAdornment position="end">
                  <Icon icon={$} width={21} height={21} color={graphite} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              className: "small",
            }}
          />
        </div>
      </Paper>
      <Paper elevation={1} className="mt-3 p-3 " style={{ marginBottom: 60 }}>
        <div className="d-flex align-items-center u-fontWeightBold">Packaging cost</div>
        <div
          className="py-3 px-2 d-flex align-items-center my-2"
          style={{
            background: "linear-gradient(0deg, rgba(0, 190, 240, 0.08), rgba(0, 190, 240, 0.08)), #FFFFFF",
            border: "1px solid rgba(0, 190, 240, 0.5)",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              backgroundColor: skyI,
              width: 20,
              height: 20,
              minWidth: 20,
              minHeight: 20,
              borderRadius: "50%",
            }}
            className="d-flex justify-content-center align-items-center ml-2"
          >
            <PriorityHighRoundedIcon style={{ color: "white" }} fontSize="small" />
          </div>
          <div className="w-100">
            <span style={{ color: smoke }} className="u-font-semi-small">
              This cost of packaging is intended for areas where the cost of packaging
              Not taken. If you need to set the packaging fee per area, to
              <span
                className="u-cursor-pointer mx-1"
                style={{ borderBottom: `1px solid ${smoke}` }}
                onClick={() => router.push(`${urlPrefix}${pluginUrl}/settings/general/delivery/zones`)}
              >
                {`"Determine the Service range and the shipping cost"`}
              </span>
              See.
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center pb-3">
          Set up the cost of default packaging for submission methods in this section.
        </div>
        <div style={{ width: minWidth768 ? "25%" : "100%" }}>
          <Input
            label="Fixed cost of packaging"
            value={englishNumberToPersianNumber(packagingPrice, "")}
            onChange={packagingPriceInputHandler}
            size="medium"
            style={{ minWidth: "100%" }}
            className="w-100"
            numberOnly
            InputProps={{
              className: "small",
              endAdornment: (
                <InputAdornment position="end">
                  <Icon icon={$} width={21} height={21} color={graphite} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              className: "small",
            }}
          />
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  branches: makeSelectBranches(),
  pluginsData: makeSelectPlugins(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setSnackBarMessage: (message, type) => dispatch(setSnackBarMessage(message, type)),
    _setPluginData: (pluginName, data, slug) => dispatch(setPluginData(pluginName, data, null, slug)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminConfig);
