import { useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const useProgressIntegration = () => {
  const { user } = useAuth();
  const { completeChallenge, completeTutorial } = useProgress();
  const { completedChallenges } = useApp();

  // This hook can be used to integrate progress tracking with existing challenge/tutorial completion
  const trackChallengeCompletion = (challengeId) => {
    if (user) {
      completeChallenge(challengeId);
    }
  };

  const trackTutorialCompletion = (tutorialId) => {
    if (user) {
      completeTutorial(tutorialId);
    }
  };

  return {
    trackChallengeCompletion,
    trackTutorialCompletion,
    isAuthenticated: !!user
  };
};
