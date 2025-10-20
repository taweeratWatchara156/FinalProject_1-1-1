import { connectDatabase } from "@/database/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        const { username, email, password, user_img } = await req.json()
        console.log(`req for creating user`, username, email, password, user_img)
        await connectDatabase()
        await User.create({ username, email, password, user_img })
        return NextResponse.json({ "message": "Created user successfully" }, { status: 201 })
    }catch(error){
        return NextResponse.json({ "message": "Error occured while creating user" }, { status: 500 })
    }
}

export async function GET() {
    try{
        await connectDatabase()
        const users = await User.find({})
        return NextResponse.json({ users })
    }catch(error){
        return NextResponse.json({ "message": "Error occured while fetching users data" }, { status: 500 })
    }
}