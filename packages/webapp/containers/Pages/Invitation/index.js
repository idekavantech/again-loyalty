import React, { memo, useEffect, useState } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import {
  makeSelectBusinessThemeColor,
  makeSelectBusinessTitle,
} from "@saas/stores/business/selector";
import {
  getMembershipByInviteSlug,
  login,
  setLoginCallBack,
} from "@saas/stores/user/actions";
import Icon from "@saas/components/Icon";
import { GIFT_WITH_STARS } from "@saas/icons";
import { isNumber } from "@saas/utils/helpers/isNumber";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Input from "@saas/components/Input";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectInviter } from "@saas/stores/user/selector";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import { useRouter } from "next/router";

function Invitation({
  themeColor,
  urlPrefix,
  _setLoginCallBack,
  _login,
  _getMembershipByInviteSlug,
  inviter,
  pluginData,
  businessTitle,
}) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const slug = router.query.slug;
  useEffect(() => {
    document.getElementById("invite-page").scrollIntoView();
    setTimeout(() => {
      _getMembershipByInviteSlug(slug);
    }, 0);
  }, []);
  const inviteeGift = Math.round(
    pluginData.data.gift_amount_for_invited / 1000
  );
  const submit = () => {
    if (
      phoneNumber &&
      phoneNumber.toString().length === 11 &&
      isNumber(phoneNumber) &&
      phoneNumber.toString().substr(0, 2) === "09"
    ) {
      localStorage.setItem("invite_link_id", slug);
      _setLoginCallBack(() => router.push(`${urlPrefix}/wallet`));
      _login(phoneNumber);
      localStorage.setItem("phoneNumber", phoneNumber.toString());
      setError(null);
    } else {
      setError("لطفا شماره تماس خود را به درستی وارد کنید.");
    }
  };
  return (
    <div id="invite-page">
      <Head>
        <title>دعوت</title>
        <meta name="description" content="دعوت" />
        <meta name="robots" content="noindex" />
      </Head>
      <div className="pb-70 d-flex flex-column" style={{ height: "80vh" }}>
        <div
          style={{ flex: 1 }}
          className="d-flex flex-column container text-center py-2 col-12 col-xl-3 col-md-6"
        >
          <Paper
            elevation={2}
            className="d-flex flex-1  flex-column align-items-center justify-content-center u-border-radius-8 overflow-hidden position-relative"
            style={{
              height: 320,
            }}
          >
            <div className="d-flex flex-1 flex-column align-items-center p-5">
              <Icon
                icon={GIFT_WITH_STARS}
                width={134}
                height={101}
                color={themeColor}
              />

              <div
                className="u-fontWeightBold mt-5"
                style={{ color: themeColor }}
              >
                {englishNumberToPersianNumber(inviteeGift)} هزار تومان اعتبار
                هدیه برای شما
              </div>
              <div
                className="u-fontWeightBold mt-1"
                style={{ color: themeColor }}
              >
                مخصوص اولین خرید از {businessTitle}
              </div>

              <div className="mt-3">
                {inviter?.name
                  ? ` شما توسط ${inviter?.name} 
                دعوت شده‌اید.`
                  : `شما توسط یکی از همراهان ${businessTitle} دعوت شده‌اید.`}
              </div>
              <div className="mt-1">
                {englishNumberToPersianNumber(inviteeGift)} هزار تومان اعتبار
                هدیه برای سفارش آنلاین به کیف پول شما اضافه شد.
              </div>
              <Input
                type="tel"
                dir="ltr"
                id="phoneNumber"
                value={phoneNumber}
                noModal
                onFocus={() => {
                  document.getElementById("phoneNumber").scrollIntoView();
                }}
                onKeyPress={handleKeyPress}
                onBlur={() => {
                  window.scrollTo(0, 0);
                }}
                label="شماره همراه"
                themeColor={themeColor}
                onChange={(value) =>
                  setPhoneNumber(persianToEnglishNumber(value))
                }
                className={`text-center mt-4 u-fontMedium ${
                  phoneNumber ? "notEmpty" : null
                } d-flex align-items-center opacity-1`}
              />
              {error && (
                <div className="u-text-red u-font-semi-small text-right my-1 mx-2">
                  {error}
                </div>
              )}
            </div>
            <div
              style={{
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
                zIndex: 2000,
              }}
              className="d-flex w-100 text-center sticky-bottom overflow-hidden  p-3 align-items-center bottom-0 u-relative u-border-radius-modal-footer"
            >
              <Button
                color="secondary"
                className="w-100"
                variant="contained"
                onClick={submit}
              >
                تایید و ادامه
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  isLoading: makeSelectLoading(),
  inviter: makeSelectInviter(),
  pluginData: makeSelectPlugin(CRM_PLUGIN),
  businessTitle: makeSelectBusinessTitle(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getMembershipByInviteSlug: (slug) =>
      dispatch(getMembershipByInviteSlug(slug)),
    _setLoginCallBack: (data) => dispatch(setLoginCallBack(data)),
    _login: (phone) => dispatch(login(phone, false, "")),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Invitation);
