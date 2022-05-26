import { all, call } from 'redux-saga/effects';

import uploadProcurementSaga from 'Atuu/scenes/UploadProcurement/sagas/upload_procurement.js'

export default function * root(_) {
  yield all([
    call(uploadProcurementSaga),
  ])
}
