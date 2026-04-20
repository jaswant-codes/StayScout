import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
} from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      await signup(name, email, password, role);
      if (role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/owner/dashboard');
      }
    } catch (err) {
      console.error('Signup error:', err);
      const messages = {
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/invalid-email': 'Please enter a valid email.',
        'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
        'auth/network-request-failed': 'Network error. Please check your internet connection.',
        'auth/configuration-error': 'Firebase is not configured. Please add your Firebase credentials to the .env file.',
        'auth/invalid-api-key': 'Firebase API key is invalid. Please check your .env file.',
      };
      let errorMessage = messages[err.code] || err.message || 'Signup failed. Please try again.';
      if (err.code?.includes('api-key') || err.message?.includes('api-key')) {
        errorMessage = 'Firebase is not configured. Please add your real Firebase API key to the .env file.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm mb-5 animate-fade-in">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
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
            </div>

            <button
              id="signup-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 text-base shadow-lg shadow-accent-500/30 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Create account'
              )}
            </button>
          </form>

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
