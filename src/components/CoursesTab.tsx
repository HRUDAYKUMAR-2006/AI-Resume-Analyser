import React from 'react';
import { DevelopmentPath, Course, ActiveTab, User } from '../types';
import { 
  GraduationCap, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Zap, 
  ArrowRight, 
  ExternalLink,
  Code,
  FolderGit2,
  Sparkles,
  Lock,
  ShieldAlert
} from 'lucide-react';

interface CoursesTabProps {
  currentPath: DevelopmentPath;
  courses: Course[];
  finalCourse: Course;
  onCompleteCourse: (course: Course) => void;
  setActiveTab: (tab: ActiveTab) => void;
  user: User | null;
  onRequireAuth: (reason: string) => void;
}

export const CoursesTab: React.FC<CoursesTabProps> = ({
  currentPath,
  courses,
  finalCourse,
  onCompleteCourse,
  setActiveTab,
  user,
  onRequireAuth
}) => {
  const completedCount = courses.filter(c => c.status === 'completed').length + (finalCourse.status === 'completed' ? 1 : 0);
  const totalCount = courses.length + 1;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleAction = (course: Course) => {
    if (!user || !user.isAuthenticated) {
      onRequireAuth('enroll in courses, earn verified badges, and auto-inject capstones into your resume');
      return;
    }
    onCompleteCourse(course);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800">
      {/* Track Overview & Progress Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-50/90 via-white to-blue-50/90 border border-indigo-100 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100/70 text-indigo-700 text-xs font-semibold border border-indigo-200">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Target Track: {currentPath.title}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Recommended Courses & Value Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every course provides targeted ATS score improvements and quantified market value. Completing any course <strong>automatically injects</strong> verified skills, certifications, and portfolio projects into your resume.
            </p>

            {!user?.isAuthenticated && (
              <div className="pt-2 flex items-center space-x-2 text-xs text-amber-700 font-medium">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Student Login required to officially record course completions and inject projects.</span>
              </div>
            )}
          </div>

          {/* Overall Track Progress Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm min-w-[240px] text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Curriculum Progress
            </span>
            <div className="flex items-center justify-center space-x-2 my-2">
              <span className="text-3xl font-extrabold font-mono text-indigo-600">{completedCount}</span>
              <span className="text-slate-300 text-xl font-mono">/</span>
              <span className="text-xl font-bold font-mono text-slate-700">{totalCount} Completed</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden my-2">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {completedCount > 0 ? (
              <button
                onClick={() => setActiveTab('builder')}
                className="mt-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center justify-center space-x-1 mx-auto"
              >
                <span>View Updated Resume ({completedCount} Added)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            ) : (
              <span className="text-[11px] text-slate-400">Complete courses to auto-upgrade resume</span>
            )}
          </div>
        </div>
      </div>

      {/* Primary Track Courses */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
          <span>Foundational & Advanced Track Modules</span>
          <span className="text-xs font-normal text-slate-500">({courses.length} courses tailored to your gap)</span>
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {courses.map((course, idx) => {
            const isCompleted = course.status === 'completed';

            return (
              <div
                key={course.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isCompleted
                    ? 'bg-white border-emerald-300 shadow-xs ring-1 ring-emerald-200'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="p-6">
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isCompleted ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900">
                          {course.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                          <span className="text-xs font-medium text-slate-500">{course.provider}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {course.providerBadge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div>
                      {isCompleted ? (
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Auto-Injected in Resume</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    {course.description}
                  </p>

                  {/* Score & Value Analysis Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                    {/* Score Boost */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">ATS Score Boost</span>
                        <span className="text-sm font-bold font-mono text-indigo-600">
                          +{course.atsScoreBoost} Points
                        </span>
                      </div>
                    </div>

                    {/* Market Value ROI */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Market Value Score</span>
                        <span className="text-sm font-bold font-mono text-emerald-700">
                          {course.marketValueScore} / 10 (Very High)
                        </span>
                      </div>
                    </div>

                    {/* Salary Impact */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Salary Potential Impact</span>
                        <span className="text-xs font-bold font-mono text-amber-800">
                          {course.estimatedSalaryImpact}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Key Skills & Associated Capstone Project */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-slate-600 flex items-center space-x-1.5 mb-2">
                        <Code className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Target Skills Covered:</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.skillsCovered.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-600 flex items-center space-x-1.5 mb-2">
                        <FolderGit2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Included Portfolio Project:</span>
                      </span>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <p className="text-xs font-bold text-slate-900">
                          {course.capstoneProject.title}
                        </p>
                        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                          {course.capstoneProject.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={course.learningUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1"
                  >
                    <span>External Course Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center space-x-3">
                    {isCompleted ? (
                      <button
                        onClick={() => setActiveTab('builder')}
                        className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold flex items-center space-x-1.5 transition-all"
                      >
                        <span>Preview In Resume</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(course)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
                      >
                        {!user?.isAuthenticated ? <Lock className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                        <span>{!user?.isAuthenticated ? 'Login to Complete Course' : 'Mark Completed & Inject to Resume'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FINAL CAPSTONE: DSA & SYSTEM DESIGN COURSE */}
      <div className="pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-300 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>THE MANDATORY FINAL CAPSTONE COURSE (ACROSS ALL FIELDS)</span>
            </div>

            {finalCourse.status === 'completed' && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>DSA Capstone Mastered & Injected!</span>
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {finalCourse.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {finalCourse.description}
          </p>

          {/* DSA Metrics Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
            <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-amber-700">Maximum ATS Boost</span>
              <p className="text-lg font-bold font-mono text-slate-900 mt-0.5">+{finalCourse.atsScoreBoost} Points</p>
              <p className="text-[11px] text-slate-500 mt-1">Recruiter keyword magnet for all Tier-1 tech screens</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-amber-700">Highest Salary Upside</span>
              <p className="text-lg font-bold font-mono text-emerald-700 mt-0.5">{finalCourse.estimatedSalaryImpact}</p>
              <p className="text-[11px] text-slate-500 mt-1">Directly correlated with top-band engineering compensation</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-amber-700">Market Value Rating</span>
              <p className="text-lg font-bold font-mono text-purple-700 mt-0.5">{finalCourse.marketValueScore} / 10 (Mastery)</p>
              <p className="text-[11px] text-slate-500 mt-1">Stanford & MIT algorithmic curriculum benchmark</p>
            </div>
          </div>

          {/* Syllabus Topics */}
          <div className="space-y-2 mb-6">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Curated Master Syllabus:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {finalCourse.syllabus.map((item, sIndex) => (
                <div key={sIndex} className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DSA Action CTA */}
          <div className="pt-4 border-t border-amber-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              Completing DSA unlocks <strong className="text-slate-900">FAANG-ready resume credentials</strong> & in-memory cache capstone.
            </div>

            {finalCourse.status === 'completed' ? (
              <button
                onClick={() => setActiveTab('builder')}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-2 shadow-sm transition-all"
              >
                <span>View Final Updated Resume in Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleAction(finalCourse)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs flex items-center space-x-2 shadow-sm transition-all transform hover:scale-105"
              >
                {!user?.isAuthenticated ? <Lock className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                <span>{!user?.isAuthenticated ? 'Login to Complete DSA Capstone' : 'Complete DSA Capstone & Auto-Inject to Resume'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
