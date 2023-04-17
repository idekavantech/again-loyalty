import { memo } from "react";
import { textTypes } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Image from "next/image";

const CategoryNavItem = ({
  categoryImage,
  categoryName,
  isActive,
  id,
  hasImage,
}) => {
  const { maxWidth768 } = useResponsive();
  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;
  return (
    <div
      id={`${id}`}
      className={`${maxWidth768 ? "mx-5" : "mx-5"} ${
        isActive ? "active-category" : ""
      } hierarchy-category d-flex flex-column align-items-center justify-content-center`}
      style={{
        cursor: "pointer",
        borderBottom: isActive
          ? `4px solid ${themeColor}`
          : "4px solid transparent",
      }}
    >
      {hasImage ? (
        <Image
          layout={"fixed"}
          width={maxWidth768 ? 24 : 32}
          height={maxWidth768 ? 24 : 32}
          quality={30}
          className={`${maxWidth768 ? "mb-1" : "mb-2"} u-border-radius-8`}
          src={categoryImage}
          alt={`tag Photo${categoryImage}`}
        />
      ) : null}
      <div
        className="category-item-name"
        style={{
          whiteSpace: "nowrap",
          fontSize: maxWidth768 ? 12 : 16,
          fontWeight: 400,
          color: textTypes.text.default,
        }}
      >
        {categoryName}
      </div>
    </div>
  );
};

export default memo(CategoryNavItem);
