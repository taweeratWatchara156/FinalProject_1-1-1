import mongoose from 'mongoose'

export const connectDatabase = async () => {
    try{
        const URI = process.env.MONGO_URI
        if(!URI) return console.error("Invalid URI")

        await mongoose.connect(URI)
    }catch(error){
        console.error(`Error occured while connecting to database:`, error)
    }
}