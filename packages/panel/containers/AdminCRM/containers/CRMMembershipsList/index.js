import React, { memo } from "react";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Input from "@saas/components/Input";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import CRMMembershipsListTable from "./components/CRMMembershipsListTable";
import CreateCRMMembership from "./components/CreateCRMMembership";
import Chip from "@material-ui/core/Chip";
import { useCRMMembershipsList } from "./useCRMMembershipsList";
import CRMMembershipLabelModal from "./components/CRMMembershipLabelsModal";
import Radio from "@material-ui/core/Radio";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import { CircularProgress, Popover } from "@material-ui/core";
import { formatDateObjectToNormal } from "utils/helpers";
import CustomCalendar from "@saas/components/CustomCalendar";
import CloseIcon from "@material-ui/icons/Close";
import ImportUserGroupModal from "./components/importUserGroupModal";
import AddIcon from '@mui/icons-material/Add';

const StyledMenu = withStyles({
  paper: {
    width: 130,
  },
})((props) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    style={{ width: "100%" }}
    {...props}
  />
));

function CRMMembershipsList() {


  const useCRMMembershipsListProps = useCRMMembershipsList()

  const {
    loading,
    initialFilterParams,
    membershipByQuery,
    membershipPaginationByQuery,
    adminUrlPrefix,
    handleOpenImportUsersModal,
    labels,
    router,
    theme,
    maxWidth768,
    search,
    handleChangePage,
    handleChangeRowsPerPage,
    clearSearch,
    createCRMMembership,
    isCreateCRMMembershipSubmitButtonDisabled,
    isCreateCRMMembershipModalOpen,
    openCreateCRMMembershipModal,
    closeCreateCRMMembershipModal,
    CRMMembershipData,
    onCRMMembershipNameChange,
    onCRMMembershipPhoneChange,
    handleCRMLabelClick,
    handleCRMLabelItemClick,
    sortingOptions,
    FROM,
    TO,
    description_choices,
    onSearchMembershipChange,
    onLabelMembershipChange,
    onOrderMembershipsChange,
    onMediumChange,
    orderCountRange,
    onOrderCreditRangeChange,
    pointCreditRange,
    onCreditPointChange,
    onClearAllFilters,
    onMembershipClick,
    selectedMembershipIds,
    submitLabel,
    isLabelsModalOpen,
    handleLableModalOpen,
    handleLableModalClose,
    selectedSortingOption,
    onClearMembershipOrder,
    onCRMMembershipHeaderCheckboxClick,
    anchorEl,
    setAnchorEl,
    downloadFullExcelFile,
    downloadFileLoading,
    handleCRMLastOrderDateChange,
    isDateModalOpen,
    handleOpen,
    handleClose,
    lastOrderDateRange,
    setLastOrderDateRange
  } = useCRMMembershipsListProps;

  const membershipsFilterParams = Object.assign(
    { ...initialFilterParams },
    router.query
  );

  return (
    <div className="container">
      <Head>
        <title>Club customer list</title>
      </Head>
      <AdminBreadCrumb
        submitButtonHasPlus
        buttons={
          <>
            <Button
              className="mx-2 pl-1"
              style={{ background: theme.palette.primary.main, color: "white" }}
              variant="contained"
              startIcon={<AddIcon className="ml-3" />}
              onClick={openCreateCRMMembershipModal}
            >
              new customer
            </Button>
            <Button
              className="mx-2 pl-1"
              style={{
                color: theme.palette.primary.main,
                backgroundColor: "white",
                border: `solid 2px ${theme.palette.primary.main}`,
              }}
              variant="outlined"
              startIcon={<AddIcon className="ml-3" />}
              onClick={handleOpenImportUsersModal}
            >
              Add a group of customers
            </Button>
          </>
        }
      />
      <CRMMembershipLabelModal
        isLabelsModalOpen={isLabelsModalOpen}
        handleLableModalClose={handleLableModalClose}
        labels={labels}
        selectedMembershipIds={selectedMembershipIds}
        submitLabel={submitLabel}
      />
      <ImportUserGroupModal {...useCRMMembershipsListProps} />

      <Paper elevation={1} className="crm-search mt-3" style={{ padding: "24px 0" }}>
        <div className="w-100 flex-column d-flex flex-wrap px-4 mt-1">
          <div className="px-2 mb-4 d-flex justify-content-between">
            <div className="col-lg-6 col-md-9 col-sm-9 pr-2 pl-0">
              <Input
                style={{
                  direction: search?.[0] === "+" || search?.[0] === "0" ? "ltr" : "rtl",
                }}
                size="small"
                value={search}
                fullWidth={false}
                onChange={onSearchMembershipChange}
                placeholder="Customer Search Based on Number or Name"
                inputProps={{
                  className: "pr-5 mr-2",
                }}
                InputProps={{
                  startAdornment: (
                    <>
                      {router.query.search ? (
                        <InputAdornment
                          style={{ position: "absolute", left: 3 }}
                          className="u-cursor-pointer"
                          position="start"
                          onClick={clearSearch}
                        >
                          <ClearRoundedIcon style={{ color: theme.palette.text.disabled }} />
                        </InputAdornment>
                      ) : null}
                      <InputAdornment
                        style={{ position: "absolute", right: 0 }}
                        className={`u-cursor-pointer u-pointer-events-none`}
                        position="start"
                      >
                        <SearchRoundedIcon
                          className="ml-1"
                          style={{ color: theme.palette.text.disabled }}
                          fontSize="small"
                        />
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            </div>
            <div className="" style={{ marginInlineStart: "auto" }}>
              <Button
                disabled={downloadFileLoading}
                variant="contained"
                color="primary"
                className="u-box-shadow-none u-fontMedium"
                size="large"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                startIcon={
                  downloadFileLoading ? (
                    <CircularProgress color="success" size={20} />
                  ) : (
                    <KeyboardArrowDownRoundedIcon />
                  )
                }
                style={{ direction: "ltr" }}
              >
                Export
              </Button>
              <StyledMenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem className="px-2" onClick={downloadFullExcelFile}>
                  <ListItemText primary="Download Excel" className="text-center " />
                </MenuItem>
              </StyledMenu>
            </div>
          </div>
          <div className="px-2 col-12 col-lg-6 col-md-12 col-sm-12 mb-2 rtl_force">
            <Select
              className="w-100 mb-3"
              style={{
                minWidth: 150,
                flex: 1,
                borderRadius: 4,
                height: 36,
              }}
              value={sortingOptions || []}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                return `order by${!selectedSortingOption ? "Default mode" : selectedSortingOption.text}`;
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
              <MenuItem className="px-2" disabled key={"id"}>
                <div className="w-100 d-flex align-items-center">
                  <ListItemText primary="order by" className="text-left" />
                </div>
              </MenuItem>
              <MenuItem className="px-2">
                <div className="w-100 d-flex align-items-center row-rev" onClick={onClearMembershipOrder}>
                  <Radio
                    className="p-1"
                    size="small"
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    color="primary"
                    checked={!membershipsFilterParams.ordering}
                  />
                  <ListItemText primary="Default mode" className="text-left" />
                </div>
              </MenuItem>
              {sortingOptions?.map((sortOption) => {
                return (
                  <MenuItem
                    className="px-2 "
                    key={sortOption?.id}
                    value={sortOption}
                    onClick={() => onOrderMembershipsChange(sortOption)}
                  >
                    <div className="w-100 d-flex align-items-start row-rev">
                      <Radio
                        className="p-1"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        color="primary"
                        checked={membershipsFilterParams.ordering === sortOption?.keyword}
                      />
                      <ListItemText primary={sortOption?.text} className="text-left" />
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap flex-row-reverse px-4">
          <div className="px-2 mb-2">
            <Chip
              deleteIcon={<ClearRoundedIcon style={{ color: theme.palette.text.disabled }} />}
              style={{
                borderRadius: 4,
                background: theme.palette.background.secondary,
              }}
              onClick={onClearAllFilters}
              label="Remove all filters"
            />
          </div>
        </div>
        <div className="w-100 d-flex flex-wrap px-4 mt-1" style={{ marginTop: 24 }}>
          <div className="px-2 mb-3 col-12 col-lg-6 col-md-12 col-sm-12">
            <p style={{ fontWeight: 600 }}>Label</p>
            <Select
              style={{ height: "36px" }}
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={membershipsFilterParams?.label || ""}
              displayEmpty
              renderValue={(e) => {
                return labels && labels.find((label) => label?.id?.toString() === e)?.title;
              }}
              className="w-100"
              variant="outlined"
              onChange={onLabelMembershipChange}
            >
              {labels?.map?.((label) => (
                <MenuItem value={label} key={label}>
                  {label.title}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="col-12 col-lg-6 mt-md-0" style={{ padding: 0 }}>
            <div className="px-2 mb-3">
              <p style={{ fontWeight: 600 }}>Invite Link</p>
              <Select
                style={{ height: "36px" }}
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={membershipsFilterParams?.medium || ""}
                displayEmpty
                renderValue={() => {
                  return membershipsFilterParams?.utm_medium;
                }}
                className="w-100"
                variant="outlined"
                onChange={onMediumChange}
              >
                {description_choices?.map?.((choice) => (
                  <MenuItem value={choice} key={choice}>
                    {choice}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="w-100 d-flex flex-wrap px-4 mt-1" style={{ marginTop: 24 }}>
          <div className="col-12 col-lg-6 mb-3 mb-lg-0 px-2">
            <p style={{ fontWeight: 600 }}>Number of order</p>
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: 4,
                height: "36px",
              }}
              className="position-relative d-flex justify-content-between"
            >
              <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                <input
                  onChange={(e) => onOrderCreditRangeChange(e, FROM)}
                  value={orderCountRange?.from || ""}
                  className="w-100 text-center"
                  type="number"
                  placeholder="minimum number of order"
                />
              </div>
              <div className="px-3 d-flex justify-content-center align-items-center">To</div>
              <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                <input
                  onChange={(e) => onOrderCreditRangeChange(e, TO)}
                  value={orderCountRange?.to || ""}
                  className="w-100 text-center"
                  type="number"
                  placeholder="maximum number of order"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3 mb-lg-0 px-2">
            <p style={{ fontWeight: 600 }}>Rating</p>
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: 4,
                height: "36px",
              }}
              className="position-relative d-flex justify-content-between"
            >
              <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                <input
                  onChange={(e) => onCreditPointChange(e, FROM)}
                  value={pointCreditRange?.from || ""}
                  className="w-100 text-center"
                  type="number"
                  placeholder="Minimum rating"
                />
              </div>
              <div className="px-3 d-flex justify-content-center align-items-center">To</div>
              <div className="px-3 py-2 flex-1 d-flex justify-content-center">
                <input
                  onChange={(e) => onCreditPointChange(e, TO)}
                  value={pointCreditRange?.to || ""}
                  className="w-100 text-center"
                  type="number"
                  placeholder="Maximum rating"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 d-flex flex-wrap px-4 mt-4" style={{ marginTop: 24 }}>
          <div className="col-12 col-lg-6 mb-3 mb-lg-0 px-2 ltr_force">
            <p style={{ fontWeight: 600 }}>The last order date</p>
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: 4,
                height: "36px",
              }}
              className="position-relative d-flex justify-content-between"
            >
              <Button
                style={{
                  width: "100%",
                  direction: "rtl",
                  display: "flex",
                  border: "none",
                }}
                onClick={handleOpen}
                variant="outlined"
              >
                <div className="d-flex justify-content-between w-100">
                  <span className="px-2">
                    {englishNumberToPersianNumber(formatDateObjectToNormal(lastOrderDateRange?.to) ?? "--")}
                  </span>
                  To
                  <span className="px-2">
                    {englishNumberToPersianNumber(formatDateObjectToNormal(lastOrderDateRange?.from) ?? "--")}
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
                    selectedDayRange={lastOrderDateRange}
                    setSelectedDayRange={setLastOrderDateRange}
                    submitDate={handleCRMLastOrderDateChange}
                  />
                </div>
              </Popover>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3 mb-lg-0 px-2">
            <div className="position-relative d-flex flex-row-reverse">
              <div className="pl-2 mb-2 mt-5">
                <Button
                  style={{ height: 36 }}
                  color="primary"
                  variant="contained"
                  disabled={selectedMembershipIds.length === 0}
                  onClick={handleLableModalOpen}
                >
                  Apply a group label
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "0 24px 24px 0" }}></div>
        <CRMMembershipsListTable
          labels={labels}
          onCRMMembershipHeaderCheckboxClick={onCRMMembershipHeaderCheckboxClick}
          selectedMembershipIds={selectedMembershipIds}
          onMembershipClick={onMembershipClick}
          adminUrlPrefix={adminUrlPrefix}
          CRMmemberships={membershipByQuery}
          loading={loading}
        />
        <TablePagination
          labelRowsPerPage={!maxWidth768 ? "The number of rows per page" : ""}
          labelDisplayedRows={({ from, to, count }) =>
            `${englishNumberToPersianNumber(from)} - ${englishNumberToPersianNumber(to)} From${
              count !== -1 ? englishNumberToPersianNumber(count) : `more than${englishNumberToPersianNumber(to)}`
            }`
          }
          rowsPerPageOptions={[10, 25, 50, 100, 200]}
          component="div"
          count={Number(membershipPaginationByQuery?.count)}
          rowsPerPage={Number(membershipsFilterParams?.page_size)}
          page={Number(membershipsFilterParams?.page)}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          SelectProps={{
            renderValue: () => englishNumberToPersianNumber(Number(membershipsFilterParams?.page_size)),
            IconComponent: ArrowDropDownRoundedIcon,
          }}
          ActionsComponent={({ count, page, rowsPerPage, onChangePage }) => (
            <div className="">
              <IconButton onClick={() => onChangePage(page - 1)} disabled={page === 0} aria-label="previous page">
                <KeyboardArrowRight />
              </IconButton>
              <IconButton
                onClick={() => onChangePage(page + 1)}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
              >
                <KeyboardArrowLeft />
              </IconButton>
            </div>
          )}
        />
      </Paper>
      <CreateCRMMembership
        isOpen={isCreateCRMMembershipModalOpen}
        labels={labels}
        handleCRMLabelClick={handleCRMLabelClick}
        handleCRMLabelItemClick={handleCRMLabelItemClick}
        createCRMMembership={createCRMMembership}
        isSubmitButtonDisabled={isCreateCRMMembershipSubmitButtonDisabled}
        closeCreateCRMMembershipModal={closeCreateCRMMembershipModal}
        CRMMembershipData={CRMMembershipData}
        onCRMMembershipNameChange={onCRMMembershipNameChange}
        onCRMMembershipPhoneChange={onCRMMembershipPhoneChange}
      />
    </div>
  );
}

export default memo(CRMMembershipsList);
