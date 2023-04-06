import SefareshModal from "../Modal";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { setMenuBulk } from "../../context/superMenu";
import { patch_label } from "../../context/actions";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { useRouter } from "next/router";

const useStyles = makeStyles(() => ({
  bodyText: {
    fontSize: 18,
    padding: 20,
    margin: 10,
  },
}));

export default function RemoveDeal({ isOpen, onClose, slug }) {
  const classes = useStyles();
  const router = useRouter();
  const posId = router.query?.deviceId;
  const bodys = useCallback(() => {
    () => {
      return (
        <>
          <p className={classes.bodyText}>
            آیا از حذف محصول مطمئا هستید؟ بعد از حذف شما دیگر قادر به مشاهده
            محصول در نرم افزار درآمد نمیباشید
          </p>
        </>
      );
    };
  }, [classes]);

  const menu = useSelector((state) => state.superMenu);
  const dispatch = useDispatch();

  const remove_deal = () => {
    // shallow copy of our data
    let menu_shallow = { ...menu.value };
    // Loop over shallow to pass key,values to
    // the new_obj variable
    let new_obj = {};
    for (const [key, value] of Object.entries(
      menu_shallow[menu.selectedMenu]
    )) {
      // find the cells array
      if (key == "cells") {
        // filter the deals
        // and remove the one we want
        let new_value = value.filter(
          (i) =>
            i.shortcut_key.toString().substring(1) !=
            menu.selectedDeal.shortcutKey
        );
        //alert(JSON.stringify(value))
        new_obj[key] = new_value;
      } else if (key !== "cells") {
        new_obj[key] = value;
      }
    }
    // replace new_obj variable with last object
    menu_shallow[menu.selectedMenu] = { ...new_obj };
    // dispatch new array with edited object into redux
    dispatch(setMenuBulk(Object.values(menu_shallow)));
    // send changes to backend
    dispatch(patch_label(new_obj, slug, posId));
  };

  return (
    <SefareshModal
      isOpen={isOpen}
      title="حذف محصول"
      bodys={bodys}
      bottomStartText="لغو"
      bottomEndText={
        menu.loadingSmall ? (
          <CircularProgress size={25} style={{ color: "white" }} />
        ) : (
          "حذف محصول"
        )
      }
      bottomStartOnClick={remove_deal}
      bottomStartColor="#ff0017"
      bottomEndVariant="outlined"
      bottomEndOnClick={onClose}
      onClose={onClose}
    />
  );
}
