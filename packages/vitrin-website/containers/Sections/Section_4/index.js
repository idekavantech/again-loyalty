import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import SectionLink from "components/SectionLink";
import LazyImage from "components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function Section44({ business, content, customization }) {
  const {
    title: { value: title_text },
    description: { value: description_text },
    image: { value: image_url, alternative: image_alt },
    button: { value: button_text, link: button_link },
  } = content;
  const {
    layout: { type },
  } = customization;
  const businessAddress = business?.get_vitrin_absolute_url;
  const isMobile = "";
  const { minWidth992 } = useResponsive();

  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth992;

  return (
    <div
      className="container position-relative p-5 d-flex flex-wrap align-items-center direction-ltr"
      style={{
        paddingTop: 40,
        paddingBottom: 40,
        flexDirection: type === "type_1" ? "row" : "row-reverse",
      }}
    >
      <div
        className={`${
          isDesktop ? "col-lg-6" : "col-12"
        } text-right direction-rtl`}
      >
        <div
          className="my-4"
          style={{
            fontSize: isDesktop ? 30 : 14,
            fontWeight: 900,
            textAlign: isDesktop ? "right" : "center",
          }}
        >
          {title_text}
        </div>
        <div
          className="my-4"
          style={{
            fontSize: isDesktop ? 16 : 12,
            textAlign: isDesktop ? "right" : "center",
          }}
          dangerouslySetInnerHTML={{ __html: description_text }}
        ></div>
        {button_text && (
          <div
            className={`${
              isDesktop ? "flex-lg-row mb-lg-0" : "flex-column"
            } mt-4 mb-4 d-flex align-items-center`}
          >
            <SectionLink
              isExternal={isUrlExternal(button_link)}
              href={button_link}
              businessAddress={businessAddress}
            >
              <Button
                href={button_link}
                variant="outlined"
                style={{
                  minWidth: isDesktop ? 120 : 75,
                  color: "#0050ff",
                  border: "1px solid rgba(0, 80, 255, 0.5)",
                }}
              >
                {button_text}
              </Button>
            </SectionLink>
          </div>
        )}
      </div>
      <div className={isDesktop ? "col-lg-6" : "col-12"}>
        <LazyImage src={image_url} alt={image_alt || business?.revised_title} />
      </div>
    </div>
  );
}

export default memo(Section44);
