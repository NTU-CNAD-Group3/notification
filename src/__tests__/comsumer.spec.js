import { jest } from '@jest/globals';

jest.unstable_mockModule('#src/queues/connect.js', () => ({
  createConnection: jest.fn(),
}));
jest.unstable_mockModule('#src/utils/logger.js', () => ({
  default: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

const { createConnection } = await import('#src/queues/connect.js');
const { consumeDirectEmailMessages } = await import('#src/queues/consumer.js');

describe('Email Consumer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('consumeDirectEmailMessages method', () => {
    test('should be called', async () => {
      const channel = {
        assertExchange: jest.fn(),
        publish: jest.fn(),
        assertQueue: jest.fn(),
        bindQueue: jest.fn(),
        consume: jest.fn(),
        ack: jest.fn(),
      };

      createConnection.mockResolvedValue(channel);
      jest.spyOn(channel, 'assertQueue').mockResolvedValue({ queue: 'auth-signup-email' });

      const exchangeName = 'auth-signup';
      const routingKey = 'auth.signup.email';
      const queueName = 'auth-signup-email';

      await consumeDirectEmailMessages(exchangeName, routingKey, queueName);

      expect(channel.assertExchange).toHaveBeenCalledWith(exchangeName, 'direct', { durable: true, autoDelete: false });
      expect(channel.assertQueue).toHaveBeenCalledWith(queueName, { durable: true, autoDelete: false });
      expect(channel.bindQueue).toHaveBeenCalledWith(queueName, exchangeName, routingKey);
      expect(channel.consume).toHaveBeenCalledWith(queueName, expect.any(Function));
    });
  });
});
