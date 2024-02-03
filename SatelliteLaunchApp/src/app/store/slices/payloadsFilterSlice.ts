import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

type State = {
    spaceSatellite: string,
    loadCapacityStart: number | string,
    loadCapacityEnd: number | string,
    flightDateStart: Date | string,
    flightDateEnd: Date | string,
}

const initialState: State = {
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
    }
  },
})

export const filterData = () => useSelector((state: any) => state.payloadsFilterInfo.Data)

export const { setSpaceSatelliteData, setLoadCapacityStartData, 
    setLoadCapacityEndData, setFlightDateStartData, setFlightDateEndData } = dataSlice.actions

export default dataSlice.reducer
