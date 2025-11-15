import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Mic, FileEdit, Gamepad2, Presentation } from 'lucide-react';

// Lazy load components to prevent loading issues
const AIToolsHome = React.lazy(() => import('./AIToolsHome'));
const SpeakSmart = React.lazy(() => import('./SpeakSmart'));
const MathMentor = React.lazy(() => import('./MathMentor'));
const WriteRight = React.lazy(() => import('./WriteRight'));
const MindMaze = React.lazy(() => import('./MindMaze'));
const PitchDeckCreator = React.lazy(() => import('./PitchDeckCreator'));

// Simple fallback component
function AIToolsSimple() {
  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <Sparkles className="h-16 w-16 text-purple-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Tools</h1>
        <p className="text-gray-600">Enhance your learning with AI-powered tools</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Mic, name: 'SpeakSmart', desc: 'Public Speaking Coach', path: 'speak-smart' },
          { icon: Brain, name: 'MathMentor', desc: 'Math Problem Solver', path: 'math-mentor' },
          { icon: FileEdit, name: 'WriteRight', desc: 'Writing Assistant', path: 'write-right' },
          { icon: Gamepad2, name: 'MindMaze', desc: 'Logic Puzzles', path: 'mind-maze' },
          { icon: Presentation, name: 'PitchDeck', desc: 'Presentation Creator', path: 'pitch-deck' }
        ].map((tool) => (
          <div key={tool.path} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <tool.icon className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
            <p className="text-gray-600 mb-4">{tool.desc}</p>
            <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
              Launch Tool
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AITools() {
  const location = useLocation();
  
  console.log('AITools component rendering at path:', location.pathname);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Debug indicator */}
      <div className="bg-green-500 text-white p-2 text-center text-sm">
        ✅ AI Tools Loaded Successfully - Path: {location.pathname}
      </div>
      
      <React.Suspense fallback={
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Loading AI Tools...</p>
          </div>
        </div>
      }>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <Routes>
            <Route index element={<AIToolsHome />} />
            <Route path="speak-smart/*" element={<SpeakSmart />} />
            <Route path="math-mentor/*" element={<MathMentor />} />
            <Route path="write-right/*" element={<WriteRight />} />
            <Route path="mind-maze/*" element={<MindMaze />} />
            <Route path="pitch-deck/*" element={<PitchDeckCreator />} />
            <Route path="simple" element={<AIToolsSimple />} />
            <Route path="*" element={<Navigate to="/dashboard/ai-tools" replace />} />
          </Routes>
        </motion.div>
      </React.Suspense>
    </div>
  );
}