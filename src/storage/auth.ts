import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthTokenGetter } from '../apis/axios-client';

const TOKEN_KEY = 'auth_token';

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
};

// Wire it up to the axios client
setAuthTokenGetter(authStorage.getToken);
