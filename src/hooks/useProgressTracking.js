import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useState, useCallback } from 'react';

export const useProgressTracking = () => {
  const { user } = useAuth();
  const { progress, completeChallenge, completeTutorial, fetchProgress } = useProgress();
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  const trackTutorialCompletion = useCallback(async (tutorialId, tutorialName = 'Tutorial') => {
    if (!user || !progress) return false;

    // Check if already completed
    if (progress.completedTutorials?.includes(tutorialId)) {
      return false;
    }

    try {
      await completeTutorial(tutorialId);
      addNotification(`🎉 ${tutorialName} completed! +50 XP earned`);
      
      // Check for badge unlocks
      const newTutorialCount = (progress.completedTutorials?.length || 0) + 1;
      if (newTutorialCount === 1) {
        addNotification('🎯 Badge Unlocked: First Steps!', 'badge');
      }
      if (newTutorialCount === 10) {
        addNotification('📚 Badge Unlocked: Dedicated Learner!', 'badge');
      }

      return true;
    } catch (error) {
      console.error('Error tracking tutorial completion:', error);
      return false;
    }
  }, [user, progress, completeTutorial, addNotification]);

  const trackChallengeCompletion = useCallback(async (challengeId, challengeName = 'Challenge') => {
    if (!user || !progress) return false;

    // Check if already completed
    if (progress.completedChallenges?.includes(challengeId)) {
      return false;
    }

    try {
      await completeChallenge(challengeId);
      addNotification(`🏆 ${challengeName} completed! +100 XP earned`);
      
      // Check for badge unlocks
      const newChallengeCount = (progress.completedChallenges?.length || 0) + 1;
      if (newChallengeCount === 5) {
        addNotification('🏆 Badge Unlocked: Challenge Master!', 'badge');
      }

      return true;
    } catch (error) {
      console.error('Error tracking challenge completion:', error);
      return false;
    }
  }, [user, progress, completeChallenge, addNotification]);

  const getProgressStats = useCallback(() => {
    if (!progress) {
      return {
        tutorialsCompleted: 0,
        challengesCompleted: 0,
        totalXP: 0,
        currentLevel: 1,
        xpForNextLevel: 100,
        levelProgress: 0,
        badges: []
      };
    }

    const totalXP = progress.totalXP || 0;
    const currentLevel = Math.floor(totalXP / 100) + 1;
    const xpForNextLevel = currentLevel * 100;
    const levelProgress = totalXP % 100;

    return {
      tutorialsCompleted: progress.completedTutorials?.length || 0,
      challengesCompleted: progress.completedChallenges?.length || 0,
      totalXP,
      currentLevel,
      xpForNextLevel,
      levelProgress,
      badges: progress.badges || []
    };
  }, [progress]);

  return {
    trackTutorialCompletion,
    trackChallengeCompletion,
    getProgressStats,
    notifications,
    refreshProgress: fetchProgress,
    isAuthenticated: !!user
  };
};
