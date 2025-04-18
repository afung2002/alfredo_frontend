import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistedState } from 'redux-persist/es/types';

import userReducer from './slices/user';
import configsReducer from './slices/configs';
import { apiSlice } from '../services/api/baseApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'configs'], // Only persist user and configs slices
};

const rootReducer = combineReducers({
  user: userReducer,
  configs: configsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// ✅ Only use the cast once (cleaner)
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
) as Reducer<ReturnType<typeof rootReducer> & PersistedState>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
