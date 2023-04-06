import React, { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import { graphite } from "@saas/utils/colors";
import Checkbox from "@material-ui/core/Checkbox";
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
import Input from "@saas/components/Input";
import { bulkUpdateProductsInventory } from "store/actions";

function BranchAvailabilityModal({
  isOpen,
  onClose,
  branches: businessBranches,
  product,
  loading,
  _bulkUpdateProductsInventory,
}) {
  const [search, setSearch] = useState("");
  const branches = businessBranches.filter((b) => b.title.includes(search));
  const [selectedBranches, setSelectedBranches] = useState(
    Object.fromEntries(
      product.deals.map((deal) => [deal.business_slug, Boolean(deal.is_active)])
    )
  );
  const isAllSelected =
    Object.entries(selectedBranches).filter(
      ([slug, isActive]) =>
        branches.find((branch) => branch.slug === slug) && isActive === true
    ).length === branches.length;
  const isNoneSelected =
    Object.entries(selectedBranches).filter(
      ([slug, isActive]) =>
        branches.find((branch) => branch.slug === slug) && isActive === true
    ).length === 0;
  useEffect(() => {
    setSelectedBranches(
      Object.fromEntries(
        product.deals.map((deal) => [
          deal.business_slug,
          Boolean(deal.is_active),
        ])
      )
    );
  }, [isOpen, product.deals]);
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={onClose} title="Choosing Branches" />}
      body={
        <>
          <TableContainer className="mb-4">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ borderBottom: `1px solid ${graphite}` }}
                    padding="checkbox"
                  >
                    <Checkbox
                      indeterminate={!isAllSelected && !isNoneSelected}
                      checked={isAllSelected}
                      onClick={() => {
                        setSelectedBranches({
                          selectedBranches,
                          ...Object.fromEntries(
                            branches.map((branch) => [
                              branch.slug,
                              isNoneSelected,
                            ])
                          ),
                        });
                      }}
                      color="primary"
                    />
                  </TableCell>

                  <TableCell
                    style={{ borderBottom: `1px solid ${graphite}` }}
                    component="th"
                    scope="row"
                    align="right"
                    className="py-2 u-fontWeightBold"
                  >
                    <Input
                      tableInput
                      style={{ border: "none" }}
                      fullWidth
                      margin="dense"
                      placeholder="Branch Search"
                      onChange={setSearch}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {branches.map((row) => (
                  <TableRow
                    key={`${row.slug}-${selectedBranches[row.slug]}`}
                    hover
                    className="u-cursor-pointer"
                    onClick={() => {
                      setSelectedBranches({
                        ...selectedBranches,
                        [row.slug]: !selectedBranches[row.slug],
                      });
                    }}
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell
                      align="right"
                      className="text-nowrap"
                      padding="checkbox"
                    >
                      <Checkbox
                        checked={selectedBranches[row.slug]}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {row.title}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      }
      cta={
        <Button
          color="primary"
          disabled={loading}
          variant="contained"
          className="w-100"
          onClick={() => {
            _bulkUpdateProductsInventory(
              Object.fromEntries(
                product.deals
                  .filter(
                    (deal) =>
                      deal.is_active !== selectedBranches[deal.business_slug]
                  )
                  .map((deal) => [
                    deal.id,
                    [
                      {
                        is_active: !deal.is_active,
                        pos_is_active: !deal.is_active,
                        variation_id: product.variation_id,
                      },
                    ],
                  ])
              ),
              () => {
                onClose();
              }
            );
          }}
        >
          Store
        </Button>
      }
    />
  );
}
const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _bulkUpdateProductsInventory: (data, callback) =>
      dispatch(bulkUpdateProductsInventory(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(BranchAvailabilityModal);
