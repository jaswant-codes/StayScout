import React from 'react';
import { BadgeCheck, Calendar, Sun, Moon } from 'lucide-react';

const DashboardHeader = ({ userProfile }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const hour = new Date().getHours();
  const Icon = hour >= 6 && hour < 18 ? Sun : Moon;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 glass-strong rounded-2xl border border-border">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent-500">
          <img 
            src={userProfile?.photoURL || 'https://ui-avatars.com/api/?name=' + (userProfile?.displayName || 'Owner') + '&background=random'} 
            alt="Owner" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            {getGreeting()}, {userProfile?.displayName?.split(' ')[0] || 'Owner'}
            {userProfile?.isVerified && (
              <BadgeCheck className="w-5 h-5 text-accent-500" />
            )}
          </h1>
          <p className="text-text-muted">Welcome back to your owner dashboard</p>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-dark-800/50 px-4 py-2 rounded-xl border border-border">
        <Calendar className="w-5 h-5 text-accent-500" />
        <span className="text-text-secondary font-medium">{currentDate}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
