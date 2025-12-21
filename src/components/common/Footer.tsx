import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 relative mt-20">
      {/* Top separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Information */}
          <div className="col-span-1 md:col-span-1">
            <img 
              src="/images/hero/orbit-logo.png" 
              alt="Orbit Logo" 
              className="h-10 w-auto mb-6"
            />
            <p className="text-gray-600 mb-6 leading-relaxed">
              Empowering the next generation of entrepreneurs with the skills they need to succeed in business and life.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-full bg-[#E3F2FD] text-[#1876D2] hover:bg-[#00B0FF] hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#E3F2FD] text-[#1876D2] hover:bg-[#00B0FF] hover:text-white transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#E3F2FD] text-[#1876D2] hover:bg-[#00B0FF] hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-[#E3F2FD] text-[#1876D2] hover:bg-[#00B0FF] hover:text-white transition-all duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">About Us</Link></li>
              <li><Link to="/courses" className="text-gray-300 hover:text-white transition-colors duration-200">Our Courses</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors duration-200">Upcoming Events</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors duration-200">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">FAQs</Link></li>
              <li><Link to="/testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Success Stories</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Free Resources</Link></li>
              <li><Link to="/partnerships" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Partnerships</Link></li>
              <li><Link to="/career-guide" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Career Guide</Link></li>
            </ul>
          </div>
          
          {/* Get Started / Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Get Started</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Subscribe to our newsletter for tips, updates, and special offers.
            </p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 transition-all"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm">
                Subscribe
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-2 leading-relaxed">
              We respect your privacy and never share your information.
            </p>
          </div>
        </div>
        
        <hr className="border-gray-300 my-8" />
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Orbit Future Academy. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-blue-600 transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-600 transition-colors duration-200">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-blue-600 transition-colors duration-200">Cookie Policy</Link>
          </div>
        </div>
        
        {/* Made with love message */}
        <div className="text-center text-gray-500 text-sm mt-4">
          Made with ❤️ for young entrepreneurs everywhere
        </div>
      </div>
    </footer>
  );
} 