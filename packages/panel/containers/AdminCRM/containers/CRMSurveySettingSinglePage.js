import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { textTypes, night } from "@saas/utils/colors";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@saas/icons/addIcon";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Switch from "@material-ui/core/Switch";
import { Collapse } from "react-collapse";
import useTheme from "@material-ui/core/styles/useTheme";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@material-ui/icons/KeyboardArrowUpRounded";
import CloseIcon from "@material-ui/icons/Close";
import { createSurveyTemplate, getReviewsTemplate, updateSurveyTemplate } from "store/actions";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import {
  makeSelectBusiness,
  makeSelectSurveyTemplate,
} from "@saas/stores/business/selector";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import { getSurveyTemplate } from "@saas/stores/business/actions";
import { deliveryTypesConstants } from "../constants";
import { makeSelectReviewsTemplate } from "store/selectors";

const BASED_ON = 0

const questions = [
  {
    id: 0,
    title: "General satisfaction",
    subtitle: "How satisfied were you in general?",
    attributes: [],
    is_active: true,
    order: 0,
  },
  {
    id: 1,
    title: "Variety of foods",
    subtitle: "Are you satisfied with the variety of foods?",
    attributes: [],
    is_active: false,
    order: 1,
  },
  {
    id: 2,
    title: "Variety of products",
    subtitle: "Are you satisfied with the variety of products?",
    attributes: [],
    is_active: false,
    order: 2,
  },
  {
    id: 3,
    title: "Food quality",
    subtitle: "Are you satisfied with the quality of food?",
    attributes: [],
    is_active: false,
    order: 3,
  },
  {
    id: 4,
    title: "quality of products",
    subtitle: "Are you satisfied with the quality of the products?",
    attributes: [],
    is_active: false,
    order: 4,
  },
  {
    id: 5,
    title: "the quality of service",
    subtitle: "Are you satisfied with the quality of service?",
    attributes: [],
    is_active: false,
    order: 5,
  },
  {
    id: 6,
    title: "Food",
    subtitle: "Are you satisfied with the amount of food?",
    attributes: [],
    is_active: false,
    order: 6,
  },
  {
    id: 7,
    title: "Speed of preparation",
    subtitle: "Are you satisfied with the speed of preparation?",
    attributes: [],
    is_active: false,
    order: 7,
  },
  {
    id: 8,
    title: "Hours of work",
    subtitle: "Are you satisfied with the working hours?",
    attributes: [],
    is_active: false,
    order: 8,
  },
  {
    id: 9,
    title: "Price of food",
    subtitle: "Are you satisfied with the price of food?",
    attributes: [],
    is_active: false,
    order: 9,
  },
  {
    id: 10,
    title: "price of products",
    subtitle: "Are you satisfied with the price of products?",
    attributes: [],
    is_active: false,
    order: 10,
  },
  {
    id: 11,
    title: "Price of service",
    subtitle: "Are you satisfied with the price of service?",
    attributes: [],
    is_active: false,
    order: 11,
  },
  {
    id: 12,
    title: "Buy experience",
    subtitle: "Are you satisfied with the shopping experience?",
    attributes: [],
    is_active: false,
    order: 12,
  },
  {
    id: 13,
    title: "Returning again?",
    subtitle: "Do you come back again?",
    attributes: [],
    is_active: false,
    order: 13,
  },
];

const question_for_carry_out_and_delivery = [
  {
    id: 14,
    title: "The order registration process",
    subtitle: "Are you satisfied with the order registration process?",
    attributes: [],
    is_active: false,
    order: 14,
  },
  {
    id: 15,
    title: "packing",
    subtitle: "Are you satisfied with packaging?",
    attributes: [],
    is_active: false,
    order: 15,
  },
  {
    id: 16,
    title: "Support",
    subtitle: "Are you satisfied with support?",
    attributes: [],
    is_active: false,
    order: 16,
  },
];

