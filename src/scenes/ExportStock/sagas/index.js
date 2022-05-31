import { all, call } from 'redux-saga/effects';

import fetchGamesSaga from './fetch_games'
import fetchProductsSaga from './fetch_products'

export default function * () {
  yield all([
    call(fetchGamesSaga),
    call(fetchProductsSaga),
  ])
}