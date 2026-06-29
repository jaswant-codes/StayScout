import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loadingLocal, setLoadingLocal] = useState(false);
  
  const { signIn, globalAuthError, setGlobalAuthError, isAuthenticated, currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to previous page or home
  const from = location.state?.from?.pathname || '/';

  // If already authenticated, redirect away (handles post-redirect state restoration)
  useEffect(() => {
    if (!loading && isAuthenticated && currentUser) {
      console.log("[Login] useEffect fired: User authenticated. Navigating...");
      const target = (from === '/login' || from === '/signup') ? '/' : from;
      navigate(target, { replace: true });
    }
  }, [loading, isAuthenticated, currentUser, navigate, from]);

  // Combine local error with global error from redirect
  const displayError = error || (globalAuthError ? getFriendlyErrorMessage(globalAuthError) : '');

  // Clear global error when local error is set or component unmounts
  useEffect(() => {
    return () => {
      if (globalAuthError) setGlobalAuthError(null);
    }
  }, [globalAuthError, setGlobalAuthError]);

  const getFriendlyErrorMessage = (err) => {
    const code = err.code || '';
    const message = err.message || '';

    if (code.includes('api-key') || message.includes('api-key')) {
      return 'Firebase is not configured. Please add your real Firebase API key to the .env file.';
    }

    switch (code) {
      case 'auth/user-not-found':
      case 'auth/invalid-credential':
        return 'No account exists with this email or incorrect password.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/invalid-email':
        return 'Please enter a valid email.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Try again later.';
      case 'auth/unverified-email':
        return 'Please verify your email before logging in. Check your Inbox or Spam folder.';
      case 'auth/network-request-failed':
        return 'Please check your internet connection.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was cancelled.';
      case 'auth/popup-blocked':
        return 'Your browser blocked the Google sign-in popup. Please allow popups.';
      case 'auth/cancelled-popup-request':
        return 'Multiple popup requests were cancelled. Please try again.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists using another sign-in method.';
      case 'auth/operation-not-allowed':
        return 'Google Authentication is disabled in Firebase Console.';
      case 'auth/unauthorized-domain':
        return 'This domain is not authorized in Firebase Authentication.';
      case 'auth/internal-error':
        return 'An internal Firebase error occurred. Please try again.';
      case 'auth/invalid-api-key':
        return 'Firebase API key is invalid or missing.';
      default:
        return 'Login failed. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoadingLocal(true);

    try {
      await signIn(email, password);
      // Let AuthContext's onAuthStateChanged handle the session via useEffect
    } catch (err) {
      console.error('Login error:', err);
      setError(getFriendlyErrorMessage(err));
      setLoadingLocal(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Intense Background glow behind form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-accent-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="glow-orb w-[600px] h-[600px] bg-accent-600/40 top-0 -right-48 blur-[100px]" />
      <div className="glow-orb w-[500px] h-[500px] bg-accent-400/40 bottom-0 -left-36 blur-[100px]" />

      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent-500/25 animate-pulse-glow">
            <LogIn size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Welcome back</h1>
          <p className="text-sm text-text-secondary">Sign in to your StayScout account</p>
        </div>

        {/* Form */}
        <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-2xl">
          {displayError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm mb-5 animate-fade-in">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{displayError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="input-field pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-dark-700 text-accent-500 focus:ring-accent-500 focus:ring-offset-0"
                />
                <span className="text-sm text-text-secondary">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-accent-400 hover:text-accent-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loadingLocal}
              className="btn-primary w-full justify-center py-3.5 text-base shadow-lg shadow-accent-500/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loadingLocal ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign in'
              )}
            </button>
          </form>



          <p className="text-center text-sm text-text-muted mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent-400 hover:text-accent-300 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
