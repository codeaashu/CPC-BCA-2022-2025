<div align="center">  

  <h1 align="center">🎮 Cross Road Game - Advanced Edition 🎮</h1>
  <img src="./images/LOGO.png" width="100px" />
  <br><a href="https://cross-the-road.vercel.app/"><strong> 🏎️💨Play the Game ✦ </strong></a><br><br>
  
  ` Welcome to the Enhanced Cross Road Car Game! This advanced version features multiple game modes, user authentication, achievements, leaderboards, power-ups, and much more. Perfect for college final year projects with comprehensive features and modern UI/UX design. `<hr></div>

<h2>🌟 Advanced Game Features</h2>

### 🎯 Core Gameplay
- **Multiple Game Modes:** Classic, Time Attack (60s), and Endless modes
- **Dynamic Difficulty:** Progressive speed increases with smart AI car spawning
- **Enhanced Controls:** WASD + Arrow Keys support with smooth movement
- **Modern Graphics:** Beautiful UI with gradient backgrounds and animations

### 👤 User Management System
- **Frontend-Only Authentication:** No backend required - uses localStorage
- **Player Profiles:** Custom names and avatar selection
- **Progress Tracking:** Automatic save/load of player statistics
- **Multiple User Support:** Switch between different player profiles

### 🏆 Achievement System
- **25+ Achievements:** Scoring, level, time-based, and special achievements
- **Achievement Points:** Earn points for unlocking achievements
- **Progress Tracking:** Track completion rate and total points earned
- **Real-time Notifications:** Beautiful pop-up notifications for new achievements

### 📊 Advanced Statistics
- **Detailed Leaderboards:** Separate rankings for each game mode
- **Personal Stats:** Games played, total score, high scores per mode
- **Time Tracking:** Monitor time played and survival duration
- **Score History:** Track your improvement over time

### ⚡ Power-ups & Special Features
- **Shield Power-up:** 🛡️ Temporary protection from cars
- **Speed Boost:** ⚡ Enhanced movement speed for quick escapes
- **Strategic Gameplay:** Collect and use power-ups strategically
- **Visual Effects:** Animated shield effects and power-up indicators

### 🎵 Enhanced Audio/Visual
- **Background Music:** Immersive soundtrack with volume controls
- **Sound Effects:** Car crash, power-up collection, achievement sounds
- **Animations:** Smooth transitions using Animate.css
- **Responsive Design:** Works perfectly on desktop and mobile devices

### ⚙️ Customization Options
- **Settings Menu:** Adjust music/SFX volume, difficulty levels
- **Three Difficulty Modes:** Easy, Normal, Hard with different speeds
- **Avatar Selection:** Choose from multiple character avatars
- **Data Management:** Export/import user data, reset options

<h2>🎮 Game Modes Explained</h2>

### 🏃 Classic Mode
- Traditional cross-road gameplay
- Progressive difficulty increase
- Focus on reaching highest level possible
- Perfect for skill building

### ⏰ Time Attack Mode
- 60-second challenge
- Score as many points as possible
- Fast-paced action
- Great for quick gaming sessions

### ♾️ Endless Mode
- Survive as long as possible
- Gradually increasing difficulty
- Ultimate endurance test
- Compete for longest survival time

<h2>🎯 How to Play</h2>

### Basic Controls
- **Arrow Keys / WASD:** Move your character
- **SPACE:** Start game / Use shield
- **P:** Pause/Resume game
- **ESC:** Return to main menu

### Gameplay Tips
1. **Collect Power-ups:** Look for 🛡️ shields and ⚡ speed boosts
2. **Use Strategy:** Save shields for dangerous situations
3. **Watch Patterns:** Cars spawn in predictable lanes
4. **Practice Movement:** Master diagonal and quick movements
5. **Check Achievements:** Unlock all 25+ achievements for maximum points

<h2>🏆 Achievement Categories</h2>

- **Scoring Achievements:** Reach specific point milestones
- **Level Achievements:** Progress through game levels
- **Time-based:** Speed runs and endurance challenges
- **Mode-specific:** Master different game modes
- **Special Challenges:** Unique gameplay achievements
- **Cumulative:** Long-term progression rewards

<h2>💾 Technical Features</h2>

### Frontend-Only Architecture
- **No Backend Required:** Everything runs in the browser
- **LocalStorage Database:** Persistent data without servers
- **Offline Capable:** Play without internet connection
- **Cross-Platform:** Works on any device with a web browser

### Modern Web Technologies
- **HTML5/CSS3/JavaScript:** Clean, modern codebase
- **Bootstrap 5:** Responsive grid system
- **Font Awesome 6:** Beautiful icons throughout
- **Animate.css:** Smooth animations and transitions
- **jQuery:** Enhanced DOM manipulation

