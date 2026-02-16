const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./db');
const urlRoutes = require('./routes/url');
const { redirectUrl } = require('./controllers/urlController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Routes
app.use('/api', urlRoutes);

// Redirect route (must be last to avoid conflicts with static files if names clash, though static middleware is above)
app.get('/:shortCode', redirectUrl);

// Fallback for SPA or 404
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
