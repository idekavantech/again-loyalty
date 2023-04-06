import React, { memo, useEffect, useState } from "react";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import { dust, graphite } from "@saas/utils/colors";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { connect } from "react-redux";
import { compose } from "redux";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { getMonthName } from "@saas/utils/helpers/getMonthName";

import { inventoryAdjustmentReasons } from "@saas/stores/plugins/constants";
import { makeSelectBranches } from "@saas/stores/business/selector";
import { makeSelectDealReport } from "store/selectors";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { getProductReport } from "store/actions";
import moment from "moment-jalaali";

function ProductInventoryHistory({
  isOpen,
  onClose,
  branches,
  product,
  loading,
  _getProductReport,
  dealReport,
}) {
  const _getReport = _getProductReport;
  const report = dealReport;
  const variations =
    product.variations && product.variations.variations_table
      ? Object.entries(product.variations.variations_table).map(
          ([key, variation]) => ({
            id: key,
            title: variation.name,
          })
        )
      : [];
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedReasons, setReasons] = useState(
    inventoryAdjustmentReasons.map((reason) => reason.keyword)
  );
  const [selectedVariations, setSelectedVariations] = useState(
    variations.map((variation) => variation.id)
  );
  useEffect(() => {
    if (isOpen) {
      const filters = {};
      if (selectedReasons.length !== inventoryAdjustmentReasons.length) {
        filters.reason = selectedReasons;
        if (!selectedReasons.length) filters.reason = 0;
      }
      if (variations && variations.length !== selectedVariations.length) {
        filters.variation_id = selectedVariations;
        if (!selectedVariations.length) filters.variation_id = "none";
      }
      if (
        product.deals &&
        product.deals.length &&
        product.deals.length !== selectedBranches.length
      ) {
        filters.business_id = selectedBranches;
        if (!selectedBranches.length) filters.business_id = 0;
      }
      _getReport(product.variations[0].id, filters);
    } else _getReport(null);
  }, [isOpen, selectedVariations, selectedBranches, selectedReasons]);
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isBig
      header={<ModalHeader onRightClick={onClose} title="Warehouse History" />}
      body={
        <div className="p-4">
          <div className="d-flex mb-4">
            {product.deals ? (
              <Select
                className="ml-2"
                style={{ minWidth: 150 }}
                value={selectedBranches}
                multiple
                margin="dense"
                variant="outlined"
                displayEmpty
                renderValue={(selected) => {
                  if (selected.length === 0) return "Choose a branch";
                  if (selected.length === 1 && selected[0])
                    return branches.find((branch) => branch.id === selected[0])
                      .title;
                  if (selected.length === branches.length) return "All branches";
                  return `${englishNumberToPersianNumber(
                    selected.length
                  )} Branch`;
                }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      if (selectedBranches.length) setSelectedBranches([]);
                      else
                        setSelectedBranches(
                          branches.map((branch) => branch.id)
                        );
                    }}
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
                      onClick={(e) => {
                        e.preventDefault();
                        if (!selectedBranches.find((id) => id === branch.id))
                          setSelectedBranches([...selectedBranches, branch.id]);
                        else
                          setSelectedBranches(
                            selectedBranches.filter((id) => id !== branch.id)
                          );
                      }}
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
              renderValue={(selected) => {
                if (selected.length === 0) return "Choose the reason";
                if (selected.length === 1 && selected[0])
                  return (
                    inventoryAdjustmentReasons.find(
                      (r) => r.keyword === selected[0]
                    ) || { text: "" }
                  )?.text;
                if (selected.length === inventoryAdjustmentReasons.length)
                  return "All reasons";
                return `${englishNumberToPersianNumber(selected.length)} the reason`;
              }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    if (selectedReasons.length) setReasons([]);
                    else
                      setReasons(
                        inventoryAdjustmentReasons.map(
                          (branch) => branch.keyword
                        )
                      );
                  }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      if (!selectedReasons.find((r) => r === reason.keyword))
                        setReasons([...selectedReasons, reason.keyword]);
                      else
                        setReasons(
                          selectedReasons.filter((id) => id !== reason.keyword)
                        );
                    }}
                    color="primary"
                    checked={selectedReasons.includes(reason.keyword)}
                  />
                  <ListItemText primary={reason?.text} className="text-right" />
                </MenuItem>
              ))}
            </Select>
            {variations.length ? (
              <Select
                className="ml-2"
                style={{ minWidth: 150 }}
                value={selectedVariations}
                multiple
                margin="dense"
                variant="outlined"
                displayEmpty
                renderValue={(selected) => {
                  if (selected.length === 0) return "Choose a variety";
                  if (selected.length === 1 && selected[0])
                    return variations.find(
                      (variation) => variation.id === selected[0]
                    ).title;
                  if (selected.length === variations.length)
                    return "All diversity";
                  return `${englishNumberToPersianNumber(
                    selected.length
                  )} variety`;
                }}
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
                      selectedVariations.length !== variations.length &&
                      selectedVariations.length
                    }
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (selectedVariations.length) setSelectedVariations([]);
                      else
                        setSelectedVariations(
                          variations.map((variation) => variation.id)
                        );
                    }}
                    color="primary"
                    checked={selectedVariations.length === variations.length}
                  />
                  <ListItemText
                    primary="Choosing all diversity"
                    className="text-right"
                  />
                </MenuItem>
                {variations.map((variation) => (
                  <MenuItem key={variation.id} value={variation.id}>
                    <Checkbox
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          !selectedVariations.find((id) => id === variation.id)
                        )
                          setSelectedVariations([
                            ...selectedVariations,
                            variation.id,
                          ]);
                        else
                          setSelectedVariations(
                            selectedVariations.filter(
                              (id) => id !== variation.id
                            )
                          );
                      }}
                      color="primary"
                      checked={selectedVariations.includes(variation.id)}
                    />
                    <ListItemText
                      primary={variation.title}
                      className="text-right"
                    />
                  </MenuItem>
                ))}
              </Select>
            ) : null}
          </div>
          {!loading && report ? (
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
                    {variations.length ? (
                      <TableCell
                        component="th"
                        scope="row"
                        align="right"
                        className="py-2 u-fontWeightBold"
                      >
                        variety
                      </TableCell>
                    ) : null}
                    <TableCell
                      component="th"
                      scope="row"
                      align="right"
                      className="py-2 u-fontWeightBold"
                    >
                      Changes
                    </TableCell>
                    {product.deals ? (
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
                  {report.map((row) => {
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
                        {variations.length ? (
                          <TableCell
                            className="py-3"
                            align="right"
                            component="th"
                            scope="row"
                          >
                            {row.variation_name}
                          </TableCell>
                        ) : null}
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
                        {product.deals ? (
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
      // cta={
      //   <Button
      //     color="primary"
      //     disabled={loading}
      //     variant="contained"
      //     onClick={onClose}
      //   >
      //     end
      //   </Button>
      // }
    />
  );
}
const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  branches: makeSelectBranches(),
  dealReport: makeSelectDealReport(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getProductReport: (id, filters) => dispatch(getProductReport(id, filters)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ProductInventoryHistory);
