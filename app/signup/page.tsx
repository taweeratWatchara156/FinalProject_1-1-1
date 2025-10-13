"use client"

import { Button, Checkbox, Input, Space } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaLock, FaUser } from 'react-icons/fa'

export default function SignUpPage() {
    const router = useRouter()

  return (
    <div className='flex-1 flex justify-center items-center'>
        <div className='p-10 flex flex-col gap-5 bg-[#86B0BD] rounded-md text-white shadow-xl border-[#67828b] border-2 border-dotted'>
            <h1 className='font-bold text-3xl mx-auto'>Sign up</h1>
            <div className='flex flex-col gap-3 w-[400px]'>
                <Input size="large" style={{color: "#3f5860"}} placeholder='Username' prefix={<FaUser className='text-[#3f5860]' />}/>
                <Input size="large" style={{color: "#3f5860"}} placeholder='Email' type='email' prefix={<FaUser className='text-[#3f5860]' />}/>
                <Input.Password size="large" style={{color: "#3f5860"}} placeholder='Password' prefix={<FaLock className='text-[#3f5860]' />}/>
                <Input.Password size="large" style={{color: "#3f5860"}} placeholder='Confirm Password' prefix={<FaLock className='text-[#3f5860]' />}/>
            </div>

            <Button size='large' style={{backgroundColor: "#E2A16F", border: "#a06f49", color:"white"}}>Sign up</Button>
            <span className='mx-auto'>Already have an account? <span onClick={() => router.push("/login")} className='text-[#3f5860] underline cursor-pointer'>Login</span></span>
        </div>
    </div>
  )
}
