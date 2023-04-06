import ThreeDotsBounceLoading from "@saas/components/ThreeDotsBounceLoading";
import { memo } from "react";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const SubmitBtnMainInfoPage = ({
  onSubmit,
  isDisabled,
  children,
  onClick,
  isLoading,
  style,
  type,
}) => {
  const { maxWidth430: isMobile } = useResponsive();

  return (
    <button
      className="radius-8"
      {...(!!onSubmit && { onSubmit })}
      {...(!!type && { type: "submit" })}
      {...(!!onClick && { onClick })}
      style={{
        height: isMobile ? 52 : 42,
        fontSize: isMobile ? 16 : 14,
        width: "100%",
        backgroundColor: isDisabled ? "rgba(0, 0, 0, 0.12)" : "#0050FF",
        color: isDisabled ? "rgba(0, 0, 0, 0.26)" : "#fff",
        ...style,
      }}
      disabled={isDisabled}
    >
      {isLoading ? (
        <div className={"w-100 d-flex justify-content-center"}>
          <ThreeDotsBounceLoading color={"#000"} size={8} />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default memo(SubmitBtnMainInfoPage);
