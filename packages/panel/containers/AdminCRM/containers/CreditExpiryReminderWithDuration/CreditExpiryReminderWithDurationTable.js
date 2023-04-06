import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Skeleton from "@material-ui/lab/Skeleton";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/core/styles/withStyles";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import  makeStyles  from "@material-ui/core/styles/makeStyles";

const getValueFromKey = (obj, keys) =>
  keys?.reduce && typeof obj === "object" ? keys.reduce((acc, cur) => acc?.[cur], obj) : null;


function CreditExpiryReminderWithDurationTable(props) {
  const {
    campaignList,
    theme,
    handleEditCampaign,
    _isCampaignListLoading,
    crontabToReadableTime,
    handleToggleCampaignIsActive,
  } = props;

  const toolTipUseStyles = makeStyles(() => ({
    tooltip: {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      width: "100%",
      fontSize: 12,
      borderRadius: 8,
      margin: "5px 0px",
      padding: 8,
    },
    arrow: {
      color: theme.palette.primary.main,
    },
  }));

  const tooltipClasses = toolTipUseStyles();

  const crontabFormatter = (crontab) => {
    return <div style={{ color: theme.palette.grey["800"] }}>{crontabToReadableTime(crontab)}</div>;
  };

  const enabledStatusFormatter = (status) => {
    if (status) {
      return (
        <Tooltip
          placement="left"
          PopperProps={{
            disablePortal: true,
          }}
          enterTouchDelay={0}
          arrow
          classes={tooltipClasses}
          title={`Approved by support`}
        >
          <CheckCircleIcon style={{ color: theme.palette.success.main }} />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip
        enterTouchDelay={0}
          placement="left"
          PopperProps={{
            disablePortal: true,
          }}
          arrow
          classes={tooltipClasses}
          title={`Awaiting support confirmation`}
        >
          <AccessTimeIcon style={{ color: theme.palette.grey["600"] }} />
        </Tooltip>
      );
    }
  };

  const infoFormatter = ({ periodic_task, action }) => {
    const formattedTime = crontabToReadableTime(periodic_task.crontab);
    return (
      <Tooltip
      enterTouchDelay={0}
        placement="top"
        PopperProps={{
          disablePortal: true,
        }}
        arrow
        classes={tooltipClasses}
        title={`${englishNumberToPersianNumber(action?.expiration_in_days)} day(s) before the expiration of the credit at ${formattedTime} Reminder SMS is sent to customers.`}
      >
        <IconButton>
          <InfoOutlinedIcon style={{ color: theme.palette.primary.main }} />
        </IconButton>
      </Tooltip>
    );
  };

  const editFormatter = (itemId) => (
    <IconButton onClick={() => handleEditCampaign(itemId)}>
      <EditOutlinedIcon style={{ color: theme.palette.primary.main }} />
    </IconButton>
  );

  const switchFormatter = ({ is_active, id }) => {
    return <Switch onClick={() => handleToggleCampaignIsActive(id)} color="primary" checked={is_active} />;
  };

  const ExpirationInDaysFormatter = (days) => (
    <div style={{ fontSize: 14, fontWeight: 400, color: theme.palette.grey["700"] }}>
      {englishNumberToPersianNumber(days)} day before expiry
    </div>
  );

  const StyledTableCell = withStyles(() => ({
    head: {
      borderBottom: `solid 1px ${theme.palette.grey["300"]}`,
    },
    body: {
      fontSize: 14,
      fontWeight: 600,
    },
  }))(TableCell);

  const tableConfig = [
    {
      id: 0,
      value: ["action", "expiration_in_days"],
      align: "right",
      width: 180,
      bodyFormatter: ExpirationInDaysFormatter,
      headerName: "Interval",
    },

    {
      id: 1,
      value: ["periodic_task", "crontab"],
      align: "right",
      width: 160,
      bodyFormatter: crontabFormatter,
      headerName: "Send time",
    },

    {
      id: 2,
      value: ["enabled"],
      align: "right",
      width: 140,
      bodyFormatter: enabledStatusFormatter,
      headerName: "Confirmation status",
    },

    {
      id: 3,
      value: [],
      align: "right",
      width: 30,
      bodyFormatter: infoFormatter,
      headerName: "Description",
    },

    {
      id: 4,
      value: ["id"],
      align: "right",
      width: 30,
      bodyFormatter: editFormatter,
      headerName: "Edit",
    },

    {
      id: 0,
      value: [],
      align: "right",
      width: 130,
      bodyFormatter: switchFormatter,
      headerName: "active/Inactive",
    },
  ];

  return (
    <TableContainer component={Paper} style={{ border: `solid 1px ${theme.palette.grey["200"]}` }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {tableConfig.map((tableConfigCell) => {
              return (
                <StyledTableCell
                  style={{ minWidth: tableConfigCell.width }}
                  align={tableConfigCell.align}
                  width={tableConfigCell.width}
                  key={tableConfigCell.value}
                >
                  {tableConfigCell.headerName}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>

        {_isCampaignListLoading ? (
          <TableBody>
            {[1, 2, 3, 4, 5].map((item) => (
              <TableRow style={{ height: 53 }} key={item}>
                {tableConfig.map((tableConfigCell) => {
                  return (
                    <TableCell key={tableConfigCell.id}>
                      <Skeleton
                        style={{
                          transform: "scale(1)",
                          height: 20,
                          padding: "24px 0",
                        }}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {campaignList.map((campaignDetailItem) => {
              return (
                <TableRow key={campaignDetailItem.id}>
                  {tableConfig.map(({ align, id, bodyFormatter, value, width }) => {
                    return (
                      <TableCell align={align} key={id} width={width}>
                        {bodyFormatter
                          ? bodyFormatter(getValueFromKey(campaignDetailItem, value))
                          : getValueFromKey(campaignDetailItem, value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export default CreditExpiryReminderWithDurationTable;
