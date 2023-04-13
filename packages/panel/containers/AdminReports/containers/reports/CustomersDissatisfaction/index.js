import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

import MaterialSelect from "@saas/components/Select/MaterialSelect";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectBranches } from "@saas/stores/business/selector";
import Chip from "@material-ui/core/Chip";
import EmptyStateForTableReports from "../components/EmptyStateForTableReports";
import {
  BEST_BRANCH_BY_DELIVERER,
  BEST_BRANCH_BY_FOOD,
  BEST_BRANCH_BY_IS_DISSATISFIED,
  BEST_BRANCH_BY_PACKAGING,
  BEST_BRANCH_BY_TIME,
  BEST_BRANCH_BY_WEBSITE,
  WORST_BRANCH_BY_DELIVERER,
  WORST_BRANCH_BY_FOOD,
  WORST_BRANCH_BY_IS_DISSATISFIED,
  WORST_BRANCH_BY_PACKAGING,
  WORST_BRANCH_BY_TIME,
  WORST_BRANCH_BY_WEBSITE,
} from "../constants";
import { getCustomersDisSatisfactionReviewsReports } from "store/actions";
import { makeSelectCustomersDisSatisfactionReviewsReports } from "store/selectors";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";

 
 

const DELIVERER = "deliverer";
const TIME = "time";
const WEBSITE = "website";
const PACKAGING = "packaging";
const FOOD = "food";
const IS_DISSATISFIED = "is_dissatisfied";

const reasons = {
  [DELIVERER]: "Peak collision",
  [TIME]: "The order of delivery of the order",
  [WEBSITE]: "Ease of order registration",
  [PACKAGING]: "Packaging quality",
  [FOOD]: "The quality of the order item",
  [IS_DISSATISFIED]: "General satisfaction",
};

const sortingOptions = [
  {
    id: 0,
    text: "The best in terms of peak collision",
    keyword: BEST_BRANCH_BY_DELIVERER,
  },
  {
    id: 1,
    text: "The worst in terms of peak collision",
    keyword: WORST_BRANCH_BY_DELIVERER,
  },
  {
    id: 2,
    text: "The best in terms of order delivery time",
    keyword: BEST_BRANCH_BY_TIME,
  },
  {
    id: 3,
    text: "The worst in terms of order delivery time",
    keyword: WORST_BRANCH_BY_TIME,
  },
  {
    id: 4,
    text: "The best in terms of ease of order registration",
    keyword: BEST_BRANCH_BY_WEBSITE,
  },
  {
    id: 5,
    text: "Worst in terms of ease of order registration",
    keyword: WORST_BRANCH_BY_WEBSITE,
  },
  {
    id: 6,
    text: "The best in terms of packaging quality",
    keyword: BEST_BRANCH_BY_PACKAGING,
  },
  {
    id: 7,
    text: "The worst in terms of packaging quality",
    keyword: WORST_BRANCH_BY_PACKAGING,
  },
  { id: 8, text: "The best in terms of food quality", keyword: BEST_BRANCH_BY_FOOD },
  { id: 9, text: "The worst in terms of food quality", keyword: WORST_BRANCH_BY_FOOD },
  {
    id: 10,
    text: "The best in terms of general satisfaction",
    keyword: BEST_BRANCH_BY_IS_DISSATISFIED,
  },
  {
    id: 11,
    text: "The worst in terms of general satisfaction",
    keyword: WORST_BRANCH_BY_IS_DISSATISFIED,
  },
];

