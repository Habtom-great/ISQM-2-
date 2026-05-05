import React, { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ_QUESTIONS } from '../data/content';

const Sparkles: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M3 5h4"/><path d="M21 17v4"/><path d="M19 19h4"/>
  </svg>
);

export const QuizSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === QUIZ_QUESTIONS[currentStep].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-xl mx-auto border border-indigo-100"
      >
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
        <h3 className="text-lg text-gray-600 mb-6 font-medium">የምዘናው ጥያቄዎች ተጠናቀዋል!</h3>
        <p className="text-4xl font-black text-indigo-600 mb-2">{score} / {QUIZ_QUESTIONS.length}</p>
        <p className="text-gray-500 mb-8">
          {score === QUIZ_QUESTIONS.length ? "Excellent work! / እጅግ በጣም ጥሩ!" : "Keep learning! / ማጥናቱን ይቀጥሉ!"}
        </p>
        <button 
          onClick={resetQuiz}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors mx-auto font-bold uppercase tracking-wider text-sm"
        >
          <RotateCcw className="w-4 h-4" /> Try Again / እንደገና ሞክር
        </button>
      </motion.div>
    );
  }

  const question = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
          <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-500" 
              style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900">{question.questionEn}</h2>
        <h3 className="text-lg md:text-xl font-medium text-indigo-600 mb-8">{question.questionAm}</h3>
      </div>

      <div className="space-y-3">
        {question.optionsEn.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-2xl text-left border-2 transition-all flex items-center justify-between ${
              isAnswered
                ? idx === question.correctAnswer
                  ? 'border-green-500 bg-green-50 text-green-900'
                  : idx === selectedOption
                    ? 'border-red-500 bg-red-50 text-red-900'
                    : 'border-gray-100 text-gray-400'
                : 'border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 text-gray-700'
            }`}
          >
            <div className="flex flex-col">
              <span className="font-semibold">{opt}</span>
              <span className="text-sm opacity-80">{question.optionsAm[idx]}</span>
            </div>
            {isAnswered && idx === question.correctAnswer && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
            {isAnswered && idx === selectedOption && idx !== question.correctAnswer && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white border-2 border-indigo-100 p-6 rounded-2xl shadow-sm"
          >
            <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Explanation / ትንታኔ
            </h4>
            <p className="text-gray-700 mb-1">{question.explanationEn}</p>
            <p className="text-indigo-600 font-medium">{question.explanationAm}</p>
            
            <button
              onClick={nextQuestion}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-bold"
            >
              Next / ቀጣይ <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
