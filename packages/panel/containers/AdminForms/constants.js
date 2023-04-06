import { FormGroup, IconButton } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@saas/components/Input";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { useEffect, useState } from "react";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import DeleteIcon from '@material-ui/icons/Delete';

export const SELECTABLE_FORM_FIELDS = [
  {
    id: uniqueid(),
    type: "text",
    text: "Simple text",
  },
  {
    id: uniqueid(),
    type: "tel",
    text: "phone number",
  },
  {
    id: uniqueid(),
    type: "number",
    text: "number",
  },
  {
    id: uniqueid(),
    type: "email",
    text: "email",
  },
  {
    id: uniqueid(),
    type: "button",
    text: "Button",
  },
  {
    id: uniqueid(),
    type: "location",
    text: "Location",
  },
  {
    id: uniqueid(),
    type: "image",
    text: "Picture",
  },
  {
    id: uniqueid(),
    type: "checkbox",
    text: "Checkbox"
  },
  {
    id: uniqueid(),
    type: "radio",
    text: "Radio button"
  }
];

export const FIELDS_CONFIGS = {
  text: ["required", "label"],
  tel: ["required", "label"],
  number: ["required", "label"],
  email: ["required", "label"],
  button: ["text", "callback"],
  location: ["required", "title"],
  image: ["required", "title"],
  checkbox: ["required", "titleOfRadioOrCheckbox", "useCheckboxField"],
  radio: ["required", "titleOfRadioOrCheckbox", "useRadioField"],
};

export const FIELDS_CONFIGS_COMPONENTS = {
  required: ({ value, setValue }) => {
    return (
    <FormControlLabel
      className="mr-0"
      control={
        <Checkbox
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
          color="primary"
        />
      }
      label="The necessary field"
    />
  )
  },
  label: ({ value, setValue }) => (
    <Input
      type="text"
      size="medium"
      value={value}
      onChange={(v) => setValue(v)}
      label="Field label"
    />
  ),
  placeholder: ({ value, setValue }) => (
    <Input
      type="text"
      size="medium"
      value={value}
      onChange={(v) => setValue(v)}
      label="placeholder field"
    />
  ),
  title: ({ value, setValue }) => (
    <Input
      type="text"
      size="medium"
      value={value}
      onChange={(v) => setValue(v)}
      label="The top of the field"
    />
  ),
  titleOfRadioOrCheckbox: ({ value, setValue }) => (
    <Input
      type="text"
      size="medium"
      value={value}
      onChange={(v) => setValue(v)}
      label="Question Text"
    />
  ),
  text: ({ value, setValue }) => (
    <Input
      type="text"
      size="medium"
      value={value}
      onChange={(v) => setValue(v)}
      label="Button text"
    />
  ),
  callback: ({ value, setValue }) => (
    <Input
      type="text"
      size="medium"
      value={value}
      style={{ direction: "ltr" }}
      onChange={(v) => setValue(v)}
      label="Link address after the button is clicked"
    />
  ),

  multiple: ({ value, setValue }) => (
    <FormControlLabel
      className="mr-0"
      control={
        <Checkbox
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
          color="primary"
        />
      }
      label="Multiplication"
    />
  ),
  useCheckboxField: ({ value, setValue }) => {
    let [tempCheckBoxes, setTempCheckBoxes] = useState([{ id: uniqueid(), text: null }])

    useEffect(() => {
      if (value) setTempCheckBoxes(value)
    }, [])

    useEffect(() => {
      let validCheckboxes = tempCheckBoxes.filter(item => !!item.text)
      setValue(validCheckboxes)
    }, [tempCheckBoxes])

    let handleChange = (text, id) => {
      setTempCheckBoxes(items => items.map((ch) => {
        if (id === ch.id) return { ...ch, text }
        return ch
      }))
    }

    let addBtnClick = () => setTempCheckBoxes(items => [...items, { text: null, id: uniqueid() }])
    let deleteBtnClick = (id) => setTempCheckBoxes(items => items.filter(item => item.id !== id))

    return <FormGroup className="mt-4">
      {tempCheckBoxes.map((checkbox, index) => {
        return (
          <div key={checkbox.id} className="d-flex mb-2">
            <div className="d-flex">
              <FormControlLabel control={<Checkbox disabled color="primary" />} className="mx-0" />
              <Input
                type="text"
                size="medium"
                value={checkbox.text}
                onChange={(v) => handleChange(v, checkbox.id)}
                label={`option${index + 1}`}
                error={checkbox.text === ""}
                helperText={checkbox.text === "" ? "Filling the field is required" : ""}
              />
            </div>
            <div>
              {index !== 0 && <IconButton onClick={() => deleteBtnClick(checkbox.id)}>
                <DeleteIcon color="secondary" />
              </IconButton>}
              {index === (tempCheckBoxes.length -1) && <IconButton onClick={addBtnClick}>
                <ControlPointIcon color="primary" />
              </IconButton>}
            </div>
          </div>
        )
      })}

    </FormGroup>
  },
  useRadioField: ({ value, setValue }) => {
    let [tempRadios, setTempRadios] = useState([{ id: uniqueid(), text: null }])

    useEffect(() => {
      if (value) setTempRadios(value)
    }, [])

    useEffect(() => {
      let validRadios = tempRadios.filter(item => !!item.text)
      setValue(validRadios)
    }, [tempRadios])

    let handleChange = (text, id) => {
      setTempRadios(items => items.map((ch) => {
        if (id === ch.id) return { ...ch, text }
        return ch
      }))
    }

    let addBtnClick = () => setTempRadios(items => [...items, { text: null, id: uniqueid() }])
    let deleteBtnClick = (id) => setTempRadios(items => items.filter(item => item.id !== id))

    return <FormGroup className="mt-4">
      {tempRadios.map((radio, index) => {
        return (
          <div key={radio.id} className="d-flex mb-2">
            <div className="d-flex">
              <FormControlLabel control={<Radio disabled color="primary" />} className="mx-0" />
              <Input
                type="text"
                size="medium"
                value={radio.text}
                onChange={(v) => handleChange(v, radio.id)}
                label={`option${index + 1}`}
                error={radio.text === ""}
                helperText={radio.text === "" ? "Filling the field is required" : ""}
              />
            </div>
            <div>
              {index !== 0 && <IconButton onClick={() => deleteBtnClick(radio.id)}>
                <DeleteIcon color="secondary" />
              </IconButton>}
              {index === (tempRadios.length -1) && <IconButton onClick={addBtnClick}>
                <ControlPointIcon color="primary" />
              </IconButton>}
            </div>
          </div>
        )
      })}

    </FormGroup>
  },
};
