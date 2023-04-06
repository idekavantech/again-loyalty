import { useState } from "react";
import SefareshModal from "../Modal";
import InputLabel from "@saas/components/InputLabel";
import { setMenuBulk } from "../../context/superMenu";
import { patch_label } from "../../context/actions";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useRouter } from "next/router";

export default function EditDeal({ isOpen, onClose, slug }) {
  const menu = useSelector((state) => state.superMenu);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const router = useRouter();
  const posId = router.query?.deviceId;

  const edit_deal_title = () => {
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
        // now get the deal we wanna edit
        let deal_to_edit = value.find(
          (i) =>
            i.shortcut_key.toString().substring(1) ==
            menu.selectedDeal.shortcutKey
        );
        // make new deal object
        // map last items with edited title into it
        let new_deal = {};
        for (const [k, v] of Object.entries(deal_to_edit)) {
          if (k !== "title") {
            new_deal[k] = v;
          } else {
            new_deal[k] = input;
          }
        }
        // push the new deal with title into cells
        new_obj[key] = [
          ...new_value,
          {
            ...new_deal,
          },
        ];
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

  const bodys = () => {
    return (
      <div style={{ padding: 20 }}>
        <InputLabel
          questionLabel="Product Name"
          menuName={input}
          note="You can choose from acronyms for your product in the sales software and see the abbreviation on your device."
          placeholder={menu.selectedDeal.titleAppended}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    );
  };

  return (
    <SefareshModal
      isOpen={isOpen}
      title="Product editing"
      headerButtonText={
        menu.loadingSmall ? (
          <CircularProgress size={25} style={{ color: "white" }} />
        ) : (
          "Store"
        )
      }
      bodys={bodys}
      onTopHeaderBtnClick={edit_deal_title}
      onClose={onClose}
    />
  );
}
