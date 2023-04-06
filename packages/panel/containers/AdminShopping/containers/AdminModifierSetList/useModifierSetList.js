import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bulkAddLabelsToModifierSets,
  bulkAddProductsVariationsToModifierSets,
  bulkDeleteModifierSets,
  getAdminProducts,
  getBusinessCategories,
  getModifierSets,
} from "store/actions";
import {
  makeSelectAdminProducts,
  makeSelectModifierSets,
  makeSelectModifiersPagination,
} from "store/selectors";

export const SELECT_PRODUCT = "select_product";
export const SELECT_LABEL = "select_label";

export function useModifierSetList({ plugin, isSuper }) {
  const dispatch = useDispatch();
  const _getModifierSetSets = (data) => dispatch(getModifierSets(data));
  const _bulkDeleteModifierSets = (data, callback) =>
    dispatch(bulkDeleteModifierSets(data, callback));
  const _getAdminProducts = (data) => dispatch(getAdminProducts(data));
  const _getBusinessCategories = (data) =>
    dispatch(getBusinessCategories(data));
  const _bulkAddProductsVariationsToModifierSets = (data, callback) =>
    dispatch(bulkAddProductsVariationsToModifierSets(data, callback));
  const _bulkAddLabelsToModifierSets = (data, callback) =>
    dispatch(bulkAddLabelsToModifierSets(data, callback));
  const modifierSets = useSelector(makeSelectModifierSets());
  const modifierSetsPagination = useSelector(makeSelectModifiersPagination());
  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const pluginsData = useSelector(makeSelectPlugins());
  const isLoading = useSelector(makeSelectLoading());
  const adminDeals = useSelector(makeSelectAdminProducts());
  const pluginUrl = pluginsData[plugin]?.plugin_url;
  const { maxWidth768 } = useResponsive();
  const timeout = useRef(null);
  const [selectedModifierSets, selectModifierSets] = useState([]);
  const [search, setSearch] = useState("");
  const [bulkDeleteConfirmationPopup, setBulkDeleteConfirmationPopup] =
    useState(false);
  const [modal, setModal] = useState({ show: false, modifierId: null });
  const [tabValue, setTabValue] = useState(SELECT_PRODUCT);

  const [selectedResources, setSelectedResources] = useState(""); // { [id]: type = "product" || "label" }
  const router = useRouter();
  const page = parseInt(router.query.page) || 1;
  const pageSize = parseInt(router.query.page_size) || 200;
  const theme = useTheme();
  const modifierSetsRows = isLoading
    ? Array.from(Array(10)).map(() => ({}))
    : modifierSets;
  const modifierSetsRowsCount = modifierSetsRows ? modifierSetsRows.length : 0;
  const _getProducts = _getAdminProducts;
  const fetchUpdatedDeals = useCallback(
    () =>
      _getProducts({
        filters: {
          ...router.query,
          page,
          page_size: pageSize,
          has_paginated: false,
        },
      }),
    [page, pageSize, router.query]
  );

  const fetchUpdatedCategories = useCallback(
    () =>
      _getBusinessCategories({
        filters: {
          ...router.query,
          page,
        },
      }),
    [page, pageSize, router.query]
  );

  useEffect(() => {
    if (tabValue === SELECT_PRODUCT) setTimeout(fetchUpdatedDeals, 0);
    else if (tabValue === SELECT_LABEL) setTimeout(fetchUpdatedCategories, 0);

    if (!modal.show)
      setTimeout(() => {
        _getModifierSetSets({
          ...router.query,
          page,
          page_size: pageSize,
          is_super: isSuper,
          has_paginated: false,
        });
      }, 0);
  }, [page, pageSize, router.query]);

  const onOpenModal = (id, title) =>
    setModal({ show: true, modifierId: id, modifierTitle: title });
  const onCloseModal = () =>
    setModal({ show: false, modifierId: null, modifierTitle: null });
  const onSelectResource = (selected) => setSelectedResources(selected);
  const selectAllModifierSets = (event) => {
    if (
      event.target.checked &&
      (selectedModifierSets.length === 0 ||
        selectedModifierSets.length === modifierSetsRowsCount)
    ) {
      const _selectedModifierSets = modifierSetsRows.map(
        (modifierSet) => modifierSet.id
      );
      selectModifierSets(_selectedModifierSets);
    } else {
      selectModifierSets([]);
    }
  };
  const isModifierSetSelected = (id) => selectedModifierSets.indexOf(id) !== -1;
  const handlePageChange = (event, page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: parseInt(page) + 1 },
    });
  };
  const handleRowsPerPageChange = (event) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, page_size: event.target.value },
    });
  };
  const onModifierSetRowClick = (event, modifierSetId) => {
    const selectedIndex = selectedModifierSets.indexOf(modifierSetId);
    let _selectedModifierSets = [];

    if (selectedIndex === -1) {
      _selectedModifierSets = _selectedModifierSets.concat(
        selectedModifierSets,
        modifierSetId
      );
    } else if (selectedIndex === 0) {
      _selectedModifierSets = _selectedModifierSets.concat(
        selectedModifierSets.slice(1)
      );
    } else if (selectedIndex === selectedModifierSets.length - 1) {
      _selectedModifierSets = _selectedModifierSets.concat(
        selectedModifierSets.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      _selectedModifierSets = _selectedModifierSets.concat(
        selectedModifierSets.slice(0, selectedIndex),
        selectedModifierSets.slice(selectedIndex + 1)
      );
    }

    selectModifierSets(_selectedModifierSets);
  };
  const confirmDeleteModifierSets = () => {
    setBulkDeleteConfirmationPopup(false);
    _bulkDeleteModifierSets(selectedModifierSets, () => {
      selectModifierSets([]);
      _getModifierSetSets({ ...router.query, page, page_size: pageSize });
    });
  };
  const searchModifierSets = (search) => {
    setSearch(search);
    clearTimeout(timeout.current);
    const query = { ...router.query };
    delete query.search;
    if (search) {
      query.search = search;
    }
    timeout.current = setTimeout(() => {
      router.push({
        pathname: router.pathname,
        query,
      });
    }, 500);
  };
  const clearModifierSetsSearch = () => {
    setSearch("");
    const query = { ...router.query };
    delete query.search;
    router.push({
      pathname: router.pathname,
      query,
    });
  };

  function onSubmit() {
    const products = { ...selectedResources };
    Object.keys(products).forEach((key) => {
      if (products[key] !== "product") delete products[key];
    });
    const labels = { ...selectedResources };
    Object.keys(labels).forEach((key) => {
      if (labels[key] !== "label") delete labels[key];
    });
    if (Object.keys(products).length)
      _bulkAddProductsVariationsToModifierSets(
        {
          products: Object.keys(products).map((item) => parseInt(item)),
          id: modal.modifierId,
        },
        () => {
          setSelectedResources("");
          onCloseModal();
        }
      );
    if (Object.keys(labels).length)
      _bulkAddLabelsToModifierSets(
        {
          labels: Object.keys(labels).map((item) => parseInt(item)),
          id: modal.modifierId,
        },
        () => {
          setSelectedResources("");
          onCloseModal();
        }
      );
  }

  return {
    isLoading,
    selectedModifierSets,
    modifierSetsPagination,
    pluginUrl,
    maxWidth768,
    search,
    bulkDeleteConfirmationPopup,
    setBulkDeleteConfirmationPopup,
    router,
    page,
    pageSize,
    theme,
    adminUrlPrefix,
    modal,
    adminDeals,
    selectedResources,
    selectAllModifierSets,
    isModifierSetSelected,
    handlePageChange,
    handleRowsPerPageChange,
    onModifierSetRowClick,
    confirmDeleteModifierSets,
    searchModifierSets,
    clearModifierSetsSearch,
    modifierSetsRows,
    modifierSetsRowsCount,
    onOpenModal,
    onCloseModal,
    onSelectResource,
    onSubmit,
    setTabValue,
    tabValue,
  };
}
