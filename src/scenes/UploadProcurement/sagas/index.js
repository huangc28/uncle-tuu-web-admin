import { all, call } from 'redux-saga/effects';

import uploadProcurementSaga from './upload_procurement'
import fetchProcurementsSaga from '../containers/procurement_status_list/sagas/fetch_procurements'

export default function * () {
  yield all([
    call(uploadProcurementSaga),
    call(fetchProcurementsSaga),
  ])
}