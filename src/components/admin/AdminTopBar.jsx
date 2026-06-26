import { Search, Bell, User, Menu } from 'lucide-react';

export default function AdminTopBar() {
  return (
    <header className="h-16 bg-dark-800 border-b border-border px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-text-secondary hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-white hidden md:block">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="input-field pl-10 h-10 w-64 text-sm"
          />
        </div>

        <button className="relative p-2 text-text-secondary hover:text-white rounded-lg hover:bg-dark-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-border mx-2"></div>

        <button className="flex items-center gap-2 hover:bg-dark-700 p-1.5 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center text-accent-400">
            <User className="w-5 h-5" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white leading-none">Admin User</p>
          </div>
        </button>
      </div>
    </header>
  );
}
