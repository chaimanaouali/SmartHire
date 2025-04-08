import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors'; // Import the CORS middleware
import './config/passport-setup.js'; // Import the passport setup
import userRouter from './routes/users';
import authRoutes from './routes/auth.routes.js';

const app = express();
const server = http.createServer(app);

// CORS setup: Allow requests from your frontend (e.g., React)
app.use(cors({
  origin: 'http://localhost:3001', // React frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow cookies or other credentials to be sent
}));

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRouter);
app.use('/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

server.listen(process.env.PORT || 5001, () => {
  console.log(`Server running on port ${process.env.PORT || 5001}`);
});

export default app;
