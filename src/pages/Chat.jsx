import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../hooks/useChat';
import ChatMessage from '../components/ChatMessage';
import Loader from '../components/Loader';
import { Send, MessageCircle, Users } from 'lucide-react';

export default function Chat() {
  const { user, userProfile } = useAuth();
  const { messages, loading, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      await sendMessage(user.uid, userProfile.name, newMessage);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-accent-500/15 flex items-center justify-center">
            <MessageCircle size={22} className="text-accent-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Community Chat</h1>
            <p className="text-xs text-text-muted flex items-center gap-1">
              <Users size={11} />
              Student-only real-time chat
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-text-muted">Live</span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="glass-strong rounded-3xl overflow-hidden flex flex-col shadow-2xl relative z-10" style={{ height: 'calc(100vh - 220px)' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {loading ? (
            <Loader text="Loading messages..." />
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle size={32} className="text-text-muted mx-auto mb-3" />
                <p className="text-sm text-text-muted">
                  No messages yet. Start the conversation! 🎉
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  isOwn={msg.userId === user?.uid}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <div className="p-4 bg-dark-800/80 backdrop-blur-md border-t border-border mt-auto">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="input-field flex-1 rounded-full px-6 bg-dark-700/80 focus:bg-dark-600 transition-colors"
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className="btn-primary rounded-full aspect-square w-12 h-12 p-0 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-500/20"
            >
              <Send size={18} className="translate-x-[1px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
