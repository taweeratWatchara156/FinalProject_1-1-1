"use client"

import { Button, Checkbox, Input, Space } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaLock, FaUser } from 'react-icons/fa'

export default function LoginPage() {
    const router = useRouter()

  return (
    <div className='flex-1 flex justify-center items-center'>
        <div className='p-10 flex flex-col gap-5 bg-[#86B0BD] rounded-md text-white shadow-xl border-[#67828b] border-2 border-dotted'>
            <h1 className='font-bold text-3xl mx-auto'>Login</h1>
            <div className='flex flex-col gap-3 w-[400px]'>
                <Input size="large" style={{color: "#3f5860"}} placeholder='username' prefix={<FaUser className='text-[#3f5860]' />}/>
                <Input.Password size="large" style={{color: "#3f5860"}} placeholder='password' prefix={<FaLock className='text-[#3f5860]' />}/>
                <Checkbox style={{color: "white"}}>Remember Username</Checkbox>
            </div>

            <Button size='large' style={{backgroundColor: "#E2A16F", border: "#a06f49", color:"white"}}>Login</Button>
            <span className='mx-auto'>Don't have an account? <span onClick={() => router.push("/signup")} className='text-[#3f5860] underline cursor-pointer'>Sign up</span></span>
        </div>
    </div>
  )
}
