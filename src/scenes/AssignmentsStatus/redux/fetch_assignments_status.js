import { createSlice } from '@reduxjs/toolkit'

import loadingStatus from 'Atuu/constants/loading_status'

const fetchAssignmentsStatusReducer = createSlice({
  name: 'fetchAssignmentsStatusReducer',
  initialState: {
    loadingStatus: loadingStatus.EMPTY,  
  },
  reducers: {
    // fetchAssignmentStatus

  },
})

export default fetchAssignmentsStatusReducer.reducer