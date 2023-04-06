import { makeSelectBusinessId } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bulkUpdateIngredients, getIngredients } from "store/actions";
import { makeSelectIngredients } from "store/selectors";
export const headCells = [
  {
    id: "title",
    align: "right",
    label: "Name of the raw material",
    super: true,
  },
  {
    id: "sku",
    align: "right",
    label: "ID(SKU)",
    super: true,
    inputType: "number",
  },
  {
    id: "discounted_price",
    align: "right",
    label: "Price",
    minWidth: 100,
    super: true,
    inputType: "number",
  },
];
export function useIngredientsBulkEditor() {
  const dispatch = useDispatch();
  const _getIngredients = (data) => dispatch(getIngredients(data));
  const _bulkUpdateIngredients = (data, callback) =>
    dispatch(bulkUpdateIngredients(data, null, callback));
  const adminIngredients = useSelector(makeSelectIngredients());
  const isLoading = useSelector(makeSelectLoading());
  const businessId = useSelector(makeSelectBusinessId());
  const router = useRouter();
  const filteredIds = router.query.ids
    ? Array.isArray(router.query.ids)
      ? router.query.ids
      : [router.query.ids]
    : null;

  const [updatedIngredients, setUpdatedIngredients] = useState({});
  const [loading, setLoading] = useState(false);
  const ingredients = isLoading
    ? Array.from(Array(10)).map(() => ({}))
    : adminIngredients;

  const submit = () => {
    setLoading(true);
    _bulkUpdateIngredients(
      Object.entries(updatedIngredients).map(([id, value]) => ({
        id: parseInt(id),
        ...Object.keys(value)
          .filter((key) => headCells.some((cell) => cell.id === key))
          .reduce(
            (obj, key) => ({
              ...obj,
              [key]: value[key],
            }),
            { business_id: businessId }
          ),
      })),
      () => setLoading(false)
    );
  };
  useEffect(() => {
    setTimeout(
      () =>
        _getIngredients({
          page: 1,
          page_size: 200,
        }),
      0
    );
  }, [router.query]);
  return {
    isLoading,
    filteredIds,
    updatedIngredients,
    setUpdatedIngredients,
    loading,
    ingredients,
    submit,
  };
}
