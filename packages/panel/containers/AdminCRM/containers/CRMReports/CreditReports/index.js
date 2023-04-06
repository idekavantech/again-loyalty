import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import AdminBreadCrumb from "../../../../AdminBreadCrumb";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import jMoment from "moment-jalaali";
import { useCRMReport } from "./useCreditReports";
import CreditReportTable from "./creditReportsTable";
import CustomCalendar from "@saas/components/CustomCalendar";
import Button from "@material-ui/core/Button";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { Popover } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

function CRMReports() {
  const {
    AUTOMATED_PROCESS,
    creditTypes,
    isLoading,
    onCreditReportTypeChange,
    tableHeaders,
    selectedCreditReport,
    reportData,
    isDateModalOpen,
    dateRange,
    setDateRange,
    handleClose,
    handleOpen,
    submitDateRange,
  } = useCRMReport();

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <AdminBreadCrumb />
      </div>
      <div className="d-flex flex-column"></div>
      <Paper elevation={1} style={{ marginTop: 8, minHeight: 500 }}>
        <div
          className="d-flex justify-content-between flex-wrap"
          style={{ padding: 24, paddingBottom: 20 }}
        >
          <div className=" w-100 d-flex flex-wrap">
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 mb-2">
              <div className="crmReportsDatePicker d-flex justify-content-between align-items-center">
                <Button
                  style={{
                    width: "100%",
                    direction: "rtl",
                    display: "flex",
                  }}
                  onClick={handleOpen}
                  variant="outlined"
                >
                  <div className="d-flex justify-content-between w-100">
                    از{" "}
                    <span className="px-2">
                      {englishNumberToPersianNumber(
                        formatDateObjectToNormal(dateRange?.from)
                      )}
                    </span>
                    تا{" "}
                    <span className="px-2">
                      {englishNumberToPersianNumber(
                        formatDateObjectToNormal(dateRange?.to)
                      )}
                    </span>
                  </div>
                </Button>
                <Popover
                  anchorOrigin={{
                    vertical: 195,
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={isDateModalOpen}
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
                      selectedDayRange={dateRange}
                      setSelectedDayRange={setDateRange}
                      submitDate={submitDateRange}
                    />
                  </div>
                </Popover>
              </div>
            </div>
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 mb-2">
              <Select
                className="w-100 mb-3"
                style={{
                  minWidth: 150,
                  flex: 1,
                  borderRadius: 4,
                  height: 36,
                }}
                value={creditTypes || []}
                margin="dense"
                variant="outlined"
                displayEmpty
                size="large"
                renderValue={() => selectedCreditReport?.label}
                onChange={onCreditReportTypeChange}
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
                {creditTypes.map((creditType) => {
                  return (
                    <MenuItem key={creditType.id} value={creditType}>
                      {creditType.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
        <div className=" mx-4 px-5 pb-2 pt-2">
          {selectedCreditReport.type === AUTOMATED_PROCESS
            ? "در این گزارش روندهای خودکاری که از نوع اعتبار یا کش بک هستند نمایش داده میشود"
            : "در این گزارش  کمپین هایی که از نوع اعتبار هستند نمایش داده میشود"}
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
            {`گزارش ${selectedCreditReport.label}`}
          </p>
        </div>
        <CreditReportTable
          reportData={reportData}
          loading={isLoading}
          tableHeaders={tableHeaders}
          selectedCreditReport={selectedCreditReport}
        />
      </Paper>
    </div>
  );
}

export default memo(CRMReports);
