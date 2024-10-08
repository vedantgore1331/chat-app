import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/images/speak.png'

const Chats = ({chats,currentuser,changeChat}) => {
  const [currentuserName,setCurrentUserName]=useState(undefined);
  const [currentuserImage,setCurrentUserImage]=useState(undefined);
  const [selectedChat,setSelectedChat]=useState(undefined);

  useEffect(()=>{
    if(currentuser){
      setCurrentUserImage(currentuser.AvatarImage);
      setCurrentUserName(currentuser.username);
    }
  },[currentuser])

  return (
    <>
    <Container>
    <div className="brand">
    <img src={logo} alt="logo"/>
     <h3>CHAT-APP</h3>
    </div>
    <div className="chats">
     {
      chats.map((chat,index)=>{
        return (
        <div className={`chat ${index===selectedChat ? "selected" : ""}`} key={index}
        onClick={()=>{
          setSelectedChat(index);
          changeChat(chat);
        }}>
          <div className="avatar">
          <img src={`data:image/svg+xml;base64,${chat.AvatarImage}`} alt="avatar"></img>
          </div>
          <div className="username">
            <h3>{chat.username}</h3>
          </div>
        </div>
        )
      })
     }
    </div>
    <div className="user">
    <div className="avatar">
          <img src={`data:image/svg+xml;base64,${currentuserImage}`} alt="avatar"></img>
          </div>
          <div className="username">
            <h3>{currentuserName}</h3>
          </div>  
    </div>
    </Container>
    </>
  )
}

const Container=styled.div`
display:grid;
grid-template-rows: 10% 77% 13%;
overflow: hidden;
background-color:black;
.brand{
  display: flex;
  align-items: center;
  justify-content: center;
  gap:0.5rem;
  img {
    width:3.5rem;
  }
  h3{
    color:white;
    font-size:1.5rem;
  }
}
.chats{
  display: flex;
  flex-direction: column;
  overflow:auto;
  gap:0.8rem;
  &::-webkit-scrollbar{
    width:0.2rem;
    &-thumb{
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .chat{
    display: flex;
    cursor: pointer;
    width: 90%;
    border-radius: 0.2rem;
    padding: 0.4rem ;
    gap:1rem;
    align-items: center;
    background-color:#ffffff39;
    .avatar{
      img{
        height:3rem;
      }
    }
    .username{
      h3{
        color:white
      }
    }
  }
  .selected{
      background-color:orange;
    }
}
.user{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .avatar{
    img{
      height: 4rem;
      max-inline-size:100%;
    }
  }
  .username{
    h3{
      color:white;
      font-size:1.3rem;
    }
  }
}
`

export default Chats;