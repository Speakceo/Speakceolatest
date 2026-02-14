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
