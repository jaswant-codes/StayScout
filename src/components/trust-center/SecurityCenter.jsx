import React from 'react';
import { Shield, Key, Smartphone, Clock, Globe } from 'lucide-react';

export default function SecurityCenter({ profile }) {
  const sessions = profile?.security?.recentSessions || [];

  return (
    <div className="card glass p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
          <Shield className="text-accent-400" size={24} />
          Security Center
        </h2>
        <p className="text-gray-400 text-sm">Manage your password and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-800/50 p-4 rounded-xl border border-border flex items-start justify-between">
          <div className="flex gap-4">
            <div className="p-2 bg-dark-700 rounded-lg text-accent-400">
              <Key size={20} />
            </div>
            <div>
              <h3 className="text-white font-medium">Password</h3>
              <p className="text-sm text-gray-400 mt-1">Last changed 3 months ago</p>
            </div>
          </div>
          <button className="btn-secondary text-sm px-4 py-2">Change</button>
        </div>

        <div className="bg-dark-800/50 p-4 rounded-xl border border-border flex items-start justify-between">
          <div className="flex gap-4">
            <div className="p-2 bg-dark-700 rounded-lg text-accent-400">
              <Smartphone size={20} />
            </div>
            <div>
              <h3 className="text-white font-medium">Two-Factor Auth</h3>
              <p className="text-sm text-gray-400 mt-1">Add an extra layer of security</p>
            </div>
          </div>
          <button disabled className="btn-secondary text-sm px-4 py-2 opacity-50 cursor-not-allowed">Enable</button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-white font-medium border-b border-border pb-2">Recent Sessions</h3>
        {sessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead>
                <tr className="border-b border-border/50 text-gray-400">
                  <th className="py-2 font-medium">Device/Browser</th>
                  <th className="py-2 font-medium">Location</th>
                  <th className="py-2 font-medium">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, idx) => (
                  <tr key={idx} className="border-b border-border/50 last:border-0">
                    <td className="py-3 flex items-center gap-2">
                      <Smartphone size={14} className="text-gray-500" />
                      {session.device || 'Unknown Device'}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Globe size={14} className="text-gray-500" />
                        {session.location || 'Unknown'}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-500" />
                        {session.lastActive || 'Recently'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm bg-dark-800/30 rounded-xl border border-border/50">
            No recent session data available.
          </div>
        )}
      </div>
    </div>
  );
}
