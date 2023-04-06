import Paper from "@material-ui/core/Paper";
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Input from "@saas/components/Input";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { groupDiscountOnProducts } from "@saas/stores/plugins/actions";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { night, skyI, smoke } from "@saas/utils/colors";
import PriorityHighRoundedIcon from "@material-ui/icons/PriorityHighRounded";
import { useRouter } from "next/router";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import InputAdornment from "@material-ui/core/InputAdornment";
import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export function AdminDiscounts({
  loading,
  _groupDiscountOnProducts,
  _setSnackBarMessage,
  urlPrefix,
}) {
  const {minWidth768} = useResponsive()
  const router = useRouter();
  const [totalDiscount, setTotalDiscount] = useState("");
  const [hasError, setHasError] = useState(false);
  const theme = useTheme();
  const submit = () => {
    if (!hasError) {
      _groupDiscountOnProducts({
        percent: Number(totalDiscount),
      });
    } else {
      _setSnackBarMessage("The entered number should not be larger than 1.", "fail");
    }
  };
  const onChangeInputHandler = (value) => {
    setTotalDiscount(persianToEnglishNumber(value));
  };

  useEffect(() => {
    if (totalDiscount !== "" && Number(totalDiscount) > 100) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [totalDiscount]);
  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        submitButtonText="Save changes"
        submitAction={submit}
        isLoading={loading}
      />
      <div
        className="py-3 px-2 d-flex align-items-center mt-3"
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
            width: 24,
            height: 24,
            minWidth: 24,
            minHeight: 24,
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
            Discount on a single product or a specified product category
          </div>
          <div className="w-100 mt-3">
            <span style={{ color: smoke }} className="u-font-semi-small ml-1">
              To apply discounts on a specified product, to the page
            </span>
            <span
              className="u-cursor-pointer"
              style={{ borderBottom: `1px solid ${smoke}` }}
              onClick={() =>
                router.push(
                  `${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/products/list`
                )
              }
            >
              {`"Products"`}
            </span>
            <span className="u-font-semi-small mr-1" style={{ color: smoke }}>
              See.
            </span>
          </div>
          <div className="w-100 mt-3">
            <span style={{ color: smoke }} className="u-font-semi-small ml-1">
              To apply discounts on a specified label of goods, to the page
            </span>
            <span
              className="u-cursor-pointer"
              style={{ borderBottom: `1px solid ${smoke}` }}
              onClick={() =>
                router.push(`${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/l`)
              }
            >
              {`"Labels"`}
            </span>
            <span className="u-font-semi-small mr-1" style={{ color: smoke }}>
              See.
            </span>
          </div>
        </div>
      </div>
      <Paper elevation={1} className="mt-3 p-3 ">
        <div className="d-flex pb-3 align-items-center">
          Apply discounts on all products
        </div>
        <div className="d-flex align-items-center">
          To apply discounts on all your products at once, the percentage of the item
          Enter the comment below.
        </div>
        <div className="d-flex flex-wrap pb-3">
          <span className="ml-1 u-fontWeightBold">۰٪</span>
          <span className="ml-1">Means</span>
          <span className="ml-1 u-fontWeightBold">{`"No discount"`}</span>
          <span className="ml-1">And</span>
          <span className="ml-1 u-fontWeightBold">۱۰۰٪</span>
          <span className="ml-1">Means</span>
          <span className="ml-1 u-fontWeightBold">{`"Free goods"`}</span>
          <span className="ml-1">Is.</span>
        </div>
        <div style={{ width: minWidth768 ? "25%" : "100%" }}>
          <Input
            inputProps={{ maxLength: 3 }}
            label="discount percent"
            value={englishNumberToPersianNumber(totalDiscount)}
            onChange={onChangeInputHandler}
            size="medium"
            style={{ minWidth: "100%" }}
            className="w-100"
            numberOnly
            min="0"
            max="100"
            InputProps={{
              className: "small",
              endAdornment: (
                <InputAdornment position="end">Percent</InputAdornment>
              ),
            }}
            InputLabelProps={{
              className: "small",
            }}
          />
        </div>
        {hasError && (
          <div
            style={{ color: theme.palette.error.main }}
            className="u-font-semi-small mt-1"
          >
            The entered number must be between 1 and 2.
          </div>
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  urlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _groupDiscountOnProducts: (data) => dispatch(groupDiscountOnProducts(data)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminDiscounts);
