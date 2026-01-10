const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const app = express();

// 1) MIDDLEWARES
app.use(cors());
app.use(express.json());

// 2) ROUTE
app.use('/api/auth', authRoute)


//Global error handling
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});


// 3) MONGO DB CONNECTION
require('dotenv').config();
   mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB '))
  .catch(err => console.error('MongoDB error ❌', err));


// 4) START SERVER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
