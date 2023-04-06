import { createSlice } from '@reduxjs/toolkit'

export const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    loading: false,
    loadingSmall: false,
    channels: []
  },
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload
    },
    loadingSmall: (state, action) => {
      state.loadingSmall = action.payload
    },
    set: (state, action) => {
      state.channels = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const {
    loading,
    loadingSmall,
    set
} = channelSlice.actions;

export default channelSlice.reducer;