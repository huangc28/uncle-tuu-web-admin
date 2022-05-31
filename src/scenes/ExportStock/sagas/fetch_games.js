import { all, takeLatest, call, put } from 'redux-saga/effects'
import fetch from 'axios'

import buildURI from 'Atuu/util/build_uri.js'

import { 
  fetchGames, 
  fetchGamesSuccess, 
  fetchGamesFailed,
} from '../redux/fetch_games'

const fetchGamesAPI = () => (
  fetch({
    method: 'get',
    url: buildURI('/v1/games').toString(),
  })
  .then(res => res)
)

// Format game item to following format for rsuite inputPicker. 
// [
//   {
//     label: "Eugenia",
//     value: "Eugenia",
//     role: "Master",
//   }
// ]
function * fetchGamesSaga(_) {
  try {
    const resp = yield call(fetchGamesAPI)
    
    const { data: { games } } = resp

    const formattedGames = games.map(({ game_bundle_id, readable_name }) => (
      {
        label: readable_name,
        value: game_bundle_id,
        role: 'Master',
      }
    ))
    
    yield put(fetchGamesSuccess({ games: formattedGames }))
  } catch(e){
    yield put(fetchGamesFailed(e))
  }
}

export default function * () {
  yield takeLatest(fetchGames().type, fetchGamesSaga)
}