const question_for_delivery_on_business_site = [
  {
    id: 14,
    title: "Complete the desk equipment",
    subtitle: "Are you satisfied with the perfect desk equipment?",
    attributes: [],
    is_active: false,
    order: 14,
  },
  {
    id: 15,
    title: "Staff performance",
    subtitle: "Are you satisfied with the performance of employees?",
    attributes: [],
    is_active: false,
    order: 15,
  },
  {
    id: 16,
    title: "Environmental cleaning",
    subtitle: "Are you satisfied with cleaning the environment?",
    attributes: [],
    is_active: false,
    order: 16,
  },
  {
    id: 16,
    title: "Hall music",
    subtitle: "Are you satisfied with the music of the hall?",
    attributes: [],
    is_active: false,
    order: 17,
  },
];

const templates = [
  { id: 0, title: "Survey settings by sending method", label: "carry_out" },
  {
    id: 1,
    title: "Survey settings with on -site delivery method",
    label: "delivery_on_user_site",
  },
  {
    id: 2,
    title: "Survey settings by Mill Method on -site",
    label: "delivery_on_business_site",
  },
  {
    id: 3,
    title: "Survey settings with a car delivery method",
    label: "delivery_on_car",
  },
];

const SAVE_MODAL = "SAVE_MODAL";
const CANCEL_MODAL = "CANCEL_MODAL";

