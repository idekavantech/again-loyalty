import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectAdminUrlPrefix, makeSelectPlugin } from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  addLabelToMembershipsGroup,
  createCRMMembership as createCRMMembershipAction,
  getCRMMembershipByQuery,
  getLabels,
  importMemberships,
} from "store/actions";
import jMoment from "moment";
import {
  makeSelectCrmLabels,
  makeSelectCRMMemberShipsByQuery,
  makeSelectCRMMemberShipsPaginationByQuery,
} from "store/selectors";
import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { makeSelectBusiness, makeSelectBusinessSlug } from "@saas/stores/business/selector";
import { removeParamsFromUrl } from "@saas/utils/helpers/removeParamsFromUrl";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectUser } from "@saas/stores/user/selector";
import { BASE_URL_V2 } from "@saas/utils/api";
import { useDownloadFile } from "@saas/utils/hooks/useDownloadFile";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { uploadFile } from "@saas/stores/global/actions";
import { UPLOAD_FILE } from "@saas/stores/global/constants";
import { IMPORT_MEMBERSHIPS } from "store/constants";
import { formatDateObjectToNormal } from "utils/helpers";

 
 

const UPDATE_DELAY_IN_MILLISECONDS = 500;

const FROM = "from";
const TO = "to";

const sortingOptions = [
  {
    id: 0,
    text: "Highest Point",
    keyword: "-point_credit",
  },
  {
    id: 1,
    text: "Lowest point",
    keyword: "point_credit ",
  },
  {
    id: 2,
    text: "Highest gift",
    keyword: "-gift_credit",
  },
  {
    id: 3,
    text: "Lowest gift",
    keyword: "gift_credit",
  },
];

const initialFilterParams = {
  page: 0,
  page_size: 10,
};

const EXAMPLE_UPLOAD_FILE_LINK = "https://hs3-cdn-saas.behtarino.com/media/business_memberships/example.xlsx";

