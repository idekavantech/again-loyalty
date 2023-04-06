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
              در این قسمت می‌توانید توضیحات یبشتر از وبسایت و خدمات خود ارائه
              دهید. در این قسمت پیشنهاد می‌کنیم متنی در حدود ۳۰۰ تا ۶۰۰ کلمه
              نوشته باشید و از کلمات کلیدی مرتبط با موضوع سایت و کسب‌وکار خود
              استفاده کرده باشید و به شکل یک داستان‌واره کوتاه و جذاب کاربر به
              وبسایت خود علاقه‌مند و با آن آشنا کنید.
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
