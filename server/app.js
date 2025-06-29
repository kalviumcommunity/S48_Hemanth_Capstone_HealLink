const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const remediesRoutes = require('./routes/remedies');
const authRoutes = require('./routes/auth');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/remedies', remediesRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to HealLink API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
