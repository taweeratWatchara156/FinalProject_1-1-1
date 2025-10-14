"use client"

import { Button, Checkbox, Input, Space } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaLock, FaUser } from 'react-icons/fa'

export default function LoginPage() {
    const router = useRouter()

  return (
    <div className='flex-1 flex px-2 sm:px-0 justify-center items-center'>
        <div className='w-full sm:w-auto px-5 md:px-10 py-10 flex flex-col gap-5 bg-[#86B0BD] rounded-md text-white shadow-xl border-[#67828b] border-2 border-dotted'>
            <h1 className='font-bold text-2xl sm:text-3xl mx-auto'>Login</h1>
            <div className='hidden sm:flex flex-col gap-3 w-[400px]'>
                <Input size="large" style={{color: "#3f5860"}} placeholder='username' prefix={<FaUser className='text-[#3f5860]' />}/>
                <Input.Password size="large" style={{color: "#3f5860"}} placeholder='password' prefix={<FaLock className='text-[#3f5860]' />}/>
                <Checkbox style={{color: "white"}}>Remember Username</Checkbox>
            </div>
            <div className='flex sm:hidden flex-col gap-3 w-full'>
                <Input size="middle" style={{color: "#3f5860"}} placeholder='username' prefix={<FaUser className='text-[#3f5860]' />}/>
                <Input.Password size="middle" style={{color: "#3f5860"}} placeholder='password' prefix={<FaLock className='text-[#3f5860]' />}/>
                <Checkbox style={{color: "white"}}>Remember Username</Checkbox>
            </div>

            <div className='hidden sm:flex'><Button size='large' style={{backgroundColor: "#E2A16F", border: "#a06f49", color:"white"}} className='w-full'>Login</Button></div>
            <div className='flex sm:hidden'><Button size='middle' style={{backgroundColor: "#E2A16F", border: "#a06f49", color:"white"}} className='w-full'>Login</Button></div>
            <span className='text-sm sm:text-base mx-auto'>Don't have an account? <span onClick={() => router.push("/signup")} className='text-[#3f5860] underline cursor-pointer'>Sign up</span></span>
        </div>
    </div>
  )
}
