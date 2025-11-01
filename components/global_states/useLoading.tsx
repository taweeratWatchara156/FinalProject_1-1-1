import { create } from 'zustand'

type Loading = {
  loading: boolean;
  setLoading: (newState: boolean) => void;
};

const useLoading = create<Loading>((set) => ({
  loading: false,
  setLoading: (newState) => set({ loading: newState }),
}));

export default useLoading