import mongoose from 'mongoose'
import '@/models/user'
import '@/models/post'

export const connectDatabase = async () => {
    try{
        if(!process.env.MONGO_URI) return console.error("Invalid URI")

        await mongoose.connect(process.env.MONGO_URI)
    }catch(error){
        console.error(`Error occured while connecting to database:`, error)
    }
}