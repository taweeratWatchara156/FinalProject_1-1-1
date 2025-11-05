"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token){
            router.push("/")
        }
    },[])
  return (  
    <div className='pt-30 flex-1 flex px-2 sm:px-0 justify-center items-center'>
        <h1 className='text-2xl'>🛠️ Under Maintainance</h1>
    </div>
  )
}
