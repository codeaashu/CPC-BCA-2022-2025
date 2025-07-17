// User Management System using localStorage
class UserManager {
    constructor() {
        this.currentUser = null;
        this.initializeDefaultData();
    }
    
    initializeDefaultData() {
        // Initialize default user data structure if not exists
        if (!localStorage.getItem('crossRoadUsers')) {
            const defaultData = {
                users: {},
                leaderboards: {
                    classic: [],
                    'time-attack': [],
                    endless: []
                },
                settings: {
                    musicVolume: 50,
                    sfxVolume: 50,
                    difficulty: 'normal'
                }
            };
            localStorage.setItem('crossRoadUsers', JSON.stringify(defaultData));
        }
    }
    
    createUser(name, avatar) {
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        const userId = this.generateUserId(name);
        
        const userData = {
            id: userId,
            name: name,
            avatar: avatar,
            createdAt: new Date().toISOString(),
            lastPlayed: new Date().toISOString(),
            stats: {
                gamesPlayed: 0,
                totalScore: 0,
                highScores: {
                    classic: 0,
                    'time-attack': 0,
                    endless: 0
                },
                achievements: [],
                totalTimePlayed: 0
            }
        };
        
        gameData.users[userId] = userData;
        localStorage.setItem('crossRoadUsers', JSON.stringify(gameData));
        
        this.currentUser = userData;
        return userData;
    }
    
    loginUser(name, avatar) {
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        const userId = this.generateUserId(name);
        
        if (gameData.users[userId]) {
            // User exists, update last played and avatar
            gameData.users[userId].lastPlayed = new Date().toISOString();
            gameData.users[userId].avatar = avatar;
            localStorage.setItem('crossRoadUsers', JSON.stringify(gameData));
            this.currentUser = gameData.users[userId];
        } else {
            // Create new user
            this.currentUser = this.createUser(name, avatar);
        }
        
        return this.currentUser;
    }
    
    generateUserId(name) {
        return name.toLowerCase().replace(/[^a-z0-9]/g, '') + '_' + Date.now().toString(36);
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    updateUserStats(statsUpdate) {
        if (!this.currentUser) return;
        
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        const userId = this.currentUser.id;
        
        if (gameData.users[userId]) {
            // Update stats
            Object.keys(statsUpdate).forEach(key => {
                if (key === 'highScores') {
                    Object.keys(statsUpdate.highScores).forEach(mode => {
                        gameData.users[userId].stats.highScores[mode] = Math.max(
                            gameData.users[userId].stats.highScores[mode],
                            statsUpdate.highScores[mode]
                        );
                    });
                } else {
                    gameData.users[userId].stats[key] += statsUpdate[key] || 0;
                }
            });
            
            gameData.users[userId].lastPlayed = new Date().toISOString();
            localStorage.setItem('crossRoadUsers', JSON.stringify(gameData));
            this.currentUser = gameData.users[userId];
        }
    }
    
    addAchievement(achievementId, title, description) {
        if (!this.currentUser) return;
        
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        const userId = this.currentUser.id;
        
        if (gameData.users[userId]) {
            const achievement = {
                id: achievementId,
                title: title,
                description: description,
                unlockedAt: new Date().toISOString()
            };
            
            // Check if achievement already exists
            const existingAchievement = gameData.users[userId].stats.achievements.find(a => a.id === achievementId);
            if (!existingAchievement) {
                gameData.users[userId].stats.achievements.push(achievement);
                localStorage.setItem('crossRoadUsers', JSON.stringify(gameData));
                this.currentUser = gameData.users[userId];
                
                // Show achievement notification
                showAchievementNotification(title, description);
                return true;
            }
        }
        return false;
    }
    
    getAllUsers() {
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        return Object.values(gameData.users);
    }
    
    deleteUser(userId) {
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        delete gameData.users[userId];
        localStorage.setItem('crossRoadUsers', JSON.stringify(gameData));
        
        if (this.currentUser && this.currentUser.id === userId) {
            this.currentUser = null;
        }
    }
    
    exportUserData() {
        if (!this.currentUser) return null;
        
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        const userData = gameData.users[this.currentUser.id];
        
        return JSON.stringify(userData, null, 2);
    }
    
    importUserData(jsonData) {
        try {
            const userData = JSON.parse(jsonData);
            const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
            
            gameData.users[userData.id] = userData;
            localStorage.setItem('crossRoadUsers', JSON.stringify(gameData));
            
            this.currentUser = userData;
            return true;
        } catch (error) {
            console.error('Failed to import user data:', error);
            return false;
        }
    }
    
    resetAllData() {
        localStorage.removeItem('crossRoadUsers');
        this.currentUser = null;
        this.initializeDefaultData();
    }
}

// Leaderboard Management
class LeaderboardManager {
    constructor() {
        this.maxEntriesPerMode = 10;
    }
    
