import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Rocket, Code, Eye, RefreshCw, Download, Share2, Zap, ArrowRight, Globe, Gamepad2, ChevronRight, Loader2, Copy, Play } from 'lucide-react';
import { generateAIResponse } from '../lib/openai';
import LottieAnimation from '../components/ui/LottieAnimation';

// Pre-built website templates
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

// Pre-built game templates
const gameTemplates = [
  {
    id: 'flappy',
    name: '🐦 Flappy Bird',
    description: 'Classic flappy bird game',
    icon: '🐦'
  },
  {
    id: 'snake',
    name: '🐍 Snake Game',
    description: 'Eat and grow longer',
    icon: '🐍'
  },
  {
    id: 'car-race',
    name: '🏎️ Car Race',
    description: 'Dodge obstacles',
    icon: '🏎️'
  },
  {
    id: 'pong',
    name: '🏓 Pong',
    description: 'Classic arcade game',
    icon: '🏓'
  },
  {
    id: 'memory',
    name: '🎴 Memory Match',
    description: 'Find matching pairs',
    icon: '🎴'
  },
  {
    id: 'space',
    name: '🚀 Space Shooter',
    description: 'Shoot the asteroids',
    icon: '🚀'
  },
  {
    id: 'catch',
    name: '🍎 Fruit Catch',
    description: 'Catch falling fruits',
    icon: '🍎'
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
</html>`,

  'pet-sitting': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paws & Care Pet Sitting</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #B4E7CE 0%, #E3F4F4 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1100px;
            margin: 0 auto;
            background: white;
            border-radius: 25px;
            padding: 50px;
            box-shadow: 0 15px 50px rgba(0,0,0,0.1);
        }
        header {
            text-align: center;
            margin-bottom: 50px;
        }
        h1 {
            font-size: 3.5em;
            color: #2E8B57;
            margin-bottom: 15px;
        }
        .tagline {
            font-size: 1.3em;
            color: #3CB371;
        }
        .services {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin: 50px 0;
        }
        .service-card {
            background: linear-gradient(135deg, #90EE90 0%, #98FB98 100%);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 8px 25px rgba(46,139,87,0.2);
        }
        .service-icon {
            font-size: 4.5em;
            margin-bottom: 20px;
        }
        .service-name {
            font-size: 1.6em;
            color: #2E8B57;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .service-price {
            font-size: 2em;
            color: #228B22;
            font-weight: bold;
        }
        .cta {
            text-align: center;
            margin-top: 50px;
        }
        .cta-button {
            display: inline-block;
            background: #2E8B57;
            color: white;
            padding: 18px 50px;
            border-radius: 50px;
            font-size: 1.4em;
            font-weight: bold;
            text-decoration: none;
            box-shadow: 0 10px 30px rgba(46,139,87,0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🐕 Paws & Care Pet Sitting 🐾</h1>
            <p class="tagline">Your Pets Are Family - We Treat Them That Way!</p>
        </header>
        <div class="services">
            <div class="service-card">
                <div class="service-icon">🐕</div>
                <div class="service-name">Dog Walking</div>
                <div class="service-price">$15/walk</div>
            </div>
            <div class="service-card">
                <div class="service-icon">🐱</div>
                <div class="service-name">Cat Sitting</div>
                <div class="service-price">$20/day</div>
            </div>
            <div class="service-card">
                <div class="service-icon">🏠</div>
                <div class="service-name">Home Visits</div>
                <div class="service-price">$25/visit</div>
            </div>
        </div>
        <div class="cta">
            <a href="#" class="cta-button">Book Now! 🐾</a>
        </div>
    </div>
</body>
</html>`,

  'art-shop': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creative Arts Shop</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Courier New', monospace;
            background: linear-gradient(135deg, #FFE4E9 0%, #FFF0F5 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 50px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        header {
            text-align: center;
            margin-bottom: 50px;
            border-bottom: 5px solid #FF69B4;
            padding-bottom: 30px;
        }
        h1 {
            font-size: 3.5em;
            background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 15px;
        }
        .tagline {
            font-size: 1.3em;
            color: #C71585;
            font-style: italic;
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 35px;
            margin: 40px 0;
        }
        .art-card {
            background: linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%);
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            border: 4px solid #FF69B4;
            transition: transform 0.3s;
        }
        .art-card:hover {
            transform: rotate(-2deg) scale(1.05);
        }
        .art-icon {
            font-size: 5em;
            margin-bottom: 20px;
        }
        .art-name {
            font-size: 1.5em;
            color: #C71585;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .art-price {
            font-size: 1.8em;
            color: #FF1493;
            font-weight: bold;
        }
        .shop-btn {
            display: inline-block;
            background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%);
            color: white;
            padding: 20px 60px;
            border-radius: 50px;
            font-size: 1.4em;
            font-weight: bold;
            margin-top: 40px;
            text-decoration: none;
            box-shadow: 0 10px 30px rgba(255,20,147,0.4);
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🎨 Creative Arts Shop 🖌️</h1>
            <p class="tagline">Handmade Art with Love & Creativity!</p>
        </header>
        <div class="gallery">
            <div class="art-card">
                <div class="art-icon">🖼️</div>
                <div class="art-name">Paintings</div>
                <div class="art-price">$30</div>
            </div>
            <div class="art-card">
                <div class="art-icon">🎭</div>
                <div class="art-name">Handmade Crafts</div>
                <div class="art-price">$15</div>
            </div>
            <div class="art-card">
                <div class="art-icon">📿</div>
                <div class="art-name">Jewelry</div>
                <div class="art-price">$20</div>
            </div>
            <div class="art-card">
                <div class="art-icon">🎁</div>
                <div class="art-name">Custom Orders</div>
                <div class="art-price">$40+</div>
            </div>
        </div>
        <div style="text-align: center;">
            <a href="#" class="shop-btn">Shop Now! 🎨</a>
        </div>
    </div>
</body>
</html>`,

  'tutoring': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Tutoring Services</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #E8EAF6 0%, #F3E5F5 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1100px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 50px;
            box-shadow: 0 15px 50px rgba(0,0,0,0.15);
        }
        header {
            text-align: center;
            margin-bottom: 50px;
        }
        h1 {
            font-size: 3em;
            color: #5E35B1;
            margin-bottom: 15px;
        }
        .tagline {
            font-size: 1.2em;
            color: #7E57C2;
        }
        .subjects {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }
        .subject-card {
            background: linear-gradient(135deg, #B39DDB 0%, #CE93D8 100%);
            padding: 35px;
            border-radius: 15px;
            text-align: center;
            border: 2px solid #9575CD;
        }
        .subject-icon {
            font-size: 4em;
            margin-bottom: 20px;
        }
        .subject-name {
            font-size: 1.6em;
            color: #4A148C;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .subject-price {
            font-size: 1.8em;
            color: #6A1B9A;
            font-weight: bold;
        }
        .features {
            background: #F3E5F5;
            padding: 30px;
            border-radius: 15px;
            margin: 40px 0;
        }
        .features h3 {
            color: #5E35B1;
            font-size: 1.5em;
            margin-bottom: 20px;
            text-align: center;
        }
        .features ul {
            list-style: none;
            font-size: 1.1em;
            color: #7E57C2;
        }
        .features li {
            padding: 10px;
            margin-bottom: 10px;
        }
        .features li:before {
            content: "✓ ";
            color: #5E35B1;
            font-weight: bold;
            font-size: 1.3em;
        }
        .contact-btn {
            display: inline-block;
            background: #5E35B1;
            color: white;
            padding: 18px 50px;
            border-radius: 50px;
            font-size: 1.3em;
            font-weight: bold;
            text-decoration: none;
            box-shadow: 0 8px 25px rgba(94,53,177,0.3);
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>📚 Smart Tutoring Services 🎓</h1>
            <p class="tagline">Helping Students Excel in Every Subject!</p>
        </header>
        <div class="subjects">
            <div class="subject-card">
                <div class="subject-icon">📐</div>
                <div class="subject-name">Math</div>
                <div class="subject-price">$25/hr</div>
            </div>
            <div class="subject-card">
                <div class="subject-icon">📖</div>
                <div class="subject-name">English</div>
                <div class="subject-price">$20/hr</div>
            </div>
            <div class="subject-card">
                <div class="subject-icon">🔬</div>
                <div class="subject-name">Science</div>
                <div class="subject-price">$25/hr</div>
            </div>
        </div>
        <div class="features">
            <h3>Why Choose Me?</h3>
            <ul>
                <li>Straight-A student with proven results</li>
                <li>Patient and friendly teaching style</li>
                <li>Flexible scheduling - weekdays & weekends</li>
                <li>Online or in-person sessions available</li>
            </ul>
        </div>
        <div style="text-align: center;">
            <a href="#" class="contact-btn">Book a Session! 📚</a>
        </div>
    </div>
</body>
</html>`,

  'game-dev': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Epic Game Studio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Impact', fantasy;
            background: linear-gradient(135deg, #1A1A2E 0%, #16213E 100%);
            min-height: 100vh;
            padding: 20px;
            color: white;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: linear-gradient(135deg, #0F3460 0%, #16213E 100%);
            border-radius: 20px;
            padding: 50px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            border: 3px solid #E94560;
        }
        header {
            text-align: center;
            margin-bottom: 50px;
        }
        h1 {
            font-size: 3.5em;
            background: linear-gradient(135deg, #E94560 0%, #FF6B9D 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(233,69,96,0.5);
            margin-bottom: 15px;
        }
        .tagline {
            font-size: 1.3em;
            color: #FF6B9D;
        }
        .games {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin: 40px 0;
        }
        .game-card {
            background: linear-gradient(135deg, #E94560 0%, #0F3460 100%);
            padding: 35px;
            border-radius: 20px;
            text-align: center;
            border: 2px solid #FF6B9D;
            transition: all 0.3s;
        }
        .game-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(233,69,96,0.4);
        }
        .game-icon {
            font-size: 4.5em;
            margin-bottom: 20px;
        }
        .game-name {
            font-size: 1.6em;
            color: #FFD700;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .game-desc {
            font-size: 1.1em;
            color: #FFF;
            opacity: 0.9;
        }
        .play-btn {
            display: inline-block;
            background: linear-gradient(135deg, #E94560 0%, #FF6B9D 100%);
            color: white;
            padding: 20px 60px;
            border-radius: 50px;
            font-size: 1.5em;
            font-weight: bold;
            margin-top: 40px;
            text-decoration: none;
            box-shadow: 0 10px 30px rgba(233,69,96,0.5);
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🎮 Epic Game Studio 🕹️</h1>
            <p class="tagline">Creating Amazing Games for Everyone!</p>
        </header>
        <div class="games">
            <div class="game-card">
                <div class="game-icon">👾</div>
                <div class="game-name">Space Raiders</div>
                <div class="game-desc">Defend Earth from aliens!</div>
            </div>
            <div class="game-card">
                <div class="game-icon">🏃</div>
                <div class="game-name">Jump Quest</div>
                <div class="game-desc">Endless running adventure</div>
            </div>
            <div class="game-card">
                <div class="game-icon">🧩</div>
                <div class="game-name">Puzzle Master</div>
                <div class="game-desc">Challenge your brain!</div>
            </div>
            <div class="game-card">
                <div class="game-icon">⚔️</div>
                <div class="game-name">Battle Arena</div>
                <div class="game-desc">Epic multiplayer battles</div>
            </div>
        </div>
        <div style="text-align: center;">
            <a href="#" class="play-btn">Play Now! 🎮</a>
        </div>
    </div>
</body>
</html>`
};

// Playable game templates
const gameCode: Record<string, string> = {
  'flappy': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flappy Bird</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #87CEEB 0%, #00BFFF 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            overflow: hidden;
        }
        h1 {
            color: white;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
        }
        #game {
            border: 5px solid #FFD700;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        #score {
            color: white;
            font-size: 1.5em;
            margin-top: 20px;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .instructions {
            color: white;
            margin-top: 10px;
            font-size: 1.1em;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }
    </style>
</head>
<body>
    <h1>🐦 Flappy Bird</h1>
    <canvas id="game" width="400" height="600"></canvas>
    <div id="score">Score: 0</div>
    <div class="instructions">Click or Press SPACE to fly!</div>

    <script>
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        
        let bird = { x: 50, y: 250, width: 30, height: 30, velocity: 0, gravity: 0.5, jump: -8 };
        let pipes = [];
        let score = 0;
        let frame = 0;
        let gameOver = false;
        
        function drawBird() {
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(bird.x + bird.width/2, bird.y + bird.height/2, bird.width/2, 0, Math.PI * 2);
            ctx.fill();
            
            // Eye
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(bird.x + 20, bird.y + 10, 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Beak
            ctx.fillStyle = '#FF6B00';
            ctx.beginPath();
            ctx.moveTo(bird.x + bird.width, bird.y + bird.height/2);
            ctx.lineTo(bird.x + bird.width + 10, bird.y + bird.height/2 - 5);
            ctx.lineTo(bird.x + bird.width + 10, bird.y + bird.height/2 + 5);
            ctx.closePath();
            ctx.fill();
        }
        
        function drawPipes() {
            ctx.fillStyle = '#32CD32';
            pipes.forEach(pipe => {
                ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
                ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
                
                // Pipe highlights
                ctx.fillStyle = '#228B22';
                ctx.fillRect(pipe.x, pipe.top - 30, pipe.width, 30);
                ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, 30);
                ctx.fillStyle = '#32CD32';
            });
        }
        
        function update() {
            if (gameOver) return;
            
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;
            
            if (bird.y + bird.height > canvas.height || bird.y < 0) {
                endGame();
                return;
            }
            
            if (frame % 100 === 0) {
                let gap = 150;
                let minTop = 100;
                let maxTop = canvas.height - gap - 100;
                let top = Math.random() * (maxTop - minTop) + minTop;
                pipes.push({
                    x: canvas.width,
                    width: 60,
                    top: top,
                    bottom: canvas.height - top - gap,
                    scored: false
                });
            }
            
            pipes.forEach((pipe, index) => {
                pipe.x -= 3;
                
                if (pipe.x + pipe.width < 0) {
                    pipes.splice(index, 1);
                }
                
                if (!pipe.scored && pipe.x + pipe.width < bird.x) {
                    score++;
                    pipe.scored = true;
                    document.getElementById('score').textContent = 'Score: ' + score;
                }
                
                if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipe.width) {
                    if (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom) {
                        endGame();
                    }
                }
            });
            
            frame++;
        }
        
        function endGame() {
            gameOver = true;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '48px Arial';
            ctx.fillText('Game Over!', 80, 250);
            ctx.font = '24px Arial';
            ctx.fillText('Score: ' + score, 140, 300);
            ctx.fillText('Click to Restart', 100, 350);
        }
        
        function draw() {
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Clouds
            ctx.fillStyle = 'white';
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(100, 100, 30, 0, Math.PI * 2);
            ctx.arc(120, 100, 35, 0, Math.PI * 2);
            ctx.arc(140, 100, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            
            drawPipes();
            drawBird();
        }
        
        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }
        
        function flap() {
            if (gameOver) {
                bird = { x: 50, y: 250, width: 30, height: 30, velocity: 0, gravity: 0.5, jump: -8 };
                pipes = [];
                score = 0;
                frame = 0;
                gameOver = false;
                document.getElementById('score').textContent = 'Score: 0';
            } else {
                bird.velocity = bird.jump;
            }
        }
        
        canvas.addEventListener('click', flap);
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                flap();
            }
        });
        
        gameLoop();
    </script>
</body>
</html>`,

  'snake': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #134E5E 0%, #71B280 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
        }
        h1 {
            color: white;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
        }
        #game {
            border: 5px solid #2E8B57;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            background: #1a4d2e;
        }
        #score {
            color: white;
            font-size: 1.5em;
            margin-top: 20px;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .instructions {
            color: white;
            margin-top: 10px;
            font-size: 1.1em;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }
    </style>
</head>
<body>
    <h1>🐍 Snake Game</h1>
    <canvas id="game" width="500" height="500"></canvas>
    <div id="score">Score: 0</div>
    <div class="instructions">Use Arrow Keys to Move!</div>

    <script>
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        
        const gridSize = 20;
        const tileCount = canvas.width / gridSize;
        
        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 0;
        let dy = 0;
        let score = 0;
        let gameOver = false;
        
        function drawSnake() {
            snake.forEach((segment, index) => {
                ctx.fillStyle = index === 0 ? '#90EE90' : '#32CD32';
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
                
                if (index === 0) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(segment.x * gridSize + 5, segment.y * gridSize + 5, 3, 3);
                    ctx.fillRect(segment.x * gridSize + 12, segment.y * gridSize + 5, 3, 3);
                }
            });
        }
        
        function drawFood() {
            ctx.fillStyle = '#FF6347';
            ctx.beginPath();
            ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        function moveSnake() {
            if (gameOver) return;
            
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            
            if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                endGame();
                return;
            }
            
            for (let segment of snake) {
                if (segment.x === head.x && segment.y === head.y) {
                    endGame();
                    return;
                }
            }
            
            snake.unshift(head);
            
            if (head.x === food.x && head.y === food.y) {
                score++;
                document.getElementById('score').textContent = 'Score: ' + score;
                placeFood();
            } else {
                snake.pop();
            }
        }
        
        function placeFood() {
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
            
            for (let segment of snake) {
                if (segment.x === food.x && segment.y === food.y) {
                    placeFood();
                    return;
                }
            }
        }
        
        function endGame() {
            gameOver = true;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '48px Arial';
            ctx.fillText('Game Over!', 120, 220);
            ctx.font = '24px Arial';
            ctx.fillText('Score: ' + score, 190, 270);
            ctx.fillText('Press R to Restart', 130, 320);
        }
        
        function draw() {
            ctx.fillStyle = '#1a4d2e';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = '#2a5d3e';
            for (let i = 0; i < tileCount; i++) {
                for (let j = 0; j < tileCount; j++) {
                    ctx.strokeRect(i * gridSize, j * gridSize, gridSize, gridSize);
                }
            }
            
            drawFood();
            drawSnake();
        }
        
        function gameLoop() {
            moveSnake();
            draw();
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
            if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
            if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
            if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
            
            if ((e.key === 'r' || e.key === 'R') && gameOver) {
                snake = [{ x: 10, y: 10 }];
                dx = 0;
                dy = 0;
                score = 0;
                gameOver = false;
                document.getElementById('score').textContent = 'Score: 0';
                placeFood();
            }
        });
        
        draw();
        setInterval(gameLoop, 100);
    </script>
</body>
</html>`,

  'car-race': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Race</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #1c1c1c 0%, #3a3a3a 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
        }
        h1 {
            color: #FFD700;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
        }
        #game {
            border: 5px solid #FFD700;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        #score {
            color: white;
            font-size: 1.5em;
            margin-top: 20px;
            font-weight: bold;
        }
        .instructions {
            color: white;
            margin-top: 10px;
            font-size: 1.1em;
        }
    </style>
</head>
<body>
    <h1>🏎️ Car Race</h1>
    <canvas id="game" width="400" height="600"></canvas>
    <div id="score">Score: 0</div>
    <div class="instructions">Use Arrow Keys (← →) to Move!</div>

    <script>
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        
        let car = { x: 175, y: 500, width: 50, height: 80, speed: 5 };
        let obstacles = [];
        let score = 0;
        let frame = 0;
        let gameOver = false;
        let keys = {};
        
        function drawRoad() {
            ctx.fillStyle = '#555';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 5;
            ctx.setLineDash([20, 15]);
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.stroke();
            ctx.setLineDash([]);
            
            ctx.fillStyle = '#333';
            ctx.fillRect(0, 0, 50, canvas.height);
            ctx.fillRect(canvas.width - 50, 0, 50, canvas.height);
        }
        
        function drawCar() {
            ctx.fillStyle = '#FF6B6B';
            ctx.fillRect(car.x, car.y, car.width, car.height);
            
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(car.x + 5, car.y + 60, 10, 15);
            ctx.fillRect(car.x + 35, car.y + 60, 10, 15);
            
            ctx.fillStyle = '#87CEEB';
            ctx.fillRect(car.x + 10, car.y + 20, car.width - 20, 30);
        }
        
        function drawObstacles() {
            obstacles.forEach(obs => {
                ctx.fillStyle = obs.color;
                ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                
                ctx.fillStyle = '#333';
                ctx.fillRect(obs.x + 5, obs.y + 10, 10, 15);
                ctx.fillRect(obs.x + 35, obs.y + 10, 10, 15);
                
                ctx.fillStyle = '#FFD700';
                ctx.fillRect(obs.x + 10, obs.y + 40, obs.width - 20, 20);
            });
        }
        
        function update() {
            if (gameOver) return;
            
            if (keys['ArrowLeft'] && car.x > 50) car.x -= car.speed;
            if (keys['ArrowRight'] && car.x < canvas.width - 50 - car.width) car.x += car.speed;
            
            if (frame % 60 === 0) {
                let lanes = [75, 175, 275];
                let randomLane = lanes[Math.floor(Math.random() * lanes.length)];
                let colors = ['#4169E1', '#32CD32', '#FFD700', '#FF69B4'];
                obstacles.push({
                    x: randomLane,
                    y: -80,
                    width: 50,
                    height: 80,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
            
            obstacles.forEach((obs, index) => {
                obs.y += 5;
                
                if (obs.y > canvas.height) {
                    obstacles.splice(index, 1);
                    score++;
                    document.getElementById('score').textContent = 'Score: ' + score;
                }
                
                if (car.x < obs.x + obs.width && car.x + car.width > obs.x &&
                    car.y < obs.y + obs.height && car.y + car.height > obs.y) {
                    endGame();
                }
            });
            
            frame++;
        }
        
        function endGame() {
            gameOver = true;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FFD700';
            ctx.font = '48px Arial';
            ctx.fillText('Crash!', 120, 250);
            ctx.font = '24px Arial';
            ctx.fillText('Score: ' + score, 145, 300);
            ctx.fillText('Press R to Restart', 90, 350);
        }
        
        function draw() {
            drawRoad();
            drawObstacles();
            drawCar();
        }
        
        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }
        
        document.addEventListener('keydown', (e) => {
            keys[e.key] = true;
            
            if ((e.key === 'r' || e.key === 'R') && gameOver) {
                car.x = 175;
                obstacles = [];
                score = 0;
                frame = 0;
                gameOver = false;
                document.getElementById('score').textContent = 'Score: 0';
            }
        });
        
        document.addEventListener('keyup', (e) => {
            keys[e.key] = false;
        });
        
        gameLoop();
    </script>
</body>
</html>`,

  'pong': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pong Game</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
        }
        h1 {
            color: white;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
        }
        #game {
            border: 5px solid white;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            background: black;
        }
        #score {
            color: white;
            font-size: 1.5em;
            margin-top: 20px;
            font-weight: bold;
        }
        .instructions {
            color: white;
            margin-top: 10px;
            font-size: 1.1em;
        }
    </style>
