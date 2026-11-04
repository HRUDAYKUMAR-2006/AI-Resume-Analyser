import React from 'react';
import { DevelopmentPath, ResumeData, ActiveTab } from '../types';
import { DEVELOPMENT_PATHS } from '../data/developmentPaths';
import { 
  Globe, 
  Cpu, 
  Cloud, 
  BarChart3, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  Award,
  Sparkles
} from 'lucide-react';

interface DevelopmentPathsTabProps {
  resume: ResumeData;
  selectedPathId: string;
  onSelectPath: (pathId: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const DevelopmentPathsTab: React.FC<DevelopmentPathsTabProps> = ({
  resume,
  selectedPathId,
  onSelectPath,
  setActiveTab,
}) => {
  const resumeSkills = [
    ...resume.skills.technical,
    ...resume.skills.frameworks,
    ...resume.skills.tools,
    ...resume.skills.soft
  ].map(s => s.toLowerCase());

  const getPathIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-blue-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-600" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-amber-600" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-rose-600" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-cyan-600" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  const calculateGap = (path: DevelopmentPath) => {
    const total = path.targetSkills.length;
    let matchedCount = 0;
    const missing: string[] = [];
    const acquired: string[] = [];

    path.targetSkills.forEach(skill => {
      const isPresent = resumeSkills.some(s => s.includes(skill.toLowerCase()) || skill.toLowerCase().includes(s));
      if (isPresent) {
        matchedCount++;
        acquired.push(skill);
      } else {
        missing.push(skill);
      }
    });

    const matchPercent = Math.round((matchedCount / total) * 100);
    return { matchPercent, acquired, missing, matchedCount, total };
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100/70 text-indigo-700 text-xs font-semibold border border-indigo-200">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Industry Development Paths & Skill Gap Analysis</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Select Your Target Career Roadmap
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          We compared your current fresher skillset against industry role expectations. Choose a specialization track to evaluate your readiness match, view missing competencies, and take courses concluding with the <strong>Ultimate DSA Final Capstone</strong>.
        </p>
      </div>

      {/* Grid of 6 Development Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEVELOPMENT_PATHS.map((path) => {
          const { matchPercent, missing, matchedCount } = calculateGap(path);
          const isSelected = selectedPathId === path.id;

          return (
            <div
              key={path.id}
              className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                isSelected
                  ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm'
              }`}
            >
              {/* Path Banner */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-xs">
                    {getPathIcon(path.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {path.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-xs text-indigo-600 font-semibold mt-0.5">{path.category}</p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {path.description}
                  </p>
                </div>

                {/* Market Data */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 flex items-center space-x-1 font-semibold">
                      <DollarSign className="w-3 h-3 text-emerald-600" />
                      <span>Avg Salary</span>
                    </span>
                    <span className="font-mono font-bold text-slate-900 mt-0.5 block">
                      {path.avgSalary.split('/')[0]}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 flex items-center space-x-1 font-semibold">
                      <Award className="w-3 h-3 text-amber-500" />
                      <span>Demand</span>
                    </span>
                    <span className="font-bold text-emerald-600 mt-0.5 block">
                      {path.marketDemand}
                    </span>
                  </div>
                </div>

                {/* Gap Meter */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-700 font-semibold">Fresher Match Readiness:</span>
                    <span className="font-mono font-bold text-indigo-600">{matchPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        matchPercent >= 70 ? 'bg-emerald-500' : matchPercent >= 40 ? 'bg-amber-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${matchPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                    <span>{matchedCount} skills present</span>
                    <span>{missing.length} missing skills</span>
                  </div>
                </div>

                {/* Missing Skills Tags */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Curriculum Skill Gaps:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {missing.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {missing.length > 4 && (
                      <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        +{missing.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {path.courses.length} Courses + 1 DSA Capstone
                </span>
                <button
                  onClick={() => {
                    onSelectPath(path.id);
                    setActiveTab('courses');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs ${
                    isSelected
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  <span>{isSelected ? 'View Path Courses' : 'Select Track'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
