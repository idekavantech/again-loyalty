import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

import InputAdornment from "@material-ui/core/InputAdornment";
import React, { memo } from "react";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Input from "@saas/components/Input";
import Link from "next/link";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import PopUp from "@saas/components/PopUp";
import Skeleton from "@material-ui/lab/Skeleton";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { useIngredientList } from "./useIngredientList";

const headCells = [
  {
    id: "title",
    align: "right",
    label: "Name of raw materials",
  },
];
function IngredientList({ isSuper = false, plugin = SHOPPING_PLUGIN }) {
  const {
    matches,
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
    unselectAllIngredients,
    selectAllIngredients,
    router,
  } = useIngredientList({ isSuper, plugin });

  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        submitAction={goToCreateNewIngredientPage}
        responsive={false}
        submitButtonHasPlus
        submitButtonText="New raw material"
      />
      <Paper elevation={1} className="py-4 mt-4">
        <div className="d-flex pb-4 px-4 align-items-center">
          <div className={`d-flex ${matches ? "flex-1" : ""}`}>
            <div className="w-100">
              <Input
                size="small"
                style={{
                  width: !matches ? 188 : "100%",
                }}
                value={search}
                onChange={searchIngredients}
                className="ml-2"
                placeholder="Search of raw material"
                inputProps={{
                  className: "pr-5 mr-2",
                }}
                InputProps={{
                  startAdornment: (
                    <>
                      {search ? (
                        <InputAdornment
                          style={{ position: "absolute", left: 3 }}
                          className="u-cursor-pointer"
                          position="start"
                          onClick={clearSearchIngredient}
                        >
                          <ClearRoundedIcon
                            style={{ color: theme.palette.text.disabled }}
                          />
                        </InputAdornment>
                      ) : null}
                      <InputAdornment
                        style={{ position: "absolute", right: 0 }}
                        className={`u-cursor-pointer u-pointer-events-none`}
                        position="start"
                      >
                        <SearchRoundedIcon
                          className="ml-1"
                          style={{ color: theme.palette.text.disabled }}
                          fontSize="small"
                        />
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            </div>
          </div>
        </div>

        {ingredientsSelectedCount > 0 ? (
          <div
            style={{ marginRight: 50, zIndex: 2 }}
            className="position-relative text-nowrap u-font-semi-small my-1 d-flex flex-wrap"
          >
            <Link
              href={{
                pathname: `${urlPrefix}${pluginUrl}/settings/bulk/ingredients_edit`,
                query: {
                  ...router.query,
                  ids: selectedIngredients,
                },
              }}
              passHref
            >
              <Button variant="outlined" size="small" color="primary">
                Edit
              </Button>
            </Link>
            <Link
              href={{
                pathname: `${urlPrefix}${pluginUrl}/settings/bulk/ingredients_inventory`,
                query: {
                  ids: selectedIngredients,
                },
              }}
              passHref
            >
              <Button
                variant="outlined"
                className="mr-2"
                size="small"
                color="primary"
              >
                Inventory adjustment
              </Button>
            </Link>
            <Button
              className="mr-2"
              variant="outlined"
              size="small"
              style={{
                color: theme.palette.error.main,
                borderColor: theme.palette.error.main,
              }}
              onClick={() => setPopup(true)}
            >
              Remove items
            </Button>
            {isAllIngredientsInTheTableSelected ? (
              <div className="d-flex align-items-center mr-2">
                All raw materials were selected.
              </div>
            ) : (
              <div className="d-flex align-items-center mr-2">
                {englishNumberToPersianNumber(selectedIngredients.length)} until the
                Raw materials were selected.
              </div>
            )}
          </div>
        ) : null}
        <TableContainer
          style={ingredientsSelectedCount > 0 ? { marginTop: -38 } : {}}
        >
          <Table
            size="small"
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow className={isLoading ? "u-pointer-events-none" : ""}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      ingredientsSelectedCount > 0 &&
                      ingredientsSelectedCount < ingredientsRowCount
                    }
                    checked={
                      ingredientsRowCount > 0 &&
                      ingredientsSelectedCount === ingredientsRowCount
                    }
                    onChange={
                      isAllIngredientsInTheTableSelected
                        ? unselectAllIngredients
                        : selectAllIngredients
                    }
                    inputProps={{ "aria-label": "select all" }}
                  />
                </TableCell>
                {headCells.map((headCell) => {
                  if (!matches || !headCell.responsive)
                    return (
                      <TableCell
                        style={{
                          minWidth: headCell.minWidth,
                          width: headCell.width,
                          visibility:
                            ingredientsSelectedCount > 0 ? "hidden" : "visible",
                        }}
                        className="text-nowrap u-fontWeightBold p-2"
                        key={headCell.id}
                        align={headCell.align}
                        color="text.primary"
                      >
                        {headCell.label}
                      </TableCell>
                    );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredientsRows?.map((ingredient) => {
                const { id, title, resource: resource_id } = ingredient;
                const isMock = !Boolean(id);
                const isIngredientSelected =
                  isIngredientSelectedByResourceId(resource_id);
                const labelId = `enhanced-table-checkbox-${id}`;
                return (
                  <TableRow
                    className={isLoading ? "u-pointer-events-none" : ""}
                    hover
                    role="checkbox"
                    aria-checked={isIngredientSelected}
                    tabIndex={-1}
                    key={resource_id}
                    selected={isIngredientSelected}
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(event) => onIngredientClick(event, resource_id)}
                    >
                      <Checkbox
                        color="primary"
                        checked={isIngredientSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <Link
                      passHref
                      href={`${urlPrefix}${pluginUrl}/settings/ingredients/${resource_id}`}
                    >
                      <TableCell
                        component="a"
                        align="right"
                        className="px-2 py-4"
                      >
                        {isMock ? (
                          <Skeleton animation="wave" width={120} height={20} />
                        ) : (
                          title
                        )}
                      </TableCell>
                    </Link>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={!matches ? "Rows count per page" : ""}
          labelDisplayedRows={({ from, to, count }) =>
            `${englishNumberToPersianNumber(
              from
            )} - ${englishNumberToPersianNumber(to)} From${
              count !== -1
                ? englishNumberToPersianNumber(count)
                : `more than${englishNumberToPersianNumber(to)}`
            }`
          }
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pagination.count}
          rowsPerPage={pageSize}
          page={page - 1}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            renderValue: () => englishNumberToPersianNumber(pageSize),
            IconComponent: ArrowDropDownRoundedIcon,
          }}
          ActionsComponent={({ count, page, rowsPerPage, onChangePage }) => (
            <div className="">
              <IconButton
                onClick={(event) => {
                  onChangePage(event, page - 1);
                }}
                disabled={page === 0}
                aria-label="previous page"
              >
                <KeyboardArrowRight />
              </IconButton>
              <IconButton
                onClick={(event) => {
                  onChangePage(event, page + 1);
                }}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
              >
                <KeyboardArrowLeft />
              </IconButton>
            </div>
          )}
        />
      </Paper>
      <PopUp
        closeText="Cancel"
        open={popup}
        submitText="Delete"
        text="Are you sure you want to delete the initial selected stations?"
        onClose={() => setPopup(false)}
        onSubmit={deleteSelectedIngredients}
      />
    </div>
  );
}

export default memo(IngredientList);
