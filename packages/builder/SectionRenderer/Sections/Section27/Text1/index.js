import React, { memo } from "react";
import AdminSection from "@saas/components/AdminSection";
import LazyImage from "@saas/components/LazyImage";

function Text1({
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  content,
  isMobile,
  customization,
}) {
  const {
    text: { value: richtext_value },
  } = content;
  const {
    background: {
      background_type: backgroundType,
      background_image: backgroundImage,
      background_color: backgroundColor,
      opacity = 100,
    } = {},
  } = customization;
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
        className="container p-3 position-relative section-27-text-1"
        style={{
          backgroundColor: backgroundType === "color" && backgroundColor,
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .tiny-editor{
            line-height: 1.82;
            text-align: unset !important;
          
          }
          .tiny-editor  *{
            white-space: pre-line;

            
          }
          .tiny-editor img{
            max-width: 100%
          }
          .tiny-editor p>span{
            white-space: pre;           /* CSS 2.0 */
            white-space: pre-wrap;      /* CSS 2.1 */
            white-space: -pre-wrap;     /* Opera 4-6 */
            white-space: -o-pre-wrap;   /* Opera 7 */
            white-space: -moz-pre-wrap; /* Mozilla */
            white-space: -hp-pre-wrap;  /* HP Printers */
            word-wrap: break-word;
            -moz-hyphens:auto; 
            -webkit-hyphens:auto; 
            -o-hyphens:auto; 
            hyphens:auto;
           }
        .ql-editor li:not(.ql-direction-rtl)::before {
            margin-left: 0 !important;
        }
        `,
          }}
        ></style>
        {richtext_value ? (
          <div
            className="col-12 tiny-editor ql-editor"
            dangerouslySetInnerHTML={{ __html: richtext_value }}
          ></div>
        ) : isEditMode ? (
          <div
            className={`${
              isMobile ? "col-12" : "col-lg-6"
            } mx-auto py-5 text-center`}
          >
            With this sequel you can easily find your texts for the blog
            Implement and give those desired forms.
          </div>
        ) : null}
      </div>
    </AdminSection>
  );
}

export default memo(Text1);
