import React, { useState, useEffect, useRef } from 'react';
import { Send, User, ChevronDown } from 'lucide-react';
import { useApp } from '../i18n';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

interface ChatSystemProps {
  onClose: () => void;
}

export function ChatSystem({ onClose }: ChatSystemProps) {
  const { userRole } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'system',
      text: 'Secure connection established.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const automatedResponsesForPatient = [
    "I'm on my way, are you in a safe location?",
    "I see your location on the map. ETA is 2 mins.",
    "Please try to stay calm and follow the first aid guide on your screen."
  ];

  const automatedResponsesForResponder = [
    "I am near the main entrance.",
    "Yes, I am safe for now.",
    "Thank you, I am waiting."
  ];

  const [responseIndex, setResponseIndex] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate other person typing and sending after 2 seconds
    setTimeout(() => {
      const responses = userRole === 'patient' ? automatedResponsesForPatient : automatedResponsesForResponder;
      const replyText = responses[responseIndex % responses.length];
      
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'other',
        text: replyText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, replyMsg]);
      setIsTyping(false);
      setResponseIndex(prev => prev + 1);
    }, 2000);
  };

  return (
    <div className="animate-slide-up" style={styles.container}>
      <header style={styles.header}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={styles.avatar}>
            <User size={16} color="var(--text-main)" />
          </div>
          <div>
            <h3 style={{margin: 0, fontSize: '1rem'}}>
              {userRole === 'patient' ? 'Responder (Dr. Amina A.)' : 'Patient'}
            </h3>
            <p style={{margin: 0, fontSize: '0.75rem', color: 'var(--success)'}}>Connected</p>
          </div>
        </div>
        <button style={styles.iconBtn} onClick={onClose}>
          <ChevronDown size={24} />
        </button>
      </header>

      <div style={styles.messageList}>
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            style={{
              ...styles.messageWrapper,
              justifyContent: msg.senderId === 'system' ? 'center' : msg.senderId === 'me' ? 'flex-end' : 'flex-start'
            }}
          >
            {msg.senderId === 'system' ? (
              <div style={styles.systemMessage}>{msg.text}</div>
            ) : (
              <div style={{
                ...styles.bubble,
                background: msg.senderId === 'me' ? 'var(--secondary)' : 'var(--bg-glass)',
                color: msg.senderId === 'me' ? '#fff' : 'var(--text-main)',
                borderBottomRightRadius: msg.senderId === 'me' ? '4px' : 'var(--radius-lg)',
                borderBottomLeftRadius: msg.senderId === 'other' ? '4px' : 'var(--radius-lg)',
              }}>
                {msg.text}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div style={{...styles.messageWrapper, justifyContent: 'flex-start'}}>
            <div style={{...styles.bubble, background: 'var(--bg-glass)'}}>
              <div style={styles.typingIndicator}>
                <span style={{...styles.dot, animationDelay: '0s'}}></span>
                <span style={{...styles.dot, animationDelay: '0.2s'}}></span>
                <span style={{...styles.dot, animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={styles.inputArea}>
        <input 
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          type="submit" 
          style={{...styles.sendBtn, background: input.trim() ? 'var(--secondary)' : 'var(--bg-glass)'}}
          disabled={!input.trim()}
        >
          <Send size={20} color={input.trim() ? '#fff' : 'var(--text-muted)'} />
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    background: 'var(--bg-main)',
    borderTop: '1px solid var(--border)',
    borderTopLeftRadius: 'var(--radius-lg)',
    borderTopRightRadius: 'var(--radius-lg)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
    zIndex: 100,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg-panel)',
    borderTopLeftRadius: 'var(--radius-lg)',
    borderTopRightRadius: 'var(--radius-lg)',
  },
  avatar: {
    width: '32px', height: '32px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  iconBtn: {
    background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: 0
  },
  messageList: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  messageWrapper: {
    display: 'flex',
    width: '100%',
  },
  systemMessage: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    background: 'rgba(255,255,255,0.05)',
    padding: '4px 12px',
    borderRadius: 'var(--radius-full)',
  },
  bubble: {
    padding: '12px 16px',
    borderRadius: 'var(--radius-lg)',
    maxWidth: '80%',
    fontSize: '0.95rem',
    lineHeight: '1.4',
  },
  inputArea: {
    padding: '16px',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    gap: '12px',
    background: 'var(--bg-panel)',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: 'var(--radius-full)',
    border: '1px solid var(--border)',
    background: 'var(--bg-main)',
    color: 'var(--text-main)',
    outline: 'none',
    fontFamily: 'inherit',
  },
  sendBtn: {
    width: '48px', height: '48px',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: 'none',
    cursor: 'pointer',
    transition: 'var(--transition)'
  },
  typingIndicator: {
    display: 'flex', gap: '4px', padding: '4px 0'
  },
  dot: {
    width: '6px', height: '6px',
    borderRadius: '50%',
    background: 'var(--text-muted)',
    animation: 'type 1s infinite alternate'
  }
};

// Add typing keyframes
const styleSheet = document.createElement('style');
styleSheet.innerText = `
  @keyframes type {
    0% { transform: translateY(0); opacity: 0.5; }
    100% { transform: translateY(-4px); opacity: 1; }
  }
`;
document.head.appendChild(styleSheet);
