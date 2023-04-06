import { useState } from "react";

export function useCustomForm(form) {
  const [_form, _setForm] = useState(form);

  function setFormValue(name, value) {
    if (typeof name === "object") {
      _setForm(name);
    } else {
      _setForm({ ..._form, [name]: value });
    }
  }

  return [_form, setFormValue];
}
