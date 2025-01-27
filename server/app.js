const express = require('express');
const cors = require('cors');
const remediesRoutes = require('./routes/remedies');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/remedies', remediesRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the HealLink API!');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
