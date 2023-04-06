import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { selectDeal, setPage, setPickModal } from "../../context/superMenu";
import DealPicker from "../Actions/DealPicker";
import { calcPagesByIndex } from "@saas/utils/helpers/calcPagesByIndex";

const useStyles = makeStyles(() => ({
  box: {
    width: "100%",
    fontSize: 20,
    border: "0.5px solid #F2F4F5",
    borderRight: "4px solid #898F93",
    backgroundColor: "white",
    textAlign: "center",
    padding: 20,
    cursor: "pointer",
    height: 70,
    "&:hover": {
      backgroundColor: "#B8D4FE",
    },
    "& p": {
      fontSize: 16,
      overflowWrap: "break-word",
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "100%",
      whiteSpace: "nowrap",
      height: 50,
    },
  },
  selectedBox: {
    width: "100%",
    fontSize: 20,
    border: "0.5px solid #F2F4F5",
    borderRight: "4px solid #898F93",
    textAlign: "center",
    padding: 20,
    backgroundColor: "#B8D4FE",
    height: 70,
    "& p": {
      fontSize: 16,
      overflowWrap: "break-word",
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "100%",
      whiteSpace: "nowrap",
      height: 50,
    },
  },
}));

function DealsItem({ onSelect, slug, products, posId }) {
  const classes = useStyles();
  const superMenu = useSelector((state) => state.superMenu);
  const menu = superMenu.value;
  const [cellIndex, setCellIndex] = useState(0);
  const [cellIndexForPoints, setCellIndexForPoints] = useState(0);
  const [filterWord, setFilterWord] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (menu[superMenu.selectedMenu]?.cells?.length) {
      // get last item shortcut key to
      // figure out the last item we have
      let lastIndex =
        menu[superMenu.selectedMenu]?.cells[
          menu[superMenu.selectedMenu]?.cells?.length - 1
        ]?.shortcut_key;
      if (lastIndex) {
        // now calculate the points & pages
        dispatch(
          setPage({
            current: superMenu.page?.current || 0,
            total: Math.ceil(parseInt(lastIndex.toString().substring(1)) / 28),
          })
        );
      }
    } else if (superMenu.selectedMenu !== -1) {
      dispatch(
        setPage({
          current: 0,
          total: Math.ceil(1),
        })
      );
    }
  }, [superMenu.selectedMenu, menu]);

  return (
    <Grid container>
      <DealPicker
        slug={slug}
        isOpen={superMenu.pickDealModal}
        cellIndex={cellIndex}
        cellIndexForPoints={cellIndexForPoints}
        onClose={() => {
          dispatch(setPickModal(false));
          setFilterWord("");
        }}
        products={products}
        posId={posId}
        filterWord={filterWord}
        setFilterWord={setFilterWord}
      />
      {menu[superMenu.selectedMenu]?.cells?.length > 0 && (
        <>
          {Array(28)
            .fill("")
            .map((i, index) => (
              <Grid item sm={3} key={i.id}>
                <div
                  className={
                    cellIndex ===
                    calcPagesByIndex(index, superMenu.page.current)
                      ? classes.selectedBox
                      : classes.box
                  }
                  style={{
                    borderRight: `4px solid #${
                      menu[superMenu.selectedMenu].color
                    }`,
                  }}
                  onClick={() => {
                    if (
                      menu[superMenu.selectedMenu].cells.findIndex(
                        (i) =>
                          i.shortcut_key.toString().substring(1) ==
                          calcPagesByIndex(index, superMenu.page.current) + 1
                      ) === -1
                    ) {
                      dispatch(setPickModal(true));
                      setCellIndex(
                        calcPagesByIndex(index, superMenu.page.current)
                      );
                      setCellIndexForPoints(index);
                    } else {
                      setCellIndex(
                        calcPagesByIndex(index, superMenu.page.current)
                      );
                      setCellIndexForPoints(index);
                      dispatch(
                        selectDeal({
                          ...menu[superMenu.selectedMenu].cells[
                            menu[superMenu.selectedMenu].cells.findIndex(
                              (i) =>
                                i.shortcut_key.toString().substring(1) ==
                                calcPagesByIndex(
                                  index,
                                  superMenu.page.current
                                ) +
                                  1
                            )
                          ]?.deal,
                          titleAppended:
                            menu[superMenu.selectedMenu].cells[
                              menu[superMenu.selectedMenu].cells.findIndex(
                                (i) =>
                                  i.shortcut_key.toString().substring(1) ==
                                  calcPagesByIndex(
                                    index,
                                    superMenu.page.current
                                  ) +
                                    1
                              )
                            ]?.title,
                          shortcutKey:
                            calcPagesByIndex(index, superMenu.page.current) + 1,
                        })
                      );
                    }
                    onSelect(index);
                  }}
                >
                  <p>
                    {/** Filter the cells to find the cell associated with our shortcut id &calcPagesByIndex(index, superMenu.page.current)*/}
                    {menu[superMenu.selectedMenu].cells.findIndex(
                      (i) =>
                        i.shortcut_key.toString().substring(1) ==
                        calcPagesByIndex(index, superMenu.page.current) + 1
                    ) !== -1 ? (
                      <p>
                        {
                          menu[superMenu.selectedMenu].cells[
                            menu[superMenu.selectedMenu].cells.findIndex(
                              (i) =>
                                i.shortcut_key.toString().substring(1) ==
                                calcPagesByIndex(
                                  index,
                                  superMenu.page.current
                                ) +
                                  1
                            )
                          ]?.title
                        }
                        {/* <p style={{position: 'absolute'}}>
                                                SC: 23
                                            </p> */}
                      </p>
                    ) : (
                      <>
                        <AddIcon />{" "}
                        {calcPagesByIndex(index, superMenu.page.current) + 1}
                      </>
                    )}
                  </p>
                </div>
              </Grid>
            ))}
        </>
      )}
      {!menu[superMenu.selectedMenu]?.cells?.length &&
        superMenu.selectedMenu !== -1 && (
          <>
            {Array(28)
              .fill("")
              .map((i, index) => (
                <Grid item sm={3} key={i.id}>
                  <div
                    onClick={() => {
                      dispatch(setPickModal(true));
                      setCellIndexForPoints(index);
                      setCellIndex(
                        calcPagesByIndex(index, superMenu.page.current)
                      );
                      onSelect(calcPagesByIndex(index, superMenu.page.current));
                    }}
                    style={{
                      borderRight: `4px solid #${
                        menu[superMenu.selectedMenu]?.color
                      }`,
                    }}
                    className={classes.box}
                  >
                    <p>
                      <AddIcon />{" "}
                      {calcPagesByIndex(index, superMenu.page.current) + 1}
                    </p>
                  </div>
                </Grid>
              ))}
          </>
        )}
      {!menu[superMenu.selectedMenu]?.cells?.length &&
        superMenu.selectedMenu === -1 && (
          <h1>برای نمایش لیست لطفا ابتدا یک منو انتخاب کنید یا بسازید</h1>
        )}
    </Grid>
  );
}

DealsItem.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default memo(DealsItem);
