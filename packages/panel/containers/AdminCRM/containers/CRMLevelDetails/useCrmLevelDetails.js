import { useEffect, useState } from "react";
import { createCrmLevel, updateCrmLevel, getCrmLevelItem } from "store/actions";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { makeSelectCrmLevel } from "store/selectors";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { GET_CRM_LEVEL_BY_ID } from "store/constants";

const levelDetailsInitialState = {};

function useCrmLevelDetails() {
  const dispatch = useDispatch();
  const router = useRouter();

  const theme = useTheme();
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const [levelDetails, setLevelDetails] = useState({});

  const levelId = router.query.id;
  const isCreatingNewLevel = levelId === "new";

  const isLoading = useSelector(makeSelectLoading(GET_CRM_LEVEL_BY_ID))
  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const crmLevel = useSelector(makeSelectCrmLevel());

  const _createCrmLevel = (data) => dispatch(createCrmLevel(data));
  const _updateCrmLevels = (data) => dispatch(updateCrmLevel(data));
  const _getCrmLevel = (data) => dispatch(getCrmLevelItem(data));

  useEffect(() => {
    setTimeout(() => {
      if (isCreatingNewLevel) return;
      _getCrmLevel({ id: levelId });
    }, 0);
  }, []);

  useEffect(() => {
    if (crmLevel && !isCreatingNewLevel) {
      setLevelDetails(crmLevel);
    } else {
      setLevelDetails({ ...levelDetailsInitialState });
    }
  }, [crmLevel]);

  const submit = () => {
    const _levelDetails = {
      ...levelDetails,
      color: levelDetails?.color?.replace("#", ""),
    };
    if (isCreatingNewLevel) {
      _createCrmLevel(_levelDetails);
    } else {
      _updateCrmLevels(_levelDetails);
    }
    router.back();
  };

  const onLevelNameChange = (value) => {
    const _levelDetails = { ...levelDetails };
    _levelDetails.title = value;
    if (!value) delete _levelDetails.title;
    setLevelDetails(_levelDetails);
  };

  const onMinScoreChange = (value) => {
    const _levelDetails = { ...levelDetails };
    _levelDetails.min_score = value;
    if (!value) delete _levelDetails.min_score;
    setLevelDetails(_levelDetails);
  };

  const onMaxScoreChange = (value) => {
    const _levelDetails = { ...levelDetails };
    _levelDetails.max_score = value;
    if (!value) delete _levelDetails.max_score;
    setLevelDetails(_levelDetails);
  };

  const onLevelColorChange = (e) => {
    const value = e.target.value;
    const _levelDetails = { ...levelDetails };
    _levelDetails.color = value;
    if (!value) delete _levelDetails.color;
    setLevelDetails(_levelDetails);
  };

  return {
    router,
    theme,
    isLoading,
    isOpenSaveModal,
    setIsOpenSaveModal,
    openCancelModal,
    setOpenCancelModal,
    levelDetails,
    isCreatingNewLevel,
    adminUrlPrefix,
    submit,
    onMinScoreChange,
    onMaxScoreChange,
    onLevelColorChange,
    onLevelNameChange,
  };
}

export default useCrmLevelDetails;
