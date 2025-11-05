"use client"
import { jwtDecode } from 'jwt-decode'
import React, { useEffect } from 'react'
import useAuthen from './global_states/useAuth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const setLogin = useAuthen(s => s.setLogin)
    const setLogout = useAuthen(s => s.setLogout)
    
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token){
            try{
                const decodedToken = jwtDecode(token)
                const currentTime = Date.now() / 1000

                if (decodedToken?.exp > currentTime){
                    setLogin(token)
                }else{
                    setLogout()
                }
            }catch(error){
                setLogout()
            }
        }
    }, [])

  return children
}
