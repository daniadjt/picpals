const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = process.env.PORT
const app = express()
const cookieParser = require('cookie-parser');
app.use(cookieParser())
dotenv.config()

const userLoginRoutes = require('../routes/loginRoutes');
const userRegisterRoutes = require('../routes/registerRoutes');
const postRoutes = require('../routes/postRoutes');
const { authenticateUser } = require('../middlewear/authMiddleware');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));

  app.use('/', userRegisterRoutes);
  app.use('/', userLoginRoutes);
  app.use('/post', postRoutes)

  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  app.use(express.json())

  app.listen(PORT, () => {
    console.log(`This app running on port ${PORT}`)
  });