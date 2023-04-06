import Image from "next/image";
import React from "react";

const ScrollModal = ({ isOpen, onClose }) => {
  return isOpen ? (
    <div
      className="scroll-modal d-flex justify-content-center align-items-end"
      onWheel={onClose}
      onTouchMove={onClose}
      style={{ zIndex: 101 }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{ paddingBottom: 69 }}
      >
        <Image alt="" width={32} height={32} src="/images/scrolling.svg" />
        <p className="mt-4">اسکرول کنید</p>
      </div>
    </div>
  ) : null;
};

export default ScrollModal;
