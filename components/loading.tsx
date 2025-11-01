"use client"

import React from 'react'
import useLoading from './global_states/useLoading'
import { AiOutlineLoading } from 'react-icons/ai'

export default function Loading() {
    const loading = useLoading(s => s.loading)
    
  return (
    <div className={`${loading ? 'absolute' : 'hidden'} bg-[#00000071] z-200 w-screen h-screen flex justify-center items-center`}>
        <AiOutlineLoading className='animate-spin text-5xl text-white'/>
    </div>
  )
}
