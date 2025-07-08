// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  //SLA disabled these because they were stating they are deprecated. Can turn back on if we need them.
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

