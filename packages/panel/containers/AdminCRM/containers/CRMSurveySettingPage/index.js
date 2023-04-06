import React, { memo, useEffect } from "react";
import { textTypes } from "@saas/utils/colors";
import Paper from "@material-ui/core/Paper";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import Link from "next/link";
import { useCRMSurveySettingPage } from "./useCRMSurveySettingPage";
import Button from "@material-ui/core/Button";
import CrmSurveySettingModal from "./crmSurveySettingModal";
import SettingsIcon from '@material-ui/icons/Settings';

function CRMLabelsPage() {
  const {
    settingTypes,
    loading,
    urlPrefix,
    business,
    reviewsTemplate,
    showSettingModal,
    setShowSettingModal,
    submitCrmSurveyDelay,
    feedBackDelay
  } = useCRMSurveySettingPage();

  return (
    <div className="container">
      <AdminBreadCrumb
        buttons={
          <div className="d-flex">
            <Button
              color="primary"
              variant="contained"
              startIcon={<SettingsIcon style={{marginLeft:".5rem"}}/>}
               onClick={()=> setShowSettingModal(true)}
            >
              Survey settings
            </Button>
          </div>
        }
      />
      <CrmSurveySettingModal
        showSettingModal={showSettingModal}
        setShowSettingModal={setShowSettingModal}
        submitCrmSurveyDelay = {submitCrmSurveyDelay}
        feedbackDelay = {feedBackDelay}
      />
      <div>
        <p
          className="mt-2 pb-2"
          style={{ fontSize: 14, lineHeight: "24px", fontWeight: 500 }}
        >
          It is possible for you to have a different customer ordering methods,
          Have different poll questions. To make survey settings with
          Different methods, click on the related section.{" "}
        </p>
      </div>
      <div>
        {settingTypes.map((type, index) => {
          const label =
            reviewsTemplate.find(
              (item) => item.extra_data?.base_on_value === type.label
            )?.id || "setting";
          return (
            <Paper
              key={`${type.id}-${index}`}
              elevation={1}
              style={{ marginTop: 24, padding: 24 }}
            >
              <Link
                passHref
                href={`${urlPrefix}crm/survey/${
                  reviewsTemplate ? label : `setting`
                }?delivery_site_type=${type?.label}`}
              >
                <div className="u-cursor-pointer d-flex justify-content-between align-items-center">
                  <div>
                    <p
                      style={{
                        textAlign: "right",
                        color: textTypes.text.default,
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: "28px",
                      }}
                    >
                      {type?.title}
                    </p>
                    <p
                      className="mt-2"
                      style={{ fontSize: 14, color: "#6D7175" }}
                    >
                      {type?.description}
                    </p>
                  </div>
                  <div style={{ color: "#5C5F62", height: 24 }}>
                    <KeyboardArrowLeftRoundedIcon size="medium" />
                  </div>
                </div>
              </Link>
            </Paper>
          );
        })}
      </div>
    </div>
  );
}

export default memo(CRMLabelsPage);
