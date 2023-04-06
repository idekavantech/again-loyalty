/* eslint-disable no-param-reassign */
/* eslint-disable indent */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useRef } from "react";
import { DivIcon } from "leaflet";
import {
  MapContainer,
  Polygon,
  FeatureGroup,
  Tooltip,
  TileLayer,
  Marker,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import useTheme from "@material-ui/core/styles/useTheme";
import { CDN_BASE_URL } from "@saas/utils/api";
import { noOp } from "@saas/utils/helpers/noOp";
import FullscreenRoundedIcon from "@material-ui/icons/FullscreenRounded";
import FullscreenExitRoundedIcon from "@material-ui/icons/FullscreenExitRounded";
const currentLocationSvg = `${CDN_BASE_URL}currentLocation.svg`;
const Map = MapContainer;
function ChangeView({
  center,
  zoom,
  ondrag,
  onMoveEnd,
  onzoomend,
  zoomControl,
  fitBounds,
}) {
  const map = useMap();
  useEffect(() => {
    if (fitBounds)
      setTimeout(() => map.fitBounds(fitBounds, { padding: [20, 20] }), 50);
  }, [JSON.stringify(fitBounds)]);
  useEffect(() => {
    map.setView(center, zoom, { zoomControl });
  }, [JSON.stringify(center), zoom, zoomControl]);
  if (ondrag) {
    map.on("drag", ondrag);
  }
  if (onMoveEnd) {
    map.on("moveend", onMoveEnd);
  }
  if (onzoomend) {
    map.on("zoomend", onzoomend);
  }

  return null;
}
const CustomMap = ({
  onClick,
  currentLocation,
  className = "",
  options: {
    height,
    width,
    ondrag,
    onMoveEnd = noOp,
    onzoomend,
    editMode,
    markers = [],
    center = {
      latitude: 35.70194,
      longitude: 51.389976,
    },
    zoom = 11,
    ref,
    groupRef,
    onPolygonCreate,
    onPolygonDelete,
    polygon,
    polygons,
    onPolygonEdit,
    themeColor,
    dragging = true,
    touchZoom,
    doubleClickZoom,
    scrollWheelZoom = true,
    zoomControl = false,
    zoomControlPosition = "topleft",
    boxZoom,
    fullscreenControl = false,
    keyboard,
    selectedMarkerId,
    hoveredMarkerId,
    fitBounds,
    borderRadius = 4,
  },
}) => {
  const theme = useTheme();
  themeColor = themeColor || theme.palette.primary.main;
  const icon = (index, inverted, hovered) =>
    new DivIcon({
      html: `<svg style="margin-top: -34.75px !important;margin-right: -7px !important;" width=${
        inverted ? 34 : hovered ? 30 : 24
      } height=${
        inverted ? 42 : hovered ? 38 : 32
      } viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.92588 7.52096C5.55504 7.52096 5.19254 7.41099 4.88419 7.20497C4.57585 6.99894 4.33553 6.7061 4.19361 6.36349C4.0517 6.02088 4.01456 5.64388 4.08691 5.28017C4.15925 4.91645 4.33784 4.58236 4.60006 4.32014C4.86228 4.05791 5.19637 3.87934 5.56008 3.80699C5.9238 3.73464 6.30081 3.77177 6.64343 3.91369C6.98604 4.0556 7.27886 4.29593 7.48489 4.60427C7.69091 4.91261 7.80088 5.27512 7.80088 5.64596C7.79315 6.14083 7.59313 6.61326 7.24316 6.96323C6.8932 7.3132 6.42075 7.51323 5.92588 7.52096ZM5.92588 0.39596C5.23525 0.391678 4.55064 0.524549 3.91174 0.78687C3.27285 1.04919 2.6924 1.43574 2.20403 1.9241C1.71567 2.41247 1.32911 2.99292 1.06679 3.63182C0.804468 4.27071 0.671599 4.95532 0.675882 5.64596C0.675882 8.79596 3.97589 13.071 5.32589 14.721C5.39143 14.8082 5.47637 14.879 5.574 14.9278C5.67162 14.9766 5.77926 15.002 5.88839 15.002C5.99752 15.002 6.10516 14.9766 6.20278 14.9278C6.30041 14.879 6.38535 14.8082 6.45089 14.721C7.80089 13.071 11.1009 8.79596 11.1009 5.64596C11.1199 4.95767 10.9997 4.27264 10.7473 3.632C10.495 2.99136 10.1157 2.40835 9.63235 1.91798C9.14898 1.42762 8.57149 1.04001 7.93455 0.778459C7.29761 0.516906 6.61437 0.386801 5.92588 0.39596Z" fill=${
                  inverted ? themeColor : "white"
                } stroke=${inverted ? "white" : "black"} stroke-width=0.6 >
             </svg>`,
      className: "no-border no-background",
    });
  const marker = useRef(null);
  const locationMarker = useRef(null);
  const map = useRef(null);
  const centerLocation = { ...center };
  const getIconIndex = (m, i) => {
    if (m.singleMarker) {
      return 30;
    }
    if (m.adsMarker) {
      return 31;
    }
    return i;
  };
  if (!centerLocation.latitude) {
    centerLocation.latitude = 35.70194;
  }
  if (!centerLocation.longitude) {
    centerLocation.longitude = 51.389976;
  }
  if (editMode) {
    return (
      <div className="position-relative">
        <svg
          className="u-marker"
          style={{
            marginTop: "-34.75px !important",
            marginRight: "-7px !important",
          }}
          width="24"
          height="32"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.92588 7.52096C5.55504 7.52096 5.19254 7.41099 4.88419 7.20497C4.57585 6.99894 4.33553 6.7061 4.19361 6.36349C4.0517 6.02088 4.01456 5.64388 4.08691 5.28017C4.15925 4.91645 4.33784 4.58236 4.60006 4.32014C4.86228 4.05791 5.19637 3.87934 5.56008 3.80699C5.9238 3.73464 6.30081 3.77177 6.64343 3.91369C6.98604 4.0556 7.27886 4.29593 7.48489 4.60427C7.69091 4.91261 7.80088 5.27512 7.80088 5.64596C7.79315 6.14083 7.59313 6.61326 7.24316 6.96323C6.8932 7.3132 6.42075 7.51323 5.92588 7.52096ZM5.92588 0.39596C5.23525 0.391678 4.55064 0.524549 3.91174 0.78687C3.27285 1.04919 2.6924 1.43574 2.20403 1.9241C1.71567 2.41247 1.32911 2.99292 1.06679 3.63182C0.804468 4.27071 0.671599 4.95532 0.675882 5.64596C0.675882 8.79596 3.97589 13.071 5.32589 14.721C5.39143 14.8082 5.47637 14.879 5.574 14.9278C5.67162 14.9766 5.77926 15.002 5.88839 15.002C5.99752 15.002 6.10516 14.9766 6.20278 14.9278C6.30041 14.879 6.38535 14.8082 6.45089 14.721C7.80089 13.071 11.1009 8.79596 11.1009 5.64596C11.1199 4.95767 10.9997 4.27264 10.7473 3.632C10.495 2.99136 10.1157 2.40835 9.63235 1.91798C9.14898 1.42762 8.57149 1.04001 7.93455 0.778459C7.29761 0.516906 6.61437 0.386801 5.92588 0.39596Z"
            fill={themeColor}
          />
        </svg>
        <Map
          leafletRef={ref || map}
          whenCreated={(mapInstance) => {
            if (ref) {
              ref.current = mapInstance;
            } else {
              map.current = mapInstance;
            }
          }}
          style={{ height, width, margin: "0 auto", borderRadius }}
          scrollWheelZoom={scrollWheelZoom}
          zoomControl={false}
        >
          {zoomControl && <ZoomControl position={zoomControlPosition} />}
          <ChangeView
            center={[+centerLocation.latitude, +centerLocation.longitude]}
            zoom={zoom}
            ondrag={ondrag}
            onMoveEnd={onMoveEnd}
            onzoomend={onzoomend}
            zoomControl={zoomControl}
            fitBounds={fitBounds}
          />
          <TileLayer url="https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
        </Map>
      </div>
    );
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .leaflet-container:not(:fullscreen) .exit-fullscreen {
              display: none;
            }
            .leaflet-container:fullscreen .request-fullscreen {
              display: none;
            }
          `,
        }}
      />
      <Map
        whenCreated={(mapInstance) => {
          if (ref) {
            ref.current = mapInstance;
          } else {
            map.current = mapInstance;
          }
        }}
        className={className}
        style={{ height, width, margin: "0 auto", borderRadius }}
        center={[+centerLocation.latitude, +centerLocation.longitude]}
        zoom={zoom}
        zoomControl={false}
        mapControl
        onClick={onClick}
        dragging={dragging}
        touchZoom={touchZoom}
        doubleClickZoom={doubleClickZoom}
        scrollWheelZoom={scrollWheelZoom}
        boxZoom={boxZoom}
        keyboard={keyboard}
      >
        {zoomControl && <ZoomControl position={zoomControlPosition} />}
        <ChangeView
          center={[+centerLocation.latitude, +centerLocation.longitude]}
          zoom={zoom}
          fitBounds={fitBounds}
        />
        <TileLayer url="https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
        {currentLocation && (
          <Marker
            ref={locationMarker}
            position={[currentLocation.latitude, currentLocation.longitude]}
            icon={
              new DivIcon({
                html: `<div style="background: url('${currentLocationSvg}'); margin-top: -13px; margin-right: -11px; width: 34px; height: 34px; "></div>`,
                className: "no-border no-background",
              })
            }
          />
        )}

        {polygons && polygons.length
          ? polygons.map((_polygon) => (
              <Polygon
                key={_polygon.name}
                pathOptions={{
                  fillColor: _polygon?.color
                    ? `#${_polygon.color}`
                    : themeColor,
                  color: _polygon?.color ? `#${_polygon.color}` : themeColor,
                }}
                positions={_polygon.points || []}
                eventHandlers={{
                  click: _polygon.click,
                }}
              >
                <Tooltip sticky direction="auto" offset={[0, 0]}>
                  <div>{_polygon.name}</div>
                </Tooltip>
              </Polygon>
            ))
          : null}

        {(onPolygonCreate || onPolygonEdit) && (
          <FeatureGroup>
            <EditControl
              edit={{
                create: false,
                remove: false,
              }}
              position="topleft"
              draw={{
                polygon: false,
                rectangle: false,
                polyline: false,
                circle: false,
                line: false,
                marker: false,
                circlemarker: false,
              }}
              onCreated={(e) => {
                onPolygonCreate(
                  e?.layer
                    ?.toGeoJSON()
                    ?.geometry?.coordinates?.[0]?.map((position) => [
                      position?.[1],
                      position?.[0],
                    ])
                );
              }}
              onEdited={(e) => {
                for (const layer in e.layers._layers) {
                  onPolygonEdit(
                    e?.layers?._layers?.[layer]?._latlngs?.[0]?.map((ll) => [
                      ll.lat,
                      ll.lng,
                    ])
                  );
                }
              }}
              onDeleted={(e) =>
                typeof onPolygonDelete === "function"
                  ? onPolygonDelete(e)
                  : null
              }
            />
            {polygon && (
              <Polygon
                pathOptions={{
                  color: polygon?.color ? `#${polygon.color}` : themeColor,
                }}
                positions={polygon?.points || []}
              />
            )}
          </FeatureGroup>
        )}

        <FeatureGroup ref={groupRef}>
          {markers && markers.length
            ? markers.map((m, i) =>
                m.latitude && m.longitude ? (
                  <Marker
                    key={`map-marker-${m.latitude}-${m.longitude}`}
                    ref={marker}
                    position={[m.latitude, m.longitude]}
                    eventHandlers={{
                      click: m.onClick,
                      mouseover: m.onMouseOver,
                      mouseout: m.onMouseOut,
                    }}
                    icon={icon(
                      getIconIndex(m, i),
                      m.markerId === selectedMarkerId,
                      m.markerId === hoveredMarkerId
                    )}
                  >
                    {m.tooltip && (
                      <Tooltip
                        onClick={() => {
                          m.onClick();
                        }}
                        direction="bottom"
                        offset={[60, 4]}
                        opacity={1}
                        permanent
                        interactive
                      >
                        {m.tooltip}
                      </Tooltip>
                    )}
                  </Marker>
                ) : null
              )
            : null}
        </FeatureGroup>
        {fullscreenControl ? (
          <>
            <FullscreenRoundedIcon
              className="position-absolute right-0 bottom-0 request-fullscreen"
              color="primary"
              onClick={() => {
                (ref || map)?.current?._container?.requestFullscreen();
              }}
            />
            <FullscreenExitRoundedIcon
              className="position-absolute right-0 bottom-0 exit-fullscreen"
              color="primary"
              fontSize="large"
              onClick={() => {
                document.exitFullscreen();
              }}
            />
          </>
        ) : null}
      </Map>
    </>
  );
};

export default memo(CustomMap);
