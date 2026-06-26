import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  CheckCircle, 
  Flag, 
  MessageSquare,
  Settings 
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/listings', icon: Building, label: 'Listings' },
  { to: '/admin/verify', icon: CheckCircle, label: 'Verification' },
  { to: '/admin/reports', icon: Flag, label: 'Reports' },
  { to: '/admin/support', icon: MessageSquare, label: 'Support' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' }
];

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-dark-800 border-r border-border flex-col hidden md:flex shrink-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-accent-500">Stay</span>Scout
          <span className="text-xs font-normal px-2 py-0.5 bg-accent-500/20 text-accent-400 rounded-full ml-1">Admin</span>
        </h2>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-accent-500/10 text-accent-400'
                  : 'text-text-secondary hover:bg-dark-700 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
