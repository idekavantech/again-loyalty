import { Paper } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import Header from "containers/Header";

import moment from "moment";
import { useMemo } from "react";

import { updatesSerializer } from "utils/helpers/updatesSerializer";
import { getWeekDay } from "utils/helpers/getWeekDay";
import { getMonthName } from "utils/helpers/getMonthName";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function VitrinUpdates({ items }) {
  const theme = useTheme();
  const itemsByDate = useMemo(() => updatesSerializer(items), [items]);
  const {   maxWidth600} = useResponsive()


  return (
    <div>
      <Header isTransparent />
      <div style={{ paddingTop: maxWidth600 ? 0 : 100 }}>
        <Paper style={{ maxWidth: 780 }} className="mx-auto">
          <div className="mt-2 px-5 py-3">
            {itemsByDate && Object.entries(itemsByDate || {})
              .sort(
                (a, b) =>
                  new Date(moment(b[0], "jYYYY_jMM_jDD")).getTime() -
                  new Date(moment(a[0], "jYYYY_jMM_jDD")).getTime()
              )
              .map(([date, items]) => {
                const _date = new Date(moment(date, "YYYY/M/D"));
                const momentTime = moment(
                  `${_date.getFullYear()}-${
                    _date.getMonth() + 1
                  }-${_date.getDate()}`,
                  "YYYY-MM-DD"
                );
                const weekday =
                  _date.getDate() === new Date().getDate() &&
                  _date.getMonth() === new Date().getMonth() &&
                  _date.getFullYear() === new Date().getFullYear()
                    ? "امروز"
                    : getWeekDay(momentTime.isoWeekday());
                const formattedTime =
                  weekday === "امروز"
                    ? weekday
                    : `${englishNumberToPersianNumber(
                        momentTime.date()
                      )} ${getMonthName(momentTime.month() + 1)}`;
                return (
                  <div className="mt-5" key={date}>
                    <div style={{ color: "#6D7175" }}>{formattedTime}</div>
                    <div className="position-relative mt-2">
                      {items.length > 1 ? (
                        <div
                          className="w-100 position-absolute mr-1 mt-2"
                          style={{
                            height: "calc(100% - 16px)",
                            borderRight: `1px dashed ${theme.palette.primary.main}`,
                          }}
                        ></div>
                      ) : null}
                      {items
                        .sort(
                          (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime()
                        )
                        .map((item) => {
                          const _momentTime = moment(item?.date);
                          return (
                            <div
                              className="timeline-item position-relative pr-4 mb-5"
                              style={{ color: "#575959" }}
                              key={item?.date}
                            >
                              <div
                                className="position-absolute"
                                style={{
                                  right: 0,
                                  top: 4,

                                  width: 10,
                                  height: 10,
                                  borderRadius: "50%",
                                  backgroundColor: "#0050FF",
                                }}
                              ></div>
                              <div className="pr-3 d-flex justify-content-between align-items-center">
                                <div>
                                  <div>{item.title}</div>
                                  <div
                                    style={{ opacity: 0.8 }}
                                    className="w-100 pl-4"
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  ></div>
                                </div>
                                <div>
                                  {englishNumberToPersianNumber(
                                    _momentTime.format("HH:mm")
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </Paper>
      </div>
    </div>
  );
}
