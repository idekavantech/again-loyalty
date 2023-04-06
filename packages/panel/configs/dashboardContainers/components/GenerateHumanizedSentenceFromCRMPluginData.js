import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import {
  actionDelayTypes,
  AUTOMATED_PROCESSES_TYPES,
  CASHBACK,
  POINT,
  REWARD,
  SMS,
} from "containers/AdminCRM/constants";
import Link from "next/link";
import { useSelector } from "react-redux";
const actionPersianDescription = {
  [SMS]: () => `SMS is given.`,
  [REWARD]: ({ amount, expiration }) =>
    `${priceFormatter(amount)} $ Gift Credit${
      expiration
        ? `To a period of credit${
            englishNumberToPersianNumber(expiration) ||
            englishNumberToPersianNumber(0)
          } Day`
        : "No expiration"
    } It will be given.`,
  [POINT]: ({ amount, expiration }) =>
    `${priceFormatter(amount)} Rating${
      expiration
        ? `To a period of credit${
            englishNumberToPersianNumber(expiration) ||
            englishNumberToPersianNumber(0)
          } Day`
        : "No expiration"
    } It will be given.`,
  [CASHBACK]: ({ max_cashback, percent, expiration }) =>
    `${englishNumberToPersianNumber(
      percent
    )} Percentage${priceFormatter(max_cashback)} ${
      expiration
        ? `To a period of credit${
            englishNumberToPersianNumber(expiration) ||
            englishNumberToPersianNumber(0)
          } Day`
        : "No expiration"
    } It will be given.`,
};
export function GenerateHumanizedSentenceFromCRMPluginData({
  automatedProcess,
  segment,
  index,
}) {
  const theme = useTheme();
  const urlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const persianEventTitle = AUTOMATED_PROCESSES_TYPES.find(
    (_automatedProcess) => _automatedProcess.type === automatedProcess.event
  )?.title;
  return (
    <div>
      {" "}
      {englishNumberToPersianNumber(index + 1)}- In the automatic process{" "}
      <Link
        href={`${urlPrefix}crm/automated_processes/${automatedProcess.event}`}
        style={{ color: theme.palette.primary.main }}
      >
        {automatedProcess.name}
      </Link>{" "}
      To customers who are part of segmentation{" "}
      <Link
        style={{ color: theme.palette.primary.main }}
        href={`${urlPrefix}crm/segments/${automatedProcess.segment}`}
      >
        {segment?.title}
      </Link>{" "}
      Be,{" "}
      <span>
        {automatedProcess.delay?.value === 0
          ? "Immediately after"
          : `${automatedProcess.delay?.value} ${
              actionDelayTypes.find(
                (actionDelayType) =>
                  actionDelayType.type === automatedProcess.delay?.duration
              )?.name
            } after`}
      </span>{" "}
      <span>{persianEventTitle}</span>،{" "}
      <span>
        {actionPersianDescription[automatedProcess.action.type](
          automatedProcess.action
        )}
      </span>
    </div>
  );
}
