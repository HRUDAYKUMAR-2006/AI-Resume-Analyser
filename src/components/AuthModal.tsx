import React, { useState } from 'react';
import { User } from '../types';
import { 
  Lock, 
  Mail, 
  User as UserIcon, 
  CheckCircle2, 
  X, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  reason?: string; // e.g. "enroll in courses" or "apply for jobs"
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  reason = 'access premium course certifications and submit direct job applications'
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name || (email ? email.split('@')[0] : 'Rohan Sharma (Fresher)'),
      email: email || 'rohan.sharma.fresher@example.com',
      role: 'Fresher Software Engineer',
      avatar: '🎓',
      isAuthenticated: true
    };
    onLogin(newUser);
    onClose();
  };

  const handleQuickDemoLogin = (demoRole: 'fresher' | 'applicant') => {
    const demoUser: User = demoRole === 'fresher' ? {
      id: 'usr-fresher-1',
      name: 'Rohan Sharma',
      email: 'rohan.sharma.fresher@example.com',
      role: 'Computer Science Fresher (Class of 2024)',
      avatar: '🎓',
      isAuthenticated: true
    } : {
      id: 'usr-applicant-1',
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      role: 'Full Stack Applicant',
      avatar: '💻',
      isAuthenticated: true
    };
    onLogin(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-800">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {isSignUp ? 'Create Your Student & Applicant Account' : 'Sign In to Continue'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Please authenticate to {reason}.
          </p>
        </div>

        {/* Benefits Pill */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 space-y-2 text-xs text-indigo-900">
          <div className="font-semibold flex items-center space-x-1.5 text-indigo-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unlocked Member Privileges:</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5 text-[11px] text-slate-600">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Enroll in tracks & auto-inject courses into resume</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Unlock the final DSA Capstone credential</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>1-Click direct job apply with customized cover letters</span>
            </div>
          </div>
        </div>

        {/* Quick Demo Sign-in */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block text-center">
            Instant 1-Click Demo Login
          </span>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('fresher')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow transition-colors"
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Login as Fresher Candidate (Rohan Sharma)</span>
          </button>
        </div>

        <div className="flex items-center my-3">
          <div className="flex-1 border-t border-slate-200" />
          <span className="px-3 text-[11px] text-slate-400 uppercase">or enter credentials</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="candidate@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>{isSignUp ? 'Create Account & Sign In' : 'Sign In with Email'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Toggle sign in / sign up */}
        <div className="text-center text-xs text-slate-500 pt-1">
          {isSignUp ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="font-semibold text-indigo-600 hover:text-indigo-500 underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              New candidate?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="font-semibold text-indigo-600 hover:text-indigo-500 underline"
              >
                Create an Account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

