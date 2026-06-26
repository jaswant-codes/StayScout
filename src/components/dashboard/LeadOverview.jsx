import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'contacted': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case 'interested': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case 'visit': return 'bg-green-500/10 text-green-400 border-green-500/20';
    default: return 'bg-dark-600 text-text-muted border-border';
  }
};

const getContactIcon = (method) => {
  switch (method?.toLowerCase()) {
    case 'phone': return <Phone size={14} className="mr-2" />;
    case 'email': return <Mail size={14} className="mr-2" />;
    case 'chat': return <MessageSquare size={14} className="mr-2" />;
    default: return null;
  }
};

const LeadOverview = ({ leads = [] }) => {
  if (!leads.length) {
    return (
      <div className="card p-8 text-center text-text-muted">
        No recent leads.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-dark-800">
      <table className="w-full text-left text-sm text-text-secondary">
        <thead className="bg-dark-700/50 text-xs uppercase text-text-muted border-b border-border">
          <tr>
            <th className="px-6 py-4 font-medium">Student Name</th>
            <th className="px-6 py-4 font-medium">Property</th>
            <th className="px-6 py-4 font-medium">Date</th>
            <th className="px-6 py-4 font-medium">Contact Method</th>
            <th className="px-6 py-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-dark-700/30 transition-colors">
              <td className="px-6 py-4 font-medium text-text-primary">
                {lead.studentName || 'Unknown Student'}
              </td>
              <td className="px-6 py-4 line-clamp-1">
                {lead.propertyName || 'Unknown Property'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(lead.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center capitalize">
                  {getContactIcon(lead.contactMethod)}
                  {lead.contactMethod || 'N/A'}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                  {lead.status || 'New'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadOverview;
