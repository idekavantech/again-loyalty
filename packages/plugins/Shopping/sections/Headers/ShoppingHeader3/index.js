import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { getBusinessAvailableTime } from "@saas/utils/helpers/getBusinessAvailableTime";

import {
  makeSelectBusinessWorkingHours,
  makeSelectIsBranch,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import { BRANCH_SELECTION_MODAL } from "@saas/stores/ui/constants";
import { textTypes } from "@saas/utils/colors";
import {
  DELETE_ADDRESS_MODAL,
  FULFILLMENT_CARRY_OUT,
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_CAR,
  FULFILLMENT_ON_USER_SITE,
  FULFILLMENT_ON_WEBSITE,
} from "../../../constants";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import Tooltip from "@material-ui/core/Tooltip";
import {
  makeSelectAddresses,
  makeSelectedAddress,
  makeSelectIsAuthenticated,
} from "@saas/stores/user/selector";
import {
  deleteAddress,
  getAddresses,
  setSelectedAddress,
} from "@saas/stores/user/actions";
import HomeIcon from "@material-ui/icons/Home";
import Divider from "@material-ui/core/Divider";
import { useRouter } from "next/router";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const ADDRESS_SELECT_MODAL = "ADDRESS_SELECT_MODAL";
const INFORMATION_MODAL = "INFORMATION_MODAL";
const INFORMATION_MODAL_ADDRESS = "INFORMATION_MODAL_ADDRESS";
const DIRECTION_MODAL = "DIRECTION_MODAL";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  PREPARATION_TIME_BY_DAY,
  PREPARATION_TIME_BY_HOUR,
  PREPARATION_TIME_BY_MINUTE,
} from "../../constants";
import { getDeliveryInfoByUserAddress } from "../../../actions";
import { makeSelectDeliveryInfoByUserAddress } from "../../../selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { DELIVERY_INFO_LOADING } from "@saas/stores/global/constants";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import SelectAddressModal from "../../../containers/modals/SelectAddressModal";
import OutOfWorkingHours from "@saas/components/OutOfWorkingHours";
import OpenOutOfWorkingHourText from "@saas/components/OpenOutOfWorkingHourText";
import BusinessIsCloseText from "@saas/components/BusinessIsCloseText";
import ClockIcon from "@saas/icons/ClockIcon";
import MotorCycle from "@saas/icons/MotorCycle";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const gettingOrderMethods = [
  {
    id: 1,
    name: FULFILLMENT_ON_USER_SITE,
    title: "Send me",
    description: "Send me",
    icon: `/images/deliverToCustomer.svg`,
  },
  {
    id: 2,
    name: FULFILLMENT_CARRY_OUT,
    title: "delivery at your location",
    description: "Receive an order on the location of the business",
    icon: `/images/pickup.svg`,
  },
  {
    id: 3,
    name: FULFILLMENT_ON_BUSINESS_SITE,
    title: "Mill in the place",
    description: "The desired food in the restaurant space",
    icon: `/images/serve.svg`,
  },
  {
    id: 4,
    name: FULFILLMENT_ON_CAR,
    title: "Delivery by car",
    description: "Receive an order on the location of the business in the car",
    icon: `/images/deliveryByCar.svg`,
  },
  {
    id: 5,
    name: FULFILLMENT_ON_WEBSITE,
    title: "Virtual receipt",
    description: "Receive the order on a virtual way",
    icon: `/images/phonelink.svg`,
  },
];

