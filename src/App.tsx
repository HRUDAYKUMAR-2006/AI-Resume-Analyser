import React, { useState, useMemo } from 'react';
import { ActiveTab, ResumeData, Course, JobListing, User } from './types';
import { SAMPLE_RESUMES } from './data/sampleResumes';
import { DEVELOPMENT_PATHS, dsaCapstoneCourse } from './data/developmentPaths';
import { INITIAL_JOBS } from './data/jobsData';
import { calculateResumeScore } from './utils/scoreCalculator';
import { injectCompletedCourseIntoResume } from './utils/resumeParser';
import { fireSuperConfetti } from './utils/confetti';
import { Navbar } from './components/Navbar';
import { ResumeAnalyzerTab } from './components/ResumeAnalyzerTab';
import { DevelopmentPathsTab } from './components/DevelopmentPathsTab';
import { CoursesTab } from './components/CoursesTab';
import { ResumeBuilderTab } from './components/ResumeBuilderTab';
import { JobApplyTab } from './components/JobApplyTab';
import { AuthModal } from './components/AuthModal';
import { AuthPage } from './components/AuthPage';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('analyzer');

  // Default sample resume is index 0: Computer Science Fresher Graduate
  const [resume, setResume] = useState<ResumeData>(() => SAMPLE_RESUMES[0].resume);
  const [initialScore, setInitialScore] = useState<number>(() => SAMPLE_RESUMES[0].score);
  const [selectedPathId, setSelectedPathId] = useState<string>('fullstack');

  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState<string>('');
  
  // Track courses state per path
  const [coursesState, setCoursesState] = useState<{ [pathId: string]: Course[] }>(() => {
    const initial: { [pathId: string]: Course[] } = {};
    DEVELOPMENT_PATHS.forEach(p => {
      initial[p.id] = JSON.parse(JSON.stringify(p.courses));
    });
    return initial;
  });

  // Track DSA Capstone course state
  const [dsaCourse, setDsaCourse] = useState<Course>(() => JSON.parse(JSON.stringify(dsaCapstoneCourse)));

  // Track jobs state
  const [jobs, setJobs] = useState<JobListing[]>(() => INITIAL_JOBS);

  // Recalculate dynamic ATS score whenever resume changes
  const score = useMemo(() => {
    return calculateResumeScore(resume);
  }, [resume]);

  // Current selected path object
  const currentPath = useMemo(() => {
    return DEVELOPMENT_PATHS.find(p => p.id === selectedPathId) || DEVELOPMENT_PATHS[0];
  }, [selectedPathId]);

  const currentPathCourses = coursesState[selectedPathId] || currentPath.courses;

  // Handle switching sample resumes
  const handleSelectSampleResume = (sampleId: string) => {
    const found = SAMPLE_RESUMES.find(s => s.id === sampleId);
    if (found) {
      setResume(JSON.parse(JSON.stringify(found.resume)));
      setInitialScore(found.score);
    }
  };

  // Handle manual or parsed resume update
  const handleUpdateResume = (newResume: ResumeData) => {
    setResume(newResume);
  };

  // Handle Course Completion & Auto-Injection into Resume
  const handleCompleteCourse = (course: Course) => {
    // 1. Mark course as completed
    if (course.isFinalDsaCourse) {
      setDsaCourse(prev => ({
        ...prev,
        status: 'completed',
        completedDate: new Date().toISOString()
      }));
    } else {
      setCoursesState(prev => {
        const pathCourses = prev[selectedPathId] || [];
        const updated = pathCourses.map(c => 
          c.id === course.id ? { ...c, status: 'completed' as const, completedDate: new Date().toISOString() } : c
        );
        return { ...prev, [selectedPathId]: updated };
      });
    }

    // 2. Auto-inject newly learned skills, capstone project, and verified cert into the resume!
    const updatedResume = injectCompletedCourseIntoResume(resume, course);
    setResume(updatedResume);

    // 3. Fire celebration confetti
    fireSuperConfetti();
  };

  // Handle 1-click job direct apply
  const handleApplyJob = (jobId: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          appliedStatus: 'applied',
          appliedAt: new Date().toISOString()
        };
      }
      return j;
    }));
  };

  const handleRequireAuth = (reason: string) => {
    setAuthModalReason(reason);
    setIsAuthModalOpen(true);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Completed courses count
  const completedCoursesCount = 
    currentPathCourses.filter(c => c.status === 'completed').length + 
    (dsaCourse.status === 'completed' ? 1 : 0);

  const totalCoursesCount = currentPathCourses.length + 1;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        score={score}
        resume={resume}
        onSelectSampleResume={handleSelectSampleResume}
        completedCoursesCount={completedCoursesCount}
        totalCoursesCount={totalCoursesCount}
        user={user}
        onOpenAuthModal={(reason) => handleRequireAuth(reason || 'access course progress and direct job applications')}
        onLogout={handleLogout}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'analyzer' && (
          <ResumeAnalyzerTab
            resume={resume}
            score={score}
            onUpdateResume={handleUpdateResume}
            setActiveTab={setActiveTab}
            onSelectSampleResume={handleSelectSampleResume}
          />
        )}

        {activeTab === 'paths' && (
          <DevelopmentPathsTab
            resume={resume}
            selectedPathId={selectedPathId}
            onSelectPath={setSelectedPathId}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesTab
            currentPath={currentPath}
            courses={currentPathCourses}
            finalCourse={dsaCourse}
            onCompleteCourse={handleCompleteCourse}
            setActiveTab={setActiveTab}
            user={user}
            onRequireAuth={handleRequireAuth}
          />
        )}

        {activeTab === 'builder' && (
          <ResumeBuilderTab
            resume={resume}
            score={score}
            initialScore={initialScore}
            onUpdateResume={handleUpdateResume}
            setActiveTab={setActiveTab}
            completedCoursesCount={completedCoursesCount}
          />
        )}

        {activeTab === 'jobs' && (
          <JobApplyTab
            jobs={jobs}
            resume={resume}
            score={score}
            selectedPathId={selectedPathId}
            onApplyJob={handleApplyJob}
            user={user}
            onRequireAuth={handleRequireAuth}
          />
        )}

        {activeTab === 'login' && (
          <AuthPage
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Authentication Prompt Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        reason={authModalReason}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>
          AI Resume Analyser & Career Catalyst • Tailored for Fresher Candidates & Software Engineering Aspirants
        </p>
      </footer>
    </div>
  );
}

export default App;
