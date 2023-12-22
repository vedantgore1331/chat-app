import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        // required:true,
        required:false,
        min:3,
    },
    profilePic:{
        type:String,
    },
    IsAvatarImageSet:{
        type:Boolean,
        default:false
    },
    AvatarImage:{
        type:String,
        default:""
    }
});

export const Users=new mongoose.model('users',userSchema);