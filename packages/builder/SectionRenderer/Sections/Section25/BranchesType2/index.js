import React, { memo, useRef } from "react";
import AdminSection from "@saas/components/AdminSection";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import AspectRatio from "react-aspect-ratio";
import Link from "next/link";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function Section25({
  isEditMode,
  onClick,
  isActive,
  _updateSection,
  isDragging,
  dragHandleProps,
  content,
  isMobile,
}) {
  const { minWidth768 } = useResponsive();

  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;

  const { branches } = content;
  const items = branches?.items || [];
  const mapRef = useRef(null);
  const markers = items.map((item) => ({
    latitude: item.latitude,
    longitude: item.longitude,
    tooltip: item.tooltip,
  }));
  const mapOptions = {
    height: "500px",
    width: "100%",
    ref: mapRef,
    zoom: 11,
    center: markers[0],
    markers: markers,
    dragging: isDesktop,
  };
  return (
    <AdminSection
      isEditMode={!!isEditMode}
      onClick={onClick}
      isActive={isActive}
      _updateSection={_updateSection}
      isDragging={isDragging}
      dragHandleProps={dragHandleProps}
    >
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
        
        [style*="--aspect-ratio"] > :first-child {
          width: 100%;
        }
        [style*="--aspect-ratio"] > img {  
          height: auto;
        }
        @supports (--custom:property) {
          [style*="--aspect-ratio"] {
            position: relative;
          }
          [style*="--aspect-ratio"]::before {
            height: 0;
            content: "";
            display: block;
            padding-bottom: calc(100% / (var(--aspect-ratio)));
          }  
          [style*="--aspect-ratio"] > :first-child {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
          }  
        }
        `,
          }}
        ></style>
        <Paper elevation={0} className="container p-3 mt-3">
          <Map ref={mapRef} options={mapOptions} />
          <div className="mt-3">
            {items.map((item) => (
              <div key={item.id} className="text-right py-3 d-flex flex-wrap">
                <div className={isMobile ? "col-12" : "col-lg-3"}>
                  <AspectRatio
                    ratio={16 / 9}
                    style={{
                      maxWidth: "300px",
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      borderRadius: 4,
                    }}
                  ></AspectRatio>
                </div>
                <div className={isMobile ? "col-12" : "col-lg-7"}>
                  <div>{item.name}</div>
                  <div className="mt-3">
                    Address:‌{" "}
                    <span
                      dangerouslySetInnerHTML={{ __html: item.address }}
                    ></span>
                  </div>
                  <div className="mt-3">
                    Phone: <a href={`tel:${item.phone}`}>{item.phone}</a>
                  </div>
                </div>
                <div className={isMobile ? "col-12" : "col-lg-2"}>
                  {item.button_text && (
                    <Link passHref href={item.button_link}>
                      <Button
                        variant="contained"
                        type="text"
                        color="secondary"
                        className="w-100"
                      >
                        {item.button_text}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Paper>
      </div>
    </AdminSection>
  );
}

export default memo(Section25);
