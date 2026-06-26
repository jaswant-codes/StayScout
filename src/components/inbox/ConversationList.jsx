import React from 'react';
import { Search } from 'lucide-react';

export default function ConversationList({ conversations, activeId, onSelect, searchQuery, onSearchChange }) {
  const getOtherParticipant = (conv) => {
    // In a real app, you'd filter out the current user's ID
    const otherId = Object.keys(conv.participantDetails || {})[0];
    return conv.participantDetails?.[otherId] || { name: 'Unknown User', online: false };
  };

  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full md:w-80 lg:w-96 flex flex-col border-r border-border bg-dark-900 h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold text-white mb-4">Inbox</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field w-full pl-10 bg-dark-800 border-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-text-muted text-sm">No conversations found.</div>
        ) : (
          conversations.map((conv) => {
            const otherUser = getOtherParticipant(conv);
            const isActive = activeId === conv.id;
            const unreadCount = conv.unreadCount?.['demo-student'] || 0; // hardcoded demo uid for now

            return (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`w-full text-left p-4 border-b border-border transition-colors flex gap-3 ${
                  isActive ? 'bg-dark-800' : 'hover:bg-dark-800/50'
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-text-secondary font-medium">
                    {otherUser.avatar ? (
                      <img src={otherUser.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      otherUser.name.charAt(0)
                    )}
                  </div>
                  {otherUser.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-dark-900 rounded-full"></span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-white font-medium truncate pr-2">{otherUser.name}</h3>
                    <span className="text-xs text-text-muted shrink-0">{formatTime(conv.lastMessageTime)}</span>
                  </div>
                  <p className={`text-sm truncate ${unreadCount > 0 ? 'text-white font-medium' : 'text-text-secondary'}`}>
                    {conv.lastMessage}
                  </p>
                </div>

                {/* Unread Badge */}
                {unreadCount > 0 && (
                  <div className="shrink-0 flex items-center justify-center">
                    <span className="bg-accent-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