</head>
<body>
    <h1>🏓 Pong Game</h1>
    <canvas id="game" width="600" height="400"></canvas>
    <div id="score">Player: 0 | Computer: 0</div>
    <div class="instructions">Use W/S Keys to Move!</div>

    <script>
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        
        let paddle1 = { x: 10, y: 160, width: 10, height: 80, speed: 6 };
        let paddle2 = { x: 580, y: 160, width: 10, height: 80, speed: 4 };
        let ball = { x: 300, y: 200, radius: 8, dx: 4, dy: 4 };
        let score1 = 0;
        let score2 = 0;
        let keys = {};
        
        function drawPaddle(p) {
            ctx.fillStyle = 'white';
            ctx.fillRect(p.x, p.y, p.width, p.height);
        }
        
        function drawBall() {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        function drawNet() {
            ctx.strokeStyle = 'white';
            ctx.setLineDash([10, 10]);
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        function update() {
            if (keys['w'] && paddle1.y > 0) paddle1.y -= paddle1.speed;
            if (keys['s'] && paddle1.y < canvas.height - paddle1.height) paddle1.y += paddle1.speed;
            
            if (ball.y < paddle2.y + paddle2.height / 2) {
                paddle2.y -= paddle2.speed * 0.7;
            } else {
                paddle2.y += paddle2.speed * 0.7;
            }
            
            if (paddle2.y < 0) paddle2.y = 0;
            if (paddle2.y > canvas.height - paddle2.height) paddle2.y = canvas.height - paddle2.height;
            
            ball.x += ball.dx;
            ball.y += ball.dy;
            
            if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                ball.dy *= -1;
            }
            
            if (ball.x - ball.radius < paddle1.x + paddle1.width && 
                ball.y > paddle1.y && ball.y < paddle1.y + paddle1.height) {
                ball.dx = Math.abs(ball.dx);
                ball.dx *= 1.05;
            }
            
            if (ball.x + ball.radius > paddle2.x && 
                ball.y > paddle2.y && ball.y < paddle2.y + paddle2.height) {
                ball.dx = -Math.abs(ball.dx);
                ball.dx *= 1.05;
            }
            
            if (ball.x - ball.radius < 0) {
                score2++;
                resetBall();
            }
            
            if (ball.x + ball.radius > canvas.width) {
                score1++;
                resetBall();
            }
            
            document.getElementById('score').textContent = 'Player: ' + score1 + ' | Computer: ' + score2;
        }
        
        function resetBall() {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.dx = (Math.random() > 0.5 ? 1 : -1) * 4;
            ball.dy = (Math.random() > 0.5 ? 1 : -1) * 4;
        }
        
        function draw() {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            drawNet();
            drawPaddle(paddle1);
            drawPaddle(paddle2);
            drawBall();
        }
        
        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }
        
        document.addEventListener('keydown', (e) => {
            keys[e.key.toLowerCase()] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            keys[e.key.toLowerCase()] = false;
        });
        
        gameLoop();
    </script>
