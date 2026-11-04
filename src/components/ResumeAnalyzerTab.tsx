import React, { useState } from 'react';
import { ResumeData, ScoreBreakdown, ActiveTab } from '../types';
import { parseRawResumeText } from '../utils/resumeParser';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  BarChart, 
  Zap, 
  ShieldCheck, 
  RefreshCw,
  Code2,
  FileCheck,
  GraduationCap
} from 'lucide-react';

interface ResumeAnalyzerTabProps {
  resume: ResumeData;
  score: ScoreBreakdown;
  onUpdateResume: (newResume: ResumeData) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectSampleResume: (id: string) => void;
}

export const ResumeAnalyzerTab: React.FC<ResumeAnalyzerTabProps> = ({
  resume,
  score,
  onUpdateResume,
  setActiveTab,
  onSelectSampleResume
}) => {
  const [isPasting, setIsPasting] = useState(false);
  const [rawText, setRawText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const parsed = parseRawResumeText(text);
        onUpdateResume(parsed);
      }
    };
    reader.readAsText(file);
  };

  const handleParseCustomText = () => {
    if (!rawText.trim()) return;
    const parsed = parseRawResumeText(rawText);
    onUpdateResume(parsed);
    setIsPasting(false);
    setFileName('Pasted Resume Text');
  };

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'text-emerald-600';
    if (val >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getBarColor = (val: number) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800">
      {/* Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-indigo-50/90 via-white to-blue-50/90 border border-indigo-100 p-6 sm:p-8 shadow-xs overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-100/70 text-indigo-700 text-xs font-semibold border border-indigo-200">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Fresher & Student AI Resume Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Analyse Your Fresher Resume & Unlock Your Growth Path
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Defaulted with verified <strong>Fresher graduate sample data</strong>. Upload your resume or paste text to evaluate ATS strength, reveal missing technical skill gaps, and follow roadmaps culminating in the <strong>DSA Capstone</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsPasting(!isPasting)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-300 transition-all shadow-xs"
            >
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>{isPasting ? 'Close Text Box' : 'Paste Resume Text'}</span>
            </button>

            <label className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer">
              <UploadCloud className="w-4 h-4" />
              <span>Upload Resume (TXT/PDF)</span>
              <input 
                type="file" 
                accept=".txt,.pdf,.docx,.doc" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>
          </div>
        </div>

        {/* Text Paste Modal / Inline Area */}
        {isPasting && (
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Paste your raw resume content (Plain text or Markdown):
            </label>
            <textarea
              rows={6}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste your resume text here (Summary, Skills, Experience, Education, Projects)..."
              className="w-full rounded-xl bg-white border border-slate-300 p-3.5 text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsPasting(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleParseCustomText}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
              >
                Analyse Pasted Resume
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Score & Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Big ATS Score Gauge */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              ATS Compatibility Index
            </span>
            <span className="flex items-center space-x-1 text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AI Evaluated</span>
            </span>
          </div>

          <div className="my-6 flex flex-col items-center justify-center text-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Circular Gauge Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className={`${score.overall >= 80 ? 'stroke-emerald-500' : score.overall >= 60 ? 'stroke-amber-500' : 'stroke-rose-500'} transition-all duration-1000 ease-out`}
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * score.overall) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className={`text-4xl font-extrabold font-mono tracking-tight ${getScoreColor(score.overall)}`}>
                  {score.overall}
                </span>
                <span className="text-[11px] font-bold uppercase text-slate-400">
                  out of 100
                </span>
              </div>
            </div>

            <div className="mt-3">
              <span className={`text-sm font-bold ${getScoreColor(score.overall)}`}>
                {score.overall >= 80 ? '🚀 High Interview Probability' : score.overall >= 60 ? '⚡ Good Baseline (Needs Polish)' : '🎓 Fresher Baseline (Take Courses)'}
              </span>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Candidate: <strong className="text-slate-800">{resume.personalInfo.fullName}</strong>
                {fileName && ` (${fileName})`}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Preset Sample Profile:</span>
            <button
              onClick={() => onSelectSampleResume('fresher-cs')}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center space-x-1"
            >
              <span>Reset Fresher Data</span>
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Center & Right Column: Sub-metric breakdowns */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <BarChart className="w-4 h-4 text-indigo-600" />
                <span>ATS Scoring Dimensions</span>
              </h3>
              <span className="text-xs text-slate-400">Weighted Evaluation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ATS Formatting */}
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-700 font-semibold">Structure & Contact Info</span>
                  <span className={`font-mono font-bold ${getScoreColor(score.atsCompliance)}`}>
                    {score.atsCompliance}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor(score.atsCompliance)}`}
                    style={{ width: `${score.atsCompliance}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Hierarchy, email, phone, location & verified profiles.
                </p>
              </div>

              {/* Skills Relevance */}
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-700 font-semibold">Technical Skills Depth</span>
                  <span className={`font-mono font-bold ${getScoreColor(score.skillsRelevance)}`}>
                    {score.skillsRelevance}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor(score.skillsRelevance)}`}
                    style={{ width: `${score.skillsRelevance}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Modern languages, frameworks, cloud tooling & libraries.
                </p>
              </div>

              {/* Impact & Metrics */}
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-700 font-semibold">Quantifiable Results</span>
                  <span className={`font-mono font-bold ${getScoreColor(score.impactMetrics)}`}>
                    {score.impactMetrics}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor(score.impactMetrics)}`}
                    style={{ width: `${score.impactMetrics}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Performance multipliers (% gains, latency, user metrics).
                </p>
              </div>

              {/* Action Verbs */}
              <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-slate-700 font-semibold">Dynamic Action Verbs</span>
                  <span className={`font-mono font-bold ${getScoreColor(score.actionVerbsScore)}`}>
                    {score.actionVerbsScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getBarColor(score.actionVerbsScore)}`}
                    style={{ width: `${score.actionVerbsScore}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Active voice (Engineered, Architected, Refactored).
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA banner */}
          <div className="mt-5 p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Boost your ATS Score from {score.overall} to 90+</p>
                <p className="text-[11px] text-slate-600">Complete missing courses & our final DSA capstone</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('paths')}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
            >
              <span>Explore Paths</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Strengths, Improvements & Missing Keywords */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strengths */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center space-x-2 mb-4 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Identified Resume Strengths</span>
          </div>
          <ul className="space-y-3">
            {score.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center space-x-2 mb-4 text-amber-700 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Critical Fresher Gaps to Fix</span>
          </div>
          <ul className="space-y-3">
            {score.improvements.map((imp, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Keywords & Skills */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-4 text-rose-700 font-bold text-sm">
              <Code2 className="w-4 h-4 text-rose-500" />
              <span>Missing High-Demand Keywords</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Recruiters scan for these industry keywords. Completing track courses will auto-inject these:
            </p>
            <div className="flex flex-wrap gap-2">
              {score.keywordGaps.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-bold"
                >
                  +{kw}
                </span>
              ))}
              <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                +DSA CAPSTONE
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('builder')}
            className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center justify-center space-x-2 transition-colors"
          >
            <FileCheck className="w-4 h-4 text-indigo-600" />
            <span>Open Interactive Resume Builder</span>
          </button>
        </div>
      </div>
    </div>
  );
};
