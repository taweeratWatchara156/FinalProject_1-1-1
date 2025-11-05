"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Page() {
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token){
            router.push("/")
        }
    },[router])
  return (  
    <div className='pt-30 flex-1 flex px-2 sm:px-0 justify-center items-center'>
        <h1 className='text-2xl'>🛠️ Under Maintainance</h1>
    </div>
  )
}