</body>
</html>`,

  'memory': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Match</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        h1 {
            color: white;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
        }
        #game {
            display: grid;
            grid-template-columns: repeat(4, 100px);
            gap: 10px;
            margin: 20px 0;
        }
        .card {
            width: 100px;
            height: 100px;
            background: white;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3em;
            cursor: pointer;
            transition: transform 0.3s;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .card:hover {
            transform: scale(1.05);
        }
        .card.flipped {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        .card.matched {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            pointer-events: none;
        }
        .card .back {
            background: white;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
        }
        #score {
            color: white;
            font-size: 1.5em;
            font-weight: bold;
        }
        .instructions {
            color: white;
            margin-top: 10px;
            font-size: 1.1em;
        }
        button {
            background: white;
            color: #667eea;
            border: none;
            padding: 15px 40px;
            font-size: 1.2em;
            border-radius: 50px;
            cursor: pointer;
            margin-top: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            font-weight: bold;
        }
        button:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <h1>🎴 Memory Match</h1>
    <div id="score">Moves: 0 | Matches: 0/8</div>
    <div id="game"></div>
    <button onclick="resetGame()">New Game</button>
    <div class="instructions">Click cards to find matching pairs!</div>

    <script>
        const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🍑'];
        let cards = [...emojis, ...emojis];
        let flippedCards = [];
        let matchedPairs = 0;
        let moves = 0;
        
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        
        function createBoard() {
            const game = document.getElementById('game');
            game.innerHTML = '';
            shuffle(cards);
            
            cards.forEach((emoji, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.emoji = emoji;
                card.dataset.index = index;
                card.innerHTML = '<div class="back">🎴</div>';
                card.addEventListener('click', flipCard);
                game.appendChild(card);
            });
        }
        
        function flipCard() {
            if (flippedCards.length >= 2) return;
            if (this.classList.contains('matched')) return;
            if (this.classList.contains('flipped')) return;
            
            this.classList.add('flipped');
            this.innerHTML = this.dataset.emoji;
            flippedCards.push(this);
            
            if (flippedCards.length === 2) {
                moves++;
                document.getElementById('score').textContent = \`Moves: \${moves} | Matches: \${matchedPairs}/8\`;
                checkMatch();
            }
        }
        
        function checkMatch() {
            const [card1, card2] = flippedCards;
            
            if (card1.dataset.emoji === card2.dataset.emoji) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                document.getElementById('score').textContent = \`Moves: \${moves} | Matches: \${matchedPairs}/8\`;
                flippedCards = [];
                
                if (matchedPairs === 8) {
                    setTimeout(() => {
                        alert(\`🎉 You Won! Completed in \${moves} moves!\`);
                    }, 500);
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    card1.innerHTML = '<div class="back">🎴</div>';
                    card2.innerHTML = '<div class="back">🎴</div>';
                    flippedCards = [];
                }, 1000);
            }
        }
        
        function resetGame() {
            flippedCards = [];
            matchedPairs = 0;
            moves = 0;
            document.getElementById('score').textContent = 'Moves: 0 | Matches: 0/8';
            createBoard();
        }
        
        createBoard();
    </script>
</body>
</html>`,

  'space': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Shooter</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: black;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            overflow: hidden;
        }
        h1 {
            color: #FFD700;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 3px 3px 6px rgba(255,215,0,0.5);
        }
        #game {
            border: 5px solid #FFD700;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(255,215,0,0.3);
        }
        #score {
            color: white;
            font-size: 1.5em;
            margin-top: 20px;
            font-weight: bold;
        }
        .instructions {
            color: white;
            margin-top: 10px;
            font-size: 1.1em;
        }
    </style>
