import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 relative">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1876D2] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Information */}
          <div className="col-span-1 md:col-span-1">
            <img 
              src="/images/hero/orbit-logo.png" 
              alt="Orbit Logo" 
              className="h-10 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Empowering the next generation of entrepreneurs with the skills they need to succeed in business and life.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-[#1876D2] hover:text-white transition-all duration-300">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-[#1876D2] hover:text-white transition-all duration-300">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-[#1876D2] hover:text-white transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-[#1876D2] hover:text-white transition-all duration-300">
                <Youtube size={16} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">About Us</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Our Courses</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Upcoming Events</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">FAQs</Link></li>
              <li><Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Success Stories</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Free Resources</Link></li>
              <li><Link to="/partnerships" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Partnerships</Link></li>
              <li><Link to="/demo" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Interactive Demo</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4 leading-relaxed text-sm">
              Subscribe to our newsletter for tips, updates, and special offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-l-lg focus:outline-none focus:border-[#1876D2] text-white placeholder-gray-500 text-sm transition-colors"
              />
              <button className="bg-[#1876D2] hover:bg-[#00B0FF] text-white px-4 py-2.5 rounded-r-lg transition-colors duration-200">
                <ArrowRight size={16} />
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              We respect your privacy and never share your information.
            </p>
          </div>
        </div>
        
        <hr className="border-white/10 my-8" />
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Orbit Student. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors duration-200">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
