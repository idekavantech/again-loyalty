import { memo } from "react";
import { AUTOMATED_PROCESSES_TYPES } from "containers/AdminCRM/constants";
import useTheme from "@material-ui/core/styles/useTheme";
import Link from "next/dist/client/link";
import { useSelector } from "react-redux";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";

function AutomatedProcessesList(props) {
  const theme = useTheme();
  const { automatedProcesses } = props;

  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());

  const formatAutomatedProcesses = (
    allAutomatedProcesses,
    automatedProcessesTypes
  ) => {
    const formatedAutomatedProcesses = [];
    if (!allAutomatedProcesses || !automatedProcessesTypes) return [];
    allAutomatedProcesses.forEach((automatedProcessItem) => {
      const formatedAutomatedProcessIndex =
        formatedAutomatedProcesses.findIndex(
          (item) => item.type === automatedProcessItem.event_type
        );

      if (formatedAutomatedProcessIndex === -1) {
        const automatedProcessType = automatedProcessesTypes.find(
          (item) => item.type === automatedProcessItem.event_type
        );
        formatedAutomatedProcesses.push({
          ...automatedProcessType,
          automatedProcesses: [automatedProcessItem],
        });
      } else {
        formatedAutomatedProcesses[
          formatedAutomatedProcessIndex
        ].automatedProcesses.push(automatedProcessItem);
      }
    });

    return formatedAutomatedProcesses;
  };

  const formatedAutomatedProcessesList = formatAutomatedProcesses(
    automatedProcesses,
    AUTOMATED_PROCESSES_TYPES
  );

  return (
    <div className="mt-3">
      {formatedAutomatedProcessesList.length && (
        <div className="d-flex flex-wrap">
          {formatedAutomatedProcessesList.map((automatedProcessType) => {
            return (
              <div className="col-12 col-lg-6 col-md-12">
                <Card
                  style={{ height: "14.5rem" }}
                  className="w-100 mt-1 mb-3"
                  variant="outlined"
                >
                  <CardContent>
                    <Typography>
                      <Link
                        href={`${adminUrlPrefix}crm/automated_processes/${automatedProcessType.type}`}
                      >
                        <span
                          style={{
                            cursor: "pointer",
                            fontWeight: 600,
                            borderBottom: `2px solid ${theme.palette.primary.main}`,
                            color: theme.palette.primary.main,
                          }}
                        >
                          {automatedProcessType.title}
                        </span>
                      </Link>
                    </Typography>
                  </CardContent>
                  <CardContent>
                    {automatedProcessType.automatedProcesses
                      .slice(0, 3)
                      .map((item) => {
                        return (
                          <Link
                            href={`${adminUrlPrefix}crm/automated_processes/${automatedProcessType.type}/${item.id}`}
                          >
                            <div
                              style={{
                                backgroundColor: "white",
                                borderRadius: "8px",
                                cursor: "pointer",
                              }}
                              className="w-100 mb-2 p-2 d-flex justify-content-between"
                            >
                              <span>{item.title}</span>
                              <VisibilityIcon
                                fontSize="small"
                                style={{ color: theme.palette.primary.main }}
                              />
                            </div>
                          </Link>
                        );
                      })}
                    {automatedProcessType.automatedProcesses.length > 3 && (
                      <div className="w-100 d-flex justify-content-around">
                        <Link
                          href={`${adminUrlPrefix}crm/automated_processes/${automatedProcessType.type}`}
                        >
                          <span
                            style={{
                              cursor: "pointer",
                              fontWeight: 600,
                              borderBottom: `2px solid ${theme.palette.primary.main}`,
                              color: theme.palette.primary.main,
                            }}
                          >
                            More...
                          </span>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default memo(AutomatedProcessesList);
