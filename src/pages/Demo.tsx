import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Rocket, Code, Eye, RefreshCw, Download, Share2, Zap } from 'lucide-react';
import { generateAIResponse } from '../lib/openai';

// Pre-built templates for instant demo
const templates = [
  {
    id: 'bakery',
    name: '🧁 My Bakery',
    prompt: 'Create a colorful, fun website for a kid\'s bakery with cupcakes, cookies, and prices',
    icon: '🧁'
  },
  {
    id: 'lemonade',
    name: '🍋 Lemonade Stand',
    prompt: 'Create a bright, cheerful website for a lemonade stand business',
    icon: '🍋'
  },
  {
    id: 'pet-sitting',
    name: '🐕 Pet Sitting',
    prompt: 'Create a friendly website for a kids pet sitting service with pricing',
    icon: '🐕'
  },
  {
    id: 'art-shop',
    name: '🎨 Art Shop',
    prompt: 'Create a creative website for selling handmade art and crafts',
    icon: '🎨'
  },
  {
    id: 'tutoring',
    name: '📚 Tutoring Service',
    prompt: 'Create a professional website for a student tutoring business',
    icon: '📚'
  },
  {
    id: 'game-dev',
    name: '🎮 Game Creator',
    prompt: 'Create an exciting website showcasing game development projects',
    icon: '🎮'
  }
];

