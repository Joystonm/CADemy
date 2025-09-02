import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 font-medium text-sm mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2 animate-pulse"></span>
            About Our Mission
          </div>
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              About CADemy
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Making 3D modeling and CAD design accessible to everyone through innovative, 
            gamified learning experiences.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                CADemy is designed to make learning 3D modeling and Computer-Aided Design (CAD) 
                fun and accessible. We believe that everyone should have the opportunity to learn 
                these valuable skills through hands-on practice and interactive challenges.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our focus on assistive technology ensures that learners not only master technical skills 
                but also develop empathy and understanding for inclusive design principles.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <div className="text-6xl opacity-50">🎯</div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">✨</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-xl text-white">🚀</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Interactive 3D Environment</h3>
            <p className="text-gray-600 leading-relaxed">
              Work with real 3D objects using professional-grade tools powered by Three.js. 
              Experience the same workflows used in industry-standard CAD software.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-xl text-white">📈</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Progressive Learning</h3>
            <p className="text-gray-600 leading-relaxed">
              Start with basic shapes and progress to complex assemblies and boolean operations. 
              Each lesson builds upon the previous one for optimal learning.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-xl text-white">💬</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Real-time Feedback</h3>
            <p className="text-gray-600 leading-relaxed">
              Get instant feedback on your work with helpful hints and suggestions. 
              Learn from mistakes and improve your skills continuously.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <span className="text-xl text-white">🎮</span>
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Challenge-based Learning</h3>
            <p className="text-gray-600 leading-relaxed">
              Learn through practical challenges that simulate real-world modeling tasks. 
              Gamified progression keeps you motivated and engaged.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-10 text-white mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Technology Stack</h2>
            <p className="text-xl mb-8 text-center opacity-90">
              Built with modern web technologies for the best learning experience
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white border-opacity-20">
                <div className="text-3xl mb-3">⚛️</div>
                <h4 className="font-bold mb-2">React</h4>
                <p className="text-sm opacity-90">User interface and component management</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white border-opacity-20">
                <div className="text-3xl mb-3">🎲</div>
                <h4 className="font-bold mb-2">Three.js</h4>
                <p className="text-sm opacity-90">3D graphics and rendering engine</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white border-opacity-20">
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="font-bold mb-2">Tailwind CSS</h4>
                <p className="text-sm opacity-90">Responsive and modern styling</p>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white border-opacity-20">
                <div className="text-3xl mb-3">🔧</div>
                <h4 className="font-bold mb-2">Vite</h4>
                <p className="text-sm opacity-90">Fast development and build tools</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Get Started Today</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Ready to begin your 3D modeling journey? Start with our interactive playground 
              or jump into a challenge to test your skills.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/playground" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="mr-2 text-xl">🎨</span>
                Open Playground
              </a>
              <a 
                href="/challenges" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="mr-2 text-xl">🏆</span>
                View Challenges
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
