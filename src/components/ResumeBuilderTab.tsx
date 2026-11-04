import React, { useState } from 'react';
import { ResumeData, ScoreBreakdown, ActiveTab } from '../types';
import { exportResumeToPdf } from '../utils/pdfGenerator';
import { 
  Download, 
  Sparkles, 
  Plus, 
  Edit3, 
  Eye, 
  Briefcase, 
  ArrowRight,
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from 'lucide-react';

interface ResumeBuilderTabProps {
  resume: ResumeData;
  score: ScoreBreakdown;
  initialScore: number;
  onUpdateResume: (updated: ResumeData) => void;
  setActiveTab: (tab: ActiveTab) => void;
  completedCoursesCount: number;
}

export const ResumeBuilderTab: React.FC<ResumeBuilderTabProps> = ({
  resume,
  score,
  initialScore,
  onUpdateResume,
  setActiveTab,
  completedCoursesCount
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'edit'>('preview');
  const [template, setTemplate] = useState<'modern' | 'classic'>('modern');
  const [isExporting, setIsExporting] = useState(false);

  // Form state for edits
  const [editResume, setEditResume] = useState<ResumeData>(resume);
  const [newSkillInput, setNewSkillInput] = useState('');

  // Keep local edit state in sync if parent changes
  React.useEffect(() => {
    setEditResume(resume);
  }, [resume]);

  const handleSaveEdits = () => {
    onUpdateResume(editResume);
    setViewMode('preview');
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    await exportResumeToPdf('resume-document-canvas', editResume.personalInfo.fullName);
    setIsExporting(false);
  };

  const handleAddSkill = (category: 'technical' | 'frameworks' | 'tools') => {
    if (!newSkillInput.trim()) return;
    const updated = { ...editResume };
    if (!updated.skills[category].includes(newSkillInput.trim())) {
      updated.skills[category].push(newSkillInput.trim());
      setEditResume(updated);
      onUpdateResume(updated);
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (category: 'technical' | 'frameworks' | 'tools', skillToRemove: string) => {
    const updated = { ...editResume };
    updated.skills[category] = updated.skills[category].filter(s => s !== skillToRemove);
    setEditResume(updated);
    onUpdateResume(updated);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800">
      {/* Top Banner: Auto-Update Status & Score Elevation */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-50/90 via-white to-blue-50/90 border border-indigo-100 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Auto-Generated & Course-Enhanced Resume</span>
            </span>
            {completedCoursesCount > 0 && (
              <span className="text-xs font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 font-bold">
                +{completedCoursesCount} Courses & Capstones Injected
              </span>
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Live Resume Customizer & ATS Preview
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Your fresher resume dynamically evolves as you complete curriculum milestones. Modify any section in real-time, inspect before-and-after score gains, and apply for high-paying roles with 1 click.
          </p>
        </div>

        {/* Score Comparison Pill */}
        <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Initial ATS</span>
            <span className="text-lg font-mono font-bold text-slate-400">{initialScore}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-500" />
          <div className="text-center">
            <span className="text-[10px] text-emerald-700 block uppercase font-bold">Optimized ATS</span>
            <span className="text-2xl font-mono font-extrabold text-emerald-600">
              {score.overall}
            </span>
          </div>
          <div className="border-l border-slate-200 pl-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold block">
              +{score.overall - initialScore >= 0 ? score.overall - initialScore : 0} PTS
            </span>
          </div>
        </div>
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
        {/* View Toggle */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'preview'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Document Preview</span>
          </button>
          <button
            onClick={() => setViewMode('edit')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'edit'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Modify Data</span>
          </button>
        </div>

        {/* Template Style Toggle */}
        {viewMode === 'preview' && (
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-semibold">Layout Style:</span>
            <button
              onClick={() => setTemplate('modern')}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                template === 'modern'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              Modern Tech
            </button>
            <button
              onClick={() => setTemplate('classic')}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                template === 'classic'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              Classic ATS Executive
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold text-slate-700 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-indigo-600" />
            <span>{isExporting ? 'Generating PDF...' : 'Download ATS PDF'}</span>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            <Briefcase className="w-4 h-4" />
            <span>Directly Apply for Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area: Preview vs Edit */}
      {viewMode === 'preview' ? (
        /* Formatted A4 Resume Document Preview */
        <div className="flex justify-center">
          <div
            id="resume-document-canvas"
            className={`w-full max-w-4xl p-8 sm:p-12 shadow-md transition-all ${
              template === 'modern'
                ? 'bg-white text-slate-900 border border-slate-200 rounded-2xl'
                : 'bg-white text-slate-900 border border-slate-300 rounded-none'
            }`}
            style={{ minHeight: '1050px', fontFamily: 'Inter, sans-serif' }}
          >
            {/* Document Header */}
            <header className="border-b-2 border-slate-900 pb-5 mb-6">
              <h1 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900">
                {editResume.personalInfo.fullName}
              </h1>
              <p className="text-base font-bold text-indigo-700 mt-1">
                {editResume.headline}
              </p>

              {/* Contact Strip */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-3 font-medium">
                {editResume.personalInfo.email && (
                  <span className="flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{editResume.personalInfo.email}</span>
                  </span>
                )}
                {editResume.personalInfo.phone && (
                  <span className="flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{editResume.personalInfo.phone}</span>
                  </span>
                )}
                {editResume.personalInfo.location && (
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{editResume.personalInfo.location}</span>
                  </span>
                )}
                {editResume.personalInfo.linkedin && (
                  <span className="flex items-center space-x-1 text-indigo-700">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{editResume.personalInfo.linkedin.replace('https://', '')}</span>
                  </span>
                )}
                {editResume.personalInfo.github && (
                  <span className="flex items-center space-x-1 text-slate-800">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{editResume.personalInfo.github.replace('https://', '')}</span>
                  </span>
                )}
              </div>
            </header>

            {/* Summary */}
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Professional Profile
              </h2>
              <p className="text-xs leading-relaxed text-slate-700">
                {editResume.summary}
              </p>
            </section>

            {/* Technical Skills */}
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Core Technical Competencies
              </h2>
              <div className="space-y-1.5 text-xs text-slate-800">
                <div>
                  <strong className="text-slate-900">Languages & Core: </strong>
                  <span>{editResume.skills.technical.join(', ')}</span>
                </div>
                <div>
                  <strong className="text-slate-900">Frameworks & Libraries: </strong>
                  <span>{editResume.skills.frameworks.join(', ')}</span>
                </div>
                <div>
                  <strong className="text-slate-900">Tools, Cloud & DevOps: </strong>
                  <span>{editResume.skills.tools.join(', ')}</span>
                </div>
              </div>
            </section>

            {/* Work Experience */}
            {editResume.experience.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
                  Professional Experience / Internships
                </h2>
                <div className="space-y-4">
                  {editResume.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline text-xs">
                        <div>
                          <strong className="text-slate-900 text-sm font-bold">{exp.role}</strong>
                          <span className="text-slate-600 font-semibold"> • {exp.company}</span>
                        </div>
                        <span className="text-slate-500 font-medium">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate} | {exp.location}
                        </span>
                      </div>
                      <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-slate-700 leading-normal">
                        {exp.highlights.map((hl, hIdx) => (
                          <li key={hIdx}>{hl}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Portfolio & Capstone Projects */}
            {editResume.projects.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3">
                  Key Technical & Capstone Projects
                </h2>
                <div className="space-y-4">
                  {editResume.projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline text-xs">
                        <strong className="text-slate-900 text-sm font-bold">{proj.title}</strong>
                        <span className="text-indigo-800 font-mono text-[11px] font-semibold">
                          [{proj.techStack.join(', ')}]
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-0.5">{proj.description}</p>
                      {proj.highlights && proj.highlights.length > 0 && (
                        <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-slate-600">
                          {proj.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Verified Certifications */}
            {editResume.certifications.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Verified Certifications & Accreditations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {editResume.certifications.map((cert) => (
                    <div key={cert.id} className="border-l-2 border-indigo-600 pl-2">
                      <p className="font-bold text-slate-900">{cert.name}</p>
                      <p className="text-[11px] text-slate-500">{cert.issuer} • {cert.date}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {editResume.education.length > 0 && (
              <section className="mb-2">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Education & Academic Credentials
                </h2>
                <div className="space-y-2">
                  {editResume.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline text-xs">
                      <div>
                        <strong className="text-slate-900 font-bold">{edu.degree}</strong>
                        <span className="text-slate-600 font-medium">, {edu.institution}</span>
                      </div>
                      <span className="text-slate-500 font-medium">{edu.graduationYear}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      ) : (
        /* Interactive Data Modifier Form */
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Edit Fresher Resume Data</h3>
              <p className="text-xs text-slate-500">Modifications immediately update the ATS score analysis.</p>
            </div>
            <button
              onClick={handleSaveEdits}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
            >
              Save & Switch to Preview
            </button>
          </div>

          {/* Personal Info Fields */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700">Personal Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editResume.personalInfo.fullName}
                  onChange={(e) => {
                    const updated = { ...editResume, personalInfo: { ...editResume.personalInfo, fullName: e.target.value } };
                    setEditResume(updated);
                    onUpdateResume(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editResume.personalInfo.email}
                  onChange={(e) => {
                    const updated = { ...editResume, personalInfo: { ...editResume.personalInfo, email: e.target.value } };
                    setEditResume(updated);
                    onUpdateResume(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={editResume.personalInfo.phone}
                  onChange={(e) => {
                    const updated = { ...editResume, personalInfo: { ...editResume.personalInfo, phone: e.target.value } };
                    setEditResume(updated);
                    onUpdateResume(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editResume.personalInfo.location}
                  onChange={(e) => {
                    const updated = { ...editResume, personalInfo: { ...editResume.personalInfo, location: e.target.value } };
                    setEditResume(updated);
                    onUpdateResume(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={editResume.personalInfo.linkedin || ''}
                  onChange={(e) => {
                    const updated = { ...editResume, personalInfo: { ...editResume.personalInfo, linkedin: e.target.value } };
                    setEditResume(updated);
                    onUpdateResume(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={editResume.personalInfo.github || ''}
                  onChange={(e) => {
                    const updated = { ...editResume, personalInfo: { ...editResume.personalInfo, github: e.target.value } };
                    setEditResume(updated);
                    onUpdateResume(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Headline & Summary */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700">Headline & Summary</h4>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Headline</label>
              <input
                type="text"
                value={editResume.headline}
                onChange={(e) => {
                  const updated = { ...editResume, headline: e.target.value };
                  setEditResume(updated);
                  onUpdateResume(updated);
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Summary</label>
              <textarea
                rows={3}
                value={editResume.summary}
                onChange={(e) => {
                  const updated = { ...editResume, summary: e.target.value };
                  setEditResume(updated);
                  onUpdateResume(updated);
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Quick Skill Modifier */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700">Manage Technical Skills</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add custom skill (e.g. Next.js, Docker, DSA, Kubernetes)..."
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddSkill('technical');
                }}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => handleAddSkill('technical')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white text-xs font-bold flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {editResume.skills.technical.map((sk) => (
                <span
                  key={sk}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold"
                >
                  <span>{sk}</span>
                  <button
                    onClick={() => handleRemoveSkill('technical', sk)}
                    className="text-slate-400 hover:text-rose-600 font-bold ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
