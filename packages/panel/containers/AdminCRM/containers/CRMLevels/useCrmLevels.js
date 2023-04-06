import { useEffect, useState } from "react";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { deleteCrmLevel, getCrmLevels } from "store/actions";
import { makeSelectCrmLevels } from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

function useCrmLevels() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedLevelId, setSelectedLevelId] = useState(null);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const isLoading = useSelector(makeSelectLoading());
  const allCrmLevels = useSelector(makeSelectCrmLevels());

  const _getCrmLevels = () => dispatch(getCrmLevels());
  const _deleteCrmLevel = (data) => dispatch(deleteCrmLevel(data));

  useEffect(() => {
    setTimeout(() => {
      _getCrmLevels();
    }, 0);
  }, []);

  const handleDeleteLevel = (levelId) => {
    setOpenCancelModal(false);
    if (!levelId) return;
    _deleteCrmLevel(levelId);
  };

  const handleTableRowClick = (e , levelId)=>{
    e.stopPropagation()
    setSelectedLevelId(levelId)
    setOpenCancelModal(true)
  }

  const navigateToLevelDetail = (e, id) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    router.push(`${adminUrlPrefix}crm/customer_levels/details/${id}`);
  };

  return {
    router,
    adminUrlPrefix,
    isLoading,
    allCrmLevels,
    handleDeleteLevel,
    navigateToLevelDetail,
    selectedLevelId,
    openCancelModal,
    setOpenCancelModal,
    handleTableRowClick
  };
}

export default useCrmLevels;
