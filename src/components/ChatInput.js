import styled from "styled-components";
import Picker from 'emoji-picker-react';
import { useState } from "react";

const ChatInput = ({handleSendMsg}) => {

  const [showEmojiPicker, setShowEmojiPicker]= useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPickerHideShow=()=>{
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (event, emoji)=>{
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  }

  const sendChat = (e)=>{
    e.preventDefault();
    if(msg.length>0){
      handleSendMsg(msg);
    }
    setMsg('')
  }


  return ( 
    <Container>
      <div className="button-container" onClick={handleEmojiPickerHideShow}>
        :D
        <div className="emoji">
          {showEmojiPicker && <Picker onClick={handleEmojiClick}/>}
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input type="text" placeholder="type your message here" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
        <button className="submit">
          Send
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display:grid;
  grid-template-columns: 5% 95%;
  align-items:center;
  background-color: #080420;
  padding: 0rem 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container{
    display:flex;
    align-items:center;
    color:white;
    gap:1rem;
    cursor:pointer;
    .emoji{
      position:absolute;
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color #9186f3;
    }
  }
  .input-container{
    width:100%;
    border-radius:2rem;
    display:flex;
    align-items:center;
    background-color: #ffffff34;
    input{
      width:90%;
      background-color:transparent;
      color:white;
      border:none;
      padding-left:1rem;
      font-size:1.2rem;
      &::selection{
        background-color:#9186f3;
      }
      &::focus{
        ontline:none;
      }
    }
  button{
    padding: 0.3rem 2rem;
    border-radius:2rem;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: #9186f3;
    border:none;
  }
  }
`;

export default ChatInput;