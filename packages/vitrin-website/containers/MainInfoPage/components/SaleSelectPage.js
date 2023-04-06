import React, { memo, useState } from "react";
import { GrowthOpportunities } from "../constants";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { useDispatch } from "react-redux";
import SubmitBtnMainInfoPage from "./SubmitBtnMainInfoPage";
import { initializeVitrin } from "stores/global/actions";
import { useRouter } from "next/router";
import ErrorModal from "components/ErrorModal";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const SaleSelectPage = ({ statsData, setStartLoadingScreen, setBusiness }) => {
  const [selectedFeature, setSelectedFeature] = useState([]);
  const [hasError, setHasError] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { maxWidth430: isMobile } = useResponsive();

  const _initializeVitrin = (data, callback, callbackError) =>
    dispatch(initializeVitrin(data, callback, callbackError));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!statsData.mainInfo) return;
    const callback = (business) => {
      setBusiness(business);
      localStorage.removeItem("MainJourneyStateNumber");
      localStorage.removeItem("statsDataJourney");
      localStorage.removeItem("behtarinoCreatedBusiness");
      localStorage.removeItem("createdBusiness");
      window.dataLayer.push({
        event: "journeyCompleted",
        template: router.query.template,
        siteType: router.query.business_type,
      });
    };
    _initializeVitrin(
      {
        adminName: statsData.mainInfo.firstName,
        title: statsData.mainInfo.businessTitle,
        template_site_domain: router.query.template,
        initialize_shopping: router.query.business_type === "store" ? 0 : 10,
        categories:
          typeof router.query.categories === "string"
            ? [router.query.categories]
            : router.query.categories,
        sub_categories:
          typeof router.query.sub_categories === "string"
            ? [router.query.sub_categories]
            : router.query.sub_categories,
        preferred_services: selectedFeature,
      },
      callback,
      (statusCode) => {
        if (statusCode === 403) setHasError(true);
        setStartLoadingScreen(false);
      }
    );
  };
  return (
    <>
      <form
        onSubmit={onSubmit}
        className={"mt-5 h-100 d-flex justify-content-between flex-col"}
      >
        <div className={"d-flex justify-content-between flex-col"}>
          <h2 style={{ fontSize: isMobile ? 24 : 20, fontWeight: "500" }}>
            رشد کسب‌وکار{" "}
          </h2>
          <p
            className={"mt-2"}
            style={{ fontSize: isMobile ? 17 : 16, lineHeight: "30px" }}
          >
            برای رشد کسب‌وکارتان به‌ جز ساخت سایت به چه امکاناتی نیاز دارید؟
          </p>
          <div className="pt-3">
            {GrowthOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="d-flex align-items-center cursor-pointer"
                style={{ marginTop: 18 }}
                onClick={() => {
                  if (selectedFeature.includes(opp.label)) {
                    setSelectedFeature(
                      selectedFeature.filter(
                        (selected) => selected !== opp.label
                      )
                    );
                  } else setSelectedFeature([...selectedFeature, opp.label]);
                }}
              >
                {selectedFeature.includes(opp.label) ? (
                  <CheckBoxIcon color="primary" />
                ) : (
                  <CheckBoxOutlineBlankIcon
                    style={{ color: "rgba(0, 0, 0, 0.6)" }}
                  />
                )}

                <span className="mr-2" style={{ fontSize: isMobile ? 18 : 16 }}>
                  {opp.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="container px-0 d-flex justify-content-center"
          style={{
            backgroundColor: "#fff",
          }}
        >
          <SubmitBtnMainInfoPage
            onSubmit={onSubmit}
            isDisabled={!selectedFeature.length}
          >
            ورود به پنل مدیریت
          </SubmitBtnMainInfoPage>
        </div>
      </form>
      <ErrorModal isOpen={hasError} onClose={() => setHasError(false)} />
    </>
  );
};

export default memo(SaleSelectPage);
