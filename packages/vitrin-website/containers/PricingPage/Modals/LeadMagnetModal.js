import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import SelectOfPossibilities from "../components/SelectOfPossibilities";
import LoginComponent from "../components/LoginComponent";
import { useRouter } from "next/router";
import CloseIcon from "@material-ui/icons/Close";

const LeadMagnet = ({ isOpen, onClose }) => {
  const desktopMatches = useMediaQuery("(min-width:1200px)");
  const [selectedOpp, setSelectedOpp] = useState([]);
  const [step, setStep] = useState(1);
  const router = useRouter();

  return (
    <Dialog
      open={isOpen}
      className="p-0 w-100"
      PaperProps={{
        style: {
          width: desktopMatches ? 1085 : 320,
          margin: 0,
          borderRadius: 8,
          maxHeight: desktopMatches ? 668 : 745,
        },
      }}
      maxWidth="xl"
    >
      <DialogContent className="w-100 lead-magnet-container d-flex flex-col flex-xl-row  p-0">
        <button
          style={{
            position: "absolute",
            top: desktopMatches ? 16 : 8,
            right: desktopMatches ? 16 : 8,
            color: "#fff",
            zIndex: 10,
          }}
          onClick={onClose}
        >
          <CloseIcon style={{ cursor: "pointer" }} />
        </button>
        <div
          className={`flex-1 position-relative lead-magnet-header ${
            router.query.phone && !desktopMatches ? "d-none" : "d-block"
          }`}
        ></div>
        <div className="d-flex flex-col card-container">
          {step == 1 ? (
            <SelectOfPossibilities
              selectedOpp={selectedOpp}
              setSelectedOpp={setSelectedOpp}
              setStep={setStep}
              step={step}
            />
          ) : null}
          {step == 2 ? (
            <LoginComponent onClose={onClose} selectedOpp={selectedOpp} />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnet;
