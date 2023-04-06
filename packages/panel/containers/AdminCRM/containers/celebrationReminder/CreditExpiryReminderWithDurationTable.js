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
import makeStyles from "@material-ui/core/styles/makeStyles";
import Gift from "containers/AdminCRM/icons/gift";

const getValueFromKey = (obj, keys) =>
  keys?.reduce && typeof obj === "object" ? keys.reduce((acc, cur) => acc?.[cur], obj) : null;

function CreditExpiryReminderWithDurationTable(props) {
  const {
    theme,
    crontabToReadableTime,
    adminUrlPrefix,
    togglePopper,
    eventTypes,
    giftTypes,
    handleToggleCelebrationReminderIsActive,
    celebrationReminders,
    _isCelebrationReminderLoading,
    router,
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

  const StyledPaper = withStyles((theme) => ({
    root: {
      boxShadow: `0px 1px 10px 0px ${theme.palette.grey[300]}`,
      minHeight: 550,
    },
  }))(Paper);

  const tooltipClasses = toolTipUseStyles();

  const crontabFormatter = (crontab) => {
    return <div style={{ color: theme.palette.grey["800"] }}>{crontabToReadableTime(crontab)}</div>;
  };

  const enabledStatusFormatter = (status) => {
    if (status) {
      return (
        <Tooltip
        leaveTouchDelay={8000}
          placement="left"
          PopperProps={{
            disablePortal: true,
          }}
          enterTouchDelay={0}
          arrow
          classes={tooltipClasses}
          title={`Approved by support`}
        >
          <CheckCircleIcon style={{ cursor: "pointer", color: theme.palette.success.main }} />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip
        leaveTouchDelay={8000}
          enterTouchDelay={0}
          placement="left"
          PopperProps={{
            disablePortal: true,
          }}
          arrow
          classes={tooltipClasses}
          title={`Awaiting support confirmation`}
        >
          <AccessTimeIcon style={{ cursor: "pointer", color: theme.palette.grey["600"] }} />
        </Tooltip>
      );
    }
  };

  const infoFormatter = (props) => {
    const {
      periodic_task: { crontab },
      segment: { data },
    } = props;

    if (
      !data?.customer_related_date ||
      !data?.customer_related_date.from ||
      !data?.customer_related_date.date_type ||
      isNaN(Number(data?.customer_related_date.from))
    )
      return <div className="px-4"> -- </div>;

    const { from, date_type } = data?.customer_related_date;

    const daysBeforeEvent = Math.abs(from);

    const daysBeforeEventContent = daysBeforeEvent === 0 ? "In the anniversary" : `${daysBeforeEvent} The day before`;

    const eventType = eventTypes[date_type];

    const timeToExecute = crontabToReadableTime(crontab);

    const content = `${daysBeforeEventContent} ${eventType} Customers, hours${timeToExecute} Congratulations SMS is sent with gift.`;

    return (
      <Tooltip
      leaveTouchDelay={8000}
        enterTouchDelay={0}
        placement="top"
        followCursor
        PopperProps={{
          disablePortal: true,
        }}
        arrow
        classes={tooltipClasses}
        title={<div>{content}</div>}
      >
        <IconButton>
          <InfoOutlinedIcon style={{ color: theme.palette.primary.main }} />
        </IconButton>
      </Tooltip>
    );
  };

  const editFormatter = (itemId) => (
    <IconButton onClick={() => router.push(`${adminUrlPrefix}/crm/celebration_reminder/details/${itemId}`)}>
      <EditOutlinedIcon style={{ color: theme.palette.primary.main }} />
    </IconButton>
  );

  const switchFormatter = ({ is_active, id }) => {
    return <Switch onClick={() => handleToggleCelebrationReminderIsActive(id)} color="primary" checked={is_active} />;
  };

  const StyledTableCell = withStyles(() => ({
    head: {
      borderBottom: `solid 1px ${theme.palette.grey["300"]}`,
    },
    body: {
      fontSize: 14,
      fontWeight: 600,
    },
  }))(TableCell);

  const giftTypeFormatter = (type) => {
    const giftType = giftTypes[type];
    return giftType?.name ?? "--";
  };

  const eventTypeFormatter = (eventType) => {
    return eventTypes[eventType];
  };

  const timeToExecute = (day) => {
    const absoluteDay = Math.abs(day);
    if (isNaN(absoluteDay)) return "--";
    const isToday = absoluteDay === 0;
    if (isToday) return `Same day`;
    return `${absoluteDay} The day before`;
  };

  const GiftInfoFormatter = (props) => {
    const { id } = props;
    return (
      <IconButton onClick={() => togglePopper(id)}>
        <Gift />
      </IconButton>
    );
  };

  const tableConfig = [
    {
      id: 0,
      value: ["segment", "data", "customer_related_date", "date_type"],
      align: "right",
      // width: 180,
      bodyFormatter: eventTypeFormatter,
      headerName: "occasion",
    },

    {
      id: 1,
      value: ["segment", "data", "customer_related_date", "from"],
      align: "right",
      bodyFormatter: timeToExecute,
      headerName: "Interval",
    },

    {
      id: 2,
      value: ["periodic_task", "crontab"],
      align: "right",
      bodyFormatter: crontabFormatter,
      headerName: "Send time",
    },

    {
      id: 3,
      value: ["action", "type"],
      align: "right",
      bodyFormatter: giftTypeFormatter,
      headerName: "Gift type",
    },

    {
      id: 4,
      value: [],
      align: "right",
      bodyFormatter: GiftInfoFormatter,
      headerName: "Gift details",
    },

    {
      id: 5,
      value: [],
      align: "right",
      bodyFormatter: infoFormatter,
      headerName: "Description",
    },

    {
      id: 6,
      value: ["enabled"],
      align: "right",
      bodyFormatter: enabledStatusFormatter,
      headerName: "Confirmation status",
    },

    {
      id: 7,
      value: ["id"],
      align: "right",
      bodyFormatter: editFormatter,
      headerName: "Edit",
    },

    {
      id: 8,
      value: [],
      align: "right",
      bodyFormatter: switchFormatter,
      headerName: "active/Inactive",
    },
  ];

  return (
    <>
      <TableContainer component={StyledPaper} style={{ border: `solid 1px ${theme.palette.grey["200"]}` }}>
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

          {_isCelebrationReminderLoading ? (
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
              {celebrationReminders?.map((campaignDetailItem) => {
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
    </>
  );
}

export default CreditExpiryReminderWithDurationTable;
