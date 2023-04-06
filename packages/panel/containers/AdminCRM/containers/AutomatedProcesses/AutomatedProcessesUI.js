import React from "react";
import AdminBreadCrumb from "../../../AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import router from "next/router";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import moment from "moment-jalaali";
import Switch from "@saas/components/Switch";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import { Skeleton } from "@material-ui/lab";
import Link from "next/link";
import TablePagination from "@material-ui/core/TablePagination";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

const tableHead = [
  {
    id: 0,
    label: "created at",
    align: "right",
    minWidth: 100,
    width: 220,
    maxWidth: 200,
  },
  {
    id: 1,
    label: "Name of the process",
    align: "right",
    minWidth: 100,
    width: 400,
    maxWidth: 200,
  },
  {
    id: 4,
    label: "",
    align: "right",
    minWidth: 100,
    width: 300,
    maxWidth: 300,
  },
];

function AutomatedProcess({ props }) {
  const {
    theme,
    loading,
    urlPrefix,
    automatedProcesses,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    onToggleAutomatedProcessStatus,
    selectedAutomatedProcess,
    onDeleteAutomatedProcess,
    au,
    isMobile,
    pagination,
    onPageChange,
    onPageSizeChange,
    automatedProcessesPagination,
  } = props;

  return (
    <div className="container">
      <AdminBreadCrumb
        responsive={false}
        overrideCurrentLinkWith={au?.title}
        buttons={
          <div className="d-flex">
            <Button
              color="primary"
              variant="contained"
              onClick={() =>
                router.push(
                  `${urlPrefix}/crm/automated_processes/${au.type}/new`
                )
              }
            >
              Build new automated trend
            </Button>
          </div>
        }
      />
      <div className="w-100 d-flex flex-column align-items-center position-relative">
        <AssuranceDialog
          isOpen={isDeleteModalOpen}
          closeDialogHandler={() => setIsDeleteModalOpen(false)}
          contentText="Are you sure to save changes?"
          dialogSecondActionTextColor="primary"
          dialogMainActions={() => {
            onDeleteAutomatedProcess(selectedAutomatedProcess);
            setIsDeleteModalOpen(false);
          }}
          dialogMainActionText="Yes"
          dialogSecondActions={() => setIsDeleteModalOpen(false)}
          dialogSecondActionText="Good"
        />
        <div>
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
              {loading ? (
                <TableBody>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <TableRow key={item} style={{ height: 53 }}>
                      {[1, 2, 3].map((item) => (
                        <TableCell key={item}>
                          <Skeleton
                            style={{
                              transform: "scale(1)",
                              height: 40,
                              padding: "24px 0",
                              align: "right",
                              minWidth: 180,
                              width: 200,
                              maxWidth: 200,
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {automatedProcesses
                    ?.sort(
                      (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    )
                    ?.map((automatedProcess, index) => {
                      return (
                        <TableRow
                          key={automatedProcess.id}
                          className={`faq-box my-1 position-relative text-right cursor-pointer rtl`}
                          style={{
                            borderBottom: `${
                              automatedProcesses?.length - 1 === index
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
                              moment(automatedProcess?.created_at).format(
                                "jYYYY/jMM/jDD"
                              )
                            )}
                          </TableCell>
                          <TableCell
                            className="text-nowrap"
                            align="right"
                            style={{ fontSize: "16px", fontWeight: 600 }}
                          >
                            {automatedProcess?.title}
                          </TableCell>
                          <TableCell
                            className="text-nowrap"
                            align="left"
                            style={{ fontSize: "16px", fontWeight: 600 }}
                          >
                            <div className="d-flex align-items-center">
                              <div
                                style={{ width: 100 }}
                                className="d-flex align-items-center justify-content-end"
                              >
                                <div>
                                  {automatedProcess.is_active
                                    ? "active"
                                    : "Inactive"}
                                </div>
                                <Switch
                                  className="d-flex mx-2"
                                  onColor={theme.palette.primary.main}
                                  isSwitchOn={automatedProcess.is_active}
                                  toggleSwitch={() =>
                                    onToggleAutomatedProcessStatus(
                                      automatedProcess.id,
                                      automatedProcess.is_active
                                    )
                                  }
                                />
                              </div>
                              {/* <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAutomatedProcess(
                                    automatedProcess.id
                                  );
                                  setIsDeleteModalOpen(true);
                                }}
                                style={{ padding: 0, minWidth: 60 }}
                              >
                                <Image
                                  alt=""
                                  className="cursor-pointer"
                                  width={24}
                                  height={50}
                                  src="/images/Delete 2.svg"
                                />
                              </Button> */}
                              <span
                                style={{
                                  borderBottom: "1px solid #87009B",
                                  color: "#87009B",
                                }}
                              >
                                <Link
                                  href={`${urlPrefix}crm/automated_processes/${au.type}/${automatedProcess.id}`}
                                >
                                  View details
                                </Link>
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              )}
            </Table>
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
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: 12,
                fontWeight: 400,
              }}
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={automatedProcessesPagination?.count}
              rowsPerPage={pagination?.page_size}
              page={pagination?.page}
              onChangePage={onPageChange}
              onChangeRowsPerPage={onPageSizeChange}
              SelectProps={{
                renderValue: () =>
                  englishNumberToPersianNumber(pagination?.page_size),
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
            />
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default AutomatedProcess;