// Fallback templates (work without OpenAI)
const fallbackTemplates: Record<string, string> = {
  'bakery': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sweet Treats Bakery</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Comic Sans MS', cursive;
            background: linear-gradient(135deg, #FFE5E5 0%, #FFF5E5 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        header {
            text-align: center;
            margin-bottom: 40px;
        }
        h1 {
            font-size: 3em;
            color: #FF69B4;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 10px;
        }
        .tagline {
            font-size: 1.2em;
            color: #FF1493;
            font-style: italic;
        }
        .products {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }
        .product-card {
            background: linear-gradient(135deg, #FFB6C1 0%, #FFE4E1 100%);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            transition: transform 0.3s ease;
            box-shadow: 0 5px 15px rgba(255,105,180,0.2);
        }
        .product-card:hover {
            transform: translateY(-10px);
        }
        .product-icon {
            font-size: 4em;
            margin-bottom: 15px;
        }
        .product-name {
            font-size: 1.5em;
            color: #FF1493;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .product-price {
            font-size: 1.8em;
            color: #FF69B4;
            font-weight: bold;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
            color: white;
            padding: 15px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-size: 1.2em;
            font-weight: bold;
            margin-top: 30px;
            box-shadow: 0 10px 30px rgba(255,105,180,0.4);
            transition: transform 0.3s ease;
        }
        .cta-button:hover {
            transform: scale(1.05);
        }
        footer {
            text-align: center;
            margin-top: 40px;
            color: #FF69B4;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🧁 Sweet Treats Bakery 🧁</h1>
            <p class="tagline">Delicious Homemade Goodies Made with Love!</p>
        </header>

        <div class="products">
            <div class="product-card">
                <div class="product-icon">🧁</div>
                <div class="product-name">Cupcakes</div>
                <div class="product-price">$3.50</div>
            </div>
            <div class="product-card">
                <div class="product-icon">🍪</div>
                <div class="product-name">Cookies</div>
                <div class="product-price">$2.00</div>
            </div>
            <div class="product-card">
                <div class="product-icon">🍰</div>
                <div class="product-name">Birthday Cakes</div>
                <div class="product-price">$25.00</div>
            </div>
            <div class="product-card">
                <div class="product-icon">🥐</div>
                <div class="product-name">Pastries</div>
                <div class="product-price">$4.00</div>
            </div>
        </div>

        <div style="text-align: center;">
            <a href="#order" class="cta-button">Order Now! 🎉</a>
        </div>

        <footer>
            <p>Made by a Young Entrepreneur with ❤️</p>
            <p>Contact: mybakery@email.com</p>
        </footer>
    </div>
</body>
</html>`,
  
  'lemonade': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fresh Lemonade Stand</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #FFE66D 0%, #FFF9B0 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        h1 {
            font-size: 3.5em;
            color: #FFD700;
            text-align: center;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.2);
        }
        .hero {
            text-align: center;
            padding: 40px 0;
        }
        .hero-text {
            font-size: 1.5em;
            color: #FFA500;
            margin: 20px 0;
        }
        .menu {
            display: flex;
            justify-content: space-around;
            margin: 40px 0;
            flex-wrap: wrap;
        }
        .menu-item {
            background: linear-gradient(135deg, #FFEB3B 0%, #FFD700 100%);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            min-width: 200px;
            margin: 10px;
            box-shadow: 0 5px 15px rgba(255,215,0,0.3);
        }
        .menu-item h3 {
            color: #FF6F00;
            font-size: 1.8em;
            margin: 10px 0;
        }
        .price {
            font-size: 2em;
            color: #FFD700;
            font-weight: bold;
        }
        .order-btn {
            display: inline-block;
            background: #FFD700;
            color: #FF6F00;
            padding: 15px 50px;
            border-radius: 50px;
            text-decoration: none;
            font-size: 1.3em;
            font-weight: bold;
            margin-top: 30px;
            box-shadow: 0 5px 20px rgba(255,215,0,0.5);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="hero">
            <h1>🍋 Fresh Lemonade Stand 🍋</h1>
            <p class="hero-text">The Freshest Lemonade in Town!</p>
        </div>
        <div class="menu">
            <div class="menu-item">
                <div style="font-size: 3em;">🍋</div>
                <h3>Classic Lemonade</h3>
                <p class="price">$2.00</p>
            </div>
            <div class="menu-item">
                <div style="font-size: 3em;">🍓</div>
                <h3>Strawberry Lemonade</h3>
                <p class="price">$2.50</p>
            </div>
            <div class="menu-item">
                <div style="font-size: 3em;">🥤</div>
                <h3>Large Size</h3>
                <p class="price">$3.00</p>
            </div>
        </div>
        <div style="text-align: center;">
            <a href="#" class="order-btn">Buy Now! 🌟</a>
        </div>
    </div>
</body>
</html>`
};

export default function Demo() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [typingText, setTypingText] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Typing animation for code
  useEffect(() => {
    if (generatedCode && typingText.length < generatedCode.length) {
      const timeout = setTimeout(() => {
        setTypingText(generatedCode.slice(0, typingText.length + 50));
      }, 10);
      return () => clearTimeout(timeout);
    } else if (generatedCode) {
      setTypingText(generatedCode);
    }
  }, [generatedCode, typingText]);

  const generateWebsite = async (prompt: string, templateId?: string) => {
    setIsGenerating(true);
    setShowSuccessMessage(false);
    setTypingText('');

    try {
      // Check if we should use fallback
      if (templateId && fallbackTemplates[templateId]) {
        // Simulate AI thinking
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGeneratedCode(fallbackTemplates[templateId]);
        setShowSuccessMessage(true);
      } else {
        // Try OpenAI
        const aiPrompt = `Create a complete, beautiful, responsive HTML website with inline CSS for: ${prompt}

Requirements:
- Single HTML file with embedded CSS
- Colorful, kid-friendly design
- Use emojis and fun fonts
- Include gradient backgrounds
- Add hover effects
- Make it mobile responsive
- Include a call-to-action button
- Professional yet playful
- Use box-shadows and border-radius
- Complete <!DOCTYPE html> structure

Return ONLY the HTML code, no explanations.`;

        const response = await generateAIResponse(aiPrompt, 'Web Development');
        
        // Extract HTML if wrapped in markdown
        let code = response;
        if (code.includes('```html')) {
          code = code.split('```html')[1].split('```')[0].trim();
        } else if (code.includes('```')) {
          code = code.split('```')[1].split('```')[0].trim();
        }
        
        setGeneratedCode(code);
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error('Error generating website:', error);
      // Use fallback on error
      if (templateId && fallbackTemplates[templateId]) {
        setGeneratedCode(fallbackTemplates[templateId]);
      } else {
        setGeneratedCode(fallbackTemplates['bakery']);
      }
      setShowSuccessMessage(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTemplateClick = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id);
    setCustomPrompt(template.prompt);
    generateWebsite(template.prompt, template.id);
  };

  const handleCustomGenerate = () => {
    if (customPrompt.trim()) {
      generateWebsite(customPrompt);
    }
  };

  const downloadHTML = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-website.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-8 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-12 w-12 mr-3 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold">AI Website Builder</h1>
              <Wand2 className="h-12 w-12 ml-3 animate-bounce" />
            </div>
            <p className="text-xl md:text-2xl opacity-90">
              Watch AI Create Real Websites in Seconds! ✨
            </p>
            <p className="text-lg mt-2 opacity-80">
              This is what your child will learn to build at Orbit Student
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Template Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Rocket className="h-6 w-6 mr-2 text-purple-600" />
            Choose a Business Idea:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {templates.map((template) => (
              <motion.button
                key={template.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTemplateClick(template)}
                className={`p-6 rounded-xl font-semibold transition-all ${
                  selectedTemplate === template.id
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-2xl'
                    : 'bg-white text-gray-700 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="text-4xl mb-2">{template.icon}</div>
                <div className="text-sm">{template.name}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Custom Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Or Describe Your Own Website:
          </h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., 'Create a website for my dog walking business...'"
              className="flex-1 px-4 py-3 border-2 border-purple-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-200 outline-none text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleCustomGenerate()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCustomGenerate}
              disabled={isGenerating || !customPrompt.trim()}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <Wand2 className="h-12 w-12 text-purple-600 animate-bounce mr-3" />
                <Sparkles className="h-12 w-12 text-pink-600 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-2">
                AI is Building Your Website...
              </h3>
              <p className="text-purple-600">
                Just like magic! ✨ Watch it appear below!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccessMessage && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-xl p-6 text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <Rocket className="h-8 w-8 text-green-600 mr-2" />
                <h3 className="text-2xl font-bold text-green-800">
                  Website Created! 🎉
                </h3>
              </div>
              <p className="text-green-700 text-lg">
                Scroll down to see your live website! Your child can build this too!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Code and Preview Split View */}
        {generatedCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            {/* View Toggle */}
            <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowPreview(false)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center ${
                    !showPreview
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </button>
                <button
                  onClick={() => setShowPreview(true)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center ${
                    showPreview
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Live Preview
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={downloadHTML}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all flex items-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedCode);
                    alert('Code copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Copy
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="h-[600px] overflow-hidden">
              {showPreview ? (
                <iframe
                  srcDoc={generatedCode}
                  className="w-full h-full border-0"
                  title="Website Preview"
                  sandbox="allow-scripts"
                />
              ) : (
                <div className="h-full overflow-auto bg-gray-900 p-6">
                  <pre className="text-green-400 font-mono text-sm">
                    <code>{typingText}</code>
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        {generatedCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl p-8 md:p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Child Can Build This Too! 🚀
            </h2>
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              In our 180-day program, students learn to:
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl mb-3">💻</div>
                <h3 className="font-bold text-lg mb-2">Build Real Websites</h3>
                <p className="opacity-90">Create professional websites from scratch</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="font-bold text-lg mb-2">Master AI Tools</h3>
                <p className="opacity-90">Learn to use AI like a pro developer</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="font-bold text-lg mb-2">Launch Real Businesses</h3>
                <p className="opacity-90">Turn ideas into real products</p>
              </div>
            </div>
            <motion.a
              href="/#enrollment"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-12 py-4 bg-white text-purple-600 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
            >
              Enroll Your Child Now! 🎉
            </motion.a>
          </motion.div>
        )}

        {/* Empty State */}
        {!generatedCode && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6">🚀</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to See Magic? ✨
            </h3>
            <p className="text-xl text-gray-600">
              Click a template above or describe your dream website!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

