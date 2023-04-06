import React, { memo, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import TablePagination from "@material-ui/core/TablePagination";
import useTheme from "@material-ui/core/styles/useTheme";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Input from "@saas/components/Input";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  getCRMLabelMemberships,
  getCRMMembershipByQuery,
  getCRMLabels,
} from "store/actions";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { useRouter } from "next/router";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import {
  makeSelectCrmLabels,
  makeSelectCRMMemberShipsByQuery,
  makeSelectCRMMemberShipsPaginationByQuery,
} from "store/selectors";
import CRMListTable from "./CRMMembershipsList/components/CRMMembershipsListTable";
import CreateNewCrm from "./CRMMembershipsList/components/CreateCRMMembership";
import Chip from "@material-ui/core/Chip";
import { makeSelectBusinessMembershipsPagination } from "@saas/stores/business/selector";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const SEARCH_QUERY_KEY = "search";
let timeoutId = null;

function CRMListPage({
  _getCRMMembershipsByQuery,
  membershipPaginationByQuery,
  adminUrlPrefix,
  membershipByQuery,
  loading,
  labels,
  _getCRMLabels,
}) {
  const router = useRouter();
  const theme = useTheme();
  const { maxWidth768 } = useResponsive();
  const inputRef = useRef(null);
  const [selectedLabel, setSelectLabel] = useState(
    router?.query?.label ? null : { id: "all", title: "All" }
  );
  const [search, setSearch] = useState(router.query.search || "");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setTimeout(() => {
      const query = {
        label: router?.query?.label,
        page: page + 1,
        page_size: pageSize,
        search:
          search?.length && search[0] === "0"
            ? setSearch(persianToEnglishNumber(search.replace("0", "+98")))
            : persianToEnglishNumber(search),
        ...router.query,
      };

      if (selectedLabel?.id !== "all") {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getCRMMembershipsByQuery({ ...query });
        }, 500);
      } else {
        delete query.label;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getCRMMembershipsByQuery({ ...query });
        }, 500);
      }
    }, 0);
  }, [page, pageSize, search, selectedLabel]);

  useEffect(() => {
    if (labels) {
      setSelectLabel(
        labels.find((label) => label?.id === router?.query?.label) || {
          id: "all",
          title: "All",
        }
      );
    }
  }, [router?.query?.label]);

  const selectedLabelChip = labels?.find(
    (label) => label?.id === router?.query?.label
  ) || {
    id: "all",
    title: "All",
  };

  useEffect(() => {
    setTimeout(() => {
      _getCRMLabels();
    }, 0);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Club customer list</title>
      </Head>
      <AdminBreadCrumb
        submitButtonText="Adding a new customer"
        submitButtonHasPlus
        submitAction={() => {
          router.push(`${adminUrlPrefix}crm/customers?create_modal=true`);
        }}
      />
      <Paper
        elevation={1}
        className="crm-search mt-3"
        style={{ padding: "24px 0" }}
      >
        <div className="mx-2" style={{ width: "30%" }}>
          <Input
            style={{
              direction:
                search?.[0] === "+" || search?.[0] === "0" ? "ltr" : "rtl",
            }}
            size="small"
            inputRef={inputRef}
            value={search}
            fullWidth={false}
            onChange={(search) => {
              setSearch(search);
              clearTimeout(timeoutId);
              const query = { ...router.query };
              delete query[SEARCH_QUERY_KEY];
              if (search) {
                query[SEARCH_QUERY_KEY] = search;
              }
              timeoutId = setTimeout(() => {
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
        <div className="w-100 d-flex flex-wrap" style={{ marginTop: 24 }}>
          {labels &&
            Array.isArray(labels) &&
            [{ id: "all", title: "All" }, ...labels].map((label) => (
              <>
                <Chip
                  color={selectedLabelChip?.id === label?.id ? "primary" : ""}
                  label={label.title}
                  onClick={() => {
                    const _query = { ...router?.query };

                    if (label.id === "all") {
                      delete _query.label;
                      router.push({
                        pathname: router.pathname,
                        query: {
                          ..._query,
                        },
                      });
                    } else {
                      _query.label = label.id;
                      router.push({
                        pathname: router.pathname,
                        query: {
                          ..._query,
                        },
                      });
                    }
                  }}
                  variant="outlined"
                  className="m-1"
                  key={label.id}
                  clickable
                />
              </>
            ))}
        </div>
        <div style={{ padding: "0 24px 24px 0" }}></div>
        <CRMListTable
          adminUrlPrefix={adminUrlPrefix}
          memberShips={membershipByQuery}
          loading={loading}
        />
        <TablePagination
          labelRowsPerPage={!maxWidth768 ? "The number of rows per page" : ""}
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
          count={membershipPaginationByQuery?.count}
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
      {router?.query?.create_modal ? <CreateNewCrm /> : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  membershipsPagination: makeSelectBusinessMembershipsPagination(),
  membershipByQuery: makeSelectCRMMemberShipsByQuery(),
  membershipPaginationByQuery: makeSelectCRMMemberShipsPaginationByQuery(),
  adminUrlPrefix: makeSelectAdminUrlPrefix(),
  labels: makeSelectCrmLabels(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCRMMembershipsByQuery: (query) =>
      dispatch(getCRMMembershipByQuery(query)),
    _getCRMLabels: () => dispatch(getCRMLabels()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMListPage);
