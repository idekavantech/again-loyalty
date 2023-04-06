import { memo } from "react";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectMenu, setPage } from "../../context/superMenu";
import { post_created_deal } from "../../context/actions";
import { findoutMissedNumbersFromArrays } from "@saas/utils/helpers/findoutMissedNumbersFromArrays";

const useStyles = makeStyles(() => ({
  box: {
    width: "70%",
    maxWidth: 90,
    fontSize: 20,
    color: "white",
    backgroundColor: "#FFFFFF80",
    textAlign: "center",
    padding: 10,
    marginTop: 2,
    border: "0.5px solid transparent",
    "&:hover": {
      border: "0.5px solid #006AFF",
      cursor: "pointer",
    },
  },
  boxSelected: {
    width: "70%",
    maxWidth: 90,
    fontSize: 20,
    color: "white",
    backgroundColor: "white",
    textAlign: "center",
    padding: 20,
    marginTop: 2,
    border: "0.5px solid #006AFF",
  },
  boxSimple: {
    width: "70%",
    maxWidth: 90,
    fontSize: 20,
    backgroundColor: "white",
    color: "white",
    textAlign: "center",
    padding: 20,
    marginTop: 2,
    cursor: "pointer",
    border: "0.5px solid transparent",
    "&:hover": {
      border: "0.5px solid #006AFF",
    },
  },
}));

function MenuSelector({ slug, posDeviceId }) {
  const classes = useStyles();
  const superMenu = useSelector((state) => state.superMenu);
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.superMenu.page);
  // we use this state to know user added
  // new label, so disable the add feature
  return (
    <>
      {superMenu?.value && (
        <>
          {superMenu.value.map((i, index) => (
            <div
              key={i.id}
              onClick={() => {
                dispatch(selectMenu(index));
                dispatch(setPage({ ...pages, current: 0 }));
              }}
              style={{
                backgroundColor: `#${i.color}`,
              }}
              className={
                superMenu.selectedMenu === index
                  ? classes.boxSelected
                  : classes.boxSimple
              }
            >
              {i.shortcut}
              <p style={{ fontSize: 12 }}>{i.nickname}</p>
            </div>
          ))}
        </>
      )}
      {superMenu.value.length < 10 && (
        <div
          className={classes.box}
          onClick={() => {
            let listOfShortcuts = [];
            // get list of all shortcuts
            // to figure out the missing ones later
            // and assign it to new label shortcut we wanna
            // create it
            superMenu.value.map((i) => listOfShortcuts.push(i?.shortcut));
            // dispatch new label
            dispatch(
              post_created_deal(
                {
                  shortcut: findoutMissedNumbersFromArrays(listOfShortcuts),
                  title: superMenu.value.length + 1,
                  nickname: `نام منو ${superMenu.value.length + 1}`,
                  color: "878D91",
                  cells: [],
                  pos_device: posDeviceId,
                },
                slug,
                posDeviceId
              )
            );
            // disable add button
            // setNewlyAdded(true);
          }}
        >
          <AddIcon style={{ fontSize: 35, color: "black" }} />
        </div>
      )}
    </>
  );
}

MenuSelector.propTypes = {
  selected: PropTypes.number.isRequired,
};

export default memo(MenuSelector);
