import React, { memo } from "react";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import { dust, graphite } from "@saas/utils/colors";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import TableHead from "@material-ui/core/TableHead";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { getMonthName } from "@saas/utils/helpers/getMonthName";

import { inventoryAdjustmentReasons } from "@saas/stores/plugins/constants";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import moment from "moment-jalaali";
import { useIngredientInventoryHistory } from "./useIngredientInventoryHistory";

function IngredientInventoryHistory({ isOpen, onClose, ingredient, isSuper }) {
  const {
    ingredientReport,
    selectedBranches,
    selectedReasons,
    branches,
    loading,
    renderSelectedAdjustmentReason,
    selectAdjustmentReason,
    selectAllAdjustmentReason,
    selectBranches,
    selectAllBranches,
    renderSelectedBranches,
  } = useIngredientInventoryHistory({ ingredient, isOpen });

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isBig
      header={<ModalHeader onRightClick={onClose} title="Warehouse History" />}
      body={
        <div className="p-4">
          <div className="d-flex mb-4">
            {isSuper ? (
              <Select
                className="ml-2"
                style={{ minWidth: 150 }}
                value={selectedBranches}
                multiple
                margin="dense"
                variant="outlined"
                displayEmpty
                renderValue={renderSelectedBranches}
                MenuProps={{
                  getContentAnchorEl: null,
                  style: { maxHeight: 500 },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  variant: "menu",
                }}
              >
                <MenuItem>
                  <Checkbox
                    indeterminate={
                      selectedBranches.length !== branches.length &&
                      selectedBranches.length
                    }
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onClick={selectAllBranches}
                    color="primary"
                    checked={selectedBranches.length === branches.length}
                  />
                  <ListItemText
                    primary="Choosing all branches"
                    className="text-right"
                  />
                </MenuItem>
                {branches.map((branch) => (
                  <MenuItem key={branch.id} value={branch.id}>
                    <Checkbox
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      onClick={(e) => selectBranches(e, branch)}
                      color="primary"
                      checked={selectedBranches.includes(branch.id)}
                    />
                    <ListItemText
                      primary={branch.title}
                      className="text-right"
                    />
                  </MenuItem>
                ))}
              </Select>
            ) : null}
            <Select
              style={{ minWidth: 150 }}
              className="ml-2"
              value={selectedReasons}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              renderValue={renderSelectedAdjustmentReason}
              MenuProps={{
                getContentAnchorEl: null,
                style: { maxHeight: 500 },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                variant: "menu",
              }}
            >
              <MenuItem>
                <Checkbox
                  indeterminate={
                    selectedReasons.length !==
                      inventoryAdjustmentReasons.length &&
                    selectedReasons.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={selectAllAdjustmentReason}
                  color="primary"
                  checked={
                    selectedReasons.length === inventoryAdjustmentReasons.length
                  }
                />
                <ListItemText
                  primary="Choose all reasons"
                  className="text-right"
                />
              </MenuItem>
              {inventoryAdjustmentReasons.map((reason) => (
                <MenuItem key={reason.keyword} value={reason.keyword}>
                  <Checkbox
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onClick={(e) => selectAdjustmentReason(e, reason)}
                    color="primary"
                    checked={selectedReasons.includes(reason.keyword)}
                  />
                  <ListItemText primary={reason.text} className="text-right" />
                </MenuItem>
              ))}
            </Select>
          </div>
          {!loading && ingredientReport ? (
            <TableContainer className="mb-4">
              <Table size="small">
                <TableHead>
                  <TableRow style={{ borderBottom: `1px solid ${graphite}` }}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="right"
                      className="py-2 u-fontWeightBold"
                    >
                      Time
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="right"
                      className="py-2 u-fontWeightBold"
                    >
                      Changes
                    </TableCell>
                    {ingredient.ingredients ? (
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        className="py-2 u-fontWeightBold"
                      >
                        Branch
                      </TableCell>
                    ) : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredientReport.map((row) => {
                    const date = new Date(row.timestamp);
                    const timestamp = moment(row.timestamp);
                    return (
                      <TableRow
                        style={{ borderBottom: `1px solid ${dust}` }}
                        key={`${row.slug}-${selectedBranches[row.slug]}`}
                      >
                        <TableCell
                          className="py-3"
                          align="right"
                          component="th"
                          scope="row"
                        >
                          {englishNumberToPersianNumber(
                            `${timestamp.jDate()} ${getMonthName(
                              timestamp.jMonth() + 1
                            )} ${timestamp.jYear()} - ${`0${date.getHours()}`.slice(
                              -2
                            )}:${`0${date.getMinutes()}`.slice(-2)}`
                          )}
                        </TableCell>
                        <TableCell
                          className="py-3"
                          component="th"
                          scope="row"
                          align="right"
                        >
                          {englishNumberToPersianNumber(
                            row.new_state.inventory_count -
                              row.old_state.inventory_count
                          )}{" "}
                          {
                            inventoryAdjustmentReasons.find(
                              (r) => r.keyword === row.reason_string
                            )?.text
                          }
                        </TableCell>
                        {ingredient.ingredients ? (
                          <TableCell
                            className="py-3"
                            align="right"
                            component="th"
                            scope="row"
                          >
                            {row.business_title}
                          </TableCell>
                        ) : null}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <LoadingIndicator />
          )}
        </div>
      }
    />
  );
}
const styles = () => ({
  root: {
    "& $notchedOutline": {
      border: "none",
    },
    "&:hover $notchedOutline": {
      border: "none",
    },
    "&$focused $notchedOutline": {
      border: "none",
    },
  },
  focused: {},
  notchedOutline: {},
});

export default memo(withStyles(styles)(IngredientInventoryHistory));
