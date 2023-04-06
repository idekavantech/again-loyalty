import useMediaQuery from "@material-ui/core/useMediaQuery";
import React from "react";
import { steps } from "containers/AdminGateAway/constant";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import DoneIcon from "@material-ui/icons/Done";
function Stepper({ step }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const allSteps = steps;
  return (
    <div className="w-100 radius-16 d-flex justify-content-center mt-3 pt-2">
      <div className="container p-0">
        <div className="w-100 d-flex align-items-center justify-content-between">
          {allSteps.map((item) => (
            <React.Fragment key={item.step}>
              <div
                className="w-100 d-flex justify-content-center align-items-center  position-relative"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: item.step > step ? "gray" : "#0050FF",
                  color: "#fff",
                  fontSize: 12,
                }}
              >
                {item.step < step ? (
                  <DoneIcon style={{ fontSize: 20 }} />
                ) : (
                  <span>{englishNumberToPersianNumber(item.step)}</span>
                )}
              </div>
              {item.step === step ? (
                <p
                  className="mr-2"
                  style={{
                    color: "#111",
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: 400,
                  }}
                >
                  {item.title}
                </p>
              ) : null}

              {item.step !== 3 && (
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
