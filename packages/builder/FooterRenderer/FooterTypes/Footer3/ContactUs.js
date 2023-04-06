import React, { memo, useCallback } from "react";
import { noOp } from "@saas/utils/helpers/noOp";
import { callPhoneNumber } from "@saas/utils/helpers/callPhoneNumber";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Icon from "@saas/components/Icon";
import { INSTAGRAM, WHATSAPP, LINKED_IN } from "@saas/icons";
import TelegramIcon from "@saas/components/Icon/TelegramIcon";

function ContactUs({ business, themeColor }) {
  const {
    phone_zero_starts: businessPhoneNumber,
    more_phone_numbers: businessExtraPhoneNumber,
    instagram_url: instagramUrl,
    telegram_url: telegramUrl,
    linkedin_url: linkedinUrl,
    whatsapp_url: whatsappUrl,
    address,
  } = business;
  const callPhone = useCallback(
    (phoneNumber) => () => {
      if (phoneNumber) callPhoneNumber(phoneNumber);
    },
    []
  );
  const showInstagram =
    instagramUrl && instagramUrl !== "https://www.instagram.com/";
  const showWhatsapp = whatsappUrl && whatsappUrl !== "https://wa.me/";
  const showTelegram = telegramUrl && telegramUrl !== "https://t.me/";
  const showLinkedIn =
    linkedinUrl && linkedinUrl !== "https://linkedin.com/in/";

  return (
    <div className="text-md-right">
      {address ? (
        <address className="u-text-black u-fontLarge-r mt-5">
          آدرس: {address}
        </address>
      ) : (
        <div className="u-text-black u-fontLarge-r mt-5">
          آدرس: آدرس و موقعیت کسب و کار شما
        </div>
      )}
      <div className="d-flex flex-column">
        <div className="u-fontMedium u-text-black mt-2">شماره تماس:</div>
        <div
          className="u-fontMedium u-text-black mt-1 mr-1 u-cursor-pointer"
          onClick={callPhone(businessPhoneNumber)}
          onKeyDown={noOp}
          role="button"
          tabIndex="0"
        >
          {businessPhoneNumber
            ? englishNumberToPersianNumber(businessPhoneNumber)
            : "تماس"}
        </div>
        {businessExtraPhoneNumber && (
          <div
            style={{ whiteSpace: "pre" }}
            className="u-fontMedium u-text-black mt-1 mr-1 u-cursor-pointer"
            onClick={callPhone(businessExtraPhoneNumber)}
            onKeyDown={noOp}
            role="button"
            tabIndex="0"
          >
            {businessExtraPhoneNumber
              ? englishNumberToPersianNumber(businessExtraPhoneNumber)
              : "تماس"}
          </div>
        )}
        <div className="w-100 mt-2">
          {showInstagram &&
            instagramUrl &&
            instagramUrl.split("linkedin.com/in/")[1] && (
              <a
                target="blank"
                className="d-flex justify-content-center justify-content-md-start align-items-center mt-2"
                href={instagramUrl}
              >
                <span
                  style={{ color: themeColor }}
                  className="ml-1 u-text-ellipse direction-ltr"
                >
                  {instagramUrl.split("instagram.com/")[1]}
                </span>
                <Icon
                  className="min-width-20"
                  icon={INSTAGRAM}
                  color={themeColor}
                />
              </a>
            )}
          {showTelegram &&
            telegramUrl &&
            telegramUrl.split("linkedin.com/in/")[1] && (
              <a
                target="blank"
                className="d-flex justify-content-center justify-content-md-start align-items-center mt-2"
                href={telegramUrl}
              >
                <span
                  style={{ color: themeColor }}
                  className="ml-1 u-text-ellipse direction-ltr"
                >
                  {telegramUrl.split("t.me/")[1].split("/")[0]}
                </span>
                <TelegramIcon color={themeColor} />
              </a>
            )}
          {showLinkedIn &&
            linkedinUrl &&
            linkedinUrl.split("linkedin.com/in/")[1] && (
              <a
                target="blank"
                className="d-flex justify-content-center justify-content-md-start align-items-center mt-2"
                href={linkedinUrl}
              >
                <span
                  style={{ color: themeColor }}
                  className="ml-1 u-text-ellipse direction-ltr"
                >
                  {linkedinUrl.split("linkedin.com/in/")[1].split("/")[0]}
                </span>
                <Icon
                  icon={LINKED_IN}
                  color={themeColor}
                  className="c-social-media-icon"
                />
              </a>
            )}
          {showWhatsapp &&
            whatsappUrl &&
            whatsappUrl.split("linkedin.com/in/")[1] && (
              <a
                target="blank"
                className="d-flex justify-content-center justify-content-md-start align-items-center mt-2"
                href={whatsappUrl}
              >
                <span
                  style={{ color: themeColor }}
                  className="ml-1 u-text-ellipse direction-ltr"
                >
                  {whatsappUrl.split("wa.me/")[1].split("/")[0]}
                </span>
                <Icon
                  icon={WHATSAPP}
                  color={themeColor}
                  width={25}
                  height={25}
                  className="c-social-media-icon"
                />
              </a>
            )}
        </div>
      </div>
    </div>
  );
}

export default memo(ContactUs);
