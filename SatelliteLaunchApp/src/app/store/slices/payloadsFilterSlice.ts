import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const initialState = {
    spaceSatellite: '',
    loadCapacityStart: 0,
    loadCapacityEnd: 500,
    flightDateStart: '',
    flightDateEnd: '',
}

const dataSlice = createSlice({
  name: 'payloadsFilter',
  initialState: { Data: initialState },
  reducers: {
    setSpaceSatelliteData(state, action) {
        state.Data.spaceSatellite = action.payload
    },
    setLoadCapacityStartData(state, action) {
        state.Data.loadCapacityStart = action.payload
    },
    setLoadCapacityEndData(state, action) {
        state.Data.loadCapacityEnd = action.payload
    },
    setFlightDateStartData(state, action) {
        state.Data.flightDateStart = action.payload
    },
    setFlightDateEndData(state, action) {
        state.Data.flightDateEnd = action.payload
    },
  },
})

export const filterData = () => useSelector((state: any) => state.payloadsFilterInfo.Data)

export const { setSpaceSatelliteData, setLoadCapacityStartData, 
    setLoadCapacityEndData, setFlightDateStartData, setFlightDateEndData } = dataSlice.actions

export default dataSlice.reducer
