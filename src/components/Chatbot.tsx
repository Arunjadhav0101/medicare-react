import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener('openChatbot', handleOpenChatbot);
    return () => window.removeEventListener('openChatbot', handleOpenChatbot);
  }, []);

  useEffect(() => {
    // Initial welcome message
    if (messages.length === 0) {
      setMessages([{
        id: 1,
        text: "Hello! I'm your MediCare assistant. I can help you with medicine orders, blood bank queries, and general health information. How can I assist you today?",
        isBot: true,
        timestamp: new Date()
      }]);
    }
  }, [messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('paracetamol') || input.includes('fever') || input.includes('headache')) {
      return "I found Paracetamol - ₹25 per strip. It's great for fever and headache relief. Would you like me to add it to your cart? How many strips do you need?";
    }
    
    if (input.includes('blood') && input.includes('donate')) {
      return "That's wonderful! Blood donation saves lives. I can help you register as a donor. You'll need to be 18-65 years old, weigh at least 50kg, and be in good health. Would you like to proceed with donor registration?";
    }
    
    if (input.includes('blood') && (input.includes('need') || input.includes('request'))) {
      return "I can help you request blood. Please provide: 1) Blood group needed 2) Number of units 3) Hospital name 4) Urgency level. This will help us process your request quickly.";
    }
    
    if (input.includes('order') || input.includes('medicine')) {
      return "I can help you order medicines! You can browse our catalog or tell me what specific medicine you need. I can also help with prescription uploads and delivery tracking.";
    }
    
    if (input.includes('price') || input.includes('cost')) {
      return "Our medicine prices are competitive and transparent. You can check individual medicine prices in our catalog. We also offer discounts on bulk orders and have special rates for senior citizens.";
    }
    
    if (input.includes('delivery') || input.includes('shipping')) {
      return "We offer fast delivery within 24-48 hours in most areas. Express delivery is available for urgent medicines. Delivery is free for orders above ₹500. Would you like to check delivery options for your area?";
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! Welcome to MediCare. I'm here to help you with medicine orders, blood bank services, and health queries. What can I assist you with today?";
    }
    
    return "I understand you're looking for help. I can assist with: 🏥 Medicine ordering, 🩸 Blood bank services, 📋 Order tracking, 💊 Medicine information, and 🚚 Delivery details. Please let me know what you need!";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <span className="chatbot-icon">🤖</span>
            MediCare Assistant
          </div>
          <button 
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>
        
        <div className="chatbot-messages">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.isBot ? 'bot' : 'user'}`}
            >
              <div className="message-content">
                {message.text}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-content typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chatbot-input">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>
    </>
  );
};

export default Chatbot;
