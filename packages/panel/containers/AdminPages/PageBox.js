import { graphite } from "@saas/utils/colors";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import PageRow from "./PageRow";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import { Collapse } from "react-collapse";
import { useState } from "react";
import TableNoResultMessage from "components/TableNoResultMessage";

const PageBox = ({
  isLoading,
  title,
  defaultCollapseStatus = false,
  newBtnData,
  pages,
  children,
  pageRowProps,
}) => {
  const [collapse, setCollapse] = useState(defaultCollapseStatus);
  const theme = useTheme();

  return (
    <Paper elevation={1} className="mt-3 py-3">
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          color: theme.palette.text.tertiary,
          fontSize: 16,
          cursor: "pointer",
          padding: "2px 20px",
        }}
        onClick={() => setCollapse((prevState) => !prevState)}
      >
        <div>{title}</div>
        <KeyboardArrowDownRoundedIcon
          style={{
            color: graphite,
            transform: `rotate(${collapse ? 180 : 0}deg)`,
            transition: "all 0.3s ease-in-out",
          }}
        />
      </div>
      <Collapse
        isOpened={collapse}
        theme={{
          collapse: "ReactCollapse--collapse",
          content: "ReactCollapse--content",
        }}
      >
        <div className="mt-3">
          {newBtnData.text && newBtnData.onClick && (
            <div className={"px-3 pb-1"} style={{ textAlign: "left" }}>
              <Button
                style={{ direction: "ltr" }}
                color="primary"
                variant="contained"
                onClick={newBtnData.onClick}
                endIcon={<AddRoundedIcon fontSize="small" />}
              >
                {newBtnData.text}
              </Button>
            </div>
          )}
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {pages?.length ? (
                    pages.map((page) => (
                      <PageRow
                        key={page.id}
                        {...pageRowProps}
                        page={page}
                        duplicatePage={(currentPage) =>
                          newBtnData.onClick({ currentPage })
                        }
                      />
                    ))
                  ) : (
                    <TableNoResultMessage
                      title={`${pageRowProps.entityPersianCopyRight} یافت نشد! `}
                      description={`برای ساختن ${pageRowProps.entityPersianCopyRight} از دکمه ${pageRowProps.entityPersianCopyRight} جدید استفاده کنید`}
                    />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <style
            dangerouslySetInnerHTML={{
              __html: `
          .MuiTablePagination-toolbar {
            padding-left: 0px !important;
            justify-content:flex-end;
          }
          `,
            }}
          ></style>
          {children}
        </div>
      </Collapse>
    </Paper>
  );
};

export default PageBox;
