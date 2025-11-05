"use client"
import useAuthen from "@/components/global_states/useAuth"
import { Post } from "@/models/client_interface"
import { Image } from "antd"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AiFillLike, AiOutlineLike, AiOutlineLoading } from "react-icons/ai"
import { FaEye } from "react-icons/fa"

export default function Page() {
    const { id }: { id:string } = useParams()
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const { user, isAuthenticated, setLogout } =  useAuthen()
    const router = useRouter()

    useEffect(() => {
        if (!id) return; 

        const fetchPost = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/posts/${id}`)
                
                if (!res.ok) {
                    throw new Error("Post not found");
                }
                
                const data = await res.json()
                setPost(data.post)
            } catch (error) {
                console.error(error)
                toast.error("Failed to fetch post.")
            } finally {
                setLoading(false)
            }
        }
        
        fetchPost()
    }, [id])

    const handleLikeToggle = async () => {
        if (!post) return

        if (!isAuthenticated || !user) {
            toast.error("Please log in to like a post.");
            router.push("/login");
            return;
        }
        
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Authentication session ended. Please log in again.");
            setLogout();
            return;
        }

        const originalLikes = post.likes;
        const hasLiked = originalLikes.includes(user.id);
        const newLikes = hasLiked
            ? originalLikes.filter((likeId) => likeId !== user.id)
            : [...originalLikes, user.id];
        
        // Update state immediately for fast UX
        setPost({ ...post, likes: newLikes });

        // Send the request to the API
        try {
            const res = await fetch(`/api/posts/${id}/like`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}` 
                },
            });

            if (!res.ok) {
                // If API fails, revert the state
                toast.error("Failed to update like.");
                setPost({ ...post, likes: originalLikes });
            }
        } catch (error) {
            console.error(error)
            toast.error("An error occurred.");
            setPost({ ...post, likes: originalLikes });
        }
    };

  if(loading) {
    return <div className="flex-1 flex items-center justify-center">
      <AiOutlineLoading className="text-black animate-spin text-5xl"/>
    </div>
  }

  const currentUserHasLiked = user && post?.likes.includes(user.id);

  return (
    <div className="flex-1 py-45 px-3 md:px-0 flex items-center justify-center">
      <div className='w-full md:w-[800px] p-5 flex flex-col gap-5 rounded-md text-white shadow-xl border-[#67828b] border-2 border-dotted'>
          <div className="flex text-black gap-2 items-center">
            <Image src={post?.owner.user_img} alt={post?.owner.username} width={30} height={30} className="rounded-full"/>
            <span>{post?.owner.username}</span>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-black text-base sm:text-lg font-bold">{post?.title}</h1>
            <p className="text-black text-sm sm:text-base">{post?.description}</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] gap-3 justify-items-center">
            {
              post?.sheets.map((sheet, index) => {
                  return <div key={index} className="relative w-[180] flex items-center overflow-hidden rounded-md border-3 border-gray-200 border-dotted">
                    <Image alt={String(index)} src={sheet}/>
                  </div>
              })
            }
          </div>
          <div className="flex gap-5">
            <button onClick={handleLikeToggle} className={`flex gap-2 items-center rounded-lg p-2 duration-200 
                ${currentUserHasLiked
                ? 'text-blue-600 bg-blue-100 hover:bg-blue-200'
                : 'text-gray-700 hover:bg-gray-100'}`}>
              {currentUserHasLiked ? <AiFillLike className="text-2xl sm:text-3xl"/> : <AiOutlineLike className="text-2xl sm:text-3xl"/>}
              <span>{post?.likes.length}</span>
            </button>

            <div className="flex gap-2 items-center text-gray-700">
              <FaEye className="text-2xl sm:text-3xl"/>
              <span>{post?.views}</span>
            </div>
          </div>
      </div>
    </div>
  )
}
