import { combineReducers } from '@reduxjs/toolkit'

import fetchGames from './fetch_games'
import fetchProducts from './fetch_product'

export default combineReducers({ fetchGames, fetchProducts })
