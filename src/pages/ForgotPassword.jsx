import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { KeyRound, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await forgotPassword(email);
      setSuccess(
  "Password reset email sent successfully. Please check your inbox (and Spam folder if needed)."
);
    } catch (err) {
      console.error('Forgot password error:', err);
      const messages = {
        'auth/user-not-found': 'No account found with this email.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/too-many-requests': 'Too many requests. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your internet connection.',
      };
      setError(messages[err.code] || err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glows matching Login page */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[500px] bg-accent-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="glow-orb w-[600px] h-[600px] bg-accent-600/40 top-0 -right-48 blur-[100px]" />
      <div className="glow-orb w-[500px] h-[500px] bg-accent-400/40 bottom-0 -left-36 blur-[100px]" />

      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent-500/25 animate-pulse-glow">
            <KeyRound size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Reset your password</h1>
          <p className="text-sm text-text-secondary">Enter your email and we'll send you a reset link</p>
        </div>

        {/* Form */}
        <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 backdrop-blur-2xl">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm mb-5 animate-fade-in">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="animate-fade-in text-center py-4">
              <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-success" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary mb-2">Check your email</h2>
              <p className="text-sm text-text-secondary mb-6">{success}</p>
              <Link
                to="/login"
                className="btn-primary inline-flex justify-center py-3 px-6 text-sm"
              >
                Back to Sign in
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 text-base shadow-lg shadow-accent-500/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Send reset link'
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-text-muted mt-6">
                <Link to="/login" className="text-accent-400 hover:text-accent-300 font-medium transition-colors inline-flex items-center gap-1">
                  <ArrowLeft size={14} />
                  Back to Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
