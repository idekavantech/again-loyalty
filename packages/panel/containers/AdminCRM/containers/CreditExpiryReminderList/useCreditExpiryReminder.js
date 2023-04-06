import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { getCampaignList } from "store/actions";
import {
  makeSelectCampaignList,
  makeSelectCampaignPagination,
} from "store/selectors";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const initialCreditExpiryReminder = {
  action: "credit-expiry-reminder",
};

function useCreditExpiryDetail() {
  const router = useRouter();
  const dispatch = useDispatch();

  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const business = useSelector(makeSelectBusiness());

  const isLoading = useSelector(makeSelectLoading());
  const _creditExpiryList = useSelector(makeSelectCampaignList());
  const _creditExpiryPagination = useSelector(makeSelectCampaignPagination());

  const _getFilteredCreditExpiry = (data) => dispatch(getCampaignList(data));

  const isMobile = useMediaQuery("(max-width:768px)");

  const [creditExpiryFilters, setCreditExpiryFilters] = useState(
    initialCreditExpiryReminder
  );

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    _getFilteredCreditExpiry({
      filters: creditExpiryFilters,
      query: { page: page + 1 },
    });
  }, [, creditExpiryFilters, page]);

  return {
    router,
    adminUrlPrefix,
    business,
    isMobile,
    pageSize,
    setPageSize,
    page,
    setPage,
    creditExpiryFilters,
    setCreditExpiryFilters,
    isLoading,
    _creditExpiryList,
    _creditExpiryPagination,
    _getFilteredCreditExpiry,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

export { useCreditExpiryDetail };
