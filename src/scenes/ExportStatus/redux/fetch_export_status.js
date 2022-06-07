import { createSlice, createSelector } from '@reduxjs/toolkit'

import loadingStatus from 'Atuu/constants/loading_status'

const fetchExportStatusReducer = createSlice({
  name: 'fetchExportStatusReducer',
  initialState: {
    loadingStatus: loadingStatus.EMPTY,  
    error: null,
    assignments: [],
  },
  reducers: {
    fetchExportStatus: (state, _) => {
      state.loadingStatus = loadingStatus.EMPTY
    },
    fetchExportStatusFailed: (state, action) => {
      state.loadingStatus = loadingStatus.FAILED
      state.error = action.payload.error
    },
    fetchExportStatusSuccess: (state, action) => {
      state.loadingStatus = loadingStatus.SUCCESS
      state.assignments = action.payload.assignments
    }
  },
})

const selectSelf = state => state.exportStatus.fetchExportStatus

export const { fetchExportStatus, fetchExportStatusFailed, fetchExportStatusSuccess } = fetchExportStatusReducer.actions
export const selectFetchExportLoadingStatus = createSelector(selectSelf, state => state.loadingStatus)
export const selectAssignments = createSelector(selectSelf, state => state.assignments)

export default fetchExportStatusReducer.reducer