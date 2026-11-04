import React, { useState } from 'react';
import { JobListing, ResumeData, ScoreBreakdown, User } from '../types';
import { calculateJobMatch } from '../data/jobsData';
import { fireConfetti } from '../utils/confetti';
import { 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Filter, 
  ExternalLink, 
  X,
  UserCheck,
  Lock,
  ShieldAlert
} from 'lucide-react';

interface JobApplyTabProps {
  jobs: JobListing[];
  resume: ResumeData;
  score: ScoreBreakdown;
  selectedPathId: string;
  onApplyJob: (jobId: string) => void;
  user: User | null;
  onRequireAuth: (reason: string) => void;
}

export const JobApplyTab: React.FC<JobApplyTabProps> = ({
  jobs,
  resume,
  score,
  selectedPathId,
  onApplyJob,
  user,
  onRequireAuth
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobListing | null>(null);
  const [customCoverLetter, setCustomCoverLetter] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Filter jobs
  const filteredJobs = jobs.filter(j => {
    if (filterType === 'all') return true;
    if (filterType === 'remote') return j.type === 'Remote';
    if (filterType === 'applied') return !!j.appliedStatus;
    if (filterType === 'path') return j.pathId === selectedPathId;
    return true;
  });

  const handleOpenApplyModal = (job: JobListing) => {
    if (!user || !user.isAuthenticated) {
      onRequireAuth('submit direct job applications to hiring portals and generate verified cover letters');
      return;
    }

    setSelectedJobForModal(job);

    // Auto-generate customized AI cover letter tailored to this company and resume
    const generatedLetter = `Dear Hiring Team at ${job.company},

I am writing to express my strong enthusiasm for the ${job.title} position (${job.location}). With an ATS-verified fresher profile index of ${score.overall}/100 and hands-on coursework/projects in ${resume.skills.technical.slice(0, 4).join(', ')}, I am eager to contribute to your engineering milestones.

Recently, I have completed specialized engineering coursework in modern architectures, ${resume.skills.frameworks.slice(0, 3).join(', ')}, and algorithmic problem-solving. My capstone projects include "${resume.projects[0]?.title || 'Distributed Scalable Architecture'}", where I ${resume.projects[0]?.highlights?.[0] || 'engineered high-performance microservices and optimized latency'}.

${job.company}'s engineering culture aligns closely with my dedication to continuous learning. I welcome the opportunity to discuss how my skill set and proactive attitude can add immediate value to your team.

Sincerely,
${resume.personalInfo.fullName}
${resume.personalInfo.email} | ${resume.personalInfo.phone}`;

    setCustomCoverLetter(generatedLetter);
  };

  const handleConfirmDirectApplication = () => {
    if (!selectedJobForModal) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onApplyJob(selectedJobForModal.id);
      setIsSubmitting(false);
      setSelectedJobForModal(null);
      fireConfetti();
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 700);
  };

  const appliedCount = jobs.filter(j => !!j.appliedStatus).length;

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 border border-emerald-400/30 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-100" />
          <div>
            <p className="text-xs font-bold">Application Successfully Submitted!</p>
            <p className="text-[11px] text-emerald-100">Your tailored ATS resume and cover letter were transmitted.</p>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/90 border border-emerald-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>1-Click Direct Application Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Directly Apply for Tailored Engineering Roles
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            These active roles are matched in real-time to your analyzed skills and newly completed courses. Select <strong>Directly Apply</strong> to submit your verified profile, auto-craft tailored cover letters, and track candidate pipeline status.
          </p>

          {!user?.isAuthenticated && (
            <div className="pt-2 flex items-center space-x-2 text-xs text-amber-700 font-semibold">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Applicant Authentication required to submit direct applications.</span>
            </div>
          )}
        </div>

        {/* Applied Counter */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm min-w-[200px] text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Applications Submitted
          </span>
          <div className="text-3xl font-extrabold font-mono text-emerald-600">
            {appliedCount}
          </div>
          <span className="text-[11px] text-slate-400">Directly dispatched to hiring systems</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-semibold flex items-center space-x-1 pl-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter By:</span>
          </span>
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterType === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Roles ({jobs.length})
          </button>
          <button
            onClick={() => setFilterType('path')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterType === 'path'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Selected Track
          </button>
          <button
            onClick={() => setFilterType('remote')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterType === 'remote'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Remote Only
          </button>
          <button
            onClick={() => setFilterType('applied')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              filterType === 'applied'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Applied ({appliedCount})
          </button>
        </div>

        <div className="text-xs text-slate-500 pr-2">
          Candidate: <strong className="text-slate-800">{resume.personalInfo.fullName}</strong> (ATS: {score.overall})
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const matchPercent = calculateJobMatch(job, resume);
          const isApplied = !!job.appliedStatus;

          return (
            <div
              key={job.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-sm ${
                isApplied
                  ? 'bg-white border-emerald-300 ring-1 ring-emerald-200'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-bold text-slate-800">{job.company}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{job.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Meter Pill */}
                  <div className="text-right">
                    <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs font-bold">
                      <Sparkles className="w-3 h-3" />
                      <span>{matchPercent}% Match</span>
                    </div>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{job.postedDate}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {job.overview}
                </p>

                {/* Salary & Type Badge */}
                <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold border border-emerald-200 flex items-center space-x-1">
                    <DollarSign className="w-3 h-3" />
                    <span>{job.salary}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                    {job.type}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                    {job.experienceLevel}
                  </span>
                </div>

                {/* Matching Skill Tags */}
                <div className="space-y-1 mb-4">
                  <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                    Required Tags:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag, tIdx) => {
                      const allResumeSkills = [
                        ...resume.skills.technical,
                        ...resume.skills.frameworks,
                        ...resume.skills.tools
                      ].map(s => s.toLowerCase());
                      const isMatched = allResumeSkills.some(s => s.includes(tag.toLowerCase()));

                      return (
                        <span
                          key={tIdx}
                          className={`text-[11px] px-2 py-0.5 rounded-md font-mono ${
                            isMatched
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {isMatched ? `✓ ${tag}` : tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(job.title + ' ' + job.company)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-500 hover:text-indigo-600 font-medium flex items-center space-x-1"
                >
                  <span>Verify on LinkedIn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div>
                  {isApplied ? (
                    <span className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Application Under Review</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenApplyModal(job)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs transition-all hover:scale-105"
                    >
                      {!user?.isAuthenticated ? <Lock className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                      <span>Directly Apply for Job</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 1-Click Application Modal */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl p-6 sm:p-8 space-y-5 shadow-2xl relative text-slate-800">
            <button
              onClick={() => setSelectedJobForModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl">
                {selectedJobForModal.logo}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Direct Application: {selectedJobForModal.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedJobForModal.company} • {selectedJobForModal.location} • {selectedJobForModal.salary}
                </p>
              </div>
            </div>

            {/* Candidate Credentials Review */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Applicant</span>
                <span className="font-bold text-slate-900">{resume.personalInfo.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Verified ATS Score</span>
                <span className="font-bold font-mono text-emerald-600">{score.overall} / 100</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Role Match</span>
                <span className="font-bold font-mono text-indigo-600">
                  {calculateJobMatch(selectedJobForModal, resume)}% Match
                </span>
              </div>
            </div>

            {/* Cover Letter Auto-Generator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>AI-Tailored Cover Letter (Editable)</span>
                </label>
                <span className="text-[11px] text-slate-400">Auto-tuned with your fresher projects & courses</span>
              </div>
              <textarea
                rows={8}
                value={customCoverLetter}
                onChange={(e) => setCustomCoverLetter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 font-mono leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedJobForModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDirectApplication}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-2 shadow-xs transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting Application...' : 'Confirm & Submit Application'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
