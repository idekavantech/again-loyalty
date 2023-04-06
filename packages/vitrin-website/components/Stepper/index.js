import { SELECT_WEBSITE_TYPE, REGISTER } from "./constants";
import React from "react";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const steps = [
  {
    id: 1,
    label: SELECT_WEBSITE_TYPE,
    icon: "/images/display-icon-gray.svg",
    activeIcon: "/images/display-icon-blue.svg",
    title: "انتخاب قالب",
  },
  {
    id: 2,
    label: REGISTER,
    icon: "/images/add-profile-icon-gray.svg",
    activeIcon: "/images/add-profile-icon-blue.svg",
    title: "ثبت نام",
  },
  {
    id: 3,
    label: "ساخت کسب‌وکار",
    icon: "/images/work-icon-gray.svg",
    activeIcon: "/images/work-icon-blue.svg",
    title: "اطلاعات اصلی",
  },
];
function Stepper({ step }) {
  const allSteps = steps;
  const { maxWidth768 } = useResponsive();
  return (
    <div
      className="w-100 radius-16 d-flex justify-content-center"
      style={{
        backgroundColor: "#fff",
        marginTop: maxWidth768 ? 0 : 80,
        marginBottom: maxWidth768 || step !== 2 ? 0 : 50,
      }}
    >
      <div className="container p-0" style={{ maxWidth: 1280 }}>
        <div className="w-100 d-flex align-items-center justify-content-between">
          {allSteps.map((item) => (
            <React.Fragment key={item.id}>
              <div
                className="w-100 d-flex justify-content-center align-items-center  position-relative"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: item.id > step ? "gray" : "#0050FF",
                  color: "#fff",
                  fontSize: 12,
                }}
              >
                {item.id < step ? (
                  <img alt="" src="/images/CheckFilled.svg" width={20} />
                ) : (
                  <span>{englishNumberToPersianNumber(item.id)}</span>
                )}
              </div>
              {item.id == step ? (
                <p
                  className="mr-2"
                  style={{
                    color: "#111",
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  {item.title}
                </p>
              ) : null}

              {item.id !== 3 && (
                <div
                  className="flex-1 mx-2"
                  style={{
                    height: 1,
                    backgroundColor: "gray",
                  }}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stepper;
