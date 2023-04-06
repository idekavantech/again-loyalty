import { memo, useEffect, useMemo } from "react";
import useTheme from "@material-ui/core/styles/useTheme";

const FieldLayoutSelect = ({ field, setValue, value }) => {
  const theme = useTheme();
  const optionsValues = useMemo(
    () => field.options.map((item) => item.value),
    [field.options]
  );
  useEffect(() => {
    if (!optionsValues.includes(value)) {
      setValue(optionsValues[0]);
    }
  }, [optionsValues, value]);

  return (
    <div className="pt-4 d-flex flex-wrap" onClick={(e) => e.stopPropagation()}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .layout-card{
                  transition: all 0.3s ease-in-out; 
                  border: 1px solid rgb(224,224,224);
                  border-radius : 4px ;
                  cursor: pointer;
                }
                .layout-card:hover{
                  box-shadow: 0 2px 16px rgb(0 0 0 / 10%), 0 4px 8px rgb(0 0 0 / 10%);
                }
              `,
        }}
      ></style>
      {field.options &&
        field.options.map((layout) => (
          <div
            key={layout.value}
            style={{
              width: "33%",
              borderRadius: 4,
              border: `2px solid ${
                layout.value === value ? theme.palette.primary.main : "#ffffff"
              }`,
              transition: "all 0.3s ease-in-out",
            }}
            className="cursor-pointer p-1"
            onClick={() => setValue(layout.value)}
          >
            <img
              alt="layout image"
              className="w-100 layout-card"
              src={layout.image}
            />
          </div>
        ))}
    </div>
  );
};

export default memo(FieldLayoutSelect);
