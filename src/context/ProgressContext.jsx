import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { databases, DATABASE_ID, USER_PROGRESS_COLLECTION_ID } from '../lib/appwrite';
import { useAuth } from './AuthContext';
import { ID, Query } from 'appwrite';
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
    // All challenges are now unlocked by default
    return true;
  }, []);

  const getUnlockedChallenges = useCallback(() => {
    // Return all challenge IDs since all are unlocked
    return challengesData.challenges.map(challenge => challenge.id);
  }, []);

  const fetchProgress = useCallback(async () => {
    if (!user?.$id) return;
    
    setLoading(true);
    
    // Always try local storage first
    const localKey = `progress_${user.$id}`;
    const localProgress = localStorage.getItem(localKey);
    
    if (localProgress) {
      try {
        const parsedProgress = JSON.parse(localProgress);
        console.log('Loading from local storage:', parsedProgress);
        setProgress(parsedProgress);
        setLoading(false);
        return;
      } catch (parseError) {
        console.error('Error parsing local storage:', parseError);
        localStorage.removeItem(localKey);
      }
    }
    
    // Create default progress
    const defaultProgress = {
      userId: user.$id,
      completedTutorials: [],
      completedChallenges: [],
      totalXP: 0,
      badges: []
    };
    
    // Try database, but don't fail if it doesn't work
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        USER_PROGRESS_COLLECTION_ID,
        [Query.equal('userId', user.$id)]
      );
      
      if (response.documents.length > 0) {
        const dbProgress = response.documents[0];
        setProgress(dbProgress);
        localStorage.setItem(localKey, JSON.stringify(dbProgress));
      } else {
        // No existing progress, use default
        setProgress(defaultProgress);
        localStorage.setItem(localKey, JSON.stringify(defaultProgress));
      }
    } catch (error) {
      console.warn('Database unavailable, using local storage:', error.message);
      setProgress(defaultProgress);
      localStorage.setItem(localKey, JSON.stringify(defaultProgress));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.$id) {
      fetchProgress();
    } else {
      setProgress(null);
    }
  }, [user, fetchProgress]);

  const saveProgress = async (updatedProgress) => {
    if (!user?.$id) return;
    
    const localKey = `progress_${user.$id}`;
    
    // Always save to local storage
    localStorage.setItem(localKey, JSON.stringify(updatedProgress));
    console.log('Saved to local storage:', updatedProgress);
    
    // Try to save to database (optional)
    try {
      if (progress?.$id) {
        await databases.updateDocument(
          DATABASE_ID,
          USER_PROGRESS_COLLECTION_ID,
          progress.$id,
          {
            completedTutorials: updatedProgress.completedTutorials,
            completedChallenges: updatedProgress.completedChallenges,
            totalXP: updatedProgress.totalXP,
            badges: updatedProgress.badges
          }
        );
        console.log('Database updated successfully');
      }
    } catch (error) {
      console.warn('Database save failed, continuing with local storage:', error.message);
    }
  };

  const completeChallenge = async (challengeId) => {
    if (!progress || !user?.$id) return;

    console.log('Completing challenge:', challengeId, 'Current progress:', progress);

    // Check if already completed
    if (progress.completedChallenges?.includes(challengeId)) {
      console.log('Challenge already completed');
      return;
    }

    const updatedChallenges = [...(progress.completedChallenges || []), challengeId];
    const newXP = (progress.totalXP || 0) + 100;
    
    // Calculate badges
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

    console.log('Updated progress:', updatedProgress);
    
    // Update state immediately
    setProgress(updatedProgress);
    
    // Save to storage
    await saveProgress(updatedProgress);
  };

  const completeTutorial = async (tutorialId) => {
    if (!progress || !user?.$id) return;

    console.log('Completing tutorial:', tutorialId, 'Current progress:', progress);

    // Check if already completed
    if (progress.completedTutorials?.includes(tutorialId)) {
      console.log('Tutorial already completed');
      return;
    }

    const updatedTutorials = [...(progress.completedTutorials || []), tutorialId];
    const newXP = (progress.totalXP || 0) + 50;
    
    // Calculate badges
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

    console.log('Updated progress:', updatedProgress);
    
    // Update state immediately
    setProgress(updatedProgress);
    
    // Save to storage
    await saveProgress(updatedProgress);
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
