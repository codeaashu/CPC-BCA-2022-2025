// Achievement System for Cross Road Game
class AchievementSystem {
    constructor() {
        this.achievements = {
            // Scoring Achievements
            'first_points': {
                id: 'first_points',
                title: 'First Steps',
                description: 'Score your first 100 points',
                icon: '🎯',
                condition: (user, gameStats) => gameStats.score >= 100,
                points: 10
            },
            'score_500': {
                id: 'score_500',
                title: 'Getting Good',
                description: 'Score 500 points in a single game',
                icon: '⭐',
                condition: (user, gameStats) => gameStats.score >= 500,
                points: 25
            },
            'score_1000': {
                id: 'score_1000',
                title: 'Road Master',
                description: 'Score 1000 points in a single game',
                icon: '🏆',
                condition: (user, gameStats) => gameStats.score >= 1000,
                points: 50
            },
            'score_2000': {
                id: 'score_2000',
                title: 'Legendary Driver',
                description: 'Score 2000 points in a single game',
                icon: '👑',
                condition: (user, gameStats) => gameStats.score >= 2000,
                points: 100
            },
            
            // Level Achievements
            'level_5': {
                id: 'level_5',
                title: 'Level Explorer',
                description: 'Reach level 5',
                icon: '🚀',
                condition: (user, gameStats) => gameStats.level >= 5,
                points: 15
            },
            'level_10': {
                id: 'level_10',
                title: 'Double Digits',
                description: 'Reach level 10',
                icon: '🔥',
                condition: (user, gameStats) => gameStats.level >= 10,
                points: 30
            },
            'level_20': {
                id: 'level_20',
                title: 'Road Veteran',
                description: 'Reach level 20',
                icon: '💎',
                condition: (user, gameStats) => gameStats.level >= 20,
                points: 75
            },
            
            // Game Mode Achievements
            'time_attack_master': {
                id: 'time_attack_master',
                title: 'Time Attack Master',
                description: 'Score 500+ points in Time Attack mode',
                icon: '⏰',
                condition: (user, gameStats) => gameStats.gameMode === 'time-attack' && gameStats.score >= 500,
                points: 40
            },
            'endless_survivor': {
                id: 'endless_survivor',
                title: 'Endless Survivor',
                description: 'Survive 5 minutes in Endless mode',
                icon: '♾️',
                condition: (user, gameStats) => gameStats.gameMode === 'endless' && gameStats.timePlayed >= 300,
                points: 60
            },
            
            // Cumulative Achievements
            'games_played_10': {
                id: 'games_played_10',
                title: 'Dedicated Player',
                description: 'Play 10 games',
                icon: '🎮',
                condition: (user, gameStats) => user.stats.gamesPlayed >= 10,
                points: 20
            },
            'games_played_50': {
                id: 'games_played_50',
                title: 'Road Warrior',
                description: 'Play 50 games',
                icon: '⚔️',
                condition: (user, gameStats) => user.stats.gamesPlayed >= 50,
                points: 50
            },
            'total_score_5000': {
                id: 'total_score_5000',
                title: 'Score Collector',
                description: 'Accumulate 5000 total points',
                icon: '💰',
                condition: (user, gameStats) => user.stats.totalScore >= 5000,
                points: 35
            },
            'total_score_10000': {
                id: 'total_score_10000',
                title: 'Point Master',
                description: 'Accumulate 10000 total points',
                icon: '💎',
                condition: (user, gameStats) => user.stats.totalScore >= 10000,
                points: 70
            },
            
            // Power-up Achievements
            'shield_user': {
                id: 'shield_user',
                title: 'Shield Bearer',
                description: 'Use a shield to block a car',
                icon: '🛡️',
                condition: (user, gameStats) => gameStats.shieldUsed === true,
                points: 15
            },
            'power_collector': {
                id: 'power_collector',
                title: 'Power Collector',
                description: 'Collect 10 power-ups in a single game',
                icon: '⚡',
                condition: (user, gameStats) => gameStats.powerUpsCollected >= 10,
                points: 30
            },
            
            // Special Achievements
            'no_death_level_10': {
                id: 'no_death_level_10',
                title: 'Perfect Run',
                description: 'Reach level 10 without using any shields',
                icon: '✨',
                condition: (user, gameStats) => gameStats.level >= 10 && gameStats.shieldsUsed === 0,
                points: 100
            },
            'speed_demon': {
                id: 'speed_demon',
                title: 'Speed Demon',
                description: 'Complete 5 levels in under 2 minutes',
                icon: '💨',
                condition: (user, gameStats) => gameStats.level >= 5 && gameStats.timePlayed <= 120,
                points: 60
            },
            'comeback_king': {
                id: 'comeback_king',
                title: 'Comeback King',
                description: 'Beat your previous high score by 200+ points',
                icon: '🔄',
                condition: (user, gameStats) => {
                    const previousHigh = user.stats.highScores[gameStats.gameMode] || 0;
                    return gameStats.score > previousHigh + 200;
                },
                points: 45
            },
            
            // Time-based Achievements
            'quick_starter': {
                id: 'quick_starter',
                title: 'Quick Starter',
                description: 'Reach level 3 in under 30 seconds',
                icon: '⚡',
                condition: (user, gameStats) => gameStats.level >= 3 && gameStats.timePlayed <= 30,
                points: 25
            },
            'endurance_runner': {
                id: 'endurance_runner',
                title: 'Endurance Runner',
                description: 'Play for 10 minutes in a single game',
                icon: '🏃‍♂️',
                condition: (user, gameStats) => gameStats.timePlayed >= 600,
                points: 80
            },
            
            // Difficulty Achievements
            'hard_mode_master': {
                id: 'hard_mode_master',
                title: 'Hard Mode Master',
                description: 'Score 300+ points on Hard difficulty',
                icon: '🔥',
                condition: (user, gameStats) => gameStats.difficulty === 'hard' && gameStats.score >= 300,
                points: 90
            }
        };
        
        this.lastCheckedStats = null;
    }
    
