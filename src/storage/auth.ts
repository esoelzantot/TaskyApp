import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_token";
const USER_NAME_KEY = "auth_user_name";

export const authStorage = {
  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch {
      // noop
    }
  },

  removeToken: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch {
      // noop
    }
  },

  getUserName: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(USER_NAME_KEY);
    } catch {
      return null;
    }
  },

  setUserName: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(USER_NAME_KEY, name);
    } catch {
      // noop
    }
  },

  removeUserName: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(USER_NAME_KEY);
    } catch {
      // noop
    }
  },

  /**
   * Clears all authentication-related data.
   * Use this when logging out.
   */
  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_NAME_KEY]);
    } catch (error) {
      console.error("Failed to clear auth storage:", error);
    }
  },
};
