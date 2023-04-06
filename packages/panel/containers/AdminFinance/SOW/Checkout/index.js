import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import {
  makeSelectBranches,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import LocationSelector from "components/LocationSelector";
import useTheme from "@material-ui/core/styles/useTheme";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Button from "@material-ui/core/Button";
import CheckoutModal from "./CheckoutModal";
import { cement, dust } from "@saas/utils/colors";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CheckoutTable from "./CheckoutTable";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import AccountBalanceWalletRoundedIcon from "@material-ui/icons/AccountBalanceWalletRounded";
import DescriptionModal from "../components/DescriptionModal";
import {
  createWalletTransaction,
  getTreasuryBalance,
  getWalletBalance,
  getWalletTransactions,
} from "@saas/stores/plugins/actions";
import {
  makeSelectTreasuryBalance,
  makeSelectWalletBalance,
  makeSelectWalletTransactions,
} from "@saas/stores/plugins/selector";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import CheckIcon from "@material-ui/icons/Check";
import { CHECKOUT_CREDIT } from "@saas/stores/plugins/constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
function SOWCheckout({
  isSuper = false,
  branches,
  isLoading,
  _getWallletBalance,
  walletBalance,
  business,
  treasuryBalance,
  _getTreasuryBalance,
  _setSnackBarMessage,
  _getWalletTransactions,
  walletTransactions,
  _createWalletTransaction,
}) {
  const theme = useTheme();
  const {minWidth768} = useResponsive()
  const [selectedBranch, setSelectedBranch] = useState(
    isSuper ? branches?.[0]?.slug : null
  );
  const [isCheckoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isFinalCheckoutPriceEditable, setFinalCheckoutPriceEditable] =
    useState(false);
  const [finalCheckoutPrice, setFinalPriceCheckout] = useState(0);
  const [description, setDescription] = useState(null);
  const [page, setPage] = useState(0);
  const selectedBranchTitle = useMemo(
    () => branches.find((branch) => branch.slug === selectedBranch)?.title,
    [selectedBranch]
  );

  const branchId = useMemo(() => {
    if (business?.super_business) {
      return business?.id;
    } else {
      return branches.find((branch) => branch.slug === selectedBranch)?.id;
    }
  }, [business, branches, selectedBranch]);

  const businessId = useMemo(() => {
    if (business?.super_business) {
      return business?.super_business?.id;
    } else {
      return business?.id;
    }
  }, [business, branches, selectedBranch]);

  const treasuryButton = useMemo(() => {
    return (
      <Button
        variant="contained"
        style={{
          backgroundColor: isSuper ? "#111213" : dust,
          color: isSuper ? "#FFFFFF" : "#000000",
          direction: "ltr",
        }}
        className="u-box-shadow-none u-fontMedium"
        size="large"
        endIcon={<AccountBalanceWalletRoundedIcon />}
        disabled={true}
      >
        <div className="mr-1">تومان</div>
        <div>{priceFormatter(treasuryBalance?.balance * -1)}</div>
        <div className="ml-2">خزانه کل</div>
      </Button>
    );
  }, [isSuper, treasuryBalance]);

  useEffect(() => {
    if ((businessId, branchId)) {
      setTimeout(() => {
        _getWallletBalance({
          businessId,
          branchId,
        });
      }, 0);
    }
  }, [businessId, branchId]);
  useEffect(() => {
    if ((businessId, branchId)) {
      setTimeout(() => {
        _getWalletTransactions({
          businessId,
          branchId,
          page: page + 1,
          is_open: true,
        });
      }, 0);
    }
  }, [businessId, branchId, page]);
  useEffect(() => {
    if (businessId) {
      setTimeout(() => {
        _getTreasuryBalance({
          businessId,
        });
      }, 0);
    }
  }, [businessId]);

  const checkoutObject = useMemo(() => {
    if (isSuper) {
      switch (Math.sign(walletBalance?.balance)) {
        case 1:
          return {
            text: "(بدهکاری شما)",
            color: theme.palette.error.main,
            className: "u-fontSmall",
          };
        case -1:
          return {
            text: "(طلبکاری شما)",
            color: theme.palette.success.main,
            className: "u-fontSmall",
          };
        default:
          return {
            text: "تسویه شده است",
            color: "",
            className: "u-fontWeightBold",
          };
      }
    } else {
      switch (Math.sign(walletBalance?.balance)) {
        case 1:
          return {
            text: "(طلبکاری شما)",
            color: theme.palette.success.main,
            className: "u-fontSmall",
          };
        case -1:
          return {
            text: "(بدهکاری شما)",
            color: theme.palette.error.main,
            className: "u-fontSmall",
          };
        default:
          return {
            text: "تسویه شده است",
            color: "",
            className: "u-fontWeightBold",
          };
      }
    }
  }, [walletBalance?.balance, isSuper]);
  useEffect(() => {
    setFinalPriceCheckout(Math.abs(walletBalance?.balance));
  }, [walletBalance?.balance]);
  return (
    <div>
      <div className="container mb-5">
        <Head>
          <title>تسویه حساب</title>
        </Head>
        <AdminBreadCrumb customizedButton={isSuper ? treasuryButton : null} />
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
        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          selectedBranchTitle={selectedBranchTitle}
          finalCheckoutPrice={finalCheckoutPrice}
          checkoutObject={checkoutObject}
          submit={(description, setDescription) => {
            const callback = () => {
              _getWalletTransactions({
                businessId,
                branchId,
                page: 1,
                is_open: true,
              });
              _getWallletBalance({
                businessId,
                branchId,
              });
              _getTreasuryBalance({
                businessId,
              });
              setDescription("");
            };
            _createWalletTransaction(
              {
                business_id: businessId,
                branch_id: branchId,
                amount:
                  Math.sign(walletBalance?.balance) === 1
                    ? +finalCheckoutPrice * -1
                    : +finalCheckoutPrice,
                description: CHECKOUT_CREDIT,
                user_description: description,
              },
              callback
            );
          }}
        />
        <DescriptionModal
          description={description}
          isOpen={description}
          onClose={() => setDescription(null)}
        />
        <Paper elevation={1} className="mt-4 p-4">
          <div className="d-flex flex-lg-row flex-column align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="ml-2">مبلغ قابل تسویه:</div>
              {walletBalance?.balance !== 0 && (
                <div className="d-flex justify-content-center ml-2 u-fontWeightBold">
                  <div style={{ direction: "ltr" }} className="ml-1">
                    {priceFormatter(Math.abs(walletBalance?.balance))}
                  </div>
                  <div>تومان</div>
                </div>
              )}
              <div
                className={checkoutObject?.className}
                style={{ color: checkoutObject?.color }}
              >
                {checkoutObject?.text}
              </div>
            </div>
            {isSuper ? (
              <div className="d-flex align-items-center mt-lg-0 mt-3">
                <div
                  style={{
                    border: `1px solid ${cement}`,
                    borderRadius: 4,
                    minWidth: minWidth768 ? 270 : 150,
                    height: 40,
                    pointerEvents: walletBalance?.balance === 0 && "none",
                    opacity: walletBalance?.balance === 0 && 0.5,
                  }}
                  className="p-2 ml-3 d-flex align-items-center justify-content-between"
                >
                  <div
                    className="d-flex align-items-center u-cursor-pointer"
                    onClick={() => {
                      if (isFinalCheckoutPriceEditable) {
                        if (
                          finalCheckoutPrice >
                            Math.abs(walletBalance?.balance) ||
                          finalCheckoutPrice <= 0
                        ) {
                          _setSnackBarMessage(
                            `عدد واره شده باید بین ۰ و ${priceFormatter(
                              Math.abs(walletBalance?.balance)
                            )} باشد.`,
                            "fail"
                          );
                          setFinalPriceCheckout(
                            Math.abs(walletBalance?.balance)
                          );
                        }
                        setFinalCheckoutPriceEditable(false);
                      } else {
                        setFinalCheckoutPriceEditable(true);
                      }
                    }}
                  >
                    {isFinalCheckoutPriceEditable ? (
                      <CheckIcon
                        style={{ fontSize: 20 }}
                        color="primary"
                        className="ml-1"
                      />
                    ) : (
                      <EditRoundedIcon
                        style={{ fontSize: 16 }}
                        color="primary"
                        className="ml-1"
                      />
                    )}
                    {minWidth768 && (
                      <div
                        className="u-font-semi-small"
                        style={{
                          color: theme.palette.primary.main,
                          lineHeight: "initial",
                        }}
                      >
                        {isFinalCheckoutPriceEditable ? "تایید" : "ویرایش"}
                      </div>
                    )}
                  </div>
                  {isFinalCheckoutPriceEditable ? (
                    <div
                      className="d-flex align-items-center"
                      style={{ width: !minWidth768 && 110 }}
                    >
                      <input
                        type="text"
                        className="ml-2 ltr text-left w-100"
                        placeholder="مبلغ مورد نظر"
                        value={englishNumberToPersianNumber(finalCheckoutPrice)}
                        onChange={(event) => {
                          if (
                            persianToEnglishNumber(event.target.value).match(
                              /^[+-]?[0-9]*$/
                            )
                          ) {
                            setFinalPriceCheckout(
                              persianToEnglishNumber(event.target.value)
                            );
                          } else {
                            _setSnackBarMessage(
                              `تنها مجاز به وارد کردن عدد می‌باشید.`,
                              "fail"
                            );
                          }
                        }}
                        autoFocus
                        onBlur={() =>
                          setTimeout(() => {
                            if (
                              finalCheckoutPrice >
                                Math.abs(walletBalance?.balance) ||
                              finalCheckoutPrice <= 0
                            ) {
                              _setSnackBarMessage(
                                `عدد واره شده باید بین ۰ و ${priceFormatter(
                                  Math.abs(walletBalance?.balance)
                                )} باشد.`,
                                "fail"
                              );
                              setFinalPriceCheckout(
                                Math.abs(walletBalance?.balance)
                              );
                            }
                            setFinalCheckoutPriceEditable(false);
                          }, 100)
                        }
                      ></input>
                      <div
                        className="ml-2 u-fontMedium"
                        style={{ lineHeight: "initial" }}
                      >
                        تومان
                      </div>
                    </div>
                  ) : (
                    <div
                      className="ml-2 u-fontMedium"
                      style={{ lineHeight: "initial" }}
                    >
                      {priceFormatter(finalCheckoutPrice)}
                      &nbsp; تومان
                    </div>
                  )}
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  className="u-box-shadow-none u-fontMedium"
                  size="large"
                  onClick={() => setCheckoutModalOpen(true)}
                  disabled={walletBalance?.balance === 0}
                >
                  تسویه حساب
                </Button>
              </div>
            ) : null}
          </div>
        </Paper>
        <CheckoutTable
          isLoading={isLoading}
          setDescription={setDescription}
          walletBalance={walletBalance?.balance}
          walletBalanceColor={checkoutObject?.color}
          walletTransactions={walletTransactions}
          isSuper={isSuper}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  branches: makeSelectBranches(),
  isLoading: makeSelectLoading(),
  walletBalance: makeSelectWalletBalance(),
  treasuryBalance: makeSelectTreasuryBalance(),
  walletTransactions: makeSelectWalletTransactions(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getWallletBalance: (data) => dispatch(getWalletBalance(data)),
    _getTreasuryBalance: (data) => dispatch(getTreasuryBalance(data)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _getWalletTransactions: (data) => dispatch(getWalletTransactions(data)),
    _createWalletTransaction: (data, callback) =>
      dispatch(createWalletTransaction(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(SOWCheckout);
