import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Modal from "@saas/components/Modal";
import { SMSPricingOptions } from "store/constants";
import { useRouter } from "next/router";
import ModalHeader from "@saas/components/Modal/ModalHeader";
function SMSChargeModal({ isOpen, onClose, urlPrefix }) {
  const [selectedOption, selectOption] = useState(SMSPricingOptions[0]);
  const router = useRouter();

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={onClose} title="Charging SMS" />}
      body={
        <div className="mt-1">
          <div className="px-3">
            <div className="text-right u-fontWeightBold py-2">
              Choose one of the following values to charge your SMS.
            </div>
          </div>
          {SMSPricingOptions.map((item) => (
            <div key={item.id} className="px-3 mt-1">
              <FormControlLabel
                style={{ direction: "ltr" }}
                className="align-items-start"
                label={
                  <div>
                    <div className="pb-2">
                      <span>Closed</span>
                      <span className="u-fontWeightBold">
                        {item.creditText}
                      </span>
                      <span> Tai</span>
                    </div>
                    <div className="u-text-green u-fontWeightBold">{`${item.priceText} $`}</div>
                  </div>
                }
                onClick={() => selectOption(item)}
                control={
                  <Radio
                    color="primary"
                    checked={item.price === selectedOption.price}
                  />
                }
                labelPlacement="start"
              />
            </div>
          ))}
        </div>
      }
      cta={
        <Button
          color="primary"
          variant="contained"
          className="w-100"
          onClick={() =>
            router.push(
              `${urlPrefix}crm/plans/${selectedOption.credit}/invoice`
            )
          }
        >
          Charging SMS
        </Button>
      }
    />
  );
}

export default memo(SMSChargeModal);
