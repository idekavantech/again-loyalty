import React, { memo } from "react";
import AdminSection from "@saas/components/AdminSection";
import { useHtmlTag } from "@saas/utils/hooks/useHtmlTag";
import Paper from "@material-ui/core/Paper";
function Title1({
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  content,
  isMobile,
}) {
  const {
    title: {
      value: title_value,
      color: title_color,
      font_size: title_font_size,
      html_tag: title_html_tag,
      position: title_position,
    },
  } = content;

  const htmlTag = useHtmlTag(title_html_tag, {
    title_color,
    title_font_size,
    title_position,
    title_value,
  });

  return (
    <AdminSection
      isEditMode={!!isEditMode}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
    >
      <Paper elevation={0} className="container p-3">
        {title_value ? (
          htmlTag
        ) : (
          <div
            className={`${
              isMobile ? "col-12" : "col-lg-6"
            } mx-auto text-center py-2`}
          >
            There is no title to show.
          </div>
        )}
      </Paper>
    </AdminSection>
  );
}

export default memo(Title1);
