/**
 *
 * Settings
 *
 */

import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";

import {
  makeSelectAdminUrlPrefix,
  makeSelectCitiesByIds,
  makeSelectDeliveryRule,
  makeSelectDeliveryRules,
  makeSelectDeliveryTypesWithoutPagination,
  makeSelectPlugin,
  makeSelectSearchedCity,
  makeSelectSearchedNeighborhood,
} from "@saas/stores/plugins/selector";
import { cement, graphite, night, pollution } from "@saas/utils/colors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import InputAdornment from "@material-ui/core/InputAdornment";
import dynamic from "next/dynamic";
import Input from "@saas/components/Input";
import Divider from "@material-ui/core/Divider";
import CustomizedSelect from "@saas/components/CustomizedSelect";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useRouter } from "next/router";
import {
  createDeliveryRule,
  deleteDeliveryRule,
  getDeliveryRule,
  getDeliveryRules,
  getDeliveryTypesWithoutPagination,
  getSearchCitySearch,
  getSearchNeighborhoodSearch,
  updateDeliveryRule,
} from "@saas/stores/plugins/actions";
import {
  makeSelectBranches,
  makeSelectBusinessId,
  makeSelectBusinessLocation,
} from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  PRICING_RATE_BY_PRICE,
  PRICING_RATE_BY_WEIGHT,
  PRICING_RATE_FIXED,
  PRICING_RATE_FREE,
} from "@saas/plugins/Shopping/constants";
import Chip from "@material-ui/core/Chip";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import useTheme from "@material-ui/core/styles/useTheme";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { $ } from "@saas/icons";
import Icon from "@saas/components/Icon";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });

const DELIVERY_RULE_PRICING_TYPES = [
  {
    name: PRICING_RATE_FIXED,
    Icon: `/images/fixedPrice.svg`,
    title: "Sound",
    description:
      "In this area, the shipping cost for all orders is a fixed quantity.",
  },
  {
    name: PRICING_RATE_BY_PRICE,
    Icon: `/images/rateByPrice.svg`,
    title: "Based on price",
    description:
      "In this area, the shipping cost is calculated in terms of the final price of the user.",
  },
  {
    name: PRICING_RATE_FREE,
    Icon: `/images/noDeliveryPrice.svg`,
    title: "Free",
    description: "In this area, the shipping cost for all orders is free.",
  },
];

