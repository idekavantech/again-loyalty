import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import AdminBreadCrumb from "../../../AdminBreadCrumb";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { deliveryTypesConstants } from "../../constants";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Link from "next/link";
import TableBody from "@material-ui/core/TableBody";
import { Skeleton } from "@material-ui/lab";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import InputLabel from "@material-ui/core/InputLabel";
import { satisfactionChoices, satisfactionTitle } from "store/constants";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import jMoment from "moment-jalaali";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import CustomCalendar from "@saas/components/CustomCalendar";
import { formatDateObjectToNormal } from "../../../../utils/helpers";
import {useCRMReport} from './useCRMReports'

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const tableHead = [
  {
    id: 0,
    label: "Date",
    align: "right",
    minWidth: 100,
    width: 160,
  },
  {
    id: 1,
    label: "Order number",
    align: "right",
    minWidth: 100,
    width: 250,
  },
  {
    id: 2,
    label: "Customer Name",
    align: "right",
    minWidth: 100,
    width: 160,
  },
  {
    id: 3,
    label: "customer number",
    align: "right",
    minWidth: 100,
    width: 160,
  },
  {
    id: 4,
    label: "The level of satisfaction",
    align: "right",
    minWidth: 100,
    width: 160,
  },
  {
    id: 5,
    label: " Reason for dissatisfaction",
    align: "right",
    minWidth: 100,
    width: 160,
  },
  {
    id: 6,
    label: " Customer note",
    align: "right",
    minWidth: 100,
    width: 160,
  },
];

