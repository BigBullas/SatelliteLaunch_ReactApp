import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: '',
  title: '',
  startDate: '',
  endDate: '',
}

const dataSlice = createSlice({
  name: 'flightsFilter',
  initialState: { Data: initialState },
  reducers: {
    setSearchTitle (state, action) {
      state.Data.title =  action.payload
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
  setSearchTitle: setSearchTitleDataAction,
  setStartDateData: setStartDataAction,
  setEndDateData: setEndDataAction,
} = dataSlice.actions

export default dataSlice.reducer