const sortingFunctions = {
  [BEST_BRANCH_BY_DELIVERER]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === DELIVERER)
        .average_review_percent <
      b.questions.find((question) => question.title === DELIVERER)
        .average_review_percent
        ? 1
        : -1
    ),
  [WORST_BRANCH_BY_DELIVERER]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === DELIVERER)
        .average_review_percent >
      b.questions.find((question) => question.title === DELIVERER)
        .average_review_percent
        ? 1
        : -1
    ),
  [BEST_BRANCH_BY_TIME]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === TIME)
        .average_review_percent <
      b.questions.find((question) => question.title === TIME)
        .average_review_percent
        ? 1
        : -1
    ),
  [WORST_BRANCH_BY_TIME]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === TIME)
        .average_review_percent >
      b.questions.find((question) => question.title === TIME)
        .average_review_percent
        ? 1
        : -1
    ),
  [BEST_BRANCH_BY_WEBSITE]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === WEBSITE)
        .average_review_percent <
      b.questions.find((question) => question.title === WEBSITE)
        .average_review_percent
        ? 1
        : -1
    ),
  [WORST_BRANCH_BY_WEBSITE]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === WEBSITE)
        .average_review_percent >
      b.questions.find((question) => question.title === WEBSITE)
        .average_review_percent
        ? 1
        : -1
    ),
  [BEST_BRANCH_BY_PACKAGING]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === PACKAGING)
        .average_review_percent <
      b.questions.find((question) => question.title === PACKAGING)
        .average_review_percent
        ? 1
        : -1
    ),
  [WORST_BRANCH_BY_PACKAGING]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === PACKAGING)
        .average_review_percent >
      b.questions.find((question) => question.title === PACKAGING)
        .average_review_percent
        ? 1
        : -1
    ),
  [BEST_BRANCH_BY_FOOD]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === FOOD)
        .average_review_percent <
      b.questions.find((question) => question.title === FOOD)
        .average_review_percent
        ? 1
        : -1
    ),
  [WORST_BRANCH_BY_FOOD]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === FOOD)
        .average_review_percent >
      b.questions.find((question) => question.title === FOOD)
        .average_review_percent
        ? 1
        : -1
    ),
  [BEST_BRANCH_BY_IS_DISSATISFIED]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === IS_DISSATISFIED)
        .average_review_percent <
      b.questions.find((question) => question.title === IS_DISSATISFIED)
        .average_review_percent
        ? 1
        : -1
    ),
  [WORST_BRANCH_BY_IS_DISSATISFIED]: (reviews) =>
    reviews?.sort((a, b) =>
      a.questions.find((question) => question.title === IS_DISSATISFIED)
        .average_review_percent >
      b.questions.find((question) => question.title === IS_DISSATISFIED)
        .average_review_percent
        ? 1
        : -1
    ),
};

const branchHeadCells = [
  {
    id: "id",
    label: "Row",
    name: "Row",
    align: "center",
  },
  {
    id: "id",
    label: "Number of comments",
    name: "Number of comments",
    align: "center",
  },
];

const reasonsHeadCells = Object.values(reasons)?.map((reason) => ({
  id: "id",
  name: reason,
  label: (
    <div className="d-flex  justify-content-between">
      <div className="ml-4">{reason}</div>
      <div>Number of comments</div>
    </div>
  ),
  align: "center",
}));

let timeoutId = null;

