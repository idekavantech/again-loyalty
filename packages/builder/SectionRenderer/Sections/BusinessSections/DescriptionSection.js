import React, { memo } from "react";
import AdminSection from "@saas/components/AdminSection";
function DescriptionSection({
  isEditMode,
  business,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
}) {
  if (isEditMode) {
    return (
      <AdminSection
        isDragging={isDragging}
        dragHandleProps={dragHandleProps}
        style={{ padding: "0px !important" }}
        isActive={isActive}
        onClick={onClick}
        _updateSection={_updateSection}
      >
        <div className="text-center py-5 ">
          {business.description ? (
            <div className="container u-textBlack u-fontLarge-r u-pre-wrap u-overflow-wrap text-center u-lineHeight-24">
              {business.description}
            </div>
          ) : (
            <div className="container u-textBlack u-fontLarge-r u-pre-wrap u-overflow-wrap text-center u-lineHeight-24">
              In this section you can provide more descriptions of your website and services
              Break. In this section we suggest that text of about 1 to 2 words
              Post and from keywords related to your site and business subject
              Have used and in the form of a short and attractive user story
              Your website interest and get to know it.
            </div>
          )}
        </div>
      </AdminSection>
    );
  }
  if (business.description)
    return (
      <div className="text-center py-5 ">
        <div className="container u-textBlack u-fontLarge-r u-pre-wrap u-overflow-wrap text-center u-lineHeight-24">
          {business.description}
        </div>
      </div>
    );
  return <div />;
}

export default memo(DescriptionSection);