function CRMReports() {

const {
  adminUrlPrefix,
  isLoading,
  reviewsResponse,
  reviewsResponsePaginationByQuery,
  review_templates,
  deliveryType,
  setDeliveryType,
  isMobile,
  pageSize,
  page,
  templateAttributes, 
  selectedDayRange,
  setSelectedDayRange,
  selectedTemplateAttributes,
  setSelectedTemplateAttributes,
  openModal,
  selectedSatisfactionChoices,
  setSelectedSatisfactionChoices,
  handleChangePage,
  handleChangeRowsPerPage,
  handleClose,
  handleOpen,
  id,
  submitDate,
} = useCRMReport()

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <AdminBreadCrumb />
      </div>
      <div className="d-flex flex-column">
      <Select
        className="py-1 my-2"
        value={deliveryType}
        disableUnderline
        style={{
          height: 40,
          background: "#FFFFFF",
          color: "#000000",
          borderRadius: 8,
          width: 300,
          fontSize: 16,
          fontWeight: 400,
        }}
        onChange={(event) => setDeliveryType(event.target.value)}
      >
        {review_templates &&
          Object.keys(review_templates)?.map((item) => (
            <MenuItem value={review_templates[item]} key={item.id}>
              {deliveryTypesConstants[item].title}
            </MenuItem>
          ))}
      </Select>
      <p>
        Based on how to deliver to the customer
      </p>
      </div>
      <Paper elevation={1} style={{ marginTop: 8, minHeight: 500 }}>
        <div
          className="d-flex justify-content-between flex-wrap"
          style={{ padding: 24, paddingBottom: 20 }}
        >
          <div
            className="crmReportsDatePicker d-flex justify-content-center align-items-center"
          >
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
              <div style={{ backgroundColor: "#fff", position: "relative" }}>
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

          <div className="d-flex flex-wrap">
            <div>
              <FormControl variant="outlined" className="mt-2 my-md-0 mr-md-2">
                <InputLabel
                  id="demo-simple-select-outlined-label"
                  style={{ fontSize: 16, fontWeight: 400, color: "#000000" }}
                >
                  Reason for dissatisfaction
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectedTemplateAttributes}
                  defaultValue={[]}
                  style={{
                    minWidth: 150,
                    flex: 1,
                    borderRadius: 8,
                    height: 44,
                  }}
                  label="Reason for dissatisfaction"
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
                  renderValue={() => {
                    if (selectedTemplateAttributes?.length === 0)
                      return "Choose the reason for discontent";
                    if (
                      selectedTemplateAttributes?.length === 1 &&
                      templateAttributes[0]
                    )
                      return templateAttributes?.find(
                        (tempAttr) =>
                          tempAttr.id === selectedTemplateAttributes[0].id
                      )?.title;
                    if (
                      selectedTemplateAttributes?.length ==
                      templateAttributes?.length
                    )
                      return "All";
                    return `${englishNumberToPersianNumber(
                      selectedTemplateAttributes?.length
                    )} the reason`;
                  }}
                >
                  <MenuItem
                    className="px-2"
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onClick={() => {
                      if (selectedTemplateAttributes?.length)
                        setSelectedTemplateAttributes([]);
                      else
                        setSelectedTemplateAttributes(
                          templateAttributes.map((tempAttr) => tempAttr.id)
                        );
                    }}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      indeterminate={
                        selectedTemplateAttributes?.length !==
                          templateAttributes.length &&
                        selectedTemplateAttributes?.length
                      }
                      color="primary"
                      checked={
                        selectedTemplateAttributes?.length ===
                        templateAttributes?.length
                      }
                    />
                    <ListItemText primary="All" className="text-right" />
                  </MenuItem>
                  {templateAttributes.map((templateAttribute) => {
                    return (
                      <MenuItem
                        className="px-2"
                        key={templateAttribute.id}
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          const _selectedTemplateAttributes = [
                            ...selectedTemplateAttributes,
                          ];
                          if (
                            selectedTemplateAttributes.includes(
                              templateAttribute.id
                            )
                          ) {
                            const indexOfSelectedAttribute =
                              selectedTemplateAttributes.indexOf(
                                templateAttribute.id
                              );
                            _selectedTemplateAttributes.splice(
                              indexOfSelectedAttribute,
                              1
                            );
                            setSelectedTemplateAttributes([
                              ..._selectedTemplateAttributes,
                            ]);
                          } else {
                            _selectedTemplateAttributes.push(
                              templateAttribute.id
                            );
                            setSelectedTemplateAttributes([
                              ..._selectedTemplateAttributes,
                            ]);
                          }
                        }}
                      >
                        <Checkbox
                          className="p-1"
                          size="small"
                          label={templateAttribute}
                          color="primary"
                          checked={selectedTemplateAttributes?.includes(
                            templateAttribute.id
                          )}
                        />
                        <ListItemText
                          primary={templateAttribute.title}
                          className="text-right"
                        />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl variant="outlined" className="mt-2 my-md-0 mr-md-2">
                <InputLabel
                  id="demo-simple-select-outlined-label"
                  style={{ fontSize: 16, fontWeight: 400, color: "#000000" }}
                >
                  The level of satisfaction
                </InputLabel>

                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectedSatisfactionChoices}
                  style={{
                    minWidth: 150,
                    flex: 1,
                    borderRadius: 8,
                    height: 44,
                  }}
                  label="The level of satisfaction"
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
                  renderValue={() => {
                    if (selectedSatisfactionChoices?.length === 0)
                      return "Select the level of satisfaction";
                    if (
                      selectedSatisfactionChoices?.length === 1 &&
                      satisfactionChoices[0]
                    )
                      return satisfactionChoices?.find(
                        (satisfaction) =>
                          satisfaction.id === selectedSatisfactionChoices[0].id
                      )?.title;
                    if (
                      selectedSatisfactionChoices?.length ==
                      satisfactionChoices?.length
                    )
                      return "All";
                    return `${englishNumberToPersianNumber(
                      selectedSatisfactionChoices?.length
                    )} Satisfaction`;
                  }}
                >
                  <MenuItem
                    className="px-2"
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onClick={() => {
                      if (selectedSatisfactionChoices?.length > 0)
                        setSelectedSatisfactionChoices([]);
                      else
                        setSelectedSatisfactionChoices([...satisfactionChoices]);
                    }}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      indeterminate={
                        selectedSatisfactionChoices?.length !==
                          satisfactionChoices.length &&
                        selectedSatisfactionChoices?.length
                      }
                      color="primary"
                      checked={
                        selectedSatisfactionChoices?.length ===
                        satisfactionChoices.length
                      }
                    />
                    <ListItemText primary="All" className="text-right" />
                  </MenuItem>
                  {satisfactionChoices.map((satisfaction, index) => {
                    return (
                      <MenuItem
                        className="px-2"
                        key={index}
                        value={satisfaction}
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          const _selectedDescriptions =
                            selectedSatisfactionChoices;
                          if (
                            selectedSatisfactionChoices.includes(satisfaction)
                          ) {
                            const indexOfSelectedDescription =
                              selectedSatisfactionChoices.indexOf(satisfaction);
                            _selectedDescriptions.splice(
                              indexOfSelectedDescription,
                              1
                            );
                            setSelectedSatisfactionChoices([
                              ..._selectedDescriptions,
                            ]);
                          } else {
                            _selectedDescriptions.push(satisfaction);
                            setSelectedSatisfactionChoices([
                              ..._selectedDescriptions,
                            ]);
                          }
                        }}
                      >
                        <Checkbox
                          className="p-1"
                          size="small"
                          label={satisfaction}
                          color="primary"
                          checked={selectedSatisfactionChoices.includes(
                            satisfaction
                          )}
                        />
                        <ListItemText
                          primary={satisfaction.title}
                          className="text-right"
                        />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #0000003B",
            borderBottom: "1px solid #0000003B",
            background: "#FAFAFA",
          }}
          className="py-4 d-flex justify-content-center align-items-center"
        >
          <p
            style={{
              color: "rgba(0, 0, 0, 0.87)",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            General satisfaction
          </p>
        </div>
        <TableContainer
          component={Paper}
          style={{ border: "none", borderRadius: "none !important" }}
        >
          <Table
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
            style={{
              borderRadius: "none !important",
            }}
          >
            <TableHead
              className="d-flex align-items-center"
              style={{
                width: "100%",
                height: 56,
                position: "sticky",
                top: 0,
                zIndex: 1000,
                borderBottom: "1px solid rgba(0, 0, 0, 0.23)",
              }}
            >
              <TableRow style={{ width: "100%" }} className="d-flex">
                {tableHead?.map((headCell, index) => (
                  <TableCell
                    className="d-flex align-items-center justify-content-between"
                    key={headCell.id}
                    align={headCell.align}
                    color="text.primary"
                    style={{
                      minWidth: headCell.minWidth,
                      width: headCell.width,
                      maxWidth: headCell.maxWidth,
                      fontSize: 14,
                      fontWeight: 500,
                      paddingRight: 16,
                      paddingLeft: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 2,
                        height: 14,
                        background: `${
                          tableHead.length === index + 1 ? null : "#E0E0E0"
                        }`,
                      }}
                    ></div>
                    <p>{headCell.label}</p>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {isLoading ? (
              <TableBody>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <TableRow
                    style={{ height: 53 }}
                    key={item}
                    className="d-flex py-4"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((cell, index) => (
                      <div
                        key={cell?.id}
                        style={{
                          height: 40,
                          width: `${index === 1 ? "250px" : "160px"}`,
                          minWidth: 100,
                        }}
                      >
                        <Skeleton
                          style={{
                            transform: "scale(1)",
                            height: 40,
                            padding: "24px 0",
                            marginRight: 10,
                            align: "right",
                          }}
                        />
                      </div>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {reviewsResponse?.map((review) => (
                  <TableRow
                    className="d-flex align-items-center faq-box my-1 position-relative text-right rtl"
                    style={{
                      borderBottom: "1px solid #E4E6E7",
                      overflowX: "hidden",
                      height: 56,
                      fontWeight: 400,
                      fontSize: 14,
                    }}
                    key={review.id}
                  >
                    <div
                      className="text-nowrap pr-4"
                      align="right"
                      style={{
                        width: 160,
                        minWidth: 100,
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      {englishNumberToPersianNumber(
                        jMoment(review?._created_at).format("jYYYY/jMM/jDD")
                      )}
                    </div>
                    <div
                      className="text-nowrap pr-4"
                      align="right"
                      style={{
                        fontWeight: 400,
                        fontSize: 14,
                        width: 250,
                        minWidth: 100,
                      }}
                    >
                      {englishNumberToPersianNumber(review?.shopping_order_id)}
                    </div>
                    <div
                      className="text-nowrap pr-4 cursor-pointer"
                      align="right"
                      style={{
                        fontWeight: 400,
                        fontSize: 16,
                        width: 160,
                        minWidth: 100,
                      }}
                    >
                      <Link
                        passHref
                        href={`${adminUrlPrefix}crm/customers/${review.crm_membership_id}`}
                      >
                        <span
                          style={{
                            borderBottom: `${
                              review?.user_details?.full_name
                                ? "1px solid #87009B"
                                : null
                            }`,
                            color: `${
                              review?.user_details?.full_name ? "#87009B" : null
                            }`,
                          }}
                        >
                          {review?.user_details?.full_name
                            ? review?.user_details?.full_name
                            : "-"}
                        </span>
                      </Link>
                    </div>
                    <div
                      className="text-nowrap pr-4"
                      align="right"
                      style={{
                        fontWeight: 400,
                        fontSize: 14,
                        width: 160,
                        minWidth: 100,
                      }}
                    >
                      {englishNumberToPersianNumber(
                        review?.user_details?.phone_number
                      )}
                    </div>
                    <div
                      className="text-nowrap pr-4"
                      align="right"
                      style={{
                        fontWeight: 400,
                        fontSize: 14,
                        width: 160,
                        minWidth: 100,
                      }}
                    >
                      {review?.satisfaction
                        ? satisfactionTitle(review?.satisfaction)
                        : "-"}
                    </div>
                    <div
                      className="text-nowrap pr-4"
                      align="right"
                      style={{
                        fontWeight: 400,
                        fontSize: 14,
                        width: 160,
                        minWidth: 100,
                      }}
                    >
                      {englishNumberToPersianNumber(
                        jMoment(review?._created_at).format("jYYYY/jMM/jDD")
                      )}
                    </div>
                    <div
                      className="text-nowrap pr-4"
                      align="right"
                      style={{
                        width: 160,
                        minWidth: 100,
                      }}
                    >
                      <p
                        style={{
                          padding: "3px 10px",
                          background: `${
                            review?.description ? "rgba(0, 0, 0, 0.08)" : null
                          }`,
                          borderRadius: 16,
                          color: "#000000",
                          display: "inline",
                          fontSize: 14,
                          fontWeight: 400,
                        }}
                      >
                        {review?.description ? review?.description : "-"}
                      </p>
                    </div>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={!isMobile ? "The number of views on a page" : ""}
          labelDisplayedRows={({ from, to, count }) =>
            `${englishNumberToPersianNumber(
              from
            )} - ${englishNumberToPersianNumber(to)} From${
              count !== -1
                ? englishNumberToPersianNumber(count)
                : `more than${englishNumberToPersianNumber(to)}`
            }`
          }
          style={{ color: "rgba(0, 0, 0, 0.6)", fontSize: 12, fontWeight: 400 }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={reviewsResponsePaginationByQuery?.count}
          rowsPerPage={pageSize}
          page={page}
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
    </div>
  );
}


export default memo(CRMReports);
