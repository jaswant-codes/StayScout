import React from 'react';

export default function InboxLayout({ sidebar, chatArea, showSidebarOnMobile }) {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-dark-900 border-t border-border">
      {/* Sidebar - hidden on mobile when chat is open */}
      <div 
        className={`${
          showSidebarOnMobile ? 'flex' : 'hidden md:flex'
        } shrink-0 w-full md:w-80 lg:w-96 h-full`}
      >
        {sidebar}
      </div>

      {/* Chat Area - hidden on mobile when sidebar is open */}
      <div 
        className={`${
          !showSidebarOnMobile ? 'flex' : 'hidden md:flex'
        } flex-1 h-full min-w-0`}
      >
        {chatArea}
      </div>
    </div>
  );
}