### Data Management
- **Automatic Saving:** Progress saved every 30 seconds
- **Data Export:** Backup your progress as JSON
- **Multiple Profiles:** Support for multiple users
- **Settings Persistence:** Preferences saved locally

<h2>🚀 Setup & Installation</h2>

1. **Download/Clone** the repository
2. **Open** `index.html` in any modern web browser
3. **Enter** your player name and select an avatar
4. **Start** playing immediately - no setup required!

### For Development
```bash
# Clone the repository
git clone https://github.com/codeaashu/Cross-Road-Game.git

# Navigate to directory
cd Cross-Road-Game

# Open in browser or serve with local server
python -m http.server 8000
# or
npx serve .
```

<h2>📁 Project Structure</h2>

```
Cross-Road-Game/
├── index.html          # Main game interface
├── styles.css          # Enhanced styling
├── index.js            # Main application controller
├── gameLogic.js        # Core game engine
├── userManager.js      # User authentication & data
├── achievements.js     # Achievement system
├── README.md           # This file
├── audio/
│   ├── songs.mp3       # Background music
│   └── car.wav         # Sound effects
└── images/
    ├── LOGO.png        # Game logo
    ├── man.jpg         # Player character
    ├── car1.jpg - car9.jpg  # Car sprites
    └── cross_the_road.png   # Game assets
```

<h2>🎓 Educational Value</h2>

### Perfect for College Projects
- **Complete Game Architecture:** Well-structured, modular codebase
- **Advanced JavaScript:** Object-oriented programming, event handling
- **Data Management:** LocalStorage, JSON handling, state management
- **UI/UX Design:** Modern interface design principles
- **Game Development:** Core game loop, collision detection, scoring systems

### Learning Outcomes
- Frontend web development
- Game programming concepts
- User experience design
- Data persistence techniques
- Achievement system implementation
- Leaderboard management
- Audio/visual integration

<h2>🔧 Customization Guide</h2>

### Adding New Achievements
1. Edit `achievements.js`
2. Add new achievement object to the achievements collection
3. Define condition function and reward points
4. Achievement will automatically appear in game

### Creating New Game Modes
1. Modify `gameLogic.js` GameEngine class
2. Add mode-specific logic in game loops
3. Update UI in `index.html` and `styles.css`
4. Add mode selection in `index.js`

### Adding Power-ups
1. Extend power-up spawning in `gameLogic.js`
2. Create new power-up effects and timers
3. Update UI indicators and sound effects
4. Add achievement conditions for new power-ups

<h2>🐛 Known Issues & Solutions</h2>

- **Audio Issues:** Some browsers require user interaction before playing audio
- **Performance:** Game performance may vary on older devices
- **Storage Limits:** LocalStorage has size limitations (usually 5-10MB)
- **Cross-Origin:** Serve from local server if loading local files fails

<h2>🤝 Contributing</h2>

1. Fork the repository
2. Create a feature branch
3. Implement your enhancement
4. Test thoroughly across different browsers
5. Submit a pull request with detailed description

<h2>📊 Statistics</h2>

- **Code Files:** 6 main JavaScript/CSS files
- **Features:** 25+ game features implemented
- **Achievements:** 25+ unlockable achievements
- **Game Modes:** 3 distinct gameplay modes
- **UI Screens:** 8 different game screens
- **Browser Compatibility:** Chrome, Firefox, Safari, Edge

<h2>📄 License</h2>

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <p>⭐ Star this repository if you found it helpful!</p>
  <p>🎮 Happy Gaming! 🎮</p>
</div>

1. **Start the Game:** Click on the play button or press `Enter` to begin.
2. **Move the Car:** Use the arrow keys on your keyboard to move the car in the desired direction.
   - **Up Arrow (↑):** Move forward
   - **Down Arrow (↓):** Move backward
   - **Left Arrow (←):** Move left
   - **Right Arrow (→):** Move right
3. **Cross the Roads:** Navigate through the traffic and try to cross as many roads as possible without crashing.
4. **Score Points:** Each successful crossing adds points to your score.
5. **Avoid Obstacles:** Dodge cars, trucks, and other road hazards that come your way.

<h2>Game Rules 🚨</h2>

- **Stay on the Road:** Keep your car on the road to avoid penalties.
- **Avoid Collisions:** If your car collides with another vehicle or obstacle, the game will end.
- **Increase Your Score:** The more roads you cross, the higher your score.
- **Speed Up:** As you progress, the speed and frequency of the obstacles will increase, adding to the challenge.


<div align="center">

` Enjoy the Game! `

We hope you have fun playing the Classic Cross Road Game. If you have any feedback or suggestions, feel free to share them with us. Happy Gaming!

`Don't forget to give A star to this repository ⭐`


`👍🏻 All Set! 💌`

</div>
