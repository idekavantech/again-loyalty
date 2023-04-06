import React, { memo, useRef } from "react";
import Input from "@saas/components/Input";

function AddCRMMembership({ name, setName, phone, setPhone, send }) {
  const inputRef = useRef(null);

  return (
    <div className=" px-3 pb-3">
      <Input
        onChange={(value) => {
          setPhone(value);
        }}
        noModal
        numberOnly
        className="c-input mt-4"
        value={phone}
        placeholder="Customer contact number"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            inputRef.current.focus();
            inputRef.current.click();
          }
        }}
      />
      <Input
        onChange={(value) => {
          setName(value);
        }}
        className="c-input mt-4"
        value={name}
        placeholder="Customer name"
        onKeyPress={(event) => {
          if (event.key === "Enter") send();
        }}
        inputRef={inputRef}
      />
    </div>
  );
}

export default memo(AddCRMMembership);
