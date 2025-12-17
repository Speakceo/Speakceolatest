'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"
import { Rocket, Lightbulb, Users, TrendingUp } from "lucide-react"
 
export function SplineHero() {
  return (
    <Card className="w-full h-[600px] md:h-[600px] bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950 relative overflow-hidden border-0 shadow-2xl">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 relative z-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="text-amber-300 font-medium text-sm uppercase tracking-[0.15em] opacity-90">
                Future Leaders Start Here
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-gray-200">
                Transform Your Child Into A
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-cyan-400 to-blue-400 mt-2">
                Orbit Student
              </span>
            </h1>
            
            <p className="text-slate-300 text-base md:text-lg mb-6 md:mb-8 max-w-lg leading-relaxed font-light opacity-90">
              Our 180-day program combines interactive learning, real-world projects, 
              and AI-powered tools to build the next generation of entrepreneurs and leaders.
            </p>

            <div className="flex flex-wrap gap-4 md:gap-6 mb-8 md:mb-10">
              <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="p-1 rounded-full bg-orange-500/20">
                  <Users className="h-3 w-3 md:h-4 md:w-4 text-orange-400" />
                </div>
                <span className="text-xs md:text-sm font-medium text-orange-300">2,500+ Students</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="p-1 rounded-full bg-cyan-500/20">
                  <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-cyan-400" />
                </div>
                <span className="text-xs md:text-sm font-medium text-cyan-300">95% Success Rate</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="p-1 rounded-full bg-blue-500/20">
                  <Lightbulb className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
                </div>
                <span className="text-xs md:text-sm font-medium text-blue-300">AI-Powered Learning</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-orange-600 via-blue-700 to-cyan-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-sm md:text-base relative overflow-hidden group"
              >
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-blue-800 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 md:px-8 py-3 md:py-4 border border-white/30 text-white font-medium rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-500 text-sm md:text-base backdrop-blur-sm"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right content - 3D Scene */}
        <div className="flex-1 relative min-h-[300px] md:min-h-0 order-first md:order-last">
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
          
          {/* Floating elements - hidden on mobile for better performance */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 md:top-20 right-4 md:right-20 bg-white/10 backdrop-blur-sm rounded-full p-2 md:p-4 hidden md:block"
          >
            <Lightbulb className="h-6 w-6 md:h-8 md:w-8 text-yellow-400" />
          </motion.div>
          
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-4 md:bottom-32 right-4 md:right-32 bg-white/10 backdrop-blur-sm rounded-full p-2 md:p-4 hidden md:block"
          >
            <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-green-400" />
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
