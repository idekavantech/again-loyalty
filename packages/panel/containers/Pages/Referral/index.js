import React, { memo, useEffect, useState } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { compose } from "redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createStructuredSelector } from "reselect";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
} from "@saas/stores/business/selector";
import { getSelfMembership } from "@saas/stores/user/actions";
import Icon from "@saas/components/Icon";
import {
  TELEGRAM,
  WHATSAPP,
  SMS,
  EMAIL,
  GIFT_WITH_STARS,
  SHARE,
  COPY,
} from "@saas/icons";
import { noOp } from "@saas/utils/helpers/noOp";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { getMobileOperatingSystem } from "@saas/utils/helpers/getMobileOperatingSystem";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Modal from "@saas/components/Modal";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { makeSelectUser } from "@saas/stores/user/selector";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import { pollution } from "@saas/utils/colors";

function Referral({
  themeColor,

  _setSnackBarMessage,
  business,
  _getSelfMembership,
  user = { inviteLink: "" },
  pluginData,
}) {
  const [shareModal, setShareModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      _getSelfMembership();
    }, 0);
  }, []);
  const inviterGift = priceFormatter(pluginData.data.gift_amount_for_inviter);
  const inviteeGift = priceFormatter(pluginData.data.gift_amount_for_invited);
  const link = `${business.get_vitrin_absolute_url}/invite/${user.inviteCode}`;
  const toFriendText = `${
    business.revised_title
  } I suggest you. To buy the first one can be with${englishNumberToPersianNumber(
    Math.round(pluginData.data.gift_amount_for_invited / 1000)
  )} Thousands of Tomans Credit gifts from her.
You can try it right now, use the link below:\n${link}`;
  return (
    <div>
      <Head>
        <title>Invite friends</title>
        <meta name="description" content="Description of Referral" />
      </Head>
      <Modal
        isOpen={shareModal}
        onClose={() => setShareModal(false)}
        body={
          <div className="p-4 w-100" style={{ borderRadius: "8px 8px 0 0" }}>
            <div className="u-text-black">Share through...</div>
            <div className="d-flex justify-content-center mt-5">
              <div>
                <Icon
                  onClick={() => {
                    window.location = `tg://msg?text=${encodeURI(
                      toFriendText
                    )}`;
                  }}
                  className="u-cursor-pointer mx-4"
                  icon={TELEGRAM}
                  size={40}
                  color={pollution}
                />
                <div className="text-center mt-2">Telegram</div>
              </div>
              <div>
                <Icon
                  className="u-cursor-pointer mx-4"
                  onClick={() => {
                    window.location = `whatsapp://send?text=${encodeURI(
                      toFriendText
                    )}`;
                  }}
                  icon={WHATSAPP}
                  size={40}
                  color={pollution}
                />
                <div className="text-center mt-2">Whatsapp</div>
              </div>
              <div>
                <Icon
                  className="u-cursor-pointer mx-4"
                  onClick={() => {
                    window.location = `sms:${
                      getMobileOperatingSystem() === "Android" ? "?" : "/&"
                    }body=${encodeURI(toFriendText)}`;
                  }}
                  icon={SMS}
                  size={40}
                  color={pollution}
                />
                <div className="text-center mt-2">SMS</div>
              </div>
              <div>
                <Icon
                  className="u-cursor-pointer mx-4"
                  onClick={() => {
                    window.location = `mailto:?to=&body=${encodeURI(
                      toFriendText
                    )}`;
                  }}
                  icon={EMAIL}
                  size={40}
                  color={pollution}
                />
                <div className="text-center mt-2">Email</div>
              </div>
            </div>
          </div>
        }
      />
      <div className="pb-5">
        <div className="container text-center py-2 col-12 col-xl-3 col-md-6 px-0">
          <div
            className="mx-2 container-shadow d-flex  flex-column u-text-black align-items-center justify-content-center p-5 u-border-radius-8 position-relative"
            style={{
              height: 340,
            }}
          >
            <Icon
              icon={GIFT_WITH_STARS}
              width={134}
              height={101}
              color={themeColor}
            />
            <div className="u-fontWeightBold mt-3">
              {englishNumberToPersianNumber(inviteeGift)} Give the gift,{" "}
              {englishNumberToPersianNumber(inviterGift)} Take a gift!
            </div>
            <div className="mt-5 mx-5 u-fontNormal">
              <div>
                By introducing 4 of your friends to each{" "}
                {englishNumberToPersianNumber(
                  Math.round(pluginData.data.gift_amount_for_invited / 1000)
                )}{" "}
                Give a thousand tomans for the first purchase and buy each of them{" "}
                {englishNumberToPersianNumber(
                  Math.round(pluginData.data.gift_amount_for_inviter / 1000)
                )}{" "}
                Thousand Tomans and Total{" "}
                {englishNumberToPersianNumber(
                  Math.round(pluginData.data.gift_amount_for_inviter / 200)
                )}{" "}
                Milk a gift of gift.
              </div>
            </div>
          </div>
          <div
            style={{ backgroundColor: themeColor, fontFamily: "sans-serif" }}
            className="m-2 u-text-ellipse u-border-radius-8 p-3 mt-3 direction-ltr u-text-white u-fontWeightBold u-fontLarge"
          >
            {link}
          </div>
          <div
            className="d-flex justify-content-center px-5"
            style={{ color: themeColor }}
          >
            <div
              role="button"
              tabIndex="0"
              onKeyDown={noOp}
              onClick={() => setShareModal(true)}
              className="d-flex justify-content-center u-cursor-pointer"
              style={{ width: 100 }}
            >
              <span>share</span>
              <Icon icon={SHARE} size={20} color={themeColor} />
            </div>
            <CopyToClipboard
              text={link}
              onCopy={() => _setSnackBarMessage("Copied.", "default")}
            >
              <div
                className="d-flex justify-content-center u-cursor-pointer"
                style={{ width: 100 }}
              >
                <span>Copy</span>
                <Icon icon={COPY} size={20} color={themeColor} />
              </div>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  business: makeSelectBusiness(),
  user: makeSelectUser(),
  pluginData: makeSelectPlugin(CRM_PLUGIN),
});

function mapDispatchToProps(dispatch) {
  return {
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _getSelfMembership: () => dispatch(getSelfMembership()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Referral);
