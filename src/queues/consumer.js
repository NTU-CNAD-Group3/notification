import { sendEmail } from '#src/utils/sendEmail.js';
import { createConnection } from '#src/queues/connect.js';
import config from '#src/config.js';
import logger from '#src/utils/logger.js';

export async function consumeDirectEmailMessages(exchangeName, routingKey, queueName) {
  try {
    const channel = await createConnection();

    await channel.assertExchange(exchangeName, 'direct', { durable: true, autoDelete: false });

    const queue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(queue.queue, exchangeName, routingKey);

    channel.consume(queue.queue, async (msg) => {
      const { receiverEmail, verifyLink, template } = JSON.parse(msg.content.toString());
      const locals = {
        appLink: `${config.CLIENT_URL}`,
        appIcon: 'https://cnad.info/icon.png',
        verifyLink,
      };
      await sendEmail(template, receiverEmail, locals);
      channel.ack(msg);
      logger.info({
        message: `msg=Email sent to ${receiverEmail} template=${template}`,
      });
    });
  } catch (error) {
    logger.error({
      message: `msg=Error consuming messages from queue error=${error}`,
    });
  }
}
