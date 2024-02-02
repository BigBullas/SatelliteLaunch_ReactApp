import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: [],
  startDate: '',
  endDate: '',
}

const dataSlice = createSlice({
  name: 'flightsFilter',
  initialState: { Data: initialState },
  reducers: {
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
  setStartDateData: setStartDataAction,
  setEndDateData: setEndDataAction,
} = dataSlice.actions

export default dataSlice.reducer
