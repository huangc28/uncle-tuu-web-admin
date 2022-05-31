import { combineReducers } from '@reduxjs/toolkit'

import fetchGames from './fetch_games'
import fetchProducts from './fetch_product'
import assignStocks from './assign_stocks'

export default combineReducers({ fetchGames, fetchProducts, assignStocks })
