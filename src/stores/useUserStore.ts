import { create } from 'zustand';

const useUserStore = create(() => ({
  user: null,
}));

export default useUserStore;
