import React, { useState } from 'react';
import { Send, User, Shield } from 'lucide-react';

const TicketChatBox = ({ messages = [], onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage?.(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-dark-800 border border-border rounded-xl overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[500px]">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-text-muted text-sm">
            No messages yet. Start the conversation.
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isAdmin = msg.senderRole === 'admin';
            
            return (
              <div 
                key={msg.id || idx} 
                className={`flex gap-3 max-w-[85%] ${isAdmin ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  isAdmin ? 'bg-accent-500/20 text-accent-400' : 'bg-dark-600 text-text-secondary'
                }`}>
                  {isAdmin ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                
                <div className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-text-secondary">
                      {msg.senderName || (isAdmin ? 'Support Admin' : 'User')}
                    </span>
                    <span className="text-xs text-text-muted">
                      {msg.timestamp || 'Just now'}
                    </span>
                  </div>
                  
                  <div className={`p-3 rounded-2xl text-sm ${
                    isAdmin 
                      ? 'bg-accent-500 text-white rounded-tr-none' 
                      : 'bg-dark-700 text-text-primary rounded-tl-none border border-border'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-dark-900 border-t border-border">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a reply..."
            className="flex-1 bg-dark-800 border border-border text-white text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2.5 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketChatBox;
