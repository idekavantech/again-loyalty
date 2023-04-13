import React, { memo } from "react";
import Link from "next/link";

import Paper from "@material-ui/core/Paper";
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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import Switch from "@saas/components/Switch";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { actionTypes } from "containers/AdminCRM/constants";
import { useCampaignDetail } from "./useCampaignList";
import moment from "moment";

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
    label: "Campaign name",
    align: "right",
    minWidth: 100,
    width: 220,
  },
  {
    id: 2,
    label: "action",
    align: "right",
    minWidth: 100,
    width: 160,
  },
  {
    id: 3,
    label: "Condition",
    align: "right",
    minWidth: 100,
    width: 100,
  },
  {
    id: 7,
    label: "",
    align: "right",
    minWidth: 100,
    width: 160,
  },
];

const statusColor = {
  0: { id: 0, color: "#2E7D32" },
  1: { id: 1, color: "#D32F2F" },
  2: { id: 2, color: " #00000014" },
  3: { id: 3, color: "#FFC453" },
  4: { id: 4, color: "#CCCCCC" },
};

const campaignStatusTypes = {
  is_active: "is_active",
  disabled: "disabled",
  all: "all",
};

function CRMRCampaignTable() {
  const {
    theme,
    adminUrlPrefix,
    isMobile,
    pageSize,
    page,
    campaignFilters,
    setCampaignFilters,
    isLoading,
    _campaignList,
    _campaignPagination,
    handleChangePage,
    handleChangeRowsPerPage,
    toggleCampaignStatus
  } = useCampaignDetail();

  return (
    <div>
      <div
        className="d-flex justify-content-between"
        style={{ padding: 24, paddingBottom: 20 }}
      >
        <div className="d-flex">
          <div>
            <FormControl variant="outlined" className="mr-2">
              <InputLabel
                id="demo-simple-select-outlined-label"
                style={{ fontSize: 16, fontWeight: 400, color: "#000000" }}
              >
                Condition
              </InputLabel>

              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onClick={(e) => {
                  const selectedValue = e.target.value;
                  const _campaignFilters = { ...campaignFilters };
                  switch (selectedValue) {
                    case campaignStatusTypes.all: {
                      delete _campaignFilters.is_active;
                      break;
                    }
                    case campaignStatusTypes.is_active: {
                      _campaignFilters.is_active = true;
                      break;
                    }
                    case campaignStatusTypes.disabled: {
                      _campaignFilters.is_active = false;
                      break;
                    }
                  }
                  setCampaignFilters(_campaignFilters);
                }}
                renderValue={() => {
                  if (campaignFilters.is_active === undefined) return "All";
                  return campaignFilters.is_active ? "active" : "Inactive";
                }}
                style={{
                  minWidth: 150,
                  flex: 1,
                  borderRadius: 8,
                  height: 44,
                }}
                label=" Condition"
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
                <MenuItem className="px-2" value={campaignStatusTypes.all}>
                  <ListItemText primary="All" className="text-right" />
                </MenuItem>
                <MenuItem
                  className="px-2"
                  value={campaignStatusTypes.is_active}
                >
                  <ListItemText primary="active" className="text-right" />
                </MenuItem>
                <MenuItem className="px-2" value={campaignStatusTypes.disabled}>
                  <ListItemText primary="Inactive" className="text-right" />
                </MenuItem>
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
          Repeated campaigns
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
              {_campaignList?.map((item) => (
                <TableRow
                  className="d-flex align-items-center faq-box my-1 position-relative text-right rtl"
                  style={{
                    borderBottom: "1px solid #E4E6E7",
                    overflowX: "hidden",
                    height: 56,
                    fontWeight: 400,
                    fontSize: 14,
                  }}
                  key={item.id}
                >
                  <div
                    className="text-nowrap pr-4"
                    style={{
                      width: 160,
                      minWidth: 100,
                      fontWeight: 400,
                      fontSize: 14,
                    }}
                  >
                    {englishNumberToPersianNumber(
                      moment(item?.created_at).format("YYYY/MM/DD")
                    )}
                  </div>
                  <div
                    className="text-nowrap pr-4"
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      width: 220,
                      minWidth: 100,
                    }}
                  >
                    {item?.title}
                  </div>
                  <div
                    className="text-nowrap pr-4 cursor-pointer"
                    style={{
                      fontWeight: 400,
                      fontSize: 16,
                      width: 160,
                      minWidth: 100,
                    }}
                  >
                    {
                      actionTypes.find(
                        (actionItem) => actionItem.type === item?.action?.type
                      )?.name
                    }
                  </div>
                  <div
                    className="text-nowrap pr-4"
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      width: 100,
                      minWidth: 100,
                    }}
                  >
                    {item.enabled ? (
                      <CheckCircleIcon
                        style={{ color: statusColor[0].color }}
                      />
                    ) : (
                      <WatchLaterIcon style={{ color: statusColor[4].color }} />
                    )}
                  </div>
                  <div
                    className="text-nowrap pr-4"
                    style={{
                      fontWeight: 400,
                      fontSize: 14,
                      width: 100,
                      minWidth: 100,
                    }}
                  >
                    <Switch
                      color={theme.palette.primary.main}
                      isSwitchOn={item.is_active}
                      toggleSwitch = {()=>{toggleCampaignStatus(item.id)}}
                    />
                  </div>
                  <div
                    className="text-nowrap pr-4 cursor-pointer"
                    style={{
                      fontWeight: 400,
                      fontSize: 16,
                      width: 160,
                      minWidth: 100,
                    }}
                  >
                    <span
                      style={{
                        borderBottom: "1px solid #87009B",
                        color: "#87009B",
                      }}
                    >
                      <Link
                        href={`${adminUrlPrefix}crm/campaign/details/${item.id}`}
                      >
                        View details
                      </Link>
                    </span>
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
        rowsPerPageOptions={[10]}
        component="div"
        count={_campaignPagination?.count}
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
    </div>
  );
}

export default memo(CRMRCampaignTable);
