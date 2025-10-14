import { create } from 'zustand'

type SimpleSort = {
  subject: string;
  setSubject: (newSubject: string) => void;
};

const useSimpleSort = create<SimpleSort>((set) => ({
  subject: "all",
  setSubject: (newSubject) => set({ subject: newSubject }),
}));

export default useSimpleSort