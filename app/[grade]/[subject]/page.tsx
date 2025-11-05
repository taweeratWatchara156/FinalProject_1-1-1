"use client"
import { Post } from '@/models/client_interface'
import { Image } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillLike, AiOutlineLoading } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'

export default function SearhResultPage() {
  const { grade, subject } : { grade:string, subject:string } = useParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRouter()

  const grade_convert = {
    "mid": "มัธยมต้น",
    "high": "มัธยมปลาย",
  }
  const subject_convert = {
    "math": "คณิตศาสตร์",
    "sci": "วิทยาศาสตร์",
    "thai": "ภาษาไทย",
    "eng": "ภาษาอังกฤษ",
  }

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
        const grade_converted = grade_convert[grade]
        const category_converted = subject_convert[subject]

        const filteredGradePosts = posts.filter(post => {
            const gradeMatch = post.grade === grade_converted;
            const subjectMatch = post.category === category_converted;
            return gradeMatch && subjectMatch;
        });

        return filteredGradePosts
    }, [posts]);

    const title_length_limit = (title:string) => {
        if (title.length >= 30){
            return title.slice(0, 31) + "..."
        }
        return title
    }

  if (loading){
    return <div className="flex-1 flex items-center justify-center">
      <AiOutlineLoading className="text-black text-5xl animate-spin"/>
    </div>
  }

  return (
    <div className='py-45 flex-1'>
          <h1 className='text-base md:text-lg ml-5 md:ml-10 mb-10'>{grade_convert[grade]} &gt; {subject_convert[subject]}</h1>

          <div className="grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-8 justify-items-center">
            {sortedPosts.map((post) => {
              return (
                <div onClick={() => route.push(`/posts/${post._id}`)} key={post._id} className="duration-200 hover:scale-105 cursor-pointer active:scale-100 hover:shadow-2xl relative p-4 gap-2 flex flex-col w-[320px] justify-center shadow-xl border-gray-200 border rounded-lg">
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
