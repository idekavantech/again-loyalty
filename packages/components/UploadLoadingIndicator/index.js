import React from "react";
import { useRouter } from "next/router";

export default function UploadLoadingIndicator({ isLoading }) {
  const router = useRouter();
  const isMenuPage = router.pathname === "/menu";
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "#323232bf",
        opacity: isLoading ? 1 : 0,
        transition: "all 0.3s ease-in-out",
        pointerEvents: isLoading ? "fill" : "none",
        zIndex: 10000,
        display: isMenuPage && !isLoading ? "none" : "flex", // This component would make style issues in Menu page that is only mobile view
      }}
      className="flex-column align-items-center justify-content-center"
    >
      <div className="position-absolute w-100 d-flex flex-column align-items-center justify-content-center">
        <>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .lds-default-secondary {
                  display: inline-block;
                  position: relative;
                  width: 80px;
                  height: 80px;
                }
                .lds-default-secondary div {
                  position: absolute;
                  width: 6px;
                  height: 6px;
                  background: #fff;
                  border-radius: 50%;
                  animation: lds-default-secondary 1.2s linear infinite;
                }
                .lds-default-secondary div:nth-child(1) {
                  animation-delay: 0s;
                  top: 37px;
                  left: 66px;
                }
                .lds-default-secondary div:nth-child(2) {
                  animation-delay: -0.1s;
                  top: 22px;
                  left: 62px;
                }
                .lds-default-secondary div:nth-child(3) {
                  animation-delay: -0.2s;
                  top: 11px;
                  left: 52px;
                }
                .lds-default-secondary div:nth-child(4) {
                  animation-delay: -0.3s;
                  top: 7px;
                  left: 37px;
                }
                .lds-default-secondary div:nth-child(5) {
                  animation-delay: -0.4s;
                  top: 11px;
                  left: 22px;
                }
                .lds-default-secondary div:nth-child(6) {
                  animation-delay: -0.5s;
                  top: 22px;
                  left: 11px;
                }
                .lds-default-secondary div:nth-child(7) {
                  animation-delay: -0.6s;
                  top: 37px;
                  left: 7px;
                }
                .lds-default-secondary div:nth-child(8) {
                  animation-delay: -0.7s;
                  top: 52px;
                  left: 11px;
                }
                .lds-default-secondary div:nth-child(9) {
                  animation-delay: -0.8s;
                  top: 62px;
                  left: 22px;
                }
                .lds-default-secondary div:nth-child(10) {
                  animation-delay: -0.9s;
                  top: 66px;
                  left: 37px;
                }
                .lds-default-secondary div:nth-child(11) {
                  animation-delay: -1s;
                  top: 62px;
                  left: 52px;
                }
                .lds-default-secondary div:nth-child(12) {
                  animation-delay: -1.1s;
                  top: 52px;
                  left: 62px;
                }
                @keyframes lds-default-secondary {
                  0%, 20%, 80%, 100% {
                    transform: scale(1);
                  }
                  50% {
                    transform: scale(1.5);
                  }
                }`,
            }}
          />
          <div className="lds-default-secondary">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
        <span
          style={{
            color: "#fff",
            fontWeight: 400,
            fontSize: 20,
            marginTop: 20,
          }}
        >
          File loading...
        </span>
      </div>
    </div>
  );
}
