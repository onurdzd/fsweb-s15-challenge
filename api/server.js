const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const bilmecelerRouter = require('./bilmeceler/bilmeceler-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/bilmeceler', restrict, bilmecelerRouter); // sadece giriş yapan kullanıcılar erişebilir!
server.use((err, req, res, next) => { 
    res.status(err.status || 500).json({
      message: err.message,
    });
  });

module.exports = server;
