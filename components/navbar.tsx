"use client"

import { Select } from "antd"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaAngleDown, FaCog, FaGraduationCap, FaSearch } from "react-icons/fa"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { SiGoogledocs } from "react-icons/si"
import useSimpleSort from "./global_states/useSimpleSort"

export default function Navbar() {
    const router = useRouter()
    const pathName = usePathname()
    const subject = useSimpleSort((state) => state.subject)
    const setSubject = useSimpleSort((state) => state.setSubject)
    const [grade, setGrade] = useState<string>("elementary")
    const [searchSubject, setSearchSubject] = useState<string>("math")
    const [showProfileSetting, setShowProfileSettings] = useState<boolean>(false)
    const [showSubNav, setShowSubNav] = useState<boolean>(false)
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
    const [fixedNavbar, setFixedNavbar] = useState<boolean>(false)

    const handleSimpleSort = (value:string) => {
        setSubject(value)
        if (pathName != "/") router.push("/")
    }

    const sorting_data = {
        "all": "ทั้งหมด",
        "math":"คณิตศาสตร์",
        "sci": "วิทยาศาสตร์",
        "thai": "ภาษาไทย",
        "eng": "ภาษาอังกฤษ",
        "chem": "เคมี",
        "bio": "ชีววิทยา"}

    const handleSearch = () => {
        router.push(`/${grade}/${searchSubject}`)
    }

    const username_length_limit = (username:string) => {
        if (username.length >= 10){
            return username.slice(0, 11) + "..."
        }
            return username
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 100) setFixedNavbar(true)
            else setFixedNavbar(false)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const searchBar = document.getElementById("search-bar")
        const target = event.target as HTMLElement

        console.log(target.className !== "ant-select-item-option-content")

        if (searchBar && !searchBar.contains(event.target as Node) && target.id != "search-element" && target.className !== "ant-select-item-option-content") {
            setShowSearchBar(false)
        }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

  return (
    <div className={`${fixedNavbar ? 'fixed' : ''} z-100 w-full`}>
        <div className="w-full flex justify-between items-center bg-[#86B0BD] px-6 sm:px-10 lg:px-15 py-5">
            <div className={`flex gap-5 items-center`}>
                {/* Logo */}
                <div className="flex gap-2 font-bold text-white text-xl lg:text-2xl items-center cursor-pointer" onClick={() => router.push("/")}>
                    <FaGraduationCap className="text-2xl lg:text-3xl"/>
                    <h1>Final Project</h1>
                </div>

                {/* Select grade for search */}
                <div id="search-bar" className={`${showSearchBar ? 'flex w-full justify-center py-5 z-200 bg-[#86B0BD] left-0' : 'hidden'}  duration-200 overflow-hidden absolute md:relative md:flex gap-2`}>
                    <Select id="search-element" options={[
                    { value: "elementary", label: <span id="search-element">ประถมศึกษา</span> },
                    { value: "mid", label: <span id="search-element">มัธยมต้น</span> },
                    { value: "high", label: <span id="search-element">มัธยมต้นปลาย</span> }
                    ]} className="w-[120px] sm:w-[150px]" defaultValue={"elementary"} onChange={(value, _) => setGrade(value)}/>

                    {/* Select subject for search */}
                    <Select id="search-element" options={[
                    { value: "math", label: <span id="search-element">คณิตศาสตร์</span> },
                    { value: "sci", label: <span id="search-element">วิทยศาสตร์</span> },
                    { value: "thai", label: <span id="search-element">ภาษาไทย</span> },
                    { value: "eng", label: <span id="search-element">ภาษาอังกฤษ</span> },
                    { value: "chem", label: <span id="search-element">เคมี</span> },
                    { value: "bio", label: <span id="search-element">ชีววิทยา</span> },
                    ]} className="w-[120px] sm:w-[150px]" defaultValue={"math"} onChange={(value, _) => setSearchSubject(value)}/>
                    <button type="button" onClick={handleSearch} className={`bg-white text-sm px-5 rounded-md hover:scale-105 active:scale-100 duration-200 cursor-pointer`}>ค้นหา</button>
                </div>
            </div>

            {/* Login Sign up buttons */}
            {/* If user did not login yet show this button */}
            <div className="flex gap-2 text-white">
                {/* Search icon for responsive */}
                <div onClick={() => setShowSearchBar(!showSearchBar)} className=" text-white p-2 cursor-pointer hover:scale-105 active:scale-100 flex md:hidden items-center duration-200 hover:bg-[#ecaa79] active:bg-[#c18454] bg-[#E2A16F] rounded-md">
                    <FaSearch/>
                </div>
                <button onClick={() => router.push("/signup")} className="hidden md:flex px-3 py-2 cursor-pointer hover:scale-105 active:scale-100 outline-none duration-200">Sign up</button>
                <button onClick={() => router.push("/login")} className="text-sm sm:text-base px-3 sm:px-5 py-2 bg-[#E2A16F] active:bg-[#c18454] cursor-pointer hover:bg-[#ecaa79] hover:scale-105 duration-200 rounded-md font-bold ">Login</button>
            </div>

            {/* If user already have an account */}
              <div className="hidden gap-2 items-center relative">
                {/* Search icon for responsive */}
                <div onClick={() => setShowSearchBar(!showSearchBar)} className=" text-white p-2 cursor-pointer hover:scale-105 active:scale-100 flex md:hidden items-center duration-200 hover:bg-[#ecaa79] active:bg-[#c18454] bg-[#E2A16F] rounded-md">
                    <FaSearch/>
                </div>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                  alt="default profile" className="w-[30px] rounded-full" onClick={() => setShowProfileSettings(!showProfileSetting)}/>
                <span className="hidden md:flex text-white items-center gap-2">{username_length_limit("Taweerat Watcharamanokarn")} <FaAngleDown onClick={() => setShowProfileSettings(!showProfileSetting)} className={`${showProfileSetting ? 'rotate-180' : ''} hover:scale-105 duration-200 cursor-pointer`}/></span>
                {/* Profile settings */}
                <div className={`${showProfileSetting ? 'h-[120px]' : 'h-0'} shadow-md rounded-b-md justify-center flex flex-col duration-200 overflow-hidden absolute bg-[#86B0BD] top-12 right-0 w-[162px] md:w-full`}>
                    <span className="w-full flex justify-between hover:bg-[#a1cad6] duration-200 cursor-pointer py-2 px-2 text-white">
                        <span className="flex items-center gap-2"><FaCog/>Settings</span>
                    </span>
                    <span onClick={() => router.push("/mypost")} className="w-full flex justify-between hover:bg-[#a1cad6] duration-200 cursor-pointer py-2 px-2 text-white">
                        <span className="flex items-center gap-2"><SiGoogledocs/>My Posts</span>
                    </span>
                    <span className="w-full flex justify-between hover:bg-red-500 duration-200 cursor-pointer py-2 px-2 text-white">
                        <span className="flex items-center gap-2"><RiLogoutBoxRLine/>Logout</span>
                    </span>
                </div>
              </div>
        </div>

        {/* simple sorting post in home page */}
        <div className={`${showSubNav ? 'h-[364px] md:h-auto' : 'h-0 md:h-auto'} md:auto duration-200 overflow-hidden flex md:bg-none flex-col md:flex-row gap-0 md:gap-5 lg:gap-8 xl:gap-15 justify-center px-0 md:px-20`}>
            {
               Object.entries(sorting_data).map(([key, value], index) => {
                return <button key={index} className={`${subject == key ? 'bg-[#86B0BD]' : 'bg-[#648995]'} ${fixedNavbar ? 'shadow-2xl' : ''} duration-200 text-white py-4 md:py-2 lg:py-3 xl:py-5 px-6 lg:px-8 xl:px-10 md:rounded-b-3xl cursor-pointer text-sm lg:text-base`} onClick={() => handleSimpleSort(key)}>{value}</button>
               })
            }
        </div>

        <div onClick={() => setShowSubNav(!showSubNav)} className={`flex md:hidden bg-[#86B0BD] w-fit p-2 cursor-pointer  rounded-b-xl mx-auto text-xl`}>
            <FaAngleDown className={`${showSubNav ? 'rotate-180' : ''} duration-200 text-white`}/>
        </div>
    </div>
  )
}
