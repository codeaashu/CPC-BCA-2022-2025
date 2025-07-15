const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/routine', require('./routes/routineRoutes'));
app.use('/api/substitute', require('./routes/substituteRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// ✅ Optional: Root test route
app.get('/', (req, res) => res.send('API is working ✅'));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


