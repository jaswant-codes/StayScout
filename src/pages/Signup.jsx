import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  AlertCircle,
  GraduationCap,
  Building2,
  CheckCircle,
} from 'lucide-react';

const getPasswordStrength = (pass) => {
  if (!pass) return { level: 0, label: '', color: '' };
  let score = 0;
  if (pass.length >= 6) score++;
  if (pass.length >= 8) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;

  if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-error' };
  if (score <= 2) return { level: 2, label: 'Fair', color: 'bg-warning' };
  if (score <= 3) return { level: 3, label: 'Good', color: 'bg-accent-400' };
  return { level: 4, label: 'Strong', color: 'bg-success' };
};

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { signUp, signInWithGoogle, globalAuthError, setGlobalAuthError } = useAuth();
  const navigate = useNavigate();

  // Combine local error with global error from redirect
  const displayError = error || (globalAuthError ? getFriendlyErrorMessage(globalAuthError) : '');

  // Clear global error when local error is set or component unmounts
  useEffect(() => {
    return () => {
      if (globalAuthError) setGlobalAuthError(null);
    }
  }, []);

  const strength = getPasswordStrength(password);

  const getFriendlyErrorMessage = (err) => {
    const code = err.code || '';
    const message = err.message || '';

    if (code.includes('api-key') || message.includes('api-key')) {
      return 'Firebase is not configured. Please add your real Firebase API key to the .env file.';
    }

    switch (code) {
      case 'auth/email-already-in-use':
        return 'An account already exists with this email.';
      case 'auth/invalid-email':
        return 'Please enter a valid email.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters.';
      case 'auth/network-request-failed':
        return 'Please check your internet connection.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was cancelled.';
      case 'auth/popup-blocked':
        return 'Your browser blocked the Google sign-in popup.';
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
      case 'auth/invalid-credential':
        return 'Invalid credentials provided.';
      default:
        return 'Signup failed. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoadingLocal(true);

    try {
      // Create user (which now also sends verification email and logs them out)
      await signUp(name, email, password);
      
      setSuccess(true);
      
      // Short delay to show success notice, then navigate to verify email
      setTimeout(() => {
        navigate('/verify-email', { replace: true, state: { email, password } });
      }, 1500);
    } catch (err) {
      console.error('Signup error:', err);
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoadingLocal(false);
    }
  };

  const handleGoogleSignUp = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    console.log("Starting Google Sign-In...");
    
    // 1. MUST start popup immediately BEFORE any React state updates
    const authPromise = signInWithGoogle();
    
    // 2. Now update state safely
    setError('');
    setLoadingLocal(true);
    
    // 3. Await the promise resolution
    authPromise
      .then((user) => {
        console.log("Google user:", user);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error("FULL FIREBASE ERROR");
        console.error(err);
        console.error(err.code);
        console.error(err.message);
        console.error(err.stack);
        setError(getFriendlyErrorMessage(err));
        setLoadingLocal(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Intense Background glow behind form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-accent-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="glow-orb w-[600px] h-[600px] bg-accent-600/40 top-0 -right-48 blur-[100px]" />
      <div className="glow-orb w-[500px] h-[500px] bg-accent-400/40 bottom-0 -left-36 blur-[100px]" />

      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent-500/25 animate-pulse-glow">
            <UserPlus size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Create your account</h1>
          <p className="text-sm text-text-secondary">Join StayScout and start exploring</p>
        </div>

        {/* Form */}
        <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-2xl">
          {displayError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm mb-5 animate-fade-in">
              <AlertCircle size={16} />
              {displayError}
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-success/10 border border-success/20 text-success text-sm mb-5 animate-fade-in">
              <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>Account created! Redirecting to verification...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection (Kept for UI consistency, but unused in backend for now) */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border transition-all duration-300 font-medium ${
                    role === 'student'
                      ? 'border-accent-500 bg-accent-500/20 text-accent-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                      : 'border-border bg-dark-700/50 text-text-secondary hover:bg-dark-600'
                  }`}
                >
                  <GraduationCap size={18} />
                  <span className="font-medium text-sm">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('owner')}
                  className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border transition-all duration-300 font-medium ${
                    role === 'owner'
                      ? 'border-accent-500 bg-accent-500/20 text-accent-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                      : 'border-border bg-dark-700/50 text-text-secondary hover:bg-dark-600'
                  }`}
                >
                  <Building2 size={18} />
                  <span className="font-medium text-sm">Owner</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input
                  id="signup-email"
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
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
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
              {/* Password Strength Meter */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= strength.level ? strength.color : 'bg-dark-600'}`} />
                    ))}
                  </div>
                  <p className={`text-xs mt-1 ${strength.level <= 1 ? 'text-error' : strength.level <= 2 ? 'text-warning' : 'text-success'}`}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            <button
              id="signup-submit"
              type="submit"
              disabled={loadingLocal}
              className="btn-primary w-full justify-center py-3.5 text-base shadow-lg shadow-accent-500/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loadingLocal ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-muted">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loadingLocal}
            className="btn-secondary w-full justify-center py-3 text-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-text-muted mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-accent-400 hover:text-accent-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
