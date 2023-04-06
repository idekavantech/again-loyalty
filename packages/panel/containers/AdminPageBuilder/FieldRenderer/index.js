import { memo, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { removeFile, uploadFile } from "@saas/stores/global/actions";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Input from "@saas/components/Input";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ImageUploader from "@saas/builder/SectionRenderer/components/ImageUploader";
import { makeSelectUploadedFiles } from "@saas/stores/global/selectors";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import Button from "@material-ui/core/Button";
import {
  makeSelectAdminUrlPrefix,
  makeSelectInternalLinks,
} from "@saas/stores/plugins/selector";

import { getPluginsInternalLinks } from "@saas/stores/plugins/actions";
import { makeSelectBusiness } from "@saas/stores/business/selector";

import Slider from "@material-ui/core/Slider";
import { makeSelectForms } from "store/selectors";
import { getForms } from "store/actions";

import jMoment from "moment-jalaali";
import styled from "styled-components";

import MaterialSelect from "@saas/components/Select/MaterialSelect";
import Chip from "@material-ui/core/Chip";
import ChipInput from "material-ui-chip-input";
import FieldLink from "./FieldLink";
import FieldMultipleImageUploader from "./FieldMultipleImageUploader";
import FieldDateTimePicker from "./FieldDateTimePicker";
import FieldCategorySelect from "./FieldCategorySelect";
import FieldRichText from "./FieldRichText";
import FieldLayoutSelect from "./FieldLayoutSelect";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

let timeoutId = null;

const StyledInput = styled(Input)(({ type }) => ({
  "& .MuiInputBase-input": {
    padding: type === "color" ? "4px" : "",
    height: type === "color" ? "25px" : "",
  },
}));

const Index = ({
  value,
  setValue,
  customOptions,
  confirmExitPageBuilder,
  field: { id, label, type, edit_button_text = "", ...field },
  _uploadFile,
  _removeFile,
  uploadedFiles,
  internal_links,
  _getInternalLinks,
  forms,
  _getForms,
  setDisable,
  business,
  sectionIndex,
  urlPrefix,
}) => {
  // internal State
  const [_value, _setValue] = useState(null);
  const [links, setLinks] = useState([]);

  const { menu = { children: [] } } = business;

  const removeCategory = (_category) => {
    const selectedCategoryIndex = value.indexOf(_category);
    const newSelectedCategories = [...value];
    newSelectedCategories.splice(selectedCategoryIndex, 1);
    if (selectedCategoryIndex > -1) setValue(newSelectedCategories);
  };

  // hooks
  const addCategory = useCallback(
    (_category) => {
      if (value.findIndex((sc) => sc === _category) === -1) {
        setValue([...value, _category]);
      }
    },
    [value, setValue]
  );
  const handleOnDragEnd = useCallback(
    (sourceId, sourceIndex, destinationIndex) => {
      const items = JSON.parse(JSON.stringify(_value));
      if (destinationIndex === items.length || sourceIndex === items.length)
        return;
      const [reorderedItem] = items.splice(sourceIndex, 1);
      items.splice(destinationIndex, 0, reorderedItem);
      _setValue(items);
    },
    [_value]
  );

  const chipInputHandler = useCallback(
    (chips) => {
      try {
        const _chips = chips.map((chip) => ({
          id: uniqueid(),
          label: chip,
        }));
        setValue(_chips);
      } catch (e) {
        console.log(e);
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (internal_links && type === "link") {
      setLinks(internal_links);
    }
  }, [internal_links]);
  useEffect(() => {
    if (type === "link" && !internal_links.length && !links.length) {
      setTimeout(() => {
        _getInternalLinks();
      }, 0);
    }
  }, [type, internal_links, links]);
  useEffect(() => {
    if (type === "form_select") {
      setTimeout(() => {
        _getForms();
      }, 0);
    }
  }, [type]);
  useEffect(() => {
    if (_value === null || typeof _value === "boolean") {
      _setValue(value);
    }
  }, [value]);
  useEffect(() => {
    _setValue(value);
  }, [sectionIndex]);

  useEffect(() => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (type === "multiple_image_uploader") {
        setValue(_value.map((item) => ({ ...item, initialIndex: null })));
      } else {
        setValue(_value);
      }
    }, 500);
  }, [_value]);
  useEffect(() => {
    if (type === "multiple_image_uploader" && uploadedFiles) {
      const uploadedImagesArray = value
        ? [...value].filter((item) => !item.initialIndex)
        : [];
      uploadedFiles.forEach((file) => {
        const foundItem = uploadedImagesArray.findIndex(
          (item) => item.url === file.url
        );
        if (foundItem === -1) {
          uploadedImagesArray.push({
            initialIndex: uploadedFiles.indexOf(file),
            id: uniqueid(),
            ...file,
          });
        }
      });
      _setValue(uploadedImagesArray);
    }
  }, [JSON.stringify(uploadedFiles)]);

  switch (type) {
    case "link": {
      if (!links.length) {
        return null;
      }
      return (
        <FieldLink
          links={links}
          _setValue={_setValue}
          label={label}
          value={value}
        />
      );
    }

    case "multiple_image_uploader":
      return (
        <FieldMultipleImageUploader
          _value={_value}
          _setValue={_setValue}
          handleOnDragEnd={handleOnDragEnd}
        />
      );
    case "image_uploader":
      return (
        <ImageUploader
          _uploadFile={_uploadFile}
          image={value}
          tooltip={field?.tooltip}
          callback={(img) => {
            setValue(img);
            _removeFile();
          }}
        />
      );
    case "switch":
      return (
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ fontSize: 12 }}>{label}</div>
          <div className="d-flex">
            <Switch
              checked={value}
              onChange={(e) => {
                setValue(e.target.checked);
              }}
              color="primary"
            />
          </div>
        </div>
      );
    case "checkbox":
      return (
        <FormControlLabel
          style={{ margin: 0 }}
          control={
            <Checkbox
              style={{ marginRight: -12 }}
              checked={value}
              onChange={(e) => setValue(e.target.checked)}
              color="primary"
            />
          }
          label={label}
        />
      );
    case "form_select":
      return (
        <FormControl variant="outlined" className="w-100">
          <div style={{ fontSize: 12 }} className="mb-1">
            {label}
          </div>

          <Select
            value={value}
            label="فرم‌ها"
            onChange={(event) => setValue(event.target.value)}
            className="medium w-100"
          >
            {forms && forms.length ? (
              forms.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.title}
                </MenuItem>
              ))
            ) : (
              <MenuItem key={0} value={null}>
                فرمی وجود ندارد.
              </MenuItem>
            )}
          </Select>
        </FormControl>
      );
    case "select":
      return (
        <FormControl variant="outlined" className="w-100">
          <div style={{ fontSize: 12 }} className="mb-1">
            {label}
          </div>

          <Select
            value={value || field.options[0].value}
            onChange={(e) => setValue(e.target.value)}
            className="medium w-100"
          >
            {field.options &&
              field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      );
    case "id":
      return null;
    case "custom_select":
      return (
        <FormControl variant="outlined" className="w-100">
          <div style={{ fontSize: 12 }} className="mb-1">
            {label}
          </div>

          <Select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="medium w-100"
          >
            {customOptions &&
              customOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      );
    case "chip_input":
      return (
        <div>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                    .MuiChip-deleteIcon{
                      margin: 0px; 
                    }
                    .MuiChip-root  {
                      margin: 12px 8px 12px 0px ;
                    }
                    .WAMuiChipInput-label.WAMuiChipInput-outlined.WAMuiChipInput-label:not(.WAMuiChipInput-labelShrink){
                      top: -7px;
                    }
                    .MuiInputLabel-outlined {
                      transform : translate(-12px, 12px) scale(1);
                    }
                  `,
            }}
          />
          <ChipInput
            onChange={(chips) => chipInputHandler(chips)}
            label={label}
            variant="outlined"
            multiline
            fullWidth
            fullWidthInput
            defaultValue={value.map((item) => item.label)}
            InputProps={{ style: { height: "unset", padding: 0 } }}
            InputLabelProps={{ style: { padding: 0 } }}
          />
        </div>
      );
    case "multiple_category_select":
      return (
        <div>
          <MaterialSelect
            inputData={{ label: label }}
            options={menu?.children.map((_category) => ({
              ..._category,
              text: _category.title,
            }))}
            selectOption={(option) => {
              addCategory(menu.children.find((c) => c.title === option).id);
            }}
          />
          <div className="d-flex flex-wrap mt-2">
            {value?.map((c) => {
              const tempCategory = menu.children.find((cat) => c === cat.id);
              if (!tempCategory) {
                return null;
              }
              return (
                <Chip
                  key={tempCategory.id}
                  style={{ direction: "ltr" }}
                  label={tempCategory.title}
                  onDelete={() => {
                    removeCategory(c);
                  }}
                  variant="outlined"
                  className="m-1"
                />
              );
            })}
          </div>
        </div>
      );
    case "category_select":
      return (
        <FieldCategorySelect setValue={setValue} label={label} value={value} />
      );
    case "richtext":
      return (
        <FieldRichText
          value={value}
          _setValue={_setValue}
          label={label}
          edit_button_text={edit_button_text}
        />
      );
    case "button":
      if (field.link) {
        return (
          <Button
            onClick={() =>
              confirmExitPageBuilder(
                `${urlPrefix}${field.link}`,
                field.modal_text,
                field.success_massage,
                field.fail_message
              )
            }
            {...field}
          >
            {label}
          </Button>
        );
      }
      return <Button {...field}>{label}</Button>;
    case "layout_select":
      return (
        <FieldLayoutSelect
          field={field}
          value={value}
          setValue={setValue}
        />
      );
    case "date_time_picker":
      return (
        <FieldDateTimePicker
          setDisable={setDisable}
          setValue={setValue}
          value={value}
        />
      );

    case "slider":
      return (
        <>
          <div style={{ fontSize: 12 }} className="mb-1">
            {label}
          </div>
          <Slider
            defaultValue={value}
            valueLabelDisplay="auto"
            onChange={(e, value) => _setValue(value)}
            min={field.min || 0}
            max={field.min || 100}
            {...field}
          />
        </>
      );
    case "number":
      return (
        <div>
          <div style={{ fontSize: 12 }} className="mb-1">
            {label}
          </div>
          <Input
            id={id}
            size="medium"
            value={_value === null ? "" : _value}
            onChange={(value) => {
              value === "" ? _setValue(null) : _setValue(+value);
            }}
            type={type}
            {...field}
          />
        </div>
      );

    case "color":
      return (
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ fontSize: 12 }}>{label}</div>
          <div className="d-flex align-items-center">
            <StyledInput
              style={{ width: 40, height: 35, display: "grid" }}
              id={id}
              value={_value ? _value : "#000000"}
              onChange={_setValue}
              type={type}
              containerProps={{ style: { justifyContent: "center" } }}
              {...field}
            />
          </div>
        </div>
      );
    case "description":
      return <p>{label}</p>;
    default:
      return (
        <div>
          <div style={{ fontSize: 12 }} className="mb-1">
            {label}
          </div>
          <Input
            id={id}
            size="medium"
            value={_value}
            onChange={_setValue}
            type={type}
            {...field}
            inputProps={field.InputProps}
          />
        </div>
      );
  }
};

const mapStateToProps = createStructuredSelector({
  uploadedFiles: makeSelectUploadedFiles(),
  internal_links: makeSelectInternalLinks(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  forms: makeSelectForms(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _uploadFile: (files, folderName, callback) =>
      dispatch(uploadFile({ files, folderName }, callback)),
    _removeFile: (index) => dispatch(removeFile(index)),
    _getInternalLinks: () => dispatch(getPluginsInternalLinks()),
    _getForms: () => dispatch(getForms()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Index);
