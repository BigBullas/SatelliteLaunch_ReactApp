import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from "./slices/userSlice";
import payloadsFilterSlice from './slices/payloadsFilterSlice';
import flightsFilterSlice from './slices/flightsFilterSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import draftSlice from './slices/draftSlice';

const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	user: userSlice,
	payloadFilter: payloadsFilterSlice,
	flightFilter: flightsFilterSlice,
	draft: draftSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer
})

export const persistor = persistStore(store)
