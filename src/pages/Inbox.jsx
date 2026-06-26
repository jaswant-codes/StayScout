import React, { useState } from 'react';
import { useInbox } from '../hooks/useInbox';
import { useConversation } from '../hooks/useConversation';
import InboxLayout from '../components/inbox/InboxLayout';
import ConversationList from '../components/inbox/ConversationList';
import ChatArea from '../components/inbox/ChatArea';

export default function Inbox() {
  const [activeConvId, setActiveConvId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom hooks handling the data fetching & mock data fallback
  const { conversations, loading: inboxLoading } = useInbox();
  const { messages, loading: chatLoading, sendMessage } = useConversation(activeConvId);

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    const otherId = Object.keys(conv.participantDetails || {})[0];
    const otherName = conv.participantDetails?.[otherId]?.name || '';
    return otherName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const activeConversation = conversations.find(c => c.id === activeConvId);

  // Layout components
  const sidebar = (
    <ConversationList 
      conversations={filteredConversations}
      activeId={activeConvId}
      onSelect={(id) => setActiveConvId(id)}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );

  const chatArea = (
    <ChatArea 
      conversation={activeConversation}
      messages={messages}
      loading={chatLoading}
      onSendMessage={sendMessage}
      onBack={() => setActiveConvId(null)}
    />
  );

  return (
    <InboxLayout 
      sidebar={sidebar}
      chatArea={chatArea}
      showSidebarOnMobile={!activeConvId}
    />
  );
}
