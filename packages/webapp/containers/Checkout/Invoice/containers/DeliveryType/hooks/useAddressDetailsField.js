import { useEffect, useState } from "react";

export const useAddressDetailsField = (selectedDeliveryMethod, sendTo) => {
  const [addressDetailsFields, setAddressDetailsFields] = useState({});
  const [addressDetailsFieldsError, setAddressDetailsFieldsError] = useState(
    {}
  );
  const isAddressDetailsInvalid = !Object.values(addressDetailsFields).every(
    (field) => field !== ""
  );
  useEffect(() => {
    if (selectedDeliveryMethod?.timing?.address_detail_requirements) {
      const _fields = {};
      selectedDeliveryMethod.timing.address_detail_requirements.forEach(
        (field) => {
          _fields[field] = sendTo?.detail?.[field] || "";
        }
      );
      setAddressDetailsFields(_fields);
    }
  }, [selectedDeliveryMethod?.timing?.address_detail_requirements, sendTo?.id]);
  return {
    addressDetailsFields,
    setAddressDetailsFields,
    addressDetailsFieldsError,
    setAddressDetailsFieldsError,
    isAddressDetailsInvalid,
  };
};
