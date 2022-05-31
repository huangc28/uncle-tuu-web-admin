import { createSlice, createSelector } from '@reduxjs/toolkit'

import loadingStatus from 'Atuu/constants/loading_status.js'

export const fetchProductsReducer = createSlice({
  name: 'fetchProductsReducer',
  initialState: {
    loadingStatus: loadingStatus.EMPTY,  
    error: null,
    products: [],
  } ,
  reducers: {
    fetchProducts: (state, _ ) => {
      state.loadingStatus = loadingStatus.LOADING
      state.error = null
      state.products = []
    }, 
    fetchProductsSuccess: (state, action) => {
      const { payload: { products } } = action
      state.loadingStatus = loadingStatus.SUCCESS
      state.products = products
    },
    fetchProductsFailed: (state, action) => {
      state.loadingStatus = loadingStatus.FAILED
      state.error = action.payload
      state.products = []
    },
  }
})

const selectSelf = state => state.exportStock.fetchProducts
export const selectProducts = createSelector(selectSelf, state => state.products)
export const selectFetchProdsStatus = createSelector(selectSelf, state => state.loadingStatus)
export const selectFetchProdsError = createSelector(selectSelf, state => state.error)

export const { fetchProducts, fetchProductsFailed, fetchProductsSuccess } = fetchProductsReducer.actions 
export default fetchProductsReducer.reducer