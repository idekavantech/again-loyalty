import React, { useState } from "react";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import Collapse from "@material-ui/core/Collapse";
import { text } from "@saas/utils/colors";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { units } from "store/constants";

export default function IngredientsPreview({ modifier, ingredients }) {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="w-100 mb-1">
      <div
        className="mt-2 d-flex align-items-center u-cursor-pointer"
        onClick={() => setCollapse(!collapse)}
      >
        <span className="u-fontSmall">View raw materials</span>
        <KeyboardArrowDownRoundedIcon
          fontSize="small"
          style={{
            transform: `rotate(${collapse ? 180 : 0}deg)`,
            transition: "all 0.3s ease-in-out",
          }}
        />
      </div>
      <Collapse in={collapse}>
        {ingredients.map((ingredient) => {
          const _ingredient = modifier.ingredients.find(
            (ing) => ing.ingredient_id === ingredient.id
          );
          return (
            <div
              key={ingredient.id}
              style={{ color: text.subdued }}
              className="d-flex justify-content-between align-items-center u-fontSmall mt-1"
            >
              <div>{ingredient.title}</div>
              <div>
                {englishNumberToPersianNumber(
                  ingredient.measure_unit * _ingredient.fraction
                )}{" "}
                {
                  (
                    units.find((u) => u.english === ingredient.unit) || {
                      persian: "",
                    }
                  ).persian
                }
              </div>
            </div>
          );
        })}
      </Collapse>
    </div>
  );
}
