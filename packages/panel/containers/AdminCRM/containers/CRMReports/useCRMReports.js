import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { useDispatch , useSelector} from "react-redux";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  makeSelectReviewsResponse,
  makeSelectReviewsResponsePaginationByQuery,
} from "store/selectors";
import { getReviewsResponse } from "store/actions";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { getSurveyTemplate } from "@saas/stores/business/actions";
import { makeSelectSurveyTemplate } from "@saas/stores/business/selector";

import jMoment from "moment-jalaali";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../utils/helpers";


function useCRMReport (){

  const dispatch = useDispatch()
  const router = useRouter()

  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix())
  const business = useSelector(makeSelectBusiness())
  const isLoading = useSelector(makeSelectLoading())
  const reviewsResponse = useSelector(makeSelectReviewsResponse())
  const reviewsResponsePaginationByQuery = useSelector(makeSelectReviewsResponsePaginationByQuery())
  const surveyTemplate = useSelector(makeSelectSurveyTemplate())

  const _getReviewsResponse = (query) => dispatch(getReviewsResponse(query))
  const _getSurveyTemplate = (data) => dispatch(getSurveyTemplate(data))

  const { review_templates } = business?.plugins_config?.crm?.data;
  const [deliveryType, setDeliveryType] = useState(null); 

  
  const isMobile = useMediaQuery("(max-width:768px)");
  const templateId = router?.query?.template;
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [templateAttributes, setTemplateAttributes] = useState([]);
  const [selectedTemplateAttributes, setSelectedTemplateAttributes] = useState(
    []
  );

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [openModal, setOpenModal] = useState(false);

  
  const [selectedSatisfactionChoices, setSelectedSatisfactionChoices] =
    useState([]);


  useEffect(() => {
    if (deliveryType) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, template: deliveryType },
      });
    }
  }, [deliveryType]);
  
  useEffect(() => {
    setTimeout(() => {
      review_templates &&  setDeliveryType(Object.values(review_templates)[0]);
    }, 0);
  }, []);



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };


  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (surveyTemplate?.questions?.length) {
      const allAttrs = [];
      surveyTemplate?.questions?.forEach((question) => {
        const attr = question?.attributes?.map((item) => item);
        allAttrs.push(...attr);
      });
      setTemplateAttributes(allAttrs);
    }
  }, [surveyTemplate]);

  const submitDate = () => {
    const query = {
      page: page + 1,
      page_size: pageSize,
      from_date_range: persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.from),
          "jYYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      to_date_range: persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.to),
          "jYYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      satisfaction: selectedSatisfactionChoices.map((item) => item.keyword),
      template: templateId,
      attributes_id: selectedTemplateAttributes.map((item) => item.id),
    };
    _getReviewsResponse(query);

    handleClose();
  };

  useEffect(() => {
    setTimeout(() => {
      const query = {
        page: page + 1,
        page_size: pageSize,
        from_date_range: persianToEnglishNumber(
          jMoment(
            formatDateObjectToNormal(selectedDayRange.from),
            "jYYYY-jM-jD"
          ).format("YYYY-M-D")
        ),
        to_date_range: persianToEnglishNumber(
          jMoment(
            formatDateObjectToNormal(selectedDayRange.to),
            "jYYYY-jM-jD"
          ).format("YYYY-M-D")
        ),
        satisfaction: selectedSatisfactionChoices.map((item) => item.keyword),
        template: templateId,
        attributes_id: selectedTemplateAttributes.map((item) => item.id),
      };
      _getReviewsResponse(query);
      _getSurveyTemplate(templateId);
    }, 0);
  }, [
    page,
    pageSize,
    selectedSatisfactionChoices,
    selectedTemplateAttributes,
    templateId,
  ]);


  return{
    adminUrlPrefix,
    isLoading,
    reviewsResponse,
    reviewsResponsePaginationByQuery,
    review_templates,
    deliveryType,
    setDeliveryType,
    isMobile,
    pageSize,
    page,
    templateAttributes, 
    selectedDayRange,
    setSelectedDayRange,
    selectedTemplateAttributes,
    setSelectedTemplateAttributes,
    openModal,
    selectedSatisfactionChoices,
    setSelectedSatisfactionChoices,
    handleChangePage,
    handleChangeRowsPerPage,
    handleClose,
    handleOpen,
    id,
    submitDate,
  }
}

export {useCRMReport}