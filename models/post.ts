import mongoose, { Schema } from "mongoose"
import User, { IUser } from "./user"

export interface IPost extends Document{
    _id: string
    title:string
    description: string
    owner: IUser['_id']
    sheets: string[]
    views: number
    likes: IUser['_id'][]
    grade: string
    category: string
    createdAt?: string
    updatedAt? :string
}

const postSchema = new Schema(
    {
        title: String,
        description: String,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        sheets : [
            {
                type:String
            }
        ],
        views: {
            type:Number,
            default: 0
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        grade: String,
        category: String
    },
    {
        timestamps: true
    }
)

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", postSchema)
export default Post