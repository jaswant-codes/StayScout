import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

export default function MessageBubble({ message, isOwn }) {
  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex w-full ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-[75%] md:max-w-[65%] rounded-2xl px-4 py-2 relative group ${
          isOwn 
            ? 'bg-accent-500 text-white rounded-tr-sm' 
            : 'bg-dark-700 text-white rounded-tl-sm'
        }`}
      >
        {/* Attachments (if any) */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mb-2 space-y-2">
            {message.attachments.map((url, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-white/10">
                <img src={url} alt="Attachment" className="max-w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Text content */}
        {message.text && (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
        )}

        {/* Footer info (time and status) */}
        <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isOwn ? 'text-white/80' : 'text-white/50'}`}>
          <span>{formatTime(message.timestamp)}</span>
          {isOwn && (
            <span>
              {message.status === 'seen' ? (
                <CheckCheck size={14} className="text-white" />
              ) : message.status === 'delivered' ? (
                <CheckCheck size={14} className="opacity-70" />
              ) : (
                <Check size={14} className="opacity-70" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
