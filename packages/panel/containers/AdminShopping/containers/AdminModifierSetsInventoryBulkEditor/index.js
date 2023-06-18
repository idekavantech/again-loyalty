import React, { memo } from "react";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { dust, jungleII, smoke, strawberryII } from "@saas/utils/colors";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";

import Button from "@material-ui/core/Button";
import LocationSelector from "components/LocationSelector";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { alterInventoryOptions } from "@saas/stores/plugins/constants";
import Input from "@saas/components/Input";
import Skeleton from "@material-ui/lab/Skeleton";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";

import { useModifierSetsBulkEditor } from "./useModifierSetsBulkEditor";
import TableNoResultMessage from "../../../../components/TableNoResultMessage";
import { useRouter } from "next/router";

const headCells = [
  {
    id: "name",
    align: "right",
    label: "Additive name",
  },
  {
    id: "previous",
    align: "right",
    label: "Inventory",
  },
  {
    id: "reason",
    align: "right",
    label: "the reason",
  },

  {
    id: "change",
    align: "right",
    label: "Change",
  },
  {
    id: "previous",
    align: "right",
    label: "New creature",
  },
];

function ModifierSetsBulkEditInventory() {
  const {
    isLoading,
    branches,
    pluginUrl,
    adminUrlPrefix,
    modifiersPagination,
    matches,
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
  } = useModifierSetsBulkEditor();

  const router = useRouter();

  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        submitAction={submit}
        isLoading={loading || isLoading}
        submitButtonText="Save changes"
      />
      <Paper elevation={1} className="pb-4 mt-4 overflow-hidden">
        {branches && branches?.length ? (
          <LocationSelector
            value={selectedBranch}
            onChange={setSelectedBranch}
            items={branches?.map((branch) => ({
              title: branch?.title,
              value: branch?.slug,
            }))}
          />
        ) : null}
        {!!_modifierSets?.length ? (
          <>
            <TableContainer className="mt-4 u-overflow-y-hidden">
              <Table
                className="h-100"
                aria-labelledby="tableTitle"
                size="small"
                aria-label="enhanced table"
              >
                <TableHead>
                  <TableRow
                    style={{ borderBottom: `1px solid ${dust}` }}
                    className={isLoading ? "u-pointer-events-none" : ""}
                  >
                    {headCells?.map((headCell) => (
                      <TableCell
                        style={{
                          minWidth: headCell?.minWidth,
                          width: headCell?.width,
                        }}
                        className="text-nowrap u-fontWeightBold"
                        key={headCell?.id}
                        align={headCell?.align}
                        color="text.primary"
                      >
                        {headCell?.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {_modifierSets?.map((modifierSet, modifierSetIndex) => {
                    const { title: modifierSetTitle } = modifierSet;
                    const originalModifierSet = modifierSets?.find(
                      (_modifierSet) => _modifierSet?.id === modifierSet?.id
                    );
                    return modifierSet?.variations
                      ? modifierSet?.variations.map(
                          (modifier, modifierIndex) => {
                            const isMock = !modifier?.id;
                            const { reason = "2", amount } = modifier;
                            const inventoryCount = modifier?.available
                              ? parseFloat(modifier.inventory_count)
                              : "—";
                            const originalModifier =
                              originalModifierSet?.variations?.find(
                                (_modifier) => _modifier.id === modifier.id
                              );
                            return (
                              <>
                                {modifierIndex === 0 ? (
                                  <TableRow
                                    className={
                                      isLoading
                                        ? "u-pointer-events-none h-100 w-100"
                                        : "h-100 w-100"
                                    }
                                    hover
                                    style={{
                                      borderBottom: `1px solid ${dust}`,
                                      backgroundColor: dust,
                                    }}
                                  >
                                    <TableCell
                                      align="right"
                                      className="text-nowrap u-text-ellipse p-4"
                                    >
                                      {modifierSetTitle}
                                    </TableCell>
                                    <TableCell className="text-nowrap u-text-ellipse p-4"></TableCell>
                                    <TableCell className="text-nowrap u-text-ellipse p-4"></TableCell>
                                    <TableCell className="text-nowrap u-text-ellipse p-4"></TableCell>
                                    <TableCell className="text-nowrap u-text-ellipse p-4"></TableCell>
                                  </TableRow>
                                ) : null}
                                <TableRow
                                  className={
                                    isLoading
                                      ? "u-pointer-events-none h-100"
                                      : "h-100"
                                  }
                                  hover
                                  style={{ borderBottom: `1px solid ${smoke}` }}
                                >
                                  <TableCell
                                    style={
                                      isMock
                                        ? {
                                            width: "99%",
                                            maxWidth: 280,
                                            borderLeft: `1px solid ${dust}`,
                                          }
                                        : {
                                            width: "99%",
                                            borderLeft: `1px solid ${dust}`,
                                            maxWidth: 280,
                                            paddingRight: 70,
                                          }
                                    }
                                    align="right"
                                    className="text-nowrap u-text-ellipse p-0"
                                  >
                                    {isMock ? (
                                      <div className="d-flex align-items-center p-2">
                                        <Skeleton
                                          style={{
                                            width: 36,
                                            height: 36,
                                            transform: "none",
                                          }}
                                          className="ml-2"
                                        />
                                        <Skeleton style={{ width: 115 }} />
                                      </div>
                                    ) : (
                                      <div>
                                        <div
                                          className="d-flex align-items-center p-2"
                                          style={{
                                            borderBottom: `1px solid ${dust}`,
                                          }}
                                        >
                                          {modifier.title}
                                        </div>
                                        <div>
                                          <div
                                            style={{
                                              borderBottom: `1px solid ${dust}`,
                                            }}
                                            className="d-flex align-items-center"
                                          >
                                            <div
                                              className="d-flex flex-1 align-items-center p-2"
                                              style={{
                                                borderLeft: `1px solid ${dust}`,
                                              }}
                                            >
                                              <Switch
                                                color="primary"
                                                size="small"
                                                onChange={(e) =>
                                                  onModifierIsActiveChange(
                                                    e.target.checked,
                                                    modifierSetIndex,
                                                    modifierIndex,
                                                    modifier
                                                  )
                                                }
                                                checked={modifier.is_active}
                                              />
                                              <div className="mr-2">
                                                {modifier.is_active
                                                  ? "active"
                                                  : "Inactive"}
                                              </div>
                                            </div>
                                          </div>

                                          <div className="d-flex align-items-center">
                                            <div className="d-flex flex-1 align-items-center p-2">
                                              <Switch
                                                color="primary"
                                                size="small"
                                                onChange={(e) =>
                                                  onModifierKeepSellingChange(
                                                    e.target.checked,
                                                    modifierSetIndex,
                                                    modifierIndex,
                                                    modifier
                                                  )
                                                }
                                                checked={modifier.keep_selling}
                                              />
                                              <div className="mr-2">
                                                Sale after the inventory is completed
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="d-flex align-items-center"
                                            style={{
                                              borderTop: `1px solid ${dust}`,
                                            }}
                                          >
                                            <div className="d-flex flex-1 align-items-center p-2">
                                              <div
                                                className="mr-2"
                                                style={{ fontWeight: "bold" }}
                                              >
                                                {originalModifier?.available ? (
                                                  <span
                                                    style={{ color: jungleII }}
                                                  >
                                                    Available
                                                  </span>
                                                ) : (
                                                  <span
                                                    style={{
                                                      color: strawberryII,
                                                    }}
                                                  >
                                                    unavailable
                                                  </span>
                                                )}{" "}
                                                {originalModifier?.available !==
                                                isModifierAvailable(
                                                  modifier
                                                ) ? (
                                                  <span>
                                                    (After storing changes,
                                                    <span className="mx-1">
                                                      {isModifierAvailable(
                                                        modifier
                                                      ) ? (
                                                        <span
                                                          style={{
                                                            color: jungleII,
                                                          }}
                                                        >
                                                          Available
                                                        </span>
                                                      ) : (
                                                        <span
                                                          style={{
                                                            color: strawberryII,
                                                          }}
                                                        >
                                                          unavailable
                                                        </span>
                                                      )}
                                                    </span>
                                                    It becomes.)
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      borderLeft: `1px solid ${dust}`,
                                      backgroundImage:
                                        "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                                      backgroundColor: dust,
                                    }}
                                  >
                                    {isMock ? (
                                      <div className="d-flex align-items-center p-2">
                                        <Skeleton className="w-100" />
                                      </div>
                                    ) : (
                                      <div className="u-text-ellipse d-flex align-items-center direction-ltr justify-content-end">
                                        {englishNumberToPersianNumber(
                                          inventoryCount
                                        )}
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell
                                    className="p-0"
                                    style={{ borderLeft: `1px solid ${dust}` }}
                                  >
                                    {isMock ? (
                                      <div className="d-flex align-items-center p-2">
                                        <Skeleton style={{ width: 120 }} />
                                      </div>
                                    ) : (
                                      <div className="u-text-ellipse">
                                        <FormControl
                                          className="my-0 d-flex flex-1 px-0"
                                          margin="dense"
                                          variant="outlined"
                                          size="small"
                                          outline="none"
                                        >
                                          <Select
                                            style={{ border: "none" }}
                                            value={reason}
                                            onChange={(reasonId) =>
                                              onModifierAdjustmentReasonChange(
                                                reasonId,
                                                modifierSetIndex,
                                                modifierIndex,
                                                modifier
                                              )
                                            }
                                            inputProps={{
                                              style: { border: "none" },
                                              outline: "none",
                                            }}
                                            displayEmpty
                                            input={
                                              <Input
                                                tableInput
                                                className="pl-2 pr-0 text-right"
                                              />
                                            }
                                          >
                                            <MenuItem value="" disabled>
                                              Choose the reason
                                            </MenuItem>
                                            {Object.entries(
                                              alterInventoryOptions
                                            ).map(([key, option]) => (
                                              <MenuItem key={key} value={key}>
                                                {option.text}
                                              </MenuItem>
                                            ))}
                                          </Select>
                                        </FormControl>
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell
                                    className="h-100 p-0"
                                    style={{
                                      verticalAlign: isMock ? "middle" : "top",
                                      borderLeft: `1px solid ${dust}`,
                                    }}
                                  >
                                    {isMock ? (
                                      <div className="d-flex align-items-center p-2">
                                        <Skeleton className="w-100" />
                                      </div>
                                    ) : (
                                      <div className="h-100 u-text-ellipse d-inline-block">
                                        <Input
                                          margin="dense"
                                          className="h-100 px-3"
                                          style={
                                            reason
                                              ? {}
                                              : {
                                                  backgroundImage:
                                                    "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                                                  backgroundColor: dust,
                                                }
                                          }
                                          inputProps={{ className: "px-0" }}
                                          value={englishNumberToPersianNumber(
                                            amount,
                                            ""
                                          )}
                                          tableInput
                                          selectOnFocus
                                          disabled={!reason}
                                          isFloat
                                          onChange={(amount) =>
                                            onModifierAdjustmentAmountChange(
                                              amount,
                                              modifierSetIndex,
                                              modifierIndex,
                                              modifier
                                            )
                                          }
                                        />
                                      </div>
                                    )}
                                  </TableCell>
                                  <TableCell
                                    className="p-0"
                                    style={{ borderLeft: `1px solid ${dust}` }}
                                  >
                                    {isMock ? (
                                      <div className="d-flex align-items-center p-2">
                                        <Skeleton className="w-100" />
                                      </div>
                                    ) : (
                                      <div className="u-text-ellipse">
                                        <div className="d-flex flex-1 align-items-center direction-ltr justify-content-end px-3">
                                          {!reason ||
                                          !amount ||
                                          (reason &&
                                            amount &&
                                            alterInventoryOptions[reason]
                                              .action !== "set")
                                            ? englishNumberToPersianNumber(
                                                inventoryCount
                                              )
                                            : ""}
                                          {reason &&
                                          amount &&
                                          alterInventoryOptions[reason]
                                            .action === "set"
                                            ? englishNumberToPersianNumber(
                                                amount
                                              )
                                            : ""}
                                          {reason &&
                                          amount &&
                                          alterInventoryOptions[reason]
                                            .action === "plus"
                                            ? " + "
                                            : ""}
                                          {reason &&
                                          amount &&
                                          alterInventoryOptions[reason]
                                            .action === "minus"
                                            ? " - "
                                            : ""}

                                          {reason &&
                                          amount &&
                                          (alterInventoryOptions[reason]
                                            .action === "plus" ||
                                            alterInventoryOptions[reason]
                                              .action === "minus")
                                            ? englishNumberToPersianNumber(
                                                amount
                                              )
                                            : ""}

                                          {reason &&
                                          amount &&
                                          (alterInventoryOptions[reason]
                                            .action === "plus" ||
                                            alterInventoryOptions[reason]
                                              .action === "minus")
                                            ? " = "
                                            : ""}

                                          {reason &&
                                          amount &&
                                          alterInventoryOptions[reason]
                                            .action === "plus"
                                            ? englishNumberToPersianNumber(
                                                inventoryCount +
                                                  parseInt(amount)
                                              )
                                            : ""}
                                          {reason &&
                                          amount &&
                                          alterInventoryOptions[reason]
                                            .action === "minus"
                                            ? englishNumberToPersianNumber(
                                                inventoryCount - amount
                                              )
                                            : ""}
                                        </div>
                                      </div>
                                    )}
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          }
                        )
                      : null;
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
              count={modifiersPagination.count}
              rowsPerPage={pageSize}
              page={page - 1}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
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
        ) : (
          <TableNoResultMessage
            title={"You have no additives"}
            description={
              "Use the new additive set button to build additive"
            }
            buttonText={"New additive set"}
            submitAction={() =>
              router.push(
                `${adminUrlPrefix}${pluginUrl}/settings/modifier_sets/new`
              )
            }
          />
        )}
      </Paper>
      <Button
        color="primary"
        className="mt-3"
        variant="contained"
        disabled={loading || isLoading}
        onClick={submit}
      >
        Save changes
      </Button>
    </div>
  );
}

export default memo(ModifierSetsBulkEditInventory);
