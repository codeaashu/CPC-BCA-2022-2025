// Enhanced Game Logic for Cross Road Game
class GameEngine {
    constructor() {
        this.gameState = {
            isRunning: false,
            isPaused: false,
            gameMode: 'classic',
            level: 1,
            score: 0,
            timeLeft: 60,
            startTime: null,
            cars: [],
            powerUps: [],
            carNo: 0,
            manPosition: { row: 15, col: 15 },
            gameSpeed: 500,
            difficulty: 'normal'
        };
        
        this.player = {
            name: '',
            avatar: 'man.jpg',
            hasShield: false,
            shieldCount: 0,
            speedBoostCount: 0,
            speedBoostActive: false
        };
        
        this.audio = {
            backgroundMusic: new Audio("audio/songs.mp3"),
            carCrash: new Audio("audio/car.wav"),
            powerUpSound: null, // Will be created with Web Audio API
            levelUpSound: null
        };
        
        this.intervals = {
            gameLoop: null,
            carMovement: null,
            powerUpSpawn: null,
            timeCountdown: null
        };
        
        this.initializeAudio();
        this.setupEventListeners();
    }
    
    initializeAudio() {
        this.audio.backgroundMusic.loop = true;
        this.audio.backgroundMusic.volume = 0.5;
        
        // Create power-up sound with Web Audio API
        if (window.AudioContext || window.webkitAudioContext) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createPowerUpSound(audioContext);
        }
    }
    
    createPowerUpSound(audioContext) {
        // Create a simple power-up sound
        this.audio.powerUpSound = () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        };
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        document.addEventListener('keyup', (e) => this.handleKeyRelease(e));
    }
    
    handleKeyPress(e) {
        if (!this.gameState.isRunning || this.gameState.isPaused) {
            if (e.code === 'Space' && !this.gameState.isRunning) {
                this.startGame();
                e.preventDefault();
            }
            if (e.code === 'KeyP' && this.gameState.isRunning) {
                this.togglePause();
                e.preventDefault();
            }
            return;
        }
        
        switch(e.code) {
            case 'ArrowUp':
            case 'KeyW':
                this.movePlayer('up');
                e.preventDefault();
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.movePlayer('down');
                e.preventDefault();
                break;
            case 'ArrowLeft':
            case 'KeyA':
                this.movePlayer('left');
                e.preventDefault();
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.movePlayer('right');
                e.preventDefault();
                break;
            case 'KeyP':
                this.togglePause();
                e.preventDefault();
                break;
            case 'Space':
                this.useShield();
                e.preventDefault();
                break;
        }
    }
    
    handleKeyRelease(e) {
        // Handle any key release events if needed
    }
    
    startGame() {
        this.gameState.isRunning = true;
        this.gameState.isPaused = false;
        this.gameState.startTime = Date.now();
        
        // Reset game state
        this.resetGameState();
        
        // Update UI
        this.updateGameDisplay();
        
        // Start game loops
        this.startGameLoops();
        
        // Play background music
        this.audio.backgroundMusic.currentTime = 0;
        this.audio.backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
        
        console.log('Game started in', this.gameState.gameMode, 'mode');
    }
    
    resetGameState() {
        this.gameState.level = 1;
        this.gameState.score = 0;
        this.gameState.cars = [];
        this.gameState.powerUps = [];
        this.gameState.carNo = 0;
        this.gameState.manPosition = { row: 15, col: 15 };
        this.gameState.gameSpeed = this.getInitialSpeed();
        
        if (this.gameState.gameMode === 'time-attack') {
            this.gameState.timeLeft = 60;
        }
        
        this.player.hasShield = false;
        this.player.shieldCount = 0;
        this.player.speedBoostCount = 0;
        this.player.speedBoostActive = false;
        
        // Clear the game board
        $('.game').empty();
        $('.game').append(`
            <div class="man_div" style="grid-row-start: 15; grid-column-start: 15;">
                <img class="man" id="playerCharacter" src="images/${this.player.avatar}">
                <div class="shield-effect hidden" id="shieldEffect"></div>
            </div>
        `);
    }
    
    getInitialSpeed() {
        const speeds = {
            easy: 700,
            normal: 500,
            hard: 300
        };
        return speeds[this.gameState.difficulty] || 500;
    }
    
    startGameLoops() {
        // Main game loop for spawning cars
        this.intervals.gameLoop = setInterval(() => {
            this.spawnCar();
        }, this.gameState.gameSpeed);
        
        // Car movement loop
        this.intervals.carMovement = setInterval(() => {
            this.moveCars();
        }, 100);
        
        // Collision detection loop
        this.intervals.collisionDetection = setInterval(() => {
            this.checkCollisions();
        }, 50);
        
        // Power-up spawning
        this.intervals.powerUpSpawn = setInterval(() => {
            this.spawnPowerUp();
        }, 8000);
        
        // Time countdown for time attack mode
        if (this.gameState.gameMode === 'time-attack') {
            this.intervals.timeCountdown = setInterval(() => {
                this.updateTimeAttack();
            }, 1000);
        }
    }
    
    stopGameLoops() {
        Object.values(this.intervals).forEach(interval => {
            if (interval) clearInterval(interval);
        });
        this.intervals = {
            gameLoop: null,
            carMovement: null,
            powerUpSpawn: null,
            timeCountdown: null,
            collisionDetection: null
        };
    }
    
    movePlayer(direction) {
        if (!this.gameState.isRunning || this.gameState.isPaused) return;
        
        const oldPosition = { ...this.gameState.manPosition };
        
        switch(direction) {
            case 'up':
                if (this.gameState.manPosition.row > 1) {
                    this.gameState.manPosition.row--;
                    this.checkLevelProgress();
                }
                break;
            case 'down':
                if (this.gameState.manPosition.row < 15) {
                    this.gameState.manPosition.row++;
                }
                break;
            case 'left':
                if (this.gameState.manPosition.col > 1) {
                    this.gameState.manPosition.col--;
                }
                break;
            case 'right':
                if (this.gameState.manPosition.col < 30) {
                    this.gameState.manPosition.col++;
                }
                break;
        }
        
        // Update player position in DOM
        $('.man_div').css({
            'grid-row-start': this.gameState.manPosition.row,
            'grid-column-start': this.gameState.manPosition.col
        });
        
        // Add movement animation
        if (this.player.speedBoostActive) {
            $('.man').addClass('animate__animated animate__pulse');
            setTimeout(() => $('.man').removeClass('animate__animated animate__pulse'), 200);
        }
    }
    
    checkLevelProgress() {
        if (this.gameState.manPosition.row === 1) {
            this.levelUp();
        }
    }
    
    levelUp() {
        this.gameState.level++;
        this.gameState.score += 100 * this.gameState.level;
        
        // Reset player position
        this.gameState.manPosition = { row: 15, col: 15 };
        $('.man_div').css({
            'grid-row-start': 15,
            'grid-column-start': 15
        });
        
        // Increase difficulty
        if (this.gameState.gameSpeed > 150) {
            this.gameState.gameSpeed -= 25;
            clearInterval(this.intervals.gameLoop);
            this.intervals.gameLoop = setInterval(() => {
                this.spawnCar();
            }, this.gameState.gameSpeed);
        }
        
        // Update display
        this.updateGameDisplay();
        
        // Check achievements
        checkAchievements();
        
        // Show level up notification
        this.showNotification(`Level ${this.gameState.level}!`, 'level-up');
        
        console.log('Level up! Now at level', this.gameState.level);
    }
    
    spawnCar() {
        const lane = Math.floor(Math.random() * 13) + 2; // Lanes 2-14
        const vehicleTypes = [
            { type: 'car', speed: 1, class: 'vehicle-normal' },
            { type: 'sports', speed: 1.5, class: 'vehicle-sports' },
            { type: 'truck', speed: 0.7, class: 'vehicle-truck' },
            { type: 'police', speed: 1.2, class: 'vehicle-police' },
            { type: 'ambulance', speed: 1.3, class: 'vehicle-ambulance' },
            { type: 'motorcycle', speed: 2, class: 'vehicle-motorcycle' }
        ];
        
        const vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
        const carType = Math.floor(Math.random() * 9) + 1; // car1.jpg to car9.jpg
        const carId = `car${this.gameState.carNo}`;
        
        // Create modern vehicle element
        let vehicleContent = '';
        if (vehicleType.type === 'car') {
            vehicleContent = `<img class='car' src='images/car${carType}.jpg' alt='Vehicle'>`;
        } else {
            vehicleContent = `<div class='modern-vehicle ${vehicleType.class}'></div>`;
        }
        
        const carElement = $(`
            <div class='car ${carId} ${vehicleType.class}' 
                 style='grid-column-start: 30; 
                        grid-column-end: 32; 
                        grid-row-start: ${lane};'
                 data-speed='${vehicleType.speed}'>
                ${vehicleContent}
            </div>
        `);
        
        $('.game').append(carElement);
        
        this.gameState.cars.push({
            id: carId,
            element: carElement,
            lane: lane,
            position: 30,
            speed: vehicleType.speed,
            type: vehicleType.type
        });
        
        this.gameState.carNo++;
        
        // Add special vehicle sound effects
        if (vehicleType.type === 'police' || vehicleType.type === 'ambulance') {
            this.playSpecialVehicleSound(vehicleType.type);
        }
    }
    
    playSpecialVehicleSound(vehicleType) {
        // Create simple sound effects using Web Audio API
        if (window.AudioContext || window.webkitAudioContext) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            if (vehicleType === 'police') {
                // Police siren effect
                this.createSirenSound(audioContext, [800, 400], 0.5);
            } else if (vehicleType === 'ambulance') {
                // Ambulance siren effect
                this.createSirenSound(audioContext, [600, 300], 0.3);
            }
        }
    }
    
    createSirenSound(audioContext, frequencies, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequencies[0], audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(frequencies[1], audioContext.currentTime + duration);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    moveCars() {
        this.gameState.cars = this.gameState.cars.filter(car => {
            const carSpeed = car.speed || 1;
            car.position -= carSpeed;
            
            if (car.position <= 0) {
                car.element.remove();
                return false;
            }
            
            // Smooth movement with better performance
            car.element.css({
                'grid-column-start': Math.round(car.position),
                'grid-column-end': Math.round(car.position) + 2,
                'transform': `translateX(${(car.position % 1) * 100}%)`
            });
            
            return true;
        });
    }
    
    spawnPowerUp() {
        if (Math.random() < 0.7) return; // 30% chance to spawn
        
        const lane = Math.floor(Math.random() * 13) + 2;
        const col = Math.floor(Math.random() * 28) + 2;
        const powerUpType = Math.random() < 0.5 ? 'shield' : 'speed';
        const powerUpId = `powerup${Date.now()}`;
        
        const icon = powerUpType === 'shield' ? '🛡️' : '⚡';
        
        const powerUpElement = $(`
            <div class='power-up ${powerUpId}' 
                 style='grid-column-start: ${col}; 
                        grid-row-start: ${lane};'
                 data-type='${powerUpType}'>
                ${icon}
            </div>
        `);
        
        $('.game').append(powerUpElement);
        
        this.gameState.powerUps.push({
            id: powerUpId,
            element: powerUpElement,
            type: powerUpType,
            lane: lane,
            col: col
        });
        
        // Remove power-up after 10 seconds
        setTimeout(() => {
            this.removePowerUp(powerUpId);
        }, 10000);
    }
    
    removePowerUp(powerUpId) {
        const index = this.gameState.powerUps.findIndex(p => p.id === powerUpId);
        if (index !== -1) {
            this.gameState.powerUps[index].element.remove();
            this.gameState.powerUps.splice(index, 1);
        }
    }
    
    checkCollisions() {
        // Check car collisions
        for (let car of this.gameState.cars) {
            if (car.lane === this.gameState.manPosition.row && 
                car.position <= this.gameState.manPosition.col && 
                car.position + 1 >= this.gameState.manPosition.col) {
                
                if (this.player.hasShield) {
                    this.useShield();
                    this.removeCar(car);
                    this.gameState.score += 50; // Bonus for shield use
                } else {
                    this.gameOver();
                    return;
                }
            }
        }
        
        // Check power-up collection
        for (let powerUp of this.gameState.powerUps) {
            if (powerUp.lane === this.gameState.manPosition.row && 
                powerUp.col === this.gameState.manPosition.col) {
                this.collectPowerUp(powerUp);
            }
        }
    }
    
    removeCar(car) {
        car.element.remove();
        const index = this.gameState.cars.findIndex(c => c.id === car.id);
        if (index !== -1) {
            this.gameState.cars.splice(index, 1);
        }
    }
    
    collectPowerUp(powerUp) {
        if (powerUp.type === 'shield') {
            this.player.shieldCount++;
            this.showNotification('Shield collected!', 'power-up');
        } else if (powerUp.type === 'speed') {
            this.player.speedBoostCount++;
            this.showNotification('Speed boost collected!', 'power-up');
        }
        
        this.gameState.score += 25;
        
        if (this.audio.powerUpSound) {
            this.audio.powerUpSound();
        }
        
        this.removePowerUp(powerUp.id);
        this.updateGameDisplay();
    }
    
    useShield() {
        if (this.player.shieldCount > 0 && !this.player.hasShield) {
            this.player.hasShield = true;
            this.player.shieldCount--;
            
            $('#shieldEffect').removeClass('hidden');
            
            setTimeout(() => {
                this.player.hasShield = false;
                $('#shieldEffect').addClass('hidden');
            }, 5000);
            
            this.updateGameDisplay();
            this.showNotification('Shield activated!', 'shield');
        }
    }
    
    useSpeedBoost() {
        if (this.player.speedBoostCount > 0 && !this.player.speedBoostActive) {
            this.player.speedBoostActive = true;
            this.player.speedBoostCount--;
            
            $('.man').addClass('speed-boost');
            
            setTimeout(() => {
                this.player.speedBoostActive = false;
                $('.man').removeClass('speed-boost');
            }, 3000);
            
            this.updateGameDisplay();
            this.showNotification('Speed boost activated!', 'speed');
        }
    }
    
    updateTimeAttack() {
        if (this.gameState.gameMode === 'time-attack') {
            this.gameState.timeLeft--;
            
            if (this.gameState.timeLeft <= 0) {
                this.gameOver();
            }
            
            this.updateGameDisplay();
        }
    }
    
    togglePause() {
        if (!this.gameState.isRunning) return;
        
        this.gameState.isPaused = !this.gameState.isPaused;
        
        if (this.gameState.isPaused) {
            this.stopGameLoops();
            this.audio.backgroundMusic.pause();
            document.getElementById('pauseScreen').classList.remove('hidden');
        } else {
            this.startGameLoops();
            this.audio.backgroundMusic.play();
            document.getElementById('pauseScreen').classList.add('hidden');
        }
    }
    
    gameOver() {
        this.gameState.isRunning = false;
        this.gameState.isPaused = false;
        
        this.stopGameLoops();
        this.audio.backgroundMusic.pause();
        this.audio.carCrash.play();
        
        // Calculate final stats
        const timeSurvived = Math.floor((Date.now() - this.gameState.startTime) / 1000);
        
        // Save high score
        const userData = getUserData();
        const gameMode = this.gameState.gameMode;
        
        let isNewRecord = false;
        if (!userData.highScores[gameMode] || this.gameState.score > userData.highScores[gameMode]) {
            userData.highScores[gameMode] = this.gameState.score;
            isNewRecord = true;
        }
        
        userData.gamesPlayed++;
        userData.totalScore += this.gameState.score;
        
        // Add to leaderboard
        addToLeaderboard(this.player.name, this.gameState.score, gameMode);
        
        saveUserData(userData);
        
        // Show game over screen
        this.showGameOverScreen(timeSurvived, isNewRecord);
        
        // Check achievements
        checkAchievements();
    }
    
    showGameOverScreen(timeSurvived, isNewRecord) {
        document.getElementById('finalScore').textContent = this.gameState.score;
        document.getElementById('finalLevel').textContent = this.gameState.level;
        document.getElementById('timeSurvived').textContent = timeSurvived + 's';
        
        if (isNewRecord) {
            document.getElementById('newRecordMessage').style.display = 'block';
        } else {
            document.getElementById('newRecordMessage').style.display = 'none';
        }
        
        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('gameOverScreen').classList.remove('hidden');
    }
    
    updateGameDisplay() {
        document.getElementById('currentScore').textContent = this.gameState.score;
        document.getElementById('currentLevel').textContent = this.gameState.level;
        document.getElementById('shieldCount').textContent = this.player.shieldCount;
        document.getElementById('speedCount').textContent = this.player.speedBoostCount;
        
        if (this.gameState.gameMode === 'time-attack') {
            document.getElementById('timeLeft').textContent = this.gameState.timeLeft;
            document.getElementById('timeDisplay').style.display = 'block';
        } else {
            document.getElementById('timeDisplay').style.display = 'none';
        }
    }
    
    showNotification(message, type) {
        // You can implement custom notifications here
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
    
    setGameMode(mode) {
        this.gameState.gameMode = mode;
        console.log('Game mode set to:', mode);
    }
    
    setDifficulty(difficulty) {
        this.gameState.difficulty = difficulty;
        this.gameState.gameSpeed = this.getInitialSpeed();
        console.log('Difficulty set to:', difficulty);
    }
    
    setPlayer(name, avatar) {
        this.player.name = name;
        this.player.avatar = avatar;
        console.log('Player set:', name, avatar);
    }
}

// Global game engine instance
let gameEngine = null;

// Initialize game engine when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameEngine = new GameEngine();
    console.log('Game engine initialized');
});
