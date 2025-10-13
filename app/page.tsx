"use client"
import Footer from "@/components/footer";
import { Image, Radio, RadioChangeEvent, Select, SelectProps, Tag } from "antd";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

export default function Home() {
    const [subject, setSubjet] = useState<string>("math")
    const [filter, setFilter] = useState<string>("latest")
    const title_length_limit = (title:string) => {
        if (title.length >= 30){
            return title.slice(0, 31) + "..."
        }
        return title
    }
    const test_post_datas = [
      {
        "post_image": "https://static.trueplookpanya.com/tppy/member/m_665000_667500/665461/cms/images/%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%88%E0%B8%94%E0%B8%8A%E0%B8%B5%E0%B8%97%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B_02.jpg",
        "title": "สรุปวิทยาศาสตร์สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://static.trueplookpanya.com/tppy/member/m_665000_667500/665461/cms/images/%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%88%E0%B8%94%E0%B8%8A%E0%B8%B5%E0%B8%97%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B_15.jpg",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://www.lemon8-app.com/seo/image?item_id=7335094309072585218&index=1&sign=9cee2c1464d93574f4b8b2cb1050a0a0",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://static.trueplookpanya.com/tppy/member/m_665000_667500/665461/cms/images/%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%88%E0%B8%94%E0%B8%8A%E0%B8%B5%E0%B8%97%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B_02.jpg",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://static.trueplookpanya.com/tppy/member/m_665000_667500/665461/cms/images/%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%88%E0%B8%94%E0%B8%8A%E0%B8%B5%E0%B8%97%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B_15.jpg",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://www.lemon8-app.com/seo/image?item_id=7335094309072585218&index=1&sign=9cee2c1464d93574f4b8b2cb1050a0a0",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://static.trueplookpanya.com/tppy/member/m_665000_667500/665461/cms/images/%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%88%E0%B8%94%E0%B8%8A%E0%B8%B5%E0%B8%97%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B_02.jpg",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://static.trueplookpanya.com/tppy/member/m_665000_667500/665461/cms/images/%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%88%E0%B8%94%E0%B8%8A%E0%B8%B5%E0%B8%97%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B_15.jpg",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://www.lemon8-app.com/seo/image?item_id=7335094309072585218&index=1&sign=9cee2c1464d93574f4b8b2cb1050a0a0",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://static.trueplookpanya.com/tppy/member/m_665000_667500/665461/cms/images/%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%88%E0%B8%94%E0%B8%8A%E0%B8%B5%E0%B8%97%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B_02.jpg",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://static.trueplookpanya.com/tppy/member/m_665000_667500/665461/cms/images/%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%88%E0%B8%94%E0%B8%8A%E0%B8%B5%E0%B8%97%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B_15.jpg",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://www.lemon8-app.com/seo/image?item_id=7335094309072585218&index=1&sign=9cee2c1464d93574f4b8b2cb1050a0a0",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://static.trueplookpanya.com/tppy/member/m_665000_667500/665461/cms/images/%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%88%E0%B8%94%E0%B8%8A%E0%B8%B5%E0%B8%97%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B_02.jpg",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://static.trueplookpanya.com/tppy/member/m_665000_667500/665461/cms/images/%E0%B9%84%E0%B8%AD%E0%B9%80%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B8%88%E0%B8%94%E0%B8%8A%E0%B8%B5%E0%B8%97%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B_15.jpg",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
      {
        "post_image": "https://www.lemon8-app.com/seo/image?item_id=7335094309072585218&index=1&sign=9cee2c1464d93574f4b8b2cb1050a0a0",
        "title": "สรุปวิทยาศาสตร์",
        "catergories": ["วิทยาศาสตร์", "ประถมศึกษา"],
        "author": "admin",
        "author_profile": "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        "like": 200,
        "view": 200
      },
    ]
  return (
    <div className="flex-1 pt-30">
        {/* Title */}
        <div className="flex gap-5ิ w-fit pb-20 mx-auto">
          <h1 className="text-xl font">สรุปทั้งหมด ( {test_post_datas.length} )</h1>
        </div>

        <div className="flex flex-col gap-5 px-10">
          <div className="flex gap-2">
            <Radio.Group defaultValue={"latest"} onChange={(e:RadioChangeEvent) => setFilter(e.target.value)}>
              <Radio.Button value="latest">ใหม่ที่สุด</Radio.Button>
              <Radio.Button value="oldest">เก่าที่สุด</Radio.Button>
              <Radio.Button value="mostviewed">เข้าชมมากที่สุด</Radio.Button>
              <Radio.Button value="mostliked">กดไลค์มากที่สุด</Radio.Button>
            </Radio.Group>
          </div>
          
          <div className="grid grid-cols-5 gap-8">
            {test_post_datas.map((post, index) => {
              return (
                <div key={index} className="duration-200 hover:scale-105 cursor-pointer active:scale-100 hover:shadow-2xl relative p-4 gap-2 flex flex-col w-[320px] justify-center shadow-xl border-gray-200 border rounded-lg">
                  <div className="flex gap-2">
                    <img src={post.author_profile}
                      alt={post.author + "'s profile"} className="w-[25px] rounded-full"/>
                    <span>{post.author}</span>
                  </div>


                  <div className="flex gap-2">
                    {
                      post.catergories.map((v, index) => {
                        return <div key={index} className="text-sm px-1 border-1 rounded-sm border-gray-400 text-gray-500">
                            {v}
                        </div>
                      })
                    }
                  </div>
                  
                  <div className="relative w-full h-[200px] overflow-hidden rounded-md border-3 border-gray-200 border-dotted">
                    <Image src={post.post_image}/>
                  </div>

                  {/* Post title */}
                  <h1 className="text-lg">{title_length_limit(post.title)}</h1>

                  {/* Like and view */}
                  <div className="flex justify-between flex-row-reverse">
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1 text-gray-500">
                          <AiFillLike/>
                          <span>{post.like}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <FaEye/>
                          <span>{post.view}</span>
                        </div>
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Descrition before footer */}
        <div className="flex flex-col gap-5 items-center text-xl py-30">
            <h1 className="font-bold">Final Project</h1>
            <p className="text-center w-2/3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores omnis similique perspiciatis quaerat reprehenderit, quidem quasi nisi cumque explicabo praesentium, reiciendis beatae expedita vero doloribus magni eum id fuga dolore molestiae aliquid officia? Ad ullam quod similique quidem! Molestias sapiente ut aliquid amet eaque, recusandae maxime distinctio esse praesentium minus!</p>
        </div>
    </div>
  );
}
