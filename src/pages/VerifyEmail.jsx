import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, RefreshCw, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resendVerification } = useAuth();

  // Try to get email and password from navigation state (set by Signup)
  const initialEmail = location.state?.email || '';
  const initialPassword = location.state?.password || '';

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  
  const [cooldown, setCooldown] = useState(0);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Cooldown timer effect
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldown]);

  const getFriendlyErrorMessage = (err) => {
    const code = err.code || '';
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      return 'Incorrect email or password. Please try again to resend.';
    }
    if (code === 'auth/too-many-requests') {
      return 'Too many attempts. Please try again later.';
    }
    return 'Failed to resend email. Please try again.';
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password) {
      setError('Please provide your email and password to resend the verification link.');
      return;
    }

    if (cooldown > 0) return;

    setLoadingLocal(true);
    try {
      await resendVerification(email, password);
      setSuccessMessage('A new verification email has been sent!');
      setCooldown(60); // 60 seconds cooldown
    } catch (err) {
      console.error('Resend error:', err);
      setError(getFriendlyErrorMessage(err));
    } finally {
      setLoadingLocal(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Intense Background glow behind form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-accent-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="glow-orb w-[600px] h-[600px] bg-accent-600/40 top-0 -right-48 blur-[100px]" />
      <div className="glow-orb w-[500px] h-[500px] bg-accent-400/40 bottom-0 -left-36 blur-[100px]" />

      <div className="w-full max-w-md animate-fade-in text-center z-10">
        <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl relative backdrop-blur-2xl">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-success/80 to-success flex items-center justify-center mx-auto mb-6 shadow-lg shadow-success/25 animate-pulse-glow">
            <Mail size={32} className="text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-text-primary mb-3">Verify your email</h1>
          
          <p className="text-text-secondary text-sm mb-6 leading-relaxed">
            We've sent a verification link to <br/>
            <span className="font-semibold text-white">{email || 'your email address'}</span>. <br/>
            Please check your inbox and click the link to activate your account.
          </p>

          <div className="bg-dark-800/50 rounded-xl p-4 border border-border mb-6 text-left">
            <h3 className="text-sm font-medium text-text-primary mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-warning" />
              Didn't receive the email?
            </h3>
            <ul className="text-sm text-text-muted space-y-1.5 list-disc pl-5">
              <li>Check your spam or junk folder</li>
              <li>Make sure the email address is correct</li>
              <li>Wait a few minutes as emails can sometimes be delayed</li>
            </ul>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm mb-5 text-left animate-fade-in">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-success/10 border border-success/20 text-success text-sm mb-5 text-left animate-fade-in">
              <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleResend} className="space-y-4">
            {(!initialEmail || !initialPassword) && (
              <div className="space-y-3 text-left">
                <p className="text-xs text-text-muted mb-2">Please confirm your credentials to resend the email.</p>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="input-field pl-10"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="input-field pl-10"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loadingLocal || cooldown > 0}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                cooldown > 0
                  ? 'bg-dark-700 text-text-muted cursor-not-allowed border border-border'
                  : 'bg-accent-500/20 text-accent-400 border border-accent-500/50 hover:bg-accent-500/30'
              }`}
            >
              {loadingLocal ? (
                <div className="w-5 h-5 border-2 border-accent-400/30 border-t-accent-400 rounded-full animate-spin" />
              ) : cooldown > 0 ? (
                <>Resend available in {cooldown}s</>
              ) : (
                <>
                  <RefreshCw size={18} />
                  Resend Verification Email
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
