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
import Skeleton from "@material-ui/lab/Skeleton";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Input from "@saas/components/Input";
import Link from "next/link";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import PopUp from "@saas/components/PopUp";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { useModifierSetList } from "./useModifierSetList";
import AssignToModifierSetModal from "../../../AdminModals/AssignToModifierSetModal";
import TableNoResultMessage from "../../../../components/TableNoResultMessage";
import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";

const headCells = [
  {
    id: "title",
    align: "right",
    label: "Collection Name",
  },
  {
    id: "modifiers",
    align: "right",
    label: "Additives",
  },
  {
    id: "button",
    align: "right",
    label: "",
  },
];

export function AdminModifierSetList({
  isSuper = false,
  plugin = SHOPPING_PLUGIN,
}) {
  const {
    selectedModifierSets,
    modifierSetsPagination,
    pluginUrl,
    isMobile,
    search,
    bulkDeleteConfirmationPopup,
    setBulkDeleteConfirmationPopup,
    router,
    page,
    pageSize,
    theme,
    modifierSetsRowsCount,
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
    isLoading,
    modifierSetsRows,
    onOpenModal,
    onCloseModal,
    onSelectResource,
    onSubmit,
    setTabValue,
    tabValue,
  } = useModifierSetList({ isSuper, plugin });

  const hasQueryParamInURL = !!window.location.search;

  return (
    <div className="container pb-3">
      <AssignToModifierSetModal
        isOpen={modal.show}
        onClose={onCloseModal}
        onSubmit={onSubmit}
        allProducts={adminDeals}
        title={modal.modifierTitle}
        isLoading={isLoading}
        selectedResources={selectedResources}
        onSelectResource={onSelectResource}
        setTabValue={setTabValue}
        tabValue={tabValue}
      />
      <AdminBreadCrumb
        title="Additive sets"
        submitAction={() =>
          router.push(
            `${adminUrlPrefix}${pluginUrl}/settings/modifier_sets/new`
          )
        }
        helpVideo={{
          url: ADMIN_HELP_VIDEOS.modifierSets.url,
        }}
        submitButtonHasPlus
        responsive={false}
        submitButtonText="New additive set"
      />
      <Paper elevation={1} className="py-3 mt-3">
        <div className="d-flex pb-3 px-3 align-items-center">
          <div className={`d-flex ${isMobile ? "flex-1" : ""}`}>
            <div className="w-100">
              <Input
                size="small"
                style={{
                  width: !isMobile ? 188 : "100%",
                }}
                value={search}
                onChange={searchModifierSets}
                className="ml-2"
                placeholder="Search additive collection"
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
                          onClick={clearModifierSetsSearch}
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
        {modifierSetsRows.length ? (
          <>
            {" "}
            <TableContainer>
              <Table
                size="small"
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
              >
                <TableHead>
                  <TableRow
                    className={isLoading ? "u-pointer-events-none" : ""}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={
                          selectedModifierSets.length > 0 &&
                          selectedModifierSets.length < modifierSetsRowsCount
                        }
                        checked={
                          modifierSetsRowsCount > 0 &&
                          selectedModifierSets.length === modifierSetsRowsCount
                        }
                        onChange={selectAllModifierSets}
                        inputProps={{ "aria-label": "select all" }}
                      />
                    </TableCell>
                    {selectedModifierSets.length > 0 ? (
                      <Button
                        className="text-nowrap u-font-semi-small my-1"
                        variant="outlined"
                        size="small"
                        style={{
                          color: theme.palette.error.main,
                          borderColor: theme.palette.error.main,
                        }}
                        onClick={() => setBulkDeleteConfirmationPopup(true)}
                      >
                        Remove items
                      </Button>
                    ) : (
                      headCells.map((headCell) => (
                        <TableCell
                          className="text-nowrap p-2"
                          style={{ fontWeight: 600 }}
                          key={headCell.id}
                          align={headCell.align}
                        >
                          {headCell.label}
                        </TableCell>
                      ))
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modifierSetsRows?.map((modifierSet, index) => {
                    const {
                      id,
                      title,
                      variations: modifiers = [],
                    } = modifierSet;
                    const isMock = !id;
                    const isItemSelected = isModifierSetSelected(id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        className={isLoading ? "u-pointer-events-none" : ""}
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={id}
                        selected={isItemSelected}
                      >
                        <TableCell
                          padding="checkbox"
                          onClick={(event) => onModifierSetRowClick(event, id)}
                        >
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component={Link}
                          align="right"
                          className="py-4 px-2"
                          href={`${adminUrlPrefix}${pluginUrl}/settings/modifier_sets/${id}`}
                        >
                          {isMock ? (
                            <Skeleton
                              animation="wave"
                              width={120}
                              height={20}
                            />
                          ) : (
                            title
                          )}
                        </TableCell>
                        <TableCell
                          component={Link}
                          align="right"
                          className="py-4 px-2"
                          href={`${adminUrlPrefix}${pluginUrl}/settings/modifier_sets/${id}`}
                        >
                          {isMock ? (
                            <Skeleton
                              animation="wave"
                              width={120}
                              height={20}
                            />
                          ) : (
                            Object.values(modifiers).reduce(
                              (a, modifier) =>
                                `${a}${a ? "،" : ""}${modifier.title}`,
                              ""
                            )
                          )}
                        </TableCell>
                        <TableCell
                          onClick={() =>
                            onOpenModal(modifierSet.id, modifierSet.title)
                          }
                          scope="row"
                          align="right"
                          className="d-flex p-4 u-cursor-pointer flex-row-reverse align-items-center justify-content-between"
                        >
                          {isMock ? (
                            <Skeleton
                              animation="wave"
                              width="100%"
                              height={20}
                            />
                          ) : (
                            <Button
                              color="primary"
                              style={{ direction: "ltr" }}
                            >
                              Applying on products
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage={!isMobile ? "Rows count per page" : ""}
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
              count={modifierSetsPagination?.count || 0}
              rowsPerPage={pageSize}
              page={page - 1}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
              SelectProps={{
                renderValue: () => englishNumberToPersianNumber(pageSize),
                IconComponent: ArrowDropDownRoundedIcon,
              }}
              ActionsComponent={({
                count,
                page,
                rowsPerPage,
                onChangePage,
              }) => (
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
            />{" "}
          </>
        ) : hasQueryParamInURL ? (
          <TableNoResultMessage
            title={"The additive was not found to be found in your search.!"}
          />
        ) : (
          <TableNoResultMessage
            title={"You have no additives"}
            description={
              "Use the new additive set button to build additive"
            }
          />
        )}
      </Paper>
      <PopUp
        closeText="Cancel"
        open={bulkDeleteConfirmationPopup}
        submitText="Delete"
        text="Are you sure you want to delete the selected additive sets?"
        onClose={() => setBulkDeleteConfirmationPopup(false)}
        onSubmit={confirmDeleteModifierSets}
      />
    </div>
  );
}

export default memo(AdminModifierSetList);
