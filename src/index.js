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

app.use(`/api`, routes);

app.listen(config.PORT, () => {
  consumeDirectEmailMessages('auth-signup', 'auth.signup.email', 'auth-signup-email');
  logger.info({
    message: `msg=Server started at port ${config.PORT}`,
  });
});

export default app;
