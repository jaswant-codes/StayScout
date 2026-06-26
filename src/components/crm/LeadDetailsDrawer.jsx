import React, { useState } from 'react';
import FollowUpPanel from './FollowUpPanel';
import CommunicationHistory from './CommunicationHistory';

export default function LeadDetailsDrawer({ lead, onClose, addNoteToLead }) {
  const [activeTab, setActiveTab] = useState('followup');

  if (!lead) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-dark-800 border-l border-border z-50 shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-dark-900/50">
          <h2 className="text-xl font-bold text-white">Lead Details</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark-700 text-muted hover:text-white transition-colors"
            aria-label="Close drawer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Profile Section */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center text-2xl font-bold uppercase border border-accent-500/30 shadow-[0_0_15px_rgba(var(--color-accent-500),0.2)]">
                {lead.name ? lead.name.charAt(0) : '?'}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="text-xl font-semibold text-white truncate">{lead.name || 'Unknown Lead'}</h3>
                <p className="text-sm text-secondary truncate">{lead.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-dark-700/50 p-3 rounded-xl border border-border">
                <span className="text-xs text-muted block mb-1 uppercase tracking-wider">Score</span>
                <span className="text-white font-semibold text-lg">{lead.score || 'N/A'}</span>
              </div>
              <div className="bg-dark-700/50 p-3 rounded-xl border border-border">
                <span className="text-xs text-muted block mb-1 uppercase tracking-wider">Budget Match</span>
                <span className="text-white font-semibold text-lg">{lead.budgetMatch || 'N/A'}</span>
              </div>
              <div className="bg-dark-700/50 p-3 rounded-xl border border-border col-span-2 flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted block mb-1 uppercase tracking-wider">Property Interested In</span>
                  <span className="text-white font-medium block truncate">{lead.propertyInterested || 'Not Specified'}</span>
                </div>
                {lead.propertyInterested && (
                  <div className="w-8 h-8 rounded-full bg-dark-600 flex items-center justify-center text-muted shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border bg-dark-900/30">
            <button
              className={`flex-1 py-4 text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'followup' 
                  ? 'border-accent-500 text-accent-400 bg-dark-800' 
                  : 'border-transparent text-muted hover:text-white hover:bg-dark-800'
              }`}
              onClick={() => setActiveTab('followup')}
            >
              Follow Up
            </button>
            <button
              className={`flex-1 py-4 text-sm font-semibold transition-all border-b-2 ${
                activeTab === 'history' 
                  ? 'border-accent-500 text-accent-400 bg-dark-800' 
                  : 'border-transparent text-muted hover:text-white hover:bg-dark-800'
              }`}
              onClick={() => setActiveTab('history')}
            >
              History
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'followup' ? (
              <FollowUpPanel lead={lead} addNoteToLead={addNoteToLead} />
            ) : (
              <CommunicationHistory lead={lead} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
