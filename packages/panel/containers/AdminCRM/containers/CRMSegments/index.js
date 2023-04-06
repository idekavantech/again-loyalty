import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Link from "next/link";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Skeleton } from "@material-ui/lab";
import { getCrmSegments } from "store/actions";
import { makeSelectCrmSegments } from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import moment from "moment-jalaali";
import { useCRMSegments } from "./useCRMSegments";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

const tableHead = [
  {
    id: 0,
    label: "created at",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 1,
    label: "Name of segmentation",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 2,
    label: "Customer level",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 3,
    label: "Label",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 4,
    label: "",
    align: "right",
    minWidth: 80,
    width: 80,
    maxWidth: 80,
  },
];

function CRMSegments() {
  const {
    router,
    crmSegments,
    adminUrlPrefix,
    isLoading,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleCrmSegmentDelete,
    selectedSegment,
    isMobile,
    onPageChange,
    onPageSizeChange,
    pagination,
    segmentsPagination,
  } = useCRMSegments();

  return (
    <div className="container">
      <Head>
        <title>Customer segmentation</title>
      </Head>
      <AdminBreadCrumb
        responsive={false}
        buttons={
          <div className="d-flex">
            <Button
              color="primary"
              variant="contained"
              onClick={() => router.push(`${adminUrlPrefix}crm/segments/new`)}
            >
              new segment
            </Button>
          </div>
        }
      />
      <AssuranceDialog
        isOpen={isDeleteModalOpen}
        closeDialogHandler={() => setIsDeleteModalOpen(false)}
        contentText="Are you sure to remove segmentation?"
        dialogSecondActionTextColor="primary"
        dialogMainActions={() => {
          handleCrmSegmentDelete(selectedSegment);
          setIsDeleteModalOpen(false);
        }}
        dialogMainActionText="Yes"
        dialogSecondActions={() => setIsDeleteModalOpen(false)}
        dialogSecondActionText="Good"
      />
        <p
          className="mt-2"
          style={{ fontSize: 14, fontWeight: 400, lineHeight: "24px" }}
        >
          In this section you can create segments and view information about each section
        </p>


      <TableContainer
        component={Paper}
        style={{ border: "none" }}
        className="mt-3"
      >
        <Table
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <TableHead
            style={{
              width: "100%",
              position: "sticky",
              top: 0,
              background: "#E4E5E7",
              height: 64,
            }}
          >
            <TableRow style={{ width: "100%" }}>
              {tableHead?.map((headCell) => (
                <TableCell
                  className="text-nowrap u-fontWeightBold"
                  key={headCell?.id}
                  align={headCell.align}
                  color="text.primary"
                  style={{
                    minWidth: headCell.minWidth,
                    width: headCell.width,
                    maxWidth: headCell.maxWidth,
                  }}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableBody>
              {[1, 2, 3, 4, 5].map((item) => (
                <TableRow key={item?.id} style={{ height: 53 }}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <TableCell key={item?.id}>
                      <Skeleton
                        style={{
                          transform: "scale(1)",
                          height: 40,
                          padding: "24px 0",
                          align: "right",
                          minWidth: 100,
                          width: 160,
                          maxWidth: 170,
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {crmSegments?.map((segment, index) => (
                <>
                  <TableRow
                    className={`faq-box my-1 position-relative text-right rtl`}
                    style={{
                      borderBottom: `${
                        crmSegments?.length - 1 === index
                          ? ""
                          : "1px solid #E4E6E7"
                      }`,
                      padding: "24px 0",
                      overflowX: "hidden",
                      height: 72,
                    }}
                  >
                    <TableCell
                      className="text-nowrap"
                      align="right"
                      style={{ fontSize: "16px", fontWeight: 600 }}
                    >
                      {englishNumberToPersianNumber(
                        moment(segment?.created_at).format("jYYYY/jMM/jDD")
                      )}
                    </TableCell>
                    <TableCell
                      className="text-nowrap"
                      align="right"
                      style={{ fontSize: "16px", fontWeight: 600 }}
                    >
                      {segment?.title}
                    </TableCell>
                    <TableCell
                      className="text-nowrap"
                      align="right"
                      style={{ fontSize: "16px", fontWeight: 600 }}
                    >
                      {segment?.levels
                        ? segment?.levels.map((crm_level, i) => (
                            <>
                              <span>{crm_level?.title}</span>
                              {i + 1 !== segment?.levels?.length &&
                              segment?.levels?.length !== 1 ? (
                                <span>,</span>
                              ) : (
                                ""
                              )}
                            </>
                          ))
                        : "-"}
                    </TableCell>
                    <TableCell
                      className="text-nowrap"
                      align="right"
                      style={{ fontSize: "16px", fontWeight: 600 }}
                    >
                      {segment?.labels
                        ? segment?.labels.map((new_label, i) => (
                            <>
                              <span>{new_label?.title}</span>
                              {i + 1 !== segment?.labels?.length &&
                              segment?.labels?.length !== 1 ? (
                                <span>,</span>
                              ) : (
                                ""
                              )}
                            </>
                          ))
                        : "-"}
                    </TableCell>
                    <TableCell
                      className="text-nowrap"
                      align="right"
                      style={{ fontSize: "16px", fontWeight: 600 }}
                    >
                      <span
                        style={{
                          borderBottom: "1px solid #87009B",
                          color: "#87009B",
                        }}
                      >
                        <Link
                          href={`${adminUrlPrefix}crm/segments/${segment.id}`}
                        >
                          View details
                        </Link>
                      </span>
                    </TableCell>
                    {/* <TableCell
                      className="text-nowrap"
                      align="right"
                      style={{ fontSize: "16px", fontWeight: 600 }}
                    >
                      <Button
                        onClick={(e) =>
                           {
                            e.stopPropagation()
                            setSelectedSegment(segment.id)
                            setIsDeleteModalOpen(true)}
                          }
                        style={{ padding: 0, minWidth: 60 }}
                      >
                        <Image
                          alt=""
                          className="cursor-pointer"
                          width={24}
                          height={50}
                          src="/images/Delete 2.svg"
                        />
                      </Button>
                    </TableCell> */}
                  </TableRow>
                </>
              ))}
            </TableBody>
          )}
        </Table>
        <TablePagination
          style={{
            width: "100%",
            height: 50,
            position: "sticky",
            top: 0,
          }}
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
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={segmentsPagination?.count}
          rowsPerPage={pagination?.page_size}
          page={pagination?.page}
          onChangePage={onPageChange}
          onChangeRowsPerPage={onPageSizeChange}
          SelectProps={{
            renderValue: () =>
              englishNumberToPersianNumber(pagination?.page_size),
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
      </TableContainer>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  crmSegments: makeSelectCrmSegments(),
});
function mapDispatchToProps(dispatch) {
  return {
    _getCrmSegments: () => dispatch(getCrmSegments()),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMSegments);
