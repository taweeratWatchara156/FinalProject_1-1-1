"use client"

import useAuthen from '@/components/global_states/useAuth'
import useLoading from '@/components/global_states/useLoading'
import { Button, Checkbox, Input, Space } from 'antd'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaLock, FaUser } from 'react-icons/fa'

export default function SignUpPage() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const setLoading = useLoading(s => s.setLoading)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token){
            router.push("/")
        }
    }, [])

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        setLoading(true)
        
        if(password != confirmPassword){
            toast.error("Password does not match!")
            setLoading(false)
            return
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            toast.error("รหัสผ่านควรมีความยาวอย่างน้อย 8 ตัวอักษร และ มีตัวอักษรพิเศษและตัวหนังสืออย่างน้อย 1 ตัว");
            setLoading(false)
            return;
        }

        try{
            const res = await fetch("api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            })
            
            const data = await res.json()

            if(res.ok){
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
            setLoading(false)
        }catch(error){
            return toast.error("Error occured while creating an account!")
        }finally{
            setLoading(false)
        }
    }

    const router = useRouter()

  return (
    <div className='py-45 flex-1 flex px-2 sm:px-0 justify-center items-center'>
        <form onSubmit={handleSubmit} className='w-full sm:w-auto px-5 md:px-10 py-10 flex flex-col gap-5 bg-[#86B0BD] rounded-md text-white shadow-xl border-[#67828b] border-2 border-dotted'>
            <h1 className='font-bold text-2xl sm:text-3xl mx-auto'>Sign up</h1>
            <div className='hidden sm:flex flex-col gap-3 w-[400px]'>
                <Input size="large" onChange={(e) => setUsername(e.target.value)} style={{color: "#3f5860"}} placeholder='Username' prefix={<FaUser className='text-[#3f5860]' />}/>
                <Input size="large" onChange={(e) => setEmail(e.target.value)} style={{color: "#3f5860"}} placeholder='Email' type='email' prefix={<FaUser className='text-[#3f5860]' />}/>
                <Input.Password size="large" onChange={(e) => setPassword(e.target.value)} style={{color: "#3f5860"}} placeholder='Password' prefix={<FaLock className='text-[#3f5860]' />}/>
                <Input.Password size="large" onChange={(e) => setConfirmPassword(e.target.value)} style={{color: "#3f5860"}} placeholder='Confirm Password' prefix={<FaLock className='text-[#3f5860]' />}/>
            </div>

            <div className='flex sm:hidden flex-col gap-3 w-full'>
                <Input size="middle" onChange={(e) => setUsername(e.target.value)} style={{color: "#3f5860"}} placeholder='Username' prefix={<FaUser className='text-[#3f5860]' />}/>
                <Input size="middle" onChange={(e) => setEmail(e.target.value)} style={{color: "#3f5860"}} placeholder='Email' type='email' prefix={<FaUser className='text-[#3f5860]' />}/>
                <Input.Password size="middle" onChange={(e) => setPassword(e.target.value)} style={{color: "#3f5860"}} placeholder='Password' prefix={<FaLock className='text-[#3f5860]' />}/>
                <Input.Password size="middle" onChange={(e) => setConfirmPassword(e.target.value)} style={{color: "#3f5860"}} placeholder='Confirm Password' prefix={<FaLock className='text-[#3f5860]' />}/>
            </div>

            <div className='hidden sm:flex'><Button htmlType='submit' size='large' style={{backgroundColor: "#E2A16F", border: "#a06f49", color:"white"}} className='w-full'>Sign up</Button></div>
            <div className='flex sm:hidden'><Button htmlType='submit' size='middle' style={{backgroundColor: "#E2A16F", border: "#a06f49", color:"white"}} className='w-full'>Sign up</Button></div>
            
            <span className='text-sm sm:text-base mx-auto'>Already have an account? <span onClick={() => router.push("/login")} className='text-[#3f5860] underline cursor-pointer'>Login</span></span>
        </form>
    </div>
  )
}
