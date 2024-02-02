import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    flight_id: -1,
    creator_id: -1,
    creator_login: '',
    moderator_id: -1,
    moderator_login: '',
    status: '',
    created_at: '',
    formed_at: '',
    confirmed_at: '',
    flight_date: '',
    load_capacity: 0,
    price: 0,
    title: '',
    place_number: 0,
}

const dataSlice = createSlice({
  name: 'draft',
  initialState: { Data: initialState },
  reducers: {
    setData(state, { payload }) {
      state.Data = payload
    },
  },
})

export const { setData: setDraftDataAction } = dataSlice.actions

export default dataSlice.reducer
