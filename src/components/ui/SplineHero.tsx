'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"
import { Rocket, Lightbulb, Users, TrendingUp } from "lucide-react"
 
export function SplineHero() {
  return (
    <Card className="w-full h-[600px] md:h-[600px] bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden border-0 shadow-lg">
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
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-medium text-sm uppercase tracking-wider opacity-90">
                Think Future Think Orbit
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-gray-200">
                Transform Your Child Into A
              </span>
              <span className="block text-white drop-shadow-lg mt-2">
                Orbit Student
              </span>
            </h1>
            
            <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 max-w-lg leading-relaxed">
              Our 180-day program combines interactive learning, real-world projects, 
              and AI-powered tools to build the next generation of entrepreneurs and leaders.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Users className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">2,500+ Students</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <TrendingUp className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">95% Success Rate</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Lightbulb className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">AI-Powered</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-base"
              >
                Check Courses
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 text-base"
              >
                Learn More
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
