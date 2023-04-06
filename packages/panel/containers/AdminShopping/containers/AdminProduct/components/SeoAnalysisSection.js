import React, { useEffect, useState } from "react";
import { jungleI, peachIII, pollution, strawberryI } from "@saas/utils/colors";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import { SEOAnalyser } from "@saas/utils/SEOHelper";
import Collapse from "@material-ui/core/Collapse";
import AdminProductInBoxWrapper from "./AdminProductInBoxWrapper";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function SeoAnalysisSection({ seo, product, business }) {
  const [collapse, setCollapse] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [SEOResult, setSeoResult] = useState(null);
  const { minWidth768 } = useResponsive();

  useEffect(() => {
    if (Object.keys(seo)?.length) {
      clearTimeout(timeoutId);
      const id = setTimeout(() => {
        const result = SEOAnalyser({
          raw_body: product.description || "",
          body: product.description || "",
          ...seo,
          business_url: business.get_vitrin_absolute_url,
        });
        setSeoResult(result);
      }, 1000);
      setTimeoutId(id);
    }
  }, [seo]);

  return (
    <AdminProductInBoxWrapper padding={`0px ${minWidth768 ? "48px" : ""}`}>
      <div className={"col-12"}>
        <div className="my-3 overflow-hidden d-flex w-100 align-items-center flex-col justify-content-center">
          {!collapse && (
            <div
              className="position-absolute"
              style={{
                backgroundColor: "red",
                width: minWidth768 ? 16 : 6,
                height: minWidth768 ? 16 : 40,
                borderRadius: minWidth768 ? 20 : 0,
                right: minWidth768 ? -5 : 0,
                transition: "all ease-in-out 0.3s",
              }}
            ></div>
          )}
          <div
            className="d-flex align-items-center justify-content-between u-cursor-pointer w-100"
            style={{ minHeight: 48 }}
            onClick={() => setCollapse(!collapse)}
          >
            <span className="u-fontLarge u-fontWeightBold">
              SEO analysis on this page
            </span>
            {collapse ? (
              <ArrowDropUpRoundedIcon fontSize="large" />
            ) : (
              <ArrowDropDownRoundedIcon fontSize="large" />
            )}
          </div>
          <Collapse in={collapse}>
            <div
              style={{ borderRight: `solid 4px ${strawberryI}` }}
              className="my-3 w-100"
            >
              {SEOResult &&
                Object.keys(SEOResult)
                  .filter((item) => SEOResult[item].score === 0)
                  .map((item) => (
                    <div className="px-2 mt-3" key={item.id}>
                      <div
                        style={{
                          color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                        }}
                      >
                        {SEOResult[item].title}
                      </div>
                      <div className="mt-1" style={{ color: pollution }}>
                        {SEOResult[item].description}
                      </div>
                    </div>
                  ))}
            </div>
            <div
              style={{ borderRight: `solid 4px ${peachIII}` }}
              className="my-3"
            >
              {SEOResult &&
                Object.keys(SEOResult)
                  .filter((item) => SEOResult[item].score === 1)
                  .map((item) => (
                    <div className="px-2 mt-3" key={item.id}>
                      <div
                        style={{
                          color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                        }}
                      >
                        {SEOResult[item].title}
                      </div>
                      <div className="mt-1" style={{ color: pollution }}>
                        {SEOResult[item].description}
                      </div>
                    </div>
                  ))}
            </div>
            <div
              style={{ borderRight: `solid 4px ${jungleI}` }}
              className="my-3"
            >
              {SEOResult &&
                Object.keys(SEOResult)
                  .filter((item) => SEOResult[item].score === 2)
                  .map((item) => (
                    <div className="px-2 mt-3" key={item.id}>
                      <div
                        style={{
                          color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                        }}
                      >
                        {SEOResult[item].title}
                      </div>
                      <div className="mt-1" style={{ color: pollution }}>
                        {SEOResult[item].description}
                      </div>
                    </div>
                  ))}
            </div>
          </Collapse>
        </div>
      </div>
    </AdminProductInBoxWrapper>
  );
}
