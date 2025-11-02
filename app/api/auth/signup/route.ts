import { connectDatabase } from "@/database/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req:NextRequest) {
    try{
        await connectDatabase()
        const { username, email, password } = await req.json()
        const user_img = "/default_profile.jpg"

        const existed_email = await User.findOne({ email })
        if (existed_email){
            return NextResponse.json({ "message": "Email already exists" }, { status: 400 })
        }

        const existed_username = await User.findOne({ username })
        if (existed_username){
            return NextResponse.json({ "message": "Username already exists" }, { status: 400 })
        }

        const encoded_password = await bcrypt.hash(password, 10)
        await User.create({ username, email, password:encoded_password, user_img })
        return NextResponse.json({ "message": "Created user successfully" }, { status: 201 })
    }catch(error){
        return NextResponse.json({ "message": "Error occured while creating user" }, { status: 500 })
    }
}