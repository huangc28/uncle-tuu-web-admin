import { createSlice, createSelector } from '@reduxjs/toolkit'

import loadingStatus from 'Atuu/constants/loading_status.js'

export const assignStocksReducer = createSlice({
  name: 'assignStocks',
  initialState: {
    loadingStatus: loadingStatus.EMPTY,
    error: null,
  },
  reducers: {
    assignStocks: (state, _) => {
      state.loadingStatus = loadingStatus.LOADING
      state.error = null
    },
    assignStockFailed: (state, action) => {
      state.loadingStatus = loadingStatus.FAILED
      state.error = action.payload
    },
    assignStockSuccess: (state, _) => {
      state.loadingStatus = loadingStatus.SUCCESS
    }
  },
})

const selectSelf = state => state.assignStocks 
export const selectAssignStockStatus = createSelector(selectSelf, state => state.loadingStatus)
export const selectAssignStockError = createSelector(selectSelf, state => state.error)

export const { assignStocks, assignStockFailed, assignStockSuccess } =  assignStocksReducer.actions
export default assignStocksReducer.reducer