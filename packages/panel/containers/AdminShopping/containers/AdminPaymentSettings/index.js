/**
 *
 * Settings
 *
 */

import React, { memo, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { coal, night, skyI, smoke } from "@saas/utils/colors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Divider from "@material-ui/core/Divider";
import PriorityHighRoundedIcon from "@material-ui/icons/PriorityHighRounded";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { setPluginShoppingPaymentData } from "@saas/stores/plugins/actions";
import PaymentTypePaper from "./PaymentTypePaper";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectBranches } from "@saas/stores/business/selector";
import LocationSelector from "components/LocationSelector";
import {
  CARD_PAYMENT,
  ONLINE_PAYMENT,
  paymentOptions,
} from "@saas/stores/plugins/constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
function AdminShoppingPaymentSettings({
  shoppingPluginData,
  _setPluginShoppingPaymentData,
  loading,
  isSuper,
  branches,
}) {
  const [selectedBranch, setSelectedBranch] = useState(
    isSuper ? branches?.[0]?.slug : null
  );
  const pluginData = isSuper
    ? branches.find((branch) => branch.slug === selectedBranch)?.plugins_config[
        SHOPPING_PLUGIN
      ]
    : shoppingPluginData;
  const { payment_data } = pluginData;
  const { minWidth768 } = useResponsive();
  const dispatch = useDispatch();

  const defaultValueCardInfo = () => {
    const cardNumber = payment_data?.accounts_info?.[0]?.card_number
      ? englishNumberToPersianNumber(
          payment_data?.accounts_info?.[0].card_number
            .match(new RegExp(".{1,4}", "g"))
            .join("-")
        )
      : "";

    return {
      owner_name: payment_data?.accounts_info?.[0].owner_name,
      card_number: cardNumber,
    };
  };
  const [paymentMethods, selectPaymentMethods] = useState(
    payment_data.types || []
  );
  const [cardInfo, setCardInfo] = useState(() => defaultValueCardInfo());
  const [cardInfoErrors, setCardInfoErrors] = useState([]);
  const _setSnackBarMessage = (message, type) =>
    dispatch(setSnackBarMessage(message, type));

  useEffect(() => {
    if (localStorage.getItem("adminDeliverySelectedBranch") && isSuper)
      setSelectedBranch(localStorage.getItem("adminDeliverySelectedBranch"));
  }, []);
  useEffect(() => {
    if (payment_data.types) selectPaymentMethods(payment_data.types);
  }, [payment_data]);
  const optionDisabled = (option) =>
    !(
      payment_data.gateways &&
      Object.keys(payment_data.gateways).length &&
      Object.keys(payment_data.gateways).find(
        (key) => payment_data.gateways[key].status === "active"
      )
    ) && option === ONLINE_PAYMENT;

  const setErrorMessage = (field, message) => {
    setCardInfoErrors((prevState) => [...prevState, { field, message }]);
  };

  const removeErrorMessage = (field) => {
    setCardInfoErrors((prevState) =>
      prevState.filter((err) => err.field !== field)
    );
  };

  const submit = async () => {
    if (!paymentMethods.length)
      return _setSnackBarMessage(
        "Please select at least one payment method.",
        "fail"
      );

    if (paymentMethods.includes(CARD_PAYMENT)) {
      let hasError = false;
      if (!cardInfo.owner_name) {
        setErrorMessage("name", "Enter your name");
        hasError = true;
      } else removeErrorMessage("name");
      if (!cardInfo.card_number) {
        setErrorMessage("number", "Enter your card number");
        hasError = true;
      } else if (!cardInfoErrors.some((err) => err.field === "number")) {
        removeErrorMessage("number");
      }

      if (cardInfoErrors.length === 0 && !hasError)
        _setPluginShoppingPaymentData({
          types: paymentMethods,
          accounts_info: [
            {
              owner_name: cardInfo.owner_name,
              card_number: persianToEnglishNumber(cardInfo.card_number).replace(
                /-/g,
                ""
              ),
            },
          ],
        });
    } else {
      _setPluginShoppingPaymentData({
        types: paymentMethods,
      });
    }
  };

  const onClickHandler = (value) => {
    if (!paymentMethods.includes(value))
      selectPaymentMethods((prevState) => [...prevState, value]);
    else
      selectPaymentMethods((prevState) =>
        prevState.filter((item) => item !== value)
      );
  };
  return (
    <div className="container">
      <Head>
        <title>Payment settings</title>
      </Head>
      <AdminBreadCrumb
        submitButtonText="Save changes"
        submitAction={submit}
        helpVideo={{ url: ADMIN_HELP_VIDEOS.paymentMethods.url }}
        isLoading={loading}
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
      <Paper
        elevation={1}
        className="mt-4 pb-3"
        style={{ marginBottom: minWidth768 ? "" : 80 }}
      >
        <div className="py-3 px-4">
          <div
            className="u-fontMedium u-fontWeightBold"
            style={{ color: coal }}
          >
            Payment settings
          </div>
          <div style={{ color: smoke }} className="u-font-semi-small mt-1">
            With this section you can specify how the customer looks like
            Can pay for the goods purchased from the site.
          </div>
        </div>
        <Divider />
        <div className="px-4 my-4">
          {payment_data.gateways && !Object.keys(payment_data.gateways).length && (
            <div
              className="u-cursor-pointer py-3 px-2 d-flex align-items-center"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0, 190, 240, 0.08), rgba(0, 190, 240, 0.08)), #FFFFFF",
                border: "1px solid rgba(0, 190, 240, 0.5)",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  backgroundColor: skyI,
                  width: 32,
                  height: 32,
                  minWidth: 32,
                  minHeight: 32,
                  borderRadius: "50%",
                }}
                className="d-flex justify-content-center align-items-center ml-2"
              >
                <PriorityHighRoundedIcon style={{ color: "white" }} />
              </div>
              <div className="w-100">
                <div
                  className="u-fontMedium u-fontWeightMedium"
                  style={{ color: night }}
                >
                  Activate online payment by bank gateway
                </div>
                <div className="w-100 mt-3">
                  <span
                    style={{ color: smoke }}
                    className="u-font-semi-small ml-1"
                  >
                    To activate the banking gate is required with the support showcase
                    get.
                  </span>
                  <a
                    style={{ color: skyI, textDecoration: "underline" }}
                    className="u-fontNormal"
                    href="tel:+982191070751"
                  >
                    {englishNumberToPersianNumber("+982191070751")}
                  </a>
                </div>
              </div>
            </div>
          )}
          {paymentOptions?.map((option) => (
            <PaymentTypePaper
              key={option.id}
              paymentOption={option}
              onClickHandler={onClickHandler}
              selectedPaymentMethods={paymentMethods}
              isDisabled={optionDisabled(option.value)}
              cardInfo={cardInfo}
              setCardInfo={setCardInfo}
              cardInfoErrors={cardInfoErrors}
              setErrorMessage={setErrorMessage}
              removeErrorMessage={removeErrorMessage}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  loading: makeSelectLoading(),
  branches: makeSelectBranches(),
});

function mapDispatchToProps(dispatch) {
  return {
    _setPluginShoppingPaymentData: (data) =>
      dispatch(setPluginShoppingPaymentData(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminShoppingPaymentSettings);