function onlyUnique(value, index, self) {
  return self.findIndex((item) => item.title === value.title) === index;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const pricingRuleType = {
  [PRICING_RATE_BY_PRICE]: PRICING_RATE_BY_PRICE,
  [PRICING_RATE_FREE]: PRICING_RATE_FREE,
  [PRICING_RATE_FIXED]: PRICING_RATE_BY_PRICE,
};

const DELIVERY_RULE_CREATION_TYPE_MANUAL = 0;
const DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD = 1;
const DELIVERY_RULE_CREATION_TYPE_CITY = 2;
const DELIVERY_RULE_CREATION_TYPE_CHOICES = {
  [DELIVERY_RULE_CREATION_TYPE_MANUAL]: "Manual",
  [DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD]: "The Neighbourhood",
  [DELIVERY_RULE_CREATION_TYPE_CITY]: "City",
};

let timeoutId = null;

function AdminDeliveryZone({
  _getDeliveryRule,
  _deliveryRule,
  _getDeliveryTypesWithoutPagination,
  deliveryTypesWithoutPagination,
  _deleteDeliveryRule,
  businessLocation,
  _getSearchCitySearch,
  searchedCity,
  searchedneighborhood,
  _getSearchNeighborhoodSearch,
  _updateDeliveryRule,
  _createDeliveryRule,
  loading,
  _getDeliveryRules,
  deliveryRules,
  _setSnackBarMessage,
  businessId,
  branches,
  isSuper,
  urlPrefix,
}) {
  const theme = useTheme();
  const { minWidth768 } = useResponsive();
  const router = useRouter();
  const deliveryRuleId = router.query.id === "new" ? null : router.query.id;
  const [deliveryRuleCreationType, setDeliveryRuleCreationType] = useState(
    DELIVERY_RULE_CREATION_TYPE_MANUAL
  );
  const [error, setError] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(
    isSuper ? branches?.[0]?.slug : null
  );
  const [localLoading, setLocalLoading] = useState(false);
  useEffect(() => {
    setLocalLoading(true);
    setTimeout(() => {
      setLocalLoading(false);
    }, 300);
  }, [deliveryRuleCreationType]);
  const mapRef = useRef(null);
  const [neighbourhoodsChips, setNeighbourhoodsChips] = useState([]);
  const [citiesChips, setCitiesChips] = useState([]);
  const [deliveryRuleTitle, setDeliveryRuleTitle] = useState("");
  const [deliveryRulePricingType, setDeliveryRulePricingType] = useState(
    DELIVERY_RULE_PRICING_TYPES[0]
  );
  const [deliveryFixedPrice, setDeliveryFixedPrice] = useState([
    {
      from: 0,
      to: null,
      rate: 0,
    },
  ]);

  const [deliveryDependsOnPrice, setDeliveryDependsOnPrice] = useState([
    { from: 0, to: 10000, rate: 25000 },
    { from: 10000, to: null, rate: 30000 },
  ]);

  const rateByRangeValues = {
    [PRICING_RATE_BY_PRICE]: deliveryDependsOnPrice,
    [PRICING_RATE_FIXED]: deliveryFixedPrice,
  };

  const [hasFreeDelivery, setHasFreeDelivery] = useState(false);
  const [minimumOrderPrice, setMinimumOrderPrice] = useState("");
  const [minimumOrderPriceComplimentary, setMinimumOrderPriceComplimentary] =
    useState("");
  const DEFAULT_MANUAL_POLYGON = useMemo(
    () => [
      [+businessLocation.latitude - 0.03, +businessLocation.longitude - 0.085],
      [+businessLocation.latitude - 0.03, +businessLocation.longitude + 0.085],
      [+businessLocation.latitude + 0.03, +businessLocation.longitude + 0.085],
      [+businessLocation.latitude + 0.03, +businessLocation.longitude - 0.085],
    ],
    []
  );
  const [deliveryType, setDeliveryType] = useState(null);
  const [manualPolygons, setManualPolygons] = useState(DEFAULT_MANUAL_POLYGON);

  useEffect(() => {
    const duplicateDeliveryRule = localStorage.getItem("duplicateDeliveryRule")
      ? JSON.parse(localStorage.getItem("duplicateDeliveryRule"))
      : null;
    const deliveryRuleObj = deliveryRuleId
      ? _deliveryRule
      : duplicateDeliveryRule;
    if (deliveryRuleObj) {
      if (!deliveryRuleObj?.pricing_rule.rate_by_range) {
        setDeliveryRulePricingType(DELIVERY_RULE_PRICING_TYPES[2]);
      } else if (
        deliveryRuleObj?.pricing_rule.rate_by_range &&
        deliveryRuleObj?.pricing_rule.rate_by_range.length === 1
      ) {
        setDeliveryRulePricingType(DELIVERY_RULE_PRICING_TYPES[0]);
        setDeliveryFixedPrice(deliveryRuleObj?.pricing_rule.rate_by_range);
      } else {
        const foundedPricingRule = DELIVERY_RULE_PRICING_TYPES.find(
          (option) => option.name === deliveryRuleObj?.pricing_rule.type
        );
        if (foundedPricingRule) {
          setDeliveryRulePricingType(foundedPricingRule);
          setDeliveryDependsOnPrice(
            deliveryRuleObj?.pricing_rule.rate_by_range
          );
        }
      }
      setDeliveryRuleTitle(deliveryRuleObj?.title);
      setHasFreeDelivery(
        typeof deliveryRuleObj?.pricing_rule.minimum_price_free_delivery !==
          "undefined"
      );
      setMinimumOrderPriceComplimentary(
        deliveryRuleObj?.pricing_rule.minimum_price_free_delivery
      );
      setMinimumOrderPrice(
        typeof deliveryRuleObj?.pricing_rule.minimum_order_price !== "undefined"
          ? deliveryRuleObj?.pricing_rule.minimum_order_price
          : ""
      );
      setDeliveryType(deliveryRuleObj?.delivery_type?.id);
      if (deliveryRuleObj?.chips) {
        const chipsArray = Array.isArray(deliveryRuleObj.chips)
          ? deliveryRuleObj.chips
          : Object.values(deliveryRuleObj.chips);
        const chips = chipsArray.map((title, index) => ({
          title,
          points: deliveryRuleObj?.zones?.[index]?.map(([lat, lng]) => ({
            lat,
            lng,
          })),
        }));
        if (deliveryRuleObj?.creation_type === DELIVERY_RULE_CREATION_TYPE_CITY)
          setCitiesChips(chips);
        if (
          deliveryRuleObj?.creation_type ===
          DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD
        )
          setNeighbourhoodsChips(chips);
      }
      if (deliveryRuleObj?.pricing_rule?.type === PRICING_RATE_FREE) {
        setDeliveryDependsOnPrice([
          { from: 0, to: 10000, rate: 25000 },
          { from: 10000, to: null, rate: 30000 },
        ]);
        setDeliveryFixedPrice([{ from: 0, to: null, rate: 2000 }]);
      }
      const polygonsTypes = {
        [DELIVERY_RULE_CREATION_TYPE_MANUAL]:
          deliveryRuleObj?.zones?.[0] || DEFAULT_MANUAL_POLYGON,
        [DELIVERY_RULE_CREATION_TYPE_CITY]: [],
        [DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD]: [],
      };
      setDeliveryRuleCreationType(deliveryRuleObj?.creation_type);
      setManualPolygons(polygonsTypes[deliveryRuleObj?.creation_type]);
    } else {
      const polygonsTypes = {
        [DELIVERY_RULE_CREATION_TYPE_MANUAL]: DEFAULT_MANUAL_POLYGON,
        [DELIVERY_RULE_CREATION_TYPE_CITY]: [],
        [DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD]: [],
      };
      setDeliveryRuleCreationType(DELIVERY_RULE_CREATION_TYPE_MANUAL);
      setManualPolygons(polygonsTypes[DELIVERY_RULE_CREATION_TYPE_MANUAL]);
    }
  }, [_deliveryRule, deliveryRuleId]);

  useEffect(() => {
    if (localStorage.getItem("adminDeliverySelectedBranch") && isSuper)
      setSelectedBranch(localStorage.getItem("adminDeliverySelectedBranch"));
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      _getDeliveryTypesWithoutPagination(SHOPPING_PLUGIN, selectedBranch);
      _getDeliveryRules(SHOPPING_PLUGIN, selectedBranch);
    }, 500);
  }, [selectedBranch]);

  useEffect(() => {
    if (
      deliveryTypesWithoutPagination?.[0] &&
      !deliveryRuleId &&
      !localStorage.getItem("duplicateDeliveryRule")
    ) {
      setDeliveryType(deliveryTypesWithoutPagination[0].id);
    }
  }, [deliveryTypesWithoutPagination, deliveryRuleId]);
  const manualMapOptions = useMemo(() => {
    const polygonsTypes = {
      [DELIVERY_RULE_CREATION_TYPE_MANUAL]: [],
      [DELIVERY_RULE_CREATION_TYPE_CITY]: citiesChips
        .filter(onlyUnique)
        .map((city) => city.points.map((point) => [point.lat, point.lng])),
      [DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD]: neighbourhoodsChips
        .filter(onlyUnique)
        .map((neighbourhood) =>
          neighbourhood.points.map((point) => [point.lat, point.lng])
        ),
    };
    const polygonTypes = {
      [DELIVERY_RULE_CREATION_TYPE_MANUAL]: {
        points:
          _deliveryRule?.creation_type === DELIVERY_RULE_CREATION_TYPE_MANUAL
            ? _deliveryRule?.zones[0]
            : DEFAULT_MANUAL_POLYGON,
        color: _deliveryRule?.color || "",
        name: _deliveryRule?.title || "",
      },
      [DELIVERY_RULE_CREATION_TYPE_CITY]: {},
      [DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD]: {},
    };
    const polygonEditFucntions = {
      [DELIVERY_RULE_CREATION_TYPE_MANUAL]: setManualPolygons,
      [DELIVERY_RULE_CREATION_TYPE_CITY]: null,
      [DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD]: null,
    };
    const finalPolygons = polygonsTypes[deliveryRuleCreationType]?.map(
      (points) => ({
        points: points.map((touple) =>
          touple.map((point) => +point.toFixed(7))
        ),
        color: _deliveryRule?.color || "",
        name: _deliveryRule?.title || "",
      })
    );
    const rulesPolygons =
      deliveryRules
        ?.filter((rule) => rule.id != deliveryRuleId)
        ?.map((rule) =>
          rule.zones.map((points) => ({
            points: points.map((touple) =>
              touple.map((point) => +point.toFixed(7))
            ),
            color: "#",
            name: rule.title,
          }))
        )
        .flat() || [];

    return {
      height: "300px",
      width: "100%",
      onPolygonCreate: null,
      onPolygonDelete: null,
      onPolygonEdit: polygonEditFucntions[deliveryRuleCreationType],
      markers: [
        {
          latitude: businessLocation.latitude,
          longitude: businessLocation.longitude,
          singleMarker: true,
        },
      ],
      center: {
        latitude: businessLocation.latitude,
        longitude: businessLocation.longitude,
      },
      ref: mapRef,
      scrollWheelZoom: true,
      zoomControl: true,
      polygon: polygonTypes[deliveryRuleCreationType],
      polygons: finalPolygons ? [...rulesPolygons, ...finalPolygons] : [],
    };
  }, [
    _deliveryRule,
    businessLocation,
    deliveryRuleCreationType,
    neighbourhoodsChips,
    citiesChips,
    manualPolygons,
    deliveryRuleId,
    deliveryRules,
  ]);
  useEffect(() => {
    if (deliveryRuleId) {
      setTimeout(() => {
        _getDeliveryRule(SHOPPING_PLUGIN, deliveryRuleId);
      }, 0);
    }
  }, [deliveryRuleId]);

  const submit = () => {
    const polygonsTypes = {
      [DELIVERY_RULE_CREATION_TYPE_MANUAL]: [manualPolygons],
      [DELIVERY_RULE_CREATION_TYPE_CITY]: citiesChips
        .filter(onlyUnique)
        .map((city) => city.points.map((point) => [point.lat, point.lng])),
      [DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD]: neighbourhoodsChips
        .filter(onlyUnique)
        .map((neighbourhood) =>
          neighbourhood.points.map((point) => [point.lat, point.lng])
        ),
    };
    const chipsOptions = {
      [DELIVERY_RULE_CREATION_TYPE_MANUAL]: [],
      [DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD]:
        neighbourhoodsChips?.map(({ title }) => title) || [],
      [DELIVERY_RULE_CREATION_TYPE_CITY]:
        citiesChips?.map(({ title }) => title) || [],
    };
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const DTO = {
      title: deliveryRuleTitle,
      color: _deliveryRule?.color || randomColor,
      type: deliveryType,
      creation_type: deliveryRuleCreationType,
      chips: chipsOptions[deliveryRuleCreationType],
      pricing_rule: {
        type: pricingRuleType[deliveryRulePricingType.name],
        rate_by_range: rateByRangeValues[deliveryRulePricingType.name],
        minimum_order_price: minimumOrderPrice,
        minimum_price_free_delivery: minimumOrderPriceComplimentary || null,
      },
      zones: polygonsTypes[deliveryRuleCreationType],
      business:
        branches?.find((branch) => branch.slug === selectedBranch)?.id ||
        businessId,
    };
    if (!minimumOrderPriceComplimentary || !hasFreeDelivery) {
      delete DTO.pricing_rule.minimum_price_free_delivery;
    }
    if (deliveryRulePricingType.name === PRICING_RATE_FREE) {
      delete DTO.pricing_rule.rate_by_range;
    }
    if (minimumOrderPrice === "") {
      delete DTO.pricing_rule.minimum_order_price;
    }

    if (deliveryRuleTitle !== "") {
      if (!deliveryRuleId) {
        _createDeliveryRule(DTO, SHOPPING_PLUGIN);
      } else {
        _updateDeliveryRule(DTO, deliveryRuleId, SHOPPING_PLUGIN);
      }
    } else {
      setError(true);
      _setSnackBarMessage(
        "You need to designate a name for your service range.",
        "fail"
      );
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Service range</title>
      </Head>
      <AdminBreadCrumb
        submitButtonText={deliveryRuleId ? "Save changes" : "Making the range"}
        deleteButtonText={deliveryRuleId ? "Remove the range" : null}
        deleteButtonAction={() => _deleteDeliveryRule(deliveryRuleId)}
        submitAction={submit}
        isLoading={loading}
      />

      <div className="row">
        <div className="col-12 col-lg-5 order-2 order-lg-1">
          <Paper elevation={1} className="mt-4">
            <div className="py-3 px-4">
              <div
                style={{ color: night }}
                className="u-fontMedium u-fontWeightBold"
              >
                The title of the range
              </div>
              <Input
                inputProps={{ maxLength: 50 }}
                label="The title of the range"
                value={deliveryRuleTitle}
                onChange={(value) => {
                  setDeliveryRuleTitle(value);
                  setError(false);
                }}
                className="mt-3"
                size="medium"
              />
              {error && (
                <div
                  style={{ color: theme.palette.error.main }}
                  className="u-font-semi-small mt-1"
                >
                  This field cannot be empty.
                </div>
              )}
            </div>
            <Divider />
            <div className="py-3 px-4">
              <div
                style={{ color: night }}
                className="u-fontMedium u-fontWeightBold mb-2"
              >
                Selection method and pricing method
              </div>
              <div
                className="u-font-semi-small w-100 text-justify"
                style={{ color: pollution, lineHeight: 1.7 }}
              >
                At this point you can take one of the methods of sending in the section
                <a
                  href={
                    isSuper
                      ? `${urlPrefix}multi_branch/settings/general/delivery`
                      : `${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/general/delivery`
                  }
                  className="u-cursor-pointer mx-1"
                  style={{
                    borderBottom: `1px solid ${process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}`,
                    color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                  }}
                >
                  {`"Submit and Determine Settings"`}
                </a>
                Made, choose to apply to this range.
              </div>
              <FormControl variant="outlined" className="w-100 mb-3 mt-1">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={deliveryType}
                  onChange={(event) => setDeliveryType(event.target.value)}
                  className="medium"
                  MenuProps={MenuProps}
                >
                  {deliveryTypesWithoutPagination?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div
                style={{ color: night }}
                className="u-fontMedium u-fontWeightBold mb-2"
              >
                How to calculate the shipping cost
              </div>
              <CustomizedSelect
                key={deliveryRulePricingType.name}
                options={DELIVERY_RULE_PRICING_TYPES}
                value={deliveryRulePricingType}
                onChangeMethod={setDeliveryRulePricingType}
              />
              {deliveryRulePricingType.name === PRICING_RATE_FIXED && (
                <Input
                  numberOnly
                  className="w-100 mt-5"
                  id="outlined-basic"
                  label="shipping cost"
                  variant="outlined"
                  value={englishNumberToPersianNumber(
                    deliveryFixedPrice[0].rate
                  )}
                  onChange={(value) => {
                    const newArray = JSON.parse(
                      JSON.stringify(deliveryFixedPrice)
                    );
                    newArray[0].rate = Number(persianToEnglishNumber(value));
                    setDeliveryFixedPrice(newArray);
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
              )}
              {deliveryRulePricingType.name === PRICING_RATE_BY_WEIGHT &&
                deliveryDependsOnWeightPrice.map((deliveryPrice, index) => (
                  <div
                    key={deliveryPrice.id}
                    className="position-relative mb-1"
                  >
                    <div className="d-flex aligm-items-center pr-3">
                      <Input
                        numberOnly
                        className="w-50 mt-5"
                        id="outlined-basic"
                        variant="outlined"
                        value={englishNumberToPersianNumber(deliveryPrice.from)}
                        onChange={(value) => {
                          const newArray = JSON.parse(
                            JSON.stringify(deliveryDependsOnWeightPrice)
                          );
                          newArray[index].from = Number(
                            persianToEnglishNumber(value)
                          );
                          newArray[index - 1].to = Number(
                            persianToEnglishNumber(value)
                          );
                          setDeliveryDependsOnWeightPrice(newArray);
                        }}
                        size="medium"
                        InputProps={{
                          className: "small",
                          endAdornment: (
                            <InputAdornment position="end">Warm</InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          className: "small",
                        }}
                        disabled={index === 0 && true}
                      />
                      <Input
                        type={
                          index === deliveryDependsOnWeightPrice.length - 1
                            ? "text"
                            : "number"
                        }
                        numberOnly={
                          index === deliveryDependsOnWeightPrice.length - 1
                        }
                        className="w-50 mt-5"
                        variant="outlined"
                        value={
                          deliveryPrice.to === null
                            ? "to the top"
                            : englishNumberToPersianNumber(deliveryPrice.to)
                        }
                        onChange={(value) => {
                          const newArray = JSON.parse(
                            JSON.stringify(deliveryDependsOnWeightPrice)
                          );
                          newArray[index].to = Number(
                            persianToEnglishNumber(value)
                          );
                          newArray[index + 1].from = Number(
                            persianToEnglishNumber(value)
                          );
                          setDeliveryDependsOnWeightPrice(newArray);
                        }}
                        size="medium"
                        InputProps={{
                          className: "small",
                          endAdornment: index !==
                            deliveryDependsOnWeightPrice.length - 1 && (
                            <InputAdornment position="end">Warm</InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          className: "small",
                        }}
                        disabled={
                          index === deliveryDependsOnWeightPrice.length - 1 &&
                          true
                        }
                      />
                    </div>
                    <div
                      style={{
                        borderTop: "1px dashed #CCD4D7",
                        borderRight: "1px dashed #CCD4D7",
                        borderBottom: "1px dashed #CCD4D7",
                        borderRadius: 2,
                        width: 15,
                        height: 56,
                        top: 47,
                      }}
                      className="position-absolute"
                    ></div>
                    {index > 1 && (
                      <IconButton
                        className="position-absolute p-1"
                        style={{ marginRight: -16, top: 58, color: cement }}
                        onClick={() => {
                          const newArray = JSON.parse(
                            JSON.stringify(deliveryDependsOnWeightPrice)
                          );
                          if (
                            index !==
                            deliveryDependsOnWeightPrice.length - 1
                          ) {
                            newArray[index + 1].from = newArray[index].from;
                          }
                          newArray.splice(index, 1);
                          newArray[newArray.length - 1].to = null;
                          setDeliveryDependsOnWeightPrice(newArray);
                        }}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    )}
                    <div className="pr-3">
                      <Input
                        numberOnly
                        className="w-100 mt-3"
                        label="shipping cost"
                        variant="outlined"
                        value={englishNumberToPersianNumber(deliveryPrice.rate)}
                        onChange={(value) => {
                          const newArray = JSON.parse(
                            JSON.stringify(deliveryDependsOnWeightPrice)
                          );
                          newArray[index].rate = Number(
                            persianToEnglishNumber(value)
                          );
                          setDeliveryDependsOnWeightPrice(newArray);
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
                    </div>
                    {index === deliveryDependsOnWeightPrice.length - 1 && (
                      <div
                        className="d-flex align-items-center mt-4"
                        onClick={() => {
                          const newArray = JSON.parse(
                            JSON.stringify(deliveryDependsOnWeightPrice)
                          );
                          newArray[newArray.length - 1].to =
                            newArray[newArray.length - 1].from + 200;
                          newArray.push({
                            from: Number(
                              newArray[newArray.length - 1].from + 200
                            ),
                            to: null,
                            price: Number(deliveryPrice.price) + 100,
                          });
                          setDeliveryDependsOnWeightPrice(newArray);
                        }}
                      >
                        <IconButton style={{ marginRight: -14 }}>
                          <AddCircleOutlineIcon color="primary" />
                        </IconButton>
                        <span
                          className="u-fontMedium u-cursor-pointer"
                          style={{
                            color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                          }}
                        >
                          Add new interval
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              {deliveryRulePricingType.name === PRICING_RATE_BY_PRICE &&
                deliveryDependsOnPrice.map((deliveryPrice, index) => (
                  <div
                    key={deliveryPrice.id}
                    className="position-relative mb-1"
                  >
                    <div className="d-flex aligm-items-center pr-3">
                      <Input
                        numberOnly
                        className="w-50 mt-5"
                        variant="outlined"
                        value={englishNumberToPersianNumber(deliveryPrice.from)}
                        onChange={(value) => {
                          const newArray = JSON.parse(
                            JSON.stringify(deliveryDependsOnPrice)
                          );
                          newArray[index].from = Number(
                            persianToEnglishNumber(value)
                          );
                          newArray[index - 1].to = Number(
                            persianToEnglishNumber(value)
                          );
                          setDeliveryDependsOnPrice(newArray);
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
                        disabled={index === 0 && true}
                      />
                      <Input
                        numberOnly={index === deliveryDependsOnPrice.length - 1}
                        className="w-50 mt-5"
                        variant="outlined"
                        value={
                          deliveryPrice.to === null
                            ? "to the top"
                            : englishNumberToPersianNumber(deliveryPrice.to)
                        }
                        onChange={(value) => {
                          const newArray = JSON.parse(
                            JSON.stringify(deliveryDependsOnPrice)
                          );
                          newArray[index].to = Number(
                            persianToEnglishNumber(value)
                          );
                          newArray[index + 1].from = Number(
                            persianToEnglishNumber(value)
                          );
                          setDeliveryDependsOnPrice(newArray);
                        }}
                        size="medium"
                        InputProps={{
                          className: "small",
                          endAdornment: index !==
                            deliveryDependsOnPrice.length - 1 && (
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
                        disabled={
                          index === deliveryDependsOnPrice.length - 1 && true
                        }
                        error={deliveryPrice.from > deliveryPrice.to}
                      />
                    </div>
                    <div
                      style={{
                        borderTop: "1px dashed #CCD4D7",
                        borderRight: "1px dashed #CCD4D7",
                        borderBottom: "1px dashed #CCD4D7",
                        borderRadius: 2,
                        width: 15,
                        height: 56,
                        top: 47,
                      }}
                      className="position-absolute"
                    ></div>
                    {index > 1 && (
                      <IconButton
                        className="position-absolute p-1"
                        style={{ marginRight: -16, top: 58, color: cement }}
                        onClick={() => {
                          const newArray = JSON.parse(
                            JSON.stringify(deliveryDependsOnPrice)
                          );
                          if (index !== deliveryDependsOnPrice.length - 1) {
                            newArray[index + 1].from = newArray[index].from;
                          }
                          newArray.splice(index, 1);
                          newArray[newArray.length - 1].to = null;
                          setDeliveryDependsOnPrice(newArray);
                        }}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    )}
                    <div className="pr-3">
                      <Input
                        numberOnly
                        className="w-100 mt-3"
                        label="shipping cost"
                        variant="outlined"
                        value={englishNumberToPersianNumber(deliveryPrice.rate)}
                        onChange={(value) => {
                          const newArray = JSON.parse(
                            JSON.stringify(deliveryDependsOnPrice)
                          );
                          newArray[index].rate = Number(
                            persianToEnglishNumber(value)
                          );
                          setDeliveryDependsOnPrice(newArray);
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
                    </div>
                    {index === deliveryDependsOnPrice.length - 1 && (
                      <div
                        className="d-flex align-items-center mt-4"
                        onClick={() => {
                          const newArray = JSON.parse(
                            JSON.stringify(deliveryDependsOnPrice)
                          );
                          newArray[newArray.length - 1].to =
                            newArray[newArray.length - 1].from + 200;
                          newArray.push({
                            from: Number(
                              newArray[newArray.length - 1].from + 200
                            ),
                            to: null,
                          });
                          setDeliveryDependsOnPrice(newArray);
                        }}
                      >
                        <IconButton style={{ marginRight: -14 }}>
                          <AddCircleOutlineIcon color="primary" />
                        </IconButton>
                        <span
                          className="u-fontMedium u-cursor-pointer"
                          style={{
                            color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                          }}
                        >
                          Add new interval
                        </span>
                      </div>
                    )}
                  </div>
                ))}

              {deliveryRulePricingType.name !== PRICING_RATE_FREE && (
                <div className="d-flex align-items-center mt-4">
                  <Checkbox
                    checked={hasFreeDelivery}
                    onChange={(event) =>
                      setHasFreeDelivery(event.target.checked)
                    }
                    inputProps={{ "aria-label": "primary  checkbox" }}
                    style={{ marginRight: -12 }}
                    // className="pt-0"
                    color="primary"
                  />
                  <div
                    className="text-justify u-font-semi-small"
                    style={{ color: graphite }}
                  >
                    Do you wish
                    Consider the shipping fee for free?
                  </div>
                </div>
              )}

              {hasFreeDelivery && (
                <Input
                  numberOnly
                  className="w-100 mt-3"
                  label="Higher purchases of the amount"
                  variant="outlined"
                  value={englishNumberToPersianNumber(
                    minimumOrderPriceComplimentary
                  )}
                  onChange={(value) =>
                    setMinimumOrderPriceComplimentary(
                      Number(persianToEnglishNumber(value))
                    )
                  }
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
              )}
            </div>
          </Paper>
          <Paper
            elevation={1}
            className="mt-3 py-3 px-4"
            style={{ marginBottom: 80 }}
          >
            <div
              style={{ color: night }}
              className="u-fontMedium u-fontWeightBold mb-2"
            >
              minimum order
            </div>
            <div
              style={{ color: pollution }}
              className="u-font-semi-small text-justify"
            >
              If the customer order is less than this amount is possible
              There will be no order shipping.
            </div>
            <Input
              numberOnly
              className="w-100 mt-5"
              label="The minimum order amount"
              variant="outlined"
              value={
                minimumOrderPrice !== ""
                  ? englishNumberToPersianNumber(minimumOrderPrice)
                  : minimumOrderPrice
              }
              onChange={(value) =>
                value === ""
                  ? setMinimumOrderPrice(value)
                  : setMinimumOrderPrice(Number(persianToEnglishNumber(value)))
              }
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
          </Paper>
        </div>
        <div className="col-12 col-lg-7 order-1 order-lg-2">
          <Paper elevation={1} className="mt-4 py-3 px-4">
            <div
              style={{ color: night }}
              className="u-fontMedium u-fontWeightBold mb-2"
            >
              Range
            </div>
            <div
              style={{ color: pollution }}
              className="u-font-semi-small mb-4"
            >
              Specify your desired range on the map.
            </div>
            <div className="mb-3 d-flex flex-column flex-md-row  justify-content-between align-items-md-center">
              <FormControl
                variant="outlined"
                className={`mb-3 mb-md-0 ${
                  deliveryRuleCreationType ===
                    DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD ||
                  deliveryRuleCreationType === DELIVERY_RULE_CREATION_TYPE_CITY
                    ? " ml-md-2 "
                    : ""
                }`}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={deliveryRuleCreationType}
                  onChange={(event) =>
                    setDeliveryRuleCreationType(+event.target.value)
                  }
                  style={{
                    width: minWidth768 ? 110 : "100%",
                    height: 39,
                  }}
                >
                  {Object.entries(DELIVERY_RULE_CREATION_TYPE_CHOICES).map(
                    ([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              {deliveryRuleCreationType ===
                DELIVERY_RULE_CREATION_TYPE_CITY && (
                <>
                  <Autocomplete
                    multiple
                    disableClearable
                    options={searchedCity || [{ title: "" }]}
                    getOptionLabel={(option) => option.title}
                    filterSelectedOptions
                    onInputChange={(event) =>
                      _getSearchCitySearch(
                        SHOPPING_PLUGIN,
                        event?.target?.value
                      )
                    }
                    onChange={(event, newValue) => {
                      setCitiesChips(newValue.filter(onlyUnique));
                    }}
                    value={citiesChips}
                    renderTags={(tagValue, getTagProps) =>
                      citiesChips.map((option, index) => (
                        <Chip
                          key={option.title}
                          label={option.title}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    className="flex-1"
                    renderInput={(params) => (
                      <Input
                        {...params}
                        variant="outlined"
                        label="City"
                        multiline
                      />
                    )}
                  />
                </>
              )}
              {deliveryRuleCreationType ===
                DELIVERY_RULE_CREATION_TYPE_NEIGHBORHOOD && (
                <>
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                            .MuiAutocomplete-endAdornment {
                              top: calc(50% - 14px);
                              left : 0px !important;
                              right : unset !important;
                            }
                            .MuiChip-deleteIcon {
                              margin : 0px !important ; 
                            }
                          `,
                    }}
                  ></style>
                  <Autocomplete
                    multiple
                    disableClearable
                    options={searchedneighborhood || [{ title: "" }]}
                    getOptionLabel={(option) =>
                      `${option.title} (${option.city_name})`
                    }
                    filterSelectedOptions
                    onInputChange={(event) =>
                      _getSearchNeighborhoodSearch(
                        SHOPPING_PLUGIN,
                        event?.target?.value
                      )
                    }
                    value={neighbourhoodsChips}
                    onChange={(event, newValue) => {
                      setNeighbourhoodsChips(newValue.filter(onlyUnique));
                    }}
                    renderTags={(tagValue, getTagProps) =>
                      neighbourhoodsChips.map((option, index) => (
                        <Chip
                          key={option.title}
                          label={option.title}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    className="flex-1"
                    renderInput={(params) => (
                      <Input
                        {...params}
                        variant="outlined"
                        label="The Neighbourhood"
                        multiline
                      />
                    )}
                  />
                </>
              )}
            </div>
            {!localLoading &&
              !loading &&
              (!deliveryRuleId || _deliveryRule) && (
                <Map options={manualMapOptions} />
              )}
          </Paper>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  _deliveryRule: makeSelectDeliveryRule(SHOPPING_PLUGIN),
  deliveryTypesWithoutPagination:
    makeSelectDeliveryTypesWithoutPagination(SHOPPING_PLUGIN),
  businessLocation: makeSelectBusinessLocation(),
  searchedCity: makeSelectSearchedCity(SHOPPING_PLUGIN),
  searchedneighborhood: makeSelectSearchedNeighborhood(SHOPPING_PLUGIN),
  loading: makeSelectLoading(),
  citiesByIds: makeSelectCitiesByIds(),
  deliveryRules: makeSelectDeliveryRules(SHOPPING_PLUGIN),
  branches: makeSelectBranches(),
  businessId: makeSelectBusinessId(),
  urlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getDeliveryRules: (pluginName, selectedBranch) =>
      dispatch(getDeliveryRules(pluginName, selectedBranch)),
    _getDeliveryRule: (pluginName, id) =>
      dispatch(getDeliveryRule(pluginName, id)),
    _getDeliveryTypesWithoutPagination: (pluginName, selectedBranch) =>
      dispatch(getDeliveryTypesWithoutPagination(pluginName, selectedBranch)),
    _deleteDeliveryRule: (data) => dispatch(deleteDeliveryRule(data)),
    _getSearchCitySearch: (pluginName, data) =>
      dispatch(getSearchCitySearch(pluginName, data)),
    _getSearchNeighborhoodSearch: (pluginName, data) =>
      dispatch(getSearchNeighborhoodSearch(pluginName, data)),
    _updateDeliveryRule: (data, id, pluginName) =>
      dispatch(updateDeliveryRule(data, id, pluginName)),
    _createDeliveryRule: (data, pluginName) =>
      dispatch(createDeliveryRule(data, pluginName)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminDeliveryZone);
