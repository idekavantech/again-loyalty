import React, { memo } from "react";
import AdminSection from "@saas/components/AdminSection";
import LazyImage from "@saas/components/LazyImage";
function AboutUs1({
  isEditMode,
  business,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  onClick,
}) {
  if (isEditMode) {
    return (
      <AdminSection
        isDragging={isDragging}
        dragHandleProps={dragHandleProps}
        onClick={onClick}
        isActive={isActive}
        _updateSection={_updateSection}
      >
        <div className="container text-center py-5">
          <div className="c-profile-sec mx-auto mb-5">
            {business.icon_image_url ? (
              <div className="object-fit w-100 h-100">
                <LazyImage
                  src={business.icon_image_url}
                  alt={business.revised_title}
                />
              </div>
            ) : null}
          </div>
          {business.about_us ? (
            <div
              className="u-textBlack u-fontLarge-r mt-3"
              dangerouslySetInnerHTML={{
                __html: business.about_us,
              }}
            />
          ) : (
            <div className="u-textBlack u-fontLarge-r mt-3">
              در این قسمت توضیحات کلی راجع به وبسایت خود، خدمات و تمایز خود
              بنویسید (این متن فقط جهت آشنایی شماست و باید آن‌را پاک کنید و با
              متن نوشته شده توسط خودتان جایگزین کنید، سعی کنید طول متن این قسمت
              بیش‌تر از ۳ تا ۵ خط نباشد). این توضیحات به آشنایی بهتر
              بازدیدکنندگان سایت‌تان با شما کمک می‌کند و علاوه بر آن باعث می‌شود
              رتبه‌های بهتری در نتایج گوگل داشته باشید. سعی کنید کلمات کلیدی
              اصلی مرتبط با موضوع وبسایت خود را در این قسمت داشته باشید.
            </div>
          )}
        </div>
      </AdminSection>
    );
  }
  return (
    <div className="container text-center py-4 position-relative">
      {business.icon_image_url ? (
        <div className="c-profile-sec mx-auto mb-5">
          <div className="object-fit w-100 h-100">
            <LazyImage
              src={business.icon_image_url}
              alt={business.revised_title}
            />
          </div>
        </div>
      ) : null}
      {business.about_us && (
        <div
          className="u-textBlack u-fontLarge-r mt-3"
          dangerouslySetInnerHTML={{
            __html: business.about_us,
          }}
        />
      )}
    </div>
  );
}

export default memo(AboutUs1);
