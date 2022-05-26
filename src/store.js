import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import rootReducer from 'Atuu/redux/root_reducer.js'
import rootSaga from 'Atuu/sagas/root_saga.js'


const createStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const store = configureStore(
    {
      reducer: rootReducer,
      middleware: [
        ...getDefaultMiddleware({ thunk: false }),
        ...middlewares,
      ]
    },
  )

  sagaMiddleware.run(rootSaga);
  
  return store
}

export default createStore