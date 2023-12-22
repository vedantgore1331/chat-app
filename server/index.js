import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { Server } from "socket.io";
import { createServer } from "http";

const app=express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api/auth',userRoutes)
app.use('/api/messages',messageRoutes)


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("DataBase Connection Succesful");
})

// const server=app.listen(process.env.PORT,()=>{
//     console.log('Server started on Port '+process.env.PORT);
// })

const io = new Server(httpServer, { 
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
});

global.onlineUsers=new Map();

io.on("connection", (socket) => {
   global.chatSocket=socket;
   socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket.id)
   })

   socket.on("send-msg",(data)=>{
    const sendUserSocket=onlineUsers.get(data.to);
    if(sendUserSocket){
        socket.to(sendUserSocket).emit("msg-recieve",data.message);
    }
   })
});

httpServer.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`);
});