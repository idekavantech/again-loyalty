import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import { textTypes, night } from "@saas/utils/colors";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAggregateRating } from "store/actions";
import { makeSelectAggregateRating } from "store/selectors";
import AdminBreadCrumb from "../../AdminBreadCrumb";
import { getSurveyTemplate } from "@saas/stores/business/actions";

const questions = [
  { id: 1, title: "Question Title 1", rating: 0, count: 0 },
  { id: 2, title: "Question 2", rating: 0, count: 0 },
  { id: 3, title: "Question Title 1", rating: 0, count: 0 },
  { id: 4, title: "Question 2", rating: 0, count: 0 },
  { id: 5, title: "Question Title 1", rating: 0, count: 0 },
];

function CRMLabelsPage({
  urlPrefix,
  _getSurveyTemplate,
  _getAggregateRatting,
  aggregateRating,
}) {
  const router = useRouter();
  const templateId = router.query?.id;
  const [series, setSeries] = useState([
    {
      name: "Satisfied",
      y: 0,
      color: "#87009B",
    },
    {
      name: "Unhappy",
      y: 0,
      color: "#FF002E",
    },
    {
      name: "Neutral",
      y: 0,
      color: "#CCCCCC",
    },
  ]);

  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    setTimeout(() => {
      if (templateId) {
        _getSurveyTemplate(templateId);
        _getAggregateRatting(templateId);
      }
    }, 0);
  }, [templateId]);

  useEffect(() => {
    if (Object.keys(aggregateRating).length) {
      setSeries([
        {
          name: "Satisfied",
          y: aggregateRating?.unsatisfied_customers?.[0]?.count || 0,
          color: "#87009B",
        },
        {
          name: "Unhappy",
          y: aggregateRating?.unsatisfied_customers?.[0]?.count || 0,
          color: "#FF002E",
        },
        {
          name: "Neutral",
          y: aggregateRating?.neutral_customers?.[0]?.count || 0,
          color: "#CCCCCC",
        },
      ]);
    }
  }, [aggregateRating]);

  useEffect(() => {
    setChartOptions({
      chart: {
        type: "pie",
        width: 260,
        height: 260,
      },
      title: {
        text: "",
      },
      yAxis: {
        title: {
          text: "Total percent market share",
        },
      },
      plotOptions: {
        pie: {
          shadow: false,
        },
      },
      tooltip: {
        formatter: function () {
          return "<b>" + this.point.name + "</b>: " + this.y + " %";
        },
        enabled: false,
      },
      series: [
        {
          data: series,
          size: "120%",
          innerSize: "80%",
          showInLegend: false,
          dataLabels: {
            enabled: false,
          },
        },
      ],
    });
  }, [series]);
  return (
    <div className="container">
      <style
        dangerouslySetInnerHTML={{
          __html: `
       .highcharts-background {
         fill : #FFFFFF;
       }
       .highcharts-container {
   
         display: flex;
         align-items: center;
         justify-content: center;
       }
       `,
        }}
      />
      <AdminBreadCrumb />

      <div style={{ paddingTop: 32 }}>
        <p
          className="mt-2"
          style={{ fontSize: 14, lineHeight: "24px", fontWeight: 400 }}
        >
          On this page you will make a brief report of the selected method of poll
          You see.
        </p>
        <Paper elevation={1} style={{ marginTop: 24, padding: 24 }}>
          <Link
            passHref
            href={`${urlPrefix}crm/survey/${templateId}/setting?delivery_site_type=${router.query.delivery_site_type}`}
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
                  Select polls questions{" "}
                </p>
                <p className="mt-2" style={{ fontSize: 14, color: "#6D7175" }}>
                  Choose your favorite questions to create a survey form.
                </p>
              </div>
              <KeyboardArrowLeftRoundedIcon size="medium" />
            </div>
          </Link>
        </Paper>
        <Paper
          elevation={1}
          style={{ marginTop: 24, padding: 24, minHeight: 500 }}
        >
          <div className="d-flex flex-wrap">
            <div className="position-relative pl-lg-5">
              <div className="py-1">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              </div>

              <div className="position-relative">
                {series?.map((item, index) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between py-4"
                    style={{
                      borderBottom:
                        index !== series.length - 1
                          ? "1px solid #E4E6E7"
                          : "1px solid transparent",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        style={{
                          height: 8,
                          width: 8,
                          borderRadius: "50%",
                          backgroundColor: item.color,
                        }}
                      ></div>
                      <span
                        className="mr-2"
                        style={{ color: "#6D7175", fontSize: 12 }}
                      >
                        {item.name}
                      </span>
                    </div>
                    <span
                      style={{ color: night, fontSize: 12, fontWeight: 600 }}
                    >
                      {englishNumberToPersianNumber(item.y)}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="w-100 position-absolute"
                style={{ top: 125, textAlign: "center", left: 16 }}
              >
                <span style={{ fontSize: 20, fontWeight: 600 }}>
                  {englishNumberToPersianNumber(
                    series.reduce((sum, seri) => {
                      return sum + seri.y;
                    }, 0)
                  )}
                </span>
                <span className="mr-1">Person</span>
              </div>
            </div>
            <div
              className="flex-1"
              style={{
                borderRight: "1px solid #8C9196",
                minHeight: 452,
                paddingRight: 32,
              }}
            >
              {aggregateRating?.aggregate_on_questions?.length
                ? aggregateRating?.aggregate_on_questions?.map(
                    (question, index) => (
                      <div
                        key={question.id}
                        className={`${index !== 0 ? "pt-4" : ""} `}
                        style={{
                          borderBottom:
                            index !== aggregateRating.length - 1
                              ? "1px solid #E4E6E7"
                              : "1px solid transparent",
                        }}
                      >
                        <p style={{ fontWeight: 600, color: night }}>
                          {question.question_title}
                        </p>
                        <div
                          className="w-100 mt-4"
                          style={{
                            height: 8,
                            borderRadius: 25,
                            backgroundColor: "#E4E6E7",
                          }}
                        >
                          <div
                            style={{
                              height: 8,
                              borderRadius: 25,
                              backgroundColor: "#FFBE16",
                              width: `${(question.rating / 5) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center pt-2 pb-4">
                          <div className="d-flex align-items-center">
                            <Image
                              alt=""
                              src="/images/Star 1.svg"
                              width={12}
                              height={12}
                            />
                            <span
                              className="mr-2"
                              style={{
                                fontWeight: 400,
                                fontSize: 14,
                                color: night,
                              }}
                            >
                              {englishNumberToPersianNumber(
                                question.rating?.toFixed(2)
                              )}{" "}
                              From 1
                            </span>
                          </div>
                          <span
                            style={{
                              fontWeight: 400,
                              fontSize: 14,
                              color: night,
                            }}
                          >
                            {englishNumberToPersianNumber(question.count)} Person
                          </span>
                        </div>
                      </div>
                    )
                  )
                : questions?.map((question, index) => (
                    <div
                      key={question.id}
                      className={`${index !== 0 ? "pt-4" : ""} `}
                      style={{
                        borderBottom:
                          index !== aggregateRating.length - 1
                            ? "1px solid #E4E6E7"
                            : "1px solid transparent",
                      }}
                    >
                      <p style={{ fontWeight: 600, color: night }}>
                        {question.question_title}
                      </p>
                      <div
                        className="w-100 mt-4"
                        style={{
                          height: 8,
                          borderRadius: 25,
                          backgroundColor: "#E4E6E7",
                        }}
                      >
                        <div
                          style={{
                            height: 8,
                            borderRadius: 25,
                            backgroundColor: "#FFBE16",
                            width: `${(question.rating / 5) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center pt-2 pb-4">
                        <div className="d-flex align-items-center">
                          <Image
                            alt=""
                            src="/images/Star 1.svg"
                            width={12}
                            height={12}
                          />
                          <span
                            className="mr-2"
                            style={{
                              fontWeight: 400,
                              fontSize: 14,
                              color: night,
                            }}
                          >
                            {englishNumberToPersianNumber(question.rating)} From 1
                          </span>
                        </div>
                        <span
                          style={{
                            fontWeight: 400,
                            fontSize: 14,
                            color: night,
                          }}
                        >
                          {englishNumberToPersianNumber(question.count)} Person
                        </span>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  aggregateRating: makeSelectAggregateRating(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getSurveyTemplate: (data) => dispatch(getSurveyTemplate(data)),
    _getAggregateRatting: (data) => dispatch(getAggregateRating(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMLabelsPage);
