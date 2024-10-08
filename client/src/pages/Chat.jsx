import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Chats from '../components/Chats';
import Welcome from '../components/Welcome';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { allUsersRoute,host } from '../utils/Apiroutes';
import MessageBox from '../components/MessageBox';
import {io} from "socket.io-client";


function Chat() {
  const socket=useRef();
  const navigate=useNavigate();
  const [chats,setChats]=useState([]);
  const [currentuser,setCurrentUser]=useState(undefined);
  const [currentchat,setCurrentChat]=useState(undefined);

  const changeChat=(chat)=>{
    setCurrentChat(chat);
  };

  useEffect(()=>{
    (async()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate("/login");
    }
    else{
      const userString=localStorage.getItem('chat-app-user');
      const user=await JSON.parse(userString);
      setCurrentUser(user);
    }
  })();
  },[])

  useEffect(()=>{
  (async()=>{
    if(currentuser){
     if(!currentuser.IsAvatarImageSet){
      navigate("/setavatar");
     }
     else{
      const {data}=await axios.get(`${allUsersRoute}/${currentuser._id}`);
      setChats(data);
     }};
  })();
  },[currentuser]);

  useEffect(()=>{
    if(currentuser){
      socket.current=io(host);
      socket.current.emit("add-user",currentuser._id)
    }
  },[currentuser])
  
  return (
    <>
      <ChatContainer>
      <div className="chat-container">
        <Chats 
        chats={chats}
        currentuser={currentuser}
        changeChat={changeChat}
        />
        {
          currentchat ? <MessageBox currentchat={currentchat} socket={socket}
          currentuser={currentuser}/> :
          <Welcome currentuser={currentuser} />
        }
      </div>  
      </ChatContainer>
    </>
  )
}


const ChatContainer=styled.div`
 display:flex;
 align-items: center;
 justify-content:center;
 width:100vw;
 height:100vh;
 background-color:black;
 .chat-container{
  display: grid;
  grid-template-columns:1fr 3fr;
  width:85%;
  height:85%;
  @media screen and (min-width:720px) and (max-width:1080px) {
      grid-template-columns:35% 65%;
    }
 }
`;


export default Chat;