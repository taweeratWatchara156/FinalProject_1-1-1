"use client"

import { Button, Select } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaGraduationCap } from "react-icons/fa"

export default function Navbar() {
    const router = useRouter()
    const [subject, setSubjet] = useState<string>("all")
    const [grade, setGrade] = useState<string>("elementary")
    const [searchSubject, setSearchSubject] = useState<string>("math")

    const handleSearch = () => {
        router.push(`/${grade}/${searchSubject}`)
    }

  return (
    <div>
        <div className="w-full flex justify-between items-center bg-[#86B0BD] px-15 py-5">
            <div className="flex gap-10 items-center">
                {/* Logo */}
                <div className="flex gap-2 font-bold text-white text-2xl items-center cursor-pointer" onClick={() => router.push("/")}>
                    <FaGraduationCap className="text-3xl"/>
                    <h1>Final Project</h1>
                </div>

                {/* Select */}
                <div className="flex gap-2">
                    <Select options={[
                    { value: "elementary", label: <span>ประถมศึกษา</span> },
                    { value: "mid", label: <span>มัธยมต้น</span> },
                    { value: "high", label: <span>มัธยมต้นปลาย</span> }
                    ]} className="w-[150px]" defaultValue={"elementary"} onChange={(value, _) => setGrade(value)}/>

                <Select options={[
                    { value: "math", label: <span>คณิตศาสตร์</span> },
                    { value: "sci", label: <span>วิทยศาสตร์</span> },
                    { value: "thai", label: <span>ภาษาไทย</span> },
                    { value: "eng", label: <span>ภาษาอังกฤษ</span> },
                    { value: "chem", label: <span>เคมี</span> },
                    { value: "bio", label: <span>ชีววิทยา</span> },
                    ]} className="w-[150px]" defaultValue={"math"} onChange={(value, _) => setSearchSubject(value)}/>
                    <button type="button" onClick={handleSearch} className="bg-white text-sm px-5 rounded-md hover:scale-105 active:scale-100 duration-200 cursor-pointer">ค้นหา</button>
                </div>
            </div>

            {/* Login Sign up buttons */}
            <div className="flex gap-2 text-white">
                <button onClick={() => router.push("/signup")} className="px-3 py-2 cursor-pointer hover:scale-105 active:scale-100 outline-none duration-200">Sign up</button>
                <button onClick={() => router.push("/login")} className="px-5 py-2 bg-[#E2A16F] active:bg-[#c18454] cursor-pointer hover:bg-[#ecaa79] hover:scale-105 duration-200 rounded-md font-bold ">Login</button>
            </div>
        </div>
        <div className="flex gap-15 justify-center px-20">
            <button className={`${subject == "all" ? 'bg-[#86B0BD]' : 'bg-[#648995]'} duration-200 text-white py-5 px-10 rounded-b-3xl cursor-pointer`} onClick={() => setSubjet("all")}>ทั้งหมด</button>
            <button className={`${subject == "math" ? 'bg-[#86B0BD]' : 'bg-[#648995]'} duration-200 text-white py-5 px-10 rounded-b-3xl cursor-pointer`} onClick={() => setSubjet("math")}>คณิตศาสตร์</button>
            <button className={`${subject == "sci" ? 'bg-[#86B0BD]' : 'bg-[#648995]'} duration-200 text-white py-5 px-10 rounded-b-3xl cursor-pointer`} onClick={() => setSubjet("sci")}>วิทยศาสตร์</button>
            <button className={`${subject == "thai" ? 'bg-[#86B0BD]' : 'bg-[#648995]'} duration-200 text-white py-5 px-10 rounded-b-3xl cursor-pointer`} onClick={() => setSubjet("thai")}>ภาษาไทย</button>
            <button className={`${subject == "eng" ? 'bg-[#86B0BD]' : 'bg-[#648995]'} duration-200 text-white py-5 px-10 rounded-b-3xl cursor-pointer`} onClick={() => setSubjet("eng")}>ภาษาอังกฤษ</button>
            <button className={`${subject == "chem" ? 'bg-[#86B0BD]' : 'bg-[#648995]'} duration-200 text-white py-5 px-10 rounded-b-3xl cursor-pointer`} onClick={() => setSubjet("chem")}>เคมี</button>
            <button className={`${subject == "bio" ? 'bg-[#86B0BD]' : 'bg-[#648995]'} duration-200 text-white py-5 px-10 rounded-b-3xl cursor-pointer`} onClick={() => setSubjet("bio")}>ชีววิทยา</button>
        </div>
    </div>
  )
}
