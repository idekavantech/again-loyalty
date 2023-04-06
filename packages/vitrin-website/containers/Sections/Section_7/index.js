import React, { memo, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import { Collapse } from "react-collapse";
function Faq1({ content, isMobile = "" }) {
  const {
    title: { value: title_value, color: title_color },
    background: { color: background_color },
    questions: { items = [] },
  } = content;
  const [isOpen, setIsOpen] = useState({});

  useEffect(() => {
    items.map((item, index) => setIsOpen({ ...isOpen, [index]: false }));
  }, []);

  return (
    <div className="container py-3 d-flex flex-column align-items-center justify-content-between">
      <div
        className={`${
          isMobile ? "col-12" : "col-lg-10"
        } px-4 text-right rtl u-fontWeightBold mb-2 u-pre-wrap u-overflow-wrap`}
        style={{ color: title_color, fontSize: isMobile ? 20 : 24 }}
      >
        {title_value}
      </div>
      {items.map((item, index) => (
        <Paper
          key={item.id}
          className={`${
            isMobile ? "col-12" : "col-lg-10"
          } faq-box my-1 position-relative text-right rtl`}
          style={{ backgroundColor: background_color }}
        >
          <div
            className="py-3 cursor-pointer pl-5 cursor-pointer u-fontLarge u-pre-wrap u-overflow-wrap"
            onClick={() => setIsOpen({ ...isOpen, [index]: !isOpen[index] })}
            style={{ color: item.title_color }}
          >
            {item.title}
          </div>
          <div
            className="position-absolute cursor-pointer"
            style={{ left: "16px", top: "16px", width: 24 }}
            onClick={() => setIsOpen({ ...isOpen, [index]: !isOpen[index] })}
          >
            {isOpen[index] ? (
              <ExpandLessRoundedIcon
                className="w-100"
                style={{ color: item.title_color }}
              />
            ) : (
              <ExpandMoreRoundedIcon
                className="w-100"
                style={{ color: item.title_color }}
              />
            )}
          </div>
          <Collapse isOpened={isOpen[index]} className="w-100">
            <style
              dangerouslySetInnerHTML={{
                __html: `
                      #reachTextContainer img{
                        max-width: 100%
                      }`,
              }}
            />
            <div
              id="reachTextContainer"
              className="py-3 u-fontLarge u-pre-wrap u-overflow-wrap"
              style={{ color: item.description_color }}
              dangerouslySetInnerHTML={{ __html: `${item.description}` }}
            ></div>
          </Collapse>
        </Paper>
      ))}
    </div>
  );
}

export default memo(Faq1);
