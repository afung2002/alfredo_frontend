import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { baseApi } from '@services/api/baseApi';
import userReducer from './slices/user';
import { apiSlice } from '../services/api/baseApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user',],
};

const rootReducer = combineReducers(
  {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    // [baseApi.reducerPath]: baseApi.reducer,
  },
);

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
  .concat(apiSlice.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;