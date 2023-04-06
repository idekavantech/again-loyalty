import { useResponsive } from "@saas/utils/hooks/useResponsive";

const AdminProductInBoxWrapper = ({
  children,
  className,
  smallPadding,
  padding,
  style,
  ...props
}) => {
  const { maxWidth430: isMobile } = useResponsive();

  return (
    <div
      style={{
        padding:
          padding ||
          `${
            isMobile ? "15px 0px" : smallPadding ? "21px 48px" : "25px 48px"
          } ${isMobile ? "10px" : smallPadding ? "" : "70px"}`,
        ...style,
      }}
      className={`${className ? className : ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default AdminProductInBoxWrapper;
