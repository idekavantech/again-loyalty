import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import dynamic from "next/dynamic";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { night } from "@saas/utils/colors";
import { googleMapsNavigate } from "@saas/utils/helpers/googleMapsNavigate";
import { neshanNavigate } from "@saas/utils/helpers/neshanNavigate";
import { baladNavigate } from "@saas/utils/helpers/baladNavigate";
import { wazeNavigate } from "@saas/utils/helpers/wazeNavigate";

const googleMapIcon = `https://hs3-cdn-saas.behtarino.com/media/richtext/google_maps_icon.png`;
const wazeIcon = `https://hs3-cdn-saas.behtarino.com/media/richtext/waze-icon.png`;
const baladIcon = `https://hs3-cdn-saas.behtarino.com/media/richtext/balad-logo.png`;
const neshanIcon = `https://hs3-cdn-saas.behtarino.com/media/richtext/neshan-icon.png`;

const Map = dynamic(() => import("@saas/components/Map"), { ssr: false });

export function NavigationModal({ isOpen, onClose, mapOptions }) {
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent className="w-100">
        <div className="d-flex align-items-center justify-content-between">
          <div style={{ color: night, fontWeight: 500 }}>Customer address</div>
          <div>
            <IconButton onClick={onClose} style={{ color: night }}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </div>
        <div className="mt-2">
          <Map options={{ ...mapOptions, height: 550 }} />
        </div>
      </DialogContent>
      <DialogActions
        className="mt-3 d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <div style={{ color: night }} className="ml-5">
          Routing with
        </div>
        <div className="d-flex">
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              googleMapsNavigate(
                mapOptions?.center?.latitude,
                mapOptions?.center?.longitude
              )
            }
          >
            <div className="d-flex align-items-end">
              <img
                alt=""
                style={{ width: 24, height: 24 }}
                src={googleMapIcon}
              />
              <div className="mr-1 d-flex align-items-center">Google map</div>
            </div>
          </Button>
          <Button
            variant="outlined"
            size="small"
            className="mr-3"
            onClick={() =>
              wazeNavigate(
                mapOptions?.center?.latitude,
                mapOptions?.center?.longitude
              )
            }
          >
            <div className="d-flex align-items-end">
              <img alt="" style={{ width: 24, height: 24 }} src={wazeIcon} />
              <div className="mr-1 d-flex align-items-center">Waze</div>
            </div>
          </Button>
          <Button
            variant="outlined"
            size="small"
            className="mr-3"
            onClick={() =>
              baladNavigate(
                mapOptions?.center?.latitude,
                mapOptions?.center?.longitude
              )
            }
          >
            <div className="d-flex align-items-end">
              <img alt="" style={{ width: 24, height: 24 }} src={baladIcon} />
              <div className="mr-1 d-flex align-items-center">country</div>
            </div>
          </Button>
          <Button
            variant="outlined"
            size="small"
            className="mr-3"
            onClick={() =>
              neshanNavigate(
                mapOptions?.center?.latitude,
                mapOptions?.center?.longitude
              )
            }
          >
            <div className="d-flex align-items-end">
              <img alt="" style={{ width: 24, height: 24 }} src={neshanIcon} />
              <div className="mr-1 d-flex align-items-center">sign</div>
            </div>
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default memo(NavigationModal);
