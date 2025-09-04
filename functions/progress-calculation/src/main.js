const sdk = require('node-appwrite');

module.exports = async ({ req, res, log, error }) => {
  const client = new sdk.Client();
  const databases = new sdk.Databases(client);

  client
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  try {
    const payload = JSON.parse(req.body);
    const { userId, type, itemId } = payload;

    // Fetch user progress
    const progressResponse = await databases.listDocuments(
      'cademy-db',
      'user-progress',
      [sdk.Query.equal('userId', userId)]
    );

    if (progressResponse.documents.length === 0) {
      return res.json({ error: 'User progress not found' });
    }

    const progress = progressResponse.documents[0];
    let xpGained = 0;
    let newBadges = [...(progress.badges || [])];

    // Calculate XP based on completion type
    if (type === 'tutorial') {
      xpGained = 50;
    } else if (type === 'challenge') {
      xpGained = 100;
    }

    const newTotalXP = progress.totalXP + xpGained;
    const tutorialCount = progress.completedTutorials?.length || 0;
    const challengeCount = progress.completedChallenges?.length || 0;

    // Check for new badges
    const badgeChecks = [
      { id: 'first-steps', condition: () => tutorialCount >= 1 },
      { id: 'challenge-master', condition: () => challengeCount >= 5 },
      { id: 'xp-collector', condition: () => newTotalXP >= 500 },
      { id: 'dedicated-learner', condition: () => tutorialCount >= 10 }
    ];

    const unlockedBadges = [];
    badgeChecks.forEach(badge => {
      if (badge.condition() && !newBadges.includes(badge.id)) {
        newBadges.push(badge.id);
        unlockedBadges.push(badge.id);
      }
    });

    // Update progress
    await databases.updateDocument(
      'cademy-db',
      'user-progress',
      progress.$id,
      {
        totalXP: newTotalXP,
        badges: newBadges
      }
    );

    log(`Updated progress for user ${userId}: +${xpGained} XP, Total: ${newTotalXP}, New badges: ${unlockedBadges.join(', ')}`);
    
    return res.json({ 
      success: true, 
      xpGained, 
      totalXP: newTotalXP,
      newBadges: unlockedBadges,
      currentLevel: Math.floor(newTotalXP / 100) + 1
    });

  } catch (err) {
    error('Error in progress calculation: ' + err.message);
    return res.json({ error: err.message }, 500);
  }
};
