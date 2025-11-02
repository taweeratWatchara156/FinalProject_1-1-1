"use client"

import useAuthen from '@/components/global_states/useAuth'
import { Post } from '@/models/client_interface'
import { Image } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillLike, AiOutlineLoading } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'

export default function MyPostPage() {
    const router = useRouter()
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useAuthen()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token){
            router.push("/")
        }
    },[])

    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true)
        try{
          const res = await fetch("/api/posts").then(res => res.json())
          setPosts(res.posts)
        }catch(error){
          console.log(error)
          toast.error("Fail to fetch post.")
        }finally{
          setLoading(false)
        }
      }
    fetchPosts()
    }, [])

    const sortedPosts = useMemo(() => {
        const filteredGradePosts = posts.filter(post => {
            const ownerMatch = post.owner._id == user?.id
            return ownerMatch
        });

        return filteredGradePosts
    }, [posts]);

    const title_length_limit = (title:string) => {
        if (title.length >= 30){
            return title.slice(0, 31) + "..."
        }
        return title
    }


  if(loading) {
    return <div className="flex-1 flex items-center justify-center">
      <AiOutlineLoading className="text-black animate-spin text-5xl"/>
    </div>
  }

  return (
    <div className='px-5 md:px-20 py-45 flex-1'>
      <div className='flex items-center mb-10 gap-5'>
        <h1 className='text-base md:text-xl'>My Post ( {sortedPosts.length} )</h1>
        <button onClick={() => router.push('mypost/createpost')} className='text-base md:text-lg bg-green-500 outline-none rounded-md text-white px-2 md:px-3 duration-100 hover:bg-green-400 cursor-pointer py-2'>สร้างโพสต์</button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-8 justify-items-center">
            {sortedPosts.map((post) => {
              return (
                <div onClick={() => router.push(`/posts/${post._id}`)} key={post._id} className="duration-200 hover:scale-105 cursor-pointer active:scale-100 hover:shadow-2xl relative p-4 gap-2 flex flex-col w-[320px] justify-center shadow-xl border-gray-200 border rounded-lg">
                  <div className="flex gap-2">
                    <img src="/default_profile.jpg"
                      alt={post.owner.username + "'s profile"} className="w-[25px] h-[25px] rounded-full"/>
                    <span>{post.owner.username}</span>
                  </div>


                  <div className="flex gap-2">
                      <div className="text-sm px-1 border-1 rounded-sm border-gray-400 text-gray-500">
                        {post.grade}
                      </div>
                      <div className="text-sm px-1 border-1 rounded-sm border-gray-400 text-gray-500">
                        {post.category}
                      </div>
                  </div>
                  
                  <div className="relative w-full h-[200px] overflow-hidden rounded-md border-3 border-gray-200 border-dotted">
                    <Image src={post.sheets[0]}/>
                  </div>

                  {/* Post title */}
                  <h1 className="text-lg">{title_length_limit(post.title)}</h1>

                  {/* Like and view */}
                  <div className="flex justify-between flex-row-reverse">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1 text-gray-500">
                          <AiFillLike/>
                          <span>{post.likes.length}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <FaEye/>
                          <span>{post.views}</span>
                        </div>
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
    </div>
  )
}
