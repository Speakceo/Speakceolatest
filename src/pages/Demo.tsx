import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Rocket, Code, Eye, RefreshCw, Download, Share2, Zap } from 'lucide-react';
import { generateAIResponse } from '../lib/openai';

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
      // ALWAYS use fallback templates for demo (instant, reliable, no API costs)
      if (templateId && fallbackTemplates[templateId]) {
        // Simulate AI thinking for effect
        await new Promise(resolve => setTimeout(resolve, 1500));
        setGeneratedCode(fallbackTemplates[templateId]);
        setShowSuccessMessage(true);
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
        setGeneratedCode(fallbackTemplates[selectedTemplate]);
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

  const handleGameSelect = async (gameId: string) => {
    setSelectedGame(gameId);
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay for effect
    setGamePreview(gameCode[gameId]);
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

      {/* ======== GAME BUILDER SECTION ======== */}
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="text-8xl">🎮</div>
            </motion.div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Build <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                Epic Games
              </span>
            </h2>
            
            <p className="text-2xl text-purple-200 mb-4">
              Create Real, Playable Games in Seconds!
            </p>
            
            <p className="text-lg text-purple-300 max-w-3xl mx-auto">
              Choose from 7 awesome game templates. Each one is fully playable, interactive, and ready to customize. 
              No complex coding needed – just click and play! 🚀
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
                  relative p-6 rounded-2xl backdrop-blur-xl transition-all duration-300
                  ${selectedGame === game.id 
                    ? 'bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-cyan-500/30 border-2 border-white shadow-2xl' 
                    : 'bg-white/10 border border-white/20 hover:bg-white/20'
                  }
                `}
              >
                <div className="text-5xl mb-3">{game.icon}</div>
                <div className="text-white font-semibold text-sm mb-2">{game.name}</div>
                <div className="text-purple-200 text-xs">{game.description}</div>
                
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
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-purple-500/30 px-4 py-2 rounded-full">
                    <Zap className="w-5 h-5 text-yellow-300" />
                    <span className="text-white font-semibold">Live & Playable!</span>
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
                  <p className="text-purple-200 text-lg mb-2">
                    🎮 This game is 100% playable & fully functional!
                  </p>
                  <p className="text-purple-300 text-sm">
                    Your child can build games like this AND customize them with their own ideas!
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
              <div className="text-8xl mb-6">🎯</div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Pick a Game to Start! 🎮
              </h3>
              <p className="text-xl text-purple-200">
                Click any game template above to see it in action!
              </p>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                🚀 Your Child Can Build ALL of This!
              </h3>
              <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
                From websites to games – imagine what your child will create with our 180-day program. 
                Real skills. Real projects. Real success!
              </p>
              <motion.a
                href="https://www.orbitstudent.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all"
              >
                Start Building Today! 🎉
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