export function useCRMMembershipsList() {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(makeSelectLoading());
  const membershipByQuery = useSelector(makeSelectCRMMemberShipsByQuery());
  const membershipPaginationByQuery = useSelector(makeSelectCRMMemberShipsPaginationByQuery());
  const user = useSelector(makeSelectUser());
  const businessSlug = useSelector(makeSelectBusinessSlug());
  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const labels = useSelector(makeSelectCrmLabels());
  const business = useSelector(makeSelectBusiness());
  const CRMPluginData = useSelector(makeSelectPlugin(CRM_PLUGIN));
  const _isLoadingUploadFile = useSelector(makeSelectLoading(UPLOAD_FILE));
  const _isImportUsersLoading = useSelector(makeSelectLoading(IMPORT_MEMBERSHIPS));
  const [anchorEl, setAnchorEl] = useState(null);

  const _getCRMMembershipsByQuery = (query) => dispatch(getCRMMembershipByQuery(query));
  const _getCRMLabels = () => dispatch(getLabels());
  const _createCRMMembership = (data, callback) => dispatch(createCRMMembershipAction(data, callback));
  const _allLabelToMembershipGroup = (labelId, data, cb) => dispatch(addLabelToMembershipsGroup(labelId, data, cb));
  const _setSnackBar = (message) => dispatch(setSnackBarMessage(message, "success"));
  const _uploadFile = (files, folderName, callback) =>
    dispatch(uploadFile({ files, folderName }, callback, false, false));
  const _importMemberships = (data, callback) => dispatch(importMemberships(data, callback));

  const router = useRouter();
  const theme = useTheme();
  const { maxWidth768 } = useResponsive();
  const [search, setSearch] = useState("");
  const [orderCountRange, setOrderCountRange] = useState({});
  const [pointCreditRange, setPointCreditRange] = useState({});

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const [lastOrderDateRange, setLastOrderDateRange] = useState({
    from: null,
    to: null,
  });

  const handleOpen = () => {
    setIsDateModalOpen(true);
  };
  const handleClose = () => {
    setIsDateModalOpen(false);
  };

  const { utm: { description_choices = [] } = {} } = CRMPluginData?.data;

  useEffect(() => {
    setTimeout(() => {
      const query = { ...router.query };
      const {
        search,
        from_order_count,
        to_order_count,
        from_point_credit,
        to_point_credit,
        from_last_order_date,
        to_last_order_date,
      } = query;
      if (search) setSearch(search);
      if (from_point_credit && to_point_credit) setPointCreditRange({ from: from_point_credit, to: to_point_credit });
      if (from_order_count && to_order_count) setOrderCountRange({ from: from_order_count, to: to_order_count });
      if (from_last_order_date && to_last_order_date) {
        const fromDate = new Date(from_last_order_date).toLocaleDateString("en")
        const toDate = new Date(to_last_order_date).toLocaleDateString("en")
        const [fromYear, fromMonth, fromDay] = fromDate.split("/");
        const [toYear, toMonth, toDay] = toDate.split("/");
        const fromObj = { day: +fromDay, month: +fromMonth, year: +fromYear };
        const toObj = { day: +toDay, month: +toMonth, year: +toYear };
        setLastOrderDateRange({ from: fromObj, to: toObj });
      }
      _getCRMLabels();
    }, 0);
  }, []);

  const [isLabelsModalOpen, setIsLabelsModalOpen] = useState(false);
  const handleLableModalOpen = () => setIsLabelsModalOpen(true);
  const handleLableModalClose = () => setIsLabelsModalOpen(false);
  const [selectedMembershipIds, setSelectedMembershipIds] = useState([]);
  const [selectedSortingOption, setSelectedSortingOption] = useState(null);

  const [isImportUsersModalOpen, setIsImportUsersModalOpen] = useState(false);
  const [importingUsersLabels, setImportingUsersLabels] = useState([]);
  const [isUsersExcelFileValid, setIsUsersExcelFileValid] = useState(true);

  const [isExcelFileUploaded, setIsEcxelFileUploaded] = useState(false);
  const [selectedFileData , setSelectedFileData] = useState(null)
  const [isUserChooseExcelfile, setIsUserChooseExcelFile] = useState(false);

  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

  const handleOpenImportUsersModal = () => setIsImportUsersModalOpen(true);
  const handleCloseImportUsersModal = () => setIsImportUsersModalOpen(false);

  const exportFullExelEndpoint = () =>
    `${BASE_URL_V2}crm/memberships/by-business/export/?business_slug=${businessSlug}`;

  const { startDownload, loading: downloadFileLoading } = useDownloadFile(
    "Customers",
    exportFullExelEndpoint(),
    user.token
  );
  const onOrderMembershipsChange = (orderOption) => {
    if (!orderOption) return;
    setSelectedSortingOption(orderOption);
  };

  const onClearMembershipOrder = () => {
    setSelectedSortingOption(null);
  };

  const onMembershipClick = (e, membershipId) => {
    e.stopPropagation();
    if (!membershipId) return;
    const haveUser = selectedMembershipIds.includes(membershipId);
    let _selectedMembershipIds;
    if (haveUser) {
      _selectedMembershipIds = selectedMembershipIds.filter((membership) => membership !== membershipId);
    } else {
      _selectedMembershipIds = [...selectedMembershipIds, membershipId];
    }
    setSelectedMembershipIds(_selectedMembershipIds);
  };

  const onOrderCreditRangeChange = (e, type) => {
    const { value } = e.target;
    const _orderCountRange = { ...orderCountRange, [type]: value };
    if (!value) delete _orderCountRange[type];
    setOrderCountRange(_orderCountRange);
  };

  const onCreditPointChange = (e, type) => {
    const { value } = e.target;
    const _pointCreditRange = { ...pointCreditRange, [type]: value };
    if (!value) delete _pointCreditRange[type];
    setPointCreditRange(_pointCreditRange);
  };

  const clearSearch = () => {
    setSearch("");
    const query = { ...router.query };
    delete query.search;
    router.push({
      pathname: `${adminUrlPrefix}/crm/customers`,
      query,
    });
  };

  const handleChangePage = (newPage) => {
    const query = { ...router.query };
    query.page = newPage;
    router.push({
      pathname: `${adminUrlPrefix}/crm/customers`,
      query,
    });
  };

  const handleChangeRowsPerPage = (e) => {
    const { value } = e.target;
    const query = { ...router.query };
    query.page = 0;
    query.page_size = value;
    router.push({
      pathname: `${adminUrlPrefix}/crm/customers`,
      query,
    });
  };

  const onSearchMembershipChange = (search) => {
    const isSearchWithPhone = search?.length && persianToEnglishNumber(search?.[0]) === "0";
    if (isSearchWithPhone) {
      const formatedSearch = persianToEnglishNumber(search);
      setSearch(formatedSearch.replace("0", "+98"));
    } else {
      setSearch(persianToEnglishNumber(search));
    }
  };

  const onMediumChange = (e) => {
    const { value } = e.target;
    const query = { ...router.query };

    query.utm_medium = value;
    router.push({
      pathname: `${adminUrlPrefix}/crm/customers`,
      query,
    });
  };

  useEffect(() => {
    const query = { ...router.query };
    query.ordering = selectedSortingOption?.keyword;
    if (!selectedSortingOption) delete query.ordering;
    router.push({
      pathname: `${adminUrlPrefix}/crm/customers`,
      query,
    });
  }, [selectedSortingOption]);

  let searchTimeout = null;
  useEffect(() => {
    searchTimeout = setTimeout(() => {
      const query = { ...router.query };

      query.search = search;
      if (!search) delete query.search;
      router.push({
        pathname: `${adminUrlPrefix}/crm/customers`,
        query,
      });
    }, UPDATE_DELAY_IN_MILLISECONDS);
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
        searchTimeout = null;
      }
    };
  }, [search]);

  let orderTimeout = null;
  useEffect(() => {
    if (orderCountRange && Object.keys(orderCountRange).length === 1) return;
    orderTimeout = setTimeout(() => {
      const query = { ...router.query };

      delete query.from_order_count;
      delete query.to_order_count;

      if (orderCountRange?.to) {
        query.to_order_count = Number(orderCountRange?.to);
      }

      if (orderCountRange?.from) {
        query.from_order_count = Number(orderCountRange?.from);
      }
      router.push({
        pathname: `${adminUrlPrefix}/crm/customers`,
        query,
      });
    }, UPDATE_DELAY_IN_MILLISECONDS);
    return () => {
      if (orderTimeout) {
        clearTimeout(orderTimeout);
        orderTimeout = null;
      }
    };
  }, [orderCountRange]);

  let pointCreditTimeout = null;
  useEffect(() => {
    if (pointCreditRange && Object.keys(pointCreditRange).length === 1) return;
    pointCreditTimeout = setTimeout(() => {
      const query = { ...router.query };

      delete query.from_point_credit;
      delete query.to_point_credit;

      if (pointCreditRange?.to) {
        query.to_point_credit = Number(pointCreditRange?.to);
      }

      if (pointCreditRange?.from) {
        query.from_point_credit = Number(pointCreditRange?.from);
      }

      router.push({
        pathname: `${adminUrlPrefix}/crm/customers`,
        query,
      });
    }, UPDATE_DELAY_IN_MILLISECONDS);
    return () => {
      if (pointCreditTimeout) {
        clearTimeout(pointCreditTimeout);
        pointCreditTimeout = null;
      }
    };
  }, [pointCreditRange]);

  const onLabelMembershipChange = (e) => {
    const { id } = e.target.value;

    const query = { ...router.query };

    query.label = id;
    router.push({
      pathname: `${adminUrlPrefix}/crm/customers`,
      query,
    });
  };

  const onClearLabel = () => {
    const query = { ...router.query };
    if (query.label) delete query.label;
    router.push({
      pathname: `${adminUrlPrefix}/crm/customers`,
      query,
    });
  };

  const onClearAllFilters = async () => {
    await router.push({
      pathname: `${adminUrlPrefix}/crm/customers`,
      query: initialFilterParams,
    });
    setSearch("");
    setPointCreditRange(null);
    setOrderCountRange(null);
    onClearMembershipOrder();
    setLastOrderDateRange({ from: null, to: null });
  };

  useEffect(() => {
    const query = { ...router.query };
    if (query.site_domain) delete query.site_domain;
    const { page, page_size } = query;
    const queryPage = page ? Number(page) + 1 : 1;
    const queryPageSize = page_size ? Number(page_size) : 10;
    _getCRMMembershipsByQuery({
      ...query,
      page: queryPage,
      page_size: queryPageSize,
    });
  }, [router.query]);

  const [CRMMembershipData, setCRMMembershipData] = useState({
    business: business.id,
    name: "",
    user: { phone: null },
    labels: [],
  });

  const closeCreateCRMMembershipModal = () => removeParamsFromUrl("is_create_crm_membership_modal_open");
  const openCreateCRMMembershipModal = () => pushParamsToUrl("is_create_crm_membership_modal_open");

  const isCreateCRMMembershipModalOpen = router.query?.is_create_crm_membership_modal_open;

  const createCRMMembership = () => {
    const callback = (_CRMMembership) => {
      if (_CRMMembership?.id) {
        closeCreateCRMMembershipModal();
        setCRMMembershipData({
          business: business.id,
          name: "",
          user: { phone: null },
          labels: [],
        });
      }
    };
    _createCRMMembership(CRMMembershipData, callback);
  };
  const isCreateCRMMembershipSubmitButtonDisabled = !CRMMembershipData.name || !CRMMembershipData.user.phone || loading;
  const onCRMMembershipNameChange = (value) =>
    setCRMMembershipData({
      ...CRMMembershipData,
      name: value,
    });
  const onCRMMembershipPhoneChange = (value) =>
    setCRMMembershipData({
      ...CRMMembershipData,
      user: { ...CRMMembershipData.user, phone: value },
    });

  const handleCRMLabelClick = () => {
    const newCRMMembershipData = JSON.parse(JSON.stringify(CRMMembershipData));

    if (newCRMMembershipData?.labels?.length) {
      newCRMMembershipData.labels = [];
      setCRMMembershipData(newCRMMembershipData);
    } else {
      newCRMMembershipData.labels = labels?.map((level) => level.id);
      setCRMMembershipData(newCRMMembershipData);
    }
  };

  const handleCRMLabelItemClick = (e, label) => {
    e.preventDefault();
    const newCRMMembershipData = JSON.parse(JSON.stringify(CRMMembershipData));

    if (newCRMMembershipData?.labels.includes(label.id)) {
      const newLabels = newCRMMembershipData?.labels.filter((_label) => _label !== label.id);
      newCRMMembershipData.labels = [...newLabels];
      setCRMMembershipData(newCRMMembershipData);
    } else {
      newCRMMembershipData.labels = [...newCRMMembershipData.labels, label.id];
      setCRMMembershipData(newCRMMembershipData);
    }
  };

  const formatDate = (date) => {
    if (!date) return null;
    return persianToEnglishNumber(jMoment(formatDateObjectToNormal(date), "YYYY-jM-jD").format("YYYY-M-D"));
  };

  const handleCRMLastOrderDateChange = (from , to) => {
    if (!from || !to) return;
    const query = {
      ...router.query,
      from_last_order_date: from,
      to_last_order_date: to,
    };
    router.push({
      pathname: `${adminUrlPrefix}/crm/customers`,
      query,
    });
    handleClose();
  };

  const submitLabel = (selectedLabel) => {
    const callBack = () => {
      onClearAllFilters();
      setSelectedMembershipIds([]);
    };
    _allLabelToMembershipGroup(selectedLabel, selectedMembershipIds, callBack);
  };

  const onCRMMembershipHeaderCheckboxClick = () => {
    const haveSelectedAllMemberships =
      selectedMembershipIds && selectedMembershipIds.length === membershipByQuery.length;

    if (haveSelectedAllMemberships) {
      setSelectedMembershipIds([]);
    } else {
      setSelectedMembershipIds(membershipByQuery.map((membership) => membership.id));
    }
  };

  const downloadFullExcelFile = () => {
    startDownload();
    setAnchorEl(null);
    _setSnackBar("Your request was successfully registered. This operation may take a few minutes");
  };

  const resetFileState = () => {
    setIsEcxelFileUploaded(false);
    setIsUserChooseExcelFile(false);
  };

  const uploadUsersFileCallback = (fileUrl) => {
    setUploadedFileUrl(fileUrl);
    setIsEcxelFileUploaded(true);
  };

  const uploadUsersExcelFile = (file) => {
    _uploadFile(file, "business_memberships", uploadUsersFileCallback);
  };

  const isActiveDropzon = useMemo(
    () => !isExcelFileUploaded || _isLoadingUploadFile,
    [_isLoadingUploadFile, isExcelFileUploaded]
  );

  const handleRemoveImportingUsersLabel = (labelId) =>
    setImportingUsersLabels((prevState) => prevState.filter((lb) => lb !== labelId));

  const handleAddImportingUsersLabel = (labelId) => setImportingUsersLabels((prevState) => [...prevState, labelId]);

  const handleToggleImportingUsersLabel = (e, labelId) => {
    e.preventDefault();
    const haveLabel = importingUsersLabels.includes(labelId);
    if (haveLabel) {
      handleRemoveImportingUsersLabel(labelId);
    } else {
      handleAddImportingUsersLabel(labelId);
    }
  };

  const isExcelFile = (fileName) => /\.(xlsx|xls|xlsm)$/i.test(fileName);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const isValidFile = isExcelFile(file.name);
    setSelectedFileData(file)
    if (acceptedFiles.length > 1) return;
    if (isValidFile) {
      setIsUsersExcelFileValid(true);
      setIsUserChooseExcelFile(true);
      uploadUsersExcelFile(acceptedFiles);
    } else {
      setIsUserChooseExcelFile(false);
      setIsUsersExcelFileValid(false);
    }
  }, []);

  const cancelImportUsers = () => {
    setImportingUsersLabels([]);
    setIsEcxelFileUploaded(false);
    setIsUserChooseExcelFile(false);
    handleCloseImportUsersModal();
    setIsUsersExcelFileValid(true);
    setSelectedFileData(null)
  };

  const importUsersCallback = () => {
    cancelImportUsers();
    handleCloseImportUsersModal();
    const query = { ...router.query };
    router.push({
      pathname: `${adminUrlPrefix}/crm/customers`,
      query,
    });
  };

  const submitImportUsers = () => {
    if (!uploadedFileUrl) return;
    const membershipsData = {
      path: uploadedFileUrl,
      labels: importingUsersLabels,
    };
    _importMemberships(membershipsData, importUsersCallback);
  };

  return {
    isExcelFileUploaded,
    setIsEcxelFileUploaded,
    isUserChooseExcelfile,
    submitImportUsers,
    isImportUsersModalOpen,
    handleOpenImportUsersModal,
    handleCloseImportUsersModal,
    cancelImportUsers,
    setIsUserChooseExcelFile,
    fileInputRef,
    onDrop,
    handleRemoveImportingUsersLabel,
    handleToggleImportingUsersLabel,
    loading,
    isUsersExcelFileValid,
    membershipByQuery,
    initialFilterParams,
    membershipPaginationByQuery,
    adminUrlPrefix,
    labels,
    router,
    importingUsersLabels,
    theme,
    maxWidth768,
    search,
    selectedFileData,
    _isLoadingUploadFile,
    handleChangePage,
    handleChangeRowsPerPage,
    isActiveDropzon,
    clearSearch,
    createCRMMembership,
    isCreateCRMMembershipSubmitButtonDisabled,
    isCreateCRMMembershipModalOpen,
    openCreateCRMMembershipModal,
    closeCreateCRMMembershipModal,
    CRMMembershipData,
    _isImportUsersLoading,
    onCRMMembershipNameChange,
    onCRMMembershipPhoneChange,
    handleCRMLabelClick,
    handleCRMLabelItemClick,
    sortingOptions,
    FROM,
    TO,
    description_choices,
    onSearchMembershipChange,
    onLabelMembershipChange,
    onClearLabel,
    onOrderMembershipsChange,
    onMediumChange,
    orderCountRange,
    onOrderCreditRangeChange,
    pointCreditRange,
    onCreditPointChange,
    EXAMPLE_UPLOAD_FILE_LINK,
    onClearAllFilters,
    onMembershipClick,
    selectedMembershipIds,
    submitLabel,
    isLabelsModalOpen,
    handleLableModalOpen,
    handleLableModalClose,
    selectedSortingOption,
    onClearMembershipOrder,
    onCRMMembershipHeaderCheckboxClick,
    exportFullExelEndpoint,
    user,
    anchorEl,
    setAnchorEl,
    resetFileState,
    downloadFileLoading,
    downloadFullExcelFile,
    handleCRMLastOrderDateChange,
    isDateModalOpen,
    handleOpen,
    handleClose,
    lastOrderDateRange,
    setLastOrderDateRange,
  };
}
