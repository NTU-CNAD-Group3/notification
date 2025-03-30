import 'express-async-errors';

import express from 'express';
import cors from 'cors';

import routes from '@/routes/index.js';
import config from '@/config.js';
import logger from '@/utils/logger.js';
import { consumeDirectEmailMessages } from '@/queues/consumer.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// log incoming requests
app.use((req, res, next) => {
  res.on('finish', () => {
    const route = req.route ? req.route.path : '';
    const errorMessage = req.errorMessage ? req.errorMessage : 'Internal Server Error';
    if (res.statusCode < 400) {
      logger.info({
        message: `msg=Received response method=${req.method} path=${route} ip=${req.ip} status=${res.statusCode} url=${req.originalUrl}`,
      });
    } else {
      logger.error({
        message: `msg=Received response method=${req.method} path=${route} ip=${req.ip} status=${res.statusCode} url=${req.originalUrl} error=${errorMessage}`,
      });
    }
  });
  next();
});

app.use(`/api`, routes);

// route not found
app.use('*', (req, res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  if (err) {
    req.errorMessage = err.message;
    res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
});

app.listen(config.PORT, () => {
  consumeDirectEmailMessages('auth-signup', 'auth.signup.email', 'auth-signup-email');
  logger.info({
    message: `msg=Server started at port ${config.PORT}`,
  });
});

export default app;
