import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthTokenGetter } from "../apis/axios-client";

const TOKEN_KEY = "auth_token";
const USER_NAME_KEY = "auth_user_name";

export const authStorage = {
  getToken: async () => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) {
      return null;
    }
  },
  setToken: async (token: string) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      // noop
    }
  },
  removeToken: async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      // noop
    }
  },

  getUserName: async () => {
    try {
      return await AsyncStorage.getItem(USER_NAME_KEY);
    } catch (e) {
      return null;
    }
  },
  setUserName: async (name: string) => {
    try {
      await AsyncStorage.setItem(USER_NAME_KEY, name);
    } catch (e) {
      // noop
    }
  },
  removeUserName: async () => {
    try {
      await AsyncStorage.removeItem(USER_NAME_KEY);
    } catch (e) {
      // noop
    }
  },

  /** Clears everything stored at login — use this on logout. */
  clear: async () => {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_NAME_KEY]);
    } catch (e) {
      // noop
      console.error(e);
    }
  },
};

// Wire it up to the axios client
setAuthTokenGetter(authStorage.getToken);