</head>
<body>
    <h1>🚀 Space Shooter</h1>
    <canvas id="game" width="500" height="600"></canvas>
    <div id="score">Score: 0</div>
    <div class="instructions">Arrow Keys to Move | Space to Shoot!</div>

    <script>
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        
        let ship = { x: 225, y: 500, width: 50, height: 60, speed: 7 };
        let bullets = [];
        let asteroids = [];
        let score = 0;
        let frame = 0;
        let gameOver = false;
        let keys = {};
        
        function drawShip() {
            ctx.fillStyle = '#4169E1';
            ctx.beginPath();
            ctx.moveTo(ship.x + ship.width/2, ship.y);
            ctx.lineTo(ship.x, ship.y + ship.height);
            ctx.lineTo(ship.x + ship.width, ship.y + ship.height);
            ctx.closePath();
            ctx.fill();
            
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(ship.x + 10, ship.y + 40, 10, 20);
            ctx.fillRect(ship.x + 30, ship.y + 40, 10, 20);
            
            ctx.fillStyle = '#FF6347';
            ctx.beginPath();
            ctx.arc(ship.x + ship.width/2, ship.y + ship.height, 10, 0, Math.PI, true);
            ctx.fill();
        }
        
        function drawBullets() {
            ctx.fillStyle = '#FFD700';
            bullets.forEach(bullet => {
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            });
        }
        
        function drawAsteroids() {
            asteroids.forEach(ast => {
                ctx.fillStyle = '#8B4513';
                ctx.beginPath();
                ctx.arc(ast.x, ast.y, ast.radius, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = '#A0522D';
                ctx.beginPath();
                ctx.arc(ast.x - ast.radius/3, ast.y - ast.radius/3, ast.radius/3, 0, Math.PI * 2);
                ctx.fill();
            });
        }
        
        function drawStars() {
            ctx.fillStyle = 'white';
            for (let i = 0; i < 50; i++) {
                let x = (i * 37 + frame) % canvas.width;
                let y = (i * 59) % canvas.height;
                ctx.fillRect(x, y, 2, 2);
            }
        }
        
        function update() {
            if (gameOver) return;
            
            if (keys['ArrowLeft'] && ship.x > 0) ship.x -= ship.speed;
            if (keys['ArrowRight'] && ship.x < canvas.width - ship.width) ship.x += ship.speed;
            if (keys['ArrowUp'] && ship.y > 0) ship.y -= ship.speed;
            if (keys['ArrowDown'] && ship.y < canvas.height - ship.height) ship.y += ship.speed;
            
            bullets.forEach((bullet, index) => {
                bullet.y -= bullet.speed;
                if (bullet.y < 0) bullets.splice(index, 1);
            });
            
            if (frame % 40 === 0) {
                asteroids.push({
                    x: Math.random() * (canvas.width - 40) + 20,
                    y: -30,
                    radius: 20 + Math.random() * 20,
                    speed: 2 + Math.random() * 3
                });
            }
            
            asteroids.forEach((ast, astIndex) => {
                ast.y += ast.speed;
                
                if (ast.y > canvas.height) {
                    asteroids.splice(astIndex, 1);
                }
                
                bullets.forEach((bullet, bulletIndex) => {
                    let dist = Math.sqrt((bullet.x - ast.x)**2 + (bullet.y - ast.y)**2);
                    if (dist < ast.radius) {
                        asteroids.splice(astIndex, 1);
                        bullets.splice(bulletIndex, 1);
                        score += 10;
                        document.getElementById('score').textContent = 'Score: ' + score;
                    }
                });
                
                let shipDist = Math.sqrt((ship.x + ship.width/2 - ast.x)**2 + (ship.y + ship.height/2 - ast.y)**2);
                if (shipDist < ast.radius + 20) {
                    endGame();
                }
            });
            
            frame++;
        }
        
        function endGame() {
            gameOver = true;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FFD700';
            ctx.font = '48px Arial';
            ctx.fillText('Game Over!', 120, 250);
            ctx.font = '24px Arial';
            ctx.fillText('Score: ' + score, 190, 300);
            ctx.fillText('Press R to Restart', 130, 350);
        }
        
        function draw() {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            drawStars();
            drawBullets();
            drawAsteroids();
            drawShip();
        }
        
        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }
        
        document.addEventListener('keydown', (e) => {
            keys[e.key] = true;
            
            if (e.key === ' ' && !gameOver) {
                e.preventDefault();
                bullets.push({
                    x: ship.x + ship.width/2 - 2,
                    y: ship.y,
                    width: 4,
                    height: 15,
                    speed: 10
                });
            }
            
            if ((e.key === 'r' || e.key === 'R') && gameOver) {
                ship.x = 225;
                ship.y = 500;
                bullets = [];
                asteroids = [];
                score = 0;
                frame = 0;
                gameOver = false;
                document.getElementById('score').textContent = 'Score: 0';
            }
        });
        
        document.addEventListener('keyup', (e) => {
            keys[e.key] = false;
        });
        
        gameLoop();
    </script>
