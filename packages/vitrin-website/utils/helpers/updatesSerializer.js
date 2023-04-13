import moment from "moment";
import { groupByKey } from "./groupByKey";
import { persianToEnglishNumber } from "./persianToEnglishNumber";

export const updatesSerializer = (items) =>
  items &&
  groupByKey(
    items.map((item) => ({
      ...item,
      group_date: persianToEnglishNumber(
        moment(item.date).format("jYYYY_jMM_jDD")
      ),
    })),
    "group_date"
  );
