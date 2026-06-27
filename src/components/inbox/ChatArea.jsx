import React, { useRef, useEffect } from 'react';
import { ArrowLeft, MoreVertical, Phone } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import Loader from '../Loader';
import { useAuth } from '../../hooks/useAuth';

export default function ChatArea({ conversation, messages, loading, onSendMessage, onBack }) {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-dark-900 h-full">
        <div className="w-24 h-24 rounded-full bg-dark-800 flex items-center justify-center mb-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-muted">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Your Messages</h3>
        <p className="text-text-secondary text-sm max-w-md text-center">
          Select a conversation from the sidebar to view chat history and reply.
        </p>
      </div>
    );
  }

  // Get other participant's details
  const otherId = Object.keys(conversation.participantDetails || {})[0];
  const otherUser = conversation.participantDetails?.[otherId] || { name: 'Unknown User', online: false };
  const currentUserId = user?.uid || 'demo-student'; // fallback for demo

  return (
    <div className="flex-1 flex flex-col bg-dark-900 h-full relative z-10">
      {/* Chat Header */}
      <div className="h-16 px-4 border-b border-border bg-dark-900 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="md:hidden p-2 -ml-2 text-text-secondary hover:text-white rounded-full hover:bg-dark-800"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-white">
              {otherUser.avatar ? (
                <img src={otherUser.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
              ) : (
                otherUser.name.charAt(0)
              )}
            </div>
            {otherUser.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-dark-900 rounded-full"></span>
            )}
          </div>
          
          <div>
            <h2 className="text-white font-medium leading-tight">{otherUser.name}</h2>
            <p className="text-xs text-text-muted">
              {otherUser.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-text-secondary hover:text-white rounded-full hover:bg-dark-800 transition-colors">
            <Phone size={18} />
          </button>
          <button className="p-2 text-text-secondary hover:text-white rounded-full hover:bg-dark-800 transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-dark-900/50">
        {loading ? (
          <Loader text="Loading messages..." />
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-text-muted text-sm">
            Say hello to start the conversation.
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Simple date divider demo */}
            <div className="flex justify-center mb-6 mt-2">
              <span className="bg-dark-800 text-text-secondary text-xs px-3 py-1 rounded-full border border-border">
                Today
              </span>
            </div>

            {messages.map((msg) => (
              <MessageBubble 
                key={msg.id} 
                message={msg} 
                isOwn={msg.senderId === currentUserId} 
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={onSendMessage} disabled={loading} />
    </div>
  );
}
