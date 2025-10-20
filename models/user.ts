import mongoose, { Schema } from 'mongoose'

export interface IUser {
    _id: string,
    username: string,
    email:string,
    password: string,
    user_img: string,
    createdAt?: string,
    updatedAt?: string,
}

const userSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
        user_img: String,
    },
    {
        timestamps: true
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User