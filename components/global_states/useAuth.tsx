import { jwtDecode } from 'jwt-decode';
import { MdLocalHospital } from 'react-icons/md';
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
  id:string,
  username:string,
  email:string
}

type AuthenState = {
  isAuthenticated: boolean;
  user: User | null
  setLogin: (token:string) => void
  setLogout: () => void;
};

const useAuthen = create(persist<AuthenState>((set) => ({
  isAuthenticated: false,
  user: null,
  setLogin: (token: string) => {
    try{
      const decoderUser = jwtDecode<User>(token)
      localStorage.setItem("token", token)
      set({ isAuthenticated: true, user: decoderUser })
    }catch(error){
      console.error("Invalid token:",error)
      set({ isAuthenticated: false, user: null })
      localStorage.removeItem("token")
    }
  },

  setLogout: () => {
    localStorage.removeItem("token")
    set({ isAuthenticated: false, user: null })
  }
})
,{
  name: 'auth-storage',
  storage: createJSONStorage(() => localStorage)
}))

export default useAuthen