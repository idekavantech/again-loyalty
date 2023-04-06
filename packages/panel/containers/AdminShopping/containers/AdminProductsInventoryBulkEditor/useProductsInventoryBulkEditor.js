import { getProductCategories } from "@saas/stores/business/actions";
import {
  makeSelectBranches,
  makeSelectBusinessId,
  makeSelectResourceLabels,
} from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkUpdateProducts, getAdminProducts } from "store/actions";
import {
  makeSelectAdminProducts,
  makeSelectAdminProductsPagination,
} from "store/selectors";
import useMediaQuery from "@material-ui/core/useMediaQuery";
const allowedKeys = [
  "keep_selling",
  "is_active",
  "variations",
  "threshold",
  "extra_data",
];
export function useProductsInventoryBulkEditor({ isSuper }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(parseInt(router.query.page) || 1);
  const [pageSize, setPageSize] = useState(router.query.page_size || 10);
  const matches = useMediaQuery("(max-width:768px)");
  const [updatedProducts, setUpdatedProducts] = useState({});
  const [adjustments, setAdjustments] = useState({});
  const [selectedBranch, setSelectedBranch] = useState(
    isSuper ? branches?.[0]?.slug : null
  );

  const dispatch = useDispatch();
  const products = useSelector(makeSelectAdminProducts());
  const pagination = useSelector(makeSelectAdminProductsPagination());
  const isLoading = useSelector(makeSelectLoading());
  const branches = useSelector(makeSelectBranches());
  const categories = useSelector(makeSelectResourceLabels(true));
  const businessId = useSelector(makeSelectBusinessId());
  const _getProducts = (data) => dispatch(getAdminProducts(data));
  const _getProductCategories = (data) => dispatch(getProductCategories(data));
  const _bulkUpdateProducts = (data, adjustments, callback) =>
    dispatch(bulkUpdateProducts(data, adjustments, callback));

  const selectedBranchId = isSuper
    ? businessId
    : branches.find((branch) => branch.slug === selectedBranch)?.id;
  const _products = isLoading
    ? Array.from(Array(10)).map(() => ({}))
    : products;
  const filteredIds = router.query.ids
    ? Array.isArray(router.query.ids)
      ? router.query.ids
      : [router.query.ids]
    : null;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  const submit = () => {
    setLoading(true);
    _bulkUpdateProducts(
      Object.entries(updatedProducts).map(([id, value]) => ({
        id: parseInt(id),
        ...Object.keys(value)
          .filter((key) => allowedKeys.includes(key))
          .reduce(
            (obj, key) => ({
              ...obj,
              [key]: value[key],
            }),
            { business_id: selectedBranchId }
          ),
      })),
      Object.fromEntries(
        Object.entries(adjustments).map(([id, value]) => [
          id,
          value
            .filter((adjustment) => adjustment.reason && adjustment.amount)
            .map((adjustment) => ({
              ...adjustment,
              amount: parseInt(adjustment.amount),
            })),
        ])
      ),
      () => {
        _getProducts({
          filters: {
            domain: router.query.site_domain,
            id: router.query.ids,
            label_id: router.query.category,
            ordering: router.query.ordering,
            search: router.query.search,
            page,
            page_size: pageSize,
          },
          business_slug: selectedBranch,
        });
        setUpdatedProducts({});
        setAdjustments({});
        setLoading(false);
      }
    );
  };
  useEffect(() => {
    setTimeout(
      () =>
        _getProducts({
          filters: {
            domain: router.query.site_domain,
            id: router.query.ids,
            label_id: router.query.category,
            ordering: router.query.ordering,
            search: router.query.search,
            page,
            page_size: pageSize,
          },
          business_slug: selectedBranch,
        }),
      0
    );
    setTimeout(() => {
      if (selectedBranch) _getProductCategories(selectedBranch);
    }, 0);
  }, [page, pageSize, router.query, selectedBranch]);

  const toggleAllFilters = (status) => {
    setUpdatedProducts(
      Object.fromEntries(
        _products?.map((product) => {
          return [
            product.id,
            {
              ...(updatedProducts[product.id] || {}),
              variations: product.variations.map((variation) => {
                return {
                  ...variation,
                  ...(variation.sku === "" && { sku: null }),
                  ...(updatedProducts[product.id]?.variations?.find(
                    (_variation) => _variation.id === variation.id
                  ) || {}),
                  is_active: status,
                };
              }),
            },
          ];
        })
      )
    );
  };
  return {
    pagination,
    isLoading,
    branches,
    categories,
    loading,
    page,
    pageSize,
    updatedProducts,
    setUpdatedProducts,
    adjustments,
    setAdjustments,
    selectedBranch,
    setSelectedBranch,
    matches,
    filteredIds,
    _products,
    submit,
    handleChangeRowsPerPage,
    handleChangePage,
    toggleAllFilters,
    setPage,
  };
}
