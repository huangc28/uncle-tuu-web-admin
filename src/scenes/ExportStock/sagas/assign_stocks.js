import { takeLatest, call, put } from 'redux-saga/effects'
import fetch from 'axios'

import buildURI from 'Atuu/util/build_uri.js'
import { assignStocks, assignStockFailed, assignStockSuccess } from '../redux/assign_stocks'

const assignStocksAPI = ({ formValue, stocks }) => (
  fetch({
    method: 'post',
    url: buildURI('/v1/inventory/assign-stocks').toString(),
    data: {
      ...formValue,
      stocks,
    },
  })
  .then(res => res)
)

function * assignStocksSaga(action) {
  const { payload: { formValue, stocks }  } = action
  try {
    yield call(assignStocksAPI, { formValue, stocks })
    
    yield put(assignStockSuccess())

  } catch (e) {
    yield put(assignStockFailed({ error: e.response.data.err }))
  }
}

export default function * () {
  yield takeLatest(assignStocks().type, assignStocksSaga)
}
