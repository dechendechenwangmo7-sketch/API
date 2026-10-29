const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const taskRoutes = require('./src/routes/taskroutes');

const app = express();

app.use(cors());
app.use(express.json());

// 1. Serve static files from the 'public' folder (changed from frontend to public)
app.use(express.static(path.join(__dirname, 'public')));

// 2. API Routes
app.use('/tasks', taskRoutes);

// 3. Send index.html FROM the public folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});