</body>
</html>`,

  'catch': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fruit Catch</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #FFE5B4 0%, #FFDAB9 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
        }
        h1 {
            color: #FF6347;
            font-size: 2.5em;
            margin-bottom: 20px;
            text-shadow: 3px 3px 6px rgba(0,0,0,0.2);
        }
        #game {
            border: 5px solid #FF6347;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            background: linear-gradient(180deg, #87CEEB 0%, #98FB98 100%);
        }
        #score {
            color: #FF6347;
            font-size: 1.5em;
            margin-top: 20px;
            font-weight: bold;
        }
        .instructions {
            color: #FF6347;
            margin-top: 10px;
            font-size: 1.1em;
        }
    </style>
</head>
<body>
    <h1>🍎 Fruit Catch</h1>
    <canvas id="game" width="500" height="600"></canvas>
    <div id="score">Score: 0 | Lives: 3</div>
    <div class="instructions">Use Arrow Keys (← →) to Catch Fruits!</div>

    <script>
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');
        
        let basket = { x: 200, y: 550, width: 100, height: 40, speed: 8 };
        let fruits = [];
        let score = 0;
        let lives = 3;
        let frame = 0;
        let gameOver = false;
        let keys = {};
        
        const fruitTypes = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍉', '🍒', '🍑', '🥝', '🍍'];
        
        function drawBasket() {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
            
            ctx.fillStyle = '#D2691E';
            for (let i = 0; i < 5; i++) {
                ctx.fillRect(basket.x + i * 20, basket.y, 10, basket.height);
            }
            
            ctx.strokeStyle = '#654321';
            ctx.lineWidth = 3;
            ctx.strokeRect(basket.x, basket.y, basket.width, basket.height);
        }
        
        function drawFruits() {
            ctx.font = '40px Arial';
            fruits.forEach(fruit => {
                ctx.fillText(fruit.emoji, fruit.x, fruit.y);
            });
        }
        
        function drawBackground() {
            let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#87CEEB');
            gradient.addColorStop(1, '#98FB98');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(100, 100, 40, 0, Math.PI * 2);
            ctx.arc(120, 100, 50, 0, Math.PI * 2);
            ctx.arc(140, 100, 40, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(400, 150, 40, 0, Math.PI * 2);
            ctx.arc(420, 150, 50, 0, Math.PI * 2);
            ctx.fill();
        }
        
        function update() {
            if (gameOver) return;
            
            if (keys['ArrowLeft'] && basket.x > 0) basket.x -= basket.speed;
            if (keys['ArrowRight'] && basket.x < canvas.width - basket.width) basket.x += basket.speed;
            
            if (frame % 30 === 0) {
                fruits.push({
                    x: Math.random() * (canvas.width - 40),
                    y: 0,
                    speed: 3 + Math.random() * 2,
                    emoji: fruitTypes[Math.floor(Math.random() * fruitTypes.length)]
                });
            }
            
            fruits.forEach((fruit, index) => {
                fruit.y += fruit.speed;
                
                if (fruit.y > canvas.height) {
                    fruits.splice(index, 1);
                    lives--;
                    updateScore();
                    if (lives <= 0) endGame();
                }
                
                if (fruit.y + 40 >= basket.y && fruit.y + 40 <= basket.y + basket.height &&
                    fruit.x + 20 >= basket.x && fruit.x + 20 <= basket.x + basket.width) {
                    fruits.splice(index, 1);
                    score += 10;
                    updateScore();
                }
            });
            
            frame++;
        }
        
        function updateScore() {
            document.getElementById('score').textContent = \`Score: \${score} | Lives: \${lives}\`;
        }
        
        function endGame() {
            gameOver = true;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#FFD700';
            ctx.font = '48px Arial';
            ctx.fillText('Game Over!', 120, 250);
            ctx.font = '24px Arial';
            ctx.fillText('Final Score: ' + score, 160, 300);
            ctx.fillText('Press R to Restart', 130, 350);
        }
        
        function draw() {
            drawBackground();
            drawFruits();
            drawBasket();
        }
        
        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }
        
        document.addEventListener('keydown', (e) => {
            keys[e.key] = true;
            
            if ((e.key === 'r' || e.key === 'R') && gameOver) {
                basket.x = 200;
                fruits = [];
                score = 0;
                lives = 3;
                frame = 0;
                gameOver = false;
                updateScore();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            keys[e.key] = false;
        });
        
        gameLoop();
    </script>
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
  
  // Game builder state
  const [selectedGame, setSelectedGame] = useState('');
  const [gamePreview, setGamePreview] = useState('');
  const [showGamePreview, setShowGamePreview] = useState(true);
  
  // Personalization state
  const [studentName, setStudentName] = useState('');
  const [showNameModal, setShowNameModal] = useState(true);
  const [tempName, setTempName] = useState('');

  // Load name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('orbit-demo-student-name');
    if (savedName) {
      setStudentName(savedName);
      setShowNameModal(false);
    }
  }, []);

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
      let baseCode = '';
      
      // ALWAYS use fallback templates for demo (instant, reliable, no API costs)
      if (templateId && fallbackTemplates[templateId]) {
        // Simulate AI thinking for effect
        await new Promise(resolve => setTimeout(resolve, 1500));
        baseCode = fallbackTemplates[templateId];
      } else {
        // For custom prompts, use a smart template based on keywords
        const lowerPrompt = prompt.toLowerCase();
        let selectedTemplate = 'bakery'; // default
        
        if (lowerPrompt.includes('lemonade') || lowerPrompt.includes('drink') || lowerPrompt.includes('juice')) {
          selectedTemplate = 'lemonade';
        } else if (lowerPrompt.includes('pet') || lowerPrompt.includes('dog') || lowerPrompt.includes('cat') || lowerPrompt.includes('animal')) {
          selectedTemplate = 'pet-sitting';
        } else if (lowerPrompt.includes('art') || lowerPrompt.includes('craft') || lowerPrompt.includes('paint') || lowerPrompt.includes('draw')) {
          selectedTemplate = 'art-shop';
        } else if (lowerPrompt.includes('tutor') || lowerPrompt.includes('teach') || lowerPrompt.includes('education') || lowerPrompt.includes('homework')) {
          selectedTemplate = 'tutoring';
        } else if (lowerPrompt.includes('game') || lowerPrompt.includes('video') || lowerPrompt.includes('play')) {
          selectedTemplate = 'game-dev';
        }
        
        // Simulate AI thinking
        await new Promise(resolve => setTimeout(resolve, 2000));
        baseCode = fallbackTemplates[selectedTemplate];
      }
      
      // Inject "Made by" footer
      const codeWithFooter = injectMadeByFooter(baseCode, studentName);
      setGeneratedCode(codeWithFooter);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error generating website:', error);
      // Use fallback on error
      let baseCode = '';
      if (templateId && fallbackTemplates[templateId]) {
        baseCode = fallbackTemplates[templateId];
      } else {
        baseCode = fallbackTemplates['bakery'];
      }
      const codeWithFooter = injectMadeByFooter(baseCode, studentName);
      setGeneratedCode(codeWithFooter);
      setShowSuccessMessage(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      setStudentName(tempName.trim());
      localStorage.setItem('orbit-demo-student-name', tempName.trim());
      setShowNameModal(false);
    }
  };

  const handleChangeName = () => {
    setTempName(studentName);
    setShowNameModal(true);
  };

  // Function to inject "Made by" footer into HTML
  const injectMadeByFooter = (htmlCode: string, name: string) => {
    if (!name) return htmlCode;
    
    const footerHTML = `
    <!-- Made By Footer -->
    <div style="position: fixed; bottom: 0; left: 0; right: 0; background: linear-gradient(135deg, #1876D2 0%, #00B0FF 100%); color: white; padding: 12px 20px; text-align: center; font-family: Arial, sans-serif; font-size: 14px; font-weight: 600; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); z-index: 9999;">
        🌟 Made by <span style="font-size: 16px; color: #FFD700;">${name}</span> 🚀
    </div>
    <div style="height: 48px;"></div> <!-- Spacer for fixed footer -->
