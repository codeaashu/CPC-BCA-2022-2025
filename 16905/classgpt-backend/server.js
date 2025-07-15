const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db'); // ✅ MongoDB Connection

dotenv.config(); // 🔐 Load .env vars

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 1. Connect to MongoDB
connectDB();

// ✅ 2. Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '15mb' })); // for base64, audio etc.
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// ✅ 3. Serve static files (e.g., /voice/audio.mp3)
app.use('/voice', express.static(path.join(__dirname, 'public', 'voice')));

// ✅ 4. Routes
const gptRoutes = require('./routes/gptRoutes');
const saveRoutes = require('./routes/saveRoutes');
const ttsRoutes = require('./routes/ttsRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // ✅ JWT Signup/Login

const askRoutes = require('./routes/askRoutes');
app.use('/api/ask', askRoutes);

app.use('/api/gpt', gptRoutes);
app.use('/api/save', saveRoutes);
app.use('/api/tts', ttsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // ✅ Mount auth routes

// ✅ 5. Health Check
app.get('/', (req, res) => res.send('✅ ClassGPT API is running...'));

// ✅ 6. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
