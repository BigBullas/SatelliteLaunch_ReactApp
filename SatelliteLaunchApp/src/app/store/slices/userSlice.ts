import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_id: -1,
    login: '',
    email: '',
    password: '',
    is_admin: false,
}

const dataSlice = createSlice({
  name: 'user',
  initialState: { Data: initialState, isAuthorized: false},
  reducers: {
    setData(state, { payload }) {
      state.Data = payload.Data;
      state.isAuthorized = payload.isAuthorized;
    },
    cleanUser: (state) => {
        state.Data.user_id = -1;
        state.Data.login = '';
        state.Data.email = '';
        state.Data.password = '';
        state.isAuthorized = false;
        state.Data.is_admin = false;
    }
  },
})

export const { setData: setUserDataAction, cleanUser: cleanUserDataAction } = dataSlice.actions

export default dataSlice.reducer
