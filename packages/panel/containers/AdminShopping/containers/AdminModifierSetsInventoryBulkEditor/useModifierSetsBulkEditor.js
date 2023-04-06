import { makeSelectBranches } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useDispatch, useSelector } from "react-redux";
import { bulkUpdateModifierSets, getModifierSets } from "store/actions";
import {
  makeSelectModifierSets,
  makeSelectModifiersPagination,
} from "store/selectors";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { alterInventoryOptions } from "@saas/stores/plugins/constants";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

export function useModifierSetsBulkEditor() {
  const dispatch = useDispatch();

  const _getAdminModifiers = (data, slug) =>
    dispatch(getModifierSets(data, slug));
  const _bulkUpdateModifierSets = (data, callback) =>
    dispatch(bulkUpdateModifierSets(data, callback));

  const isLoading = useSelector(makeSelectLoading());
  const branches = useSelector(makeSelectBranches());
  const pluginsData = useSelector(makeSelectPlugins());
  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const modifierSets = useSelector(makeSelectModifierSets());
  const modifiersPagination = useSelector(makeSelectModifiersPagination());
  const { maxWidth768 } = useResponsive();
  const pluginUrl = pluginsData[SHOPPING_PLUGIN]?.plugin_url;

  const router = useRouter();
  const page = parseInt(router.query.page) || 1;
  const pageSize = parseInt(router.query.page_size) || 10;
  const [loading, setLoading] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(branches?.[0]?.slug);

  const [_modifierSets, _setModifierSets] = useState(null);

  useEffect(() => {
    _setModifierSets(
      isLoading ? Array.from(Array(10)).map(() => ({})) : modifierSets
    );
  }, [isLoading, modifierSets]);

  useEffect(() => {
    setTimeout(() => {
      _getAdminModifiers(
        { ...router.query, page, page_size: pageSize },
        selectedBranch
      );
    }, 0);
  }, [router.query, page, pageSize, selectedBranch]);

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

  const isModifierAvailable = (modifier) => {
    const { reason = "", amount } = modifier;
    const newInventoryCount =
      (reason &&
        amount &&
        (alterInventoryOptions[reason]?.action === "plus"
          ? modifier.inventory_count + parseInt(amount)
          : alterInventoryOptions[reason]?.action === "minus"
          ? modifier.inventory_count - amount
          : alterInventoryOptions[reason]?.action === "set"
          ? amount
          : "")) ||
      modifier.inventory_count;
    const isNotAvailable =
      !modifier.is_active || (!modifier.keep_selling && newInventoryCount <= 0);

    return !isNotAvailable;
  };
  const onModifierIsActiveChange = (
    checked,
    modifierSetIndex,
    modifierIndex,
    modifier
  ) => {
    const newModifierSets = JSON.parse(JSON.stringify(_modifierSets));

    const _modifier = {
      is_active: checked,
      modifier_id: modifier.id,
      reason:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.reason ||
        null,
      amount:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.amount || 0,

      keep_selling:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.keep_selling,
    };

    newModifierSets[modifierSetIndex].variations[modifierIndex] = {
      ...modifier,
      ..._modifier,
    };

    _setModifierSets(newModifierSets);
  };
  const onModifierKeepSellingChange = (
    checked,
    modifierSetIndex,
    modifierIndex,
    modifier
  ) => {
    const newModifierSets = JSON.parse(JSON.stringify(_modifierSets));

    const _modifier = {
      available:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.available,
      modifier_id: modifier.id,
      reason:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.reason ||
        null,
      amount:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.amount || 0,

      keep_selling: checked,
    };

    newModifierSets[modifierSetIndex].variations[modifierIndex] = {
      ...modifier,
      ..._modifier,
    };

    _setModifierSets(newModifierSets);
  };
  const onModifierAdjustmentReasonChange = (
    reasonId,
    modifierSetIndex,
    modifierIndex,
    modifier
  ) => {
    const newModifierSets = JSON.parse(JSON.stringify(_modifierSets));

    const _modifier = {
      available:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.available,
      modifier_id: modifier.id,
      reason: parseInt(reasonId) || null,
      amount:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.amount || 0,

      keep_selling:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.keep_selling,
    };

    newModifierSets[modifierSetIndex].variations[modifierIndex] = {
      ...modifier,
      ..._modifier,
    };

    _setModifierSets(newModifierSets);
  };
  const onModifierAdjustmentAmountChange = (
    amount,
    modifierSetIndex,
    modifierIndex,
    modifier
  ) => {
    const newModifierSets = JSON.parse(JSON.stringify(_modifierSets));

    const _modifier = {
      available:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.available,
      modifier_id: modifier.id,
      reason:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.reason || 2,
      amount: amount || 0,

      keep_selling:
        _modifierSets[modifierSetIndex].variations[modifierIndex]?.keep_selling,
    };

    newModifierSets[modifierSetIndex].variations[modifierIndex] = {
      ...modifier,
      ..._modifier,
    };

    _setModifierSets(newModifierSets);
  };
  const submit = () => {
    setLoading(true);
    const callback = () => {
      _getAdminModifiers(
        { ...router.query, page, page_size: pageSize },
        selectedBranch
      );
      setLoading(false);
    };
    _bulkUpdateModifierSets(_modifierSets, callback);
  };
  return {
    isLoading,
    branches,
    adminUrlPrefix,
    pluginUrl,
    modifiersPagination,
    maxWidth768,
    page,
    pageSize,
    loading,
    selectedBranch,
    setSelectedBranch,
    modifierSets,
    _modifierSets,
    handleChangePage,
    handleChangeRowsPerPage,
    submit,
    isModifierAvailable,
    onModifierIsActiveChange,
    onModifierKeepSellingChange,
    onModifierAdjustmentReasonChange,
    onModifierAdjustmentAmountChange,
  };
}
