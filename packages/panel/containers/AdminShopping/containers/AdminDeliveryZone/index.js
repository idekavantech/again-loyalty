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
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import {
  makeSelectAdminUrlPrefix,
  makeSelectDeliveryRules,
  makeSelectDeliveryTypes,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { coal, graphite, night, pollution, smoke } from "@saas/utils/colors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";
import TwoWheelerRoundedIcon from "@material-ui/icons/TwoWheelerRounded";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import AccessTimeRoundedIcon from "@material-ui/icons/AccessTimeRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import AddNewItemSection from "@saas/components/AddNewItemSection";
import useTheme from "@material-ui/core/styles/useTheme";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Input from "@saas/components/Input";
import {
  deleteDeliveryRule,
  getDeliveryRules,
  getDeliveryTypes,
  updateDeliveryRule,
} from "@saas/stores/plugins/actions";
import {
  makeSelectBranches,
  makeSelectBusiness,
  makeSelectBusinessLocation,
} from "@saas/stores/business/selector";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import {
  DELIVERY_TYPE_CUSTOM,
  DELIVERY_TYPE_FAST,
  DELIVERY_TYPE_SCHEDULED,
  PRICING_RATE_BY_PRICE,
  PRICING_RATE_FREE,
  timesTypes,
} from "@saas/plugins/Shopping/constants";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Icon from "@saas/components/Icon";
import { $ } from "@saas/icons";
import LocationSelector from "components/LocationSelector";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";

const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
const LOADING_STATE = "LOADING_STATE";
const DEFAULT_STATE = "DEFAULT_STATE";
const LOCATION_REQUIRED_STATE = "LOCATION_REQUIRED_STATE";
const DELIVERY_TYPE_REQUIRED_STATE = "DELIVERY_TYPE_REQUIRED_STATE";
const EMPTY_STATE = "EMPTY_STATE";

function AdminShoppingDeliveryZone({
  _getDeliveryRules,
  deliveryRules,
  businessLocation,
  _updateDeliveryRule,
  _deleteDeliveryRule,
  _getDeliveryTypes,
  deliveryTypes,
  isLoading,
  branches,
  isSuper,
  urlPrefix,
  business,
  pluginsData,
  plugin = SHOPPING_PLUGIN,
}) {
  const { minWidth768 } = useResponsive();
  const router = useRouter();
  const [selectedBranch, setSelectedBranch] = useState(
    isSuper ? branches?.[0]?.slug : null
  );
  const [searchedZone, setSearchZone] = useState(null);
  const [isDeleteDialogBoxOpen, setDeleteDialogBoxOpen] = useState(false);
  const [isActivationDialogBoxOpen, setActivationDialogBoxOpen] =
    useState(false);
  const [selectedRule, setSelectRule] = useState(null);
  const pluginUrl = pluginsData[plugin].plugin_url;

  const handleOnCloseDeleteDialog = () => {
    setDeleteDialogBoxOpen(false);
  };
  const handleOnCloseActivationDialog = () => {
    setActivationDialogBoxOpen(false);
  };
  useEffect(() => {
    if (localStorage.getItem("adminDeliverySelectedBranch") && isSuper)
      setSelectedBranch(localStorage.getItem("adminDeliverySelectedBranch"));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      _getDeliveryRules(SHOPPING_PLUGIN, selectedBranch);
      _getDeliveryTypes(SHOPPING_PLUGIN, selectedBranch);
    }, 0);
    localStorage.removeItem("duplicateDeliveryRule");
  }, [selectedBranch]);

  useEffect(() => {
    if (deliveryRules) setFilteredZones(deliveryRules);
  }, [deliveryRules]);

  const [open, setOpen] = useState(false);
  const inputRef2 = useRef(null);
  const theme = useTheme();
  const [filteredZones, setFilteredZones] = useState(null);

  useEffect(() => {
    if (searchedZone) {
      if (searchedZone.title === "All") {
        setFilteredZones(deliveryRules);
      } else {
        const filtered = deliveryRules.filter(
          (rule) => rule.id === searchedZone.id
        );
        setFilteredZones(filtered);
      }
    }
  }, [searchedZone]);

  const mapOptions = useMemo(
    () => ({
      height: "300px",
      width: "100%",
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
      scrollWheelZoom: false,
      zoomControl: true,
      polygons: filteredZones
        ? filteredZones
            .map((rule) =>
              rule.zones.map((points) => ({
                points: points.map((touple) =>
                  touple.map((point) => +point.toFixed(7))
                ),
                color: rule.color,
                name: rule.title,
                click: () =>
                  router.push(
                    `${urlPrefix}${pluginUrl}/settings/general/delivery/zones/${rule.id}`
                  ),
              }))
            )
            .flat()
        : null,
    }),
    [filteredZones]
  );
  const currentState = useMemo(() => {
    let _currentState = LOADING_STATE;
    if (!isLoading) {
      if (!Object.values(businessLocation).every((value) => Boolean(value))) {
        _currentState = LOCATION_REQUIRED_STATE;
      } else if (!deliveryTypes?.length) {
        _currentState = DELIVERY_TYPE_REQUIRED_STATE;
      } else if (deliveryRules?.length) {
        _currentState = DEFAULT_STATE;
      } else {
        _currentState = EMPTY_STATE;
      }
    }
    return _currentState;
  }, [businessLocation, deliveryTypes, deliveryRules, isLoading]);

  const renderStates = {
    [LOADING_STATE]: <LoadingIndicator />,
    [DEFAULT_STATE]: (
      <Paper elevation={1} className="mt-4 py-3 px-2 position-relative">
        <div className="d-flex flex-column flex-lg-row">
          <div className="col-12 col-lg-6 order-2 px-2 order-lg-1 mt-3 mt-lg-0">
            <AddNewItemSection
              onClick={() =>
                router.push(
                  `${urlPrefix}${pluginUrl}/settings/general/delivery/zones/new`
                )
              }
              className="mb-2 py-2 px-3"
              title="The new range"
            />
            <div className="w-100">
              <Autocomplete
                open={open}
                onOpen={() => {
                  setTimeout(() => {
                    setOpen(true);
                  }, 100);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                options={
                  deliveryRules && [
                    { id: uniqueid(), title: "All" },
                    ...deliveryRules,
                  ]
                }
                autoHighlight
                onChange={(event, newValue) => {
                  setSearchZone(newValue);
                }}
                PaperComponent={(props) => (
                  <Paper
                    {...props}
                    style={{
                      ...props.style,
                      marginTop: 4,
                      borderRadius: "0 0 4px 4px",
                    }}
                    elevation={1}
                  />
                )}
                getOptionLabel={(option) => option.title}
                renderOption={(option) => <span>{option.title}</span>}
                ListboxProps={{ style: { fontSize: 13 } }}
                renderInput={(params) => (
                  <Input
                    {...params}
                    size="small"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                    inputRef={inputRef2}
                    label="Search the range"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment
                          style={{ position: "absolute", left: 3 }}
                          className="u-pointer-events-none"
                          position="start"
                        >
                          <SearchRoundedIcon
                            className="ml-1"
                            style={{
                              color: theme.palette.text.disabled,
                            }}
                            fontSize="small"
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </div>
            <style
              dangerouslySetInnerHTML={{
                __html: `
              /* width */
              ::-webkit-scrollbar {
                width: 7px;
              }
              
              /* Track */
              ::-webkit-scrollbar-track {
                background: rgba(0, 80, 255, 0.1); 
              }
               
              /* Handle */
              ::-webkit-scrollbar-thumb {
                background: rgba(0, 80, 255, 0.3); 
                border-radius:5px;
              }
              
              /* Handle on hover */
              ::-webkit-scrollbar-thumb:hover {
                background: rgba(0, 80, 255, 0.7); 
              }
              `,
              }}
            ></style>
            <div
              style={{
                maxHeight: 370,
                overflow: "auto",
                direction: "ltr",
              }}
              className="mt-3 pr-1"
            >
              {filteredZones &&
                filteredZones.map((deliveryRule) => {
                  const isZoneActive = deliveryRule.is_active;
                  const isFlatRate =
                    deliveryRule?.pricing_rule?.rate_by_range &&
                    deliveryRule?.pricing_rule?.rate_by_range.length === 1;
                  const hasMinimumOrderPrice =
                    typeof deliveryRule?.pricing_rule?.minimum_order_price !==
                    "undefined";
                  const hasDeliveryTime =
                    deliveryRule?.delivery_type?.timing.type !==
                    DELIVERY_TYPE_SCHEDULED;
                  const isDeliveryPriceFree =
                    deliveryRule?.pricing_rule?.type === PRICING_RATE_FREE ||
                    (deliveryRule?.pricing_rule?.type ===
                      PRICING_RATE_BY_PRICE &&
                      deliveryRule?.pricing_rule?.rate_by_range[0]?.rate === 0);
                  const delvieryTime =
                    hasDeliveryTime &&
                    deliveryRule?.delivery_type?.timing.type ===
                      DELIVERY_TYPE_FAST
                      ? deliveryRule?.delivery_type?.timing
                          .maximum_delivery_time
                        ? `${englishNumberToPersianNumber(
                            deliveryRule?.delivery_type?.timing
                              .maximum_delivery_time?.value
                          )} ${
                            timesTypes[
                              deliveryRule?.delivery_type?.timing
                                .maximum_delivery_time?.type
                            ]
                          }`
                        : null
                      : deliveryRule?.delivery_type?.timing.type ===
                        DELIVERY_TYPE_CUSTOM
                      ? `${
                          deliveryRule?.delivery_type?.timing.delivery_interval
                            .from +
                          " until the" +
                          deliveryRule?.delivery_type?.timing.delivery_interval
                            .to +
                          " " +
                          timesTypes[
                            deliveryRule?.delivery_type?.timing &&
                              deliveryRule?.delivery_type?.timing
                                .delivery_interval.type
                          ] +
                          " Work"
                        }`
                      : null;
                  return (
                    <div
                      key={deliveryRule.id}
                      style={{
                        border: !isZoneActive && "1px solid #E0E5E8",
                        borderRadius: 8,
                        overflow: "hidden",
                        direction: "rtl",
                      }}
                      className="delivery-zones-card position-relative mb-3"
                    >
                      <div
                        style={{
                          backgroundColor: !isZoneActive
                            ? smoke
                            : `#${deliveryRule?.color}`,
                          width: 4,
                          overflow: "hidden",
                        }}
                        className="h-100 position-absolute"
                      />
                      <div className="py-2 px-3">
                        <div
                          className="d-flex align-items-center justify-content-between"
                          style={{ minHeight: 45 }}
                        >
                          <div>{deliveryRule?.title}</div>
                          <div
                            style={{ marginLeft: -12 }}
                            className="d-flex align-items-center"
                          >
                            <div className="delivery-zones-card-items">
                              <div
                                onClick={() => {
                                  localStorage.setItem(
                                    "duplicateDeliveryRule",
                                    JSON.stringify(deliveryRule)
                                  );
                                  router.push(
                                    `${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/general/delivery/zones/new`
                                  );
                                }}
                                style={{
                                  borderRadius: "50%",
                                  width: 24,
                                  height: 24,
                                }}
                                className="delivery-zones-card-item d-flex align-items-center justify-content-center u-cursor-pointer ml-1"
                              >
                                <FilterNoneIcon
                                  color="primary"
                                  style={{ fontSize: 13 }}
                                  className="delivery-zones-card-sub-item"
                                />
                              </div>
                              <div
                                style={{
                                  borderRadius: "50%",
                                  width: 24,
                                  height: 24,
                                }}
                                className="delivery-zones-card-item d-flex align-items-center justify-content-center u-cursor-pointer ml-1"
                                onClick={() => {
                                  setSelectRule(deliveryRule?.id);
                                  setDeleteDialogBoxOpen(true);
                                }}
                              >
                                <DeleteOutlineIcon
                                  color="primary"
                                  style={{ fontSize: 13 }}
                                  className="delivery-zones-card-sub-item"
                                />
                              </div>
                              <div
                                style={{
                                  borderRadius: 24,
                                  width: 61,
                                  height: 24,
                                }}
                                className="delivery-zones-card-item d-flex align-items-center justify-content-center u-cursor-pointer"
                                onClick={() =>
                                  router.push(
                                    `${urlPrefix}${pluginUrl}/settings/general/delivery/zones/${deliveryRule?.id}`
                                  )
                                }
                              >
                                <EditRoundedIcon
                                  color="primary"
                                  style={{ fontSize: 13 }}
                                  className="delivery-zones-card-sub-item"
                                />
                                <span
                                  style={{
                                    color:
                                      process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                                  }}
                                  className="delivery-zones-card-sub-item u-fontVerySmall"
                                >
                                  Edit
                                </span>
                              </div>
                            </div>
                            <Switch
                              checked={deliveryRule?.is_active}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  _updateDeliveryRule(
                                    { is_active: true },
                                    deliveryRule?.id,
                                    SHOPPING_PLUGIN
                                  );
                                } else {
                                  setSelectRule(deliveryRule?.id);
                                  setActivationDialogBoxOpen(true);
                                }
                              }}
                              color="primary"
                              name="checkedB"
                              inputProps={{
                                "aria-label": "primary checkbox",
                              }}
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div
                              style={{
                                border: "1px solid #667E8A",
                                width: 19,
                                height: 19,
                                minWidth: 19,
                                minHeight: 19,
                                borderRadius: "50%",
                              }}
                              className="d-flex justify-content-center align-items-center ml-2"
                            >
                              <AttachMoneyRoundedIcon
                                style={{ color: pollution, fontSize: 13 }}
                              />
                            </div>
                            <div
                              style={{ color: pollution }}
                              className="u-fontSmall"
                            >
                              {`${
                                isDeliveryPriceFree
                                  ? "Free"
                                  : isFlatRate
                                  ? ""
                                  : "Starting out"
                              }`}
                              {`${
                                !isDeliveryPriceFree &&
                                englishNumberToPersianNumber(
                                  deliveryRule?.pricing_rule?.rate_by_range &&
                                    deliveryRule?.pricing_rule?.rate_by_range[0]
                                      .rate
                                )
                              }`}
                              &nbsp;
                              {!isDeliveryPriceFree && (
                                <Icon
                                  icon={$}
                                  width={21}
                                  height={21}
                                  color={pollution}
                                />
                              )}
                            </div>
                          </div>
                          <div className="d-flex align-items-center">
                            <div
                              style={{
                                border: "1px solid #667E8A",
                                width: 19,
                                height: 19,
                                minWidth: 19,
                                minHeight: 19,
                                borderRadius: "50%",
                              }}
                              className="d-flex justify-content-center align-items-center ml-2"
                            >
                              <TwoWheelerRoundedIcon
                                style={{ color: pollution, fontSize: 13 }}
                              />
                            </div>
                            <div
                              style={{ color: pollution }}
                              className="u-fontSmall"
                            >
                              {deliveryRule?.delivery_type?.title}
                            </div>
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-center justify-content-between mt-2"
                          style={{
                            display:
                              !hasMinimumOrderPrice &&
                              !hasDeliveryTime &&
                              "none",
                          }}
                        >
                          <div
                            className="d-flex align-items-center"
                            style={{
                              visibility: hasMinimumOrderPrice
                                ? "visible"
                                : "hidden",
                            }}
                          >
                            <div
                              style={{
                                border: "1px solid #667E8A",
                                width: 19,
                                height: 19,
                                minWidth: 19,
                                minHeight: 19,
                                borderRadius: "50%",
                              }}
                              className="d-flex justify-content-center align-items-center ml-2"
                            >
                              <ShoppingCartRoundedIcon
                                style={{ color: pollution, fontSize: 13 }}
                              />
                            </div>
                            <div
                              style={{ color: pollution }}
                              className="u-fontSmall"
                            >
                              {englishNumberToPersianNumber(
                                deliveryRule?.pricing_rule?.minimum_order_price
                              )}
                              &nbsp;
                              <Icon
                                icon={$}
                                width={21}
                                height={21}
                                color={pollution}
                              />
                            </div>
                          </div>
                          {delvieryTime && (
                            <div
                              className="d-flex align-items-center"
                              style={{
                                visibility: hasDeliveryTime
                                  ? "visible"
                                  : "hidden",
                              }}
                            >
                              <div
                                style={{
                                  border: "1px solid #667E8A",
                                  width: 19,
                                  height: 19,
                                  minWidth: 19,
                                  minHeight: 19,
                                  borderRadius: "50%",
                                }}
                                className="d-flex justify-content-center align-items-center ml-2"
                              >
                                <AccessTimeRoundedIcon
                                  style={{ color: pollution, fontSize: 13 }}
                                />
                              </div>
                              <div
                                style={{ color: pollution }}
                                className="u-fontSmall"
                              >
                                {delvieryTime}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="col-12 col-lg-6 order-1 px-2 order-lg-2">
            <Map options={mapOptions} />
          </div>
        </div>
        <Dialog
          open={isDeleteDialogBoxOpen}
          aria-describedby="alert-dialog-description"
          onClose={() => handleOnCloseDeleteDialog()}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className="d-flex justify-content-between align-items-center">
                <div
                  style={{ color: night }}
                  className="u-fontLarge u-fontWeightMedium"
                >
                  Remove the service range
                </div>
                <CloseRoundedIcon
                  className="u-cursor-pointer"
                  style={{ color: night }}
                  onClick={() => handleOnCloseDeleteDialog()}
                />
              </div>
              <div style={{ color: graphite }} className="u-fontMedium mt-4">
                {`Range"${
                  selectedRule &&
                  filteredZones.find((rule) => rule.id === selectedRule).title
                }" Will be removed. Are you sure of deleting this limited?`}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            className="justify-content-start"
            style={{ padding: "0px 24px 20px 0px" }}
          >
            <Button
              onClick={() => handleOnCloseDeleteDialog()}
              variant="outlined"
              color="primary"
              className="ml-2"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                _deleteDeliveryRule(selectedRule);
                handleOnCloseDeleteDialog();
              }}
              variant="contained"
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isActivationDialogBoxOpen}
          aria-describedby="alert-dialog-description"
          onClose={() => handleOnCloseActivationDialog()}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <div className="d-flex justify-content-between align-items-center">
                <div
                  style={{ color: night }}
                  className="u-fontLarge u-fontWeightMedium"
                >
                  Disable the service range
                </div>
                <CloseRoundedIcon
                  className="u-cursor-pointer"
                  style={{ color: night }}
                  onClick={() => handleOnCloseActivationDialog()}
                />
              </div>
              <div style={{ color: graphite }} className="u-fontMedium mt-4">
                {`Range"${
                  selectedRule &&
                  filteredZones.find((rule) => rule.id === selectedRule).title
                }" Will be disabled. Are you sure of the inactivation of this limited limited?`}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            className="justify-content-start"
            style={{ padding: "0px 24px 20px 0px" }}
          >
            <Button
              onClick={() => handleOnCloseActivationDialog()}
              variant="outlined"
              color="primary"
              className="ml-2"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                _updateDeliveryRule(
                  { is_active: false },
                  selectedRule,
                  SHOPPING_PLUGIN
                );
                handleOnCloseActivationDialog();
              }}
              variant="contained"
              color="primary"
            >
              to deactivate
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    ),
    [LOCATION_REQUIRED_STATE]: (
      <div
        style={{ width: minWidth768 ? "50%" : "75%", margin: "20% auto" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <img alt="" src={`/images/deliveryZoneNoLocation.png`} />
        <div
          style={{ color: pollution }}
          className="u-fontLarge my-4 text-center"
        >
          It is necessary to specify your service range
          First{" "}
          <span className="u-fontWeightBold" style={{ color: coal }}>
            Location
            {` ${
              isSuper
                ? branches.find((branch) => branch.title === selectedBranch)
                    ?.title
                : business.title
            } `}
            Business
          </span>{" "}
          Specify on the map.
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ direction: "ltr" }}
          endIcon={<AddRoundedIcon />}
          onClick={() => router.push(`${urlPrefix}setting/`)}
        >
          Adding my business position
        </Button>
      </div>
    ),
    [DELIVERY_TYPE_REQUIRED_STATE]: (
      <div
        style={{ width: minWidth768 ? "50%" : "75%", margin: "20% auto" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <img alt="" src={`/images/deliveryType.png`} />
        <div
          style={{ color: pollution }}
          className="u-fontLarge my-4 text-center"
        >
          To determine the range of service and shipping cost is required first{" "}
          <span className="u-fontWeightBold" style={{ color: coal }}>
            Method of sending
          </span>{" "}
          Make your mind..
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ direction: "ltr" }}
          endIcon={<AddRoundedIcon />}
          onClick={() =>
            router.push(
              `${urlPrefix}${pluginUrl}/settings/general/delivery/new`
            )
          }
        >
          Creating a sending method
        </Button>
      </div>
    ),
    [EMPTY_STATE]: (
      <div
        style={{ width: minWidth768 ? "50%" : "75%", margin: "20% auto" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <img alt="" src={`/images/deliveryZoneEmptyState.png`} />
        <div
          style={{ color: pollution }}
          className="u-fontLarge my-4 text-center"
        >
          To begin with you must choose your range and then proportionate to the range,
          Apply the desired pricing.
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ direction: "ltr" }}
          endIcon={<AddRoundedIcon />}
          onClick={() =>
            router.push(
              `${urlPrefix}${pluginUrl}/settings/general/delivery/zones/new`
            )
          }
        >
          Add the new range
        </Button>
      </div>
    ),
  };
  return (
    <>
      <div className="container">
        <Head>
          <title>Service range</title>
        </Head>
        <AdminBreadCrumb
          helpVideo={{ url: ADMIN_HELP_VIDEOS.deliveryZone.url }}
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

        {renderStates[currentState]}
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  deliveryRules: makeSelectDeliveryRules(SHOPPING_PLUGIN),
  businessLocation: makeSelectBusinessLocation(),
  deliveryTypes: makeSelectDeliveryTypes(SHOPPING_PLUGIN),
  isLoading: makeSelectLoading(),
  branches: makeSelectBranches(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  business: makeSelectBusiness(),
  pluginsData: makeSelectPlugins(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getDeliveryRules: (pluginName, slug) =>
      dispatch(getDeliveryRules(pluginName, slug)),
    _updateDeliveryRule: (data, id, pluginName) =>
      dispatch(updateDeliveryRule(data, id, pluginName, true)),
    _deleteDeliveryRule: (data) => dispatch(deleteDeliveryRule(data)),
    _getDeliveryTypes: (pluginName, slug) =>
      dispatch(getDeliveryTypes(pluginName, undefined, slug)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminShoppingDeliveryZone);
