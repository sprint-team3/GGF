import { create } from 'zustand';

import { UsersResponse } from '@/types';

type UserStoreState = {
  userData: UsersResponse | null;
  setUserData: (newData: UsersResponse) => void;
};

const useUserStore = create<UserStoreState>((set) => ({
  userData: null,
  setUserData: (newData: UsersResponse) => set({ userData: newData }),
}));

export default useUserStore;
