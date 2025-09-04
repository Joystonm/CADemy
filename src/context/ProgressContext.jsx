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
    
    // First try to load from local storage
    const localKey = `progress_${user.$id}`;
    const localProgress = localStorage.getItem(localKey);
    
    if (localProgress) {
      const parsedProgress = JSON.parse(localProgress);
      console.log('Loading from local storage:', parsedProgress);
      setProgress(parsedProgress);
      setLoading(false);
      return;
    }
    
    try {
      console.log('Fetching progress for user:', user.$id);
      const response = await databases.listDocuments(
        DATABASE_ID,
        USER_PROGRESS_COLLECTION_ID,
        [Query.equal('userId', user.$id)]
      );
      
      console.log('Database response:', response);
      
      if (response.documents.length > 0) {
        console.log('Found existing progress:', response.documents[0]);
        setProgress(response.documents[0]);
        localStorage.setItem(localKey, JSON.stringify(response.documents[0]));
      } else {
        console.log('No progress found, creating new record');
        const newProgress = await databases.createDocument(
          DATABASE_ID,
          USER_PROGRESS_COLLECTION_ID,
          ID.unique(),
          {
            userId: user.$id,
            completedTutorials: [],
            completedChallenges: [],
            totalXP: 0,
            badges: []
          }
        );
        console.log('Created new progress:', newProgress);
        setProgress(newProgress);
        localStorage.setItem(localKey, JSON.stringify(newProgress));
      }
    } catch (error) {
      console.error('Database error:', error);
      
      // Create default progress only if no local storage exists
      const defaultProgress = {
        userId: user.$id,
        completedTutorials: [],
        completedChallenges: [],
        totalXP: 0,
        badges: []
      };
      console.log('Using default progress:', defaultProgress);
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
    const localKey = `progress_${user.$id}`;
    
    // Always save to local storage first
    localStorage.setItem(localKey, JSON.stringify(updatedProgress));
    console.log('Saved to local storage:', updatedProgress);
    
    // Try to save to database (optional)
    try {
      if (progress?.$id) {
        console.log('Updating existing document:', progress.$id);
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
      } else {
        console.log('Creating new document');
        const newDoc = await databases.createDocument(
          DATABASE_ID,
          USER_PROGRESS_COLLECTION_ID,
          ID.unique(),
          {
            userId: user.$id,
            completedTutorials: updatedProgress.completedTutorials,
            completedChallenges: updatedProgress.completedChallenges,
            totalXP: updatedProgress.totalXP,
            badges: updatedProgress.badges
          }
        );
        console.log('New document created:', newDoc);
        // Update progress with database ID for future updates
        const progressWithId = { ...updatedProgress, $id: newDoc.$id };
        setProgress(progressWithId);
        localStorage.setItem(localKey, JSON.stringify(progressWithId));
      }
    } catch (error) {
      console.error('Database save failed, continuing with local storage:', error);
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
