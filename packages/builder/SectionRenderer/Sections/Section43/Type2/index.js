import React, { memo, useEffect, useState } from "react";
import AdminSection from "@saas/components/AdminSection";
import Paper from "@material-ui/core/Paper";
import Typist from "react-typist";
import Button from "@material-ui/core/Button";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import SectionLink from "../../../components/SectionLink";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";

function Type2({
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  business,
  id,
  content,
  isMobile,
}) {
  const {
    title: { value: title_value, color: title_color },
    animation: { value: animation_value, color: animation_color },
    background_animation: { color: animation_background_color } = {},
    buttons: { items = [] },
  } = content;
  const { maxWidth768 } = useResponsive();
  const _isMobile = isMobile === "boolean" ? isMobile : maxWidth768;
  const businessAddress = business.get_vitrin_absolute_url;
  const [repeat, setRepeat] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const [pos, setPos] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    document.addEventListener("scroll", () => {
      let scrolled = document.scrollingElement.scrollTop;
      setPos(scrolled);
    });
  }, []);
  return (
    <AdminSection
      isEditMode={!!isEditMode}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
    >
      <Paper elevation={1} className="text-center">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            #${id}{
                background: ${animation_background_color};  
                background: -webkit-linear-gradient(to left, #8e9eab, #eef2f3);  
                width: 100%;
                height:  100vh;
            }
          `,
          }}
        ></style>
        <div id={id}>
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="p-3 h-100 w-100 d-flex flex-column align-items-center justify-content-center">
            <div></div>
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ flex: 1 }}
            >
              <div>
                <h1
                  className="u-fontWeightBold u-pre-wrap u-overflow-wrap"
                  style={{ color: title_color, fontSize: isMobile ? 35 : 65 }}
                >
                  {title_value}
                </h1>
                {animation_value && (
                  <Typist
                    className="my-2"
                    cursor={{ show: false }}
                    key={repeat}
                    onTypingDone={() => setRepeat(!repeat)}
                  >
                    <div style={{ minHeight: 50 }}>
                      {animation_value.split("\n").map((word) => [
                        <span
                          key={word.id}
                          className="u-fontWeightBold"
                          style={{
                            color: animation_color || "",
                            fontSize: isMobile ? 28 : 32,
                          }}
                        >
                          {word}
                        </span>,
                        <Typist.Backspace
                          key={word.id}
                          count={word.length}
                          delay={500}
                        />,
                      ])}
                    </div>
                  </Typist>
                )}
              </div>
              <div
                className="mb-3"
                style={{
                  marginTop: `${_isMobile ? "" : " 30px "}`,
                }}
              >
                {items[0] && (
                  <SectionLink
                    isExternal={isUrlExternal(items[0].link)}
                    href={items[0].link}
                    businessAddress={businessAddress}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      className={`${
                        items[1] && items[1].text !== "" && "ml-2 "
                      }`}
                      size="large"
                      style={{
                        minWidth: 130,
                        color: items[0].color,
                        backgroundColor: items[0].background_color,
                      }}
                    >
                      {items[0].text}
                    </Button>
                  </SectionLink>
                )}
                {items[1] && (
                  <SectionLink
                    href={items[1].link}
                    isExternal={isUrlExternal(items[1].link)}
                    businessAddress={businessAddress}
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      style={{
                        minWidth: 130,
                        color: items[1].color,
                        border: `1px solid ${items[1].background_color}`,
                      }}
                    >
                      {items[1].text}
                    </Button>
                  </SectionLink>
                )}
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html: `
            .MuiButton-endIcon {
                margin : 0px;
            }
        `,
                }}
              ></style>
              {items[2] && (
                <SectionLink
                  href={items[2].link}
                  businessAddress={businessAddress}
                  isExternal={isUrlExternal(items[2].link)}
                >
                  <Button
                    size="large"
                    className="mx-0"
                    endIcon={<ChevronLeftRoundedIcon className="mx-0" />}
                    style={{ minWidth: 130, color: items[2].color }}
                  >
                    {items[2].text}
                  </Button>
                </SectionLink>
              )}
            </div>
            <div
              className="d-flex justify-content-center"
              style={{
                position: "sticky",
                bottom: 20,
              }}
            >
              {pos < windowHeight && (
                <div
                  style={{ width: 20, opacity: 0.5 }}
                  className="arrow1 u-cursor-pointer"
                  onClick={() => window.scrollTo(0, windowHeight)}
                >
                  <svg
                    className="arrow1 u-cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="33"
                    viewBox="0 0 28 33"
                  >
                    <defs>
                      <filter id="finger-down-a">
                        <feColorMatrix
                          in="SourceGraphic"
                          values="0 0 0 0 0.000000 0 0 0 0 0.000000 0 0 0 0 0.000000 0 0 0 1.000000 0"
                        />
                      </filter>
                    </defs>
                    <g
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="translate(-706 -944)"
                    >
                      <path
                        stroke={title_color}
                        strokeWidth="1.438"
                        d="M14.12,18.61 L14.12,29.24 C14.1199941,29.8358216 14.3573656,30.4070951 14.7796124,30.8274652 C15.2018592,31.2478354 15.7741843,31.4826599 16.37,31.4800224 L16.37,31.4800224 C17.6071178,31.4800224 18.61,30.4771178 18.61,29.24 L18.61,13.59 L23.23,18.52 C23.9562218,19.2912075 25.1359661,19.4185181 26.01,18.82 L26.01,18.82 C26.4854308,18.499385 26.8130829,18.0021301 26.9201208,17.438773 C27.0271587,16.8754158 26.9047119,16.2926421 26.58,15.82 L24.06,12.82 C21.919663,10.3044881 20.2283019,7.43932247 19.06,4.35 L18.19,2 C17.8905333,1.22386034 17.1418887,0.714144906 16.31,0.719950084 L4.89,0.719950084 C4.00947358,0.734515754 3.24205803,1.32327372 3,2.17 L1.8,6.24 C1.08186803,8.74015413 0.718319561,11.3287539 0.719994201,13.93 L0.719994201,17.62 C0.719994201,18.9675748 1.81242521,20.06 3.16,20.06 L3.16,20.06 C3.72398959,20.0626604 4.26579246,19.8404789 4.66553502,19.442613 C5.06527758,19.0447472 5.29000627,18.5039959 5.29,17.94 L5.29,20.15 C5.29,21.4699606 6.36003945,22.54 7.68,22.54 L7.68,22.54 C8.7845695,22.54 9.68,21.6445695 9.68,20.54 L9.68,22.54 C9.68,23.7660721 10.6739279,24.76 11.9,24.76 L11.9,24.76 C13.1260721,24.76 14.12,23.7660721 14.12,22.54 L14.12,18.61 Z"
                        transform="translate(706 944)"
                      />
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </Paper>
    </AdminSection>
  );
}

export default memo(Type2);
