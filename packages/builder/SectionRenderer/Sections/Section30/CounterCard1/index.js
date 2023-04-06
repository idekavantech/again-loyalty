import React, { memo, useEffect, useState } from "react";
import AdminSection from "@saas/components/AdminSection";
import Button from "@material-ui/core/Button";
import SectionLink from "../../../components/SectionLink";
import CountUpAnimation from "@saas/components/CountUpAnimation";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function CounterCard1({
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  business,
  content,
  isMobile,
}) {
  const {
    background: { color: background_color },
    cards: { items = [] },
  } = content;
  const { minWidth992 } = useResponsive();
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth992;
  const businessAddress = business.get_vitrin_absolute_url;
  let numberOfCards = items.length;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AdminSection
      isEditMode={!!isEditMode}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
    >
      <div
        className={`${
          isDesktop ? "flex-lg-row" : "flex-column"
        } p-5 text-center d-flex`}
        style={{ backgroundColor: background_color }}
      >
        {items.map((item, index) => {
          const numbersOfPrice = item.price.replace(/\D/g, "");
          return (
            <div
              key={item.id}
              className={`${
                numberOfCards === 3
                  ? isDesktop
                    ? "col-lg-4"
                    : "col-12"
                  : numberOfCards === 2
                  ? isDesktop
                    ? "col-lg-6"
                    : "col-12"
                  : "col-12"
              }`}
              style={{
                marginBottom:
                  isDesktop || index === numberOfCards - 1 ? "" : "80px",
              }}
            >
              <div
                className="u-fontWeightBold u-fontLarge mb-2 u-pre-wrap u-overflow-wrap"
                style={{ color: item.title_color }}
              >
                {item.title}
              </div>
              <div
                className="u-fontWeightBold u-pre-wrap u-overflow-wrap"
                style={{
                  color: item.price_color,
                  fontSize: isDesktop ? 32 : 28,
                }}
              >
                {isClient && numbersOfPrice && (
                  <CountUpAnimation duration={2000}>
                    {numbersOfPrice}
                  </CountUpAnimation>
                )}
              </div>
              <div
                className="u-fontWeightBold mb-4 u-pre-wrap u-overflow-wrap"
                style={{
                  color: item.subtitle_color,
                  fontSize: isDesktop ? 32 : 28,
                }}
              >
                {item.subtitle}
              </div>
              <div
                className="u-fontWeightBold mb-2 u-pre-wrap u-overflow-wrap"
                style={{ color: item.button_head_title_color }}
                dangerouslySetInnerHTML={{
                  __html: `${item.button_head_title}`,
                }}
              ></div>
              {item.button_text && (
                <SectionLink
                  href={item.button_link}
                  businessAddress={businessAddress}
                  isExternal={isUrlExternal(item.button_link)}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{
                      minWidth: 130,
                      color: item.button_title_color,
                      backgroundColor: item.button_backgrond_color,
                    }}
                  >
                    {item.button_text}
                  </Button>
                </SectionLink>
              )}
            </div>
          );
        })}
      </div>
    </AdminSection>
  );
}

export default memo(CounterCard1);
