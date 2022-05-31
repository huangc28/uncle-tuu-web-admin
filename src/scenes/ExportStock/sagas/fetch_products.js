import { takeLatest, call, put } from 'redux-saga/effects'
import fetch from 'axios'

import buildURI from 'Atuu/util/build_uri.js'

import { fetchProducts, fetchProductsSuccess } from '../redux/fetch_product'

const fetchProductsAPI = gameBundleID => {
  return fetch({
    method: 'get',
    url: buildURI(`/v1/games/${gameBundleID}/products`).toString(),
  })
}

function * fetchProductsSaga  (action) {
  const { payload: { gameBundleID } } = action
  
  try {
    const resp = yield call(fetchProductsAPI, gameBundleID)
    
    const { data: { products } } = resp
    const trfmedProds = products.map(({ prod_name, prod_bundle_id, num_in_stock }) => {
      return {
        label: prod_name,
        value: prod_bundle_id,
        numInStock: num_in_stock,
        role: 'Master',
      }
    }) 

    yield put(fetchProductsSuccess({ products: trfmedProds })) 

  } catch(e) {
    console.log('failed to call API', e)
  }
}


export default function * () {
  yield takeLatest(fetchProducts().type, fetchProductsSaga)
}