    addScore(playerName, score, gameMode) {
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        
        const entry = {
            playerName: playerName,
            score: score,
            date: new Date().toISOString(),
            id: Date.now().toString()
        };
        
        if (!gameData.leaderboards[gameMode]) {
            gameData.leaderboards[gameMode] = [];
        }
        
        gameData.leaderboards[gameMode].push(entry);
        
        // Sort by score (highest first) and keep only top entries
        gameData.leaderboards[gameMode].sort((a, b) => b.score - a.score);
        gameData.leaderboards[gameMode] = gameData.leaderboards[gameMode].slice(0, this.maxEntriesPerMode);
        
        localStorage.setItem('crossRoadUsers', JSON.stringify(gameData));
        
        return this.getLeaderboard(gameMode);
    }
    
    getLeaderboard(gameMode) {
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        return gameData.leaderboards[gameMode] || [];
    }
    
    getAllLeaderboards() {
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        return gameData.leaderboards;
    }
    
    clearLeaderboard(gameMode) {
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        gameData.leaderboards[gameMode] = [];
        localStorage.setItem('crossRoadUsers', JSON.stringify(gameData));
    }
}

// Settings Management
class SettingsManager {
    constructor() {
        this.defaultSettings = {
            musicVolume: 50,
            sfxVolume: 50,
            difficulty: 'normal',
            autoSave: true,
            showNotifications: true
        };
    }
    
    getSettings() {
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        return { ...this.defaultSettings, ...gameData.settings };
    }
    
    updateSettings(newSettings) {
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        gameData.settings = { ...gameData.settings, ...newSettings };
        localStorage.setItem('crossRoadUsers', JSON.stringify(gameData));
        
        // Apply settings to game
        this.applySettings(gameData.settings);
    }
    
    applySettings(settings) {
        if (gameEngine && gameEngine.audio) {
            gameEngine.audio.backgroundMusic.volume = settings.musicVolume / 100;
            gameEngine.setDifficulty(settings.difficulty);
        }
    }
    
    resetSettings() {
        const gameData = JSON.parse(localStorage.getItem('crossRoadUsers'));
        gameData.settings = { ...this.defaultSettings };
        localStorage.setItem('crossRoadUsers', JSON.stringify(gameData));
        this.applySettings(gameData.settings);
    }
}

// Global instances
let userManager = null;
let leaderboardManager = null;
let settingsManager = null;

// Initialize managers
document.addEventListener('DOMContentLoaded', function() {
    userManager = new UserManager();
    leaderboardManager = new LeaderboardManager();
    settingsManager = new SettingsManager();
    
    // Apply saved settings
    const settings = settingsManager.getSettings();
    settingsManager.applySettings(settings);
    
    // Update settings UI
    updateSettingsUI(settings);
});

// Helper functions for easy access
function getUserData() {
    return userManager.getCurrentUser();
}

function saveUserData(userData) {
    userManager.updateUserStats(userData);
}

function addToLeaderboard(playerName, score, gameMode) {
    return leaderboardManager.addScore(playerName, score, gameMode);
}

function getLeaderboard(gameMode) {
    return leaderboardManager.getLeaderboard(gameMode);
}

function updateSettingsUI(settings) {
    const musicVolumeSlider = document.getElementById('musicVolume');
    const sfxVolumeSlider = document.getElementById('sfxVolume');
    const difficultySelect = document.getElementById('gameDifficulty');
    
    if (musicVolumeSlider) {
        musicVolumeSlider.value = settings.musicVolume;
        document.getElementById('musicVolumeValue').textContent = settings.musicVolume + '%';
    }
    
    if (sfxVolumeSlider) {
        sfxVolumeSlider.value = settings.sfxVolume;
        document.getElementById('sfxVolumeValue').textContent = settings.sfxVolume + '%';
    }
    
    if (difficultySelect) {
        difficultySelect.value = settings.difficulty;
    }
}

function showAchievementNotification(title, description) {
    const notification = document.getElementById('achievementNotification');
    const messageElement = document.getElementById('achievementMessage');
    
    messageElement.textContent = description;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 4000);
}
