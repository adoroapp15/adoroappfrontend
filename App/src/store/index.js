import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import {persist} from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      dark: 0,
      toggleTheme: () => set(state => ({dark: !state.dark})),
    }),
    {
      name: 'local-storage', // unique name
      getStorage: () => AsyncStorage, // Add this here!
    },
  ),
);

export default useStore;
