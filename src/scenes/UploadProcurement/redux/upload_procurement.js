import { createSlice, createSelector } from '@reduxjs/toolkit'

import loadingStatus from 'Atuu/constants/loading_status.js'

export const uploadProcurementSlice = createSlice({
  name: 'uploadProcurementSlice',
  initialState: {
    loadingStatus: loadingStatus.EMPTY,
    error: null,
  },
  reducers: {
    uploadProcurement: (state, _) => {
      state.loadingStatus = loadingStatus.LOADING
    },
    uploadProcurementSuccess: (state, _) => {
      state.loadingStatus = loadingStatus.SUCCESS
    },
    uploadProcurementFailed: (state, action) => {
      state.loadingStatus = loadingStatus.SUCCESS
      
      const { payload: error } = action
    
      state.error = error
    }
  }
})

const selectSelf = state => state.uploadProcurement
export const selectLoadingStatus = createSelector(selectSelf, state => state.loadingStatus)
export const selectUploadError = createSelector(selectSelf, state => state.error)

export const { uploadProcurement, uploadProcurementSuccess, uploadProcurementFailed } = uploadProcurementSlice.actions
export default uploadProcurementSlice.reducer