`;
    
    // Insert before closing body tag
    return htmlCode.replace('</body>', `${footerHTML}</body>`);
  };

  const handleGameSelect = async (gameId: string) => {
    setSelectedGame(gameId);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for effect
    const codeWithFooter = injectMadeByFooter(gameCode[gameId], studentName);
    setGamePreview(codeWithFooter);
    setShowGamePreview(true);
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
    <>
      <Helmet>
        <title>Orbit Demo | Interactive AI Builder</title>
        <meta name="description" content="Try Orbit free: build sample AI websites and games. See how students learn with our interactive builder." />
        <meta name="keywords" content="Orbit Student demo, Orbit Student free trial, Orbit Student AI builder, kids website builder, kids game maker, Orbit Student preview, try Orbit Student" />
        <link rel="canonical" href="https://www.orbitstudent.com/demo" />
        <meta property="og:title" content="Orbit Demo | Free AI Builder for Kids" />
        <meta property="og:description" content="Interactive demo: build AI websites and games. No signup required to explore." />
        <meta property="og:url" content="https://www.orbitstudent.com/demo" />
      </Helmet>
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAFF] via-white to-[#E3F2FD]">
      {/* Name Input Modal */}
      <AnimatePresence>
        {showNameModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-o-2 rounded-3xl max-w-md w-full p-8 relative overflow-hidden border border-o"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#1876D2]/20 to-[#00B0FF]/20 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-[#00B0FF]/20 to-[#40C4FF]/20 rounded-full filter blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <LottieAnimation
                    src="/animations/welcome.json"
                    className="w-24 h-24 mx-auto mb-2"
                  />
                  <h2 className="text-2xl font-bold text-o-0 mb-2">
                    Welcome to Orbit Demo
                  </h2>
                  <p className="text-o-2">
                    What's the student's name?
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                    placeholder="Enter student name..."
                    className="orbit-field-dark w-full px-6 py-4 rounded-xl border-2 border-o transition-all text-lg text-center font-semibold bg-o-3 text-o-0 placeholder:text-o-2 caret-[#00B0FF] focus:border-[#1876D2] focus:ring-4 focus:ring-[#1876D2]/20 outline-none"
                    autoFocus
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNameSubmit}
                    disabled={!tempName.trim()}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      tempName.trim()
                        ? 'bg-gradient-to-r from-[#1876D2] via-[#1E88E5] to-[#00B0FF] text-white hover:opacity-95 shadow-lg shadow-black/20'
                        : 'bg-o-4 text-o-3 cursor-not-allowed border border-o opacity-75'
                    }`}
                  >
                    Start Building
                  </motion.button>
                </div>

                <div className="mt-6 text-center text-sm text-o-2">
                  Tip: All previews will show “Made by {tempName || '[Name]'}”
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="relative bg-slate-950 text-white pt-24 pb-16 px-4 overflow-hidden">
        {/* Background mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1876D2]/20 via-transparent to-[#00B0FF]/10"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#1876D2]/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#00B0FF]/10 rounded-full filter blur-[80px]"></div>
        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles className="h-4 w-4 text-[#00B0FF]" />
              <span className="text-sm text-gray-300 font-medium">Orbit Interactive Demo</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              AI Website <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">Builder</span>
            </h1>
            
            {/* Student Name Display */}
            {studentName && (
              <div className="flex items-center justify-center mb-4">
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/10">
                  <span className="text-sm text-gray-300">
                    Building as <span className="font-bold text-white">{studentName}</span>
                  </span>
                  <button
                    onClick={handleChangeName}
                    className="text-xs bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full transition-all text-gray-400 hover:text-white"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Watch AI create real websites in seconds — this is what students learn to build at Orbit
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Rocket className="h-5 w-5 mr-2 text-[#1876D2]" />
            Choose a Business Idea
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {templates.map((template) => (
              <motion.button
                key={template.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTemplateClick(template)}
                className={`p-5 rounded-xl font-medium transition-all border ${
                  selectedTemplate === template.id
                    ? 'bg-[#1876D2] text-white shadow-xl border-[#1876D2] ring-2 ring-[#1876D2]/30'
                    : 'bg-white text-gray-700 shadow-sm hover:shadow-md border-gray-100'
                }`}
              >
                <div className="text-3xl mb-2">{template.icon}</div>
                <div className="text-xs">{template.name}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Custom Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 bg-o-2 rounded-xl p-6 border border-o"
        >
          <h3 className="text-lg font-semibold text-o-0 mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-[#00B0FF]" />
            Or Describe Your Own Website
          </h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g., 'Create a website for my dog walking business...'"
              className="orbit-field-dark flex-1 px-4 py-3 border-2 border-o rounded-xl focus:border-[#1876D2] focus:ring-2 focus:ring-[#1876D2]/20 outline-none text-base bg-o-3 text-o-0 placeholder:text-o-2 caret-[#00B0FF]"
              onKeyPress={(e) => e.key === 'Enter' && handleCustomGenerate()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCustomGenerate}
              disabled={isGenerating || !customPrompt.trim()}
              className="px-6 py-3 bg-[#1876D2] hover:bg-[#1565C0] text-white rounded-xl font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all"
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
              className="mb-8 bg-[#E3F2FD] rounded-xl p-8 text-center border border-[#1876D2]/10"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-10 h-10 border-2 border-[#1876D2]/30 border-t-[#1876D2] rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI is building your website...
              </h3>
              <p className="text-gray-500 text-sm">
                This usually takes a few seconds
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
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center ${
                    !showPreview
                      ? 'bg-[#1876D2] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Code
                </button>
                <button
                  onClick={() => setShowPreview(true)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center ${
                    showPreview
                      ? 'bg-[#1876D2] text-white'
                      : 'text-gray-400 hover:text-white'
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
                  sandbox="allow-same-origin"
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
            className="mt-12 bg-slate-950 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden border border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1876D2]/10 via-transparent to-[#00B0FF]/5"></div>
            <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Your Child Can Build This Too
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              In our 180-day program, students learn to:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                <Globe className="h-6 w-6 text-[#00B0FF] mb-3" />
                <h3 className="font-semibold text-sm mb-1">Build Real Websites</h3>
                <p className="text-gray-400 text-xs">Create professional websites from scratch</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                <Sparkles className="h-6 w-6 text-[#00B0FF] mb-3" />
                <h3 className="font-semibold text-sm mb-1">Master AI Tools</h3>
                <p className="text-gray-400 text-xs">Learn to use AI like a pro developer</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/5">
                <Rocket className="h-6 w-6 text-[#00B0FF] mb-3" />
                <h3 className="font-semibold text-sm mb-1">Launch Real Businesses</h3>
                <p className="text-gray-400 text-xs">Turn ideas into real products</p>
              </div>
            </div>
            <motion.a
              href="/#enrollment"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white rounded-xl font-semibold transition-all"
            >
              Enroll Your Child Now
            </motion.a>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!generatedCode && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <LottieAnimation
              src="/animations/coding.json"
              className="w-48 h-48 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Ready to Build?
            </h3>
            <p className="text-gray-500">
              Click a template above or describe your dream website
            </p>
          </motion.div>
        )}
      </div>

      {/* ======== GAME BUILDER SECTION ======== */}
      <div className="min-h-screen bg-slate-950 py-20 px-4 relative">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#1876D2]/10 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#00B0FF]/8 rounded-full filter blur-[100px]"></div>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Gamepad2 className="h-4 w-4 text-[#00B0FF]" />
              <span className="text-sm text-gray-300 font-medium">Game Builder</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1876D2] to-[#00B0FF]">
                Epic Games
              </span>
            </h2>
            
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Choose from 7 game templates — each fully playable and ready to customize. Just click and play.
            </p>
          </motion.div>

          {/* Game Template Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
            {gameTemplates.map((game, index) => (
              <motion.button
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGameSelect(game.id)}
                className={`
                  relative p-5 rounded-xl transition-all duration-300
                  ${selectedGame === game.id 
                    ? 'bg-[#1876D2]/20 border border-[#1876D2]/50 shadow-xl ring-1 ring-[#1876D2]/30' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }
                `}
              >
                <div className="text-4xl mb-2">{game.icon}</div>
                <div className="text-white font-medium text-xs mb-1">{game.name}</div>
                <div className="text-gray-400 text-[10px]">{game.description}</div>
                
                {selectedGame === game.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Game Preview */}
          {gamePreview && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
            >
              {/* Preview Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-[#1876D2]/20 px-3 py-1.5 rounded-full border border-[#1876D2]/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-medium">Live & Playable</span>
                  </div>
                  <button
                    onClick={() => setShowGamePreview(!showGamePreview)}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all"
                  >
                    {showGamePreview ? (
                      <>
                        <Code className="w-4 h-4 text-white" />
                        <span className="text-white">View Code</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 text-white" />
                        <span className="text-white">Play Game</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const blob = new Blob([gamePreview], { type: 'text/html' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${selectedGame}-game.html`;
                      a.click();
                    }}
                    className="p-3 bg-green-500 hover:bg-green-600 rounded-full transition-all"
                  >
                    <Download className="w-5 h-5 text-white" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText(gamePreview);
                      alert('✅ Game code copied to clipboard!');
                    }}
                    className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-all"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>

              {/* Game Content */}
              <div className="bg-black/30 rounded-2xl overflow-hidden relative">
                {showGamePreview ? (
                  <>
                    <iframe
                      srcDoc={gamePreview}
                      className="w-full h-[650px] border-0"
                      title="Game Preview"
                      sandbox="allow-scripts allow-same-origin"
                    />
                    
                    {/* Click to Play Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-6 py-3 rounded-full font-bold shadow-lg animate-bounce">
                        👆 Click inside the game to start playing!
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-6 max-h-[650px] overflow-auto">
                    <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                      {gamePreview}
                    </pre>
                  </div>
                )}
              </div>

              {/* Game Info */}
              <div className="mt-6 space-y-4">
                {/* Controls Guide */}
                <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-xl p-6">
                  <h4 className="text-yellow-300 font-bold text-lg mb-3 flex items-center justify-center">
                    <span className="mr-2">⌨️</span>
                    HOW TO PLAY
                    <span className="ml-2">🎮</span>
                  </h4>
                  <div className="text-white text-base space-y-2">
                    <p className="font-bold text-yellow-300">1️⃣ CLICK inside the game area above</p>
                    <p className="font-bold text-yellow-300">2️⃣ Use these controls:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {selectedGame === 'flappy' && (
                        <>
                          <div className="bg-white/10 p-3 rounded-lg">🚀 <strong>SPACE</strong> or <strong>CLICK</strong> - Make bird fly</div>
                          <div className="bg-white/10 p-3 rounded-lg">🎯 Avoid pipes & stay alive!</div>
                        </>
                      )}
                      {selectedGame === 'snake' && (
                        <>
                          <div className="bg-white/10 p-3 rounded-lg">⬆️ <strong>Arrow Keys</strong> - Change direction</div>
                          <div className="bg-white/10 p-3 rounded-lg">🍎 Eat food to grow longer!</div>
                        </>
                      )}
                      {selectedGame === 'car-race' && (
                        <>
                          <div className="bg-white/10 p-3 rounded-lg">⬅️➡️ <strong>Left/Right Arrows</strong> - Steer car</div>
                          <div className="bg-white/10 p-3 rounded-lg">🚗 Dodge other cars!</div>
                        </>
                      )}
                      {selectedGame === 'pong' && (
                        <>
                          <div className="bg-white/10 p-3 rounded-lg">⬆️⬇️ <strong>W/S Keys</strong> - Move paddle</div>
                          <div className="bg-white/10 p-3 rounded-lg">🏓 Beat the computer!</div>
                        </>
                      )}
                      {selectedGame === 'memory' && (
                        <>
                          <div className="bg-white/10 p-3 rounded-lg">🖱️ <strong>CLICK</strong> cards to flip</div>
                          <div className="bg-white/10 p-3 rounded-lg">🎴 Find matching pairs!</div>
                        </>
                      )}
                      {selectedGame === 'space' && (
                        <>
                          <div className="bg-white/10 p-3 rounded-lg">⬆️⬇️⬅️➡️ <strong>Arrow Keys</strong> - Move ship</div>
                          <div className="bg-white/10 p-3 rounded-lg">🚀 <strong>SPACE</strong> - Shoot asteroids!</div>
                        </>
                      )}
                      {selectedGame === 'catch' && (
                        <>
                          <div className="bg-white/10 p-3 rounded-lg">⬅️➡️ <strong>Left/Right Arrows</strong> - Move basket</div>
                          <div className="bg-white/10 p-3 rounded-lg">🍎 Catch falling fruits!</div>
                        </>
                      )}
                    </div>
                    <p className="text-yellow-300 font-bold mt-4">3️⃣ Press <strong>R</strong> to restart (most games)</p>
                  </div>
                </div>
                
                {/* Additional Info */}
                <div className="text-center">
                  <p className="text-gray-300 text-sm mb-1">
                    This game is 100% playable & fully functional
                  </p>
                  <p className="text-gray-400 text-xs">
                    Your child can build games like this and customize them with their own ideas
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!gamePreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Gamepad2 className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Pick a Game to Start
              </h3>
              <p className="text-gray-400">
                Click any game template above to see it in action
              </p>
            </motion.div>
          )}

          {/* ═══ STARTUP EMPIRE SHOWCASE ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            {/* Section Badge */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold mb-4">
                <Rocket className="w-4 h-4" /> FLAGSHIP GAME — Exclusive to Dashboard
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 mb-3">
                Startup Empire
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Build your company from zero to a $10M empire. Real business decisions. Real consequences. 6 stages, 24 missions — the most immersive entrepreneurship game ever built.
              </p>
            </div>

            {/* Empire Preview Card */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/20 rounded-3xl overflow-hidden">
              {/* Animated Glow Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10 animate-pulse" />
              
              <div className="relative p-6 sm:p-10">
                {/* Stage Roadmap */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                  {[
                    { stage: 1, name: 'The Idea Lab', icon: '💡', color: 'from-amber-500 to-yellow-500', desc: 'Find & validate your idea' },
                    { stage: 2, name: 'Brand HQ', icon: '🎨', color: 'from-pink-500 to-rose-500', desc: 'Create your identity' },
                    { stage: 3, name: 'The Build', icon: '🛠️', color: 'from-blue-500 to-indigo-500', desc: 'Ship your MVP' },
                    { stage: 4, name: 'Marketing Blitz', icon: '📣', color: 'from-violet-500 to-purple-500', desc: 'Go viral' },
                    { stage: 5, name: 'Investor Pitch', icon: '💰', color: 'from-emerald-500 to-green-500', desc: 'Raise funding' },
                    { stage: 6, name: 'Empire Mode', icon: '👑', color: 'from-yellow-500 to-amber-500', desc: 'Scale to millions' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.stage}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group"
                    >
                      <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 text-center hover:bg-white/[0.08] transition-all cursor-default">
                        <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl shadow-lg mb-2`}>
                          {s.icon}
                        </div>
                        <p className="text-white text-xs font-bold mb-0.5">{s.name}</p>
                        <p className="text-gray-500 text-[10px]">{s.desc}</p>
                      </div>
                      {i < 5 && (
                        <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-600 z-10">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Interactive Mission Preview */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 sm:p-8 mb-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Sample Mission Preview</p>
                      <h4 className="text-lg font-bold text-white">The Shark Tank Moment</h4>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-lg">+150 XP</span>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg">+500 🪙</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 rounded-xl p-5 border border-white/[0.05] mb-5">
                    <p className="text-gray-200 leading-relaxed">
                      You're on stage. Your pitch went great. Now the investors fire questions:
                    </p>
                    <p className="text-amber-400 font-medium mt-3 italic">
                      "Your competitor just raised $5 million. Why should I bet on YOU instead of them?"
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: 'A', text: '"We\'re better because we work harder"', dim: true },
                      { label: 'B', text: '"Our unique advantage is [specific thing] and we already have [traction]"', highlight: true },
                      { label: 'C', text: '"I don\'t really follow the competition"', dim: true },
                      { label: 'D', text: '"We just need more money to beat them"', dim: true },
                    ].map((opt) => (
                      <div
                        key={opt.label}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                          opt.highlight
                            ? 'bg-emerald-500/15 border-emerald-500/30'
                            : 'bg-white/[0.02] border-white/[0.05] opacity-60'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          opt.highlight ? 'bg-emerald-500 text-white' : 'bg-white/[0.1] text-gray-500'
                        }`}>
                          {opt.highlight ? '✓' : opt.label}
                        </span>
                        <p className={`text-sm ${opt.highlight ? 'text-emerald-300 font-medium' : 'text-gray-400'}`}>{opt.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Result Preview */}
                  <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="text-emerald-400 text-sm">
                      🦈 <strong>The investors lean forward!</strong> You say: "While they raised $5M to sell to enterprises, we built the only product designed for teens — with 500 paying users and 90% retention." <strong>Offer: $100K for 10%!</strong>
                    </p>
                  </div>
                </div>

                {/* Stats Preview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: '6 Stages', value: 'Zero → IPO', icon: '🗺️' },
                    { label: '24 Missions', value: 'Real Scenarios', icon: '🎯' },
                    { label: 'Build', value: 'Your Company', icon: '🏢' },
                    { label: 'Earn', value: 'XP & Coins', icon: '💰' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-center">
                      <span className="text-2xl">{stat.icon}</span>
                      <p className="text-white font-bold text-sm mt-1">{stat.value}</p>
                      <p className="text-gray-500 text-[10px]">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Exclusive Badge */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-semibold text-sm">Available exclusively in the Orbit Student Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ═══ GAME ZONE SHOWCASE ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-full text-violet-400 text-sm font-semibold mb-4">
                <Gamepad2 className="w-4 h-4" /> FUN LEARNING GAMES — Inside Dashboard
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 mb-3">
                Game Zone
              </h3>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                10 playable mini-games that teach real business skills — from running a lemonade stand to trading goods across planets. Kids learn while having a blast!
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {[
                { emoji: '🍋', name: 'Lemonade Tycoon', skill: 'Pricing & Profit', color: 'from-yellow-400 to-amber-500' },
                { emoji: '🪙', name: 'Coin Catcher', skill: 'Quick Thinking', color: 'from-amber-400 to-orange-500' },
                { emoji: '📝', name: 'Word Hustle', skill: 'Business Vocab', color: 'from-blue-400 to-indigo-500' },
                { emoji: '📈', name: 'Stock Surfer', skill: 'Market Timing', color: 'from-emerald-400 to-teal-500' },
                { emoji: '🧠', name: 'Brand Memory', skill: 'Brand Recognition', color: 'from-violet-400 to-purple-500' },
                { emoji: '⚡', name: 'Pitch Racer', skill: 'Communication', color: 'from-pink-400 to-rose-500' },
                { emoji: '🎤', name: 'CEO Quiz Show', skill: 'Business IQ', color: 'from-indigo-400 to-blue-600' },
                { emoji: '💳', name: 'Budget Boss', skill: 'Financial Literacy', color: 'from-teal-400 to-cyan-500' },
                { emoji: '🚀', name: 'Emoji Startup', skill: 'Creative Pitching', color: 'from-orange-400 to-red-500' },
                { emoji: '🛸', name: 'Space Trader', skill: 'Economics', color: 'from-cyan-400 to-blue-500' },
              ].map((game, i) => (
                <motion.div
                  key={game.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-center hover:bg-white/[0.08] transition-all"
                >
                  <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl shadow-lg mb-2`}>
                    {game.emoji}
                  </div>
                  <p className="text-white text-xs font-bold mb-0.5">{game.name}</p>
                  <p className="text-gray-500 text-[10px]">{game.skill}</p>
                </motion.div>
              ))}
            </div>

            {/* Interactive Demo Preview */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-violet-500/20 rounded-3xl overflow-hidden p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {/* Lemonade Preview */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🍋</span>
                    <div>
                      <h4 className="text-white font-bold">Lemonade Tycoon</h4>
                      <p className="text-gray-500 text-xs">Set prices, manage weather, maximize profit</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between bg-white/[0.04] rounded-lg p-2">
                      <span className="text-gray-400">☀️ Sunny Day</span><span className="text-emerald-400 font-bold">$24 revenue</span>
                    </div>
                    <div className="flex justify-between bg-white/[0.04] rounded-lg p-2">
                      <span className="text-gray-400">🌧️ Rainy Day</span><span className="text-red-400 font-bold">$6 revenue</span>
                    </div>
                    <div className="flex justify-between bg-amber-500/10 rounded-lg p-2 border border-amber-500/20">
                      <span className="text-amber-300">💰 Total Profit</span><span className="text-amber-400 font-bold">$142</span>
                    </div>
                  </div>
                </div>

                {/* Quiz Show Preview */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🎤</span>
                    <div>
                      <h4 className="text-white font-bold">CEO Quiz Show</h4>
                      <p className="text-gray-500 text-xs">Who Wants to Be a Millionaire — business edition</p>
                    </div>
                  </div>
                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 mb-2">
                    <p className="text-indigo-300 text-sm font-medium">"What does ROI stand for?"</p>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <div className="bg-white/[0.04] rounded-lg p-2 text-gray-400">A: Rate of Interest</div>
                    <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-2 text-emerald-300 font-bold">B: Return on Investment ✓</div>
                    <div className="bg-white/[0.04] rounded-lg p-2 text-gray-400">C: Revenue of Income</div>
                    <div className="bg-white/[0.04] rounded-lg p-2 text-gray-400">D: Risk of Inflation</div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Emoji Startup Preview */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🚀</span>
                    <div>
                      <h4 className="text-white font-bold">Emoji Startup</h4>
                      <p className="text-gray-500 text-xs">Create wild startup ideas from random emojis</p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 text-4xl mb-3">🍕🤖🐕</div>
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-center">
                    <p className="text-orange-300 text-sm font-bold">"PizzaPup AI"</p>
                    <p className="text-gray-400 text-xs">AI that delivers pizza to dogs 🐕‍🍕</p>
                  </div>
                  <div className="flex gap-2 mt-2 justify-center">
                    <span className="text-xs bg-white/[0.04] px-2 py-1 rounded-lg">👩‍💼 Score: 87</span>
                    <span className="text-xs bg-white/[0.04] px-2 py-1 rounded-lg">🧔 Score: 72</span>
                    <span className="text-xs bg-white/[0.04] px-2 py-1 rounded-lg">👩‍🔬 Score: 91</span>
                  </div>
                </div>

                {/* Space Trader Preview */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🛸</span>
                    <div>
                      <h4 className="text-white font-bold">Space Trader</h4>
                      <p className="text-gray-500 text-xs">Buy & sell goods across planets for profit</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-3">
                    {['🌍', '🔴', '🟤', '🔵', '🪐'].map((p, i) => (
                      <div key={i} className={`flex-1 text-center py-1.5 rounded-lg text-lg ${i === 0 ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/[0.04]'}`}>{p}</div>
                    ))}
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between bg-white/[0.04] rounded-lg p-2">
                      <span className="text-gray-400">💧 Water</span><span className="text-emerald-400 font-bold">$12 → $58 🚀</span>
                    </div>
                    <div className="flex justify-between bg-white/[0.04] rounded-lg p-2">
                      <span className="text-gray-400">💎 Crystals</span><span className="text-amber-400 font-bold">$85 → $142 💰</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-full">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-violet-300 font-semibold text-sm">All 10 games playable inside the Orbit Student Dashboard</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10">
              <h3 className="text-2xl font-bold text-white mb-3">
                Your Child Can Build All of This — And More
              </h3>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                From AI websites to playable business games to building a real startup empire — imagine what your child will achieve with Orbit Student's 180-day program.
              </p>
              <motion.a
                href="https://www.orbitstudent.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block bg-gradient-to-r from-[#1876D2] to-[#00B0FF] text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all"
              >
                Start Building Today
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
}

