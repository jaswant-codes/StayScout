import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import NotificationBell from './notifications/NotificationBell';
import {
  Home,
  MessageCircle,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown,
  Settings,
  Calendar,
  Heart,
  User as UserIcon,
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  // Generate avatar initial
  const getAvatarInitial = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName.charAt(0).toUpperCase();
    }
    if (currentUser?.email) {
      return currentUser.email.charAt(0).toUpperCase();
    }
    return '?';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass border-b-0" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group" onClick={closeMobile} aria-label="StayScout home">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/20 group-hover:shadow-accent-500/40 transition-shadow">
              <Home size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold">
              Stay<span className="gradient-text">Scout</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {!isAuthenticated && (
              <>
                <a
                  href="/#properties-section"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  Explore
                </a>
                <Link
                  to="/?type=pg"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  PGs
                </Link>
                <Link
                  to="/?type=hostel"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  Hostels
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  List Property
                </Link>
                <a
                  href="#about"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  About
                </a>
              </>
            )}

            {isAuthenticated && (
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive('/')
                    ? 'text-accent-400 bg-accent-500/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-700'
                }`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                <Search size={16} />
                Explore
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <NotificationBell />
                <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-700 border border-border hover:border-border-hover transition-all cursor-pointer"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser?.displayName || 'User'}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-accent-500 text-white flex items-center justify-center font-bold text-xs">
                      {getAvatarInitial()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-text-primary max-w-[120px] truncate">
                    {currentUser?.displayName || currentUser?.email?.split('@')[0]}
                  </span>
                  <ChevronDown size={14} className={`text-text-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl glass-strong shadow-2xl border border-border overflow-hidden animate-fade-in" role="menu">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {currentUser?.displayName || 'User'}
                      </p>
                      <p className="text-xs text-text-muted truncate">{currentUser?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <UserIcon size={15} />
                        My Profile
                      </Link>
                      <Link
                        to="/saved-properties"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Heart size={15} />
                        Saved Properties
                      </Link>
                      <Link
                        to="/visits"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Calendar size={15} />
                        My Visits
                      </Link>
                      <Link
                        to="/inbox"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <MessageCircle size={15} />
                        Messages
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Settings size={15} />
                        Settings
                      </Link>
                    </div>
                    <div className="border-t border-border py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-all w-full text-left"
                        role="menuitem"
                      >
                        <LogOut size={15} />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
              </>
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
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-dark-800 animate-fade-in" role="menu">
          <div className="px-4 py-4 space-y-1">
            {!isAuthenticated && (
              <>
                <a
                  href="/#properties-section"
                  onClick={closeMobile}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  Explore
                </a>
                <Link
                  to="/?type=pg"
                  onClick={closeMobile}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  PGs
                </Link>
                <Link
                  to="/?type=hostel"
                  onClick={closeMobile}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  Hostels
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobile}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  List Property
                </Link>
                <a
                  href="#about"
                  onClick={closeMobile}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                >
                  About
                </a>
              </>
            )}

            {isAuthenticated && (
              <Link
                to="/"
                onClick={closeMobile}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive('/')
                    ? 'text-accent-400 bg-accent-500/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-700'
                }`}
                role="menuitem"
              >
                <Search size={18} />
                Explore
              </Link>
            )}

            <div className="border-t border-border pt-3 mt-3">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      {currentUser?.photoURL ? (
                        <img
                          src={currentUser.photoURL}
                          alt={currentUser?.displayName || 'User'}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center font-bold text-xs">
                          {getAvatarInitial()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {currentUser?.displayName || currentUser?.email?.split('@')[0]}
                        </p>
                        <p className="text-xs text-text-muted">{currentUser?.email}</p>
                      </div>
                    </div>
                    <NotificationBell />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-all"
                    role="menuitem"
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
