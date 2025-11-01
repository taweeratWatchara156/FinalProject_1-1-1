"use client"

import useAuthen from '@/components/global_states/useAuth'
import useLoading from '@/components/global_states/useLoading'
import { Button, Checkbox, Input, Space } from 'antd'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaLock, FaUser } from 'react-icons/fa'

export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rememberUsername, setRememberUsername] = useState(false)
    const setLoading = useLoading(s => s.setLoading)
    const setLogin = useAuthen(s => s.setLogin)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token){
            router.push("/")
        }

        const rememberUsername = Cookies.get("username")
        if (rememberUsername){
            setUsername(rememberUsername)
            setRememberUsername(true)
        }
    }, [])

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (!username || !password) {
            return toast.error("username or password cannot be null")
        }
        
        setLoading(true)

        try{
            const res = await fetch("api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const data = await res.json()

            if (res.ok){
                if (rememberUsername) {
                    Cookies.set("username", username, { expires: 7 })
                }else{
                    Cookies.remove("username")
                }

                setLoading(false)
                setLogin(data.token)
                toast.success(data.message)
                router.push("/")
            }else{
                setLoading(false)
                toast.error(data.message)
            }
        }catch(error){
            setLoading(false)
            return toast.error("Error occured while logging in!")
        }
    }

  return (
    <div className='pt-30 flex-1 flex px-2 sm:px-0 justify-center items-center'>
        <form onSubmit={handleSubmit} className='w-full sm:w-auto px-5 md:px-10 py-10 flex flex-col gap-5 bg-[#86B0BD] rounded-md text-white shadow-xl border-[#67828b] border-2 border-dotted'>
            <h1 className='font-bold text-2xl sm:text-3xl mx-auto'>Login</h1>
            <div className='hidden sm:flex flex-col gap-3 w-[400px]'>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} size="large" style={{color: "#3f5860"}} placeholder='username' prefix={<FaUser className='text-[#3f5860]' />}/>
                <Input.Password onChange={(e) => setPassword(e.target.value)} size="large" style={{color: "#3f5860"}} placeholder='password' prefix={<FaLock className='text-[#3f5860]' />}/>
                <Checkbox style={{color: "white"}} checked={rememberUsername} onChange={(e) => setRememberUsername(e.target.checked)}>Remember Username</Checkbox>
            </div>
            <div className='flex sm:hidden flex-col gap-3 w-full'>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} size="middle" style={{color: "#3f5860"}} placeholder='username' prefix={<FaUser className='text-[#3f5860]' />}/>
                <Input.Password onChange={(e) => setPassword(e.target.value)} size="middle" style={{color: "#3f5860"}} placeholder='password' prefix={<FaLock className='text-[#3f5860]' />}/>
                <Checkbox style={{color: "white"}} checked={rememberUsername} onChange={(e) => setRememberUsername(e.target.checked)}>Remember Username</Checkbox>
            </div>

            <div className='hidden sm:flex'><Button htmlType='submit' size='large' style={{backgroundColor: "#E2A16F", border: "#a06f49", color:"white"}} className='w-full'>Login</Button></div>
            <div className='flex sm:hidden'><Button htmlType='submit' size='middle' style={{backgroundColor: "#E2A16F", border: "#a06f49", color:"white"}} className='w-full'>Login</Button></div>
            <span className='text-sm sm:text-base mx-auto'>Don't have an account? <span onClick={() => router.push("/signup")} className='text-[#3f5860] underline cursor-pointer'>Sign up</span></span>
        </form>
    </div>
  )
}
