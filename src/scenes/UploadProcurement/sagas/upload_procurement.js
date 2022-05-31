import { all, takeLatest, call, put } from 'redux-saga/effects'
import fetch from 'axios'

import buildURI from 'Atuu/util/build_uri.js'

import { uploadProcurement, uploadProcurementSuccess, uploadProcurementFailed } from '../redux/upload_procurement'

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

    // TODO
    //   Display filename thats just been uploaded
    yield call(uploadProcurementAPI, formData)

    yield put(uploadProcurementSuccess())

  } catch (e) {
    yield put(uploadProcurementFailed(e))
  }
}

export default function * () {
  yield all([
    takeLatest(uploadProcurement().type, uploadProcurementSaga),
  ]);
}
