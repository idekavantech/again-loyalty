/**
 *
 * Section
 *
 */

import React, { memo } from "react";
import { handleKeyDown } from "@saas/utils/helpers/handleKeyDown";
import { CDN_BASE_URL } from "@saas/utils/api";
import LazyImage from "../LazyImage";
const arrow = `${CDN_BASE_URL}arrowBlack.svg`;
function Section({
  children,
  secondary,
  title,
  className,
  id,
  noBorder = false,
  handleShowMoreClick,
  isTitleDark = false,
  hasShowMore,
  themeColor,
  sectionClassName = "",
}) {
  if (secondary) {
    return (
      <section className={sectionClassName}>
        <div className="scroll-margin" id={id} />
        <div className={className}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            {title && (
              <div
                className={`ml-2 u-fontNormal-r ${
                  !isTitleDark ? "u-text-dark-grey" : "u-text-darkest-grey"
                }`}
              >
                {title}
              </div>
            )}
            {!noBorder && (
              <div className="flex-1">
                <hr />
              </div>
            )}
          </div>
          <div>{children}</div>
          {hasShowMore && (
            <div className="mt-2 u-font-semi-small text-center">
              <span
                style={{ color: themeColor }}
                onClick={() => handleShowMoreClick(id)}
                onKeyDown={(e) => handleKeyDown(e, handleShowMoreClick(id))}
                role="button"
                tabIndex="0"
              >
                نمایش بیشتر <LazyImage src={arrow} alt="ویترین" />
              </span>
            </div>
          )}
        </div>
      </section>
    );
  }
  return (
    <>
      <div id={id} className="scroll-margin" />
      <div className={`section ${className}`}>
        {title && <div className="section--title">{title}</div>}
        {title && (
          <hr className="section--hr" style={{ backgroundColor: themeColor }} />
        )}
        {children}
      </div>
    </>
  );
}

Section.defaultProps = {
  noBorder: false,
  isTitleDark: false,
  sectionClassName: "",
  className: "",
};

export default memo(Section);
