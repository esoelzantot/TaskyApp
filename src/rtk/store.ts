/**
 * Redux store.
 *
 * Offline-first strategy: RTK Query owns *all* API caching, tag
 * invalidation, and refetch logic at runtime — nothing here
 * duplicates that. 
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  createTransform,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  persistReducer,
  persistStore,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { api } from './api';

/**
 * `subscriptions` tracks which mounted components are currently
 * listening to a query — meaningless once the app has been closed,
 * and recreated fresh by whichever components mount after restart.
 * Stripped before writing to storage so persisted state stays small
 * and never restores stale subscriber references.
 */
const apiCacheTransform = createTransform<Record<string, unknown>, Record<string, unknown>>(
  (inboundState) => {
    const { subscriptions: _subscriptions, ...rest } = inboundState;
    return rest;
  },
  (outboundState) => outboundState,
  { whitelist: [api.reducerPath] }
);

const apiPersistConfig = {
  key: api.reducerPath,
  storage: AsyncStorage,
  transforms: [apiCacheTransform],
};

const rootReducer = combineReducers({
  [api.reducerPath]: persistReducer(apiPersistConfig, api.reducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist dispatches these action types with non-serializable payloads by design.
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
