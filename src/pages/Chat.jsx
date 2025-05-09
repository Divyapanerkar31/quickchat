import React, { useEffect, useRef, useState } from 'react';
import { db, auth } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import '../css/Chat.css';

function Chat() {
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [bgColor, setBgColor] = useState('rgba(35, 86, 225, 0.3)'); // Initial background color
  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Change background color every 5 seconds
  useEffect(() => {
    const colors = [
      'rgba(35, 86, 225, 0.3)',
      'rgba(255, 85, 85, 0.3)',
      'rgba(34, 193, 195, 0.3)',
      'rgba(253, 187, 45, 0.3)',
    ];
    
    const intervalId = setInterval(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(randomColor); // Set random background color
    }, 5000); // Change every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      const messageRef = collection(db, 'chats', 'room1', 'messages');
      await addDoc(messageRef, {
        sender: user.uid,
        message: newMessage.trim(),
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Fetch users
  useEffect(() => {
    const userCollection = collection(db, 'users');
    const unsubscribe = onSnapshot(userCollection, (snapshot) => {
      const userList = snapshot.docs.map((doc) => doc.data());
      setUsers(userList);
    });
    return () => unsubscribe();
  }, []);

  // Fetch messages
  useEffect(() => {
    const msgRef = collection(db, 'chats', 'room1', 'messages');
    const q = query(msgRef, orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chat-phone-frame" style={{ background: bgColor }}>
      <div className="chat-container">
        <h1 className="chat-header">
          <i className="fas fa-phone phone-icon"></i> Your personal chat Room
        </h1>

        <div className="chats">
          {messages.length === 0 ? (
            <p>No message available</p>
          ) : (
            messages.map((msg, index) => {
              const sender = users.find((u) => u.uid.trim() === msg.sender.trim());
              const senderName = sender ? sender.name : 'Unknown';
              return (
                <div
                  key={index}
                  style={{ textAlign: user.uid === msg.sender ? 'right' : 'left' }}
                >
                  <strong>{senderName}: </strong>
                  {msg.message}
                </div>
              );
            })
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage}>
          <input
            placeholder="Enter your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
