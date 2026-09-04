/**
 * RTK Query's `refetchOnReconnect`/`refetchOnFocus` (enabled in
 * `api.ts`) rely on knowing whether the app is online.
 */

import NetInfo from "@react-native-community/netinfo";
import { setupListeners } from "@reduxjs/toolkit/query";

import type { AppStore } from "./store";

export function setupRtkQueryListeners(store: AppStore): () => void {
  return setupListeners(store.dispatch, (dispatch, { onOnline, onOffline }) => {
    return NetInfo.addEventListener((state) => {
      const isOnline =
        Boolean(state.isConnected) && state.isInternetReachable !== false;
      dispatch(isOnline ? onOnline() : onOffline());
    });
  });
}
