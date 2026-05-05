import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX, Sparkles, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { askTutor } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'tutor';
  text: string;
}

export const TutorPanel: React.FC<{ context: string }> = ({ context }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'tutor', text: "Hello! I am your ISQM 2 Voice Tutor. Ask me anything about ISQM 2! \n\n ሰላም! እኔ የእርስዎ ISQM 2 ድምጽ አስተማሪ ነኝ። ስለ ISQM 2 ማንኛውንም ጥያቄ ይጠይቁኝ!" }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Speech Recognition Setup
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US'; // Amharic might not be well supported in all browsers for native STT

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel previous speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      // Try to detect English parts for better pronunciation
      utterance.lang = 'en-US'; 
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await askTutor(userMsg, context);
      setMessages(prev => [...prev, { role: 'tutor', text: response }]);
      // We don't auto-speak everything to avoid annoyance, user can click a button
    } catch (err) {
      setMessages(prev => [...prev, { role: 'tutor', text: "Sorry, I encountered an error. / ይቅርታ፣ ችግር አጋጥሞኛል።" }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[500px] border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xl">
      <div className="bg-indigo-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="text-yellow-300 w-5 h-5" />
          <h3 className="text-white font-bold">AI Voice Tutor / ድምጽ አስተማሪ</h3>
        </div>
        <button onClick={() => window.speechSynthesis.cancel()} className="text-white/80 hover:text-white">
          <VolumeX className="w-5 h-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white border border-gray-100 shadow-sm rounded-tl-none'
            }`}>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
              {msg.role === 'tutor' && (
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => speak(msg.text)}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-xs font-bold"
                  >
                    <Volume2 className="w-3 h-3" /> Listen / አድምጥ
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {/* Voice Instructions */}
        {messages.length === 1 && (
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 mb-4">
            <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Info className="w-3 h-3" /> Voice Commands / የድምጽ ትዕዛዞች
            </p>
            <ul className="text-[11px] space-y-1 text-amber-900 font-medium list-disc ml-4">
              <li>Say "Tell me about EQR" / "ስለ EQR ንገረኝ" በሉ</li>
              <li>Say "What is ISQM 2?" / "ISQM 2 ምንድን ነው?" በሉ</li>
            </ul>
            <p className="text-[10px] mt-2 text-amber-700 italic underline">Note: Tap the mic icon to start speaking.</p>
          </div>
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <button 
          onClick={toggleListening}
          className={`p-2 rounded-full transition-colors ${
            isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title={isListening ? "Stop listening" : "Start voice recognition"}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask anything... / ይጠይቁ..."
          className="flex-1 bg-gray-100 border-none rounded-full px-4 text-sm focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
