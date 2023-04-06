/**
 *
 * AdminThemeSettings
 *
 */
import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ScreenSplitter from "@saas/components/ScreenSplitter";
import MenuSelector from "./components/MenuSelector";
import DealsItem from "./components/DealsItem";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paginator from "./components/Paginator";
import Button from "@material-ui/core/Button";
import MenuSectionContainer from "./components/MenuSectionContainer";
import DealSelected from "./components/DealSelected";
import Paper from "@material-ui/core/Paper";

import { useDispatch, useSelector } from "react-redux";
import { get_pos_labels, get_pos_devices } from "./context/actions";
import {
  setPositions,
  selectDevice,
  selectMenu,
  set,
} from "./context/superMenu";

import PosDeviceIcon from "@saas/icons/PosDeviceIcon";
import { CDN_BASE_URL } from "@saas/utils/api";
import { CircularProgress } from "@material-ui/core";

function AdminSuperMenu({ slug, getProducts, products, isLoading = true }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = isLoading;
  const positions = useSelector((state) => state.superMenu.positions);
  const pages = useSelector((state) => state.superMenu.page);
  const devices = useSelector((state) => state.superMenu.devices);
  const deviceSelected = router.query?.deviceId;
  const selectedSlug =
    devices?.find((device) => device.id === +router.query?.deviceId)
      ?.business_slug || slug;
  // fetch menus for this business
  useEffect(() => {
    if (deviceSelected && selectedSlug) {
      dispatch(selectMenu(-1));

      setTimeout(() => {
        dispatch(get_pos_labels(selectedSlug, deviceSelected));
      }, 0);
    }
  }, [selectedSlug, deviceSelected]);

  // fetch devices of this business
  // and products items
  useEffect(() => {
    // eslint-disable-next-line
    if (selectedSlug) {
      setTimeout(() => {
        getProducts(selectedSlug);
        dispatch(get_pos_devices(selectedSlug, deviceSelected));
      }, 0);
    }
  }, [selectedSlug]);
  if (loading || !devices.length)
    return (
      <div style={{ height: "30vh" }}>
        <CircularProgress />
      </div>
    );
  if (devices?.length && !deviceSelected) {
    return (
      <div className="row m-5 justify-content-center align-items-center">
        {devices
          .filter((i) => i.extra_data.template_type == 1)
          .map((i) => (
            <Paper
              key={i.id}
              className="mt-4 mx-2 p-4 position-relative u-border-radius-8 d-flex flex-column justify-content-center align-items-center col-sm-3"
            >
              <PosDeviceIcon />
              <br />
              <p style={{ fontSize: 18 }}>{i?.name}</p>
              <br />
              <Button
                color="primary"
                onClick={() => {
                  router.push({
                    pathname: router.pathname,
                    query: {
                      ...router.query,
                      deviceId: i.id,
                    },
                  });
                  dispatch(selectDevice(i.id));
                }}
              >
                Menu building
              </Button>
            </Paper>
          ))}
        {!devices.filter((i) => i.extra_data.template_type == 1).length && (
          <div className="d-flex flex-1 flex-column justify-content-center align-items-center p-5">
            <img alt="" src={`${CDN_BASE_URL}empty_devices.png`} />
            <div className="mt-4">Was not found with this device filter</div>
          </div>
        )}
      </div>
    );
  } else if (deviceSelected) {
    return (
      <>
        <Head>
          <title>Product layout and shortcut</title>
        </Head>
        <div style={{ minHeight: "100vh", padding: 10 }}>
          <div className="container">
            <AdminBreadCrumb
              bgWhite
              backFc={() => {
                dispatch(set([]));
                dispatch(selectDevice(null));
                router.back();
              }}
            />
          </div>
          <ScreenSplitter
            right={() => (
              <>
                <MenuSectionContainer slug={selectedSlug} />
                <DealSelected slug={selectedSlug} />
              </>
            )}
            left={() => (
              <>
                <div style={{ backgroundColor: "#F2F4F5", marginTop: 14 }}>
                  <ScreenSplitter
                    right={() => (
                      <div>
                        <p style={{ fontSize: 17, fontWeight: "bold" }}>
                          Intended
                        </p>
                        <MenuSelector
                          posDeviceId={deviceSelected}
                          slug={selectedSlug}
                          selected={positions.menu}
                          onSelect={(o) => {
                            dispatch(
                              setPositions({
                                ...positions,
                                menu: o,
                              })
                            );
                          }}
                          positions={positions}
                        />
                      </div>
                    )}
                    left={() => (
                      <div>
                        {Number.isInteger(pages?.current) && (
                          <p style={{ fontSize: 17, fontWeight: "bold" }}>
                            Page{pages?.current + 1}/{pages?.total}
                          </p>
                        )}
                        <DealsItem
                          selected={positions.item}
                          slug={selectedSlug}
                          onSelect={(o) => {
                            dispatch(
                              setPositions({
                                ...positions,
                                item: o,
                              })
                            );
                          }}
                          positions={positions}
                          products={products}
                          posId={deviceSelected}
                        />
                        <Paginator
                          goDown={() =>
                            dispatch(
                              setPositions({
                                ...positions,
                                page: page - 1,
                              })
                            )
                          }
                          goUp={() =>
                            dispatch(
                              setPositions({
                                ...positions,
                                page: page + 1,
                              })
                            )
                          }
                          page={positions.page}
                        />
                      </div>
                    )}
                    sizes={[2, 10]}
                  />
                </div>
              </>
            )}
            sizes={[3, 9]}
          />
        </div>
      </>
    );
  }
}

export default AdminSuperMenu;
