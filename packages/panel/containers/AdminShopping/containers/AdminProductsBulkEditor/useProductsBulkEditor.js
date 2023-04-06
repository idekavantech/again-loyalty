import { makeSelectResourceLabels } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  bulkDeleteProducts,
  bulkUpdateProducts,
  getAdminProducts,
} from "store/actions";
import {
  makeSelectAdminProducts,
  makeSelectAdminProductsPagination,
} from "store/selectors";
import useTheme from "@material-ui/core/styles/useTheme";
import { useCallback, useEffect, useState } from "react";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { useRouter } from "next/router";
export const headCells = [
  {
    id: "title",
    align: "right",
    label: "Product Name",
    maxWidth: 200,
    minWidth: 200,
  },
  {
    id: "sku",
    align: "right",
    label: "ID(SKU)",
    inputType: "number",
  },
  {
    id: "initial_price",
    align: "right",
    label: "price product",
    minWidth: 100,
    inputType: "number",
  },
  {
    id: "discount",
    align: "right",
    label: "Product discount",
    minWidth: 100,
    inputType: "number",
  },
  {
    id: "discounted_price",
    align: "right",
    label: "The final price",
    inputType: "number",
  },
  {
    id: "final_unit_cost",
    align: "right",
    label: "Purchase price",
    inputType: "number",
  },
  {
    id: "labels",
    align: "right",
    label: "Labels",
  },
];
export function useProductsBulkEditor() {
  const dispatch = useDispatch();
  const labels = useSelector(makeSelectResourceLabels(true));
  const products = useSelector(makeSelectAdminProducts());
  const pagination = useSelector(makeSelectAdminProductsPagination());
  const isLoading = useSelector(makeSelectLoading());
  const _getProducts = (data) => dispatch(getAdminProducts(data));
  const _bulkUpdateProducts = (data, callback) =>
    dispatch(bulkUpdateProducts(data, null, callback));
  const _bulkDeleteProducts = (data, callback) =>
    dispatch(bulkDeleteProducts(data, callback));

  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const productsRows = isLoading
    ? Array.from(Array(10)).map(() => ({}))
    : products;
  const router = useRouter();
  const queryIds = router.query.ids;
  const filteredIds = queryIds
    ? Array.isArray(queryIds)
      ? queryIds
      : [queryIds]
    : null;

  const [page, setPage] = useState(parseInt(router.query.page) || 1);
  const [pageSize, setPageSize] = useState(router.query.page_size || 10);
  const { maxWidth768 } = useResponsive();
  const [updatedProducts, setUpdatedProducts] = useState({});
  const [allSelected, setAllSelected] = useState(false);
  const [selectedProducts, selectProducts] = useState([]);
  const [labelsError, setLabelsError] = useState({});
  const [titleError, setTitleError] = useState({});
  const [
    isDeleteProductsConfirmationModalOpen,
    setIsDeleteProductsConfirmationModalOpen,
  ] = useState({});
  const selectedProductsCount = selectedProducts?.length;
  const productsRowsCount = productsRows?.length;
  const onSelectAllClick = () => {
    if (selectedProductsCount !== productsRowsCount) {
      setAllSelected(true);
      const newSelecteds = productsRows.map((n) => n.id);
      selectProducts(newSelecteds);
      return;
    }
    setAllSelected(false);
    selectProducts([]);
  };

  const isSelected = (id) => selectedProducts.indexOf(id) !== -1;
  const handleClick = (event, name) => {
    const selectedIndex = selectedProducts.indexOf(name);
    let _selectedProducts = [];

    if (selectedIndex === -1) {
      _selectedProducts = _selectedProducts.concat(selectedProducts, name);
    } else if (selectedIndex === 0) {
      _selectedProducts = _selectedProducts.concat(selectedProducts.slice(1));
    } else if (selectedIndex === selectedProducts.length - 1) {
      _selectedProducts = _selectedProducts.concat(
        selectedProducts.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      _selectedProducts = _selectedProducts.concat(
        selectedProducts.slice(0, selectedIndex),
        selectedProducts.slice(selectedIndex + 1)
      );
    }
    setAllSelected(false);
    selectProducts(_selectedProducts);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  const submit = () => {
    setLoading(true);
    const _updatedProducts = Object.entries(updatedProducts)
      .filter(([id]) => !selectedProducts.includes(id))
      .map(([id, value]) => ({
        id: parseInt(id),
        ...Object.keys(value)
          .filter((key) =>
            headCells.some((cell) => cell.id === key || key === "variations")
          )
          .reduce(
            (obj, key) => ({
              ...obj,
              [key]: value[key],
            }),
            {}
          ),
      }));
    let hasError = false;
    _updatedProducts.map((updatedProduct) => {
      if (!updatedProduct.variations?.every((variation) => variation.title)) {
        hasError = true;
        setTitleError({
          ...titleError,
          [updatedProduct.id]: "Please enter the product name.",
        });
      }
    });
    if (!hasError)
      _bulkUpdateProducts(_updatedProducts, () => {
        if (selectedProducts.length) {
          selectProducts([]);
          setAllSelected(false);
          _bulkDeleteProducts(selectedProducts, () => {
            setLoading(false);
            fetchUpdatedDeals();
          });
        } else {
          setLoading(false);
          fetchUpdatedDeals();
        }
      });
    else setLoading(false);
  };
  const fetchUpdatedDeals = useCallback(
    () =>
      _getProducts({
        filters: {
          ...router.query,
          page,
          page_size: pageSize,
        },
      }),
    [page, pageSize, router.query]
  );
  useEffect(() => {
    setTimeout(fetchUpdatedDeals, 0);
  }, [page, pageSize, router.query]);
  return {
    labels,
    pagination,
    isLoading,
    theme,
    loading,
    page,
    pageSize,
    updatedProducts,
    setUpdatedProducts,
    allSelected,
    labelsError,
    setLabelsError,
    titleError,
    setTitleError,
    maxWidth768,
    filteredIds,
    onSelectAllClick,
    isSelected,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    submit,
    productsRows,
    selectedProductsCount,
    productsRowsCount,
    isDeleteProductsConfirmationModalOpen,
    setIsDeleteProductsConfirmationModalOpen,
  };
}
