import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'onboarding_completed';

export const onboardingStorage = {
  getHasCompleted: async (): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      return value === 'true';
    } catch (e) {
      return false;
    }
  },
  setHasCompleted: async (completed: boolean): Promise<void> => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, completed ? 'true' : 'false');
    } catch (e) {
      // noop
    }
  },
};
