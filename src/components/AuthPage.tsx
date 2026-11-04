import React, { useState } from 'react';
import { User, ActiveTab } from '../types';
import { 
  Lock, 
  Mail, 
  User as UserIcon, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  ArrowRight,
  ShieldCheck,
  LogOut,
  Award,
  KeyRound
} from 'lucide-react';

interface AuthPageProps {
  user: User | null;
  onLogin: (user: User) => void;
  onLogout: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  user,
  onLogin,
  onLogout,
  setActiveTab
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

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
    setActiveTab('courses');
  };

  const handleQuickDemoLogin = (role: 'fresher' | 'applicant') => {
    const demoUser: User = role === 'fresher' ? {
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
    setActiveTab('courses');
  };

  if (user && user.isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-2xl flex items-center justify-center mx-auto shadow-inner">
            {user.avatar || '🎓'}
          </div>
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Authenticated Session
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">{user.name}</h2>
            <p className="text-xs text-slate-500">{user.email}</p>
            <p className="text-xs text-indigo-600 font-medium mt-0.5">{user.role}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-left">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Course Enrollment</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center space-x-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Unlocked & Active</span>
              </span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block uppercase">Job Application Portal</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center space-x-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>1-Click Apply Ready</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab('courses')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Go to Recommended Courses
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Go to Job Applications
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn py-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {isSignUp ? 'Candidate Registration' : 'Student & Applicant Login'}
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Log in to unlock official course completions, auto-update your fresher resume, and directly apply for engineering roles.
          </p>
        </div>

        {/* Quick Demo Sign In Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Fast 1-Click Fresher Login:</span>
          </div>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('fresher')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-sm transition-all"
          >
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Sign In as Rohan Sharma (CS Fresher 2024)</span>
          </button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-slate-200" />
          <span className="px-3 text-[11px] text-slate-400 uppercase">or enter credentials</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="fresher@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center space-x-1.5"
          >
            <span>{isSignUp ? 'Complete Registration & Sign In' : 'Sign In with Email'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

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
              New to ResumeAI?{' '}
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

