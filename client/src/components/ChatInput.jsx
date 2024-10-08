import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import send from '../assets/images/send.png';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

function ChatInput({handleSentmsg}) {
  const [showPicker, setShowPicker] = useState(false);
  const [msg, setmsg] = useState("");
  const pickerRef = useRef(null);

  const handleEmojiClick = (event, emoji) => {
    let message = msg + emoji.emoji;
    setmsg(message);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    }
      document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, []);

  const sendChat=(event)=>{
    event.preventDefault();
    if(msg.length>0)
    {
      handleSentmsg(msg);
      setmsg('');
    }
  }

  return (
    <>
      <Container>
        <div className="buttoncontainer">
          <div className="emoji" ref={pickerRef}>
            <BsEmojiSmileFill onMouseEnter={() =>setShowPicker(true) } onClick={()=>setShowPicker(!showPicker)}/>
            {showPicker && <Picker onEmojiClick={handleEmojiClick}
              preload={true} disableSearchBar={true} emojiStyle="apple"
            />}
          </div>
        </div>
        <form action="" className="input-container" onSubmit={(event)=>sendChat(event)}>
          <input type="text" spellCheck={false} placeholder='Type your message here' value={msg}
            onChange={(e) => setmsg(e.target.value)}
            autoFocus={true} onBlur={({ target }) => target.focus()}
          />
          <button type="submit" className='submit'><IoMdSend /></button>
        </form>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  /* background-color: #080420; */
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .buttoncontainer {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.7rem;
        color: #ffff00;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #181818;
        box-shadow: 0 4px 10px #ffffff39;
        border-color: #ffffff39;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: transparent;
          width: 5px;
          &-thumb {
            background-color: #ffffff39;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #181818;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      /* height: 65%; */
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.3rem;

      &::selection {
        background-color: #ffffffc8;
        color:black;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1.6rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #eb2632c8;
      border: none;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.7rem;
        color: white;
      }
    }
  }
`;
export default ChatInput