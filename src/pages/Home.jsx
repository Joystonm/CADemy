import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 font-medium text-sm mb-6 animate-bounce-subtle">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
            Welcome to the Future of CAD Learning
          </div>
          
          <h1 className="text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              CADemy
            </span>
          </h1>
          
          <p className="text-2xl font-semibold text-indigo-600 mb-4">
            Learn, Design, Assist.
          </p>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
            Master 3D modeling and CAD design through gamified challenges focused on assistive technology. 
            Build empathy-driven designs that make a real-world impact while learning professional CAD skills.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <Link 
              to="/playground" 
              className="group inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span className="mr-2 text-xl group-hover:scale-110 transition-transform duration-200">🎮</span>
              Start Creating
              <div className="ml-2 w-2 h-2 bg-white rounded-full opacity-75 group-hover:animate-ping"></div>
            </Link>
            <Link 
              to="/challenges" 
              className="group inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span className="mr-2 text-xl group-hover:scale-110 transition-transform duration-200">🏆</span>
              Take Challenges
            </Link>
          </div>
          
          <p className="text-gray-500">
            New to CAD? 
            <Link to="/tutorial" className="text-indigo-600 hover:text-indigo-700 font-semibold ml-1 hover:underline transition-colors duration-200">
              Start with our interactive tutorial →
            </Link>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="group bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-3xl">♿</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Assistive Technology Focus</h3>
            <p className="text-gray-600 leading-relaxed">
              Learn to design for accessibility and inclusion. Create tools that help people with disabilities 
              live more independently through thoughtful engineering.
            </p>
          </div>

          <div className="group bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Gamified Learning</h3>
            <p className="text-gray-600 leading-relaxed">
              Progress through carefully designed challenges that build your skills step by step. 
              Earn achievements and unlock new tools as you advance.
            </p>
          </div>

          <div className="group bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-3xl">🔧</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Professional CAD Tools</h3>
            <p className="text-gray-600 leading-relaxed">
              Work with real 3D modeling tools including Boolean operations, precise transformations, 
              and material systems powered by Three.js.
            </p>
          </div>
        </div>

        {/* Learning Paths */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-20 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Learning Path</h2>
            <p className="text-xl text-gray-600">Tailored experiences for every skill level</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/tutorial" className="group block p-8 border-2 border-gray-200 rounded-2xl hover:border-indigo-300 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-blue-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Tutorial Mode</h3>
                <p className="text-gray-600 leading-relaxed">
                  Step-by-step guided training for beginners. Learn CAD basics with interactive lessons.
                </p>
                <div className="mt-4 inline-flex items-center text-indigo-600 font-medium group-hover:text-indigo-700">
                  Start Learning
                  <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </Link>

            <Link to="/challenges" className="group block p-8 border-2 border-gray-200 rounded-2xl hover:border-amber-300 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Challenge Mode</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mission-based tasks focused on assistive technology. Progress from beginner to advanced.
                </p>
                <div className="mt-4 inline-flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                  Take Challenge
                  <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </Link>

            <Link to="/playground" className="group block p-8 border-2 border-gray-200 rounded-2xl hover:border-purple-300 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Playground Mode</h3>
                <p className="text-gray-600 leading-relaxed">
                  Open-ended sandbox with all tools unlocked. Perfect for experimentation and creativity.
                </p>
                <div className="mt-4 inline-flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                  Start Creating
                  <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Example Challenges Preview */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-10 text-white mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Example Challenges</h2>
              <p className="text-xl opacity-90">Real-world projects that make a difference</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20">
                <div className="text-3xl mb-4">🥄</div>
                <h3 className="text-xl font-bold mb-3">Ergonomic Spoon</h3>
                <p className="text-sm opacity-90 mb-4 leading-relaxed">
                  Design an easy-grip spoon for users with arthritis. Learn about ergonomics and accessibility.
                </p>
                <div className="text-xs opacity-75 bg-white bg-opacity-10 rounded-lg px-3 py-2">
                  Skills: Resize, rotate, grip ergonomics
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-xl font-bold mb-3">One-Handed Phone Stand</h3>
                <p className="text-sm opacity-90 mb-4 leading-relaxed">
                  Create a stable phone stand operable with one hand. Focus on stability and ease of use.
                </p>
                <div className="text-xs opacity-75 bg-white bg-opacity-10 rounded-lg px-3 py-2">
                  Skills: Align, group, Boolean operations
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20">
                <div className="text-3xl mb-4">🧼</div>
                <h3 className="text-xl font-bold mb-3">Adaptive Soap Holder</h3>
                <p className="text-sm opacity-90 mb-4 leading-relaxed">
                  Design a soap holder with finger slots for users with weak grip. Consider drainage and safety.
                </p>
                <div className="text-xs opacity-75 bg-white bg-opacity-10 rounded-lg px-3 py-2">
                  Skills: Position, Boolean subtract, edge design
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Benefits */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why CADemy?</h2>
          <p className="text-xl text-gray-600 mb-12">Empowering the next generation of inclusive designers</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-bold mb-3 text-gray-800">Empathy-Driven Design</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Learn to design with users' needs in mind, especially those with disabilities
              </p>
            </div>

            <div className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="font-bold mb-3 text-gray-800">Engineering Principles</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Master modularity, symmetry, constraints, and other core engineering concepts
              </p>
            </div>

            <div className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="font-bold mb-3 text-gray-800">Accessible Learning</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Makes CAD fun and approachable, even for absolute beginners
              </p>
            </div>

            <div className="group text-center p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-bold mb-3 text-gray-800">Real-World Impact</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bridge technical skills with meaningful solutions that help people
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
