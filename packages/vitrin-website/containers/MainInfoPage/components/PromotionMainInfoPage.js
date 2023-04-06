import { MainInfoPageSteps } from "../constants";
import Image from "next/image";
import Button from "@material-ui/core/Button";
import { memo } from "react";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import SubmitBtnMainInfoPage from "./SubmitBtnMainInfoPage";

const PromotionMainInfoPage = ({ setCurrentState }) => {
  const { maxWidth430: isMobile } = useResponsive();
  return (
    <div className={"h-100 d-flex flex-col"}>
      <div className={"d-flex flex-col justify-content-between h-100 pt-5"}>
        <h2 style={{ fontSize: isMobile ? 27 : 20, fontWeight: 500 }}>
          بیشتر دیده شوید!
        </h2>
        <p
          style={{
            fontSize: isMobile ? 18 : 16,
            marginTop: isMobile ? -40 : -10,
            lineHeight: 1.6,
          }}
        >
          ویترین این امکان را دارد که با اتصال به پلتفرم‌های پربازدید مانند
          گوگل، بهترینو، ترب و... به <strong>جذب مشتری</strong> بیشتر شما کمک
          کند.
        </p>
        <Image
          width={isMobile ? 220 : 150}
          height={isMobile ? 220 : 150}
          src={"/images/promotion-img.svg"}
        />
        <div className="d-flex px-2">
          <SubmitBtnMainInfoPage
            onClick={() =>
              setCurrentState((prevState) => ({
                ...prevState,
                number: MainInfoPageSteps.selectLocation,
              }))
            }
          >
            تکمیل اطلاعات
          </SubmitBtnMainInfoPage>

          <Button
            onClick={() =>
              setCurrentState({
                source: MainInfoPageSteps.promotion,
                number: MainInfoPageSteps.sale,
              })
            }
            color={"primary"}
            className={"mr-3 ml-2"}
          >
            رد کردن
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(PromotionMainInfoPage);
