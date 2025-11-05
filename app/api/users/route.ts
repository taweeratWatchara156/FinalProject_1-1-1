import { connectDatabase } from "@/database/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await connectDatabase()
        const users = await User.find({})
        return NextResponse.json({ users })
    }catch(error){
        console.error(error)
        return NextResponse.json({ "message": "Error occured while fetching users data" }, { status: 500 })
    }
}