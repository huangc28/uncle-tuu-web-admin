import { combineReducers } from '@reduxjs/toolkit'

import uploadProcurement from 'Atuu/scenes/UploadProcurement/redux/upload_procurement'
import fetchProcurements from 'Atuu/scenes/UploadProcurement/containers/procurement_status_list/redux/fetch_procurements'

import exportStock from 'Atuu/scenes/ExportStock/redux'

const rootReducer = combineReducers({ uploadProcurement, fetchProcurements, exportStock })

export default rootReducer