    checkAchievements(gameStats = null) {
        const user = getUserData();
        if (!user || !gameStats) return;
        
        const newAchievements = [];
        
        Object.values(this.achievements).forEach(achievement => {
            // Check if user already has this achievement
            const hasAchievement = user.stats.achievements.some(a => a.id === achievement.id);
            
            if (!hasAchievement && achievement.condition(user, gameStats)) {
                // Award achievement
                const awarded = userManager.addAchievement(
                    achievement.id,
                    achievement.title,
                    achievement.description
                );
                
                if (awarded) {
                    newAchievements.push(achievement);
                    console.log(`Achievement unlocked: ${achievement.title}`);
                }
            }
        });
        
        return newAchievements;
    }
    
    getAchievementProgress(achievementId, user, gameStats) {
        const achievement = this.achievements[achievementId];
        if (!achievement) return 0;
        
        // This is a simplified progress calculation
        // In a real implementation, you'd need more complex logic for each achievement type
        return achievement.condition(user, gameStats) ? 100 : 0;
    }
    
    getUserAchievements(user) {
        if (!user || !user.stats.achievements) return [];
        return user.stats.achievements;
    }
    
    getAvailableAchievements() {
        return Object.values(this.achievements);
    }
    
    getTotalAchievementPoints(user) {
        if (!user || !user.stats.achievements) return 0;
        
        return user.stats.achievements.reduce((total, userAchievement) => {
            const achievement = this.achievements[userAchievement.id];
            return total + (achievement ? achievement.points : 0);
        }, 0);
    }
    
    getAchievementCompletionRate(user) {
        const totalAchievements = Object.keys(this.achievements).length;
        const completedAchievements = user.stats.achievements ? user.stats.achievements.length : 0;
        return Math.round((completedAchievements / totalAchievements) * 100);
    }
    
    // Get achievements by category for display
    getAchievementsByCategory() {
        const categories = {
            scoring: [],
            levels: [],
            modes: [],
            cumulative: [],
            powerups: [],
            special: [],
            time: [],
            difficulty: []
        };
        
        Object.values(this.achievements).forEach(achievement => {
            if (achievement.id.includes('score')) {
                categories.scoring.push(achievement);
            } else if (achievement.id.includes('level')) {
                categories.levels.push(achievement);
            } else if (achievement.id.includes('time_attack') || achievement.id.includes('endless')) {
                categories.modes.push(achievement);
            } else if (achievement.id.includes('games_played') || achievement.id.includes('total_score')) {
                categories.cumulative.push(achievement);
            } else if (achievement.id.includes('shield') || achievement.id.includes('power')) {
                categories.powerups.push(achievement);
            } else if (achievement.id.includes('hard_mode')) {
                categories.difficulty.push(achievement);
            } else if (achievement.id.includes('quick') || achievement.id.includes('endurance')) {
                categories.time.push(achievement);
            } else {
                categories.special.push(achievement);
            }
        });
        
        return categories;
    }
}

// Global achievement system instance
let achievementSystem = null;

// Initialize achievement system
document.addEventListener('DOMContentLoaded', function() {
    achievementSystem = new AchievementSystem();
});

// Helper function to check achievements (called from game engine)
function checkAchievements(gameStats = null) {
    if (!achievementSystem || !gameStats) return;
    
    // Add current game stats
    const enhancedStats = {
        ...gameStats,
        timePlayed: gameEngine ? Math.floor((Date.now() - gameEngine.gameState.startTime) / 1000) : 0,
        gameMode: gameEngine ? gameEngine.gameState.gameMode : 'classic',
        difficulty: gameEngine ? gameEngine.gameState.difficulty : 'normal',
        powerUpsCollected: gameEngine ? (gameEngine.player.shieldCount + gameEngine.player.speedBoostCount) : 0,
        shieldsUsed: gameEngine ? (gameEngine.player.hasShield ? 1 : 0) : 0,
        shieldUsed: gameEngine ? gameEngine.player.hasShield : false
    };
    
    return achievementSystem.checkAchievements(enhancedStats);
}

// Function to display user achievements in UI
function displayUserAchievements() {
    const user = getUserData();
    if (!user || !achievementSystem) return;
    
    const userAchievements = achievementSystem.getUserAchievements(user);
    const totalPoints = achievementSystem.getTotalAchievementPoints(user);
    const completionRate = achievementSystem.getAchievementCompletionRate(user);
    
    console.log(`User Achievements: ${userAchievements.length}`);
    console.log(`Total Points: ${totalPoints}`);
    console.log(`Completion Rate: ${completionRate}%`);
    
    return {
        achievements: userAchievements,
        totalPoints: totalPoints,
        completionRate: completionRate
    };
}

// Function to show achievement notification
function showAchievementNotification(title, description) {
    const notification = document.getElementById('achievementNotification');
    const messageElement = document.getElementById('achievementMessage');
    
    if (notification && messageElement) {
        messageElement.textContent = description;
        notification.classList.remove('hidden');
        notification.classList.add('animate__animated', 'animate__slideInRight');
        
        setTimeout(() => {
            notification.classList.add('animate__slideOutRight');
            setTimeout(() => {
                notification.classList.add('hidden');
                notification.classList.remove('animate__animated', 'animate__slideInRight', 'animate__slideOutRight');
            }, 500);
        }, 4000);
    }
}
