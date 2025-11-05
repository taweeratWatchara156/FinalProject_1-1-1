import { connectDatabase } from "@/database/mongodb";
import Post from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try{
        await connectDatabase()
        const posts = await Post.find({}).populate("owner", "username user_img")
        return NextResponse.json({ posts }, { status:200 })
    }catch(error){
        console.error("Error occured while fetching posts", error)
        return NextResponse.json({ "message": "Error occured while fetching posts" }, { status: 500 })
    }
}

export async function POST(req:NextRequest) {
    try{
        const { title, description, owner, sheets, grade, category } = await req.json();
        await connectDatabase()
        await Post.create({
            title,
            description,
            owner,
            sheets,
            grade,
            category
        })
        return NextResponse.json({ "message": "Post created successfully" }, { status: 201 });
    }catch(error){
        console.error("Error occured while creating post", error)
        return NextResponse.json({ "message": "Error occured while creating post" }, { status: 500 })
    }
}