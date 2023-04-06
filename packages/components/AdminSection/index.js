/**
 *
 * AdminSection
 *
 */
import React, { memo } from "react";
import { handleKeyDown } from "@saas/utils/helpers/handleKeyDown";

function AdminSection({
  children,
  onClick,
  className = "",
  style,
  isEditMode = true,
  isDragging,
}) {
  if (!isEditMode) return children;
  const scale = isDragging * -0.05 + 1;
  return (
    <div
      className={`u-addItem u-relative ${className}`}
      onClick={onClick}
      onKeyDown={(e) => handleKeyDown(e, onClick)}
      role="button"
      tabIndex="0"
      style={{
        transition: "all 0.3s ease-in-out",
        transform: `scale(${scale})`,
        ...style,
      }}
    >
      <div className="u-pointer-events-none">{children}</div>
    </div>
  );
}

export default memo(AdminSection);