export function AdminCustomersDissatisfactionReport({
  isLoading,
  isSuper,
  branches,
  _getCustomersDisSatisfactionReviewsReports,
  customersDisSatisfactionReviewsReports,
}) {
  const theme = useTheme();
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedSortingType, selectSortingType] = useState(
    sortingOptions[0].keyword
  );

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;

  const submitDate = () => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getCustomersDisSatisfactionReviewsReports({
            business_id: selectedBranches,
            from_date: persianToEnglishNumber(
              moment(
                formatDateObjectToNormal(selectedDayRange.from),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              moment(
                formatDateObjectToNormal(selectedDayRange.to),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getCustomersDisSatisfactionReviewsReports({
          from_date: persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.from),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.to),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
    handleClose();
  };

  const headCells = useMemo(() => {
    if (isSuper) {
      let mainBranchHeadCells = [...branchHeadCells];
      mainBranchHeadCells.splice(1, 0, {
        id: "id",
        label: "Branch Name",
        name: "Branch Name",
        align: "center",
      });
      mainBranchHeadCells.splice(3, 0, ...reasonsHeadCells);
      return mainBranchHeadCells;
    } else {
      let branchesHeadCells = [...branchHeadCells];
      branchesHeadCells.splice(2, 0, ...reasonsHeadCells);
      return branchesHeadCells;
    }
  }, [isSuper]);

  
  useEffect(() => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getCustomersDisSatisfactionReviewsReports({
            business_id: selectedBranches,
            from_date: persianToEnglishNumber(
              moment(
                formatDateObjectToNormal(selectedDayRange.from),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              moment(
                formatDateObjectToNormal(selectedDayRange.to),
                "YYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getCustomersDisSatisfactionReviewsReports({
          from_date: persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.from),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            moment(
              formatDateObjectToNormal(selectedDayRange.to),
              "YYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
  }, [isSuper, selectedBranches]);

  const headRow = useMemo(
    () => headCells.map((headCell) => headCell.name),
    [headCells]
  );

  const rows = useMemo(() => {
    return (
      customersDisSatisfactionReviewsReports &&
      sortingFunctions[selectedSortingType](
        Object.values(customersDisSatisfactionReviewsReports?.reviews)
      ).map((report, index) => {
        const num = index + 1;
        const branchName = branches?.find(
          (branch) => branch.id === report._id
        )?.title;
        const commentsNum = report.questions.reduce((a, b) => ({
          total_review_count: a.total_review_count + b.total_review_count,
        })).total_review_count;
        const questions = Object.entries(reasons)?.map(([key]) => {
          const question = report.questions.find(
            (question) => question.title === key
          );
          return `${question?.total_review_count || 0} (${
            question?.average_review_percent || 0
          }%)`;
        });

        if (isSuper) {
          return [num, branchName, commentsNum, ...questions];
        }
        return [num, commentsNum, ...questions];
      })
    );
  }, [
    customersDisSatisfactionReviewsReports,
    branches,
    selectedSortingType,
    isSuper,
  ]);
  return (
    <div className="container">
      <Head>
        <title>Customer dissatisfaction analysis</title>
      </Head>

      <AdminBreadCrumb
        submitButtonText="Output"
        submitAction={() =>
          generateCSVFile(headRow, rows, [], "Report of Customer Disability Analysis")
        }
      />

      <Paper elevation={2} className="d-flex flex-column mt-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex align-items-center  ml-3 mb-3">
              <div className="d-flex flex-wrap align-items-center ml-5 mb-4 mb-lg-0">
                <Button
                  style={{
                    direction: "rtl",
                  }}
                  aria-describedby={id}
                  onClick={handleOpen}
                  variant="outlined"
                >
                  From{" "}
                  <span className="px-2">
                    {englishNumberToPersianNumber(
                      formatDateObjectToNormal(selectedDayRange.from)
                    )}
                  </span>
                  until the{" "}
                  <span className="px-2">
                    {englishNumberToPersianNumber(
                      formatDateObjectToNormal(selectedDayRange.to)
                    )}
                  </span>
                </Button>
                <Popover
                  id={id}
                  anchorOrigin={{
                    vertical: 195,
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openModal}
                  onClose={handleClose}
                >
                  <div
                    style={{ backgroundColor: "#fff", position: "relative" }}
                  >
                    <CloseIcon
                      onClick={handleClose}
                      className="u-cursor-pointer"
                      style={{
                        fontSize: 24,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 10000,
                        color: "#555555",
                      }}
                    />
                    <CustomCalendar
                      selectedDayRange={selectedDayRange}
                      setSelectedDayRange={setSelectedDayRange}
                      submitDate={submitDate}
                    />
                  </div>
                </Popover>
              </div>
            </div>
            {isSuper && (
              <Select
                className=" ml-3 mb-3"
                style={{ minWidth: 150, height: 36, flex: 1 }}
                value={selectedBranches}
                multiple
                margin="dense"
                variant="outlined"
                displayEmpty
                size="large"
                // IconComponent={() => null}
                renderValue={() => {
                  if (selectedBranches.length === 0) return "Choose a branch";
                  if (selectedBranches.length === 1 && selectedBranches[0])
                    return branches.find(
                      (branch) => branch.id === selectedBranches[0]
                    ).title;
                  if (selectedBranches.length === branches.length)
                    return "All branches";
                  return `${englishNumberToPersianNumber(
                    selectedBranches.length
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
                <MenuItem className="px-2">
                  <Checkbox
                    className="p-1"
                    size="small"
                    indeterminate={
                      selectedBranches.length !== branches.length &&
                      selectedBranches.length
                    }
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onClick={() => {
                      if (selectedBranches.length) setSelectedBranches([]);
                      else setSelectedBranches(branches.map((b) => b.id));
                    }}
                    color="primary"
                    checked={selectedBranches.length === branches.length}
                  />
                  <ListItemText
                    primary="Choosing all branches"
                    className="text-right"
                  />
                </MenuItem>
                {branches.map((branch) => {
                  return (
                    <MenuItem
                      className="px-2"
                      key={`${branch.id}-${selectedBranches.includes(
                        branch.id
                      )}`}
                      value={branch.id}
                    >
                      <Checkbox
                        className="p-1"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!selectedBranches.includes(branch.id)) {
                            setSelectedBranches([
                              ...selectedBranches,
                              branch.id,
                            ]);
                          } else {
                            setSelectedBranches(
                              selectedBranches.filter((id) => id !== branch.id)
                            );
                          }
                        }}
                        color="primary"
                        checked={selectedBranches.includes(branch.id)}
                      />
                      <ListItemText
                        primary={branch.title}
                        className="text-right"
                      />
                    </MenuItem>
                  );
                })}
              </Select>
            )}
          </div>
          <MaterialSelect
            FormControlProps={{
              style: {
                width: 80,
                flexShrink: 0,
              },
            }}
            className="small ml-2 pr-0 direction-ltr mb-3"
            inputProps={{
              className: "text-center ml-minus-2",
            }}
            IconComponent={() => null}
            options={sortingOptions}
            themeColor={process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
            menuHeader={
              <div
                style={{ width: 200 }}
                className="px-3 u-fontWeightBold u-fontNormal my-1"
              >
                order by
              </div>
            }
            selectOption={(text) =>
              selectSortingType(
                sortingOptions.find((i) => i.text === text).keyword
              )
            }
            inputData={{
              defaultValue: "Ordering",
            }}
            selected={sortingOptions.find(
              (i) => i.keyword === selectedSortingType
            )}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "right",
              },
              elevation: 3,
              getContentAnchorEl: null,
            }}
          />
        </div>
        {isSuper && (
          <div className="d-flex align-items-center flex-wrap px-4">
            {selectedBranches?.length === branches?.length ? (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                  maxWidth: "fit-content",
                }}
                className="ml-2 mb-2"
                onDelete={() => setSelectedBranches([])}
                label="All branches"
              />
            ) : selectedBranches?.length ? (
              branches
                ?.filter((item) => selectedBranches.includes(item.id))
                .map((branch) => {
                  return (
                    <Chip
                      key={branch.id}
                      deleteIcon={
                        <ClearRoundedIcon
                          style={{ color: theme.palette.text.disabled }}
                        />
                      }
                      style={{
                        borderRadius: 4,
                        background: theme.palette.background.secondary,
                        maxWidth: "fit-content",
                      }}
                      className="ml-2 mb-2"
                      onDelete={() =>
                        setSelectedBranches(
                          selectedBranches.filter((item) => item !== branch.id)
                        )
                      }
                      label={branch.title}
                    />
                  );
                })
            ) : (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                  maxWidth: "fit-content",
                }}
                className="ml-2 mb-2"
                onDelete={() =>
                  setSelectedBranches(branches.map((branch) => branch.id))
                }
                label="None of the branches"
              />
            )}
          </div>
        )}
        {true ? (
          <TableContainer
            className="mt-3 purchase-by-order-table"
            style={{ maxHeight: 500 }}
          >
            <Table
              aria-labelledby="tableTitle"
              size="small"
              aria-label="enhanced table"
            >
              <TableHead
                style={{
                  backgroundColor: "#F1F2F3",
                  height: 50,
                  position: "sticky",
                  top: 0,
                }}
              >
                <TableRow>
                  {headCells?.map((headCell) => (
                    <TableCell
                      padding={headCell?.padding || "unset"}
                      width={headCell?.width || ""}
                      className="text-nowrap u-fontWeightBold"
                      key={headCell?.id}
                      align={headCell?.align}
                    >
                      {headCell?.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {isLoading ? (
                <TableBody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <TableRow style={{ height: 53 }} key={item}>
                      {headCells?.map((cell) => (
                        <TableCell key={cell?.id}>
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
                  {customersDisSatisfactionReviewsReports &&
                    sortingFunctions[selectedSortingType](
                      Object.values(
                        customersDisSatisfactionReviewsReports?.reviews
                      )
                    ).map((report, index) => {
                      const cellMinWidth = 250;
                      return (
                        <TableRow key={report.id}>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(index + 1)}
                          </TableCell>
                          {isSuper && (
                            <TableCell align="center">
                              {
                                branches?.find(
                                  (branch) => branch.id === report._id
                                )?.title
                              }
                            </TableCell>
                          )}
                          <TableCell align="center">
                            {englishNumberToPersianNumber(
                              report.questions.reduce((a, b) => ({
                                total_review_count:
                                  a.total_review_count + b.total_review_count,
                              })).total_review_count
                            )}
                          </TableCell>
                          {Object.entries(reasons)?.map(([key, value]) => {
                            const question = report.questions.find(
                              (question) => question.title === key
                            );
                            return (
                              <TableCell
                                key={key}
                                align="center"
                                style={{ minWidth: cellMinWidth }}
                              >
                                <div className="d-flex justify-content-between">
                                  <div>{value}</div>
                                  <div>{`${englishNumberToPersianNumber(
                                    question?.total_review_count
                                  )} (${englishNumberToPersianNumber(
                                    question?.average_review_percent
                                  )}%)`}</div>
                                </div>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        ) : (
          <EmptyStateForTableReports />
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  branches: makeSelectBranches(),
  customersDisSatisfactionReviewsReports:
    makeSelectCustomersDisSatisfactionReviewsReports(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCustomersDisSatisfactionReviewsReports: (data) =>
      dispatch(getCustomersDisSatisfactionReviewsReports(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminCustomersDissatisfactionReport);
