import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2, Trophy, Star, Zap, ArrowLeft, Play, RefreshCw,
  Crown, Coins, ShoppingCart, TrendingUp, Brain, Timer,
  Heart, Sparkles, Target, Gift, ChevronRight, Lock, Award
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// GAME ZONE — Fun Playable Games That Teach Business Skills
// ═══════════════════════════════════════════════════════════

interface GameConfig {
  id: string;
  name: string;
  emoji: string;
  description: string;
  skill: string;
  color: string;
  gradient: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
}

const GAMES: GameConfig[] = [
  { id: 'lemonade', name: 'Lemonade Tycoon', emoji: '🍋', description: 'Run a lemonade stand! Set prices, manage stock & weather.', skill: 'Pricing & Profit', color: '#FBBF24', gradient: 'from-yellow-400 to-amber-500', difficulty: 'Easy', xpReward: 50 },
  { id: 'catch-coins', name: 'Coin Catcher', emoji: '🪙', description: 'Catch falling coins & dodge taxes! How rich can you get?', skill: 'Quick Thinking', color: '#F59E0B', gradient: 'from-amber-400 to-orange-500', difficulty: 'Easy', xpReward: 30 },
  { id: 'word-hustle', name: 'Word Hustle', emoji: '📝', description: 'Unscramble business words before time runs out!', skill: 'Business Vocabulary', color: '#3B82F6', gradient: 'from-blue-400 to-indigo-500', difficulty: 'Medium', xpReward: 40 },
  { id: 'stock-surfer', name: 'Stock Surfer', emoji: '📈', description: 'Buy low, sell high! Ride the stock market waves.', skill: 'Market Timing', color: '#10B981', gradient: 'from-emerald-400 to-teal-500', difficulty: 'Medium', xpReward: 60 },
  { id: 'brand-match', name: 'Brand Memory', emoji: '🧠', description: 'Match famous logos to their companies. Train your memory!', skill: 'Brand Recognition', color: '#8B5CF6', gradient: 'from-violet-400 to-purple-500', difficulty: 'Easy', xpReward: 35 },
  { id: 'pitch-type', name: 'Pitch Racer', emoji: '⚡', description: 'Type your elevator pitch as fast as you can!', skill: 'Communication Speed', color: '#EC4899', gradient: 'from-pink-400 to-rose-500', difficulty: 'Hard', xpReward: 70 },
  { id: 'quiz-show', name: 'CEO Quiz Show', emoji: '🎤', description: 'Who Wants to Be a Millionaire — business edition!', skill: 'Business IQ', color: '#6366F1', gradient: 'from-indigo-400 to-blue-600', difficulty: 'Medium', xpReward: 80 },
  { id: 'budget-boss', name: 'Budget Boss', emoji: '💳', description: 'Manage a monthly budget. Will you save or go broke?', skill: 'Financial Literacy', color: '#14B8A6', gradient: 'from-teal-400 to-cyan-500', difficulty: 'Medium', xpReward: 55 },
  { id: 'emoji-startup', name: 'Emoji Startup', emoji: '🚀', description: 'Combine random emojis to pitch a wild startup idea!', skill: 'Creative Thinking', color: '#F97316', gradient: 'from-orange-400 to-red-500', difficulty: 'Easy', xpReward: 45 },
  { id: 'space-trader', name: 'Space Trader', emoji: '🛸', description: 'Buy & sell goods across planets. Master supply & demand!', skill: 'Economics', color: '#06B6D4', gradient: 'from-cyan-400 to-blue-500', difficulty: 'Hard', xpReward: 75 },
];

// ═══ Game State Types ═══
interface GameScore {
  gameId: string;
  highScore: number;
  timesPlayed: number;
  totalXP: number;
}

function loadScores(): Record<string, GameScore> {
  try {
    return JSON.parse(localStorage.getItem('orbit_game_scores') || '{}');
  } catch { return {}; }
}
function saveScore(gameId: string, score: number, xp: number) {
  const scores = loadScores();
  const existing = scores[gameId] || { gameId, highScore: 0, timesPlayed: 0, totalXP: 0 };
  existing.highScore = Math.max(existing.highScore, score);
  existing.timesPlayed += 1;
  existing.totalXP += xp;
  scores[gameId] = existing;
  localStorage.setItem('orbit_game_scores', JSON.stringify(scores));
}

// ═══════════════════════════════════════════════
// GAME 1: LEMONADE TYCOON
// ═══════════════════════════════════════════════
function LemonadeTycoon({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) {
  const [day, setDay] = useState(1);
  const [money, setMoney] = useState(20);
  const [cups, setCups] = useState(0);
  const [price, setPrice] = useState(2);
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy'>('sunny');
  const [log, setLog] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [buyAmount, setBuyAmount] = useState(10);

  const COST_PER_CUP = 0.50;
  const MAX_DAYS = 7;

  const weathers: ('sunny' | 'cloudy' | 'rainy')[] = ['sunny', 'cloudy', 'rainy'];
  const weatherEmoji = { sunny: '☀️', cloudy: '⛅', rainy: '🌧️' };
  const weatherMultiplier = { sunny: 1.5, cloudy: 1.0, rainy: 0.4 };

  const buySupplies = () => {
    const cost = buyAmount * COST_PER_CUP;
    if (cost > money) return;
    setMoney(m => +(m - cost).toFixed(2));
    setCups(c => c + buyAmount);
  };

  const sellDay = () => {
    const demandBase = Math.floor(Math.random() * 15) + 5;
    const priceEffect = price <= 1 ? 1.8 : price <= 2 ? 1.3 : price <= 3 ? 1.0 : price <= 4 ? 0.6 : 0.3;
    const demand = Math.floor(demandBase * weatherMultiplier[weather] * priceEffect);
    const sold = Math.min(demand, cups);
    const revenue = +(sold * price).toFixed(2);
    const unsold = cups - sold;

    setMoney(m => +(m + revenue).toFixed(2));
    setCups(unsold);
    setLog(l => [...l, `Day ${day}: ${weatherEmoji[weather]} Sold ${sold} cups @ $${price} = $${revenue}`]);

    if (day >= MAX_DAYS) {
      setGameOver(true);
      onScore(Math.round(money + revenue));
    } else {
      setDay(d => d + 1);
      setWeather(weathers[Math.floor(Math.random() * 3)]);
    }
  };

  if (gameOver) {
    return (
      <GameOverScreen
        title="Lemonade Tycoon"
        emoji="🍋"
        score={Math.round(money)}
        label="Final Cash"
        prefix="$"
        onBack={onBack}
        onRetry={() => { setDay(1); setMoney(20); setCups(0); setPrice(2); setLog([]); setGameOver(false); setWeather('sunny'); }}
      >
        <div className="max-h-40 overflow-y-auto text-left bg-white/[0.03] rounded-xl p-3 mt-4">
          {log.map((l, i) => <p key={i} className="text-gray-400 text-xs">{l}</p>)}
        </div>
      </GameOverScreen>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <GameHeader title="🍋 Lemonade Tycoon" subtitle={`Day ${day} of ${MAX_DAYS}`} onBack={onBack} />
      
      {/* Weather + Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatBox emoji={weatherEmoji[weather]} label="Weather" value={weather} />
        <StatBox emoji="💰" label="Cash" value={`$${money.toFixed(2)}`} />
        <StatBox emoji="🥤" label="Cups" value={`${cups}`} />
      </div>

      {/* Buy Supplies */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mb-4">
        <p className="text-white font-semibold text-sm mb-3">📦 Buy Supplies (${COST_PER_CUP}/cup)</p>
        <div className="flex items-center gap-3">
          {[5, 10, 20, 30].map(amt => (
            <button key={amt} onClick={() => setBuyAmount(amt)}
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${buyAmount === amt ? 'bg-yellow-500 text-black' : 'bg-white/[0.06] text-gray-300 hover:bg-white/[0.1]'}`}
            >{amt}</button>
          ))}
          <button onClick={buySupplies} disabled={buyAmount * COST_PER_CUP > money}
            className="ml-auto px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >Buy ${(buyAmount * COST_PER_CUP).toFixed(2)}</button>
        </div>
      </div>

      {/* Set Price */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mb-4">
        <p className="text-white font-semibold text-sm mb-3">💲 Set Price Per Cup</p>
        <div className="flex items-center gap-2">
          {[1, 1.5, 2, 2.5, 3, 4, 5].map(p => (
            <button key={p} onClick={() => setPrice(p)}
              className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${price === p ? 'bg-emerald-500 text-white' : 'bg-white/[0.06] text-gray-300 hover:bg-white/[0.1]'}`}
            >${p}</button>
          ))}
        </div>
        <p className="text-gray-500 text-xs mt-2">💡 Lower price = more customers. Higher price = more profit per cup.</p>
      </div>

      {/* Sell Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={sellDay}
        disabled={cups === 0}
        className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black rounded-xl text-lg disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20"
      >
        {cups === 0 ? 'Buy cups first!' : `☀️ Open for Business — Day ${day}!`}
      </motion.button>

      {/* Log */}
      {log.length > 0 && (
        <div className="mt-4 max-h-32 overflow-y-auto bg-white/[0.02] rounded-xl p-3">
          {log.map((l, i) => <p key={i} className="text-gray-400 text-xs">{l}</p>)}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// GAME 2: COIN CATCHER (Canvas Game)
// ═══════════════════════════════════════════════
function CoinCatcher({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef<{
    playerX: number; coins: {x:number;y:number;type:string}[]; score: number; lives: number; speed: number; frame: number; animId: number;
  }>({ playerX: 150, coins: [], score: 0, lives: 3, speed: 2, frame: 0, animId: 0 });

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    const g = gameRef.current;
    g.playerX = 150; g.coins = []; g.score = 0; g.lives = 3; g.speed = 2; g.frame = 0;
    requestAnimationFrame(gameLoop);
  };

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const g = gameRef.current;
    
    const W = canvas.width;
    const H = canvas.height;
    g.frame++;

    // Spawn coins
    if (g.frame % Math.max(20, 40 - Math.floor(g.score / 5)) === 0) {
      const type = Math.random() > 0.8 ? 'tax' : Math.random() > 0.7 ? 'gem' : 'coin';
      g.coins.push({ x: Math.random() * (W - 30) + 15, y: -20, type });
    }

    // Move coins
    g.coins = g.coins.filter(c => {
      c.y += g.speed + g.score * 0.05;
      // Check catch
      if (c.y > H - 50 && c.y < H - 20 && Math.abs(c.x - g.playerX) < 35) {
        if (c.type === 'tax') { g.lives--; setLives(g.lives); }
        else if (c.type === 'gem') { g.score += 5; setScore(g.score); }
        else { g.score += 1; setScore(g.score); }
        return false;
      }
      // Miss
      if (c.y > H + 20) {
        if (c.type === 'coin') { /* no penalty for missed coins */ }
        return false;
      }
      return true;
    });

    // Draw
    ctx.clearRect(0, 0, W, H);
    
    // BG
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);
    
    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    for (let i = 0; i < W; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke(); }
    for (let i = 0; i < H; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke(); }

    // Coins
    g.coins.forEach(c => {
      ctx.font = '24px serif';
      ctx.textAlign = 'center';
      if (c.type === 'coin') ctx.fillText('🪙', c.x, c.y);
      else if (c.type === 'gem') ctx.fillText('💎', c.x, c.y);
      else ctx.fillText('💀', c.x, c.y);
    });

    // Player (basket)
    ctx.font = '36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🧺', g.playerX, H - 25);

    // HUD
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`🪙 ${g.score}`, 10, 25);
    ctx.fillStyle = '#ef4444';
    ctx.textAlign = 'right';
    ctx.fillText('❤️'.repeat(g.lives), W - 10, 25);

    if (g.lives <= 0) {
      setGameOver(true);
      setGameStarted(false);
      onScore(g.score);
      return;
    }

    g.animId = requestAnimationFrame(gameLoop);
  }, [onScore]);

  // Mouse / Touch control
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMove = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      gameRef.current.playerX = Math.max(20, Math.min(canvas.width - 20, ((clientX - rect.left) / rect.width) * canvas.width));
    };
    const mouseHandler = (e: MouseEvent) => handleMove(e.clientX);
    const touchHandler = (e: TouchEvent) => { e.preventDefault(); handleMove(e.touches[0].clientX); };
    canvas.addEventListener('mousemove', mouseHandler);
    canvas.addEventListener('touchmove', touchHandler, { passive: false });
    return () => {
      canvas.removeEventListener('mousemove', mouseHandler);
      canvas.removeEventListener('touchmove', touchHandler);
      cancelAnimationFrame(gameRef.current.animId);
    };
  }, []);

  if (gameOver) {
    return (
      <GameOverScreen title="Coin Catcher" emoji="🪙" score={score} label="Coins Caught" onBack={onBack} onRetry={startGame} />
    );
  }

  return (
    <div className="max-w-lg mx-auto text-center">
      <GameHeader title="🪙 Coin Catcher" subtitle="Catch coins, dodge skulls!" onBack={onBack} />
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.1]">
        <canvas ref={canvasRef} width={340} height={500} className="w-full bg-slate-900 touch-none cursor-none" />
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black rounded-2xl text-xl shadow-lg"
            ><Play className="w-6 h-6 inline mr-2" />Play!</motion.button>
          </div>
        )}
      </div>
      <p className="text-gray-500 text-xs mt-3">🪙 = +1 point &nbsp; 💎 = +5 points &nbsp; 💀 = lose a life</p>
    </div>
  );
}

// ═══════════════════════════════════════════════
// GAME 3: WORD HUSTLE (Unscramble Business Words)
// ═══════════════════════════════════════════════
const BUSINESS_WORDS = [
  { word: 'PROFIT', hint: 'Money you earn after expenses' },
  { word: 'BRAND', hint: 'Your company\'s identity and reputation' },
  { word: 'STARTUP', hint: 'A new business venture' },
  { word: 'MARKET', hint: 'Where you sell your products' },
  { word: 'PITCH', hint: 'Presenting your idea to investors' },
  { word: 'REVENUE', hint: 'Total money coming into your business' },
  { word: 'CUSTOMER', hint: 'Someone who buys your product' },
  { word: 'BUDGET', hint: 'Plan for how to spend money' },
  { word: 'INVEST', hint: 'Put money in to grow it' },
  { word: 'GROWTH', hint: 'Getting bigger and better over time' },
  { word: 'LEADER', hint: 'Someone who guides a team' },
  { word: 'DESIGN', hint: 'How your product looks and works' },
  { word: 'SALES', hint: 'The act of selling products' },
  { word: 'LAUNCH', hint: 'Release your product to the world' },
  { word: 'VENTURE', hint: 'A risky business undertaking' },
  { word: 'EQUITY', hint: 'Ownership share in a company' },
  { word: 'HUSTLE', hint: 'Working hard with energy' },
  { word: 'MENTOR', hint: 'An experienced guide or teacher' },
  { word: 'MARGIN', hint: 'Difference between cost and selling price' },
  { word: 'SUPPLY', hint: 'Amount of product available' },
];

function scramble(word: string): string {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('') === word ? scramble(word) : arr.join('');
}

function WordHustle({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) {
  const [words] = useState(() => [...BUSINESS_WORDS].sort(() => Math.random() - 0.5).slice(0, 10));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentIdx < words.length) {
      setScrambled(scramble(words[currentIdx].word));
      setInput('');
      setShowHint(false);
      setFeedback(null);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentIdx, words]);

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { setGameOver(true); onScore(score); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver, score, onScore]);

  const checkAnswer = () => {
    if (input.toUpperCase() === words[currentIdx].word) {
      setFeedback('correct');
      const points = showHint ? 5 : 10;
      setScore(s => s + points);
      setTimeout(() => {
        if (currentIdx + 1 >= words.length) { setGameOver(true); onScore(score + points); }
        else setCurrentIdx(i => i + 1);
      }, 600);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 500);
    }
  };

  const skipWord = () => {
    if (currentIdx + 1 >= words.length) { setGameOver(true); onScore(score); }
    else setCurrentIdx(i => i + 1);
  };

  if (gameOver) {
    return <GameOverScreen title="Word Hustle" emoji="📝" score={score} label="Points" onBack={onBack}
      onRetry={() => { setCurrentIdx(0); setScore(0); setTimeLeft(60); setGameOver(false); }} />;
  }

  return (
    <div className="max-w-lg mx-auto text-center">
      <GameHeader title="📝 Word Hustle" subtitle={`Word ${currentIdx + 1} of ${words.length}`} onBack={onBack} />
      
      {/* Timer + Score */}
      <div className="flex justify-between items-center mb-5">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${timeLeft <= 10 ? 'bg-red-500/20 text-red-400' : 'bg-white/[0.06] text-gray-300'}`}>
          <Timer className="w-4 h-4" /> <span className="font-bold text-sm">{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
          <Star className="w-4 h-4" /> <span className="font-bold text-sm">{score} pts</span>
        </div>
      </div>

      {/* Scrambled Word */}
      <motion.div
        key={currentIdx}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 mb-5"
      >
        <div className="flex justify-center gap-2 mb-4">
          {scrambled.split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="w-10 h-12 bg-gradient-to-b from-white/[0.1] to-white/[0.04] border border-white/[0.15] rounded-lg flex items-center justify-center text-xl font-black text-white"
            >
              {letter}
            </motion.span>
          ))}
        </div>
        {showHint && <p className="text-amber-400/80 text-sm">💡 {words[currentIdx].hint}</p>}
      </motion.div>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          maxLength={words[currentIdx]?.word.length}
          placeholder="Type the word..."
          className={`flex-1 px-4 py-3 bg-white/[0.06] border rounded-xl text-white text-center text-lg font-bold placeholder-gray-500 focus:outline-none transition-colors ${
            feedback === 'correct' ? 'border-emerald-500 bg-emerald-500/20' :
            feedback === 'wrong' ? 'border-red-500 bg-red-500/20 animate-shake' :
            'border-white/[0.1] focus:ring-2 focus:ring-blue-500/50'
          }`}
        />
        <button onClick={checkAnswer} className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl">Go</button>
      </div>

      <div className="flex gap-2 justify-center">
        <button onClick={() => setShowHint(true)} disabled={showHint} className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg text-sm font-semibold disabled:opacity-40">💡 Hint (-5pts)</button>
        <button onClick={skipWord} className="px-4 py-2 bg-white/[0.06] text-gray-400 rounded-lg text-sm font-semibold hover:bg-white/[0.1]">Skip →</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// GAME 4: STOCK SURFER (Buy Low, Sell High)
// ═══════════════════════════════════════════════
function StockSurfer({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) {
  const [cash, setCash] = useState(1000);
  const [shares, setShares] = useState(0);
  const [price, setPrice] = useState(50);
  const [history, setHistory] = useState<number[]>([50]);
  const [day, setDay] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [news, setNews] = useState('Market opens steady today.');
  const MAX_DAYS = 15;

  const NEWS = [
    { text: '📰 CEO announces record profits!', effect: 'up' },
    { text: '📰 New product launch goes viral!', effect: 'up' },
    { text: '📰 Competitor goes bankrupt!', effect: 'up' },
    { text: '📰 Government approves new regulation', effect: 'down' },
    { text: '📰 Supply chain issues reported', effect: 'down' },
    { text: '📰 Scandal rocks the industry!', effect: 'down' },
    { text: '📰 Markets trading sideways today', effect: 'neutral' },
    { text: '📰 Analysts upgrade to BUY rating!', effect: 'up' },
    { text: '📰 Interest rates may rise soon', effect: 'down' },
    { text: '📰 Tech sector rally continues!', effect: 'up' },
  ];

  const nextDay = () => {
    const newsItem = NEWS[Math.floor(Math.random() * NEWS.length)];
    setNews(newsItem.text);
    const change = newsItem.effect === 'up' ? Math.random() * 15 + 2 :
                   newsItem.effect === 'down' ? -(Math.random() * 15 + 2) :
                   (Math.random() - 0.5) * 6;
    const newPrice = Math.max(5, Math.round((price + change) * 100) / 100);
    setPrice(newPrice);
    setHistory(h => [...h, newPrice]);
    
    if (day + 1 > MAX_DAYS) {
      const totalValue = Math.round(cash + shares * newPrice);
      setGameOver(true);
      onScore(totalValue);
    } else {
      setDay(d => d + 1);
    }
  };

  const buy = (amount: number) => {
    const maxAfford = Math.floor(cash / price);
    const actual = Math.min(amount, maxAfford);
    if (actual <= 0) return;
    setCash(c => +(c - actual * price).toFixed(2));
    setShares(s => s + actual);
  };

  const sell = (amount: number) => {
    const actual = Math.min(amount, shares);
    if (actual <= 0) return;
    setCash(c => +(c + actual * price).toFixed(2));
    setShares(s => s - actual);
  };

  const totalValue = Math.round(cash + shares * price);
  const profit = totalValue - 1000;

  if (gameOver) {
    return <GameOverScreen title="Stock Surfer" emoji="📈" score={totalValue} label="Portfolio Value" prefix="$" onBack={onBack}
      onRetry={() => { setCash(1000); setShares(0); setPrice(50); setHistory([50]); setDay(1); setGameOver(false); setNews('Market opens steady today.'); }}>
      <p className={`text-sm font-bold mt-2 ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
        {profit >= 0 ? `📈 Profit: +$${profit}` : `📉 Loss: -$${Math.abs(profit)}`}
      </p>
    </GameOverScreen>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <GameHeader title="📈 Stock Surfer" subtitle={`Day ${day} of ${MAX_DAYS}`} onBack={onBack} />
      
      {/* Portfolio */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <StatBox emoji="💰" label="Cash" value={`$${cash.toFixed(0)}`} />
        <StatBox emoji="📊" label="Shares" value={`${shares}`} />
        <StatBox emoji="💼" label="Total" value={`$${totalValue}`} highlight={profit >= 0} />
      </div>

      {/* Price Chart Mini */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-bold">ORBIT Corp (ORB)</span>
          <span className={`font-bold ${price > history[history.length - 2] ? 'text-emerald-400' : 'text-red-400'}`}>
            ${price.toFixed(2)} {price > (history[history.length - 2] || 50) ? '▲' : '▼'}
          </span>
        </div>
        {/* Simple chart */}
        <div className="flex items-end gap-[2px] h-20">
          {history.slice(-20).map((p, i) => {
            const min = Math.min(...history.slice(-20));
            const max = Math.max(...history.slice(-20));
            const range = max - min || 1;
            const h = ((p - min) / range) * 60 + 10;
            return (
              <div key={i} className={`flex-1 rounded-sm ${p > (history.slice(-20)[i - 1] || p) ? 'bg-emerald-500' : 'bg-red-500'}`}
                style={{ height: `${h}%` }} />
            );
          })}
        </div>
      </div>

      {/* News */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-4">
        <p className="text-blue-300 text-sm">{news}</p>
      </div>

      {/* Trade Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="space-y-2">
          <p className="text-emerald-400 font-bold text-sm text-center">BUY</p>
          {[1, 5, 10].map(n => (
            <button key={n} onClick={() => buy(n)} disabled={cash < price}
              className="w-full py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-lg text-sm font-bold hover:bg-emerald-500/30 disabled:opacity-40">
              Buy {n} (${(n * price).toFixed(0)})
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-red-400 font-bold text-sm text-center">SELL</p>
          {[1, 5, 10].map(n => (
            <button key={n} onClick={() => sell(n)} disabled={shares < n}
              className="w-full py-2 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg text-sm font-bold hover:bg-red-500/30 disabled:opacity-40">
              Sell {n} (+${(n * price).toFixed(0)})
            </button>
          ))}
        </div>
      </div>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={nextDay}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg">
        Next Day →
      </motion.button>
    </div>
  );
}

// ═══════════════════════════════════════════════
// GAME 5: BRAND MEMORY (Card Matching)
// ═══════════════════════════════════════════════
const BRAND_PAIRS = [
  { id: 1, emoji: '🍎', name: 'Apple' }, { id: 2, emoji: '🔍', name: 'Google' },
  { id: 3, emoji: '📦', name: 'Amazon' }, { id: 4, emoji: '🎬', name: 'Netflix' },
  { id: 5, emoji: '🐦', name: 'Twitter' }, { id: 6, emoji: '📸', name: 'Instagram' },
  { id: 7, emoji: '🚗', name: 'Tesla' }, { id: 8, emoji: '☕', name: 'Starbucks' },
];

interface MemoryCard { id: number; pairId: number; content: string; type: 'emoji' | 'name'; flipped: boolean; matched: boolean; }

function BrandMemory({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const pairs = BRAND_PAIRS.sort(() => Math.random() - 0.5).slice(0, 6);
    const deck: MemoryCard[] = [];
    pairs.forEach((p, i) => {
      deck.push({ id: i * 2, pairId: p.id, content: p.emoji, type: 'emoji', flipped: false, matched: false });
      deck.push({ id: i * 2 + 1, pairId: p.id, content: p.name, type: 'name', flipped: false, matched: false });
    });
    setCards(deck.sort(() => Math.random() - 0.5));
  }, []);

  const flipCard = (cardId: number) => {
    if (flipped.length >= 2) return;
    const card = cards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);
    setCards(cs => cs.map(c => c.id === cardId ? { ...c, flipped: true } : c));

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped.map(id => cards.find(c => c.id === id)!);
      if (first.pairId === cards.find(c => c.id === newFlipped[1])!.pairId) {
        // Match!
        setTimeout(() => {
          setCards(cs => cs.map(c => c.pairId === first.pairId ? { ...c, matched: true } : c));
          setFlipped([]);
          const newMatches = matches + 1;
          setMatches(newMatches);
          if (newMatches >= 6) {
            const timeScore = Math.max(0, 100 - Math.floor((Date.now() - startTime) / 1000));
            const moveScore = Math.max(0, 60 - moves);
            const total = timeScore + moveScore;
            setGameOver(true);
            onScore(total);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(cs => cs.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c));
          setFlipped([]);
        }, 800);
      }
    }
  };

  if (gameOver) {
    return <GameOverScreen title="Brand Memory" emoji="🧠" score={Math.max(0, 160 - moves * 5)} label="Score" onBack={onBack}
      onRetry={() => window.location.reload()}>
      <p className="text-gray-400 text-sm mt-2">Completed in {moves} moves</p>
    </GameOverScreen>;
  }

  return (
    <div className="max-w-lg mx-auto text-center">
      <GameHeader title="🧠 Brand Memory" subtitle={`Matches: ${matches}/6 • Moves: ${moves}`} onBack={onBack} />
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map(card => (
          <motion.button
            key={card.id}
            whileHover={!card.flipped && !card.matched ? { scale: 1.05 } : undefined}
            whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : undefined}
            onClick={() => flipCard(card.id)}
            className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all text-center ${
              card.matched ? 'bg-emerald-500/20 border-emerald-500/40' :
              card.flipped ? 'bg-violet-500/20 border-violet-500/40' :
              'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] cursor-pointer'
            }`}
          >
            {card.flipped || card.matched ? (
              <span className={card.type === 'emoji' ? 'text-3xl' : 'text-xs font-bold text-white'}>{card.content}</span>
            ) : (
              <span className="text-2xl">❓</span>
            )}
          </motion.button>
        ))}
      </div>
      <p className="text-gray-500 text-xs mt-4">Match the emoji to the brand name!</p>
    </div>
  );
}

// ═══════════════════════════════════════════════
// GAME 6: PITCH RACER (Typing Speed)
// ═══════════════════════════════════════════════
const PITCHES = [
  'We help kids learn business skills through fun games',
  'Our app makes learning AI easy for young students',
  'Build your dream startup with our AI powered tools',
  'We connect young entrepreneurs with real mentors',
  'Learn to code and build websites in just one week',
  'Our platform teaches financial literacy to teenagers',
  'We make entrepreneurship education fun and accessible',
  'Join the future of learning with Orbit Student today',
];

function PitchRacer({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) {
  const [pitch] = useState(PITCHES[Math.floor(Math.random() * PITCHES.length)]);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (val: string) => {
    if (!started) { setStarted(true); setStartTime(Date.now()); }
    setInput(val);

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === pitch[i]) correct++;
    }
    setAccuracy(val.length > 0 ? Math.round((correct / val.length) * 100) : 100);

    // Check completion
    if (val.length >= pitch.length) {
      const elapsed = (Date.now() - startTime) / 1000 / 60; // minutes
      const words = pitch.split(' ').length;
      const finalWpm = Math.round(words / elapsed);
      setWpm(finalWpm);
      setGameOver(true);
      onScore(finalWpm + Math.round(accuracy / 2));
    }
  };

  if (gameOver) {
    return <GameOverScreen title="Pitch Racer" emoji="⚡" score={wpm} label="WPM" onBack={onBack}
      onRetry={() => window.location.reload()}>
      <p className="text-gray-400 text-sm mt-2">Accuracy: {accuracy}%</p>
    </GameOverScreen>;
  }

  return (
    <div className="max-w-lg mx-auto text-center">
      <GameHeader title="⚡ Pitch Racer" subtitle="Type the pitch as fast as you can!" onBack={onBack} />
      
      {/* Pitch to type */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-5">
        <p className="text-lg leading-relaxed">
          {pitch.split('').map((char, i) => (
            <span key={i} className={
              i < input.length
                ? input[i] === char ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold bg-red-500/20'
                : i === input.length ? 'text-white bg-white/20 border-b-2 border-white' : 'text-gray-500'
            }>{char}</span>
          ))}
        </p>
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        placeholder="Start typing..."
        autoFocus
        className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white text-center text-lg font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
      />

      <div className="flex justify-center gap-6 mt-4 text-sm">
        <span className="text-gray-400">{input.length}/{pitch.length} chars</span>
        <span className={accuracy >= 90 ? 'text-emerald-400' : accuracy >= 70 ? 'text-amber-400' : 'text-red-400'}>
          {accuracy}% accuracy
        </span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// GAME 7: CEO QUIZ SHOW (Millionaire-style)
// ═══════════════════════════════════════════════
const QUIZ_QUESTIONS = [
  { q: 'What does "ROI" stand for?', options: ['Return on Investment', 'Rate of Interest', 'Revenue of Income', 'Risk of Inflation'], answer: 0, prize: '$100' },
  { q: 'Who founded Amazon?', options: ['Elon Musk', 'Jeff Bezos', 'Bill Gates', 'Mark Zuckerberg'], answer: 1, prize: '$500' },
  { q: 'What is a "pitch deck"?', options: ['A baseball field', 'A presentation for investors', 'A type of roof', 'A card game'], answer: 1, prize: '$1,000' },
  { q: 'What does "B2C" mean?', options: ['Business to Customer', 'Back to Center', 'Brand to Company', 'Buy to Convert'], answer: 0, prize: '$5,000' },
  { q: 'What is equity in a company?', options: ['Money in the bank', 'Ownership share', 'Monthly salary', 'Office space'], answer: 1, prize: '$10,000' },
  { q: 'What is a "minimum viable product" (MVP)?', options: ['The cheapest product', 'Simplest version to test an idea', 'Most valuable player', 'A type of award'], answer: 1, prize: '$25,000' },
  { q: 'What is "revenue"?', options: ['Money spent', 'Money earned before expenses', 'Profit after tax', 'Money borrowed'], answer: 1, prize: '$50,000' },
  { q: 'What does a CEO do?', options: ['Makes coffee', 'Leads the entire company', 'Only talks to investors', 'Designs products'], answer: 1, prize: '$100,000' },
  { q: 'What is "scalability" in business?', options: ['How tall a building is', 'Ability to grow without equal cost increase', 'Number of employees', 'How fast you can type'], answer: 1, prize: '$500,000' },
  { q: 'What is "bootstrapping" a startup?', options: ['Wearing boots to work', 'Self-funding without investors', 'A coding method', 'A marketing strategy'], answer: 1, prize: '$1,000,000' },
];

function CEOQuizShow({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [fiftyFifty, setFiftyFifty] = useState(true);
  const [eliminated, setEliminated] = useState<number[]>([]);
  const [walked, setWalked] = useState(false);

  const question = QUIZ_QUESTIONS[currentQ];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === question.answer;
    setIsCorrect(correct);

    setTimeout(() => {
      if (correct) {
        if (currentQ + 1 >= QUIZ_QUESTIONS.length) {
          setGameOver(true);
          onScore(1000000);
        } else {
          setCurrentQ(q => q + 1);
          setSelected(null);
          setIsCorrect(null);
          setEliminated([]);
        }
      } else {
        setGameOver(true);
        onScore(currentQ * 10);
      }
    }, 1500);
  };

  const useFiftyFifty = () => {
    if (!fiftyFifty) return;
    setFiftyFifty(false);
    const wrong = question.options.map((_, i) => i).filter(i => i !== question.answer);
    const toRemove = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
    setEliminated(toRemove);
  };

  const walkAway = () => {
    setWalked(true);
    setGameOver(true);
    onScore(currentQ * 15);
  };

  if (gameOver) {
    return (
      <GameOverScreen
        title="CEO Quiz Show"
        emoji="🎤"
        score={walked ? currentQ * 15 : (isCorrect === false ? currentQ * 10 : 1000000)}
        label={walked ? `Walked away at ${question.prize}` : (currentQ >= QUIZ_QUESTIONS.length ? 'YOU WON $1,000,000!' : `Out at question ${currentQ + 1}`)}
        onBack={onBack}
        onRetry={() => { setCurrentQ(0); setSelected(null); setIsCorrect(null); setGameOver(false); setFiftyFifty(true); setEliminated([]); setWalked(false); }}
      >
        <p className="text-gray-400 text-sm mt-2">Reached: {question.prize}</p>
      </GameOverScreen>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <GameHeader title="🎤 CEO Quiz Show" subtitle={`Question ${currentQ + 1} — Prize: ${question.prize}`} onBack={onBack} />

      {/* Prize ladder mini */}
      <div className="flex gap-1 mb-5">
        {QUIZ_QUESTIONS.map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full ${i < currentQ ? 'bg-amber-500' : i === currentQ ? 'bg-amber-500 animate-pulse' : 'bg-white/[0.06]'}`} />
        ))}
      </div>

      {/* Question */}
      <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-2xl p-6 mb-5"
      >
        <p className="text-white text-lg font-bold leading-relaxed">{question.q}</p>
      </motion.div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2 mb-5">
        {question.options.map((opt, i) => {
          const isEliminated = eliminated.includes(i);
          const isSelected = selected === i;
          const showResult = selected !== null;
          const isAnswer = i === question.answer;

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isEliminated ? 0.2 : 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              disabled={selected !== null || isEliminated}
              onClick={() => handleAnswer(i)}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                showResult && isAnswer ? 'bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/20' :
                showResult && isSelected && !isAnswer ? 'bg-red-500/20 border-red-500' :
                isSelected ? 'bg-indigo-500/20 border-indigo-500' :
                'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.15]'
              } disabled:cursor-not-allowed`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                showResult && isAnswer ? 'bg-emerald-500 text-white' :
                showResult && isSelected ? 'bg-red-500 text-white' :
                'bg-white/[0.06] text-gray-400'
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className={`font-medium text-sm ${showResult && isAnswer ? 'text-emerald-300' : 'text-gray-200'}`}>{opt}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Lifelines */}
      <div className="flex gap-3 justify-center">
        <button onClick={useFiftyFifty} disabled={!fiftyFifty || selected !== null}
          className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-lg text-sm font-bold disabled:opacity-30 border border-indigo-500/20">
          50:50
        </button>
        <button onClick={walkAway} disabled={selected !== null}
          className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-lg text-sm font-bold disabled:opacity-30 border border-amber-500/20">
          💰 Walk Away
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// GAME 8: BUDGET BOSS
// ═══════════════════════════════════════════════
const BUDGET_SCENARIOS = [
  { title: 'School Supplies', desc: 'New school year! You need notebooks, pens, and a backpack.', cost: 45, category: 'need' as const },
  { title: 'Gaming Console', desc: 'The latest console is out! All your friends have one.', cost: 400, category: 'want' as const },
  { title: 'Online Course', desc: 'An AI and coding course that could boost your skills.', cost: 30, category: 'invest' as const },
  { title: 'Pizza Party', desc: 'Throw a pizza party for your friends this weekend!', cost: 60, category: 'want' as const },
  { title: 'Emergency Fund', desc: 'Save for unexpected expenses. Always smart.', cost: 100, category: 'invest' as const },
  { title: 'New Sneakers', desc: 'Those limited edition kicks look amazing...', cost: 150, category: 'want' as const },
  { title: 'Books & Reading', desc: 'A collection of entrepreneur biographies.', cost: 25, category: 'invest' as const },
  { title: 'Phone Bill', desc: 'Monthly phone service — you need to stay connected.', cost: 35, category: 'need' as const },
  { title: 'Concert Tickets', desc: 'Your favorite artist is performing nearby!', cost: 120, category: 'want' as const },
  { title: 'Savings Account', desc: 'Deposit into your savings for compound interest.', cost: 200, category: 'invest' as const },
  { title: 'Bus Pass', desc: 'Monthly transport to school and activities.', cost: 40, category: 'need' as const },
  { title: 'Startup Materials', desc: 'Buy supplies to build your first product prototype.', cost: 75, category: 'invest' as const },
];

function BudgetBoss({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) {
  const [budget] = useState(500);
  const [spent, setSpent] = useState(0);
  const [saved, setSaved] = useState(0);
  const [invested, setInvested] = useState(0);
  const [items, setItems] = useState(() => [...BUDGET_SCENARIOS].sort(() => Math.random() - 0.5).slice(0, 8));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [decisions, setDecisions] = useState<{ title: string; action: string }[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const remaining = budget - spent - saved - invested;
  const item = items[currentIdx];

  const decide = (action: 'buy' | 'skip' | 'invest') => {
    let newSpent = spent, newSaved = saved, newInvested = invested;
    
    if (action === 'buy' && remaining >= item.cost) {
      newSpent = spent + item.cost;
      setSpent(newSpent);
      setDecisions(d => [...d, { title: item.title, action: '💸 Bought' }]);
    } else if (action === 'invest' && remaining >= item.cost) {
      newInvested = invested + item.cost;
      setInvested(newInvested);
      setDecisions(d => [...d, { title: item.title, action: '📈 Invested' }]);
    } else if (action === 'skip') {
      newSaved = saved + Math.floor(item.cost * 0.5);
      setSaved(newSaved);
      setDecisions(d => [...d, { title: item.title, action: '💰 Skipped & Saved' }]);
    } else {
      setDecisions(d => [...d, { title: item.title, action: '❌ Can\'t afford' }]);
    }

    if (currentIdx + 1 >= items.length) {
      setGameOver(true);
      // Score: invest gets 3x, save gets 2x, remaining 1x
      const finalScore = newInvested * 3 + newSaved * 2 + (budget - newSpent - newSaved - newInvested);
      onScore(Math.round(finalScore));
    } else {
      setCurrentIdx(i => i + 1);
    }
  };

  if (gameOver) {
    const finalScore = invested * 3 + saved * 2 + remaining;
    return (
      <GameOverScreen title="Budget Boss" emoji="💳" score={Math.round(finalScore)} label="Financial Score" onBack={onBack}
        onRetry={() => { setSpent(0); setSaved(0); setInvested(0); setCurrentIdx(0); setDecisions([]); setGameOver(false); setItems([...BUDGET_SCENARIOS].sort(() => Math.random() - 0.5).slice(0, 8)); }}>
        <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
          <div className="bg-red-500/10 rounded-lg p-2"><span className="text-red-400">Spent</span><br/><span className="text-white font-bold">${spent}</span></div>
          <div className="bg-amber-500/10 rounded-lg p-2"><span className="text-amber-400">Saved</span><br/><span className="text-white font-bold">${saved}</span></div>
          <div className="bg-emerald-500/10 rounded-lg p-2"><span className="text-emerald-400">Invested</span><br/><span className="text-white font-bold">${invested}</span></div>
        </div>
      </GameOverScreen>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <GameHeader title="💳 Budget Boss" subtitle={`Decision ${currentIdx + 1} of ${items.length}`} onBack={onBack} />

      {/* Budget bar */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mb-5">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-gray-400">Monthly Budget: <span className="text-white font-bold">${budget}</span></span>
          <span className={`font-bold ${remaining < 50 ? 'text-red-400' : 'text-emerald-400'}`}>${remaining} left</span>
        </div>
        <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden flex">
          <div className="bg-red-500 h-full transition-all" style={{ width: `${(spent / budget) * 100}%` }} />
          <div className="bg-amber-500 h-full transition-all" style={{ width: `${(saved / budget) * 100}%` }} />
          <div className="bg-emerald-500 h-full transition-all" style={{ width: `${(invested / budget) * 100}%` }} />
        </div>
        <div className="flex gap-4 mt-2 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Spent ${spent}</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Saved ${saved}</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Invested ${invested}</span>
        </div>
      </div>

      {/* Current item */}
      <motion.div key={currentIdx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-5 text-center"
      >
        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-3 ${
          item.category === 'need' ? 'bg-blue-500/20 text-blue-400' :
          item.category === 'want' ? 'bg-pink-500/20 text-pink-400' :
          'bg-emerald-500/20 text-emerald-400'
        }`}>{item.category === 'need' ? '🔵 NEED' : item.category === 'want' ? '💖 WANT' : '📈 INVESTMENT'}</span>
        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{item.desc}</p>
        <p className="text-2xl font-black text-amber-400">${item.cost}</p>
      </motion.div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-3">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => decide('buy')} disabled={remaining < item.cost}
          className="py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl font-bold text-sm disabled:opacity-30">
          💸 Buy It
        </motion.button>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => decide('skip')}
          className="py-3 bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-xl font-bold text-sm">
          💰 Skip & Save
        </motion.button>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => decide('invest')} disabled={remaining < item.cost}
          className="py-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl font-bold text-sm disabled:opacity-30">
          📈 Invest
        </motion.button>
      </div>

      <p className="text-gray-600 text-[10px] text-center mt-3">💡 Investing earns 3x score, saving earns 2x, spending earns nothing!</p>
    </div>
  );
}

// ═══════════════════════════════════════════════
// GAME 9: EMOJI STARTUP (Creative Pitch)
// ═══════════════════════════════════════════════
const EMOJI_POOL = ['🍕', '🤖', '🐕', '🚲', '📚', '🎵', '🌱', '💊', '👕', '🎮', '📱', '🏠', '✈️', '🎨', '🏋️', '🧹', '☕', '🎭', '🌊', '🔋', '🧸', '🎓', '🛒', '🎪'];

const EMOJI_JUDGES = [
  { name: 'Ms. Venture', avatar: '👩‍💼', style: 'Loves innovation' },
  { name: 'Mr. Profit', avatar: '🧔', style: 'Wants to see $$$' },
  { name: 'Dr. Impact', avatar: '👩‍🔬', style: 'Cares about impact' },
];

function EmojiStartup({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) {
  const [emojis, setEmojis] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [pitch, setPitch] = useState('');
  const [round, setRound] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [judgeScores, setJudgeScores] = useState<{ judge: string; score: number; comment: string }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const MAX_ROUNDS = 3;

  const rollEmojis = () => {
    const picked: string[] = [];
    while (picked.length < 3) {
      const e = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
      if (!picked.includes(e)) picked.push(e);
    }
    setEmojis(picked);
    setName('');
    setPitch('');
    setShowResults(false);
    setJudgeScores([]);
  };

  useEffect(() => { rollEmojis(); }, [round]);

  const submitPitch = () => {
    if (!name.trim() || !pitch.trim()) return;

    // Fun scoring based on name + pitch length + creativity signals
    const lengthScore = Math.min(30, pitch.length / 3);
    const nameScore = name.length > 3 ? 15 : 5;
    const creativityBonus = /!|\?|amazing|unique|first|only|love|revolutio|disrupt|change|world|planet|million/i.test(pitch) ? 20 : 0;
    const randomFactor = Math.floor(Math.random() * 20) + 10;

    const scores = EMOJI_JUDGES.map(judge => {
      const base = Math.round(lengthScore + nameScore + creativityBonus + randomFactor + Math.random() * 15);
      const score = Math.min(100, Math.max(20, base));
      const comments = score >= 80 ? ['Brilliant!', 'I\'m investing!', 'Take my money!', 'Genius concept!'] :
                       score >= 60 ? ['Interesting...', 'Has potential.', 'Needs work but I see it.', 'Promising!'] :
                       ['Hmm, not sure.', 'Needs more thought.', 'Back to the drawing board.', 'Keep trying!'];
      return {
        judge: judge.name,
        score,
        comment: comments[Math.floor(Math.random() * comments.length)]
      };
    });

    setJudgeScores(scores);
    const avgScore = Math.round(scores.reduce((s, j) => s + j.score, 0) / 3);
    setTotalScore(t => t + avgScore);
    setShowResults(true);
  };

  const nextRound = () => {
    if (round + 1 >= MAX_ROUNDS) {
      setGameOver(true);
      onScore(totalScore);
    } else {
      setRound(r => r + 1);
    }
  };

  if (gameOver) {
    return <GameOverScreen title="Emoji Startup" emoji="🚀" score={totalScore} label={`Average: ${Math.round(totalScore / MAX_ROUNDS)}/100`} onBack={onBack}
      onRetry={() => { setRound(0); setTotalScore(0); setGameOver(false); }} />;
  }

  return (
    <div className="max-w-lg mx-auto">
      <GameHeader title="🚀 Emoji Startup" subtitle={`Round ${round + 1} of ${MAX_ROUNDS}`} onBack={onBack} />

      {/* Emoji prompt */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 mb-5 text-center">
        <p className="text-gray-400 text-sm mb-3">Combine these emojis into a startup idea:</p>
        <div className="flex justify-center gap-4 mb-4">
          {emojis.map((e, i) => (
            <motion.span key={i} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: i * 0.15, type: 'spring' }}
              className="text-5xl">{e}</motion.span>
          ))}
        </div>
        <button onClick={rollEmojis} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">🎲 Reroll emojis</button>
      </div>

      {!showResults ? (
        <>
          {/* Input fields */}
          <div className="space-y-3 mb-5">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={30}
              placeholder="Startup name (e.g. PizzaBot)"
              className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 font-bold" />
            <textarea value={pitch} onChange={(e) => setPitch(e.target.value)} maxLength={200} rows={3}
              placeholder="Your pitch: What does it do? Why is it amazing?"
              className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-none text-sm" />
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={submitPitch}
            disabled={!name.trim() || !pitch.trim()}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-xl text-lg shadow-lg disabled:opacity-40">
            🎤 Pitch to the Judges!
          </motion.button>
        </>
      ) : (
        <>
          {/* Judge results */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 mb-5">
            <p className="text-center text-white font-bold mb-4">Presenting: <span className="text-orange-400">{name}</span></p>
            <div className="space-y-3">
              {judgeScores.map((j, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 }}
                  className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-3"
                >
                  <span className="text-2xl">{EMOJI_JUDGES[i].avatar}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm font-bold">{j.judge}</p>
                    <p className="text-gray-400 text-xs">{j.comment}</p>
                  </div>
                  <div className={`text-xl font-black ${j.score >= 80 ? 'text-emerald-400' : j.score >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                    {j.score}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={nextRound}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl">
            {round + 1 >= MAX_ROUNDS ? '🏆 See Final Score' : 'Next Round →'}
          </motion.button>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// GAME 10: SPACE TRADER (Buy/Sell across planets)
// ═══════════════════════════════════════════════
const PLANETS = [
  { name: 'Earth', emoji: '🌍', color: 'from-blue-400 to-green-500' },
  { name: 'Mars', emoji: '🔴', color: 'from-red-400 to-orange-500' },
  { name: 'Jupiter', emoji: '🟤', color: 'from-amber-400 to-yellow-600' },
  { name: 'Neptune', emoji: '🔵', color: 'from-blue-500 to-indigo-600' },
  { name: 'Saturn', emoji: '🪐', color: 'from-yellow-400 to-amber-500' },
];

const SPACE_GOODS = [
  { name: 'Water', emoji: '💧' },
  { name: 'Fuel', emoji: '⛽' },
  { name: 'Food', emoji: '🍎' },
  { name: 'Tech', emoji: '💻' },
  { name: 'Crystals', emoji: '💎' },
];

function generatePrices(): Record<string, Record<string, number>> {
  const prices: Record<string, Record<string, number>> = {};
  PLANETS.forEach(p => {
    prices[p.name] = {};
    SPACE_GOODS.forEach(g => {
      prices[p.name][g.name] = Math.floor(Math.random() * 80) + 10;
    });
  });
  return prices;
}

function SpaceTrader({ onBack, onScore }: { onBack: () => void; onScore: (s: number) => void }) {
  const [credits, setCredits] = useState(500);
  const [cargo, setCargo] = useState<Record<string, number>>({});
  const [planet, setPlanet] = useState(0);
  const [prices, setPrices] = useState(generatePrices);
  const [turn, setTurn] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const MAX_TURNS = 12;

  const currentPlanet = PLANETS[planet];
  const currentPrices = prices[currentPlanet.name];

  const buy = (goodName: string) => {
    const price = currentPrices[goodName];
    if (credits < price) return;
    setCredits(c => c - price);
    setCargo(c => ({ ...c, [goodName]: (c[goodName] || 0) + 1 }));
    setLog(l => [...l, `Bought ${goodName} on ${currentPlanet.name} for $${price}`]);
  };

  const sell = (goodName: string) => {
    if (!cargo[goodName] || cargo[goodName] <= 0) return;
    const price = currentPrices[goodName];
    setCredits(c => c + price);
    setCargo(c => ({ ...c, [goodName]: c[goodName] - 1 }));
    setLog(l => [...l, `Sold ${goodName} on ${currentPlanet.name} for $${price}`]);
  };

  const travel = (planetIdx: number) => {
    if (planetIdx === planet) return;
    setPlanet(planetIdx);
    // Shuffle prices slightly each turn
    setPrices(prev => {
      const next = { ...prev };
      PLANETS.forEach(p => {
        next[p.name] = { ...next[p.name] };
        SPACE_GOODS.forEach(g => {
          const change = (Math.random() - 0.5) * 30;
          next[p.name][g.name] = Math.max(5, Math.round(next[p.name][g.name] + change));
        });
      });
      return next;
    });

    if (turn + 1 > MAX_TURNS) {
      // Calculate total value
      let cargoValue = 0;
      Object.entries(cargo).forEach(([good, qty]) => {
        cargoValue += qty * (currentPrices[good] || 0);
      });
      setGameOver(true);
      onScore(Math.round(credits + cargoValue));
    } else {
      setTurn(t => t + 1);
    }
  };

  const totalCargoCount = Object.values(cargo).reduce((s, q) => s + q, 0);

  if (gameOver) {
    let cargoValue = 0;
    Object.entries(cargo).forEach(([good, qty]) => { cargoValue += qty * (currentPrices[good] || 0); });
    const total = Math.round(credits + cargoValue);
    const profit = total - 500;

    return (
      <GameOverScreen title="Space Trader" emoji="🛸" score={total} label="Total Credits" prefix="$" onBack={onBack}
        onRetry={() => { setCredits(500); setCargo({}); setPlanet(0); setPrices(generatePrices()); setTurn(1); setGameOver(false); setLog([]); }}>
        <p className={`text-sm font-bold mt-2 ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {profit >= 0 ? `🚀 Profit: +$${profit}` : `📉 Loss: -$${Math.abs(profit)}`}
        </p>
      </GameOverScreen>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <GameHeader title="🛸 Space Trader" subtitle={`Turn ${turn}/${MAX_TURNS} — ${currentPlanet.emoji} ${currentPlanet.name}`} onBack={onBack} />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <StatBox emoji="💰" label="Credits" value={`$${credits}`} />
        <StatBox emoji="📦" label="Cargo" value={`${totalCargoCount} items`} />
        <StatBox emoji="🗺️" label="Turn" value={`${turn}/${MAX_TURNS}`} />
      </div>

      {/* Planet selection */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {PLANETS.map((p, i) => (
          <button key={p.name} onClick={() => travel(i)} disabled={i === planet}
            className={`shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              i === planet ? `bg-gradient-to-r ${p.color} text-white shadow-lg` : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]'
            }`}>
            {p.emoji} {p.name}
          </button>
        ))}
      </div>

      {/* Market */}
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden mb-4">
        <div className={`bg-gradient-to-r ${currentPlanet.color} px-4 py-2`}>
          <p className="text-white font-bold text-sm">{currentPlanet.emoji} {currentPlanet.name} Market</p>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {SPACE_GOODS.map(good => (
            <div key={good.name} className="flex items-center gap-3 px-4 py-2.5">
              <span className="text-lg">{good.emoji}</span>
              <span className="text-white text-sm font-medium flex-1">{good.name}</span>
              <span className="text-amber-400 font-bold text-sm w-12 text-right">${currentPrices[good.name]}</span>
              <span className="text-gray-500 text-xs w-8 text-center">x{cargo[good.name] || 0}</span>
              <button onClick={() => buy(good.name)} disabled={credits < currentPrices[good.name]}
                className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold disabled:opacity-30">Buy</button>
              <button onClick={() => sell(good.name)} disabled={!cargo[good.name]}
                className="px-2.5 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs font-bold disabled:opacity-30">Sell</button>
            </div>
          ))}
        </div>
      </div>

      <p className="text-gray-600 text-[10px] text-center">💡 Buy cheap on one planet, travel to another where prices are high, sell for profit! Prices change every turn.</p>
    </div>
  );
}

// ═══════════════════════════════════════════════
// SHARED UI COMPONENTS
// ═══════════════════════════════════════════════
function GameHeader({ title, subtitle, onBack }: { title: string; subtitle: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <button onClick={onBack} className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

function StatBox({ emoji, label, value, highlight }: { emoji: string; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 text-center">
      <span className="text-xl">{emoji}</span>
      <p className={`font-bold text-sm ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</p>
      <p className="text-gray-500 text-[10px]">{label}</p>
    </div>
  );
}

function GameOverScreen({ title, emoji, score, label, prefix, onBack, onRetry, children }: {
  title: string; emoji: string; score: number; label: string; prefix?: string;
  onBack: () => void; onRetry: () => void; children?: React.ReactNode;
}) {
  return (
    <div className="max-w-md mx-auto text-center py-10">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
        <span className="text-6xl block mb-4">{emoji}</span>
      </motion.div>
      <h3 className="text-2xl font-black text-white mb-1">{title}</h3>
      <p className="text-gray-400 mb-4">Game Over!</p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white/[0.04] border border-amber-500/20 rounded-2xl p-6 mb-6 inline-block min-w-[200px]"
      >
        <p className="text-4xl font-black text-amber-400">{prefix}{score.toLocaleString()}</p>
        <p className="text-gray-400 text-sm">{label}</p>
        {children}
      </motion.div>
      <div className="flex gap-3 justify-center">
        <button onClick={onBack} className="px-6 py-3 bg-white/[0.06] border border-white/[0.1] text-gray-300 rounded-xl font-semibold hover:bg-white/[0.1]">
          ← Games
        </button>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onRetry}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-xl shadow-lg">
          <RefreshCw className="w-4 h-4 inline mr-1" /> Play Again
        </motion.button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN: GAME ZONE
// ═══════════════════════════════════════════════
export default function GameZone() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [scores, setScores] = useState(loadScores());

  const totalXP = Object.values(scores).reduce((sum, s) => sum + s.totalXP, 0);
  const totalPlayed = Object.values(scores).reduce((sum, s) => sum + s.timesPlayed, 0);

  const handleScore = (gameId: string, score: number) => {
    const game = GAMES.find(g => g.id === gameId);
    saveScore(gameId, score, game?.xpReward || 0);
    setScores(loadScores());
  };

  // Render active game
  if (activeGame) {
    const props = {
      onBack: () => setActiveGame(null),
      onScore: (s: number) => handleScore(activeGame, s),
    };
    switch (activeGame) {
      case 'lemonade': return <LemonadeTycoon {...props} />;
      case 'catch-coins': return <CoinCatcher {...props} />;
      case 'word-hustle': return <WordHustle {...props} />;
      case 'stock-surfer': return <StockSurfer {...props} />;
      case 'brand-match': return <BrandMemory {...props} />;
      case 'pitch-type': return <PitchRacer {...props} />;
      case 'quiz-show': return <CEOQuizShow {...props} />;
      case 'budget-boss': return <BudgetBoss {...props} />;
      case 'emoji-startup': return <EmojiStartup {...props} />;
      case 'space-trader': return <SpaceTrader {...props} />;
      default: return null;
    }
  }

  // Game Selection Screen
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Gamepad2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white">Game Zone</h1>
            <p className="text-gray-400">Learn business skills by playing fun games!</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex gap-4 mt-4 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-bold text-sm">{totalXP} XP earned</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-xl">
            <Gamepad2 className="w-4 h-4 text-violet-400" />
            <span className="text-violet-400 font-bold text-sm">{totalPlayed} games played</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <Trophy className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-bold text-sm">{Object.values(scores).filter(s => s.highScore > 0).length}/{GAMES.length} completed</span>
          </div>
        </div>
      </motion.div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GAMES.map((game, idx) => {
          const gameScore = scores[game.id];
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveGame(game.id)}
              className="group relative bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl p-5 cursor-pointer transition-all"
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              
              {/* Difficulty Badge */}
              <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                game.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400' :
                game.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                'bg-red-500/20 text-red-400'
              }`}>{game.difficulty}</span>

              {/* Game Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-3xl shadow-lg mb-4`}>
                {game.emoji}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{game.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{game.description}</p>

              {/* Skill tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-white/[0.06] text-gray-300 rounded-full text-[10px] font-semibold">
                  🎯 {game.skill}
                </span>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-[10px] font-semibold">
                  +{game.xpReward} XP
                </span>
              </div>

              {/* High Score */}
              {gameScore && gameScore.highScore > 0 ? (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">🏆 Best: <span className="text-amber-400 font-bold">{gameScore.highScore}</span></span>
                  <span className="text-gray-500">Played {gameScore.timesPlayed}x</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Play className="w-3 h-3" /> Not played yet
                </div>
              )}

              {/* Play indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${game.gradient} flex items-center justify-center shadow-lg`}>
                  <Play className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
