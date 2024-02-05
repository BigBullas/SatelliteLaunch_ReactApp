import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    flight_id: 0,
    creator_id: 0,
    creator_login: '',
    moderator_id: 0,
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
    setDraftId(state, { payload }) {
      state.Data.flight_id = payload;
    },

    setData(state, { payload }) {
      state.Data = payload
    },

    cleanData: (state) => {
      state.Data.flight_id = 0;
      state.Data.creator_id = 0;
      state.Data.creator_login = '';
      state.Data.moderator_id = 0;
      state.Data.moderator_login = '';
      state.Data.status = '';
      state.Data.created_at = '';
      state.Data.formed_at = '';
      state.Data.confirmed_at = '';
      state.Data.flight_date = '';
      state.Data.load_capacity = 0;
      state.Data.price = 0;
      state.Data.title = '';
      state.Data.place_number = 0;
  }
  },
})

export const { setData: setDraftDataAction, cleanData: cleanDraftDataAction, setDraftId: setDraftIdDataAction } = dataSlice.actions

export default dataSlice.reducer
