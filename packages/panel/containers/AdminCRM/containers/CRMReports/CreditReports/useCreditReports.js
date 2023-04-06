import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";

import {
  getAutomatedProcessCreditReport,
  getCampaignCreditReport,
} from "store/actions";
import {
  makeSelectAutomatedProcessesCreditReports,
  makeSelectCampaignCreditReports,
} from "store/selectors";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import jMoment from "moment-jalaali";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { formatDateObjectToNormal } from "utils/helpers";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

const CAMPAIGN = "campaign";
const AUTOMATED_PROCESS = "automated_process";

const creditTypes = [
  {
    id: 0,
    label: "روندهای خودکار",
    type: AUTOMATED_PROCESS,
  },
  {
    id: 1,
    label: " کمپین ها",
    type: CAMPAIGN,
  },
];

function useCRMReport() {
  const dispatch = useDispatch();
  const isLoading = useSelector(makeSelectLoading());

  const automatedProcessesCreditsReport = useSelector(
    makeSelectAutomatedProcessesCreditReports()
  );
  const campaignCreditsReport = useSelector(makeSelectCampaignCreditReports());

  const _getAutomatedProcessesCreditsReport = (data) =>
    dispatch(getAutomatedProcessCreditReport(data));
  const _getCampaignCreditReports = (data) =>
    dispatch(getCampaignCreditReport(data));

  const [selectedReportType, setSelectedReportType] = useState(
    creditTypes[0].id
  );

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const [dateRange, setDateRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [formatedDateRange, setFormatedDateRange] = useState({});

  const handleOpen = () => setIsDateModalOpen(true);

  const handleClose = () => setIsDateModalOpen(false);

  const formatDate = (date) => {
    if (!date) return null;
    return persianToEnglishNumber(
      jMoment(formatDateObjectToNormal(date), "jYYYY-jM-jD").format("YYYY-M-D")
    );
  };

  const submitDateRange = () => {
    if (!dateRange.from || !dateRange.to) return;

    const from_date_range = formatDate(dateRange.from);
    const to_date_range = formatDate(dateRange.to);

    setFormatedDateRange({
      from_created_at: from_date_range,
      to_created_at: to_date_range,
    });
    handleClose();
  };

  const selectedCreditReport = useMemo(() => {
    return creditTypes.find(
      (creditType) => creditType.id === selectedReportType
    );
  }, [selectedReportType]);

  const reportData = useMemo(() => {
    if (selectedCreditReport?.type === CAMPAIGN) return campaignCreditsReport;
    if (selectedCreditReport?.type === AUTOMATED_PROCESS)
      return automatedProcessesCreditsReport;
  }, [
    automatedProcessesCreditsReport,
    campaignCreditsReport,
    selectedCreditReport,
  ]);

  let timeOut = null;
  useEffect(() => {
    if (!formatedDateRange || Object.keys(formatedDateRange).length === 0)
      return;
    timeOut = setTimeout(() => {
      if (selectedCreditReport.type === CAMPAIGN) {
        _getCampaignCreditReports(formatedDateRange);
        return;
      }
      if (selectedCreditReport.type === AUTOMATED_PROCESS) {
        _getAutomatedProcessesCreditsReport(formatedDateRange);
        return;
      }
    }, 0);
    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
        timeOut = null;
      }
    };
  }, [selectedCreditReport, formatedDateRange]);

  useEffect(() => {
    if (!dateRange.from || !dateRange.to) return;

    const from_date_range = formatDate(dateRange.from);
    const to_date_range = formatDate(dateRange.to);

    setFormatedDateRange({
      from_created_at: from_date_range,
      to_created_at: to_date_range,
    });
  }, []);

  const onCreditReportTypeChange = (e) => {
    const { value } = e.target;
    if (!value) return;
    const { id } = value;
    setSelectedReportType(id);
  };

  const TOTAL_GIVEN_CREDIT = {
    id: 0,
    label: "مجموع مبلغ اعتبار های داده شده",
    type: "total_given_credit",
    align: "right",
    minWidth: 200,
    width: 220,
    formater: priceFormatter,
  };

  const TOTAL_NUMBER_OF_CREDIT = {
    id: 1,
    label: "تعداد اعتبار های داده شده",
    type: "total_number_of_credit",
    align: "right",
    minWidth: 180,
    width: 200,
    formater: englishNumberToPersianNumber,
  };

  const TOTAL_NUMBER_OF_CREDIT_USED = {
    id: 2,
    label: "تعداد اعتبار های استفاده شده",
    type: "total_number_of_credit_used",
    align: "right",
    minWidth: 200,
    width: 160,
    formater: englishNumberToPersianNumber,
  };

  const TOTAL_AMOUNT_OF_CREDIT_USED = {
    id: 3,
    label: "مجموع مبلغ اعتبار های استفاده شده",
    type: "total_amount_of_credit_used",
    align: "right",
    minWidth: 220,
    width: 240,
    formater: priceFormatter,
  };

  const TITLE = {
    id: 3,
    label: "عنوان",
    type: "title",
    align: "right",
    minWidth: 50,
    width: 150,
    headerFormater: (e) => {
      
      return `${e} ${selectedCreditReport.type === CAMPAIGN ? "کمپین" : "روند خودکار"}`
    
    },
  };

  const tableHeaders = {
    [CAMPAIGN]: [
      TITLE,
      TOTAL_GIVEN_CREDIT,
      TOTAL_NUMBER_OF_CREDIT,
      TOTAL_AMOUNT_OF_CREDIT_USED,
      TOTAL_NUMBER_OF_CREDIT_USED,
    ],
    [AUTOMATED_PROCESS]: [
      TITLE,
      TOTAL_GIVEN_CREDIT,
      TOTAL_NUMBER_OF_CREDIT,
      TOTAL_AMOUNT_OF_CREDIT_USED,
      TOTAL_NUMBER_OF_CREDIT_USED,
    ],
  };

  return {
    CAMPAIGN,
    AUTOMATED_PROCESS,
    isLoading,
    selectedReportType,
    selectedCreditReport,
    creditTypes,
    onCreditReportTypeChange,
    tableHeaders,
    reportData,
    isDateModalOpen,
    setIsDateModalOpen,
    dateRange,
    setDateRange,
    handleClose,
    handleOpen,
    submitDateRange,
  };
}

export { useCRMReport };
