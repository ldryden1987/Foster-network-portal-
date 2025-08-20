// server/server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routers/authRouter.js';
import resourceRouter from './routers/resourceRouter.js'
import faqRouter from './routers/faqRouter.js';
import updateUserRouter from './routers/userUpdateRouter.js';
import contactRoutes from './routers/contact.js';
import applicationRouter from './routers/applicationRouter.js';
import dotenv from 'dotenv';
import 'dotenv/config';
import animalRouter from './routers/animalRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Routers
app.use(authRouter);
app.use(resourceRouter);
app.use(faqRouter);
app.use('/userUpdate', updateUserRouter);
app.use('/api/contact', contactRoutes);
app.use('/api/applications', applicationRouter);

app.use(animalRouter);
app.use(uploadRouter);

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  //SLA disabled these because they were stating they are deprecated. Can turn back on if we need them.
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds
   connectTimeoutMS: 30000, //30 seconds for initial connection
  socketTimeoutMS: 45000, //45 seconds for socket operations
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});




