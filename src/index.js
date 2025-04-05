import 'express-async-errors';

import express from 'express';
import cors from 'cors';

import routes from '#src/routes/index.js';
import config from '#src/config.js';
import logger from '#src/utils/logger.js';
import { consumeDirectEmailMessages } from '#src/queues/consumer.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// log incoming requests
app.use((req, res, next) => {
  res.on('finish', () => {
    const route = req.route ? req.route.path : '';
    if (res.statusCode < 400) {
      logger.info({
        message: `msg=Received response method=${req.method} path=${route} ip=${req.ip} status=${res.statusCode} url=${req.originalUrl}`,
      });
    }
  });
  next();
});

app.use(`/api`, routes);

// route not found
app.use('*', (req, res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  const errResponse = err?.response?.data?.message || err?.message || 'Internal Server Error';
  const errStatusCode = err?.response?.status || err?.status || 500;
  const errStack = (err?.response?.data?.stack || err?.stack || 'No stack available').replace(/\n/g, ' ');;

  res.status(errStatusCode);
  res.json({
    message: errResponse,
    ...(process.env.NODE_ENV === 'development' && { stack: errStack })
  });
  logger.error({
    message: `msg=Error occurred method=${req.method} path=${req.path} ip=${req.ip} status=${errStatusCode} url=${req.originalUrl} error=${errResponse} stack=${errStack}`,
  });
});

app.listen(config.PORT, () => {
  consumeDirectEmailMessages('auth-signup', 'auth.signup.email', 'auth-signup-email');
  logger.info({
    message: `msg=Server started at port ${config.PORT}`,
  });
});

export default app;
