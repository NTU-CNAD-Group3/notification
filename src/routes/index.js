import express from 'express';

const router = express.Router();

router.get('/healthy', (req, res) => {
  res.send('Notification service is healthy.');
});

export default router;
