import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';

export default function ChatInput({ onSendMessage, disabled }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    
    onSendMessage(text);
    setText('');
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-dark-900 border-t border-border">
      <form 
        onSubmit={handleSubmit}
        className="flex items-end gap-2 bg-dark-800 rounded-2xl p-2 border border-border focus-within:border-accent-500/50 transition-colors"
      >
        <button 
          type="button" 
          disabled={disabled}
          className="p-2 text-text-muted hover:text-white transition-colors rounded-full hover:bg-dark-700 shrink-0"
        >
          <Paperclip size={20} />
        </button>
        
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-white placeholder-text-muted resize-none max-h-[120px] py-2 px-2 outline-none text-sm"
          rows={1}
        />

        <button 
          type="button" 
          disabled={disabled}
          className="p-2 text-text-muted hover:text-white transition-colors rounded-full hover:bg-dark-700 shrink-0 hidden sm:block"
        >
          <Smile size={20} />
        </button>

        <button 
          type="submit" 
          disabled={disabled || !text.trim()}
          className="btn-primary rounded-full p-2 h-10 w-10 flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ml-1"
        >
          <Send size={18} className="translate-x-[1px]" />
        </button>
      </form>
    </div>
  );
}
