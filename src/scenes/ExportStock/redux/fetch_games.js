import { createSlice, createSelector } from '@reduxjs/toolkit'

import loadingStatus from 'Atuu/constants/loading_status.js'

export const fetchGamesSlice = createSlice({
  name: 'loadGamesSlice',
  initialState: {
    loadingStatus: loadingStatus.EMPTY,
    error: null, 
    games: [],
  }, 
  reducers: {
    fetchGames: (state, _) => {
      state.loadingStatus = loadingStatus.LOADING
      state.error = null
    },
    fetchGamesSuccess: (state, action) => {
      state.loadingStatus = loadingStatus.SUCCESS
      state.games = action.payload.games
    },
    fetchGamesFailed: (state, action) => {
      state.loadingStatus = loadingStatus.FAILED
      state.error = action.payload
    },
  },
})

const selectSelf = state => state.exportStock.fetchGames
export const selectFetchGamesState = createSelector(selectSelf, state => state.loadingStatus)
export const selectFetchGamesError = createSelector(selectSelf, state => state.error)
export const selectGames = createSelector(selectSelf, state => state.games)

export const { fetchGames, fetchGamesSuccess, fetchGamesFailed } = fetchGamesSlice.actions
export default fetchGamesSlice.reducer