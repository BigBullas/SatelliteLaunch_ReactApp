import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: '',
  creatorLogin: '',
  startDate: '',
  endDate: '',
}

const dataSlice = createSlice({
  name: 'flightsFilter',
  initialState: { Data: initialState },
  reducers: {
    setCreatorLogin (state, action) {
      state.Data.creatorLogin =  action.payload
    },
    setStatusData(state, action) {
      state.Data.status = action.payload
    },
    setStartDateData(state, action) {
      state.Data.startDate = action.payload
    },
    setEndDateData(state, action) {
      state.Data.endDate = action.payload
    },
  },
})

export const {
  setStatusData: setStatusDataAction,
  setCreatorLogin: setCreatorLoginDataAction,
  setStartDateData: setStartDataAction,
  setEndDateData: setEndDataAction,
} = dataSlice.actions

export default dataSlice.reducer
