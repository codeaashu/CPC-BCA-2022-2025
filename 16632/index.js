// Main Application Controller for Enhanced Cross Road Game
document.addEventListener('DOMContentLoaded', function() {
    showKillerIntro();
});

function showKillerIntro() {
    // Create sparkles effect
    createSparkles();
    
    // Show intro screen
    showScreen('introScreen');
    
    // Auto-transition to login after intro
    setTimeout(() => {
        initializeApp();
    }, 4000);
}

function createSparkles() {
    const sparklesContainer = document.getElementById('sparkles');
    if (!sparklesContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparklesContainer.appendChild(sparkle);
    }
}

function initializeApp() {
    // Show login screen after intro
    showScreen('loginScreen');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize volume sliders
    initializeVolumeSliders();
    
    // Setup mobile detection
    setupMobileControls();
    
    console.log('Cross Road Game - Advanced Edition initialized');
}

function setupMobileControls() {
    // Detect if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // Enable mobile controls
        document.getElementById('mobileControls').style.display = 'flex';
        
        // Prevent default touch behaviors
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

let mobileMoving = false;
let moveInterval = null;

function mobileMove(direction) {
    if (mobileMoving) return;
    
    mobileMoving = true;
    
    // Initial move
    if (gameEngine && gameEngine.gameState.isRunning) {
        gameEngine.movePlayer(direction);
    }
    
    // Continue moving while holding
    moveInterval = setInterval(() => {
        if (gameEngine && gameEngine.gameState.isRunning) {
            gameEngine.movePlayer(direction);
        }
    }, 150);
}

function stopMobileMove() {
    mobileMoving = false;
    if (moveInterval) {
        clearInterval(moveInterval);
        moveInterval = null;
    }
}

function setupEventListeners() {
    // Avatar selection
    document.querySelectorAll('.avatar-option').forEach(avatar => {
        avatar.addEventListener('click', function() {
            document.querySelectorAll('.avatar-option').forEach(a => a.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Settings event listeners
    setupSettingsListeners();
}

function setupSettingsListeners() {
    // Music volume slider
    const musicVolumeSlider = document.getElementById('musicVolume');
    if (musicVolumeSlider) {
        musicVolumeSlider.addEventListener('input', function() {
            const value = this.value;
            document.getElementById('musicVolumeValue').textContent = value + '%';
            if (gameEngine && gameEngine.audio.backgroundMusic) {
                gameEngine.audio.backgroundMusic.volume = value / 100;
            }
            settingsManager.updateSettings({ musicVolume: parseInt(value) });
        });
    }
    
    // SFX volume slider
    const sfxVolumeSlider = document.getElementById('sfxVolume');
    if (sfxVolumeSlider) {
        sfxVolumeSlider.addEventListener('input', function() {
            const value = this.value;
            document.getElementById('sfxVolumeValue').textContent = value + '%';
            if (gameEngine && gameEngine.audio.carCrash) {
                gameEngine.audio.carCrash.volume = value / 100;
            }
            settingsManager.updateSettings({ sfxVolume: parseInt(value) });
        });
    }
    
    // Difficulty selector
    const difficultySelect = document.getElementById('gameDifficulty');
    if (difficultySelect) {
        difficultySelect.addEventListener('change', function() {
            const difficulty = this.value;
            if (gameEngine) {
                gameEngine.setDifficulty(difficulty);
            }
            settingsManager.updateSettings({ difficulty: difficulty });
        });
    }
}

function initializeVolumeSliders() {
    const settings = settingsManager ? settingsManager.getSettings() : { musicVolume: 50, sfxVolume: 50 };
    
    const musicSlider = document.getElementById('musicVolume');
    const sfxSlider = document.getElementById('sfxVolume');
    
    if (musicSlider) {
        musicSlider.value = settings.musicVolume;
        document.getElementById('musicVolumeValue').textContent = settings.musicVolume + '%';
    }
    
    if (sfxSlider) {
        sfxSlider.value = settings.sfxVolume;
        document.getElementById('sfxVolumeValue').textContent = settings.sfxVolume + '%';
    }
}

// Screen Management Functions
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    
    // Show selected screen
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.remove('hidden');
    }
}

// Login and User Management
function startGame() {
    const playerNameInput = document.getElementById('playerName');
    const selectedAvatar = document.querySelector('.avatar-option.selected');
    
    if (!playerNameInput.value.trim()) {
        alert('Please enter your name!');
        return;
    }
    
    const playerName = playerNameInput.value.trim();
    const avatarSrc = selectedAvatar.getAttribute('data-avatar');
    
    // Login user
    const user = userManager.loginUser(playerName, avatarSrc);
    
    // Set player data in game engine
    if (gameEngine) {
        gameEngine.setPlayer(playerName, avatarSrc);
    }
    
    // Show main menu
    updateMainMenuDisplay(user);
    showScreen('mainMenu');
}

function updateMainMenuDisplay(user) {
    document.getElementById('playerNameDisplay').textContent = user.name;
    document.getElementById('playerAvatarDisplay').src = 'images/' + user.avatar;
    document.getElementById('highScoreDisplay').textContent = Math.max(...Object.values(user.stats.highScores));
    document.getElementById('gamesPlayedDisplay').textContent = user.stats.gamesPlayed;
}

function logout() {
    userManager.currentUser = null;
    showScreen('loginScreen');
    document.getElementById('playerName').value = '';
}

// Game Mode Selection
function selectGameMode(mode) {
    if (gameEngine) {
        gameEngine.setGameMode(mode);
    }
    
    // Update game UI based on mode
    updateGameModeDisplay(mode);
    
    // Start the game
    startGameSession();
}

function updateGameModeDisplay(mode) {
    const user = getUserData();
    if (user) {
        document.getElementById('gamePlayerName').textContent = user.name;
        document.getElementById('gamePlayerAvatar').src = 'images/' + user.avatar;
    }
    
    // Update game status message
    const statusMessages = {
        'classic': 'Press "SPACE" to Start Classic Mode',
        'time-attack': 'Press "SPACE" to Start - 60 Seconds!',
        'endless': 'Press "SPACE" to Start Endless Mode'
    };
    
    document.getElementById('gameStatus').textContent = statusMessages[mode] || 'Press "SPACE" to Start';
}

function startGameSession() {
    showScreen('gameScreen');
    // Game will start when user presses space (handled in gameLogic.js)
}

// Navigation Functions
function showMainMenu() {
    const user = getUserData();
    if (user) {
        updateMainMenuDisplay(user);
        showScreen('mainMenu');
    } else {
        showScreen('loginScreen');
    }
    
    // Stop game if running
    if (gameEngine && gameEngine.gameState.isRunning) {
        gameEngine.gameState.isRunning = false;
        gameEngine.stopGameLoops();
        gameEngine.audio.backgroundMusic.pause();
    }
}

function restartGame() {
    if (gameEngine) {
        gameEngine.startGame();
    }
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('pauseScreen').classList.add('hidden');
}

function pauseGame() {
    if (gameEngine) {
        gameEngine.togglePause();
    }
}

function resumeGame() {
    if (gameEngine) {
        gameEngine.togglePause();
    }
}

// Leaderboard Functions
function showLeaderboard() {
    updateLeaderboardDisplay('classic');
    showScreen('leaderboardScreen');
}

function hideLeaderboard() {
    showScreen('loginScreen');
}

function showLeaderboardTab(mode) {
    // Update tab styling
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update leaderboard content
    updateLeaderboardDisplay(mode);
}

function updateLeaderboardDisplay(mode) {
    const leaderboard = getLeaderboard(mode);
    const leaderboardList = document.getElementById('leaderboardList');
    
    if (!leaderboardList) return;
    
    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<p style="text-align: center; color: #666;">No scores yet. Be the first!</p>';
        return;
    }
    
    leaderboardList.innerHTML = leaderboard.map((entry, index) => `
        <div class="leaderboard-entry">
            <div class="leaderboard-rank">${index + 1}</div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${entry.playerName}</div>
                <div class="leaderboard-score">${entry.score} points</div>
            </div>
        </div>
    `).join('');
}

// Settings Functions
function showSettings() {
    const settings = settingsManager.getSettings();
    updateSettingsUI(settings);
    showScreen('settingsScreen');
}

function hideSettings() {
    showScreen('loginScreen');
}

function resetGameData() {
    if (confirm('Are you sure you want to reset all game data? This cannot be undone!')) {
        userManager.resetAllData();
        leaderboardManager.clearLeaderboard('classic');
        leaderboardManager.clearLeaderboard('time-attack');
        leaderboardManager.clearLeaderboard('endless');
        settingsManager.resetSettings();
        
        alert('All game data has been reset!');
        logout();
    }
}

// Power-up Functions (called from game)
function activateShield() {
    if (gameEngine) {
        gameEngine.useShield();
    }
}

function activateSpeedBoost() {
    if (gameEngine) {
        gameEngine.useSpeedBoost();
    }
}

// Achievement Display
function showAchievements() {
    const user = getUserData();
    if (!user) return;
    
    const achievementData = displayUserAchievements();
    console.log('User Achievement Data:', achievementData);
    
    // You can create a dedicated achievements screen here
    alert(`Achievements: ${achievementData.achievements.length}\nTotal Points: ${achievementData.totalPoints}\nCompletion: ${achievementData.completionRate}%`);
}

// Utility Functions
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatScore(score) {
    return score.toLocaleString();
}

// Global key event handler for game controls
document.addEventListener('keydown', function(e) {
    // Handle global shortcuts
    if (e.code === 'Escape') {
        if (document.getElementById('gameScreen').classList.contains('hidden')) {
            showMainMenu();
        } else if (gameEngine && gameEngine.gameState.isRunning) {
            pauseGame();
        }
        e.preventDefault();
    }
});

// Handle page visibility changes (pause game when tab is not active)
document.addEventListener('visibilitychange', function() {
    if (document.hidden && gameEngine && gameEngine.gameState.isRunning && !gameEngine.gameState.isPaused) {
        pauseGame();
    }
});

// Save game state periodically
setInterval(function() {
    const user = getUserData();
    if (user && gameEngine && gameEngine.gameState.isRunning) {
        // Auto-save user progress
        const currentStats = {
            totalTimePlayed: Math.floor((Date.now() - gameEngine.gameState.startTime) / 1000)
        };
        userManager.updateUserStats(currentStats);
    }
}, 30000); // Save every 30 seconds

console.log('Enhanced Cross Road Game loaded successfully!');

