import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { getAdminUrl } from "@saas/utils/helpers/getAdminUrl";

const AdminTopBar = ({ business }) => {
  const { maxWidth600: isMobile } = useResponsive();
  const onReturnToPanelClick = () => {
    window.open(getAdminUrl(business), "_blank");
  };
  return (
    <div
      className={`w-100 d-flex justify-content-between align-items-center ${
        isMobile ? "px-3" : "px-5"
      }`}
      style={{
        backgroundColor: "#272B34",
        height: 56,
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1300,
        fontFamily: "Dana",
      }}
    >
      <p
        style={{
          fontSize: isMobile ? "11px" : "14px",
          width: isMobile ? "33%" : "auto",
          lineHeight: "1.8",
        }}
      >
        کاربران سایت شما را این‌گونه می‌بینند
      </p>
      <p style={{ cursor: "pointer" }} onClick={onReturnToPanelClick}>
        بازگشت به پنل
      </p>
    </div>
  );
};

export default AdminTopBar;
