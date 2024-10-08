import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';
import { getAllMessagesRoute, sendMessagesRoute } from '../utils/Apiroutes';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

function MessageBox({ currentchat, currentuser,socket}) {
  const [messages, setmessages] = useState([]);
  const [ArrivalMsg,setArrivalMsg]=useState(null);
  const scrollRef=useRef();
  useEffect(() => {
    (async () => {
      if(currentchat){
      const res = await axios.post(getAllMessagesRoute, {
        from: currentuser._id,
        to: currentchat._id
      })
      setmessages(res.data);
    }
    })();
  }, [currentchat]);

  const handleSentmsg = async (msg) => {
    await axios.post(sendMessagesRoute, {
      from: currentuser._id,
      to: currentchat._id,
      message: msg
    });
    
    socket.current.emit("send-msg",{
      to:currentchat._id,
      from:currentuser._id,
      message:msg,
    })

    const msgs=[...messages];
    msgs.push({fromself:true,message:msg});
    setmessages(msgs);
  }

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
        setArrivalMsg({fromself:false,message:msg});
      })
    }
  },[]);

  useEffect(()=>{
    ArrivalMsg && setmessages((prev)=>[...prev,ArrivalMsg]);
  },[ArrivalMsg]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour: "smooth"});
  },)

  return (
    <>
      {currentchat &&
        <Container>
          <div className="header">
            <div className="userdetails">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentchat.AvatarImage}`} alt="" />
              </div>
              <div className="username">
                <h3>{currentchat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {
              messages.map((msg) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
                  <div className={`msg ${msg.fromself ? 'sended' : 'recieved'}`} 
                  style={{color:"white"}}>
                    <div className="content">
                      {msg.message}
                    </div>
                  </div>
                </div>
                )
              })
            }
          </div>
          <ChatInput handleSentmsg={handleSentmsg} />
        </Container>
      }
    </>
  )
}

const Container = styled.div`
padding-top:1rem;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
.header{
  display: flex;
  justify-content:space-between;
  align-items:center;
  padding: 0 2rem;
  .userdetails{
    display:flex;
    align-items:center;
    gap: 1rem;
  .avatar{
    img{
      height: 3rem;
    }
  }
  .username{
    h3{
      color: white;
    }
  }
}
}

.chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .msg {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
}
`
export default MessageBox;