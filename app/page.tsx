"use client"
import useSimpleSort from "@/components/global_states/useSimpleSort";
import { Post } from "@/models/client_interface";
import { Image, Radio, RadioChangeEvent, Select, SelectProps, Tag } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AiFillLike, AiOutlineLoading } from "react-icons/ai";
import { FaEye } from "react-icons/fa";



export default function Home() {
    const [filter, setFilter] = useState<string>("latest")
    const [title, setTitle] = useState<string>("สรุปทั้งหมด")
    const simpleSort = useSimpleSort(s => s.subject)
    const [post, setPost] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const route = useRouter()

    useEffect(() => {
      const fetchPosts = async () => {
        try{
          const res = await fetch("api/posts").then(res => res.json())
          setPost(res.posts)
        }catch(error){
          console.log(error)
          toast.error("Fail to fetch post.")
        }finally{
          setLoading(false)
        }
      }
    fetchPosts()
    }, [])

    useEffect(() => {
      const fetchPosts = async () => {
        try{
          const res = await fetch("api/posts").then(res => res.json())
          setPost(res.posts)
        }catch(error){
          console.log(error)
          toast.error("Fail to fetch post.")
        }
      }
    fetchPosts()
    }, [])

    const sortedPosts = useMemo(() => {
            const filteredPosts = post.filter(p => {
                if (simpleSort === 'all') {
                setTitle("สรุปทั้งหมด")
                    return true; // Show all
                }
                setTitle("สรุปวิชา"+simpleSort)
                return p.category === simpleSort; // Show only matching category
            });

            const sortablePosts = [...filteredPosts];

            switch (filter) {
                case 'latest':
                    return sortablePosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                case 'oldest':
                    return sortablePosts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                case 'mostviewed':
                    return sortablePosts.sort((a, b) => b.views - a.views);
                case 'mostliked':
                    return sortablePosts.sort((a, b) => b.likes.length - a.likes.length);
                default:
                    return sortablePosts;
            }
        }, [post, filter, simpleSort]);

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
    <div className="flex-1 pt-30">
        {/* Title */}
        <div className="flex gap-5ิ w-fit py-10 lg:py-20 mx-auto">
          <h1 className="text-lg lg:text-xl font">{title} ( {sortedPosts.length} )</h1>
        </div>

        <div className="flex flex-col gap-5 px-2 sm:px-10">
          <div className="flex gap-2 justify-center sm:justify-start">
            <div className="flex sm:hidden">
              <Radio.Group  size="small" defaultValue={"latest"} onChange={(e:RadioChangeEvent) => setFilter(e.target.value)}>
                <Radio.Button value="latest">ใหม่ที่สุด</Radio.Button>
                <Radio.Button value="oldest">เก่าที่สุด</Radio.Button>
                <Radio.Button value="mostviewed">เข้าชมมากที่สุด</Radio.Button>
                <Radio.Button value="mostliked">กดไลค์มากที่สุด</Radio.Button>
              </Radio.Group>
            </div>
            <div className="hidden sm:flex">
              <Radio.Group  size="middle" defaultValue={"latest"} onChange={(e:RadioChangeEvent) => setFilter(e.target.value)}>
                <Radio.Button value="latest">ใหม่ที่สุด</Radio.Button>
                <Radio.Button value="oldest">เก่าที่สุด</Radio.Button>
                <Radio.Button value="mostviewed">เข้าชมมากที่สุด</Radio.Button>
                <Radio.Button value="mostliked">กดไลค์มากที่สุด</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          
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

        {/* Descrition before footer */}
        <div className="flex flex-col gap-3 lg:gap-5 items-center text-base md:text-lg lg:text-xl py-15 md:py-30">
            <h1 className="font-bold">SumSheet</h1>
            <p className="text-center w-5/6 sm:w-2/3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores omnis similique perspiciatis quaerat reprehenderit, quidem quasi nisi cumque explicabo praesentium, reiciendis beatae expedita vero doloribus magni eum id fuga dolore molestiae aliquid officia? Ad ullam quod similique quidem! Molestias sapiente ut aliquid amet eaque, recusandae maxime distinctio esse praesentium minus!</p>
        </div>
    </div>
  );
}
