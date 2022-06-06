import { all, takeLatest, call, put } from 'redux-saga/effects'
import fetch from 'axios'

import buildURI from 'Atuu/util/build_uri.js'

import { uploadProcurement, uploadProcurementSuccess, uploadProcurementFailed } from '../redux/upload_procurement'
import { appendProcurement } from '../containers/procurement_status_list/redux/fetch_procurements'

const uploadProcurementAPI = formData => (
  fetch({
    method: 'post',
    url: buildURI('/v1/importer/upload-procurement').toString(),
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res)
)

function * uploadProcurementSaga(action) {
  const {
    payload: fileList,
  } = action

  const file = fileList[0]
  const formData = new FormData()
  formData.append('procurement', file.blobFile)

  try {
    const resp = yield call(uploadProcurementAPI, formData)

    yield put(appendProcurement({ procurement: resp.data}))
    yield put(uploadProcurementSuccess({ uploadedProcurement: resp.data }))

  } catch (e) {
    yield put(uploadProcurementFailed(e))
  }
}

export default function * () {
  yield all([
    takeLatest(uploadProcurement().type, uploadProcurementSaga),
  ]);
}
