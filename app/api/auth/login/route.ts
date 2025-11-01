import { connectDatabase } from "@/database/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req:NextRequest) {
    try{
        await connectDatabase()
        const { username, password } = await req.json()
        console.log(username, password)
        const user = await User.findOne({ username })
        if (!user){
            return NextResponse.json({ message: "Invalid username or password" },{ status: 401 })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return NextResponse.json({ message: "Invalid username or password" },{ status: 401 });
        }

        const tokenPayload = {
            id: user._id,
            email: user.email,
            username: user.username
        };

        const token = jwt.sign(
            tokenPayload,
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        return NextResponse.json({message: "Login successful",token: token }, { status: 200 });
    }catch(error){
        console.error(error)
        return NextResponse.json({ "message": "Error occured while logging in" }, { status: 500 })
    }
}