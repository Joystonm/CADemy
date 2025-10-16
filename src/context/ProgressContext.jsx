import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import challengesData from '../data/challenges.json';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  const isUnlocked = useCallback((challengeId, completedChallenges = []) => {
    return true;
  }, []);

  const getUnlockedChallenges = useCallback(() => {
    return challengesData.challenges.map(challenge => challenge.id);
  }, []);

  const fetchProgress = useCallback(() => {
    if (!user?.$id) return;
    
    setLoading(true);
    
    const localKey = `progress_${user.$id}`;
    const localProgress = localStorage.getItem(localKey);
    
    if (localProgress) {
      try {
        const parsedProgress = JSON.parse(localProgress);
        setProgress(parsedProgress);
      } catch (error) {
        console.error('Error parsing progress:', error);
        localStorage.removeItem(localKey);
        createDefaultProgress();
      }
    } else {
      createDefaultProgress();
    }
    
    setLoading(false);
  }, [user]);

  const createDefaultProgress = () => {
    const defaultProgress = {
      userId: user.$id,
      completedTutorials: [],
      completedChallenges: [],
      totalXP: 0,
      badges: []
    };
    setProgress(defaultProgress);
    localStorage.setItem(`progress_${user.$id}`, JSON.stringify(defaultProgress));
  };

  useEffect(() => {
    if (user?.$id) {
      fetchProgress();
    }
  }, [user, fetchProgress]);

  const saveProgress = (updatedProgress) => {
    const localKey = `progress_${user.$id}`;
    localStorage.setItem(localKey, JSON.stringify(updatedProgress));
  };

  const completeChallenge = (challengeId) => {
    if (!progress || !user?.$id) return;

    if (progress.completedChallenges?.includes(challengeId)) {
      return;
    }

    const updatedChallenges = [...(progress.completedChallenges || []), challengeId];
    const newXP = (progress.totalXP || 0) + 100;
    
    const newBadges = [...(progress.badges || [])];
    if (updatedChallenges.length >= 5 && !newBadges.includes('challenge-master')) {
      newBadges.push('challenge-master');
    }
    if (newXP >= 500 && !newBadges.includes('xp-collector')) {
      newBadges.push('xp-collector');
    }

    const updatedProgress = {
      ...progress,
      completedChallenges: updatedChallenges,
      totalXP: newXP,
      badges: newBadges
    };

    setProgress(updatedProgress);
    saveProgress(updatedProgress);
  };

  const completeTutorial = (tutorialId) => {
    if (!progress || !user?.$id) return;

    if (progress.completedTutorials?.includes(tutorialId)) {
      return;
    }

    const updatedTutorials = [...(progress.completedTutorials || []), tutorialId];
    const newXP = (progress.totalXP || 0) + 50;
    
    const newBadges = [...(progress.badges || [])];
    if (updatedTutorials.length >= 1 && !newBadges.includes('first-steps')) {
      newBadges.push('first-steps');
    }
    if (updatedTutorials.length >= 10 && !newBadges.includes('dedicated-learner')) {
      newBadges.push('dedicated-learner');
    }
    if (newXP >= 500 && !newBadges.includes('xp-collector')) {
      newBadges.push('xp-collector');
    }

    const updatedProgress = {
      ...progress,
      completedTutorials: updatedTutorials,
      totalXP: newXP,
      badges: newBadges
    };

    setProgress(updatedProgress);
    saveProgress(updatedProgress);
  };

  const value = {
    progress,
    loading,
    completeChallenge,
    completeTutorial,
    fetchProgress,
    isUnlocked,
    getUnlockedChallenges
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
