import { model } from 'mongoose';
import { Messages } from '../model/messageModel.js';

export const addMessage=async(req,res,next)=>{
    try {
        const {from,to,message}=req.body;
        const data=await Messages.create({
            message:{text:message},
            users:[from,to],
            sender:from
        });
        if(data){
            return res.json({msg:"Message added successfuly"});
        }
        return res.json({msg:"failed to add message to database"});
    } catch (error) {
        next(error);
    }
}

export const getMessages=async(req,res,next)=>{
    try {
        const {from,to}=req.body;
        const data=await Messages.find({users:{$all:[from,to]}}).sort({updatedAt:1});
        const projectMessages=data.map((msg)=>{
            return {
                fromself:msg.sender.toString()===from,
                message:msg.message.text
            }
        })
        res.json(projectMessages);
    } catch (error) {
        console.log(error);
    }
}