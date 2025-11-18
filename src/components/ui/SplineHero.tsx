'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"
import { Rocket, Lightbulb, Users, TrendingUp } from "lucide-react"
 
export function SplineHero() {
  return (
    <Card className="w-full h-[600px] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 lg:p-12 relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="h-6 w-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
                Future Leaders Start Here
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-300 mb-6 leading-tight">
              Transform Your Child Into A
              <span className="block text-yellow-400">Young CEO</span>
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 max-w-lg leading-relaxed">
              Our 180-day program combines interactive learning, real-world projects, 
              and AI-powered tools to build the next generation of entrepreneurs and leaders.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-green-400">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">2,500+ Students</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">95% Success Rate</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <Lightbulb className="h-5 w-5" />
                <span className="text-sm font-medium">AI-Powered Learning</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:shadow-2xl transition-all duration-300"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right content - 3D Scene */}
        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full h-full"
          >
            <div className="w-full h-full relative">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full rounded-lg"
              />
              
              {/* Fallback content if 3D fails */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-lg backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="text-center text-white/80">
                  <Rocket className="h-16 w-16 mx-auto mb-4 animate-bounce" />
                  <p className="text-lg font-semibold">Interactive 3D Learning</p>
                  <p className="text-sm">Experience the future of education</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Floating elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 bg-white/10 backdrop-blur-sm rounded-full p-4"
          >
            <Lightbulb className="h-8 w-8 text-yellow-400" />
          </motion.div>
          
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-32 right-32 bg-white/10 backdrop-blur-sm rounded-full p-4"
          >
            <TrendingUp className="h-8 w-8 text-green-400" />
          </motion.div>
        </div>
      </div>
      
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </Card>
  )
}
