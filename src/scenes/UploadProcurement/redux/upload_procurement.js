import { createSlice, createSelector } from '@reduxjs/toolkit'

import loadingStatus from 'Atuu/constants/loading_status.js'

export const uploadProcurementSlice = createSlice({
  name: 'uploadProcurementSlice',
  initialState: {
    loadingStatus: loadingStatus.EMPTY,
    error: null,
    uploadedProcurement: {},
  },
  reducers: {
    uploadProcurement: (state, _) => {
      state.loadingStatus = loadingStatus.LOADING
    },
    uploadProcurementSuccess: (state, action) => {
      state.loadingStatus = loadingStatus.SUCCESS
      state.uploadedProcurement = action.payload.uploadedProcurement
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
export const selectUploadedProcurement = createSelector(selectSelf, state => state.uploadedProcurement)

export const { uploadProcurement, uploadProcurementSuccess, uploadProcurementFailed } = uploadProcurementSlice.actions
export default uploadProcurementSlice.reducer
