import { connectDatabase } from "@/database/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDatabase();

        const id = params.id;
        const post = await Post.findByIdAndUpdate(id , { $inc: { views:1 } }, { new:true }).populate("owner")
        if (!post) {
            return NextResponse.json({ "message": "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ post }, { status: 200 });

    } catch (error) {
        console.error("Error fetching single post:", error);
        return NextResponse.json({ "message": "Error occured while fetching post" }, { status: 500 });
    }
}