import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { connectDatabase } from "@/database/mongodb";
import Post from "@/models/post";

interface TokenPayload {
  id: string;
  username: string;
  email: string;
}

export async function POST(req:NextRequest, context: { params: { id:string }}) {
    const { id } = context.params
    try{
        const token = req.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ "message": "Authentication required" }, { status: 401 });
        }

        let userId: string;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
            userId = decoded.id;
        } catch (error) {
            console.error(error)
            return NextResponse.json({ "message": "Invalid token" }, { status: 401 });
        }

        await connectDatabase();
        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json({ "message": "Post not found" }, { status: 404 });
        }

        const hasLiked = post.likes.includes(userId);
        let message = "";

        if (hasLiked) {
            post.likes.pull(userId);
            message = "Post unliked";
        } else {
            post.likes.push(userId);
            message = "Post liked";
        }

        await post.save();

        return NextResponse.json({ "message": message, "likes": post.likes }, { status: 200 });
    }catch(error){
        console.log(error)
        return NextResponse.json({ "message": "Error occurred while toggling like" }, { status: 500 });
    }
}