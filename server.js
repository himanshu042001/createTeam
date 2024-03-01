const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/usersdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB Schemas and Models
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const playerSchema = new mongoose.Schema({
  name: String,
  roll: String,
});

const User = mongoose.model('User', userSchema);
const Player = mongoose.model('Player', playerSchema);

// Routes
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/players', async (req, res) => {
  try {
    const { name, roll } = req.body;
    const player = new Player({ name, roll });
    await player.save();
    res.status(201).send(player);
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).send('Error creating player');
  }
});

app.get('/api/players', async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).send(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).send('Error fetching players');
  }
});

app.delete('/api/players/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Player.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).send('Error deleting player');
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
