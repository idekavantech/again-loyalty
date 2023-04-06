/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { memo, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import moment from "moment-jalaali";
moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { pollution, text } from "@saas/utils/colors";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { makeSelectBusinessId } from "@saas/stores/business/selector";
import { unitsDictionary } from "store/constants";
import {
  createIngredientsRecountingReport,
  getIngredients,
} from "store/actions";
import { makeSelectIngredients } from "store/selectors";

const headCells = [
  {
    id: "id",
    label: "Row",
    align: "center",
  },
  {
    id: "id",
    label: "ID of the product",
    align: "center",
  },
  {
    id: "id",
    label: "Product Name",
    align: "center",
  },
  {
    id: "id",
    label: "Available in the system",
    align: "center",
  },
  {
    id: "id",
    label: "Count",
    align: "center",
  },
];

export function AdminIngredientsStorageCountingReport({
  isLoading,
  _getIngredients,
  branchIngredients,
  _createIngredientsRecountingReport,
  business_id,
}) {
  const descriptionRef = useRef(null);
  const [description, setDescription] = useState("");
  const [isSetNullInputToZero, setNullInputToZero] = useState(false);
  const [ingredientCountedValue, setIngredientCountedValue] = useState({});
  const [recounted_items, recount_items] = useState({});
  useEffect(() => {
    setTimeout(() => {
      _getIngredients({
        paginated: false,
        ordering: "sku",
      });
    }, 0);
  }, []);
  useEffect(() => {
    if (branchIngredients) {
      let newObj = {};
      branchIngredients?.forEach(
        (branchIngredient) => (newObj[branchIngredient.id] = null)
      );
      setIngredientCountedValue(newObj);
    }
  }, [branchIngredients]);
  useEffect(() => {
    if (isSetNullInputToZero) {
      let newObj = { ...ingredientCountedValue };
      branchIngredients?.forEach((branchIngredient) => {
        if (
          newObj[branchIngredient.id] === null ||
          newObj[branchIngredient.id] === ""
        ) {
          newObj[branchIngredient.id] = 0;
        }
      });
      setIngredientCountedValue(newObj);
    }
  }, [isSetNullInputToZero]);
  useEffect(() => {
    recount_items(
      Object?.entries(ingredientCountedValue)
        ?.map(([key, value]) => ({
          item_id: +key,
          amount: typeof value === "string" ? +value : value,
        }))
        ?.filter((item) => typeof item.amount === "number")
    );
  }, [ingredientCountedValue]);
  return (
    <div className="container">
      <Head>
        <title>Request for Material Inventory Count</title>
      </Head>

      <AdminBreadCrumb
        submitButtonText="Receive a warehouse result"
        submitAction={() =>
          _createIngredientsRecountingReport({
            description,
            recounted_items,
            business_id,
          })
        }
      />

      <Paper elevation={2} className="d-flex flex-column mt-4">
        <div className="d-flex align-items-center">
          <div
            style={{ backgroundColor: "#F0F0F0", minWidth: 170 }}
            className="u-fontMedium py-2 px-3"
          >
            Note
          </div>
          <input
            className="d-flex py-2 px-3"
            style={{ flexGrow: 1 }}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            ref={descriptionRef}
            placeholder="Add note"
          />
        </div>
      </Paper>
      <Paper
        elevation={2}
        className="d-flex align-items-center p-3 mt-4"
        style={{ color: text.critical }}
      >
        Only the material inventory will change that you have entered.
      </Paper>
      <Paper className="mt-4 d-flex flex-column">
        <TableContainer className="purchase-by-order-table">
          <Table
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <TableHead style={{ backgroundColor: "#F1F2F3", height: 50 }}>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    padding={headCell.padding || "unset"}
                    width={headCell.width || ""}
                    className="text-nowrap u-fontWeightBold"
                    key={headCell.id}
                    align={headCell.align}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableBody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <TableRow style={{ height: 53 }} key={item}>
                    {headCells.map((cell) => (
                      <TableCell key={cell.id}>
                        <Skeleton
                          style={{
                            transform: "scale(1)",
                            width: "100%",
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {branchIngredients?.map((branchIngredient, index) => {
                  return (
                    <TableRow key={branchIngredient.sku}>
                      <TableCell align="center">
                        {englishNumberToPersianNumber(index + 1)}
                      </TableCell>
                      <TableCell align="center">
                        {englishNumberToPersianNumber(branchIngredient.sku)}
                      </TableCell>
                      <TableCell align="center">
                        {branchIngredient.title}
                      </TableCell>
                      <TableCell align="center">
                        {englishNumberToPersianNumber(
                          branchIngredient.inventory_count
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <div
                          className="d-flex align-items-center justify-content-between"
                          style={{ color: pollution }}
                        >
                          <div>
                            <input
                              value={englishNumberToPersianNumber(
                                ingredientCountedValue?.[branchIngredient.id],
                                ""
                              )}
                              onChange={(event) =>
                                setIngredientCountedValue({
                                  ...ingredientCountedValue,
                                  [branchIngredient.id]: persianToEnglishNumber(
                                    event.target.value
                                  ),
                                })
                              }
                              placeholder="enter"
                            />
                          </div>
                          <div>{unitsDictionary[branchIngredient?.unit]}</div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <div className="py-3">
          <FormControlLabel
            control={
              <Checkbox
                checked={isSetNullInputToZero}
                onChange={(event) => setNullInputToZero(event.target.checked)}
                color="primary"
              />
            }
            label="The values in which the numer is not entered should be considered zero."
          />
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  branchIngredients: makeSelectIngredients(),
  business_id: makeSelectBusinessId(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getIngredients: (data) => dispatch(getIngredients(data)),
    _createIngredientsRecountingReport: (data) =>
      dispatch(createIngredientsRecountingReport(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(AdminIngredientsStorageCountingReport);
