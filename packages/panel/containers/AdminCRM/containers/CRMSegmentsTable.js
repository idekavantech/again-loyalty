import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import AddIcon from "@material-ui/icons/Add";
import Image from "next/image";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import { Collapse } from "react-collapse";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Skeleton } from "@material-ui/lab";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import { satisfactionChoices } from "store/constants";

function CRMSegmentsTable({
  theme,
  customerSegments,
  setCustomerSegments,
  isOpen,
  setIsOpen,
  _crmLevels,
  _crmLabels,
  isLoading,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [segmentIndex, setSegmentIndex] = useState(null);
  const [order, setOrder] = useState(0);
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    if (customerSegments?.length) {
      setSegments(customerSegments);
    }
  }, [customerSegments]);

  useEffect(() => {
    if (segments?.length) {
      setOrder(segments?.length + 1);
    }
  }, [segments]);

  const addNewRow = () => {
    setCustomerSegments([
      ...customerSegments,
      {
        title: "New section",
        crm_levels: [],
        new_labels: [],
        satisfactions: [],
        order: order,
      },
    ]);
  };

  const removeRow = (index) => {
    const _customerSegments = [...customerSegments];
    _customerSegments.splice(index, 1);
    setCustomerSegments(_customerSegments?.length ? _customerSegments : []);
  };

  return (
    <TableContainer component={Paper} style={{ border: "none" }}>
      <Table
        aria-labelledby="tableTitle"
        size="small"
        aria-label="enhanced table"
      >
        {isLoading ? (
          <TableBody>
            {[1, 2, 3, 4, 5].map((item) => (
              <TableRow style={{ height: 53 }} key={item}>
                <TableCell>
                  <Skeleton
                    style={{
                      transform: "scale(1)",
                      width: "100%",
                      height: 40,
                      padding: "24px 0",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {customerSegments?.map((segment, index) => (
              <div
                className={`faq-box position-relative text-right rtl`}
                style={{
                  borderBottom: "1px solid #E4E6E7",
                  padding: "24px 0",
                  overflowX: "hidden",
                }}
                key={segment?.id}
              >
                <div onClick={() => setIsOpen({ [index]: !isOpen[index] })}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div
                        className="cursor-pointer"
                        style={{ marginLeft: 22 }}
                        onClick={() => setIsOpen({ [index]: !isOpen[index] })}
                      >
                        {isOpen[index] ? (
                          <ExpandLessRoundedIcon className="w-100" />
                        ) : (
                          <ExpandMoreRoundedIcon className="w-100" />
                        )}
                      </div>
                      <div
                        className="cursor-pointer cursor-pointer u-fontLarge u-pre-wrap u-overflow-wrap"
                        onClick={() => setIsOpen({ [index]: !isOpen[index] })}
                      >
                        <p style={{ fontSize: 16, fontWeight: 600 }}>
                          {segment?.title}
                        </p>
                        <p
                          style={{
                            fontSize: 14,
                            fontWeight: 400,
                            color: "#6D7175",
                          }}
                          className="mt-1"
                        >
                          Customer level- satisfaction- Label
                        </p>
                      </div>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setSegmentIndex(index);
                        setIsOpenModal(true);
                      }}
                    >
                      <Image
                        alt=""
                        className="cursor-pointer"
                        width={22}
                        height={22}
                        src="/images/Delete 2.svg"
                      />
                    </div>
                  </div>
                </div>
                <Collapse isOpened={isOpen[index]} className="w-100">
                  <div
                    className="row d-flex u-fontLarge u-pre-wrap u-overflow-wrap justify-content-between"
                    style={{ paddingTop: 32 }}
                  >
                    <div className="col-12  col-lg-3 mb-3 mb-lg-0">
                      <p
                        style={{ fontSize: 12, fontWeight: 600 }}
                        className="mb-2"
                      >
                        Name of segmentation
                      </p>
                      <input
                        placeholder="Section"
                        value={segment?.title}
                        style={{
                          color: "#202223",
                          border: "1px solid #E4E6E7",
                          borderRadius: 8,
                          fontSize: 14,
                          fontWeight: 400,
                          height: 44,
                        }}
                        className="w-100 px-4"
                        onChange={(e) => {
                          const newCustomerSegments = JSON.parse(
                            JSON.stringify(customerSegments)
                          );
                          newCustomerSegments[index].title = e.target.value;
                          setCustomerSegments(newCustomerSegments);
                        }}
                      />
                    </div>
                    <div className="col-12  col-lg-3 mb-3 mb-lg-0">
                      <p
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                        className="mb-2"
                      >
                        Customer levels(Based on points)
                      </p>
                      <Select
                        className="w-100 ml-3 mb-3"
                        style={{
                          minWidth: 150,
                          height: 36,
                          flex: 1,
                          borderRadius: 8,
                          height: 44,
                        }}
                        value={segment.crm_levels}
                        multiple
                        margin="dense"
                        variant="outlined"
                        displayEmpty
                        size="large"
                        renderValue={() => {
                          if (segment.crm_levels.length === 0)
                            return "All customers";
                          if (
                            segment.crm_levels.length === 1 &&
                            segment.crm_levels[0]
                          )
                            return _crmLevels?.find(
                              (level) => level.id === segment.crm_levels[0]
                            )?.title;
                          if (
                            segment?.crm_levels?.length === _crmLevels?.length
                          )
                            return "All levels";
                          return `${englishNumberToPersianNumber(
                            segment.crm_levels.length
                          )} Level`;
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
                          <div
                            className="w-100 d-flex align-items-center"
                            onClick={() => {
                              if (segment.crm_levels.length) {
                                const newCustomerSegments = JSON.parse(
                                  JSON.stringify(customerSegments)
                                );
                                newCustomerSegments[index].crm_levels = [];
                                setCustomerSegments(newCustomerSegments);
                              } else {
                                const newCustomerSegments = JSON.parse(
                                  JSON.stringify(customerSegments)
                                );
                                newCustomerSegments[index].crm_levels =
                                  _crmLevels?.map((level) => level.id);
                                setCustomerSegments(newCustomerSegments);
                              }
                            }}
                          >
                            <Checkbox
                              className="p-1"
                              size="small"
                              indeterminate={
                                segment?.crm_levels.length !==
                                  _crmLevels?.length &&
                                segment?.crm_levels?.length
                              }
                              onChange={(e) => {
                                e.preventDefault();
                              }}
                              color="primary"
                              checked={
                                segment.crm_levels.length === _crmLevels?.length
                              }
                            />
                            <ListItemText
                              primary="Select all levels"
                              className="text-right"
                            />
                          </div>
                        </MenuItem>
                        {_crmLevels?.map((label) => {
                          return (
                            <MenuItem
                              className="px-2"
                              key={label?.title}
                              value={label.id}
                            >
                              <div
                                className="w-100 d-flex align-items-center"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (segment.crm_levels.includes(label.id)) {
                                    const newCustomerSegments = JSON.parse(
                                      JSON.stringify(customerSegments)
                                    );
                                    const newLabels = segment.crm_levels.filter(
                                      (_label) => _label !== label.id
                                    );
                                    newCustomerSegments[index].crm_levels = [
                                      ...newLabels,
                                    ];
                                    setCustomerSegments(newCustomerSegments);
                                  } else {
                                    const newCustomerSegments = JSON.parse(
                                      JSON.stringify(customerSegments)
                                    );
                                    newCustomerSegments[index].crm_levels = [
                                      ...newCustomerSegments[index].crm_levels,
                                      label.id,
                                    ];
                                    setCustomerSegments(newCustomerSegments);
                                  }
                                }}
                              >
                                <Checkbox
                                  className="p-1"
                                  size="small"
                                  onChange={(e) => {
                                    e.preventDefault();
                                  }}
                                  color="primary"
                                  checked={segment?.crm_levels?.includes(
                                    label.id
                                  )}
                                />
                                <ListItemText
                                  primary={label?.title}
                                  className="text-right"
                                />
                              </div>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                    <div className="col-12  col-lg-3 mb-3 mb-lg-0">
                      <p
                        style={{ fontSize: 12, fontWeight: 600 }}
                        className="mb-2"
                      >
                        Satisfaction
                      </p>
                      <Select
                        className="w-100 ml-3 mb-3"
                        style={{
                          minWidth: 150,
                          height: 36,
                          flex: 1,
                          borderRadius: 8,
                          height: 44,
                        }}
                        value={satisfactionChoices}
                        multiple
                        margin="dense"
                        variant="outlined"
                        displayEmpty
                        size="large"
                        renderValue={() => {
                          if (segment.satisfactions.length === 0)
                            return "Select the level of satisfaction";
                          if (
                            segment?.satisfactions?.length === 1 &&
                            segment.satisfactions[0]
                          )
                            return satisfactionChoices?.find(
                              (level) => level.id === segment.satisfactions[0]
                            )?.title;
                          if (
                            segment?.satisfactions?.length ===
                            satisfactionChoices?.length
                          )
                            return "All levels of satisfaction";
                          return `${englishNumberToPersianNumber(
                            segment.satisfactions.length
                          )} The level of satisfaction`;
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
                          <div
                            className="w-100 d-flex align-items-center"
                            onClick={() => {
                              if (segment.satisfactions.length) {
                                const newCustomerSegments = JSON.parse(
                                  JSON.stringify(customerSegments)
                                );
                                newCustomerSegments[index].satisfactions = [];
                                setCustomerSegments(newCustomerSegments);
                              } else {
                                const newCustomerSegments = JSON.parse(
                                  JSON.stringify(customerSegments)
                                );
                                newCustomerSegments[index].satisfactions =
                                  satisfactionChoices?.map((level) => level.id);
                                setCustomerSegments(newCustomerSegments);
                              }
                            }}
                          >
                            <Checkbox
                              className="p-1"
                              size="small"
                              indeterminate={
                                segment.satisfactions.length !==
                                  satisfactionChoices?.length &&
                                segment.satisfactions.length
                              }
                              onChange={(e) => {
                                e.preventDefault();
                              }}
                              color="primary"
                              checked={
                                segment.satisfactions.length ===
                                satisfactionChoices?.length
                              }
                            />
                            <ListItemText
                              primary="Select all levels of satisfaction"
                              className="text-right"
                            />
                          </div>
                        </MenuItem>
                        {satisfactionChoices?.map((label) => {
                          return (
                            <MenuItem
                              className="px-2"
                              key={label?.title}
                              value={label.id}
                            >
                              <div
                                className="w-100 d-flex align-items-center"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (
                                    segment.satisfactions.includes(label.id)
                                  ) {
                                    const newCustomerSegments = JSON.parse(
                                      JSON.stringify(customerSegments)
                                    );
                                    const newLabels =
                                      segment.satisfactions.filter(
                                        (_label) => _label !== label.id
                                      );
                                    newCustomerSegments[index].satisfactions = [
                                      ...newLabels,
                                    ];
                                    setCustomerSegments(newCustomerSegments);
                                  } else {
                                    const newCustomerSegments = JSON.parse(
                                      JSON.stringify(customerSegments)
                                    );
                                    newCustomerSegments[index].satisfactions = [
                                      ...newCustomerSegments[index]
                                        .satisfactions,
                                      label.id,
                                    ];
                                    setCustomerSegments(newCustomerSegments);
                                  }
                                }}
                              >
                                <Checkbox
                                  className="p-1"
                                  size="small"
                                  onChange={(e) => {
                                    e.preventDefault();
                                  }}
                                  color="primary"
                                  checked={segment?.satisfactions?.includes(
                                    label.id
                                  )}
                                />
                                <ListItemText
                                  primary={label?.title}
                                  className="text-right"
                                />
                              </div>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                    <div className="col-12 col-lg-3 mb-3 mb-lg-0">
                      <p
                        style={{ fontSize: 12, fontWeight: 600 }}
                        className="mb-2"
                      >
                        Labels
                      </p>
                      <Select
                        className="w-100 ml-3 mb-3"
                        style={{
                          minWidth: 150,
                          height: 36,
                          flex: 1,
                          borderRadius: 8,
                          height: 44,
                        }}
                        value={segment.new_labels}
                        multiple
                        margin="dense"
                        variant="outlined"
                        displayEmpty
                        size="large"
                        renderValue={() => {
                          if (segment.new_labels.length === 0)
                            return "Select the label";
                          if (
                            segment.new_labels.length === 1 &&
                            segment.new_labels[0]
                          )
                            return _crmLabels?.find(
                              (level) => level.id === segment.new_labels[0]
                            )?.title;
                          if (
                            segment?.new_labels?.length === _crmLabels?.length
                          )
                            return "All tags";
                          return `${englishNumberToPersianNumber(
                            segment.new_labels.length
                          )} Label`;
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
                          <div
                            className="w-100 d-flex align-items-center"
                            onClick={() => {
                              if (segment.new_labels.length) {
                                const newCustomerSegments = JSON.parse(
                                  JSON.stringify(customerSegments)
                                );
                                newCustomerSegments[index].new_labels = [];
                                setCustomerSegments(newCustomerSegments);
                              } else {
                                const newCustomerSegments = JSON.parse(
                                  JSON.stringify(customerSegments)
                                );
                                newCustomerSegments[index].new_labels =
                                  _crmLabels?.map((level) => level.id);
                                setCustomerSegments(newCustomerSegments);
                              }
                            }}
                          >
                            <Checkbox
                              className="p-1"
                              size="small"
                              indeterminate={
                                segment?.new_labels?.length !==
                                  _crmLabels?.length &&
                                segment?.new_labels?.length
                              }
                              onChange={(e) => {
                                e.preventDefault();
                              }}
                              color="primary"
                              checked={
                                segment?.new_labels?.length ===
                                _crmLabels?.length
                              }
                            />
                            <ListItemText
                              primary="Select all tags"
                              className="text-right"
                            />
                          </div>
                        </MenuItem>
                        {_crmLabels?.map((label) => {
                          return (
                            <MenuItem
                              className="px-2"
                              key={label?.title}
                              value={label.id}
                            >
                              <div
                                className="w-100 d-flex align-items-center"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (segment.new_labels.includes(label.id)) {
                                    const newCustomerSegments = JSON.parse(
                                      JSON.stringify(customerSegments)
                                    );
                                    const newLabels = segment.new_labels.filter(
                                      (_label) => _label !== label.id
                                    );
                                    newCustomerSegments[index].new_labels = [
                                      ...newLabels,
                                    ];
                                    setCustomerSegments(newCustomerSegments);
                                  } else {
                                    const newCustomerSegments = JSON.parse(
                                      JSON.stringify(customerSegments)
                                    );
                                    newCustomerSegments[index].new_labels = [
                                      ...newCustomerSegments[index].new_labels,
                                      label.id,
                                    ];
                                    setCustomerSegments(newCustomerSegments);
                                  }
                                }}
                              >
                                <Checkbox
                                  className="p-1"
                                  size="small"
                                  onChange={(e) => {
                                    e.preventDefault();
                                  }}
                                  color="primary"
                                  checked={segment?.new_labels?.includes(
                                    label.id
                                  )}
                                />
                                <ListItemText
                                  primary={label?.title}
                                  className="text-right"
                                />
                              </div>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                </Collapse>
              </div>
            ))}
          </TableBody>
        )}
        <div
          className="d-flex align-items-center justify-content-center cursor-pointer"
          style={{
            border: `1px dashed ${theme.palette.primary.main}`,
            borderRadius: 4,
            padding: 10,
            marginTop: 24,
          }}
          onClick={addNewRow}
        >
          <AddIcon style={{ color: theme.palette.primary.main }} />
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: theme.palette.primary.main,
            }}
            className="ml-2"
          >
            Creating new segmentation
          </span>
        </div>
        <AssuranceDialog
          isOpen={isOpenModal}
          closeDialogHandler={() => setIsOpenModal(false)}
          contentText="Are you sure you want to delete the stored level?"
          dialogMainActions={() => {
            removeRow(segmentIndex);
            setIsOpenModal(false);
          }}
          dialogMainActionText="Delete"
          dialogSecondActions={() => setIsOpenModal(false)}
          dialogSecondActionText="cancel"
        />
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = createStructuredSelector({
  urlPrefix: makeSelectAdminUrlPrefix(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(CRMSegmentsTable);
