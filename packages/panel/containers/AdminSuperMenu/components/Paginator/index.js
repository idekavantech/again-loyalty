import { memo } from "react";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ScreenSplitter from "@saas/components/ScreenSplitter";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../context/superMenu";

const useStyles = makeStyles(() => ({
  startFlex: {
    textAlign: "center",
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    fontSize: 20,
    textAlign: "center",
    borderRadius: 6,
    padding: 10,
  },
  endFlex: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: 20,
    textAlign: "center",
    borderRadius: 6,
    padding: 10,
  },
  paginatorCenter: {
    backgroundColor: "white",
    fontSize: 17,
    borderRadius: 6,
    marginTop: 10,
    height: 30,
    textAlign: "center",
    "& p": {
      padding: 3,
    },
  },
  btn: {
    width: "50%",
  },
}));

function Paginator() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.superMenu.page);
  const menu = useSelector((state) => state.superMenu.selectedMenu);

  if (menu !== -1) {
    return (
      <ScreenSplitter
        right={() => (
          <Button
            className={classes.btn}
            variant="outlined"
            color="primary"
            onClick={() =>
              dispatch(
                setPage({
                  total: pages?.total + 1,
                  current: pages?.total,
                })
              )
            }
          >
            اضافه کردن صفحه جدید
          </Button>
        )}
        left={() => (
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <KeyboardArrowUpIcon
              style={{
                backgroundColor: "white",
                fontSize: 35,
                cursor: "pointer",
                marginLeft: 5,
                opacity: pages?.current !== 0 ? 1 : 0.4,
              }}
              onClick={() => {
                if (pages?.current !== 0) {
                  dispatch(setPage({ ...pages, current: pages.current - 1 }));
                }
              }}
            />
            <KeyboardArrowDownIcon
              style={{
                backgroundColor: "white",
                fontSize: 35,
                cursor: "pointer",
                opacity: pages?.current < pages?.total - 1 ? 1 : 0.4,
              }}
              onClick={() => {
                if (pages?.current < pages?.total - 1) {
                  dispatch(setPage({ ...pages, current: pages.current + 1 }));
                }
              }}
            />
          </div>
        )}
      />
    );
  } else {
    return <></>;
  }
}

export default memo(Paginator);
