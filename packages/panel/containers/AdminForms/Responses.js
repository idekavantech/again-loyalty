/**
 *
 * AdminThemeSettings
 *
 */

import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

import {
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
  makeSelectFormsDictionary,
} from "@saas/stores/business/selector";
import {
  getFormsDictionary,
  updateBusiness,
} from "@saas/stores/business/actions";
import Paper from "@material-ui/core/Paper";

import { useRouter } from "next/router";
import {
  makeSelectFormResponsePagination,
  makeSelectFormResponses,
  makeSelectFormResponsesNextPage,
  makeSelectForms,
} from "store/selectors";

import {
  deleteForm,
  getFormResponses,
  setNextFormResponsesPage,
} from "store/actions";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import dynamic from "next/dynamic";
import { pollution } from "@saas/utils/colors";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import ImageRoundedIcon from "@material-ui/icons/ImageRounded";

import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { downloaderRequest } from "@saas/utils/helpers/downloaderRequest";
import { makeSelectUser } from "@saas/stores/user/selector";
import { BASE_URL_V2 } from "@saas/utils/api";

import jMoment from "moment-jalaali";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../utils/helpers";

const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

let timeoutId = null;

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.secondary,
    },
  },
}))(TableRow);

export function AdminForms({
  _setFormResponsesPage,
  _getFormResponses,
  responses,
  pagination,
  nextPage,
  loading,
  _getFormsDictionary,
  formsDictionary,
  user,
}) {
  const { maxWidth768 } = useResponsive();
  const router = useRouter();
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(0);
  const [localResponses, setLocalResponses] = useState(null);
  const [form, setForm] = useState(null);
  const [isModalOpen, setModalOpen] = useState(null);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    _setFormResponsesPage(newPage + 1);
  };
  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
  };

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setTimeout(() => {
      _getFormResponses(
        persianToEnglishNumber(
          jMoment(
            formatDateObjectToNormal(selectedDayRange.from),
            "jYYYY-jM-jD"
          ).format("YYYY-M-D")
        ),
        persianToEnglishNumber(
          jMoment(
            formatDateObjectToNormal(selectedDayRange.to),
            "jYYYY-jM-jD"
          ).format("YYYY-M-D")
        ),
        router.query.id
      );
    }, 0);
  }, [nextPage]);
  const submitDate = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      _getFormResponses(
        persianToEnglishNumber(
          jMoment(
            formatDateObjectToNormal(selectedDayRange.from),
            "jYYYY-jM-jD"
          ).format("YYYY-M-D")
        ),
        persianToEnglishNumber(
          jMoment(
            formatDateObjectToNormal(selectedDayRange.to),
            "jYYYY-jM-jD"
          ).format("YYYY-M-D")
        ),
        router.query.id
      );
    }, 500);
    handleClose();
  };
  const exportCSVEndpoint = useMemo(
    () =>
      `${BASE_URL_V2}businesses/forms/${
        router.query.id
      }/export/csv/?from=${persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.from),
          "jYYYY-jM-jD"
        ).format("YYYY-M-D")
      )}&to=${persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.to),
          "jYYYY-jM-jD"
        ).format("YYYY-M-D")
      )}`,
    [selectedDayRange]
  );
  useEffect(() => {
    if (responses) {
      let isOpenObj = {};
      const _responses = responses.map((_response) => {
        const createdDate = new Date(_response._created_at);
        const createdTime = jMoment(
          `${createdDate.getFullYear()}-${
            createdDate.getMonth() + 1
          }-${createdDate.getDate()}
           ${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`,
          "YYYY-M-D HH:mm:ss"
        );
        isOpenObj = {
          ...isOpenObj,
          [_response.id]: { mapModal: false, imageModal: false },
        };

        return {
          ..._response,
          createdAtDate: englishNumberToPersianNumber(
            createdTime.format("jYYYY/jM/jD HH:mm:ss")
          ),
        };
      });
      setModalOpen(isOpenObj);
      setLocalResponses(_responses);
    }
  }, [responses]);
  const mapOptionsGenerator = (input) => {
    return {
      height: "650px",
      width: "100%",
      markers: [
        {
          latitude: input.value.latitude,
          longitude: input.value.longitude,
        },
      ],
      center: {
        latitude: input.value.latitude,
        longitude: input.value.longitude,
      },
      touchZoom: true,
      zoom: 14,
    };
  };
  useEffect(() => {
    if (router.query.id) {
      setTimeout(() => {
        _getFormsDictionary(router.query.id);
      }, 0);
    }
  }, [router.query.id]);
  useEffect(() => {
    if (formsDictionary) {
      setForm(formsDictionary[router.query.id]);
    }
  }, [formsDictionary]);
  const tableHeadCells =
    (form &&
      form.inputs
        .filter((input) => input.type !== "button")
        .map(
          (input) => input.label || input.title || input.titleOfRadioOrCheckbox
        )) ||
    [];
  const tableColumnsIds =
    (form &&
      form.inputs
        .filter((input) => input.type !== "button")
        .map((input) => input.id)) ||
    [];
  return (
    <div className="container">
      <Head>
        <title>پاسخ‌های فرم‌</title>
      </Head>
      <AdminBreadCrumb
        submitButtonText="خروجی گرفتن"
        submitAction={() => {
          if (user?.token) {
            downloaderRequest(
              "گزارش تعدادی فروش محصولات",
              exportCSVEndpoint,
              user.token
            );
          }
        }}
      />
      <div className="d-flex flex-wrap align-items-center">
        <Button
          style={{
            direction: "rtl",
          }}
          aria-describedby={id}
          onClick={handleOpen}
          variant="outlined"
        >
          از{" "}
          <span className="px-2">
            {englishNumberToPersianNumber(
              formatDateObjectToNormal(selectedDayRange.from)
            )}
          </span>
          تا{" "}
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
      <div className="mt-3 px-4">
        <span>فرم</span>
        <span className="u-font-medium u-fontWeightBold">
          {" "}
          {form && form.title}
        </span>
        <span className="u-font-medium u-fontWeightBold">
          {" "}
          {`(${englishNumberToPersianNumber(pagination.count)})`}
        </span>
      </div>

      {loading ? (
        <LoadingIndicator />
      ) : localResponses && localResponses.length ? (
        <>
          <TableContainer component={Paper} className="mt-3">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ردیف</TableCell>
                  <TableCell align="right">زمان ارسال</TableCell>
                  {tableHeadCells &&
                    tableHeadCells.map((tableHeadCell) => (
                      <TableCell key={tableHeadCell.id} align="right">
                        {tableHeadCell}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {localResponses.map((response, index) => (
                  <StyledTableRow key={response.id}>
                    <TableCell align="right" component="th" scope="column">
                      {page > 0
                        ? englishNumberToPersianNumber(
                            pageSize * page + index + 1
                          )
                        : englishNumberToPersianNumber(index + 1)}
                    </TableCell>
                    <TableCell align="right" component="th" scope="column">
                      {response.createdAtDate}
                    </TableCell>
                    {tableColumnsIds.map((_id) => {
                      const foundInput = response.data.inputs.find(
                        (input) => input.id === _id
                      );
                      if (foundInput && foundInput.value) {
                        if (
                          foundInput.type !== "button" &&
                          foundInput.type !== "location" &&
                          foundInput.type !== "image" &&
                          foundInput.type !== "checkbox" &&
                          typeof foundInput.value != "object"
                        ) {
                          return (
                            <TableCell
                              key={_id}
                              align="right"
                              component="th"
                              scope="column"
                            >
                              {foundInput.value}
                            </TableCell>
                          );
                        }
                        if (foundInput.type === "location") {
                          return (
                            <TableCell
                              align="right"
                              component="th"
                              scope="column"
                            >
                              <div className="w-100 d-flex justify-content-between align-items-center">
                                <IconButton
                                  color="primary"
                                  className="p-0"
                                  onClick={() =>
                                    setModalOpen({
                                      ...isModalOpen,
                                      [response.id]: {
                                        mapModal: true,
                                        imageModal: false,
                                      },
                                    })
                                  }
                                >
                                  <RoomRoundedIcon />
                                </IconButton>
                                <Modal
                                  onClose={() =>
                                    setModalOpen({
                                      ...isModalOpen,
                                      [response.id]: {
                                        mapModal: false,
                                        imageModal: false,
                                      },
                                    })
                                  }
                                  isOpen={
                                    isModalOpen &&
                                    isModalOpen[response.id] &&
                                    isModalOpen[response.id].mapModal
                                  }
                                  header={
                                    <ModalHeader
                                      onRightClick={() =>
                                        setModalOpen({
                                          ...isModalOpen,
                                          [response.id]: {
                                            mapModal: false,
                                            imageModal: false,
                                          },
                                        })
                                      }
                                    />
                                  }
                                  body={
                                    <div className="px-3">
                                      <Map
                                        options={mapOptionsGenerator(
                                          foundInput
                                        )}
                                      />
                                    </div>
                                  }
                                />
                              </div>
                            </TableCell>
                          );
                        }
                        if (foundInput.type === "image") {
                          return (
                            <TableCell
                              align="right"
                              component="th"
                              scope="column"
                            >
                              <div className="w-100 d-flex justify-content-between align-items-center">
                                {/* <div className="ml-1">{foundInput.title}</div> */}
                                <IconButton
                                  color="primary"
                                  className="p-0"
                                  onClick={() =>
                                    setModalOpen({
                                      ...isModalOpen,
                                      [response.id]: {
                                        mapModal: false,
                                        imageModal: true,
                                      },
                                    })
                                  }
                                >
                                  <ImageRoundedIcon />
                                </IconButton>
                                <Modal
                                  onClose={() =>
                                    setModalOpen({
                                      ...isModalOpen,
                                      [response.id]: {
                                        mapModal: false,
                                        imageModal: false,
                                      },
                                    })
                                  }
                                  isOpen={
                                    isModalOpen &&
                                    isModalOpen[response.id] &&
                                    isModalOpen[response.id].imageModal
                                  }
                                  header={
                                    <ModalHeader
                                      onRightClick={() =>
                                        setModalOpen({
                                          ...isModalOpen,
                                          [response.id]: {
                                            mapModal: false,
                                            imageModal: false,
                                          },
                                        })
                                      }
                                    />
                                  }
                                  body={
                                    <div className="px-3">
                                      <img
                                        alt=""
                                        style={{
                                          width: 450,
                                          height: 650,
                                          objectFit: "contain",
                                        }}
                                        src={foundInput.value}
                                      />
                                    </div>
                                  }
                                />
                              </div>
                            </TableCell>
                          );
                        }
                        if (foundInput.type === "checkbox") {
                          return (
                            <TableCell
                              align="right"
                              component="th"
                              scope="column"
                            >
                              {foundInput.value.join(", ")}
                            </TableCell>
                          );
                        }
                      }
                      return (
                        <TableCell
                          key={_id.id}
                          align="right"
                          component="th"
                          scope="column"
                        >
                          -
                        </TableCell>
                      );
                    })}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage={!maxWidth768 ? "تعداد ردیف در هر صفحه" : ""}
            labelDisplayedRows={({ from, to, count }) =>
              `${englishNumberToPersianNumber(
                from
              )} - ${englishNumberToPersianNumber(to)} از ${
                count !== -1
                  ? englishNumberToPersianNumber(count)
                  : `بیشتر از  ${englishNumberToPersianNumber(to)}`
              }`
            }
            rowsPerPageOptions={[20]}
            component="div"
            count={pagination.count}
            rowsPerPage={pageSize}
            page={nextPage - 1}
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
        </>
      ) : (
        <Paper
          elevation={3}
          className="d-flex my-3 flex-column w-100 justify-content-start p-3 align-items-start"
        >
          <div style={{ color: pollution }}>
            تاکنون اطلاعاتی برای این فرم دریافت نشده است، زمانی که کاربر وب‌سایت
            شما این فرم را پر نماید، اطلاعات دریافتی در این بخش نمایان خواهد شد
          </div>
        </Paper>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  themeConfig: makeSelectBusinessThemeConfig(),
  themeColor: makeSelectBusinessThemeColor(),
  forms: makeSelectForms(),
  responses: makeSelectFormResponses(),
  pagination: makeSelectFormResponsePagination(),
  nextPage: makeSelectFormResponsesNextPage(),
  formsDictionary: makeSelectFormsDictionary(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    _deleteForm: (id) => dispatch(deleteForm(id)),
    _setFormResponsesPage: (page) => dispatch(setNextFormResponsesPage(page)),
    _getFormResponses: (from, to, id) =>
      dispatch(getFormResponses(from, to, id)),
    _updateBusiness: (data, successMessage, failMessage) =>
      dispatch(updateBusiness(data, successMessage, failMessage)),
    _getFormsDictionary: (id) => dispatch(getFormsDictionary(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminForms);
