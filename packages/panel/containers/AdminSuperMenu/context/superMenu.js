import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    editDeal: null,
    editMenu: null,
    devices: [],
    removeDeal: null,
    deviceSelected: null,
    page: {},
    removeMenu: null,
    loadingSmall: false,
    selectedDeal: null,
    pickDealModal: false,
    selectedMenu: -1,
    menuNickName: null,
    menuColor: "#D0D2D4",
    menuImage: null,
    loading: false,
    positions: {
      menu: 0,
      page: 0,
      item: -1,
    },
    deals: [],
    value: [],
  },
  reducers: {
    editDeal: (state, action) => {
      state.editDeal = action.payload;
    },
    editMenu: (state, action) => {
      state.editMenu = action.payload;
    },
    removeDeal: (state, action) => {
      state.removeDeal = action.payload;
    },
    removeMenu: (state, action) => {
      state.removeMenu = action.payload;
    },
    selectDeal: (state, action) => {
      state.selectedDeal = action.payload;
    },
    selectMenu: (state, action) => {
      state.selectedMenu = action.payload;
      state.selectedDeal = null;
      state.editDeal = null;
      state.positions.item = -1;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    set: (state, action) => {
      state.value = action.payload;
    },
    setPickModal: (state, action) => {
      state.pickDealModal = action.payload;
    },
    setProducts: (state, action) => {
      state.deals = action.payload;
    },
    setMenuBulk: (state, action) => {
      state.value = action.payload;
    },
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    loadingSmall: (state, action) => {
      state.loadingSmall = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    selectDevice: (state, action) => {
      state.deviceSelected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  editDeal,
  editMenu,
  removeDeal,
  removeMenu,
  selectDeal,
  loading,
  set,
  setDevices,
  setMenuBulk,
  setProducts,
  selectMenu,
  selectDevice,
  loadingSmall,
  setPositions,
  setPickModal,
  setPage,
} = menuSlice.actions;

export default menuSlice.reducer;
