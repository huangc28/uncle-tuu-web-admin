import { combineReducers } from '@reduxjs/toolkit'

import uploadProcurement from 'Atuu/scenes/UploadProcurement/redux/upload_procurement'
import exportStock from 'Atuu/scenes/ExportStock/redux'

const rootReducer = combineReducers({ uploadProcurement, exportStock })

export default rootReducer



