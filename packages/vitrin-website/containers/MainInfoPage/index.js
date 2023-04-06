import Stepper from "components/Stepper";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";

import { MainInfoPageSteps } from "./constants";
import BackBtnMainInfoPage from "./components/BackBtnMainInfoPage";
import TopLogoMainInfoPage from "./components/TopLogoMainInfoPage";
import WrapperMainInfoPage from "./components/WrapperMainInfoPage";
import useSyncedStateWithLocalstorage from "../../utils/hooks/useSyncedStateWithLocalstorage";
import AddResourcesMainInfoPage from "./components/AddResourcesMainInfoPage";
import { makeSelectUser } from "@saas/stores/user/selector";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import { makeSelectLoading } from "../../stores/global/selector";
import NewLoadingScreen from "components/NewLoadingScreen";
const ProgressBarMainInfoPage = dynamic(() =>
  import("./components/ProgressBarMainInfoPage")
);
const PromotionMainInfoPage = dynamic(() =>
  import("./components/PromotionMainInfoPage")
);
const FillInformationMainInfoPage = dynamic(() =>
  import("./components/FillInformationMainInfoPage")
);
const SaleSelectPage = dynamic(() => import("./components/SaleSelectPage"));
const SelectLocationMainInfoPage = dynamic(() =>
  import("./components/selectLocation/SelectLocationMainInfoPage")
);

const MainInfo = () => {
  const [statsData, setStatsData] = useSyncedStateWithLocalstorage(
    "statsDataJourney",
    {
      mainInfo: {},
      addressInfo: {},
      images: [],
    }
  );
  const [currentState, setCurrentState] = useSyncedStateWithLocalstorage(
    "MainJourneyStateNumber",
    { number: 1, source: null }
  );
  const [startLoadingScreen, setStartLoadingScreen] = useState(false);
  const [business, setBusiness] = useState(null);

  const isLoadingVitrinInitializing = useSelector(
    makeSelectLoading("initializeVitrin")
  );
  const user = useSelector(makeSelectUser());
  const router = useRouter();

  useLayoutEffect(() => {
    if (!user?.token)
      Router.push(`/login?url=${encodeURIComponent(Router.asPath)}`);
  }, [user]);

  useEffect(() => {
    if (isLoadingVitrinInitializing) setStartLoadingScreen(true);
  }, [isLoadingVitrinInitializing]);

  useEffect(() => {
    const updatedQuery = { ...router.query, journeyStep: currentState.number };
    Router.push({ pathname: router.pathname, query: updatedQuery });
  }, [currentState]);
  return (
    <>
      {startLoadingScreen ? (
        <NewLoadingScreen business={business} />
      ) : (
        <div className="login d-flex flex-column flex-md-row justify-content-md-center align-items-md-center">
          <div className="header d-flex align-items-center d-md-none py-4 px-2 text-center">
            <BackBtnMainInfoPage
              setCurrentState={setCurrentState}
              currentState={currentState}
            />
            <TopLogoMainInfoPage />
          </div>
          <WrapperMainInfoPage>
            <div>
              {currentState.number !== MainInfoPageSteps.information && (
                <ProgressBarMainInfoPage value={currentState.number} />
              )}
              <div className="d-none d-md-flex align-items-center py-4 px-2 text-center">
                <BackBtnMainInfoPage
                  setCurrentState={setCurrentState}
                  currentState={currentState}
                />
                <TopLogoMainInfoPage />
              </div>
              {currentState.number === MainInfoPageSteps.information && (
                <Stepper step={3} />
              )}
            </div>
            {currentState.number === MainInfoPageSteps.information && (
              <FillInformationMainInfoPage
                setCurrentState={setCurrentState}
                setStatsData={setStatsData}
                statsData={statsData}
              />
            )}
            {currentState.number === MainInfoPageSteps.promotion && (
              <PromotionMainInfoPage setCurrentState={setCurrentState} />
            )}

            {currentState.number === MainInfoPageSteps.selectLocation && (
              <SelectLocationMainInfoPage
                setCurrentState={setCurrentState}
                statsData={statsData}
                setStatsData={setStatsData}
              />
            )}

            {currentState.number === MainInfoPageSteps.addImages && (
              <AddResourcesMainInfoPage
                setCurrentState={setCurrentState}
                statsData={statsData}
                setStatsData={setStatsData}
              />
            )}

            {currentState.number === MainInfoPageSteps.sale && (
              <SaleSelectPage
                setStartLoadingScreen={setStartLoadingScreen}
                statsData={statsData}
                setBusiness={setBusiness}
              />
            )}
          </WrapperMainInfoPage>
        </div>
      )}{" "}
    </>
  );
};

export default memo(MainInfo);
