import { create } from 'zustand';

import { USER_INITIAL_DATA } from '@/constants';

import { UsersResponse } from '@/types';

type UserStoreState = {
  userData: UsersResponse;
  setUserData: (newData: UsersResponse) => void;
};

const useUserStore = create<UserStoreState>((set) => ({
  userData: USER_INITIAL_DATA,
  setUserData: (newData: UsersResponse) => set({ userData: newData }),
}));

export default useUserStore;
