import {
  makeSelectBusiness,
  makeSelectResourceLabels,
} from "@saas/stores/business/selector";
import { setHasError, uploadFile } from "@saas/stores/global/actions";
import {
  makeSelectLoading,
  makeSelectMessage,
  makeSelectUploadedFile,
} from "@saas/stores/global/selectors";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkDeleteProducts, getAdminProducts, importCsv } from "store/actions";
import {
  makeSelectAdminProducts,
  makeSelectAdminProductsPagination,
} from "store/selectors";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {setSnackBarMessage} from "@saas/stores/ui/actions";
let timeoutId = null;

export function useProductsList({ plugin, isSuper }) {
  const dispatch = useDispatch();
  const _getProducts = (data) => dispatch(getAdminProducts(data));
  const _bulkDeleteProducts = (data, callback) =>
    dispatch(bulkDeleteProducts(data, callback));
  const _importCsv = (data, onSuccess, onError) => dispatch(importCsv(data, onSuccess, onError));
  const _uploadFile = (files, folderName, callback) =>
    dispatch(uploadFile({ files, folderName }, callback, true));
  const _getHasError = () => dispatch(setHasError());
  const _setSnackBarMessage = (message, type) =>
      dispatch(setSnackBarMessage(message, type));
  const resourceLabels = useSelector(makeSelectResourceLabels(true));
  const products = useSelector(makeSelectAdminProducts());
  const pagination = useSelector(makeSelectAdminProductsPagination());
  const urlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const pluginsData = useSelector(makeSelectPlugins());
  const isLoading = useSelector(makeSelectLoading());
  const business = useSelector(makeSelectBusiness());
  const uploadedFile = useSelector(makeSelectUploadedFile());
  const hasError = useSelector(makeSelectMessage());
  const pluginUrl = pluginsData[plugin].plugin_url;
  const [_products, _setProducts] = useState([]);

  const router = useRouter();
  const page = parseInt(router.query.page) || 1;
  const pageSize = parseInt(router.query.page_size) || 10;
  const ordering = router.query.ordering || "-_created_at"
  const matches = useMediaQuery("(max-width:768px)");
  const [selectedProducts, selectProducts] = useState([]);
  const [
    isBulkDeleteConfirmationPopupOpen,
    setIsBulkDeleteConfirmationPopupOpen,
  ] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    selectProducts([]);
    setTimeout(() => {
      _getProducts({
        filters: {
          ordering,
          page,
          page_size: pageSize,
          is_super: isSuper,
          ...router.query,
        },
      });
    }, 0);
  }, [router.query]);
  useEffect(() => {
    if (isLoading) {
      _setProducts(Array.from(Array(10)).map(() => ({})));
    } else {
      _setProducts(products);
    }
  }, [products, isLoading]);

  useEffect(() => {
    _getHasError();
  }, [uploadedFile]);

  const onSelectAllClick = (event) => {
    if (
      event.target.checked &&
      (selectedProducts.length === 0 ||
        selectedProducts.length === _products?.length)
    ) {
      const _selectedProducts = _products.map((product) => product.id);
      selectProducts(_selectedProducts);
      return;
    }
    selectProducts([]);
  };
  const isProductSelected = (id) => selectedProducts.indexOf(id) !== -1;
  const handleChangePage = (event, page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: parseInt(page) + 1 },
    });
  };
  const handleChangeRowsPerPage = (event) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, page_size: event.target.value },
    });
  };
  const onProductRowClick = (event, id) => {
    const selectedProductIndex = selectedProducts.indexOf(id);
    let _productsSelected = [];

    if (selectedProductIndex === -1) {
      _productsSelected = _productsSelected.concat(selectedProducts, id);
    } else if (selectedProductIndex === 0) {
      _productsSelected = _productsSelected.concat(selectedProducts.slice(1));
    } else if (selectedProductIndex === selectedProducts.length - 1) {
      _productsSelected = _productsSelected.concat(
        selectedProducts.slice(0, -1)
      );
    } else if (selectedProductIndex > 0) {
      _productsSelected = _productsSelected.concat(
        selectedProducts.slice(0, selectedProductIndex),
        selectedProducts.slice(selectedProductIndex + 1)
      );
    }
    selectProducts(_productsSelected);
  };

  const handleClose = () => {
    setIsImportModalOpen(false);
  };
  const businessId = useMemo(() => {
    if (business?.super_business) {
      return business?.super_business?.id;
    } else {
      return business?.id;
    }
  }, [business]);
  useEffect(() => {
    if (uploadedFile) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _importCsv({
          business: businessId,
          _products: uploadedFile.url,
        }, () => {
          _setSnackBarMessage("Successfully added.", "success")
        }, () => {
          _setSnackBarMessage("Adding products faced an error.", "fail")

        });
      }, 500);
    } else {
      clearTimeout(timeoutId);
    }
  }, [uploadedFile]);

  const onIsAvailableChange = (event, isAvailable) => {
    const query = { ...router.query };
    delete query.available;
    delete query.page;
    if (isAvailable === 1) query.available = "true";
    if (isAvailable === 2) query.available = "false";
    router.push({ pathname: router.pathname, query });
  };
  const selectAllProducts = () => {
    selectProducts(_products.map((product) => product.id));
  };
  const unselectAllProducts = () => {
    selectProducts([]);
  };
  const confirmDeleteProducts = () => {
    setIsBulkDeleteConfirmationPopupOpen(false);
    _bulkDeleteProducts(selectedProducts, () => {
      _getProducts({
        filters: {
          ...router.query,
          page,
          page_size: pageSize,
        },
      });
      selectProducts([]);
    });
  };

  const isAllProductsSelected = _products?.length === selectedProducts.length;
  return {
    _uploadFile,
    _getHasError,
    urlPrefix,
    isLoading,
    hasError,
    pluginUrl,
    resourceLabels,
    pagination,
    _getProducts,
    _bulkDeleteProducts,
    _products,
    router,
    page,
    pageSize,
    matches,
    selectedProducts,
    selectProducts,
    isBulkDeleteConfirmationPopupOpen,
    setIsBulkDeleteConfirmationPopupOpen,
    theme,

    onSelectAllClick,
    isProductSelected,
    handleChangePage,
    handleChangeRowsPerPage,
    onProductRowClick,
    handleClose,
    isImportModalOpen,
    setIsImportModalOpen,
    onIsAvailableChange,
    selectAllProducts,
    unselectAllProducts,
    confirmDeleteProducts,
    isAllProductsSelected,
  };
}
