import { useEffect, useRef, useState } from "react";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import useTheme from "@material-ui/core/styles/useTheme";
import { useRouter } from "next/router";
import { bulkDeleteIngredients, getIngredients } from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectIngredients,
  makeSelectIngredientsPagination,
} from "store/selectors";

export function useIngredientList({ isSuper, plugin }) {
  const {maxWidth768} = useResponsive()
  const dispatch = useDispatch();
  const timeout = useRef(null);
  const [selectedIngredients, selectIngredients] = useState([]);
  const [search, setSearch] = useState("");

  const [popup, setPopup] = useState(false);
  const ingredientsSelectedCount = selectedIngredients.length;
  const theme = useTheme();
  const router = useRouter();
  const page = parseInt(router.query.page) || 1;
  const pageSize = parseInt(router.query.page_size) || 10;
  const ingredients = useSelector(makeSelectIngredients());
  const pagination = useSelector(makeSelectIngredientsPagination());
  const urlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const pluginsData = useSelector(makeSelectPlugins());
  const isLoading = useSelector(makeSelectLoading());
  const _getIngredients = (data, callback) =>
    dispatch(getIngredients(data, callback));
  const _bulkDeleteIngredients = (data, callback) =>
    dispatch(bulkDeleteIngredients(data, callback));

  const pluginUrl = pluginsData[plugin].plugin_url;

  const ingredientsRows = isLoading
    ? Array.from(Array(10)).map(() => ({}))
    : ingredients;

  const ingredientsRowCount = ingredientsRows?.length || 0;

  const isIngredientSelectedByResourceId = (resource_id) =>
    selectedIngredients.indexOf(resource_id) !== -1;
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
  const onIngredientClick = (event, resource_id) => {
    const selectedIndex = selectedIngredients.indexOf(resource_id);
    let _selectedIngredients = [];

    if (selectedIndex === -1) {
      _selectedIngredients = _selectedIngredients.concat(
        selectedIngredients,
        resource_id
      );
    } else if (selectedIndex === 0) {
      _selectedIngredients = _selectedIngredients.concat(
        selectedIngredients.slice(1)
      );
    } else if (selectedIndex === selectedIngredients.length - 1) {
      _selectedIngredients = _selectedIngredients.concat(
        selectedIngredients.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      _selectedIngredients = _selectedIngredients.concat(
        selectedIngredients.slice(0, selectedIndex),
        selectedIngredients.slice(selectedIndex + 1)
      );
    }
    selectIngredients(_selectedIngredients);
  };
  const goToCreateNewIngredientPage = () => {
    router.push(`${urlPrefix}${pluginUrl}/settings/ingredients/new`);
  };
  const deleteSelectedIngredients = () => {
    setPopup(false);
    _bulkDeleteIngredients(selectedIngredients, () => {
      selectIngredients([]);
      _getIngredients({ ...router.query, page, page_size: pageSize });
    });
  };
  const searchIngredients = (search) => {
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
  const clearSearchIngredient = () => {
    setSearch("");
    const query = { ...router.query };
    delete query.search;
    router.push({
      pathname: router.pathname,
      query,
    });
  };
  const selectAllIngredients = () => {
    selectIngredients(ingredients.map((ingredient) => ingredient.resource));
  };
  const unselectAllIngredients = () => {
    selectIngredients([]);
  };
  useEffect(() => {
    setTimeout(() => {
      _getIngredients({
        ...router.query,
        page,
        page_size: pageSize,
        is_super: isSuper,
      });
    }, 0);
  }, [router.query]);
  const isAllIngredientsInTheTableSelected =
    selectedIngredients.length === ingredientsRowCount;
  return {
    maxWidth768,
    selectedIngredients,
    search,
    isAllIngredientsInTheTableSelected,
    popup,
    setPopup,
    theme,
    page,
    pageSize,
    ingredientsSelectedCount,
    pagination,
    urlPrefix,
    isLoading,
    pluginUrl,
    ingredientsRows,
    ingredientsRowCount,
    isIngredientSelectedByResourceId,
    handleChangePage,
    handleChangeRowsPerPage,
    onIngredientClick,
    deleteSelectedIngredients,
    goToCreateNewIngredientPage,
    searchIngredients,
    clearSearchIngredient,
    selectAllIngredients,
    unselectAllIngredients,
    router,
  };
}
