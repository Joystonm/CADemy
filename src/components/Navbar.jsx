import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { completedChallenges } = useApp();

  const navItems = [
    { path: '/', name: 'Home', icon: '🏠', color: 'from-blue-500 to-blue-600' },
    { path: '/tutorial', name: 'Tutorial', icon: '📚', color: 'from-green-500 to-green-600' },
    { path: '/challenges', name: 'Challenges', icon: '🏆', color: 'from-amber-500 to-amber-600' },
    { path: '/playground', name: 'Playground', icon: '🎨', color: 'from-purple-500 to-purple-600' },
    { path: '/about', name: 'About', icon: 'ℹ️', color: 'from-cyan-500 to-cyan-600' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-4 hover:opacity-90 transition-all duration-200 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                <span className="text-2xl font-bold text-white">C</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CADemy
              </h1>
              <p className="text-sm text-gray-500 font-medium">Learn, Design, Assist</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium group ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 shadow-md'
                    : 'hover:bg-gray-50 text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
                {item.name === 'Challenges' && completedChallenges.length > 0 && (
                  <span className="bg-gradient-to-r from-green-400 to-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm animate-bounce-subtle">
                    {completedChallenges.length}
                  </span>
                )}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-600">Ready to Create</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200 group">
              <div className="space-y-1">
                <div className="w-5 h-0.5 bg-gray-600 group-hover:bg-indigo-600 transition-colors duration-200"></div>
                <div className="w-5 h-0.5 bg-gray-600 group-hover:bg-indigo-600 transition-colors duration-200"></div>
                <div className="w-5 h-0.5 bg-gray-600 group-hover:bg-indigo-600 transition-colors duration-200"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation (Hidden by default) */}
        <div className="md:hidden border-t border-gray-100 py-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700'
                    : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                {item.name === 'Challenges' && completedChallenges.length > 0 && (
                  <span className="ml-auto bg-gradient-to-r from-green-400 to-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {completedChallenges.length}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