function CRMLabelsPage({
  business,
  _getSurveyTemplate,
  surveyTemplate,
  _createSurveyTemplate,
  _getReviewsTemplate,
  reviewsTemplate,
  _updateSurveyTemplate,
}) {
  const [collapses, setCollapses] = useState({});
  const [questionsList, setQuestionList] = useState([...questions]);
  const [specificationOption, setSpecificationOption] = useState({});
  const [settingActionsCanceled, setSettingActionsCanceled] = useState(false);
  const [modals, setModalsState] = useState({
    SAVE_MODAL: false,
    CANCEL_MODAL: false,
  });
  const router = useRouter();
  const theme = useTheme();
  const deleteSpecificationOption = (index, question, item) => {
    let newQuestionList = questionsList;
    let attributes = question.attributes.filter(
      (attribute) => item !== attribute
    );
    newQuestionList[index] = {
      ...question,
      attributes: attributes,
    };
    setQuestionList(newQuestionList);
    setSpecificationOption(!specificationOption);
  };

  const templateId = router.query?.id;
  let { delivery_site_type = "" } = router.query;


  useEffect(() => {
    setTimeout(() => {
      if (templateId) {
        _getSurveyTemplate(templateId);
        _getReviewsTemplate()
      }
    }, 0);
  }, [templateId, settingActionsCanceled]);

  useEffect(() => {
    let other_questions =
      delivery_site_type === "delivery_on_business_site"
        ? question_for_delivery_on_business_site
        : question_for_carry_out_and_delivery;
    setQuestionList([...questionsList, ...other_questions]);

    if (surveyTemplate?.questions.length) {
      const equalQuestions = surveyTemplate?.questions?.filter((question) => {
        return questionsList?.some((surveyTemplateQuestion) => {
          return question.title === surveyTemplateQuestion.title;
        });
      });
      const unEqualQuestions = questionsList?.filter((question) => {
        return !equalQuestions.some((equalQuestion) => {
          return question.title === equalQuestion.title;
        });
      });

      setQuestionList([...equalQuestions, ...unEqualQuestions]);

      const sameWithOtherQuestions = questionsList?.filter((question) => {
        return other_questions?.some((other_question) => {
          return question.title === other_question.title;
        });
      });
      if (sameWithOtherQuestions?.length === 0) {
        setQuestionList([
          ...equalQuestions,
          ...unEqualQuestions,
          ...other_questions,
        ]);
      }
    }
  }, [surveyTemplate, settingActionsCanceled]);

  const toggleModals = (modal) =>
    setModalsState({
      ...modals,
      [modal]: !modals[modal],
    });

  const submit = () => {
    let title = templates.find(
      (template) => template?.label == delivery_site_type
    )?.title;
    if (templateId) {
      _updateSurveyTemplate({
        template_id: templateId,
        template_info: {
          business: business?.id,
          delivery_site_type: delivery_site_type,
          questions: questionsList,
        },
      });
    } else {
      _createSurveyTemplate({
        title: title,
        business: business?.id,
        questions: questionsList,
        extra_data :{
          base_on : BASED_ON,
          base_on_value : delivery_site_type
        }
      });
    }
  };

  return (
    <>
      <AssuranceDialog
        isOpen={modals[SAVE_MODAL]}
        closeDialogHandler={() => toggleModals(SAVE_MODAL)}
        contentText="Are you sure to save changes?"
        dialogSecondActionTextColor="primary"
        dialogMainActions={() => {
          submit();
          toggleModals(SAVE_MODAL);
          router.back();
        }}
        dialogMainActionText="Yes"
        dialogSecondActions={() => toggleModals(SAVE_MODAL)}
        dialogSecondActionText="Good"
      />
      <AssuranceDialog
        isOpen={modals[CANCEL_MODAL]}
        closeDialogHandler={() => toggleModals(CANCEL_MODAL)}
        contentText="Are you sure to cancel the changes?"
        dialogSecondActionTextColor="primary"
        dialogMainActions={() => {
          setSettingActionsCanceled(true);
          toggleModals(CANCEL_MODAL);
          router.back()
        }}
        dialogMainActionText="Yes"
        dialogSecondActions={() => toggleModals(CANCEL_MODAL)}
        dialogSecondActionText="Good"
      />
      <div className="container">
        <AdminBreadCrumb
          overrideCurrentLinkWith={
            deliveryTypesConstants[delivery_site_type]?.title
          }
        />
        <div>
          <Paper elevation={1} style={{ padding: 24 }}>
            <div
              style={{ paddingBottom: 24, borderBottom: "1px solid #E4E6E7" }}
            >
              <p
                className="w-100"
                style={{
                  textAlign: "right",
                  color: textTypes.text.default,
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: "28px",
                }}
              >
                Survey
              </p>
              <p
                className="mt-2"
                style={{ fontSize: 14, lineHeight: "24px", fontWeight: 400 }}
              >
                The titles you want to have in your survey form
                Enable and edit the text by selecting each question.{" "}
              </p>
            </div>
            {questionsList?.map((question, index) => (
              <div
                style={{
                  padding: "20px 0",
                  borderBottom:
                    index !== questionsList.length - 1
                      ? "1px solid #E4E6E7"
                      : "1px solid transparent",
                }}
                key={question?.id}
              >
                <div className="flex-1 u-cursor-pointer d-flex d-flex justify-content-between align-items-center">
                  <div
                    className="flex-1 d-flex align-items-center"
                    style={{ color: "#5C5F62" }}
                    onClick={() =>
                      setCollapses({
                        ...collapses,
                        [index]: !collapses[index],
                      })
                    }
                  >
                    {collapses[index] ? (
                      <KeyboardArrowUpRoundedIcon />
                    ) : (
                      <KeyboardArrowDownRoundedIcon />
                    )}
                    <span
                      style={{
                        fontWeight: 600,
                        color: question.is_active ? night : "#8C9196",
                        fontSize: 16,
                      }}
                      className="mr-4"
                    >
                      {question?.title}
                    </span>
                  </div>
                  {question.title != "General satisfaction" && (
                    <div>
                      <Switch
                        size="medium"
                        checked={question?.is_active}
                        onChange={() => {
                          let newQuestionList = questionsList;
                          newQuestionList[index] = {
                            ...question,
                            is_active: !question.is_active,
                          };
                          setQuestionList(newQuestionList);
                          setSpecificationOption(!specificationOption);
                        }}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        color="primary"
                      />
                    </div>
                  )}
                </div>
                <Collapse
                  isOpened={collapses[index]}
                  theme={{
                    collapse: "w-100 ReactCollapse--collapse",
                    content: "ReactCollapse--content",
                  }}
                >
                  <div className="d-flex flex-column justify-content-between">
                    <p
                      style={{
                        fontSize: 12,
                        color: night,
                        fontWeight: 600,
                        marginTop: 32,
                      }}
                    >
                      Question Text
                    </p>
                    <input
                      className="crm-input w-100 mt-2 px-4  py-3"
                      style={{ borderRadius: 8, border: "1px solid #E4E6E7" }}
                      placeholder="Question Text"
                      value={question?.subtitle}
                      onChange={(e) => {
                        let newQuestionList = questionsList;
                        newQuestionList[index] = {
                          ...question,
                          subtitle: e.target.value,
                        };
                        setQuestionList([...newQuestionList]);
                      }}
                    />
                    <p
                      style={{
                        fontSize: 12,
                        color: night,
                        fontWeight: 600,
                        marginTop: 32,
                      }}
                    >
                      Careful poll
                    </p>
                    <p
                      className="mt-2"
                      style={{ fontSize: 14, lineHeight: "24px" }}
                    >
                      In this section, you can find the cause of customer dissatisfaction
                      (Score of one to three) Your items for each question title determine
                      do.
                    </p>
                    <div className="w-100 mt-4 d-flex justify-content-between">
                      <input
                        className="crm-input flex-1 p-4"
                        placeholder="Add the accurate option"
                        style={{
                          borderRadius: "0 8px 8px 0",
                          backgroundColor: "#FAFBFB",
                          border: "1px solid #E4E6E7",
                        }}
                        value={specificationOption[question?.id]?.title}
                        onChange={(e) =>
                          setSpecificationOption({
                            ...specificationOption,
                            [question?.id]: { title: e.target.value },
                          })
                        }
                      />
                      <div
                        className="d-flex u-cursor-pointer justify-content-center align-items-center"
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "8px 0  0 8px",
                          backgroundColor: theme.palette.primary.main,
                        }}
                        onClick={() => {
                          if (
                            Boolean(
                              specificationOption[question?.id]?.title?.trim()
                            )
                          ) {
                            let newQuestionList = questionsList;
                            newQuestionList[index] = {
                              ...question,
                              attributes: [
                                ...question.attributes,
                                specificationOption[question?.id],
                              ],
                            };
                            setQuestionList(newQuestionList);
                            setSpecificationOption({
                              ...specificationOption,
                              [question?.id]: { title: "" },
                            });
                          }
                        }}
                      >
                        <AddIcon color="#fff" />
                      </div>
                    </div>
                    <div className="d-flex flex-wrap ">
                      {question.attributes?.map((item) => (
                        <div
                          key={item.id}
                          className="d-flex mt-4 align-items-center ml-4 p-2 u-border-radius-8"
                          style={{
                            backgroundColor: "#F0F0F0",
                            width: "fit-content",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14,
                              color: night,
                            }}
                          >
                            {item.title}
                          </span>
                          <CloseIcon
                            style={{
                              fontSize: 14,
                              color: "#5C5F62",
                              marginRight: 10,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              deleteSpecificationOption(index, question, item);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Collapse>
              </div>
            ))}
          </Paper>
          <div
            className="d-flex justify-content-end align-items-center"
            style={{
              marginTop: 32,
              paddingTop: 32,
              borderTop: "1px solid #E4E6E7",
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "transparent",
                height: 40,
                minWidth: 50,
                border: "1px solid #8C9196",
                color: "#8C9196",
                padding: 0,
              }}
              className="ml-2 u-box-shadow-none p-0"
              onClick={() => toggleModals(CANCEL_MODAL)}
            >
              Cancellation
            </Button>
            <Button
              color="primary"
              variant="contained"
              style={{ height: 40 }}
              onClick={() => toggleModals(SAVE_MODAL)}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  surveyTemplate: makeSelectSurveyTemplate(),
  business: makeSelectBusiness(),
  reviewsTemplate : makeSelectReviewsTemplate()
});

function mapDispatchToProps(dispatch) {
  return {
    _getSurveyTemplate: (data) => dispatch(getSurveyTemplate(data)),
    _createSurveyTemplate: (data) => dispatch(createSurveyTemplate(data)),
    _updateSurveyTemplate: (data) => dispatch(updateSurveyTemplate(data)),
    _getReviewsTemplate : (data) => dispatch(getReviewsTemplate(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(CRMLabelsPage);
