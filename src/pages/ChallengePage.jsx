import React, { useState } from 'react';
import ChallengeMode from '../scenes/ChallengeMode';
import challengesData from '../data/challenges.json';
import { useApp } from '../context/AppContext';
import { useProgress } from '../context/ProgressContext';

const ChallengePage = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const { completedChallenges, completeChallenge } = useApp();
  const { completeChallenge: trackChallengeProgress, isUnlocked, getUnlockedChallenges } = useProgress();

  const unlockedChallenges = getUnlockedChallenges();

  const handleChallengeComplete = async (result) => {
    console.log('Challenge completed! Result:', result);
    
    try {
      completeChallenge(result.challengeId);
      console.log('Calling trackChallengeProgress...');
      await trackChallengeProgress(result.challengeId);
      console.log('trackChallengeProgress finished successfully');
      setSelectedChallenge(null);
    } catch (error) {
      console.error('Error completing challenge:', error);
      setSelectedChallenge(null);
    }
  };

  const handleExitChallenge = () => {
    setSelectedChallenge(null);
  };

  if (selectedChallenge) {
    return (
      <ChallengeMode
        challenge={selectedChallenge}
        onComplete={handleChallengeComplete}
        onExit={handleExitChallenge}
      />
    );
  }

  const getChallengesByCategory = () => {
    const categories = {};
    challengesData.challenges.forEach(challenge => {
      if (!categories[challenge.category]) {
        categories[challenge.category] = [];
      }
      categories[challenge.category].push(challenge);
    });
    return categories;
  };

  const categorizedChallenges = getChallengesByCategory();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">CAD Challenges</h1>
          <p className="text-xl mb-8">
            Master CAD skills through hands-on challenges focused on assistive technology
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold">{challengesData.challenges.length}</div>
              <div>Total Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {challengesData.challenges.filter(c => c.assistiveTechFocus).length}
              </div>
              <div>Assistive Tech</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Challenges by Category */}
        {Object.entries(categorizedChallenges).map(([categoryKey, challenges]) => {
          const categoryInfo = challengesData.categories[categoryKey];
          
          return (
            <div key={categoryKey} className="mb-12">
              <div className="flex items-center mb-6">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: categoryInfo.color }}
                ></div>
                <h2 className="text-2xl font-bold text-gray-800">{categoryInfo.name}</h2>
                <p className="ml-4 text-gray-600">{categoryInfo.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map((challenge) => {
                  const isCompleted = completedChallenges.includes(challenge.id);

                  return (
                    <div 
                      key={challenge.id} 
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold flex items-center">
                            {isCompleted && <span className="text-green-500 mr-2">✓</span>}
                            {challenge.title}
                          </h3>
                          <div className="flex space-x-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              challenge.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                              challenge.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {challenge.difficulty}
                            </span>
                            {challenge.assistiveTechFocus && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                                ♿
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{challenge.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">Objectives:</h4>
                            <span className="text-xs text-gray-500">⏱️ {challenge.estimatedTime}</span>
                          </div>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {challenge.objectives.slice(0, 2).map((objective, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-500 mr-2 mt-1">•</span>
                                <span className="flex-1">{objective}</span>
                              </li>
                            ))}
                            {challenge.objectives.length > 2 && (
                              <li className="text-gray-400 text-xs">
                                +{challenge.objectives.length - 2} more objectives
                              </li>
                            )}
                          </ul>
                        </div>

                        {challenge.realWorldContext && (
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                            <p className="text-blue-700">
                              <strong>Impact:</strong> {challenge.realWorldContext}
                            </p>
                          </div>
                        )}
                        
                        <button
                          onClick={() => setSelectedChallenge(challenge)}
                          className={`w-full py-2 px-4 rounded font-medium transition-colors ${
                            isCompleted
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {isCompleted ? 'Replay Challenge' : 'Start Challenge'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Achievements Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {challengesData.achievements.map((achievement) => {
              let isUnlocked = false;
              
              // Check achievement conditions
              switch (achievement.id) {
                case 'first_design':
                  isUnlocked = completedChallenges.length >= 1;
                  break;
                case 'accessibility_advocate':
                  const assistiveChallenges = challengesData.challenges
                    .filter(c => c.assistiveTechFocus)
                    .map(c => c.id);
                  isUnlocked = assistiveChallenges.filter(id => 
                    completedChallenges.includes(id)
                  ).length >= 3;
                  break;
                case 'master_designer':
                  isUnlocked = completedChallenges.length === challengesData.challenges.length;
                  break;
              }

              return (
                <div 
                  key={achievement.id}
                  className={`p-4 border rounded-lg text-center ${
                    isUnlocked 
                      ? 'border-yellow-300 bg-yellow-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className={`text-3xl mb-2 ${isUnlocked ? '' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`font-semibold ${isUnlocked ? 'text-yellow-800' : 'text-gray-500'}`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm ${isUnlocked ? 'text-yellow-700' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>
                  {isUnlocked && (
                    <div className="mt-2 text-xs text-yellow-600 font-medium">
                      ✓ Unlocked!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
