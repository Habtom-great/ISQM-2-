import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Award, 
  ChevronRight, 
  ChevronLeft, 
  Info,
  GraduationCap,
  MessageCircle,
  X,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ISQM2_CONTENT, PRACTICAL_EXAMPLES } from './data/content';
import { QuizSection } from './components/QuizSection';
import { TutorPanel } from './components/TutorPanel';

const CheckCircle2: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'lessons' | 'practice'>('lessons');
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [showTutor, setShowTutor] = useState(false);

  const currentSection = ISQM2_CONTENT[currentSectionIdx];

  const handleNext = () => {
    if (currentSectionIdx < ISQM2_CONTENT.length - 1) {
      setCurrentSectionIdx(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setActiveTab('practice');
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentSectionIdx > 0) {
      setCurrentSectionIdx(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight leading-none">ISQM 2 MASTER</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Educational Module</p>
            </div>
          </div>

          <nav className="hidden md:flex bg-gray-100 p-1 rounded-full">
            <button 
              onClick={() => setActiveTab('lessons')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'lessons' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              LESSONS
            </button>
            <button 
              onClick={() => setActiveTab('practice')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'practice' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              PRACTICE
            </button>
          </nav>

          <button 
            onClick={() => setShowTutor(!showTutor)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">{showTutor ? 'CLOSE TUTOR' : 'VOICE TUTOR'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'lessons' ? (
            <motion.div
              key="lessons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-[1fr_300px] gap-8"
            >
              <div className="space-y-8">
                {/* Lesson Header */}
                <div className="flex items-center gap-4 text-xs font-bold text-indigo-600 uppercase tracking-widest mb-12">
                   <div className="h-0.5 flex-1 bg-indigo-50"></div>
                   <span>Chapter {currentSectionIdx + 1} of {ISQM2_CONTENT.length}</span>
                   <div className="h-0.5 flex-1 bg-indigo-50"></div>
                </div>

                <div className="space-y-12">
                  <motion.div
                    key={currentSection.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4 pr-12">
                      {currentSection.titleEn}
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-12 flex items-start gap-3">
                      <span className="opacity-30">/</span> {currentSection.titleAm}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                          <Info className="w-4 h-4" />
                          <span className="text-[10px] uppercase font-black tracking-widest">English Explanation</span>
                        </div>
                        <div className="text-xl leading-relaxed text-gray-700 font-medium">
                          {currentSection.contentEn.split('\n').map((para, i) => (
                            <p key={i} className="mb-4">{para}</p>
                          ))}
                        </div>
                      </div>

                      <div className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100/50 relative">
                        <div className="flex items-center gap-2 text-indigo-400 mb-6">
                          <Info className="w-4 h-4" />
                          <span className="text-[10px] uppercase font-black tracking-widest italic">የአማርኛ ትርጉም</span>
                        </div>
                        <div className="text-xl leading-relaxed text-indigo-900 font-medium">
                          {currentSection.contentAm.split('\n').map((para, i) => (
                            <p key={i} className="mb-4">{para}</p>
                          ))}
                        </div>
                      </div>
                    </div>

                    {currentSection.isAdvanced && (
                      <div className="mt-12 bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-4">
                        <Award className="text-amber-600 w-6 h-6 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-black text-amber-800 uppercase tracking-widest mb-1">Advanced Concept</p>
                          <p className="text-amber-900 text-sm italic">This section contains technical details for experienced auditors.</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Practical Example */}
                {currentSectionIdx === ISQM2_CONTENT.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-16 bg-gray-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-indigo-200"
                  >
                    <div className="flex items-center gap-3 mb-8">
                       <BookOpen className="text-indigo-400 w-6 h-6" />
                       <span className="text-xs font-black uppercase tracking-[0.3em]">{PRACTICAL_EXAMPLES[0].titleEn}</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
                       <p className="text-lg opacity-80 leading-relaxed font-light">{PRACTICAL_EXAMPLES[0].contentEn}</p>
                       <p className="text-lg font-medium text-indigo-100 leading-relaxed">{PRACTICAL_EXAMPLES[0].contentAm}</p>
                    </div>
                  </motion.div>
                )}

                {/* Footer Nav */}
                <div className="flex justify-between items-center py-12 border-t border-gray-100 mt-12 mb-24">
                  <button 
                    onClick={handlePrev}
                    disabled={currentSectionIdx === 0}
                    className="flex items-center gap-2 group disabled:opacity-30"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:border-indigo-600 transition-all">
                      <ChevronLeft className="w-6 h-6 group-hover:text-indigo-600" />
                    </div>
                    <div className="text-left">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Previous</p>
                       <p className="text-sm font-bold">Back to start</p>
                    </div>
                  </button>

                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-3 group bg-indigo-600 text-white px-8 py-3 rounded-full hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-95"
                  >
                    <div className="text-right">
                       <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest opacity-70">Continue</p>
                       <p className="text-sm font-bold">{currentSectionIdx === ISQM2_CONTENT.length - 1 ? 'Go to Practice' : 'Next Chapter'}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Desktop Sidebar / Catalog */}
              <aside className="hidden lg:block space-y-6">
                <div className="sticky top-24">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Course Content</p>
                  <div className="space-y-1">
                    {ISQM2_CONTENT.map((section, idx) => (
                      <button
                        key={section.id}
                        onClick={() => setCurrentSectionIdx(idx)}
                        className={`w-full text-left p-4 rounded-2xl transition-all group ${
                          currentSectionIdx === idx 
                          ? 'bg-indigo-50 border-2 border-indigo-200 text-indigo-900' 
                          : 'bg-transparent border-2 border-transparent hover:bg-gray-50 text-gray-500'
                        }`}
                      >
                        <div className="flex gap-3">
                          <span className={`font-black text-xs ${currentSectionIdx === idx ? 'text-indigo-600' : 'text-gray-300'}`}>0{idx + 1}</span>
                          <span className="text-xs font-bold leading-tight">{section.titleEn.split('. ')[1]}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 text-center">Need help?</p>
                     <p className="text-xs text-gray-600 text-center mb-6">Ask our AI Tutor about ISQM 2 in English or Amharic.</p>
                     <button 
                        onClick={() => setShowTutor(true)}
                        className="w-full py-4 bg-white border border-gray-200 rounded-2xl text-xs font-black text-indigo-600 hover:border-indigo-600 transition-all flex items-center justify-center gap-2"
                     >
                       <MessageCircle className="w-4 h-4" /> ACTIVATE TUTOR
                     </button>
                  </div>
                </div>
              </aside>
            </motion.div>
          ) : (
            <motion.div
              key="practice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-16">
                 <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em] mb-2">Practice Mode</p>
                 <h2 className="text-4xl font-black mb-4">Quiz & Evaluation</h2>
                 <p className="text-gray-500 max-w-xl mx-auto">Test your knowledge of ISQM 2 standards in both English and Amharic. Complete all questions to see your final score.</p>
              </div>
              <QuizSection />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating AI Tutor Overlay */}
        <AnimatePresence>
          {showTutor && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] sm:w-[400px]"
            >
               <div className="relative group">
                  <div className="absolute -top-3 -right-3">
                    <button 
                      onClick={() => setShowTutor(false)}
                      className="bg-white p-2 rounded-full shadow-lg border border-gray-100 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <TutorPanel context={currentSection.contentEn + " " + currentSection.contentAm} />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Summary Footer */}
      <footer className="bg-gray-50 py-24 mt-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="w-16 h-1 bg-indigo-600 mx-auto mb-12"></div>
           <h4 className="text-2xl font-black mb-8 uppercase tracking-widest">Key Takeaways / ዋና ዋና ነጥቦች</h4>
           <div className="grid md:grid-cols-2 gap-12 text-left">
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm font-medium text-gray-700">ISQM 2 focuses on the individual engagement's quality review process.</p>
                 </div>
                 <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm font-medium text-gray-700">The reviewer must be eligible and objective.</p>
                 </div>
                 <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm font-medium text-gray-700">Reviews must be completed before the report is issued.</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm font-medium text-indigo-900 italic">ISQM 2 በየግል የሥራ ጥራት ግምገማ ሂደት ላይ ያተኩራል።</p>
                 </div>
                 <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm font-medium text-indigo-900 italic">ገምጋሚው ብቁ እና ገለልተኛ መሆን አለበት።</p>
                 </div>
                 <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm font-medium text-indigo-900 italic">ግምገማዎች ሪፖርቱ ከመውጣቱ በፊት መጠናቀቅ አለባቸው።</p>
                 </div>
              </div>
           </div>
           
           <div className="mt-20 pt-12 border-t border-gray-200">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em]">ISQM 2 Educational Module &copy; 2026</p>
           </div>
        </div>
      </footer>
    </div>
  );
}

