import { useState } from "react";
import SefareshModal from "../Modal";
// import InputLabel from "@saas/components/InputLabel";
import { patch_label } from "../../context/actions";
import { useDispatch, useSelector } from "react-redux";
import SearchFilter from "@saas/components/SearchFilter";
import CustomizedRadios from "@saas/components/CustomizedRadios";
import CircularProgress from "@material-ui/core/CircularProgress";

const matx_points = [
  { from_point: [0, 0], to_point: [1, 1] },
  { from_point: [1, 0], to_point: [2, 1] },
  { from_point: [2, 0], to_point: [3, 1] },
  { from_point: [3, 0], to_point: [4, 1] },

  { from_point: [0, 1], to_point: [1, 2] },
  { from_point: [1, 1], to_point: [2, 2] },
  { from_point: [2, 1], to_point: [3, 2] },
  { from_point: [3, 1], to_point: [4, 2] },

  { from_point: [0, 2], to_point: [1, 3] },
  { from_point: [1, 2], to_point: [2, 3] },
  { from_point: [2, 2], to_point: [3, 3] },
  { from_point: [3, 2], to_point: [4, 3] },

  { from_point: [0, 3], to_point: [1, 4] },
  { from_point: [1, 3], to_point: [2, 4] },
  { from_point: [2, 3], to_point: [3, 4] },
  { from_point: [3, 3], to_point: [4, 4] },

  { from_point: [0, 4], to_point: [1, 5] },
  { from_point: [1, 4], to_point: [2, 5] },
  { from_point: [2, 4], to_point: [3, 5] },
  { from_point: [3, 4], to_point: [4, 5] },

  { from_point: [0, 5], to_point: [1, 6] },
  { from_point: [1, 5], to_point: [2, 6] },
  { from_point: [2, 5], to_point: [3, 6] },
  { from_point: [3, 5], to_point: [4, 6] },

  { from_point: [0, 6], to_point: [1, 7] },
  { from_point: [1, 6], to_point: [2, 7] },
  { from_point: [2, 6], to_point: [3, 7] },
  { from_point: [3, 6], to_point: [4, 7] },
];

export default function DealPicker({
  onClose,
  cellIndex,
  cellIndexForPoints,
  slug,
  products,
  posId,
  filterWord,
  setFilterWord,
}) {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.superMenu);

  // first index will be the selected deal parent
  // second index will be the seletected deal variation
  const [checked, setChecked] = useState([0, 0]);
  const [title, setTitle] = useState(null);
  const add_to_cell = () => {
    // shallow copy of our data
    let menu_shallow = { ...menu.value };
    // Loop over shallow to pass key,values to
    // the new_obj variable
    let new_obj = {};
    for (const [key, value] of Object.entries(
      menu_shallow[menu.selectedMenu]
    )) {
      // find the cells array
      let points = matx_points[cellIndexForPoints];
      if (key == "cells") {
        new_obj[key] = [
          ...value,
          {
            shortcut_key: parseInt(
              `${menu_shallow[menu.selectedMenu]?.shortcut}${cellIndex + 1}`
            ),
            resource_id: checked[0],
            ...points,
            title: title,
            variation_id: checked[1] ? checked[1] : null,
          },
        ];
      } else if (key !== "cells") {
        new_obj[key] = value;
      }
    }
    // replace new_obj variable with last object
    menu_shallow[menu.selectedMenu] = { ...new_obj };
    // dispatch new array with edited object into redux
    // dispatch(setMenuBulk(Object.values(menu_shallow)));
    dispatch(patch_label(new_obj, slug, posId));
    setChecked([0, 0]);
    setTitle(null);
    setFilterWord("");
  };
  const bodys = () => {
    return (
      <div
        style={{
          padding: 20,
          overflowY: "scroll",
          maxHeight: "60vh",
        }}
      >
        <SearchFilter onChange={(e) => setFilterWord(e.target.value)} />
        {products
          ?.filter((product) => product?.title.includes(filterWord))
          .map((product) => {
            return (
              <div key={product.id}>
                <CustomizedRadios
                  title={product.title}
                  checked={checked[0] === product.id}
                  subTitle={
                    product.variations.length > 1
                      ? null
                      : `${product?.variations?.[0]?.discounted_price} تومان`
                  }
                  onClick={() =>
                    checked[0] === product.id
                      ? // remove the deal parent & it's variation
                        setChecked([0, 0])
                      : (setTitle(product.title), setChecked([product.id, 0]))
                  }
                />
                {product.variations?.length > 1 && (
                  <>
                    {product.variations.map((variant) => (
                      <>
                        <CustomizedRadios
                          child
                          checked={checked[1] === variant.id}
                          onClick={() =>
                            checked[1] === variant.id
                              ? // remove the deal variation
                                setChecked([checked[0], 0])
                              : checked[0] === product.id
                              ? (setChecked([checked[0], variant.id]),
                                setTitle(variant.title))
                              : setChecked(
                                  [product.id, variant.id],
                                  setTitle(variant.title)
                                )
                          }
                          subTitle={`${variant?.discounted_price} تومان`}
                          title={variant.title}
                        />
                      </>
                    ))}
                  </>
                )}
                <p
                  style={{
                    border: "1px solid #E5E5E5",
                    width: "100%",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                ></p>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <SefareshModal
      isOpen={menu.pickDealModal}
      title={"انتخاب محصول"}
      bodys={bodys}
      onClose={onClose}
      bottomEndOnClick={checked[0] === 0 ? () => {} : add_to_cell}
      bottomStartText={
        menu.loadingSmall ? (
          <CircularProgress size={25} style={{ color: "white" }} />
        ) : checked[0] !== 0 ? (
          "افزودن"
        ) : (
          "انتخاب کنید"
        )
      }
    />
  );
}
