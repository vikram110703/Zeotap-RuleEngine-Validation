const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const ruleRoutes = require('./routes/ruleRoutes');
const cors=require('cors');

const app = express();

app.use(cors());

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => res.send('API is running'));
app.use('/api/rules', ruleRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
