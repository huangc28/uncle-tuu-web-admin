import { takeLatest, call, put } from 'redux-saga/effects'
import fetch from 'axios'

import buildURI from 'Atuu/util/build_uri.js'

import { fetchExportStatus, fetchExportStatusSuccess, fetchExportStatusFailed } from '../redux/fetch_export_status'

const stockAssignmentAPI = () => {
  return fetch({
    method: 'get',
    url: buildURI('/v1/inventory/assignment-export-status').toString(),
  })
}

function * fetchExportStatusSaga() {
  try {
    const resp = yield call(stockAssignmentAPI)
    
    // Organize assignment to following format:
    //  {
    //    'assignment_uuid' {
    //      assignee_name:
    //      created_at:
    //      stocks: [
    //        {
    //          game_name: 
    //          prod_name: 
    //          stock_uuid: 
    //          available: 
    //          delivered: 
    //        }   
    //      ]
    //    }
    //  }
    console.log('fetchExportStatusSaga resp', resp)
    
    const assignmentTemplate = {
      assigneeName: null,
      createdAt: null,
      stocks: [],
    }

    const stockTemplate = {
      gameName: null,
      prodName: null,
      stockUUID: null,
      available: false,
      delivered: null,
    } 

    const { data: { stock_assignments: stockAssignments } } = resp

    const formattedAssignmentReport = stockAssignments.reduce((prev, curr) => {
      if (!prev.hasOwnProperty(curr.assignment_uuid)) {
        prev[curr.assignment_uuid] = {
          ...assignmentTemplate,
          assigneeName: curr.assignee_name,
          createdAt: curr.created_at,
          stocks: [].concat([
            {
              ...stockTemplate,
              gameName: curr.game_name,
              prodName: curr.prod_name,
              stockUUID: curr.stock_uuid,
              available: curr.available,
              delivered: curr.delivered,
            }
          ]),
        }
        
        return prev
      }
      
      prev[curr.assignment_uuid].stocks = prev[curr.assignment_uuid].stocks.concat([
        {
          ...stockTemplate,
           gameName: curr.game_name,
           prodName: curr.prod_name,
           stockUUID: curr.stock_uuid,
           available: curr.available,
           delivered: curr.delivered,
        }
      ])

      return prev
    }, {})

    yield put(fetchExportStatusSuccess({assignments: formattedAssignmentReport }))
  } catch(e) {
    yield put(fetchExportStatusFailed({ error: e.response.data.err }))
  }  
}

export default function * () {
  yield takeLatest(fetchExportStatus().type,  fetchExportStatusSaga)  
}