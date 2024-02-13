import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';

import {io} from 'socket.io-client';


const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat]= useState(undefined);

  //Watching localstorage to set self-User
  useEffect(()=>{
    const settingthing1=async()=>{
      if (!localStorage.getItem('chat-app-user')){
        navigate('/login');
      }else{
        setCurrentUser( await JSON.parse(localStorage.getItem('chat-app-user')));
      }
    } 
    settingthing1()
  },[]);

  //Emitting event 'add user' and sending currentUser._id
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  },[currentUser]);

  //verifying current user exist and avatar is set
  //using URL of server to get the data of other users and storing it in a varible
  useEffect(()=>{
    const settingthing = async()=>{
      if(currentUser) {
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else{
          navigate('/setAvatar');
        }
      }
    }
    settingthing();
  },[currentUser])

  //getting the data of the clicked values
  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }

  return ( 
    <Container>
      <div className='container'>

        {currentUser===undefined ? 
          (<h2>Loading...</h2>):(
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        )}

        {currentChat ===undefined?(
          currentUser===undefined ? 
            (<h2>Loading...</h2>):(
            <Welcome currentUser={currentUser}/>
          )
        ):(currentUser===undefined ?(
          <h2>Loading...</h2>):(
          <ChatContainer 
            currentChat={currentChat} 
            currentUser={currentUser} 
            socket={socket}
          />
          )
        )}
        
      
      </div>
    </Container>
  );
}

const Container = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction: column;
  justify-content: center;
  gap:1rem;
  align-items:center;
  background-color: #131324;
  .container{
    height:85vh;
    width:85vw;
    background-color: #00000076;
    display:grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;