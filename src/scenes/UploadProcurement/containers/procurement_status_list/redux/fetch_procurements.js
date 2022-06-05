import { createSlice, createSelector } from '@reduxjs/toolkit'

import loadingStatus from 'Atuu/constants/loading_status.js'

const fetchProcurementListReducer = createSlice({
  name: 'fetchProcurementReducer',
  initialState: {
    loadingStatus: loadingStatus.EMPTY,
    error: null,
    procurements: [],
  },
  reducers: {
    fetchProcurements: (state, _) => {
      state.loadingStatus = loadingStatus.LOADING
      state.procurements = []
    },
    fetchProcurementsFailed: (state, action) => {
      state.loadingStatus = loadingStatus.FAILED
      state.error = action.payload.error
    },  
    fetchProcurementsSuccess: (state, action) => {
      state.loadingStatus = loadingStatus.SUCCESS
      state.procurements = action.payload.procurements
    },
  },
})

const selectSelf = (state) => state.fetchProcurements
export const selectProcurements = createSelector(selectSelf, state => state.procurements)

export const { fetchProcurements, fetchProcurementsFailed, fetchProcurementsSuccess } = fetchProcurementListReducer.actions
export default fetchProcurementListReducer.reducer 