import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AssuranceDialog from "@saas/components/AssuranceDialog";
import Link from "next/link";
import Chip from "@material-ui/core/Chip";
import AddIcon from "@material-ui/icons/Add";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { AddNoteModal } from "../../../AdminShopping/containers/AdminOrder/containers/Modals/AddNoteModal";
import moment from "moment";
import { satisfactionTitle } from "store/constants";
import { SelectLabelmodal } from "../modals/selectLabelmodal";
import { useCRMMembershipDetail } from "./useCRMMembershipDetail";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import SingleDatePicker from "@saas/components/SingleDatePicker";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import { months, availableOnDayOptions } from "store/constants";

function CRMMembershipDetail({}) {
  const {
    isLoading,
    adminUrlPrefix,
    crmLabels,
    CRMMembership,
    _addNote,
    router,
    theme,
    walletBalance,
    crmGiftCreditRef,
    openSaveModal,
    setOpenSaveModal,
    selectedLabels,
    setSelectedLabels,
    isSearchModalOpen,
    toggleSearchModal,
    submit,
    crmWalletCredit,
    setCrmWalletCredit,
    isAddNoteModalOpen,
    setAddNoteModalOpen,
    handleSelectInput,
    crmMemberShipData,
    setCrmMemberShipData,
    crmGiftCredit,
    setCrmGiftCredit,
    crmPointCredit,
    setCrmPointCredit,
    userReportTypes,
    membershipEventLogs,
    onBirthDateChange,
    onMarriageDateChange,
    membershipLogsQuery,
    isMobile,
    onPageChange,
    onPageSizeChange,
    membershipEventLogsPagination,
  } = useCRMMembershipDetail();

  let prevDate = null;

  const formatDate = (date) => {

    const year = moment(date).format("YYYY");
    const month = moment(date).format("MM")
    const day = moment(date).format("DD");

    const isToday = moment(date).isSame(moment(), "day");

    const weekDay = availableOnDayOptions.find(
      (day) => day.id === new Date(date).getDay()
    )?.text;
    return persianToEnglishNumber(`${isToday ? "Today" : weekDay} - ${year}/${month}/${day} `);
  };

  if (isLoading) {
    return <LoadingIndicator height="80vh" />;
  } else {
    return (
      <div className="container">
        <AddNoteModal
          isOpen={isAddNoteModalOpen}
          onClose={() => setAddNoteModalOpen(false)}
          submit={(note) => _addNote({ id: CRMMembership.id, comment: note })}
        />

        <Head>
          <title>Customer Name</title>
        </Head>

        <AdminBreadCrumb
          buttons={
            <div className="d-flex w-100">
              <Button
                color="primary"
                variant="contained"
                className="py-2 px-4 w-100"
                onClick={() => {
                  setOpenSaveModal(true);
                }}
                disabled={isLoading}
              >
                Save changes
              </Button>
            </div>
          }
          overrideCurrentLinkWith={crmMemberShipData.name}
        />
        <Paper elevation={3} style={{ padding: 24 }}>
          <p
            style={{
              color: "#202223",
              fontsize: 16,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Customer specifications
          </p>
          <div className="row d-flex align-items-center justify-content-around">
            <div className="col-12 col-lg-2">
              <div
                style={{
                  width: 68,
                  height: 68,
                  backgroundColor: "#F6F6F7",
                  border: "1px dashed #D2D5D8",
                  borderRadius: 8,
                }}
              ></div>
            </div>
            <div className="ml-0 my-3 my-lg-0 col-12 col-lg-5 pr-lg-0">
              <p style={{ fontsize: 12, fontWeight: 600 }} className="mb-2">
                Full name 
              </p>
              <input
                onChange={(e) =>
                  setCrmMemberShipData({
                    ...crmMemberShipData,
                    name: e.target.value,
                  })
                }
                value={crmMemberShipData.name}
                style={{
                  width: "100%",
                  fontSize: 14,
                  fontWeight: 400,
                  border: "1px solid #E4E6E7",
                  color: "#6D717",
                  padding: "8px 6px",
                  borderRadius: 8,
                }}
              />
            </div>
            <div className="col-12 col-lg-5">
              <p
                style={{
                  fontsize: 12,
                  fontWeight: 600,
                }}
                className="mb-2"
              >
                phone number
              </p>
              <input
                onChange={(e) =>
                  setCrmMemberShipData({
                    ...crmMemberShipData,
                    user: { ...crmMemberShipData.user, phone: e.target.value },
                  })
                }
                value={crmMemberShipData.user.phone}
                style={{
                  width: "100%",
                  fontSize: 14,
                  fontWeight: 400,
                  border: "1px solid #E4E6E7",
                  color: "#6D717",
                  padding: "8px 6px",
                  borderRadius: 8,
                  direction: "ltr",
                  textAlign: "right",
                }}
              />
            </div>
          </div>
        </Paper>
        <Divider style={{ background: "#E4E6E7", margin: "24px 0" }} />
        <Paper elevation={3} style={{ padding: 24 }}>
          <p
            style={{
              color: "#202223",
              fontsize: 16,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            customer information
          </p>
          <div className="d-flex align-items-center justify-content-around row">
            <div className="col-12 col-lg-3 mb-4 mb-lg-0">
              <p
                style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
                className="mb-2"
              >
                Customer satisfaction{" "}
              </p>
              <div
                className="px-4 py-2"
                style={{ border: "1px solid #E4E6E7", borderRadius: 8 }}
              >
                <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                  {CRMMembership?.aggregated_data?.review?.satisfaction
                    ? satisfactionTitle(
                        CRMMembership?.aggregated_data?.review?.satisfaction
                      )
                    : "-"}
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-3 mb-4 mb-lg-0">
              <p
                style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
                className="mb-2"
              >
                Rating
              </p>
              <div
                className="px-4 py-2 d-flex align-items-center justify-content-between"
                style={{
                  border: "1px solid #E4E6E7",
                  borderRadius: 8,
                  height: 38,
                }}
              >
                <input
                  value={englishNumberToPersianNumber(crmPointCredit)}
                  onChange={(e) =>
                    setCrmPointCredit(persianToEnglishNumber(e.target.value))
                  }
                  ref={walletBalance}
                  style={{
                    width: "50%",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#6D717",
                    padding: "8px 6px",
                  }}
                />
                {/* <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                {CRMMembership?.level ? CRMMembership?.level?.title : "-"}
              </p> */}
              </div>
            </div>
            <div className="col-12 col-lg-3 mb-4 mb-lg-0">
              <p
                style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
                className="mb-2"
              >
                Gift credit
              </p>
              <div
                className="d-flex align-items-center justify-content-between px-4"
                style={{
                  border: "1px solid #E4E6E7",
                  borderRadius: 8,
                  height: 38,
                }}
                onClick={() => handleSelectInput(crmGiftCreditRef)}
              >
                <input
                  value={priceFormatter(crmGiftCredit)}
                  onChange={(e) => setCrmGiftCredit(e.target.value)}
                  ref={walletBalance}
                  style={{
                    width: "50%",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#6D717",
                    padding: "8px 6px",
                  }}
                />
                <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                  ${" "}
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <p
                style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
                className="mb-2"
              >
                Wallet inventory
              </p>
              <div
                className="d-flex align-items-center justify-content-between px-4"
                style={{ border: "1px solid #E4E6E7", borderRadius: 8 }}
                onClick={() => handleSelectInput(walletBalance)}
              >
                <input
                  value={priceFormatter(crmWalletCredit)}
                  onChange={(e) => setCrmWalletCredit(e.target.value)}
                  ref={walletBalance}
                  style={{
                    width: "50%",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#6D717",
                    padding: "8px 6px",
                  }}
                />
                <p style={{ fontsize: 14, fontweight: 400, color: "#8C9196" }}>
                  ${" "}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center row mt-4">
            <div className="col-12 col-lg-3 mb-4 mb-lg-0">
              <p
                style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
                className="mb-2"
              >
                Date of birth
              </p>
              <div
                className="discountDatePicker d-flex align-items-center pl-4"
                style={{ border: "1px solid #E4E6E7", borderRadius: 8 }}
              >
                <SingleDatePicker
                  inputProps={{
                    style: {
                      width: "100%",
                      height: 42,
                      padding: "0 14px",
                    },
                  }}
                  disableFuture={true}
                  selectedDate={crmMemberShipData?.birth_date}
                  handleDateChange={onBirthDateChange}
                  placeholder="۰۰/ ۰۰/ ۰۰"
                />
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.3333 2.00033H11.6666V0.666992H10.3333V2.00033H3.66665V0.666992H2.33331V2.00033H1.66665C0.933313 2.00033 0.333313 2.60033 0.333313 3.33366V14.0003C0.333313 14.7337 0.933313 15.3337 1.66665 15.3337H12.3333C13.0666 15.3337 13.6666 14.7337 13.6666 14.0003V3.33366C13.6666 2.60033 13.0666 2.00033 12.3333 2.00033ZM12.3333 14.0003H1.66665V5.33366H12.3333V14.0003Z"
                    fill="black"
                    fillOpacity="0.54"
                  />
                </svg>
              </div>
            </div>
            <div className="col-12 col-lg-3 mb-4 mb-lg-0">
              <p
                style={{ fontsize: 12, fontWeight: 600, whiteSpace: "nowrap" }}
                className="mb-2"
              >
                The date of marriage
              </p>
              <div
                className="discountDatePicker d-flex align-items-center pl-4"
                style={{ border: "1px solid #E4E6E7", borderRadius: 8 }}
              >
                <SingleDatePicker
                  inputProps={{
                    style: {
                      width: "100%",
                      height: 42,
                      padding: "0 14px",
                    },
                  }}
                  disableFuture={true}
                  selectedDate={crmMemberShipData?.marriage_date}
                  handleDateChange={onMarriageDateChange}
                  placeholder="۰۰/ ۰۰/ ۰۰"
                />
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.3333 2.00033H11.6666V0.666992H10.3333V2.00033H3.66665V0.666992H2.33331V2.00033H1.66665C0.933313 2.00033 0.333313 2.60033 0.333313 3.33366V14.0003C0.333313 14.7337 0.933313 15.3337 1.66665 15.3337H12.3333C13.0666 15.3337 13.6666 14.7337 13.6666 14.0003V3.33366C13.6666 2.60033 13.0666 2.00033 12.3333 2.00033ZM12.3333 14.0003H1.66665V5.33366H12.3333V14.0003Z"
                    fill="black"
                    fillOpacity="0.54"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Paper>

        <Paper elevation={3} style={{ padding: 24 }} className="mt-3">
          <div className="d-flex align-items-center justify-content-around">
            <div style={{ width: "100%" }}>
              <div className="d-flex align-items-center justify-content-between">
                <p
                  style={{
                    fontsize: 12,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                  className="mb-2"
                >
                  Customer segmentation{" "}
                </p>
                <div className="d-flex align-items-center mb-2">
                  <Link
                    passHref
                    href={`${adminUrlPrefix}crm/segments`}
                    className="cursor-pointer"
                    style={{
                      fontsize: 12,
                      fontweight: 400,
                      color: theme.palette.primary.main,
                    }}
                  >
                    Customer segmentation settings
                  </Link>
                  <div className="mr-1 d-flex">
                    <ArrowBackIosIcon
                      style={{ color: theme.palette.primary.main, width: 10 }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex align-items-center flex-wrap px-4 pt-3"
                style={{
                  width: "100%",
                  fontSize: 14,
                  fontWeight: 400,
                  border: "1px solid #E4E6E7",
                  color: "#6D717",
                  borderRadius: 8,
                }}
              >
                {CRMMembership?.segments?.map((crmSegment) => (
                  <Chip
                    key={crmSegment.id}
                    className="ml-4 mb-4"
                    style={{
                      backgroundColor: "#F6F6F7",
                      borderRadius: 8,
                      fontsize: 14,
                      fontweight: 400,
                      color: "#6D7175",
                    }}
                    label={crmSegment.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </Paper>
        <Paper elevation={3} style={{ padding: 24 }} className="mt-3">
          <div className="d-flex align-items-center justify-content-around">
            <div style={{ width: "100%" }}>
              <div className="d-flex align-items-center justify-content-between">
                <p
                  style={{
                    fontsize: 12,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                  className="mb-2"
                >
                  customer labels
                </p>
                <div className="d-flex align-items-center mb-2">
                  <Link
                    className="cursor-pointer"
                    style={{
                      fontsize: 12,
                      fontweight: 400,
                      color: theme.palette.primary.main,
                    }}
                    passHref
                    href={`${adminUrlPrefix}crm/labels`}
                  >
                    Tag settings
                  </Link>
                  <div className="mr-1 d-flex">
                    <ArrowBackIosIcon
                      style={{ color: theme.palette.primary.main, width: 10 }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="d-flex align-items-center flex-wrap px-4 pt-3"
                style={{
                  width: "100%",
                  fontSize: 14,
                  fontWeight: 400,
                  border: "1px solid #E4E6E7",
                  color: "#6D717",
                  borderRadius: 8,
                  // height
                }}
              >
                {selectedLabels &&
                  Object.keys(selectedLabels)?.map((i) => {
                    return (
                      <Chip
                        deleteIcon={
                          <ClearRoundedIcon
                            style={{ color: theme.palette.text.disabled }}
                          />
                        }
                        style={{
                          backgroundColor: "#F6F6F7",
                          borderRadius: 8,
                          fontsize: 14,
                          fontweight: 400,
                          color: "#6D7175",
                        }}
                        className="ml-2 mb-2 py-2"
                        onDelete={() => {
                          const _selectedLabels = { ...selectedLabels };
                          delete _selectedLabels[selectedLabels[i].id];
                          setSelectedLabels({ ..._selectedLabels });
                        }}
                        label={selectedLabels[i].title}
                        key={selectedLabels[i].id}
                      />
                    );
                  })}
                <SelectLabelmodal
                  isOpen={isSearchModalOpen}
                  onClose={() => toggleSearchModal(false)}
                  labels={crmLabels}
                  loading={isLoading}
                  selectedLabels={selectedLabels}
                  setSelectedLabels={setSelectedLabels}
                />
                <Button
                  onClick={() => toggleSearchModal(true)}
                  className="px-3 mb-2"
                  style={{
                    border: `1px dashed ${theme.palette.primary.main}`,
                    color: `${theme.palette.primary.main}`,
                    fontsize: 14,
                    fontweight: 400,
                  }}
                >
                  <AddIcon />
                  <span className="mr-3">Add label</span>
                </Button>
              </div>
            </div>
          </div>
        </Paper>
        <Paper elevation={3} style={{ padding: 24 }} className="mt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div style={{ fontWeight: 500, fontSize: 16 }}>Note</div>
            <div>
              <Button
                color="primary"
                size="small"
                disabled={isLoading}
                style={{ direction: "ltr" }}
                endIcon={<AddRoundedIcon fontSize="small" />}
                onClick={() => setAddNoteModalOpen(true)}
              >
                Add
              </Button>
            </div>
          </div>
          {CRMMembership?.history?.length ? (
            <div
              className="px-5"
              style={{
                fontSize: 13,
                border: "1px solid #E4E6E7",
                borderRadius: 8,
              }}
            >
              {CRMMembership?.history?.map((comment) => (
                <div key={comment?.created_at} className=" pt-4 pb-4">
                  <p className="d-flex justify-content-between">
                    <span
                      style={{
                        color: theme.palette.text.tertiary,
                        fontWeight: 500,
                        fontSize: 12,
                      }}
                    >
                      {CRMMembership?.user?.name || "User without name"}
                    </span>
                    <span style={{ fontSize: 12 }}>
                      {englishNumberToPersianNumber(
                        moment(comment?.created_at).format("YYYY/MM/DD")
                      )}
                    </span>
                  </p>

                  <p className=" pt-4" style={{ fontSize: 14 }}>
                    {comment.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: 13 }}>Not recorded.</div>
          )}
        </Paper>
        {Object.keys(CRMMembership?.utm_data || {}).length ? (
          <Paper elevation={3} style={{ padding: 24 }} className="mt-3">
            <div
              className="p-5 direction-ltr text-left"
              style={{ border: "1px solid #E4E6E7", borderRadius: 8 }}
            >
              <div>
                UTM Medium:{" "}
                <span style={{ color: theme.palette.primary.main }}>
                  {CRMMembership?.utm_data?.medium || "-"}
                </span>
              </div>
              <div className="mt-2">
                UTM Source:{" "}
                <span style={{ color: theme.palette.primary.main }}>
                  {CRMMembership?.utm_data?.source || "-"}
                </span>
              </div>
              <div className="mt-2">
                Site Referer:{" "}
                <span style={{ color: theme.palette.primary.main }}>
                  {CRMMembership?.utm_data?.referer || "-"}
                </span>
              </div>
            </div>
          </Paper>
        ) : null}
        {membershipEventLogs && membershipEventLogs.length > 0 && (
          <Paper elevation={3} style={{ padding: 24 }} className="mt-3">
            <div className="d-flex align-items-center justify-content-between">
              <div style={{ fontWeight: 500, fontSize: 16 }}>
                Report of customer records
              </div>
            </div>
            <Table className="mt-4">
              <TableBody>
                {membershipEventLogs?.map((report) => {
                  const isSameDate = moment(report.created_at).isSame(
                    prevDate,
                    "day"
                  );
                  if (!isSameDate) {
                    prevDate = report.created_at;
                  }
                  return (
                    <>
                      {!isSameDate && report.event_type in userReportTypes && (
                        <>
                          <div
                            style={{
                              borderBottom: "solid 1px rgba(0,0,0,.2)",
                              direction: "rtl",
                              background: "#EEEEEE",
                            }}
                            className="mx-2"
                          >
                            <div className="py-2 px-3">
                              {formatDate(report.created_at)}
                            </div>
                          </div>
                        </>
                      )}
                      {userReportTypes[report.event_type] && (
                        <div
                          style={{
                            borderTop: isSameDate
                              ? "solid 1px rgba(0,0,0,.2)"
                              : "none",
                            direction: "rtl",
                          }}
                          className="mx-2"
                        >
                          <div className="py-3">
                            {userReportTypes[report.event_type](report)}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              </TableBody>
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
                rowsPerPageOptions={[20, 50, 100]}
                component="div"
                count={membershipEventLogsPagination.count}
                rowsPerPage={membershipLogsQuery.page_size}
                page={membershipLogsQuery.page}
                onChangePage={onPageChange}
                onChangeRowsPerPage={onPageSizeChange}
                SelectProps={{
                  renderValue: () =>
                    englishNumberToPersianNumber(membershipLogsQuery.page_size),
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
            </Table>
          </Paper>
        )}

        <AssuranceDialog
          isOpen={openSaveModal}
          closeDialogHandler={() => setOpenSaveModal(false)}
          contentText="Are you sure to save changes?"
          dialogSecondActionTextColor="primary"
          dialogMainActions={() => {
            submit();
            setOpenSaveModal(false);
            router.back();
          }}
          dialogMainActionText="Yes"
          dialogSecondActions={() => setOpenSaveModal(false)}
          dialogSecondActionText="No"
        />
      </div>
    );
  }
}

export default memo(CRMMembershipDetail);