function ShoppingHeader3({
  getUserAddressesList,
  selectedAddressIdByUser,
  isBranch,
  isMobile,
  business,
  content = {},
  customization,
  userAddresses,
  urlPrefix,
  setSelectAddressIdByUser,
  isAuthenticated,
  pluginData,
  workingHours,
  _getDeliveryInfoByUserAddress,
  deliveryInfoByUserAddress,
  isDeliveryInfoLoading,
  _deleteAddress,
}) {
  const router = useRouter();
  const currentRout = router.asPath;
  const { maxWidth335, minWith768, maxWidth1000 } = useResponsive();
  const matches = typeof isMobile === "boolean" ? !isMobile : minWith768;
  const { title: businessTitle } = business;
  const { title: { title_color: titleColor } = {} } = content;

  const {
    background: {
      background_type: backgroundType,
      background_image: backgroundImage,
      background_color: backgroundColor,
    } = {},
  } = customization;
  const [UIModals, toggleUIModals] = useState({
    [DELETE_ADDRESS_MODAL]: false,
    [ADDRESS_SELECT_MODAL]: false,
    [INFORMATION_MODAL]: false,
    [INFORMATION_MODAL_ADDRESS]: false,
    [DIRECTION_MODAL]: false,
  });
  const [deliveryTypesOptions, setDeliveryTypesOptions] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressIdToDelete, selectAddressIdToDelete] = useState(null);
  const [selectedGettingOrderMethod, setGettingOrderMethod] = useState(null);

  // Set delivery On User Site as default delivery option
  const sortDeliveryTypes = (deliveryTypes) => {
    if (
      deliveryTypes.includes(FULFILLMENT_ON_USER_SITE) &&
      deliveryTypes.indexOf(FULFILLMENT_ON_USER_SITE) > 0
    ) {
      const sortedDeliveryTypes = deliveryTypes.filter(
        (deliveryType) => deliveryType !== FULFILLMENT_ON_USER_SITE
      );
      return [FULFILLMENT_ON_USER_SITE, ...sortedDeliveryTypes];
    } else {
      return deliveryTypes;
    }
  };

  useEffect(() => {
    if (pluginData && deliveryTypesOptions?.length) {
      if (deliveryTypesOptions?.includes(FULFILLMENT_ON_USER_SITE)) {
        const defaultGettingMethod = gettingOrderMethods?.find(
          (item) => item.name === FULFILLMENT_ON_USER_SITE
        );
        setGettingOrderMethod(defaultGettingMethod);
      } else {
        const defaultGettingMethod = gettingOrderMethods?.find(
          (item) => item.name === deliveryTypesOptions[0]
        );
        setGettingOrderMethod(defaultGettingMethod);
      }
    }
  }, [pluginData, deliveryTypesOptions]);

  useEffect(() => {
    setTimeout(() => {
      getUserAddressesList();
    }, 0);
    if (pluginData?.data?.delivery_type_options) {
      const sortedDeliveryTypes = sortDeliveryTypes(
        pluginData?.data?.delivery_type_options
      );
      setDeliveryTypesOptions([...sortedDeliveryTypes]);
    } else {
      setDeliveryTypesOptions([
        FULFILLMENT_ON_USER_SITE,
        FULFILLMENT_ON_BUSINESS_SITE,
        FULFILLMENT_CARRY_OUT,
      ]);
    }
  }, []);

  const toggleModal = useCallback(
    (name, open) => {
      toggleUIModals({ ...UIModals, [name]: open });
    },
    [UIModals]
  );

  const selectedGettingOrderMethodHandler = (event, newMethod) => {
    if (newMethod !== null) {
      setGettingOrderMethod(newMethod);
    }
  };

  const openSelectAddressModalHandler = () => {
    if (isAuthenticated) {
      toggleModal(ADDRESS_SELECT_MODAL, true);
    } else {
      router.push(`${urlPrefix}/login?url=${router.asPath}`);
    }
  };

  const workingDayStart = getBusinessAvailableTime(workingHours);
  const isOpenPermanently = pluginData.data.is_open !== false;
  const isOpenOutOfWorkingHours = useMemo(
    () =>
      isBusinessOpenNow(workingHours) ||
      business?.is_open_out_of_working_hours === true,
    [workingHours, business]
  );
  const orderPreprationDuration = useMemo(
    () =>
      pluginData?.data?.maximum_pickup_time
        ? pluginData?.data?.maximum_pickup_time?.type ===
          PREPARATION_TIME_BY_DAY
          ? {
              typeName: "Day",
              value: pluginData.data.maximum_pickup_time.value,
            }
          : pluginData?.data?.maximum_pickup_time?.type ===
            PREPARATION_TIME_BY_HOUR
          ? {
              typeName: "the watch",
              value: pluginData.data.maximum_pickup_time.value,
            }
          : {
              value: pluginData.data.maximum_pickup_time.value,
              typeName: "Minutes",
            }
        : { value: 60, typeName: "Minutes" },
    [pluginData]
  );
  const deliveryPrice = useMemo(() => {
    if (deliveryInfoByUserAddress?.length) {
      const deliveryPricePerMethod = deliveryInfoByUserAddress?.map(
        (deliveryInfo) =>
          deliveryInfo?.pricing_rule?.rate_by_range?.map(
            (rateByRange) => +rateByRange.rate
          ) || []
      );
      const deliveryPriceRange = deliveryPricePerMethod.flat(); // create a new array with all sub-array elements
      if (
        deliveryPriceRange.length > 2 &&
        Math.min(...deliveryPriceRange) !== Math.max(...deliveryPriceRange)
      ) {
        return [
          priceFormatter(Math.min(...deliveryPriceRange)),
          priceFormatter(Math.max(...deliveryPriceRange)),
        ];
      }
      return [priceFormatter(Math.max(...deliveryPriceRange))];
    }
    return null;
  }, [deliveryInfoByUserAddress]);

  const preparationTime = useMemo(() => {
    if (deliveryInfoByUserAddress.length) {
      const preparationTimeTypesArray = deliveryInfoByUserAddress
        .filter(
          (deliveryInfo) =>
            deliveryInfo?.delivery_type?.timing?.maximum_delivery_time
        )
        .map((deliveryInfo) => {
          if (
            deliveryInfo?.delivery_type?.timing.maximum_delivery_time?.type ===
            PREPARATION_TIME_BY_DAY
          ) {
            const newValue =
              deliveryInfo?.delivery_type?.timing?.maximum_delivery_time
                ?.value *
              24 *
              60;
            return {
              mainType: PREPARATION_TIME_BY_DAY,
              newType: PREPARATION_TIME_BY_MINUTE,
              typeName: "Day",
              newValue,
              mainValue:
                deliveryInfo?.delivery_type?.timing?.maximum_delivery_time
                  ?.value,
            };
          } else if (
            deliveryInfo?.delivery_type?.timing?.maximum_delivery_time?.type ===
            PREPARATION_TIME_BY_HOUR
          ) {
            const newValue =
              deliveryInfo?.delivery_type?.timing.maximum_delivery_time?.value *
              60;
            return {
              mainType: PREPARATION_TIME_BY_HOUR,
              newType: PREPARATION_TIME_BY_MINUTE,
              typeName: "the watch",
              newValue,
              mainValue:
                deliveryInfo?.delivery_type?.timing?.maximum_delivery_time
                  ?.value,
            };
          }
          return {
            mainType: PREPARATION_TIME_BY_MINUTE,
            newType: PREPARATION_TIME_BY_MINUTE,
            typeName: "Minutes",
            newValue:
              deliveryInfo?.delivery_type?.timing?.maximum_delivery_time?.value,
            mainValue:
              deliveryInfo?.delivery_type?.timing?.maximum_delivery_time?.value,
          };
        });
      const preparationTimeByMinute = preparationTimeTypesArray
        .map((preparationTimeType) => +preparationTimeType?.newValue)
        .sort();
      const minimumPreparationTime = preparationTimeTypesArray.find(
        (preparationTimeType) =>
          preparationTimeType?.newValue === Math.min(...preparationTimeByMinute)
      );
      const maximumPreparationTime = preparationTimeTypesArray.find(
        (preparationTimeType) =>
          preparationTimeType?.newValue === Math.max(...preparationTimeByMinute)
      );
      if (
        maximumPreparationTime?.newValue === minimumPreparationTime?.newValue
      ) {
        return [maximumPreparationTime];
      }

      return [minimumPreparationTime, maximumPreparationTime];
    }

    return null;
  }, [deliveryInfoByUserAddress]);

  const outOfWorkingHoursPreorderText = useMemo(() => {
    if (!workingDayStart?.dayName) {
      return null;
    }
    return (
      <OutOfWorkingHours
        isSmallScreen={maxWidth335}
        workingDayStart={workingDayStart}
      />
    );
  }, [workingDayStart, maxWidth335]);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem(
        `selectedGettingOrderMethodName-${business?.id}`,
        selectedGettingOrderMethod?.name
      );
    }, 0);
  }, [selectedGettingOrderMethod]);

  useEffect(() => {
    setTimeout(() => {
      const selectedAddressByUser =
        userAddresses?.find(
          (address) => address.id === selectedAddressIdByUser
        ) ||
        userAddresses?.find(
          (address) =>
            +address.id === +localStorage.getItem("selctedAddressInMainPage")
        );

      if (
        selectedAddressByUser &&
        selectedAddressByUser?.full_address !== null &&
        selectedAddressByUser?.full_address !== undefined
      ) {
        setSelectedAddress(selectedAddressByUser);
        _getDeliveryInfoByUserAddress(
          selectedAddressByUser?.latitude,
          selectedAddressByUser?.longitude
        );
      }
    }, 0);
  }, [userAddresses, selectedAddressIdByUser, router.asPath]);

  const deleteAddressHandler = () => {
    _deleteAddress(selectedAddressIdToDelete, null);
    setSelectedAddress(null);
    toggleModal(DELETE_ADDRESS_MODAL, false);
  };

  const selectAddressHandler = (address) => {
    setSelectAddressIdByUser(address.id);
    localStorage.setItem("selctedAddressInMainPage", address.id);
    _getDeliveryInfoByUserAddress(address.latitude, address.longitude);
    setSelectedAddress(address);
  };

  const editAddressHandler = (address) => {
    router.push(
      `${urlPrefix}/checkout/address?address=${address.id}&url=${currentRout}`
    );
  };

  const openDeleteAddressDialogHandler = (address) => {
    selectAddressIdToDelete(address.id);
    toggleModal(DELETE_ADDRESS_MODAL, true);
  };

  if (matches) {
    return (
      <section
        style={{
          backgroundColor: backgroundType === "color" && backgroundColor,
          backgroundImage:
            backgroundType === "image" &&
            `linear-gradient(0deg, rgba(22, 22, 22, 0.8) 7.48%, rgba(34, 34, 34, 0.4) 55.89%, rgba(48, 48, 48, 0) 95.8%), url(${backgroundImage})`,
          backgroundOrigin: "border-box",
          backgroundPosition: "center center",
          backgroundClip: "border-box",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: 235,
        }}
        className="d-flex align-items-center align-items-center py-4"
      >
        <AssuranceDialog
          isOpen={UIModals[DELETE_ADDRESS_MODAL]}
          closeDialogHandler={toggleModal[DELETE_ADDRESS_MODAL]}
          contentText="Are you sure you want to delete your stored address?"
          dialogMainActions={deleteAddressHandler}
          dialogMainActionText="Delete"
          dialogSecondActions={() => toggleModal(DELETE_ADDRESS_MODAL, false)}
          dialogSecondActionText="Candifying"
          isMobile={isMobile}
        />
        <SelectAddressModal
          isOpen={UIModals[ADDRESS_SELECT_MODAL]}
          closeModalHandler={() => toggleModal(ADDRESS_SELECT_MODAL, false)}
          isMobile={matches}
          isTablet={maxWidth1000}
          addNewAddress={() =>
            router.push(`${urlPrefix}/checkout/address?url=${currentRout}`)
          }
          userAddresses={userAddresses}
          selectAddress={selectAddressHandler}
          selectedAddress={selectedAddress}
          editAddress={editAddressHandler}
          deleteAddress={openDeleteAddressDialogHandler}
        />
        <div className="container-fluid d-flex align-items-center px-5 h-100 w-100 position-relative">
          <div className="h-100 d-flex flex-column py-4">
            <div className="d-flex align-items-center justify-content-start mb-4">
              <h1
                className="ml-4"
                style={{ fontSize: 50, fontWeight: 700, color: titleColor }}
              >
                {businessTitle}
              </h1>
              <div className="d-flex flex-column align-items-start justify-content-center">
                {isOpenPermanently ? (
                  isOpenOutOfWorkingHours ? (
                    <OpenOutOfWorkingHourText
                      isSelectedAddressCurrect={
                        selectedAddress && preparationTime === null
                      }
                      workingDayStart={workingDayStart}
                      isBusinessOpenNow={isBusinessOpenNow(workingHours)}
                    />
                  ) : (
                    outOfWorkingHoursPreorderText
                  )
                ) : (
                  <BusinessIsCloseText />
                )}
                {preparationTime === null || !selectedAddress ? null : (
                  <div
                    style={{ color: titleColor, fontSize: 14 }}
                    className="pt-1 d-flex align-items-center justify-content-center pymethods-status"
                  >
                    {selectedGettingOrderMethod?.name ===
                    FULFILLMENT_ON_USER_SITE ? (
                      <>
                        <Tooltip title="Preparation time">
                          <div className="d-flex align-items-center justify-content-center">
                            <ClockIcon color={titleColor} />
                            {isDeliveryInfoLoading ? (
                              <Skeleton
                                style={{
                                  backgroundColor: "#94949433",
                                  width: 75,
                                }}
                              />
                            ) : preparationTime === null || !selectedAddress ? (
                              <div>out of range</div>
                            ) : preparationTime?.length > 1 ? (
                              preparationTime[0]?.mainType ===
                              preparationTime[1]?.mainType ? (
                                <div>
                                  {englishNumberToPersianNumber(
                                    preparationTime[0]?.mainValue
                                  )}{" "}
                                  until the{" "}
                                  {englishNumberToPersianNumber(
                                    preparationTime[1]?.mainValue
                                  ) +
                                    " " +
                                    preparationTime[1]?.typeName}
                                </div>
                              ) : (
                                <div>
                                  {englishNumberToPersianNumber(
                                    preparationTime[0]?.mainValue
                                  ) +
                                    " " +
                                    preparationTime[0]?.typeName}{" "}
                                  until the{" "}
                                  {englishNumberToPersianNumber(
                                    preparationTime[1]?.mainValue
                                  ) +
                                    " " +
                                    preparationTime[1]?.typeName}
                                </div>
                              )
                            ) : (
                              <div>
                                {englishNumberToPersianNumber(
                                  preparationTime[0]?.mainValue
                                ) +
                                  " " +
                                  preparationTime[0]?.typeName}
                              </div>
                            )}
                          </div>
                        </Tooltip>
                        <div className="mx-4" style={{ color: titleColor }}>
                          .
                        </div>
                        <Tooltip title="shipping cost">
                          <div
                            style={{ color: titleColor }}
                            className="d-flex align-items-center justify-content-center"
                          >
                            <MotorCycle color={titleColor} />

                            {selectedAddress ? (
                              deliveryPrice === null ? (
                                <Skeleton
                                  style={{
                                    backgroundColor: "#94949433",
                                    width: 75,
                                  }}
                                />
                              ) : deliveryPrice?.length > 1 ? (
                                <div>
                                  {deliveryPrice[0]} until the{deliveryPrice[1]} Toman
                                </div>
                              ) : (
                                <div>{deliveryPrice[0]} Toman</div>
                              )
                            ) : (
                              <div>Address dependent</div>
                            )}
                          </div>
                        </Tooltip>
                      </>
                    ) : (
                      <div
                        style={{ color: titleColor }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <ClockIcon color={titleColor} />
                        <div>
                          Preparation{" "}
                          {englishNumberToPersianNumber(
                            orderPreprationDuration.value
                          )}{" "}
                          {orderPreprationDuration.typeName}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex align-items-center mt-auto">
              <button
                className={`${
                  selectedGettingOrderMethod?.name === FULFILLMENT_ON_USER_SITE
                    ? maxWidth1000
                      ? "px-3 py-2 ml-2"
                      : "px-5 py-2 ml-2"
                    : ""
                }`}
                type="button"
                onClick={openSelectAddressModalHandler}
                style={{
                  height: 61,
                  backgroundColor: "#fff",
                  boxSizing: "border-box",
                  borderRadius: 16,
                  width:
                    selectedGettingOrderMethod?.name ===
                    FULFILLMENT_ON_USER_SITE
                      ? maxWidth1000
                        ? 200
                        : 242
                      : "0px",
                  opacity:
                    selectedGettingOrderMethod?.name ===
                    FULFILLMENT_ON_USER_SITE
                      ? 1
                      : 0,
                  transition: "all .3s ease",
                }}
              >
                {selectedAddress ? (
                  <div className="d-flex align-items-center">
                    <div className="ml-2">
                      <svg
                        width="16"
                        height="21"
                        viewBox="0 0 16 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0.899902C3.58871 0.899902 0 4.50672 0 8.94029C0 12.1314 3.96188 17.7842 6.32376 20.8703C6.72706 21.3977 7.33835 21.6999 8 21.6999C8.66165 21.6999 9.27294 21.3977 9.67624 20.8703C12.0381 17.7842 16 12.1314 16 8.94029C16 4.50672 12.4113 0.899902 8 0.899902ZM11.2941 11.7781C11.2941 12.0391 11.0833 12.251 10.8235 12.251H9.41177C9.152 12.251 8.94118 12.0391 8.94118 11.7781V9.88621C8.94118 9.62514 8.73035 9.41325 8.47059 9.41325H7.52941C7.26965 9.41325 7.05882 9.62514 7.05882 9.88621V11.7781C7.05882 12.0391 6.848 12.251 6.58824 12.251H5.17647C4.91671 12.251 4.70588 12.0391 4.70588 11.7781V8.0951C4.70588 7.80517 4.83812 7.53133 5.06447 7.35207L7.70306 5.26299C7.87718 5.12489 8.12282 5.12489 8.29694 5.26299L10.9355 7.35207C11.1619 7.53133 11.2941 7.80517 11.2941 8.0951V11.7781Z"
                          fill="#202223"
                        />
                      </svg>
                    </div>

                    <div className="d-flex flex-column align-items-start">
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 900,
                          color: textTypes.text.default,
                          overflow: "hidden",
                          width: 130,
                        }}
                        className="d-flex"
                      >
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {selectedAddress.title}
                        </div>
                        <div
                          className="mr-2 px-2 d-flex align-items-center justify-content-center"
                          style={{
                            backgroundColor: "#F1F8F5",
                            color:
                              preparationTime === null ? "#D72C0D" : "#008060",
                            fontSize: 9,
                            fontWeight: 700,
                            borderRadius: 100,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {preparationTime === null
                            ? "out of range"
                            : "In the range"}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: textTypes.text.subdued,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          width: maxWidth1000 ? 135 : 145,
                        }}
                      >
                        {selectedAddress.address}
                      </div>
                    </div>

                    <div className="mr-auto">
                      <svg
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.23552 0L0 1.26091L5 6.36364L10 1.26091L8.76448 0L5 3.84182L1.23552 0Z"
                          fill="#202223"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-between">
                    <HomeIcon className="ml-4" />

                    <div className="d-flex flex-column align-items-start">
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 900,
                          color: textTypes.text.default,
                          overflow: "hidden",
                          width: 130,
                        }}
                        className="d-flex"
                      >
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Address
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {isAuthenticated
                          ? "Enter the address of the place of residence."
                          : "Enter the profile"}
                      </div>
                    </div>

                    <div className="mr-auto">
                      <svg
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.23552 0L0 1.26091L5 6.36364L10 1.26091L8.76448 0L5 3.84182L1.23552 0Z"
                          fill="#202223"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </button>

              <ToggleButtonGroup
                value={selectedGettingOrderMethod}
                exclusive
                onChange={selectedGettingOrderMethodHandler}
                aria-label="text alignment"
                className={`${
                  selectedGettingOrderMethod?.name === FULFILLMENT_ON_USER_SITE
                    ? ""
                    : "ml-1"
                }`}
                style={{
                  backgroundColor: "rgba(204, 204, 204, 0.34)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 16,
                  height: 61,
                }}
              >
                {deliveryTypesOptions?.map((option, index) => {
                  const selectedMethod = gettingOrderMethods.find(
                    (method) => method.name === option
                  );
                  return (
                    <ToggleButton
                      key={index}
                      value={selectedMethod}
                      style={{
                        color:
                          selectedGettingOrderMethod === selectedMethod
                            ? "#202223"
                            : "#F1F1F1",
                        fontWeight: 600,
                        fontSize: 12,
                        textAlign: "center",
                        borderRadius: 8,
                        marginTop: 13,
                        marginBottom: 13,
                        padding:
                          selectedGettingOrderMethod === selectedMethod
                            ? maxWidth1000
                              ? "8px 24px"
                              : "8px 32px"
                            : "8px 20px",
                        border: "none",
                      }}
                      className={`${
                        selectedGettingOrderMethod === selectedMethod
                          ? "selected-button"
                          : "toggle-button"
                      } ${
                        deliveryTypesOptions?.length < 2
                          ? maxWidth1000
                            ? "mx-3"
                            : "mx-4"
                          : index === 0
                          ? maxWidth1000
                            ? "mr-3"
                            : "mr-4"
                          : index === deliveryTypesOptions?.length - 1
                          ? maxWidth1000
                            ? "ml-3"
                            : "ml-4"
                          : "mx-auto"
                      }`}
                    >
                      <div
                        style={{ lineHeight: 1 }}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <div style={{ whiteSpace: "nowrap" }}>
                          {selectedMethod.title}
                        </div>
                      </div>
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
        {isBranch ? (
          <button
            className="position-absolute px-0 mt-5"
            style={{
              width: maxWidth1000 ? 100 : 221,
              height: 61,
              bottom: 32,
              left: 0,
              marginLeft: 20,
              backgroundColor: "#fff",
              boxSizing: "border-box",
              borderRadius: 16,
            }}
            onClick={() => pushParamsToUrl(BRANCH_SELECTION_MODAL)}
          >
            <div
              className={`${
                maxWidth1000 ? "px-3" : "px-5"
              } w-100 d-flex align-items-center justify-content-between`}
            >
              <div className="d-flex align-items-center justify-content-between">
                {maxWidth1000 ? null : (
                  <div style={{ lineHeight: 0.8 }} className="ml-4">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.23532 8.97054H6.58827V6.61759C6.58827 6.35746 6.79876 6.14697 7.05884 6.14697H8.94116C9.20129 6.14697 9.41173 6.35746 9.41173 6.61759V8.97054H11.7647C12.0248 8.97054 12.2352 8.76005 12.2352 8.49997V4.72346C11.8408 5.022 11.3553 5.20589 10.8235 5.20589C10.4917 5.20589 10.1672 5.13606 9.86942 5.00367C9.58264 5.11996 9.26831 5.18104 8.94111 5.18104C8.6093 5.18104 8.28946 5.1181 7.99992 4.99816C7.71038 5.1181 7.39055 5.18104 7.05873 5.18104C6.73153 5.18104 6.4172 5.1199 6.13042 5.00367C5.83262 5.13601 5.50817 5.20589 5.17635 5.20589C4.64454 5.20589 4.15903 5.022 3.7646 4.72346V8.49997C3.76476 8.7601 3.97524 8.97054 4.23532 8.97054ZM5.17651 4.2647C5.53773 4.2647 5.86769 4.12823 6.1177 3.90439C6.61773 4.35201 7.50005 4.35201 8.00003 3.90439C8.50005 4.35201 9.38238 4.35201 9.88235 3.90439C10.1324 4.12817 10.4623 4.2647 10.8235 4.2647C11.602 4.2647 12.2353 3.63143 12.2353 2.85295V1.91176C12.2353 1.13327 11.602 0.5 10.8235 0.5H5.17651C4.39803 0.5 3.76476 1.13327 3.76476 1.91176V2.85295C3.76476 3.63143 4.39803 4.2647 5.17651 4.2647ZM15.5294 15.5588H14.4619L15.6857 13.4397C15.8916 13.0845 16 12.6782 16 12.2646C16 10.9673 14.9449 9.91168 13.6471 9.91168C12.5105 9.91168 11.5603 10.7214 11.3417 11.7941H10.3054C10.1178 10.8735 9.39133 10.147 8.47059 9.9593V7.08816H7.52941V9.9593C6.60867 10.1469 5.88226 10.8735 5.6946 11.7941H4.65832C4.43967 10.7214 3.48952 9.91168 2.35295 9.91168C1.05515 9.91168 0 10.9673 0 12.2646C0 12.6782 0.10845 13.0845 0.31433 13.4397L1.53806 15.5588H0.470568C0.210436 15.5588 0 15.7692 0 16.0293C0 16.2894 0.210489 16.4999 0.470568 16.4999H4.23527C4.4954 16.4999 4.70584 16.2894 4.70584 16.0293C4.70584 15.7692 4.49535 15.5588 4.23527 15.5588H3.16778L4.39151 13.4397C4.51787 13.2217 4.59368 12.9816 4.64412 12.7352H5.7088C5.75924 12.9815 5.835 13.2217 5.96141 13.4397L7.18514 15.5588H6.11765C5.85752 15.5588 5.64708 15.7692 5.64708 16.0293C5.64708 16.2894 5.85757 16.4999 6.11765 16.4999H9.88235C10.1425 16.4999 10.3529 16.2894 10.3529 16.0293C10.3529 15.7692 10.1424 15.5588 9.88235 15.5588H8.81486L10.0386 13.4397C10.1649 13.2217 10.2408 12.9816 10.2912 12.7352H11.3559C11.4063 12.9815 11.4821 13.2217 11.6085 13.4397L12.8322 15.5588H11.7647C11.5046 15.5588 11.2942 15.7692 11.2942 16.0293C11.2942 16.2894 11.5047 16.4999 11.7647 16.4999H15.5294C15.7896 16.4999 16 16.2894 16 16.0293C16 15.7692 15.7895 15.5588 15.5294 15.5588ZM2.353 12.7352C2.09313 12.7352 1.88243 12.5245 1.88243 12.2647C1.88243 12.0048 2.09313 11.7941 2.353 11.7941C2.61287 11.7941 2.82357 12.0048 2.82357 12.2647C2.82357 12.5245 2.61287 12.7352 2.353 12.7352ZM8.00003 12.7352C7.74016 12.7352 7.52946 12.5245 7.52946 12.2647C7.52946 12.0048 7.74016 11.7941 8.00003 11.7941C8.25989 11.7941 8.47059 12.0048 8.47059 12.2647C8.47059 12.5245 8.25989 12.7352 8.00003 12.7352ZM13.6471 12.7352C13.3872 12.7352 13.1765 12.5245 13.1765 12.2647C13.1765 12.0048 13.3872 11.7941 13.6471 11.7941C13.9069 11.7941 14.1176 12.0048 14.1176 12.2647C14.1177 12.5245 13.9069 12.7352 13.6471 12.7352Z"
                        fill="#202223"
                      />
                    </svg>
                  </div>
                )}
                <div className="d-flex flex-column align-items-right">
                  <div
                    style={{
                      fontSize: maxWidth1000 ? 12 : 10,
                      fontWeight: 700,
                      color: textTypes.text.subdued,
                      overflow: "hidden",
                      textAlign: "right",
                    }}
                  >
                    Choosing a branch
                  </div>
                  {maxWidth1000 ? null : (
                    <div
                      style={{
                        textAlign: "right",
                        fontSize: 14,
                        fontWeight: 900,
                        color: textTypes.text.default,
                        width: 120,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                      className="mt-1"
                    >
                      {businessTitle}
                    </div>
                  )}
                </div>
              </div>
              <div className="mr-auto" style={{ lineHeight: 0.5 }}>
                <svg
                  width="10"
                  height="7"
                  viewBox="0 0 10 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.23552 0L0 1.26091L5 6.36364L10 1.26091L8.76448 0L5 3.84182L1.23552 0Z"
                    fill="#202223"
                  />
                </svg>
              </div>
            </div>
          </button>
        ) : null}
      </section>
    );
  }
  return (
    <>
      <AssuranceDialog
        isOpen={UIModals[DELETE_ADDRESS_MODAL]}
        closeDialogHandler={toggleModal[DELETE_ADDRESS_MODAL]}
        contentText="Are you sure you want to delete your stored address?"
        dialogMainActions={deleteAddressHandler}
        dialogMainActionText="Delete"
        dialogSecondActions={() => toggleModal(DELETE_ADDRESS_MODAL, false)}
        dialogSecondActionText="Candifying"
        isMobile={isMobile}
      />
      <SelectAddressModal
        isOpen={UIModals[ADDRESS_SELECT_MODAL]}
        closeModalHandler={() => toggleModal(ADDRESS_SELECT_MODAL, false)}
        isMobile={matches}
        isTablet={maxWidth1000}
        addNewAddress={() =>
          router.push(`${urlPrefix}/checkout/address?url=${currentRout}`)
        }
        userAddresses={userAddresses}
        selectAddress={selectAddressHandler}
        selectedAddress={selectedAddress}
        editAddress={editAddressHandler}
        deleteAddress={openDeleteAddressDialogHandler}
      />
      <section>
        <div
          style={{
            height:
              selectedGettingOrderMethod?.name !== FULFILLMENT_ON_USER_SITE &&
              !isBranch
                ? 0
                : 61,
            width:
              selectedGettingOrderMethod?.name !== FULFILLMENT_ON_USER_SITE &&
              !isBranch
                ? 0
                : "100%",
            transition: "all .3s ease",
          }}
          className=" d-flex align-items-center justify-content-center"
        >
          <div
            style={{
              width:
                selectedGettingOrderMethod?.name !== FULFILLMENT_ON_USER_SITE
                  ? 0
                  : isBranch
                  ? "55%"
                  : "100%",
              padding:
                selectedGettingOrderMethod?.name === FULFILLMENT_ON_USER_SITE
                  ? 16
                  : 0,
            }}
            className="overflow-hidden"
          >
            <button
              type="button"
              onClick={openSelectAddressModalHandler}
              className="w-100"
            >
              <div className="w-100 text-right">
                {selectedAddress ? (
                  <div className="d-flex align-items-center ">
                    <div className="ml-2">
                      <svg
                        width="16"
                        height="21"
                        viewBox="0 0 16 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0.899902C3.58871 0.899902 0 4.50672 0 8.94029C0 12.1314 3.96188 17.7842 6.32376 20.8703C6.72706 21.3977 7.33835 21.6999 8 21.6999C8.66165 21.6999 9.27294 21.3977 9.67624 20.8703C12.0381 17.7842 16 12.1314 16 8.94029C16 4.50672 12.4113 0.899902 8 0.899902ZM11.2941 11.7781C11.2941 12.0391 11.0833 12.251 10.8235 12.251H9.41177C9.152 12.251 8.94118 12.0391 8.94118 11.7781V9.88621C8.94118 9.62514 8.73035 9.41325 8.47059 9.41325H7.52941C7.26965 9.41325 7.05882 9.62514 7.05882 9.88621V11.7781C7.05882 12.0391 6.848 12.251 6.58824 12.251H5.17647C4.91671 12.251 4.70588 12.0391 4.70588 11.7781V8.0951C4.70588 7.80517 4.83812 7.53133 5.06447 7.35207L7.70306 5.26299C7.87718 5.12489 8.12282 5.12489 8.29694 5.26299L10.9355 7.35207C11.1619 7.53133 11.2941 7.80517 11.2941 8.0951V11.7781Z"
                          fill="#202223"
                        />
                      </svg>
                    </div>

                    <div className="d-flex ml-auto flex-column align-items-start">
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 900,
                          width: maxWidth335 ? "100%" : 122,
                          color: textTypes.text.default,
                          overflow: "hidden",
                        }}
                        className="d-flex align-items-center justify-content-between"
                      >
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: maxWidth335 ? 90 : 70,
                          }}
                          className=""
                        >
                          {selectedAddress?.title?.length > 20
                            ? selectedAddress?.title.slice(0, 19) + "..."
                            : selectedAddress?.title}
                        </div>
                        {maxWidth335 ? null : (
                          <div
                            className={`${
                              selectedAddress?.title?.length
                                ? "mr-auto"
                                : "ml-auto"
                            } px-2 d-flex align-items-center justify-content-center`}
                            style={{
                              backgroundColor: "#F1F8F5",
                              color:
                                preparationTime === null
                                  ? "#D72C0D"
                                  : "#008060",
                              fontSize: 9,
                              fontWeight: 700,
                              borderRadius: 100,
                              whiteSpace: "nowrap",
                              width: 61,
                            }}
                          >
                            {preparationTime === null
                              ? "out of range"
                              : "In the range"}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: textTypes.text.subdued,
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: 100,
                        }}
                        className="addressBtn-address ml-auto "
                      >
                        {selectedAddress.address}
                      </div>
                    </div>

                    <div className="mr-auto">
                      <svg
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.23552 0L0 1.26091L5 6.36364L10 1.26091L8.76448 0L5 3.84182L1.23552 0Z"
                          fill="#202223"
                        />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <HomeIcon className="ml-4" />

                    <div className="d-flex flex-column align-items-start">
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 900,
                          color: textTypes.text.default,
                          overflow: "hidden",
                        }}
                        className="d-flex"
                      >
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          Address
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {isAuthenticated
                          ? "Enter the address of the place of residence."
                          : "Enter the profile"}
                      </div>
                    </div>

                    <div className="mr-auto">
                      <svg
                        width="10"
                        height="7"
                        viewBox="0 0 10 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.23552 0L0 1.26091L5 6.36364L10 1.26091L8.76448 0L5 3.84182L1.23552 0Z"
                          fill="#202223"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </button>
          </div>
          {isBranch &&
          selectedGettingOrderMethod?.name !== FULFILLMENT_ON_USER_SITE ? (
            <Divider className="mx-auto" orientation="vertical" flexItem />
          ) : null}

          {isBranch ? (
            <button
              type="button"
              onClick={() => pushParamsToUrl(BRANCH_SELECTION_MODAL)}
              className="overflow-hidden px-3"
              style={{
                width:
                  selectedGettingOrderMethod?.name === FULFILLMENT_ON_USER_SITE
                    ? "45%"
                    : "100%",
                textAlign: "right",
                transition: "all .3s ease",
              }}
            >
              <div className="w-100 d-flex align-items-center justify-content-between">
                {maxWidth335 ? null : (
                  <div className="ml-2" style={{ lineHeight: 0.8 }}>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.23532 8.97054H6.58827V6.61759C6.58827 6.35746 6.79876 6.14697 7.05884 6.14697H8.94116C9.20129 6.14697 9.41173 6.35746 9.41173 6.61759V8.97054H11.7647C12.0248 8.97054 12.2352 8.76005 12.2352 8.49997V4.72346C11.8408 5.022 11.3553 5.20589 10.8235 5.20589C10.4917 5.20589 10.1672 5.13606 9.86942 5.00367C9.58264 5.11996 9.26831 5.18104 8.94111 5.18104C8.6093 5.18104 8.28946 5.1181 7.99992 4.99816C7.71038 5.1181 7.39055 5.18104 7.05873 5.18104C6.73153 5.18104 6.4172 5.1199 6.13042 5.00367C5.83262 5.13601 5.50817 5.20589 5.17635 5.20589C4.64454 5.20589 4.15903 5.022 3.7646 4.72346V8.49997C3.76476 8.7601 3.97524 8.97054 4.23532 8.97054ZM5.17651 4.2647C5.53773 4.2647 5.86769 4.12823 6.1177 3.90439C6.61773 4.35201 7.50005 4.35201 8.00003 3.90439C8.50005 4.35201 9.38238 4.35201 9.88235 3.90439C10.1324 4.12817 10.4623 4.2647 10.8235 4.2647C11.602 4.2647 12.2353 3.63143 12.2353 2.85295V1.91176C12.2353 1.13327 11.602 0.5 10.8235 0.5H5.17651C4.39803 0.5 3.76476 1.13327 3.76476 1.91176V2.85295C3.76476 3.63143 4.39803 4.2647 5.17651 4.2647ZM15.5294 15.5588H14.4619L15.6857 13.4397C15.8916 13.0845 16 12.6782 16 12.2646C16 10.9673 14.9449 9.91168 13.6471 9.91168C12.5105 9.91168 11.5603 10.7214 11.3417 11.7941H10.3054C10.1178 10.8735 9.39133 10.147 8.47059 9.9593V7.08816H7.52941V9.9593C6.60867 10.1469 5.88226 10.8735 5.6946 11.7941H4.65832C4.43967 10.7214 3.48952 9.91168 2.35295 9.91168C1.05515 9.91168 0 10.9673 0 12.2646C0 12.6782 0.10845 13.0845 0.31433 13.4397L1.53806 15.5588H0.470568C0.210436 15.5588 0 15.7692 0 16.0293C0 16.2894 0.210489 16.4999 0.470568 16.4999H4.23527C4.4954 16.4999 4.70584 16.2894 4.70584 16.0293C4.70584 15.7692 4.49535 15.5588 4.23527 15.5588H3.16778L4.39151 13.4397C4.51787 13.2217 4.59368 12.9816 4.64412 12.7352H5.7088C5.75924 12.9815 5.835 13.2217 5.96141 13.4397L7.18514 15.5588H6.11765C5.85752 15.5588 5.64708 15.7692 5.64708 16.0293C5.64708 16.2894 5.85757 16.4999 6.11765 16.4999H9.88235C10.1425 16.4999 10.3529 16.2894 10.3529 16.0293C10.3529 15.7692 10.1424 15.5588 9.88235 15.5588H8.81486L10.0386 13.4397C10.1649 13.2217 10.2408 12.9816 10.2912 12.7352H11.3559C11.4063 12.9815 11.4821 13.2217 11.6085 13.4397L12.8322 15.5588H11.7647C11.5046 15.5588 11.2942 15.7692 11.2942 16.0293C11.2942 16.2894 11.5047 16.4999 11.7647 16.4999H15.5294C15.7896 16.4999 16 16.2894 16 16.0293C16 15.7692 15.7895 15.5588 15.5294 15.5588ZM2.353 12.7352C2.09313 12.7352 1.88243 12.5245 1.88243 12.2647C1.88243 12.0048 2.09313 11.7941 2.353 11.7941C2.61287 11.7941 2.82357 12.0048 2.82357 12.2647C2.82357 12.5245 2.61287 12.7352 2.353 12.7352ZM8.00003 12.7352C7.74016 12.7352 7.52946 12.5245 7.52946 12.2647C7.52946 12.0048 7.74016 11.7941 8.00003 11.7941C8.25989 11.7941 8.47059 12.0048 8.47059 12.2647C8.47059 12.5245 8.25989 12.7352 8.00003 12.7352ZM13.6471 12.7352C13.3872 12.7352 13.1765 12.5245 13.1765 12.2647C13.1765 12.0048 13.3872 11.7941 13.6471 11.7941C13.9069 11.7941 14.1176 12.0048 14.1176 12.2647C14.1177 12.5245 13.9069 12.7352 13.6471 12.7352Z"
                        fill="#202223"
                      />
                    </svg>
                  </div>
                )}

                <div className="overflow-hidden d-flex flex-column align-items-start">
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: textTypes.text.subdued,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Choosing a branch
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 900,
                      color: textTypes.text.default,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      width: maxWidth335 ? 90 : 120,
                      textAlign: "right",
                    }}
                    className="mt-1"
                  >
                    {businessTitle}
                  </div>
                </div>

                <div className="mr-auto">
                  <svg
                    width="10"
                    height="7"
                    viewBox="0 0 10 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.23552 0L0 1.26091L5 6.36364L10 1.26091L8.76448 0L5 3.84182L1.23552 0Z"
                      fill="#202223"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ) : null}
        </div>
        <header
          className="background py-4 d-flex flex-column align-items-center justify-content-center"
          style={{
            backgroundColor: backgroundType === "color" && backgroundColor,
            backgroundImage:
              backgroundType === "image" &&
              `linear-gradient(0deg, rgba(22, 22, 22, 0.8) 7.48%, rgba(34, 34, 34, 0.4) 55.89%, rgba(48, 48, 48, 0) 95.8%), url(${backgroundImage})`,
            backgroundOrigin: "border-box",
            backgroundPosition: "center center",
            backgroundClip: "border-box",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h1
            className=" mb-2"
            style={{ fontSize: 26, fontWeight: 700, color: titleColor }}
          >
            {businessTitle}
          </h1>
          <div className="d-flex flex-column align-items-center justify-content-center mb-4">
            {isOpenPermanently ? (
              isOpenOutOfWorkingHours ? (
                <>
                  <div
                    style={{
                      fontStyle: "normal",
                      fontSize: 14,
                      fontWeight: 700,
                      color:
                        selectedAddress && preparationTime === null
                          ? "#D72C0D"
                          : "#00A47C",
                    }}
                    className="d-flex align-items-center"
                  >
                    <FiberManualRecordIcon
                      style={{
                        color:
                          selectedAddress && preparationTime === null
                            ? "#D72C0D"
                            : "#00A47C",
                        fontSize: 8,
                      }}
                      className="ml-2"
                    />
                    {isBusinessOpenNow(workingHours)
                      ? "Open. Order up" +
                        englishNumberToPersianNumber(
                          workingDayStart.closingTime
                        )
                      : "We accept the order"}{" "}
                    {selectedAddress && preparationTime === null
                      ? ". out of range"
                      : ""}
                  </div>
                </>
              ) : (
                outOfWorkingHoursPreorderText
              )
            ) : (
              <div
                style={{
                  fontStyle: "normal",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#D72C0D",
                }}
                className="d-flex align-items-center "
              >
                <FiberManualRecordIcon
                  style={{
                    color: "#D72C0D",
                    fontSize: 8,
                  }}
                  className="ml-2"
                />
                Temporarily unable to receive an order
              </div>
            )}
            {selectedAddress ? (
              <div
                style={{
                  color: titleColor,
                  fontSize: 13,
                  fontWeight: 600,
                  marginTop:
                    selectedGettingOrderMethod?.name ===
                      FULFILLMENT_ON_USER_SITE && preparationTime === null
                      ? 0
                      : 8,
                }}
                className="mt-2 d-flex align-items-center justify-content-center pymethods-status"
              >
                {selectedGettingOrderMethod?.name ===
                FULFILLMENT_ON_USER_SITE ? (
                  <>
                    <div className="d-flex align-items-center justify-content-center">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 11"
                        fill={titleColor}
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1"
                      >
                        <path
                          d="M3.5 0V1H6.5V0H3.5ZM8.47949 0.896484L7.83301 1.65918L9.30762 2.90918L9.9541 2.14648L8.47949 0.896484ZM5 1.5C2.519 1.5 0.5 3.519 0.5 6C0.5 8.481 2.519 10.5 5 10.5C7.481 10.5 9.5 8.481 9.5 6C9.5 3.519 7.481 1.5 5 1.5ZM4.5 3H5.5V6.5H4.5V3Z"
                          fill={titleColor}
                        />
                      </svg>
                      {isDeliveryInfoLoading ? (
                        <Skeleton
                          style={{
                            backgroundColor: "#94949433",
                            width: 75,
                          }}
                        />
                      ) : preparationTime === null ? (
                        <div>out of range</div>
                      ) : preparationTime.length > 1 ? (
                        preparationTime[0].mainType ===
                        preparationTime[1].mainType ? (
                          <div>
                            {englishNumberToPersianNumber(
                              preparationTime[0]?.mainValue
                            )}{" "}
                            until the{" "}
                            {englishNumberToPersianNumber(
                              preparationTime[1]?.mainValue
                            ) +
                              " " +
                              preparationTime[1]?.typeName}
                          </div>
                        ) : (
                          <div>
                            {englishNumberToPersianNumber(
                              preparationTime[0]?.mainValue
                            ) +
                              " " +
                              preparationTime[0]?.typeName}{" "}
                            until the{" "}
                            {englishNumberToPersianNumber(
                              preparationTime[1]?.mainValue
                            ) +
                              " " +
                              preparationTime[1]?.typeName}
                          </div>
                        )
                      ) : (
                        <div>
                          {englishNumberToPersianNumber(
                            preparationTime[0]?.mainValue
                          ) +
                            " " +
                            preparationTime[0]?.typeName}
                        </div>
                      )}
                    </div>
                    <div className="mx-4" style={{ color: titleColor }}>
                      .
                    </div>
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ color: titleColor }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 24 24"
                        height="16px"
                        viewBox="0 0 24 24"
                        width="16px"
                        fill={titleColor}
                        className="ml-1"
                      >
                        <g>
                          <rect fill="none" height="24" width="24" />
                        </g>
                        <g>
                          <g>
                            <path d="M19,7c0-1.1-0.9-2-2-2h-3v2h3v2.65L13.52,14H10V9H6c-2.21,0-4,1.79-4,4v3h2c0,1.66,1.34,3,3,3s3-1.34,3-3h4.48L19,10.35V7 z M7,17c-0.55,0-1-0.45-1-1h2C8,16.55,7.55,17,7,17z" />
                            <rect height="2" width="5" x="5" y="6" />
                            <path d="M19,13c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S20.66,13,19,13z M19,17c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1 S19.55,17,19,17z" />
                          </g>
                        </g>
                      </svg>

                      {deliveryPrice === null ? (
                        <div>out of range</div>
                      ) : deliveryPrice?.length > 1 ? (
                        <div style={{ color: titleColor }}>
                          {deliveryPrice[0]} until the{deliveryPrice[1]} Toman
                        </div>
                      ) : (
                        <div style={{ color: titleColor }}>
                          {deliveryPrice[0]} Toman
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="d-flex align-items-center justify-content-center">
                    <svg
                      width="9.45"
                      height="10.5"
                      viewBox="0 0 10 11"
                      fill={titleColor}
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1"
                    >
                      <path
                        d="M3.5 0V1H6.5V0H3.5ZM8.47949 0.896484L7.83301 1.65918L9.30762 2.90918L9.9541 2.14648L8.47949 0.896484ZM5 1.5C2.519 1.5 0.5 3.519 0.5 6C0.5 8.481 2.519 10.5 5 10.5C7.481 10.5 9.5 8.481 9.5 6C9.5 3.519 7.481 1.5 5 1.5ZM4.5 3H5.5V6.5H4.5V3Z"
                        fill={titleColor}
                      />
                    </svg>
                    <div style={{ color: titleColor }}>
                      Preparation{" "}
                      {englishNumberToPersianNumber(
                        orderPreprationDuration.value
                      )}{" "}
                      {orderPreprationDuration.typeName}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
          <div className=" w-100 methods px-4">
            <ToggleButtonGroup
              value={selectedGettingOrderMethod}
              exclusive
              onChange={selectedGettingOrderMethodHandler}
              aria-label="text alignment"
              className={`${
                selectedGettingOrderMethod?.name === FULFILLMENT_ON_USER_SITE
                  ? ""
                  : "ml-auto"
              } `}
              style={{
                backgroundColor: "rgba(204, 204, 204, 0.34)",
                backdropFilter: "blur(4px)",
                borderRadius: 8,
                height: 43,
              }}
            >
              {deliveryTypesOptions?.map((option, index) => {
                const selectedMethod = gettingOrderMethods.find(
                  (method) => method.name === option
                );
                return (
                  <ToggleButton
                    key={index}
                    value={selectedMethod}
                    style={{
                      color:
                        selectedGettingOrderMethod === selectedMethod
                          ? "#202223"
                          : "#F1F1F1",
                      fontWeight: 600,
                      fontSize: 11,
                      textAlign: "center",
                      borderRadius: 8,
                      border: "none",
                      whiteSpace: "nowrap",
                      width: `${100 / deliveryTypesOptions?.length}`,
                    }}
                    className={`${
                      selectedGettingOrderMethod === selectedMethod
                        ? "selected-button"
                        : "toggle-button"
                    } ${
                      deliveryTypesOptions?.length < 2
                        ? "mx-1"
                        : index === 0
                        ? "mr-1"
                        : index === deliveryTypesOptions?.length - 1
                        ? "ml-1"
                        : "mx-auto"
                    } my-1`}
                  >
                    <div
                      style={{ lineHeight: 1 }}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <div style={{ whiteSpace: "nowrap" }}>
                        {selectedMethod.title}
                      </div>
                    </div>
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </div>
        </header>
      </section>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  isBranch: makeSelectIsBranch(),
  business: makeSelectBusiness(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  userAddresses: makeSelectAddresses(),
  selectedAddressIdByUser: makeSelectedAddress(),
  urlPrefix: makeSelectUrlPrefix(),
  isAuthenticated: makeSelectIsAuthenticated(),
  workingHours: makeSelectBusinessWorkingHours(),
  deliveryInfoByUserAddress: makeSelectDeliveryInfoByUserAddress(),
  isDeliveryInfoLoading: makeSelectLoading(DELIVERY_INFO_LOADING),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getUserAddressesList: () => dispatch(getAddresses()),
    setSelectAddressIdByUser: (selectedAddress) =>
      dispatch(setSelectedAddress(selectedAddress)),
    _getDeliveryInfoByUserAddress: (lat, lng) =>
      dispatch(getDeliveryInfoByUserAddress(lat, lng)),
    _deleteAddress: (addressId, orderId = null) =>
      dispatch(deleteAddress(addressId, orderId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ShoppingHeader3);
