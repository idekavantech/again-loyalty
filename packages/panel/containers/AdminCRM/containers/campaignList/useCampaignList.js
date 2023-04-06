import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import { useSelector, useDispatch } from "react-redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { getCampaignList, updateCampaignById } from "store/actions";
import {
  makeSelectCampaignList,
  makeSelectCampaignPagination,
} from "store/selectors";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

function useCampaignDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();

  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const business = useSelector(makeSelectBusiness());

  const isLoading = useSelector(makeSelectLoading());
  const _campaignList = useSelector(makeSelectCampaignList());
  const _campaignPagination = useSelector(makeSelectCampaignPagination());

  const _getFilteredCampaign = (data) => dispatch(getCampaignList(data));
  const _updateCampaignById = (data, id , callback) =>
    dispatch(updateCampaignById(data, id , callback));

  const isMobile = useMediaQuery("(max-width:768px)");

  const [campaignFilters, setCampaignFilters] = useState({});

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
    setTimeout(() => {
      _getFilteredCampaign();
    }, 0);
  }, []);

  useEffect(() => {
    _getFilteredCampaign({
      filters: campaignFilters,
      query: { page: page + 1 },
    });
  }, [campaignFilters, page]);

  const toggleCampaignCallback = () =>{
    _getFilteredCampaign({
      filters: campaignFilters,
      query: { page: page + 1 },
    });
  }

  const toggleCampaignStatus = (campaignId) => {
    const campaignItem =
      _campaignList.find((camp) => camp.id === campaignId) || null;
    if (!campaignItem) return;
    const { is_active, id } = campaignItem;

    const newCampaignState = {
      is_active: !is_active,
    };

    _updateCampaignById(newCampaignState, id , toggleCampaignCallback);
  };

  return {
    theme,
    router,
    adminUrlPrefix,
    business,
    isMobile,
    pageSize,
    setPageSize,
    page,
    setPage,
    campaignFilters,
    setCampaignFilters,
    isLoading,
    _campaignList,
    _campaignPagination,
    _getFilteredCampaign,
    handleChangePage,
    handleChangeRowsPerPage,
    toggleCampaignStatus,
  };
}

export { useCampaignDetail };
