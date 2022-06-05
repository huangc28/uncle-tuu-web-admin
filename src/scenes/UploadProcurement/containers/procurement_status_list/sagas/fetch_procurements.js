import { takeLatest, call, put } from 'redux-saga/effects'
import fetch from 'axios'

import buildURI from 'Atuu/util/build_uri.js'
import { fetchProcurements, fetchProcurementsFailed, fetchProcurementsSuccess } from '../redux/fetch_procurements'

const fetchProcurementAPI = () => {
  return fetch({
    method: 'GET',
    url: buildURI('/v1/importer/procurements').toString(),
  })
}

function * fetchProcurementsSaga(action) {
  console.log('DEBUG fetchProcurementsSaga')
  try {
    const resp = yield call(fetchProcurementAPI)

    yield put(fetchProcurementsSuccess({procurements: resp.data}))
  } catch(e) {
    yield put(fetchProcurementsFailed({ error: e?.response?.data?.err }))   
  }
}

export default function * () {
  yield takeLatest(fetchProcurements().type, fetchProcurementsSaga)
} 