import React, { memo } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import useTheme from "@material-ui/core/styles/useTheme";
import InputAdornment from "@material-ui/core/InputAdornment";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Input from "@saas/components/Input";
import { cashDrawerTypes } from "containers/AdminPOS/constants";
import { useAdminDevicesFilterWidgets } from "./useAdminDevicesFilterWidgets";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
const menuProps = {
  getContentAnchorEl: null,
  style: { maxHeight: 500 },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

function AdminDevicesFilterWidgets({ setFilters }) {
  const {
    setSearch,
    search,
    selectedBranches,
    branches,
    selectedTypes,
    renderSelectedBranchValue,
    selectBranches,
    selectAllBranches,
    renderSelectedStatusesValue,
    selectAllStatuses,
    selectStatuses,
  } = useAdminDevicesFilterWidgets(setFilters);

  const theme = useTheme();
  const {minWidth768} = useResponsive()


  return (
    <div className="d-flex flex-wrap">
      <Input
        className="mt-2 mr-2"
        style={{ width: minWidth768 ? 250 : "100%" }}
        size="small"
        fullWidth={!minWidth768}
        value={search}
        onChange={setSearch}
        placeholder="جستجوی دستگاه"
        inputProps={{
          className: "pr-5 mr-2",
        }}
        InputProps={{
          startAdornment: (
            <>
              {search ? (
                <InputAdornment
                  style={{ position: "absolute", left: 3 }}
                  className="u-cursor-pointer"
                  position="start"
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                </InputAdornment>
              ) : null}
              <InputAdornment
                style={{ position: "absolute", right: 0 }}
                className={`u-cursor-pointer u-pointer-events-none`}
                position="start"
              >
                <SearchRoundedIcon
                  className="ml-1"
                  style={{ color: theme.palette.text.disabled }}
                  fontSize="small"
                />
              </InputAdornment>
            </>
          ),
        }}
      />
      {branches?.length ? (
        <Select
          style={{ minWidth: 150, height: 36 }}
          value={selectedBranches}
          multiple
          fullWidth={!minWidth768}
          className={`mr-2 mt-2`}
          margin="dense"
          variant="outlined"
          displayEmpty
          renderValue={renderSelectedBranchValue}
          MenuProps={menuProps}
        >
          <MenuItem>
            <Checkbox
              indeterminate={
                selectedBranches.length !== branches.length &&
                selectedBranches.length
              }
              onChange={(e) => {
                e.preventDefault();
              }}
              onClick={selectAllBranches}
              color="primary"
              checked={selectedBranches.length === branches.length}
            />
            <ListItemText primary="انتخاب همه شعب" className="text-right" />
          </MenuItem>
          {branches.map((branch) => (
            <MenuItem key={branch.id} value={branch.id}>
              <Checkbox
                onChange={(e) => e.preventDefault()}
                onClick={(e) => selectBranches(e, branch.id)}
                color="primary"
                checked={selectedBranches.includes(branch.id)}
              />
              <ListItemText primary={branch.title} className="text-right" />
            </MenuItem>
          ))}
        </Select>
      ) : null}
      <Select
        style={{ minWidth: 150, height: 36 }}
        value={selectedTypes}
        multiple
        fullWidth={!minWidth768}
        className="mr-2 mt-2"
        margin="dense"
        variant="outlined"
        displayEmpty
        renderValue={renderSelectedStatusesValue}
        MenuProps={menuProps}
      >
        <MenuItem>
          <Checkbox
            indeterminate={
              selectedTypes.length !== cashDrawerTypes.length &&
              selectedTypes.length
            }
            onChange={(e) => {
              e.preventDefault();
            }}
            onClick={selectAllStatuses}
            color="primary"
            checked={selectedTypes.length === cashDrawerTypes.length}
          />
          <ListItemText primary="انتخاب همه وضعیت‌ها" className="text-right" />
        </MenuItem>
        {cashDrawerTypes.map((type) => (
          <MenuItem key={type.id} value={type.id}>
            <Checkbox
              onChange={(e) => e.preventDefault()}
              onClick={(e) => selectStatuses(e, type.id)}
              color="primary"
              checked={selectedTypes.includes(type.id)}
            />
            <ListItemText primary={type.text} className="text-right" />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default memo(AdminDevicesFilterWidgets);
