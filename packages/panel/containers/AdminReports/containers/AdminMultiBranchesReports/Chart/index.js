import React, { useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { convertEnglishNumToPersianNum } from "containers/helper";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";

const Chart = ({
  xAxisNodeTitle,
  yAxisNodeTitle,
  hasToCompare,
  xAxisLabel,
  selectedBranches,
  mainLineData,
  compareLineData,
  title,
}) => {
  const chartOption = useMemo(
    () => ({
      chart: {
        type: "spline",
        numberFormatter: function () {
          let ret = Highcharts.numberFormat.apply(0, arguments);
          return convertEnglishNumToPersianNum(ret);
        },
      },
      title: {
        text: title,
        style: {
          color: "#000",
          fontSize: "19px",
          paddingTop: 8,
          fontFamily: "IranSans",
          borderBottom: "1px dashed #c4cdd5",
        },
      },
      tooltip: {
        useHTML: true,
        style: {
          fontSize: "10px",
          textAlign: "right",
          fontFamily: "inherit",
          color: "rgba(218, 217, 217, 0.994)",
          direction: "rtl",
        },
        formatter: function () {
          const labelText =
            this.series.name === xAxisNodeTitle
              ? "<p>" +
                this.series.name +
                ": " +
                priceFormatter(this.y) +
                "</p>" +
                "<br>" +
                this.key +
                "</br>"
              : "<p>" +
                this.series.name +
                ": " +
                priceFormatter(this.y) +
                "</p>";
          return labelText;
        },
      },
      legend: {
        rtl: true,
        itemStyle: {
          font: "12px IranSans",
          color: "#505050",
          fontWeight: "900",
        },
        itemHoverStyle: {
          color: "#404040",
        },
        itemHiddenStyle: {
          color: "#606060",
        },
      },
      xAxis: {
        categories: xAxisLabel,
        style: {
          color: "#2e2e2e",
        },
        labels: {
          style: {
            fontFamily: "IranSans",
            color: "#383838",
            fontWeight: "700",
          },
        },
      },
      yAxis: {
        title: {
          text: yAxisNodeTitle,
          style: {
            fontSize: "14px",
            fontFamily: "IranSans",
          },
        },
        labels: {
          formatter: function () {
            return priceFormatter(this.value);
          },
          style: {
            color: "#383838",
            fontFamily: "IranSans",
            fontSize: "16px",
            fontWeight: "700",
          },
        },
      },
      plotOptions: {
        spline: {
          lineWidth: 2,
          marker: {
            enabled: false,
          },
        },
      },
      series: hasToCompare
        ? [
            {
              name: `${xAxisNodeTitle + " بازه‌ی پیشین"}`,
              color: "#404040",
              data: compareLineData,
            },
            {
              name: xAxisNodeTitle,
              color: "#00AB97",
              data: mainLineData,
            },
          ]
        : [
            {
              name: xAxisNodeTitle,
              color: "#00AB97",
              data: mainLineData,
            },
          ],
    }),
    [hasToCompare, compareLineData, mainLineData, selectedBranches]
  );

  if (
    mainLineData &&
    Math.max(...mainLineData) < 1 &&
    compareLineData &&
    Math.max(...compareLineData) < 1
  ) {
    chartOption.yAxis = { ...chartOption.yAxis, max: 1 };
  } else chartOption.yAxis = { ...chartOption.yAxis, max: null };

  return <HighchartsReact highcharts={Highcharts} options={chartOption} />;
};

export default Chart;
