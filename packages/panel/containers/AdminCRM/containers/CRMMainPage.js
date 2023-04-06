/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { memo, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import useTheme from "@material-ui/core/styles/useTheme";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Input from "@saas/components/Input";
import {
  makeSelectBusiness,
  makeSelectBusinessCRMLabelsMemberships,
  makeSelectBusinessCRMMemberships,
  makeSelectBusinessMembershipsPagination,
} from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  getCRMLabelMemberships,
  getCRMMembershipByQuery,
  getCRMMemberships,
  getCRMLabels,
} from "store/actions";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { getCustomersCount } from "@saas/stores/plugins/actions";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { useRouter } from "next/router";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Collapse from "@material-ui/core/Collapse";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { VISIT_CARD_PLUGIN } from "@saas/utils/constants/plugins";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {
  makeSelectCrmLabels,
  makeSelectCRMMemberShipsByQuery,
  makeSelectCRMMemberShipsPaginationByQuery,
} from "store/selectors";

const SEARCH_QUERY_KEY = "search";
let searchTimeoutId = null;

const headCells = [
  {
    id: "phone",
    align: "right",
    label: "customer number",
    fontWeigth: 600,
  },
  {
    id: "name",
    align: "right",
    label: "Customer Name",
    fontWeigth: 600,
  },
  {
    id: "giftCredit",
    align: "center",
    label: "Gift credit",
    fontWeigth: 600,
  },
  {
    id: "walletCredit",
    align: "center",
    label: "Credit of the wallet",
    fontWeigth: 600,
  },
];
function CRMMainPage({
  labels,
  _getLabelMemberships,
  labelsMembership,
  _getCRMMembershipsByQuery,
  membershipsPagination,
  _getCRMLabels,
  urlPrefix,
  business,
  membershipByquary,
  membershipPaginationByquary,
}) {
  const router = useRouter();
  const descriptionOption =
    business?.plugins_config?.crm?.data?.utm?.description_choices;
  const matches = useMediaQuery("(max-width:768px)");
  const [searchExpand, setSearchExpand] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchExpand2, setSearchExpand2] = useState(false);
  const [selectedLabel, selectLabel] = useState(null);
  const [isAllMembershipsSelected, selectAllMemebrships] = useState(true);
  const [category, setCategory] = useState({ id: "all", title: "All" });
  const [search, setSearch] = useState(router.query.search || "");
  const [selected, setSelected] = useState([]);
  const theme = useTheme();
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const [collapse, setCollapse] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const numSelected = selected.length;
  const [descriptions, setDescriptions] = useState([]);
  const [selectedDescriptions, setSelectedDescriptions] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (descriptionOption?.length && !router.query.utm_description) {
      setSelectedDescriptions([...descriptionOption]);
    }
  }, []);
  useEffect(() => {
    if (labels && !selectedLabel) {
      selectAllMemebrships(true);
    }
  }, [labels]);

  useEffect(() => {
    setTimeout(() => {
      _getCRMLabels();
      const queryDescription = {
        utm_description:
          selectedDescriptions.length == descriptions.length
            ? ""
            : selectedDescriptions,
      };
      const query = {
        id: selectedLabel?.id,
        page: page + 1,
        page_size: pageSize,
        search: search,
        ...queryDescription,
        ...router.query,
      };
      if (selectedLabel && selectedLabel.id !== "all") {
        _getLabelMemberships(query);
      } else _getCRMMembershipsByQuery(query);
    }, 0);
  }, [selectedLabel, category, page, pageSize, search, selectedDescriptions]);

  const selectedCRMMemberships =
    labelsMembership &&
    selectedLabel &&
    labelsMembership.find((label) => label.id === selectedLabel.id);
  let rowCount;
  if (selectedCRMMemberships) {
    rowCount = selectedCRMMemberships?.membershipByquary?.length;
  } else if (membershipByquary) {
    rowCount = membershipByquary.length;
  } else {
    rowCount = 0;
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;
  useEffect(() => {
    if (descriptionOption?.length) {
      setDescriptions([...descriptionOption]);
    }
  }, [descriptionOption]);
  return (
    <div className="container">
      <Head>
        <title>Customers</title>
      </Head>
      <AdminBreadCrumb />
      <Paper elevation={1} className="mt-3 p-3">
        <div className="d-flex align-items-center position-relative">
          <div
            className={`u-fontLarge flex-1 ${
              searchExpand2 && matches ? "d-none" : ""
            }`}
          >
            Customer Category
          </div>
          <div className={`d-flex ${searchExpand2 && matches ? "flex-1" : ""}`}>
            <ClickAwayListener onClickAway={() => setSearchExpand2(false)}>
              <div className="w-100">
                <Autocomplete
                  open={open}
                  onOpen={() => {
                    setTimeout(() => {
                      setOpen(true);
                    }, 100);
                  }}
                  onClose={() => {
                    setOpen(false);
                  }}
                  options={
                    labels
                      ? [{ id: "all", name: "All" }, ...labels]
                      : [{ id: "all", name: "All" }]
                  }
                  autoHighlight
                  onChange={(event, newValue) => {
                    setCategory(newValue);
                    selectLabel(newValue);
                  }}
                  PaperComponent={(props) => (
                    <Paper
                      {...props}
                      style={{
                        ...props.style,
                        marginTop: 4,
                        borderRadius: "0 0 4px 4px",
                      }}
                      elevation={3}
                    />
                  )}
                  getOptionLabel={(option) => option.name}
                  renderOption={(option) => <span>{option.name}</span>}
                  ListboxProps={{ style: { fontSize: 13 } }}
                  renderInput={(params) => (
                    <Input
                      {...params}
                      size="small"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                      inputRef={inputRef2}
                      style={{
                        width: !matches ? 176 : searchExpand2 ? "100%" : 36,
                      }}
                      className="ml-2"
                      label={
                        !matches || searchExpand2 ? "Searching" : ""
                      }
                      onFocus={() => {
                        setSearchExpand2(true);
                      }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment
                            style={{ position: "absolute", left: 3 }}
                            className="u-pointer-events-none"
                            position="start"
                          >
                            <SearchRoundedIcon
                              className="ml-1"
                              style={{ color: theme.palette.text.disabled }}
                              fontSize="small"
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>
            </ClickAwayListener>
            <Link href={`${urlPrefix}vc/category/new`}>
              <Button
                color="primary"
                variant="contained"
                className={`u-fontWeightNormal u-height-36 u-font-semi-small w-100 ${
                  searchExpand2 && matches ? "d-none" : ""
                }`}
                style={{ minWidth: "unset", padding: "0 8px" }}
              >
                <AddRoundedIcon fontSize="small" />
                {!matches && (
                  <span className="text-nowrap u-fontMedium">
                    New category
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
        <Collapse
          in={collapse}
          collapsedHeight={48}
          className="position-relative"
        >
          <div
            style={!collapse ? { paddingLeft: 75 } : {}}
            className="d-flex flex-wrap mt-2 mb-1"
          >
            {labels &&
              Array.isArray(labels) &&
              [{ id: "all", title: "All" }, ...labels].map((label, index) => (
                <Chip
                  color={category && category.id === label.id ? "primary" : ""}
                  label={label.title}
                  onClick={() => {
                    setCategory(label);
                    selectLabel(label);
                  }}
                  variant="outlined"
                  className="m-1"
                  key={label.id}
                  clickable
                />
              ))}
          </div>
          {!collapse ? (
            <ArrowDropDownRoundedIcon
              style={{ color: theme.palette.text.disabled, top: 10 }}
              onClick={() => setCollapse(true)}
              className="m-1 position-absolute left-0 u-cursor-pointer"
              fontSize="large"
            />
          ) : (
            <ArrowDropUpRoundedIcon
              style={{ color: theme.palette.text.disabled, top: 10 }}
              onClick={() => setCollapse(false)}
              className="m-1 position-absolute left-0 u-cursor-pointer"
              fontSize="large"
            />
          )}
        </Collapse>
      </Paper>
      <Paper elevation={1} className="py-3 mt-3">
        <div className="d-flex pb-3 align-items-center justify-content-between px-3">
          <div className="d-flex align-items-center">
            {numSelected > 0 ? (
              <div>
                {englishNumberToPersianNumber(numSelected)} The selected item
              </div>
            ) : (
              <div
                className={`u-fontLarge  ${
                  searchExpand && matches ? "d-none" : ""
                }`}
              >
                {category ? category.title : "All"}
              </div>
            )}
          </div>
          <div className="d-flex">
            {descriptions?.length ? (
              <div className="mx-2">
                <Select
                  style={{ minWidth: 150, height: 36, flex: 1 }}
                  value={selectedDescriptions}
                  multiple
                  margin="dense"
                  variant="outlined"
                  displayEmpty
                  size="large"
                  renderValue={() => {
                    if (selectedDescriptions?.length === 0)
                      return "Choose the desktop";
                    if (
                      selectedDescriptions?.length === 1 &&
                      selectedDescriptions[0]
                    )
                      return selectedDescriptions[0];
                    if (selectedDescriptions?.length == descriptions?.length)
                      return "All desktops";
                    return `${englishNumberToPersianNumber(
                      selectedDescriptions?.length
                    )} Recruitment`;
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
                        selectedDescriptions?.length !== descriptions.length &&
                        selectedDescriptions?.length
                      }
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      onClick={(e) => {
                        if (selectedDescriptions?.length > 0)
                          setSelectedDescriptions([]);
                        else setSelectedDescriptions([...descriptions]);
                      }}
                      color="primary"
                      checked={
                        selectedDescriptions?.length === descriptions.length
                      }
                    />
                    <ListItemText
                      primary="Choosing all couriers"
                      className="text-right"
                    />
                  </MenuItem>
                  {descriptions.map((description, index) => {
                    return (
                      <MenuItem
                        className="px-2"
                        key={index}
                        value={description}
                      >
                        <Checkbox
                          className="p-1"
                          size="small"
                          label={description}
                          onChange={(e) => {
                            e.preventDefault();
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            const _selectedDescriptions = selectedDescriptions;
                            if (selectedDescriptions.includes(description)) {
                              const indexOfSelectedDescription =
                                selectedDescriptions.indexOf(description);
                              _selectedDescriptions.splice(
                                indexOfSelectedDescription,
                                1
                              );
                              setSelectedDescriptions([
                                ..._selectedDescriptions,
                              ]);
                            } else {
                              _selectedDescriptions.push(description);
                              setSelectedDescriptions([
                                ..._selectedDescriptions,
                              ]);
                            }
                          }}
                          color="primary"
                          checked={
                            selectedDescriptions.includes(description)
                              ? true
                              : false
                          }
                        />
                        <ListItemText
                          primary={description}
                          className="text-right"
                        />
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            ) : null}
            <div className="mx-2">
              <Input
                size="small"
                inputRef={inputRef}
                value={search}
                fullWidth={false}
                onChange={(search) => {
                  setSearch(search);
                  clearTimeout(searchTimeoutId);
                  const query = { ...router.query };
                  delete query[SEARCH_QUERY_KEY];
                  delete query.page;
                  if (search) {
                    query[SEARCH_QUERY_KEY] = search;
                  }
                  searchTimeoutId = setTimeout(() => {
                    router.push({
                      pathname: router.pathname,
                      query,
                    });
                  }, 500);
                }}
                placeholder="Customer Search"
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
                          onClick={() => {
                            setSearch("");
                            const query = { ...router.query };
                            delete query.search;
                            router.push({
                              pathname: router.pathname,
                              query,
                            });
                          }}
                        >
                          <ClearRoundedIcon
                            style={{ color: theme.palette.text.disabled }}
                          />
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
            <div>
              {numSelected > 0 ? (
                <Tooltip title="Delete">
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <Link href={`${urlPrefix}vc/users/new`}>
                    <Button
                      color="primary"
                      variant="contained"
                      className={`u-fontWeightNormal u-height-36 u-font-semi-small w-100 ${
                        searchExpand && matches ? "d-none" : ""
                      }`}
                      style={{ minWidth: "unset", padding: "0 8px" }}
                    >
                      <AddRoundedIcon fontSize="small" />
                      {!matches && (
                        <span className="text-nowrap u-fontMedium">
                          New customer
                        </span>
                      )}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow style={{ height: 50 }}>
                {headCells.map((headCell, index) =>
                  !matches || !headCell.responsive ? (
                    <TableCell
                      className="text-nowrap"
                      key={headCell.id}
                      align={headCell.align}
                      style={{ fontWeight: headCell.fontWeigth }}
                    >
                      {headCell.label}
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCRMMemberships
                ? selectedCRMMemberships.memberships.map(
                    (membership, index) => {
                      const isItemSelected = isSelected(membership.id);
                      return (
                        <Link
                          passHref
                          href={`${urlPrefix}vc/users/edit/[id]?id=${membership.id}`}
                        >
                          <TableRow
                            hover
                            key={membership.id}
                            aria-checked={isItemSelected}
                            selected={isItemSelected}
                            style={{ cursor: "pointer", height: 50 }}
                          >
                            <TableCell align="right" className="text-nowrap">
                              {englishNumberToPersianNumber(
                                membership.user.phone_zero_starts
                              )}
                            </TableCell>
                            <TableCell align="right" className="text-nowrap">
                              {membership.name}
                            </TableCell>
                            <TableCell align="center" className="text-nowrap">
                              {`${englishNumberToPersianNumber(
                                membership.gift_credit
                              )} $`}
                            </TableCell>
                            <TableCell align="center" className="text-nowrap">
                              {`${englishNumberToPersianNumber(
                                membership.wallet_credit
                              )} $`}
                            </TableCell>
                          </TableRow>
                        </Link>
                      );
                    }
                  )
                : membershipByquary &&
                  membershipByquary.map((membership, index) => {
                    const isItemSelected = isSelected(membership.id);
                    return (
                      <Link
                        passHref
                        href={`${urlPrefix}vc/users/edit/[id]?id=${membership.id}`}
                      >
                        <TableRow
                          hover
                          key={membership.id}
                          aria-checked={isItemSelected}
                          selected={isItemSelected}
                          style={{ cursor: "pointer", height: 50 }}
                        >
                          <TableCell align="right" className="text-nowrap">
                            {englishNumberToPersianNumber(
                              membership.user.phone_zero_starts
                            )}
                          </TableCell>
                          <TableCell align="right" className="text-nowrap">
                            {membership.name}
                          </TableCell>
                          <TableCell align="center" className="text-nowrap">
                            {`${englishNumberToPersianNumber(
                              membership.gift_credit
                            )} $`}
                          </TableCell>
                          <TableCell align="center" className="text-nowrap">
                            {`${englishNumberToPersianNumber(
                              membership.wallet_credit
                            )} $`}
                          </TableCell>
                        </TableRow>
                      </Link>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage={!matches ? "The number of rows per page" : ""}
          labelDisplayedRows={({ from, to, count }) =>
            `${englishNumberToPersianNumber(
              from
            )} - ${englishNumberToPersianNumber(to)} From${
              count !== -1
                ? englishNumberToPersianNumber(count)
                : `more than${englishNumberToPersianNumber(to)}`
            }`
          }
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={
            selectedLabel || selectedLabel?.id == "all"
              ? membershipsPagination?.count
              : membershipPaginationByquary?.count
          }
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

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  business: makeSelectBusiness(),
  plugins: makeSelectPlugins(),
  labels: makeSelectCrmLabels(),
  labelsMembership: makeSelectBusinessCRMLabelsMemberships(),
  memberships: makeSelectBusinessCRMMemberships(),
  membershipsPagination: makeSelectBusinessMembershipsPagination(),
  pluginData: makeSelectPlugin(VISIT_CARD_PLUGIN),
  urlPrefix: makeSelectAdminUrlPrefix(),
  business: makeSelectBusiness(),
  membershipByquary: makeSelectCRMMemberShipsByQuery(),
  membershipPaginationByquary: makeSelectCRMMemberShipsPaginationByQuery(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCRMLabels: () => dispatch(getCRMLabels()),
    _getLabelMemberships: (label, page, pageSize) =>
      dispatch(getCRMLabelMemberships(label, page, pageSize)),
    _getMemberships: (page, pageSize, search, query) =>
      dispatch(getCRMMemberships(page, pageSize, search, query)),
    _getCustomerCount: () => dispatch(getCustomersCount()),
    _getCRMMembershipsByQuery: (query) =>
      dispatch(getCRMMembershipByQuery(query)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMMainPage);
