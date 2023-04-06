import ModalHeader from "@saas/components/Modal/ModalHeader";
import Modal from "@saas/components/Modal";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";

const OrderReceiptImageModal = ({ image, isOpen, onClose, price }) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <ModalHeader onRightClick={onClose} title="Card Receipt Picture" />
      }
      body={
        <div
          style={{ minHeight: "100%" }}
          className="d-flex justify-content-center flex-col align-items-center p-3"
        >
          <div
            className="d-flex justify-content-between w-100 pb-2 mb-5"
            style={{ width: "100%", maxWidth: "500px" }}
          >
            <span className={"u-fontWeightMedium"}>The amount payable</span>
            <div className={"d-flex"}>
              <span className={"u-fontWeightMedium ml-2"}>
                {priceFormatter(price)}
              </span>
              $
            </div>
          </div>
          <img
            alt="Card Receipt Picture"
            src={image}
            style={{ width: "100%", maxWidth: "500px" }}
          />
        </div>
      }
    />
  );
};

export default OrderReceiptImageModal;
