import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  ChevronDown,
  Settings,
} from 'lucide-react';

export default function Navbar() {
  const { user, userProfile, logout, isStudent, isOwner } = useAuth();
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

  const dashboardPath = isOwner ? '/owner/dashboard' : '/student/dashboard';

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
            {!user && (
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

            {user && (
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

            {isStudent && (
              <>
                <Link
                  to="/chat"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive('/chat')
                      ? 'text-accent-400 bg-accent-500/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-dark-700'
                  }`}
                  aria-current={isActive('/chat') ? 'page' : undefined}
                >
                  <MessageCircle size={16} />
                  Community
                </Link>
                <Link
                  to="/student/dashboard"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive('/student/dashboard')
                      ? 'text-accent-400 bg-accent-500/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-dark-700'
                  }`}
                  aria-current={isActive('/student/dashboard') ? 'page' : undefined}
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </>
            )}

            {isOwner && (
              <Link
                to="/owner/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive('/owner/dashboard')
                    ? 'text-accent-400 bg-accent-500/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-700'
                }`}
                aria-current={isActive('/owner/dashboard') ? 'page' : undefined}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-700 border border-border hover:border-border-hover transition-all cursor-pointer"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  {userProfile?.photoURL ? (
                    <img
                      src={userProfile.photoURL}
                      alt={userProfile?.name || 'User'}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-accent-500/20 flex items-center justify-center">
                      <User size={12} className="text-accent-400" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-text-primary max-w-[120px] truncate">
                    {userProfile?.name}
                  </span>
                  <ChevronDown size={14} className={`text-text-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl glass-strong shadow-2xl border border-border overflow-hidden animate-fade-in" role="menu">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-text-primary truncate">{userProfile?.name}</p>
                      <p className="text-xs text-text-muted truncate">{user?.email || userProfile?.email}</p>
                      <span className="inline-block text-xs text-text-muted capitalize bg-dark-600 px-2 py-0.5 rounded-full mt-1.5">
                        {userProfile?.role}
                      </span>
                    </div>
                    <div className="py-1">
                      <Link
                        to={dashboardPath}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard size={15} />
                        Dashboard
                      </Link>
                      {isStudent && (
                        <Link
                          to="/chat"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-dark-700 transition-all"
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <MessageCircle size={15} />
                          Community
                        </Link>
                      )}
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
            {!user && (
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

            {user && (
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

            {isStudent && (
              <>
                <Link
                  to="/chat"
                  onClick={closeMobile}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive('/chat')
                      ? 'text-accent-400 bg-accent-500/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-dark-700'
                  }`}
                  role="menuitem"
                >
                  <MessageCircle size={18} />
                  Community
                </Link>
                <Link
                  to="/student/dashboard"
                  onClick={closeMobile}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive('/student/dashboard')
                      ? 'text-accent-400 bg-accent-500/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-dark-700'
                  }`}
                  role="menuitem"
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
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive('/owner/dashboard')
                    ? 'text-accent-400 bg-accent-500/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-dark-700'
                }`}
                role="menuitem"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            )}

            <div className="border-t border-border pt-3 mt-3">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4">
                    {userProfile?.photoURL ? (
                      <img
                        src={userProfile.photoURL}
                        alt={userProfile?.name || 'User'}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                        <User size={14} className="text-accent-400" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-text-primary">{userProfile?.name}</p>
                      <p className="text-xs text-text-muted capitalize">{userProfile?.role}</p>
                    </div>
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
