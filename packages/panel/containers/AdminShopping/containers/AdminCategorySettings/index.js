/**
 *
 * Category
 *
 */

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

import useTheme from "@material-ui/core/styles/useTheme";
import InputAdornment from "@material-ui/core/InputAdornment";
import React, { memo, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

import { createStructuredSelector } from "reselect";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import { compose } from "redux";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import {
  makeSelectBusiness,
  makeSelectBusinessLabels,
} from "@saas/stores/business/selector";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Input from "@saas/components/Input";
import Link from "next/link";
import { bulkDeleteCategories } from "store/actions";
import PopUp from "@saas/components/PopUp";

import EditRoundedIcon from "@material-ui/icons/EditRounded";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { useRouter } from "next/router";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { getBusinessLabels } from "@saas/stores/business/actions";
import ShareIcon from "@material-ui/icons/Share";
import CopyToClipboard from "react-copy-to-clipboard";
import { Chip } from "@material-ui/core";
import TableNoResultMessage from "../../../../components/TableNoResultMessage";
import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";

const headCells = [
  {
    id: "name",
    align: "right",
    label: "Label name",
  },
];

export function AdminCategory({
  adminCategories,
  _bulkDeleteAdminCategories,
  urlPrefix,
  plugins,
  plugin = SHOPPING_PLUGIN,
  isLoading,
  _getBusinessLabels,
  business,
}) {
  const categories = adminCategories;
  const _bulkDeleteCategories = _bulkDeleteAdminCategories;
  const pluginUrl = plugins[plugin].plugin_url;
  const { maxWidth768 } = useResponsive();
  const tableRef = useRef(null);
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState({ search: "" });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [popup, setPopup] = useState(false);
  const [productModalLinkCopied, setProductModalLinkCopied] = useState(null);
  const router = useRouter();
  const numSelected = selected.length;
  const theme = useTheme();

  const iframe_from_pos =
    router.query.iframe_from_pos || typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("iframe_from_pos")
      : false;

  const rows = isLoading
    ? Array.from(Array(10)).map(() => ({}))
    : categories
        .filter((cat) => cat.title.includes(filters.search))
        .slice(page * pageSize, (page + 1) * pageSize);
  const rowCount = rows ? rows.length : 0;

  const onSelectAllClick = (event) => {
    if (
      event.target.checked &&
      (numSelected === 0 || numSelected === rowCount)
    ) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    setPage(0);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  useEffect(() => {
    setTimeout(() => {
      _getBusinessLabels({ ...router.query, page, page_size: pageSize });
    }, 0);
  }, []);

  useEffect(() => {
    if (productModalLinkCopied) {
      setTimeout(() => {
        setProductModalLinkCopied(null);
      }, 2000);
    }
  }, [productModalLinkCopied]);

  const hasBusinessLabels = !!categories.length;
  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        submitAction={() =>
          router.push(`${urlPrefix}${pluginUrl}/settings/l/new`)
        }
        disableBreadcrumb={!!iframe_from_pos}
        responsive={false}
        submitButtonHasPlus
        submitButtonText="New tag"
        helpVideo={{
          url: ADMIN_HELP_VIDEOS.labels.url,
        }}
      />
      <Paper elevation={1} className="py-3 mt-3">
        <div className="d-flex pb-3 px-3 align-items-center">
          <div className={`d-flex ${maxWidth768 ? "flex-1" : ""}`}>
            <div className="w-100">
              <Input
                size="small"
                style={{
                  width: !maxWidth768 ? 188 : "100%",
                }}
                value={filters.search}
                onChange={(search) => {
                  setFilters({ ...filters, search });
                }}
                className="ml-2"
                placeholder="Search label"
                inputProps={{
                  className: "pr-5 mr-2",
                }}
                InputProps={{
                  startAdornment: (
                    <>
                      {filters.search ? (
                        <InputAdornment
                          style={{ position: "absolute", left: 3 }}
                          className="u-cursor-pointer"
                          position="start"
                          onClick={() => {
                            setFilters({ ...filters, search: "" });
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
          </div>
        </div>
        {rows.length ? (
          <>
            {" "}
            <TableContainer ref={tableRef}>
              <Table
                size="small"
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={
                          numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all" }}
                      />
                    </TableCell>
                    {numSelected > 0 ? (
                      <Button
                        className="text-nowrap u-font-semi-small my-1"
                        variant="outlined"
                        size="small"
                        style={{
                          color: theme.palette.error.main,
                          borderColor: theme.palette.error.main,
                        }}
                        onClick={() => setPopup(true)}
                      >
                        Remove items
                      </Button>
                    ) : (
                      headCells.map((headCell) =>
                        !maxWidth768 || !headCell.responsive ? (
                          <TableCell
                            className="text-nowrap p-2"
                            style={{ fontWeight: 600 }}
                            key={headCell.id}
                            align={headCell.align}
                          >
                            {headCell.label}
                          </TableCell>
                        ) : null
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => {
                    const { id, title } = row;
                    const isItemSelected = isSelected(id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={id}
                        selected={isItemSelected}
                      >
                        <TableCell
                          padding="checkbox"
                          onClick={(event) => handleClick(event, id)}
                        >
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>

                        <TableCell
                          component="a"
                          scope="row"
                          align="right"
                          style={{ padding: 8 }}
                          className="d-flex flex-row-reverse align-items-center justify-content-between"
                        >
                          <div className="position-relative">
                            <Link
                              passHref
                              href={`${urlPrefix}${pluginUrl}/settings/l/${id}`}
                            >
                              <IconButton
                                color="primary"
                                style={{ direction: "ltr" }}
                              >
                                <div
                                  className="d-flex align-items-center justify-content-center u-border-radius-50-percent"
                                  style={{
                                    border: `2px solid ${process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}`,
                                    width: 24,
                                    height: 24,
                                  }}
                                >
                                  <EditRoundedIcon style={{ fontSize: 14 }} />
                                </div>
                              </IconButton>
                            </Link>
                            <CopyToClipboard
                              text={`${business.get_vitrin_absolute_url}/s#category-${row.id}`}
                              onCopy={() => setProductModalLinkCopied(row.id)}
                            >
                              <IconButton
                                color="primary"
                                style={{ direction: "ltr" }}
                                disabled={productModalLinkCopied === row.id}
                              >
                                <div
                                  className="d-flex align-items-center justify-content-center u-border-radius-50-percent"
                                  style={{
                                    border: `2px solid ${process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}`,
                                    width: 24,
                                    height: 24,
                                  }}
                                >
                                  <ShareIcon style={{ fontSize: 14 }} />
                                </div>
                              </IconButton>
                            </CopyToClipboard>
                            {productModalLinkCopied === row.id ? (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  zIndex: 2000,
                                }}
                              >
                                <Chip
                                  className="mr-auto ml-1"
                                  size="small"
                                  label="Copied"
                                />
                              </div>
                            ) : null}
                          </div>
                          {title}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage={!maxWidth768 ? "Rows count per page" : ""}
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
              count={categories.length}
              rowsPerPage={pageSize}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              SelectProps={{
                renderValue: () => englishNumberToPersianNumber(pageSize),
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
            />{" "}
          </>
        ) : hasBusinessLabels ? (
          <TableNoResultMessage
            title={"The label was not found in accordance with your search.!"}
          />
        ) : (
          <TableNoResultMessage
            title={"You have no label"}
            description={"Use the new tag button to build the label"}
          />
        )}
      </Paper>
      <PopUp
        closeText="Cancel"
        open={popup}
        submitText="Delete"
        text="Are you sure you want to delete the selected categories?"
        onClose={() => setPopup(false)}
        onSubmit={() => {
          setPopup(false);
          _bulkDeleteCategories(selected, () => {
            setSelected([]);
            _getBusinessLabels({ ...router.query, page, page_size: pageSize });
          });
        }}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  adminCategories: makeSelectBusinessLabels(false),
  urlPrefix: makeSelectAdminUrlPrefix(),
  plugins: makeSelectPlugins(),
  isLoading: makeSelectLoading(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _bulkDeleteAdminCategories: (data, callback) =>
      dispatch(bulkDeleteCategories(data, callback)),
    _getBusinessLabels: () => dispatch(getBusinessLabels()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminCategory);
