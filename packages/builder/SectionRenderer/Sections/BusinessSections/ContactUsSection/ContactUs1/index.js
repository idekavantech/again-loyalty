import React, { memo, useCallback } from "react";
import Section from "@saas/components/Section";
import { noOp } from "@saas/utils/helpers/noOp";
import { callPhoneNumber } from "@saas/utils/helpers/callPhoneNumber";
import LazyImage from "@saas/components/LazyImage";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import AdminSection from "@saas/components/AdminSection";
import Icon from "@saas/components/Icon";
import { INSTAGRAM, WHATSAPP, LINKED_IN } from "@saas/icons";
import TelegramIcon from "@saas/components/Icon/TelegramIcon";
import { pollution } from "@saas/utils/colors";
function ContactUs1({
  isEditMode,
  onClick,
  themeColor,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  business,
  customization,
}) {
  const {
    phone_zero_starts: businessPhoneNumber,
    more_phone_numbers: businessExtraPhoneNumber,
    instagram_url: instagramUrl,
    telegram_url: telegramUrl,
    linkedin_url: linkedinUrl,
    whatsapp_url: whatsappUrl,
  } = business;
  const {
    background: {
      background_type: backgroundType,
      background_image: backgroundImage,
      background_color: backgroundColor,
      opacity = 100,
    } = {},
  } = customization;

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
    <AdminSection
      isEditMode={!!isEditMode}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
    >
      {backgroundImage && backgroundType === "image" && (
        <div
          className="position-absolute left-0 u-top-0 h-100 w-100 d-block"
          style={{ opacity: opacity / 100 }}
        >
          <LazyImage src={backgroundImage} />
        </div>
      )}
      <div
        style={{
          backgroundColor: backgroundType === "color" && backgroundColor,
        }}
      >
        <Section
          themeColor={themeColor}
          title="تماس با ما"
          className={`${isEditMode ? "py-5" : "py-3"} position-relative`}
        >
          <div className="d-flex flex-column align-items-center container">
            <div className="w-100">
              {showInstagram && instagramUrl && (
                <a
                  target="blank"
                  className="d-flex justify-content-center align-items-center mt-2"
                  href={instagramUrl}
                >
                  <span className="ml-1 u-text-ellipse u-text-primary-blue-remove direction-ltr">
                    {instagramUrl.split("instagram.com/")[1]}
                  </span>
                  <Icon icon={INSTAGRAM} color={pollution} />
                </a>
              )}
              {showTelegram && telegramUrl && telegramUrl.split("t.me/")[1] && (
                <a
                  target="blank"
                  className="d-flex justify-content-center align-items-center mt-2"
                  href={telegramUrl}
                >
                  <span className="ml-1 u-text-ellipse u-text-primary-blue-remove direction-ltr">
                    {telegramUrl.split("t.me/")[1].split("/")[0]}
                  </span>
                  <TelegramIcon />
                </a>
              )}
              {showLinkedIn &&
                linkedinUrl &&
                linkedinUrl.split("linkedin.com/in/")[1] && (
                  <a
                    target="blank"
                    className="d-flex justify-content-center align-items-center mt-2"
                    href={linkedinUrl}
                  >
                    <span className="ml-1 u-text-ellipse u-text-primary-blue-remove direction-ltr">
                      {linkedinUrl.split("linkedin.com/in/")[1].split("/")[0]}
                    </span>
                    <Icon
                      icon={LINKED_IN}
                      color={pollution}
                      size={20}
                      className="c-social-media-icon"
                    />
                  </a>
                )}
              {showWhatsapp && whatsappUrl && whatsappUrl.split("wa.me/")[1] && (
                <a
                  target="blank"
                  className="d-flex justify-content-center align-items-center mt-2"
                  href={whatsappUrl}
                >
                  <span className="ml-1 u-text-ellipse u-text-primary-blue-remove direction-ltr">
                    {whatsappUrl.split("wa.me/")[1].split("/")[0]}
                  </span>
                  <Icon
                    icon={WHATSAPP}
                    color={pollution}
                    width={25}
                    height={25}
                    className="c-social-media-icon"
                  />
                </a>
              )}
            </div>

            <div className="u-fontMedium u-text-dark-grey mt-4">
              شماره تماس:
            </div>
            <div
              className="u-fontMedium u-text-darkest-grey mt-1 mr-1 u-cursor-pointer"
              onClick={callPhone(businessPhoneNumber)}
              onKeyDown={noOp}
              role="button"
              tabIndex="0"
            >
              {businessPhoneNumber
                ? englishNumberToPersianNumber(businessPhoneNumber)
                : "تماس"}
            </div>
          </div>
          {businessExtraPhoneNumber && (
            <div
              style={{ whiteSpace: "pre" }}
              className="u-fontMedium u-text-darkest-grey mt-1 mr-1 u-cursor-pointer"
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
        </Section>
      </div>
    </AdminSection>
  );
}

export default memo(ContactUs1);
