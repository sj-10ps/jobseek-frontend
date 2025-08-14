import React, { useEffect, useRef, useState } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import socket from './socket';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage } from '../redux/Fetchmessages';
import { animate } from 'framer-motion';

const Messagingarea = ({ name, receiverid }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const dispatch = useDispatch();
  const currentUserId = localStorage.getItem('logid');
  const scrollviewref=useRef(null)

  useEffect(()=>{
   scrollviewref.current.scrollIntoView({behavior:'auto'})
  },[messages])
 
   useEffect(()=>{
    if(currentUserId){
        socket.emit("register",currentUserId)
    }

   socket.on("receive_message", (data) => {     
   

  if (
   data.receiverId === currentUserId
  ) {
   
    setMessages((prev) => [...prev, data]);
  }
});


    return ()=>{
        socket.off("receive_message")
    }
   },[receiverid,currentUserId])




  useEffect(() => {
    const loadMessages = async () => {  
      const response = await dispatch(fetchMessages({ senderId: currentUserId, receiverId: receiverid }));
      if (response.payload) {
        setMessages(response.payload.data); 
      }
    };

    loadMessages();
  }, [dispatch, receiverid]);



  // 📨 Send new message
  const handleSend = async () => {
  

    const messageData = {
      senderId: currentUserId,
      receiverId: receiverid,
      text: newMessage,
    };

    // Save message to DB
    
    socket.emit("send_message",messageData)
    await  dispatch(sendMessage(messageData));


    

    // Show immediately
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');
  };

  return (
    <Card style={{ height: '100%', border: 'none' }}>
      <Card.Header className="bg-primary text-white">
        <strong>{name}</strong>
      </Card.Header>

      <Card.Body style={{ height: '400px', overflowY: 'auto', background: '#f9f9f9' }}>
        {messages.map((msg, index) => {
          const isMine = msg.senderId === currentUserId;
          return (
            <div
              key={index}
              className={`mb-2 d-flex ${isMine ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div
                className={`p-2 rounded ${isMine ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                style={{ maxWidth: '70%' }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={scrollviewref}></div>
      </Card.Body>

      <Card.Footer>
        <InputGroup>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button variant="primary"  onClick={handleSend}>
            Send
          </Button>
        </InputGroup>
      </Card.Footer>
    </Card>
  );
};

export default Messagingarea;
