import React, { useState } from 'react';
import { useProgressChecker } from '../hooks/useProgressChecker';

const MissionPanel = ({ challenge, progress, onHint, onValidate }) => {
  const { checkProgress, isChecking } = useProgressChecker();
  const [localProgress, setLocalProgress] = useState(progress);

  if (!challenge) return null;

  const currentProgress = localProgress || progress;
  const progressPercentage = (currentProgress.completed / challenge.objectives.length) * 100;

  const handleValidate = async () => {
    const newProgress = await checkProgress(challenge);
    setLocalProgress(newProgress);
    if (onValidate) {
      onValidate(newProgress);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{challenge.title}</h3>
          <p className="text-sm text-gray-600">{challenge.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            challenge.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            challenge.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {challenge.difficulty}
          </span>
          {challenge.assistiveTechFocus && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
              ♿ Assistive Tech
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{currentProgress.completed}/{challenge.objectives.length} objectives</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {currentProgress.isComplete && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-green-800 font-medium">
              🎉 Challenge Complete! Great work!
            </p>
          </div>
        )}
      </div>

      {/* Objectives */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2">Objectives:</h4>
        <div className="space-y-2">
          {challenge.objectives.map((objective, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                currentProgress.completedObjectives.includes(index)
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300'
              }`}>
                {currentProgress.completedObjectives.includes(index) && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
              <span className={`text-sm ${
                currentProgress.completedObjectives.includes(index)
                  ? 'text-green-700 line-through'
                  : 'text-gray-700'
              }`}>
                {objective}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Real-world Context */}
      {challenge.realWorldContext && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <h4 className="font-medium text-blue-800 mb-1">💡 Real-world Impact</h4>
          <p className="text-sm text-blue-700">{challenge.realWorldContext}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={onHint}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm font-medium"
        >
          💡 Hint
        </button>
        <button
          onClick={handleValidate}
          disabled={isChecking}
          className={`px-4 py-2 text-white rounded text-sm font-medium ${
            isChecking 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isChecking ? (
            <>
              <span className="inline-block animate-spin mr-1">⏳</span>
              Checking...
            </>
          ) : (
            '✓ Check Progress'
          )}
        </button>
        <div className="ml-auto">
          <span className="text-sm text-gray-500">
            ⏱️ Est. {challenge.estimatedTime}
          </span>
        </div>
      </div>

      {/* Current Hint */}
      {currentProgress.currentHint && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>Hint:</strong> {currentProgress.currentHint}
          </p>
        </div>
      )}

      {/* Error Message */}
      {currentProgress.error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-800">
            <strong>Error:</strong> {currentProgress.error}
          </p>
        </div>
      )}
    </div>
  );
};

export default MissionPanel;
