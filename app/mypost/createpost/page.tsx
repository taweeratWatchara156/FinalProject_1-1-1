"use client"

import useAuthen from '@/components/global_states/useAuth'
import useLoading from '@/components/global_states/useLoading'
import { Input, Select, Upload, UploadFile, UploadProps } from 'antd'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function Page() {
    const [grade, setGrade] = useState<string>("มัธยมต้น")
    const [subject, setSubject] = useState<string>("คณิตศาสตร์")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const setLoading = useLoading(s => s.setLoading)
    const router = useRouter()
    const user = useAuthen(s => s.user)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token){
            router.push("/")
        }
    },[router])

    const uploadFileToCloudinary = async (file:File) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "SumSheet")

        const CLOUDINARY_URI = "https://api.cloudinary.com/v1_1/dcvbsevdi/image/upload"
        if (CLOUDINARY_URI){
            const res = await fetch(CLOUDINARY_URI, {
                method:"POST",
                body:formData
            })

            const data = await res.json()
            return data.secure_url;
        }
    }

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
        src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as File);
            reader.onload = () => resolve(reader.result as string);
        });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        setLoading(true)

        if (!title || !description || fileList.length === 0) {
            toast.error("Please fill in all fields and upload at least one sheet.")
            setLoading(false)
            return
        }

        try{
            const sheetUrls = await Promise.all(fileList.map(file => uploadFileToCloudinary(file.originFileObj as File)))
            const postData = {
                title:title,
                description,
                grade,
                category: subject,
                sheets: sheetUrls,
                owner:user?.id
            }

            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData)
            })

            if (res.ok) {
                toast.success("Post created!");
                router.push("/");
            } else {
                toast.error("Failed to create post.");
            }
            setLoading(false)
        }catch(error){
            console.error(error)
            setLoading(false)
            return toast.error("Error occured while creating new post")
        }

    }

  return (
    <div className="flex-1 py-45 flex items-center justify-center">
        <form onSubmit={handleSubmit} className='w-full sm:w-[500px] px-5 py-10 flex flex-col gap-5 rounded-md text-white shadow-xl border-[#67828b] border-2 border-dotted'>
            <h1 className='text-black text-lg'>สร้างโพสต์</h1>
            
            <div className='flex flex-col gap-5'>
                <div className='text-black'>
                    <h1>หัวข้อ</h1>
                    <Input onChange={(e) => setTitle(e.target.value)} size="large" style={{color: "#3f5860"}} placeholder='หัวข้อ'/>
                </div>
                <div className='text-black'>
                    <h1>รายละเอียดโพสต์</h1>
                    <Input onChange={(e) => setDescription(e.target.value)} size="large" style={{color: "#3f5860"}} placeholder='รายละเอียดโพสต์'/>
                </div>
                <div className='flex gap-5'>
                    <Select id="search-element" options={[
                    { value: "มัธยมต้น", label: <span id="search-element">มัธยมต้น</span> },
                    { value: "มัธยมปลาย", label: <span id="search-element">มัธยมปลาย</span> }
                    ]} className="w-[120px] sm:w-[150px]" defaultValue={"มัธยมต้น"} onChange={(value) => setGrade(value)}/>

                    {/* Select subject for search */}
                    <Select id="search-element" options={[
                    { value: "คณิตศาสตร์", label: <span id="search-element">คณิตศาสตร์</span> },
                    { value: "วิทยาศาสตร์", label: <span id="search-element">วิทยศาสตร์</span> },
                    { value: "ภาษาไทย", label: <span id="search-element">ภาษาไทย</span> },
                    { value: "ภาษาอังกฤษ", label: <span id="search-element">ภาษาอังกฤษ</span> },
                    ]} className="w-[120px] sm:w-[150px]" defaultValue={"คณิตศาสตร์"} onChange={(value) => setSubject(value)}/>
                </div>
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
                <button type='submit' className='w-full bg-green-500 hover:bg-green-400 cursor-pointer duration-100 rounded-md py-2 px-3'>Upload</button>
            </div>

        </form>
    </div>
  )
}
