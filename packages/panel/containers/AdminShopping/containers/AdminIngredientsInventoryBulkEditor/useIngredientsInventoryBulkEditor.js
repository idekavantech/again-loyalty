import {
  makeSelectBranches,
  makeSelectBusinessId,
  makeSelectBusinessSlug,
} from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectUser } from "@saas/stores/user/selector";
import { downloaderRequest } from "@saas/utils/helpers/downloaderRequest";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkUpdateIngredients, getIngredients } from "store/actions";
import { makeSelectIngredients } from "store/selectors";
import { BASE_URL_V2 } from "@saas/utils/api";

export function useIngredientsInventoryBulkEditor({ isSuper }) {
  const ingredients = useSelector(makeSelectIngredients());
  const isLoading = useSelector(makeSelectLoading());
  const branches = useSelector(makeSelectBranches());
  const businessId = useSelector(makeSelectBusinessId());
  const user = useSelector(makeSelectUser());
  const businessSlug = useSelector(makeSelectBusinessSlug());
  const dispatch = useDispatch();
  const _getIngredients = (data) => dispatch(getIngredients(data));
  const _bulkUpdateIngredients = (
    ingredients,
    adjustments,
    successCallback,
    failureCallback
  ) =>
    dispatch(
      bulkUpdateIngredients(
        ingredients,
        adjustments,
        successCallback,
        failureCallback
      )
    );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [adjustments, setAdjustments] = useState([]);
  const [updatedIngredients, setUpdatedIngredients] = useState({});
  const [selectedBranch, setSelectedBranch] = useState(
    isSuper ? branches?.[0]?.slug : businessSlug
  );
  const _businessId = isSuper
    ? businessId
    : branches.find((branch) => branch.slug === selectedBranch)?.id;
  const _ingredients = isLoading
    ? Array.from(Array(10)).map(() => ({}))
    : ingredients;
  const filteredIds = router.query.ids
    ? Array.isArray(router.query.ids)
      ? router.query.ids
      : [router.query.ids]
    : null;
  useEffect(() => {
    setTimeout(
      () =>
        _getIngredients({
          page: 1,
          page_size: 200,
          business_slug: selectedBranch,
        }),
      0
    );
  }, [router.query, selectedBranch]);
  const submit = () => {
    setLoading(true);
    _bulkUpdateIngredients(
      Object.entries(updatedIngredients).map(([id, value]) => ({
        id: parseInt(id),
        ...Object.keys(value)
          .filter((key) => ["threshold", "alerting"].includes(key))
          .reduce(
            (obj, key) => ({
              ...obj,
              [key]: value[key],
            }),
            { business_id: _businessId || businessId }
          ),
      })),
      Object.fromEntries(
        Object.entries(adjustments)
          .filter(([, value]) => value?.[0]?.reason && value?.[0]?.amount)
          .map(([id, value]) => [
            id,
            { ...value[0], amount: parseFloat(value[0].amount) },
          ])
      ),
      () => {
        _getIngredients({
          page: 1,
          page_size: 50,
          business_slug: selectedBranch,
        });
        setUpdatedIngredients({});
        setAdjustments([]);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  };
  const exportCSVEndpoint = useMemo(
    () =>
      `${BASE_URL_V2}variations/reports/by-business/export?business_slug=${selectedBranch}`,
    [selectedBranch]
  );
  const exportCSV = () => {
    if (user?.token) {
      downloaderRequest("The collective report of the material", exportCSVEndpoint, user.token);
    }
  };
  const filterIngredients = (ingredient) => {
    return (
      !ingredient.id ||
      !filteredIds ||
      (ingredient.super_ingredient &&
        filteredIds.some(
          (id) => parseInt(id) === ingredient.super_ingredient
        )) ||
      filteredIds.some((id) => parseInt(id) === ingredient.resource)
    );
  };
  return {
    loading,
    adjustments,
    setAdjustments,
    updatedIngredients,
    setUpdatedIngredients,
    selectedBranch,
    setSelectedBranch,
    isLoading,
    branches,
    _ingredients,
    submit,
    exportCSV,
    filterIngredients,
  };
}
