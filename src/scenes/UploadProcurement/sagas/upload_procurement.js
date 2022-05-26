import { all, takeLatest, call, put } from 'redux-saga/effects'
import fetch from 'axios'
import httpStatus from 'http-status-codes'

import { uploadProcurement, uploadProcurementSuccess, uploadProcurementFailed } from '../redux/upload_procurement'

const buildURI = uri => new URL(uri, process.env.SERVER_HOST)

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
  console.log('file', file.blobFile)
  formData.append('procurement', file.blobFile)

  try {
    console.log('file', formData)

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
