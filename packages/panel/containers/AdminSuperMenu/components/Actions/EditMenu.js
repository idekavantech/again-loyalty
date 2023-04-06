import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import SefareshModal from "../Modal";
import ScreenSplitter from "@saas/components/ScreenSplitter";
import InputLabel from "@saas/components/InputLabel";
import ColorPickerGrid from "@saas/components/ColorPickerGrid";
import MenuImagePicker from "@saas/components/MenuImagePicker";
import { setMenuBulk } from "../../context/superMenu";
import { patch_label } from "../../context/actions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function EditMenu({ isOpen, onClose, slug }) {
  const menu = useSelector((state) => state.superMenu);
  // set with menu color comming from api
  const [picked, setPickedColor] = useState(null);
  const [menuName, setMenuName] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const posId = router.query?.deviceId;

  // MAKE STATES EMPTY ON RERENDER
  useEffect(() => {
    if (menu.value) {
      setMenuName(null);
      setPickedColor(`#${menu.value[menu.selectedMenu]?.color}`);
    }
  }, [isOpen, menu.value]);

  const bodys = () => {
    return (
      <ScreenSplitter
        left={() => <MenuImagePicker pickedColor={picked} />}
        right={() => (
          <>
            <InputLabel
              placeholder={
                menu.value[menu.selectedMenu].nickname ||
                menu.value[menu.selectedMenu].title
              }
              menuName={menuName}
              questionLabel="نام منو"
              onChange={(e) => setMenuName(e.target.value)}
            />
            <ColorPickerGrid
              menuColor={picked}
              onPickColor={(color) => setPickedColor(color)}
            />
          </>
        )}
        sizes={[6, 6]}
      />
    );
  };

  const edit_menu = () => {
    // shallow copy of our data
    let menu_shallow = { ...menu.value };
    // Loop over shallow to pass key,values to
    // the new_obj variable
    let new_obj = {};
    for (const [key, value] of Object.entries(
      menu_shallow[menu.selectedMenu]
    )) {
      if (key == "color") {
        new_obj[key] = picked.split("#").pop();
      }
      if (key === "nickname") {
        new_obj[key] = menuName;
      } else if (key !== "color" && key !== "nickname") {
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
      title="ویرایش منو"
      headerButtonText={
        menu.loadingSmall ? (
          <CircularProgress size={25} style={{ color: "white" }} />
        ) : (
          "ذخیره"
        )
      }
      bodys={bodys}
      onClose={onClose}
      onTopHeaderBtnClick={edit_menu}
    />
  );
}
