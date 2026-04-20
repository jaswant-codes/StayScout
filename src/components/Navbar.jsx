import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  MessageCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  User,
  Search,
} from 'lucide-react';

export default function Navbar() {
  const { user, userProfile, logout, isStudent, isOwner } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" onClick={closeMobile}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/20 group-hover:shadow-accent-500/40 transition-shadow">
              <Home size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold">
              Stay<span className="gradient-text">Scout</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {user && (
              <Link
                to="/"
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all flex items-center gap-2"
              >
                <Search size={16} />
                Explore
              </Link>
            )}

            {isStudent && (
              <>
                <Link
                  to="/chat"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  Community
                </Link>
                <Link
                  to="/student/dashboard"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </>
            )}

            {isOwner && (
              <Link
                to="/owner/dashboard"
                className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all flex items-center gap-2"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-700 border border-border">
                  <div className="w-6 h-6 rounded-full bg-accent-500/20 flex items-center justify-center">
                    <User size={12} className="text-accent-400" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    {userProfile?.name}
                  </span>
                  <span className="text-xs text-text-muted capitalize bg-dark-600 px-2 py-0.5 rounded-full">
                    {userProfile?.role}
                  </span>
                </div>
                <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-3">
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm">
                  Log in
                </Link>
                <Link to="/signup" className="btn-primary text-sm">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-700 transition-colors text-text-secondary"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-dark-800 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {user && (
              <Link
                to="/"
                onClick={closeMobile}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
              >
                <Search size={18} />
                Explore
              </Link>
            )}

            {isStudent && (
              <>
                <Link
                  to="/chat"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  <MessageCircle size={18} />
                  Community Chat
                </Link>
                <Link
                  to="/student/dashboard"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              </>
            )}

            {isOwner && (
              <Link
                to="/owner/dashboard"
                onClick={closeMobile}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            )}

            <div className="border-t border-border pt-3 mt-3">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4">
                    <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                      <User size={14} className="text-accent-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{userProfile?.name}</p>
                      <p className="text-xs text-text-muted capitalize">{userProfile?.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-all"
                  >
                    <LogOut size={18} />
                    Log out
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-4">
                  <Link to="/login" onClick={closeMobile} className="btn-secondary block text-center w-full">
                    Log in
                  </Link>
                  <Link to="/signup" onClick={closeMobile} className="btn-primary block text-center w-full">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
