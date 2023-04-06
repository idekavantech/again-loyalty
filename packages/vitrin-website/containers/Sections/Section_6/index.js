import React, { memo } from "react";
function Text1({ content, isMobile = "" }) {
  const {
    text: { value: richtext_value },
  } = content;
  return (
    <div className="container p-3">
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
          با این سکشن می‌توانید متون خود برای وبلاگ موردنظر را به راحتی
          پیاده‌سازی کرده و به آن فرم‌های مورد نظر خود را بدهید.
        </div>
      ) : null}
    </div>
  );
}

export default memo(Text1);
