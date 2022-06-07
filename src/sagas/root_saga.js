import { all, call } from 'redux-saga/effects';

import uploadProcurementSaga from 'Atuu/scenes/UploadProcurement/sagas'
import exportStock from 'Atuu/scenes/ExportStock/sagas'
import exportStatus from 'Atuu/scenes/ExportStatus/sagas/fetch_export_status'

export default function * root(_) {
  yield all([
    call(uploadProcurementSaga),
    call(exportStock),
    call(exportStatus),
  ])
}