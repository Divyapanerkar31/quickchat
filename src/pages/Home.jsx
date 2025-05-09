import React, { useEffect, useState } from 'react';
import '../css/Home.css'; // Make sure your CSS file is correctly linked
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  // Array of faint colors (lighter and with opacity)
  const colors = [
    'rgba(255, 182, 193, 0.7)',  // Light pink
    'rgba(173, 216, 230, 0.7)',  // Light blue
    'rgba(255, 228, 181, 0.7)',  // Light yellow
    'rgba(144, 238, 144, 0.7)',  // Light green
    'rgba(221, 160, 221, 0.7)'   // Light violet
  ];

  const [currentColor, setCurrentColor] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor(prevColor => {
        const currentIndex = colors.indexOf(prevColor);
        return colors[(currentIndex + 1) % colors.length];  // Rotate to the next color
      });
    }, 1000); // Change color every 1 second

    return () => clearInterval(interval); // Cleanup interval when the component unmounts
  }, []);

  return (
    <main className="container" style={{ backgroundColor: currentColor }}>
      <section className="glass-container">
         <img src="/3.png" width="200" style={{borderRadius:"12px"}}/>
        <h1 className="title" >Welcome to Quick Chat</h1>
        <p className="description">Chat freely without limitations.</p>
        <button className="continue-btn" onClick={() => { navigate("/login") }}>Start Chatting</button>
      </section>
    </main>
  );
}

export default Home;
