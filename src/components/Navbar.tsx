import React from 'react';
import { ActiveTab, ResumeData, ScoreBreakdown, User } from '../types';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { 
  FileSearch, 
  Compass, 
  GraduationCap, 
  FileEdit, 
  Briefcase, 
  Sparkles,
  Award,
  ChevronDown,
  User as UserIcon,
  LogIn,
  LogOut,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  score: ScoreBreakdown;
  resume: ResumeData;
  onSelectSampleResume: (sampleId: string) => void;
  completedCoursesCount: number;
  totalCoursesCount: number;
  user: User | null;
  onOpenAuthModal: (reason?: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  score,
  onSelectSampleResume,
  completedCoursesCount,
  totalCoursesCount,
  user,
  onOpenAuthModal,
  onLogout
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);

  const getScoreColor = (val: number) => {
    if (val >= 85) return 'text-emerald-700 border-emerald-300 bg-emerald-50';
    if (val >= 70) return 'text-amber-700 border-amber-300 bg-amber-50';
    return 'text-rose-700 border-rose-300 bg-rose-50';
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'analyzer', label: 'Resume Analyser', icon: <FileSearch className="w-4 h-4" /> },
    { id: 'paths', label: 'Development Paths', icon: <Compass className="w-4 h-4" /> },
    { 
      id: 'courses', 
      label: 'Recommended Courses', 
      icon: <GraduationCap className="w-4 h-4" />,
      badge: `${completedCoursesCount}/${totalCoursesCount}`
    },
    { 
      id: 'builder', 
      label: 'Resume Builder', 
      icon: <FileEdit className="w-4 h-4" />,
      badge: completedCoursesCount > 0 ? 'Updated' : undefined
    },
    { 
      id: 'jobs', 
      label: 'Direct Job Apply', 
      icon: <Briefcase className="w-4 h-4" />,
      badge: 'Live'
    },
    {
      id: 'login',
      label: user && user.isAuthenticated ? 'Account' : 'Login / Access',
      icon: <KeyIcon className="w-4 h-4" />
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('analyzer')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-700 flex items-center justify-center shadow-md shadow-indigo-500/20 ring-2 ring-indigo-100">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  ResumeAI<span className="text-indigo-600">Catalyst</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Fresher Edition
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">AI Analyser • Career Development Paths • 1-Click Job Apply</p>
            </div>
          </div>

          {/* Quick Score Badge, Sample Selector & User Status */}
          <div className="flex items-center space-x-3">
            {/* Live ATS Score Pill */}
            <div 
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all hover:shadow-xs ${getScoreColor(score.overall)}`}
              title="Click to view full ATS score breakdown"
            >
              <Award className="w-4 h-4" />
              <span>ATS Score:</span>
              <span className="font-mono text-sm font-bold">{score.overall}/100</span>
            </div>

            {/* Sample Profile Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
              >
                <span>Sample Data</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {dropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 text-left"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Select Resume Profile
                    </span>
                    <span className="text-xs text-indigo-600 font-semibold">Fresher Graduate set as primary default</span>
                  </div>
                  {SAMPLE_RESUMES.map(sample => (
                    <button
                      key={sample.id}
                      onClick={() => {
                        onSelectSampleResume(sample.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 flex items-center space-x-1.5">
                          <span>{sample.label}</span>
                          {sample.id === 'fresher-cs' && (
                            <span className="text-[9px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-semibold">
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{sample.role}</div>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        {sample.score} pts
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Authentication Button or User Pill */}
            {user && user.isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                    {user.name.charAt(0)}
                  </span>
                  <span className="max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-indigo-500" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 text-left"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center space-x-1 mt-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Requirements Access Unlocked</span>
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('login');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Account Details</span>
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuthModal('access course logins, progress tracking, and direct job applications')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-100">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

function KeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/>
      <path d="m21 2-9.6 9.6"/>
      <circle cx="7.5" cy="15.5" r="5.5"/>
    </svg>
  );
}
