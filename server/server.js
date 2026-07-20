const path = require('path');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_BUILD_PATH = path.join(__dirname, '..', 'Client', 'dist');

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

if (require('fs').existsSync(CLIENT_BUILD_PATH)) {
  app.use(express.static(CLIENT_BUILD_PATH));

  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ message: 'API route not found.' });
    }
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Backend is running');
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
